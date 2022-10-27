import {
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	getInitialStorage,
	sendAsyncErr,
	sendJsonRes,
	updateAddressAlias,
} from '@taqueria/node-sdk';
import { OperationContentsAndResultOrigination } from '@taquito/rpc';
import { TezosToolkit, WalletOperationBatch } from '@taquito/taquito';
import { BatchWalletOperation } from '@taquito/taquito/dist/types/wallet/batch-operation';
import { readFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import { configureTezosToolKit, OriginateOpts as Opts } from './common';

type ContractInfo = {
	contract: string;
	code: string;
	initStorage: string;
};

type TableRow = {
	contract: string;
	address: string;
	alias: string;
	destination: string;
};

const getContractPath = (parsedArgs: Opts, contractFilename: string) =>
	join(parsedArgs.config.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`);

const getDefaultStorageFilename = (contractName: string): string => {
	const baseFilename = basename(contractName, extname(contractName));
	const extFilename = extname(contractName);
	const defaultStorage = `${baseFilename}.default_storage${extFilename}`;
	return defaultStorage;
};

const getContractInfo = async (parsedArgs: Opts): Promise<ContractInfo> => {
	const contract = parsedArgs.contract;

	const contractPath = getContractPath(parsedArgs, contract);
	const contractCode = await readFile(contractPath, 'utf-8');

	const storageFilename = parsedArgs.storage ?? getDefaultStorageFilename(contract);
	const contractInitStorage = await getInitialStorage(parsedArgs, storageFilename);
	if (contractInitStorage === undefined) {
		return sendAsyncErr(
			`❌ No initial storage file was found for ${contract}\nStorage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "${
				getDefaultStorageFilename(contract)
			}" in the artifacts directory\nYou can also manually pass a storage file to the originate task using the --storage STORAGE_FILE_NAME option\n`,
		);
	}

	return {
		contract,
		code: contractCode,
		initStorage: contractInitStorage,
	};
};

const createBatchForOriginate = (tezos: TezosToolkit, contractsInfo: ContractInfo[]): WalletOperationBatch =>
	contractsInfo.reduce((acc, contractInfo) =>
		acc.withOrigination({
			code: contractInfo.code,
			init: contractInfo.initStorage,
		}), tezos.wallet.batch());

export const performOriginateOps = async (
	parsedArgs: Opts,
	tezos: TezosToolkit,
	contractsInfo: ContractInfo[],
): Promise<BatchWalletOperation> => {
	const batch = createBatchForOriginate(tezos, contractsInfo);
	try {
		const op = await batch.send();
		await op.confirmation();
		return op;
	} catch (err) {
		const error = (err as { message: string });
		if (error.message) {
			const msg = error.message;
			if (/ENOTFOUND/.test(msg)) {
				return sendAsyncErr(msg + ' - The RPC URL may be invalid. Check ./.taq/config.json.\n');
			} else if (/ECONNREFUSED/.test(msg)) {
				return sendAsyncErr(msg + ' - The RPC URL may be down or the sandbox is not running.');
			} else if (/empty_implicit_contract/.test(msg)) {
				const result = msg.match(/(?<="implicit":")tz[^"]+(?=")/);
				const publicKeyHash = result ? result[0] : undefined;
				if (!publicKeyHash) return sendAsyncErr(msg);
				else {
					return sendAsyncErr(
						`The account ${publicKeyHash} for the target environment, "${
							getCurrentEnvironment(parsedArgs)
						}", may not be funded\nTo fund this account:\n1. Go to https://teztnets.xyz and click "Faucet" of the target testnet\n2. Copy and paste the above key into the wallet address field\n3. Request some Tez (Note that you might need to wait for a few seconds for the network to register the funds)`,
					);
				}
			} else {
				return sendAsyncErr(
					msg
						+ " - There was a problem communicating with the chain. Check the RPC URL of the network or sandbox you're targeting in config.json.\n",
				);
			}
		} else {
			return sendAsyncErr(`Error during originate operation:\n${err} ${JSON.stringify(err, null, 2)}`);
		}
	}
};

const prepContractInfoForDisplay = async (
	parsedArgs: Opts,
	tezos: TezosToolkit,
	contractInfo: ContractInfo,
	op: BatchWalletOperation,
): Promise<TableRow> => {
	const operationResults = await op.operationResults();
	const originationResults = operationResults.filter(result => result.kind === 'origination').map(result =>
		result as OperationContentsAndResultOrigination
	);
	const result = originationResults.length === 1 ? originationResults[0] : undefined; // length should be 1 since we are batching originate operations into one
	const address = result?.metadata?.operation_result?.originated_contracts?.join(',');
	const alias = parsedArgs.alias ?? basename(contractInfo.contract, extname(contractInfo.contract));
	if (address) await updateAddressAlias(parsedArgs, alias, address);
	return {
		contract: contractInfo.contract,
		address: address ?? 'Something went wrong during origination',
		alias: address ? alias : 'N/A',
		destination: tezos.rpc.getRpcUrl(),
	};
};

const originate = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const tezos = await configureTezosToolKit(parsedArgs, env, parsedArgs.sender);

		const contractInfo = await getContractInfo(parsedArgs);

		const op = await performOriginateOps(parsedArgs, tezos, [contractInfo]);

		const contractInfoForDisplay = await prepContractInfoForDisplay(parsedArgs, tezos, contractInfo, op);
		return sendJsonRes([contractInfoForDisplay]);
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default originate;
