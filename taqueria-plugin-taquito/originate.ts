import {
	addTzExtensionIfMissing,
	getContractContent,
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	updateAddressAlias,
} from '@taqueria/node-sdk';
import { OperationContentsAndResultOrigination } from '@taquito/rpc';
import { TezosToolkit, WalletOperationBatch } from '@taquito/taquito';
import { BatchWalletOperation } from '@taquito/taquito/dist/types/wallet/batch-operation';
import { readFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import {
	configureToolKitForNetwork,
	configureToolKitForSandbox,
	getEnvTypeAndNodeConfig,
	handleOpsError,
	OriginateOpts as Opts,
} from './common';

type ContractInfo = {
	contract: string;
	code: string;
	initStorage: string;
	mutezTransfer: number;
};

type TableRow = {
	contract: string;
	address: string;
	alias: string;
	balanceInMutez: string;
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
	const contractWithTzExtension = addTzExtensionIfMissing(contract);
	const contractCode = await getContractContent(parsedArgs, contractWithTzExtension);
	if (contractCode === undefined) {
		return sendAsyncErr(
			`Please generate ${contractWithTzExtension} with one of the compilers (LIGO, SmartPy, Archetype) or write it manually and put it under /${parsedArgs.config.artifactsDir}\n`,
		);
	}

	const storageFilename = parsedArgs.storage ?? getDefaultStorageFilename(contractWithTzExtension);
	const contractInitStorage = await getContractContent(parsedArgs, storageFilename);
	if (contractInitStorage === undefined) {
		return sendAsyncErr(
			`❌ No initial storage file was found for ${contractWithTzExtension}\nStorage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "${
				getDefaultStorageFilename(contractWithTzExtension)
			}" in the artifacts directory\nYou can also manually pass a storage file to the originate task using the --storage STORAGE_FILE_NAME option\n`,
		);
	}

	return {
		contract,
		code: contractCode,
		initStorage: contractInitStorage,
		mutezTransfer: parseInt(parsedArgs.mutez ?? '0'),
	};
};

const createBatchForOriginate = (tezos: TezosToolkit, contractsInfo: ContractInfo[]): WalletOperationBatch =>
	contractsInfo.reduce((acc, contractInfo) =>
		acc.withOrigination({
			code: contractInfo.code,
			init: contractInfo.initStorage,
			balance: contractInfo.mutezTransfer.toString(),
			mutez: true,
		}), tezos.wallet.batch());

export const performOriginateOps = async (
	tezos: TezosToolkit,
	env: string,
	contractsInfo: ContractInfo[],
): Promise<BatchWalletOperation> => {
	const batch = createBatchForOriginate(tezos, contractsInfo);
	try {
		const op = await batch.send();
		await op.confirmation();
		return op;
	} catch (err) {
		return handleOpsError(err, env);
	}
};

const prepContractInfoForDisplay = async (
	parsedArgs: Opts,
	tezos: TezosToolkit,
	contractInfo: ContractInfo,
	op: BatchWalletOperation,
): Promise<TableRow> => {
	const operationResults = await op.operationResults();
	const originationResults = operationResults
		.filter(result => result.kind === 'origination')
		.map(result => result as OperationContentsAndResultOrigination);

	// Length should be 1 since we are batching originate operations into one
	const result = originationResults.length === 1 ? originationResults[0] : undefined;
	const address = result?.metadata?.operation_result?.originated_contracts?.join(',');

	const alias = parsedArgs.alias ?? basename(contractInfo.contract, extname(contractInfo.contract));
	if (address) await updateAddressAlias(parsedArgs, alias, address);

	return {
		contract: contractInfo.contract,
		address: address ?? 'Something went wrong during origination',
		alias: address ? alias : 'N/A',
		balanceInMutez: contractInfo.mutezTransfer.toString(),
		destination: tezos.rpc.getRpcUrl(),
	};
};

const originate = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	try {
		const [envType, nodeConfig] = await getEnvTypeAndNodeConfig(parsedArgs, env);
		const tezos = await (envType === 'Network'
			? configureToolKitForNetwork(parsedArgs, nodeConfig, parsedArgs.sender)
			: configureToolKitForSandbox(nodeConfig, parsedArgs.sender));

		const contractInfo = await getContractInfo(parsedArgs);

		const op = await performOriginateOps(tezos, getCurrentEnvironment(parsedArgs), [contractInfo]);

		const contractInfoForDisplay = await prepContractInfoForDisplay(parsedArgs, tezos, contractInfo, op);
		return sendJsonRes([contractInfoForDisplay]);
	} catch {
		return sendAsyncErr('No operations performed');
	}
};

export default originate;
