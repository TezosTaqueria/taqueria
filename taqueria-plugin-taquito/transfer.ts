import {
	getAddressOfAlias,
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	getParameter,
	RequestArgs,
	sendAsyncErr,
	sendJsonRes,
} from '@taqueria/node-sdk';
import { Environment } from '@taqueria/node-sdk/types';
import { Expr, Parser } from '@taquito/michel-codec';
import { TezosToolkit, WalletOperationBatch } from '@taquito/taquito';
import { BatchWalletOperation } from '@taquito/taquito/dist/types/wallet/batch-operation';
import {
	configureToolKitForNetwork,
	configureToolKitForSandbox,
	doWithin,
	getEnvTypeAndNodeConfig,
	handleOpsError,
	TransferOpts as Opts,
} from './common';

export type ContractInfo = {
	contractAlias: string;
	contractAddress: string;
	parameter: string;
	entrypoint: string;
	mutezTransfer: number;
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
	const protocolArgs = RequestArgs.create(parsedArgs);
	return {
		contractAlias: isContractAddress(contract) ? 'N/A' : contract,
		contractAddress: isContractAddress(contract) ? contract : await getAddressOfAlias(env, contract),
		parameter: parsedArgs.param ? await getParameter(protocolArgs, parsedArgs.param) : 'Unit',
		entrypoint: parsedArgs.entrypoint ?? 'default',
		mutezTransfer: parseInt(parsedArgs.mutez ?? '0'),
	};
};

const createBatchForTransfer = (tezos: TezosToolkit, contractsInfo: ContractInfo[]): WalletOperationBatch =>
	contractsInfo.reduce((acc, contractInfo) =>
		acc.withTransfer({
			to: contractInfo.contractAddress,
			amount: contractInfo.mutezTransfer,
			parameter: {
				entrypoint: contractInfo.entrypoint,
				value: new Parser().parseMichelineExpression(contractInfo.parameter) as Expr,
			},
			mutez: true,
		}), tezos.wallet.batch());

export const performTransferOps = async (
	tezos: TezosToolkit,
	env: string,
	contractsInfo: ContractInfo[],
	maxTimeout: number,
): Promise<BatchWalletOperation> => {
	const batch = createBatchForTransfer(tezos, contractsInfo);
	try {
		return await doWithin<BatchWalletOperation>(maxTimeout, async () => {
			const op = await batch.send();
			await op.confirmation();
			return op;
		});
	} catch (err) {
		return handleOpsError(err, env);
	}
};

const prepContractInfoForDisplay = (tezos: TezosToolkit, contractInfo: ContractInfo): TableRow => {
	return {
		contractAlias: contractInfo.contractAlias,
		contractAddress: contractInfo.contractAddress,
		parameter: contractInfo.parameter,
		entrypoint: contractInfo.entrypoint,
		mutezTransfer: contractInfo.mutezTransfer.toString(),
		destination: tezos.rpc.getRpcUrl(),
	};
};

const transfer = async (opts: Opts): Promise<void> => {
	const protocolArgs = RequestArgs.create(opts);
	const env = getCurrentEnvironmentConfig(protocolArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${protocolArgs.env} in your config.json`);
	try {
		const [envType, nodeConfig] = await getEnvTypeAndNodeConfig(protocolArgs, env);
		const tezos = await (envType === 'Network'
			? configureToolKitForNetwork(protocolArgs, nodeConfig, opts.sender)
			: configureToolKitForSandbox(nodeConfig, opts.sender));

		const contractInfo = await getContractInfo(opts, env);

		await performTransferOps(tezos, getCurrentEnvironment(protocolArgs), [contractInfo], opts.timeout);

		const contractInfoForDisplay = prepContractInfoForDisplay(tezos, contractInfo);
		return sendJsonRes([contractInfoForDisplay]);
	} catch {
		return sendAsyncErr('No operations performed');
	}
};

export default transfer;
