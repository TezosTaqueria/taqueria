import {
	getAddressOfAlias,
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	getParameter,
	sendAsyncErr,
	sendJsonRes,
} from '@taqueria/node-sdk';
import { Environment } from '@taqueria/node-sdk/types';
import { Expr, Parser } from '@taquito/michel-codec';
import { TezosToolkit, WalletOperationBatch } from '@taquito/taquito';
import { configureTezosToolKit, TransferOpts as Opts } from './common';

export type ContractInfo = {
	contractAlias: string;
	contractAddress: string;
	parameter: string;
	entrypoint: string;
	mutezTransfer: string;
};

type TableRow = {
	contractAlias: string;
	contractAddress: string;
	parameter: string;
	entrypoint: string;
	mutezTransfer: string;
	destination: string;
};

const isContractAddress = (contract: string): boolean =>
	contract.startsWith('tz1') || contract.startsWith('tz2') || contract.startsWith('tz3') || contract.startsWith('KT1');

const getContractInfo = async (parsedArgs: Opts, env: Environment.t): Promise<ContractInfo> => {
	const contract = parsedArgs.contract;
	return {
		contractAlias: isContractAddress(contract) ? 'N/A' : contract,
		contractAddress: isContractAddress(contract) ? contract : await getAddressOfAlias(env, contract),
		parameter: parsedArgs.param ? await getParameter(parsedArgs, parsedArgs.param) : 'Unit',
		entrypoint: parsedArgs.entrypoint ?? 'default',
		mutezTransfer: parsedArgs.mutez ?? '0',
	};
};

const createBatchForTransfer = (tezos: TezosToolkit, contractsInfo: ContractInfo[]): WalletOperationBatch =>
	contractsInfo.reduce((acc, contractInfo) =>
		acc.withTransfer({
			to: contractInfo.contractAddress,
			amount: parseInt(contractInfo.mutezTransfer),
			parameter: {
				entrypoint: contractInfo.entrypoint,
				value: new Parser().parseMichelineExpression(contractInfo.parameter) as Expr,
			},
			mutez: true,
		}), tezos.wallet.batch());

export const performTransferOps = (tezos: TezosToolkit, env: string, contractsInfo: ContractInfo[]): Promise<string> =>
	createBatchForTransfer(tezos, contractsInfo).send()
		.then(op => op.confirmation().then(() => op.opHash))
		.catch(err => {
			if (err instanceof Error) {
				if (/empty_implicit_contract/.test(err.message)) {
					const result = (err.message).match(/(?<="implicit":")tz[^"]+(?=")/);
					const publicKeyHash = result ? result[0] : undefined;
					if (publicKeyHash) {
						return sendAsyncErr(
							`The account ${publicKeyHash} for the target environment, "${env}", may not be funded\nTo fund this account:\n1. Go to https://teztnets.xyz and click "Faucet" of the target testnet\n2. Copy and paste the above key into the 'wallet address field\n3. Request some Tez (Note that you might need to wait for a few seconds for the network to register the funds)`,
						);
					}
				}
			}
			return sendAsyncErr(`Error during transfer operation:\n${err} ${JSON.stringify(err, null, 2)}`);
		});

const prepContractInfoForDisplay = (tezos: TezosToolkit, contractInfo: ContractInfo): TableRow => {
	return {
		contractAlias: contractInfo.contractAlias,
		contractAddress: contractInfo.contractAddress,
		parameter: contractInfo.parameter,
		entrypoint: contractInfo.entrypoint,
		mutezTransfer: contractInfo.mutezTransfer,
		destination: tezos.rpc.getRpcUrl(),
	};
};

const transfer = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const tezos = await configureTezosToolKit(parsedArgs, env, parsedArgs.sender);

		const contractInfo = await getContractInfo(parsedArgs, env);

		await performTransferOps(tezos, getCurrentEnvironment(parsedArgs), [contractInfo]);

		const contractInfoForDisplay = prepContractInfoForDisplay(tezos, contractInfo);
		return sendJsonRes([contractInfoForDisplay]);
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default transfer;
