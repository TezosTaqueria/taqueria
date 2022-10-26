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
import { configureToolKitWithNetwork, configureToolKitWithSandbox, TransferOpts as Opts } from './common';

export type TableRow = {
	contractAlias: string;
	contractAddress: string;
	mutezTransfer: string;
	parameter: string;
	entrypoint: string;
	destination: string;
};

const isContractAddress = (contract: string): boolean =>
	contract.startsWith('tz1') || contract.startsWith('tz2') || contract.startsWith('tz3') || contract.startsWith('KT1');

const configureTezosToolKit = (parsedArgs: Opts, env: Environment.t, sender?: string): Promise<TezosToolkit> => {
	const targetConstraintErrMsg = 'Each environment can only have one target, be it a sandbox or a network';
	if (env.sandboxes?.length === 1 && env.networks?.length === 1) return sendAsyncErr(targetConstraintErrMsg);
	if (env.sandboxes?.length === 1) return configureToolKitWithSandbox(parsedArgs, env.sandboxes[0], sender);
	if (env.networks?.length === 1) return configureToolKitWithNetwork(parsedArgs, env.networks[0], sender);
	return sendAsyncErr(targetConstraintErrMsg);
};

const getContractInfo = async (parsedArgs: Opts, env: Environment.t, tezos: TezosToolkit): Promise<TableRow> => {
	const contract = parsedArgs.contract;
	return {
		contractAlias: isContractAddress(contract) ? 'N/A' : contract,
		contractAddress: isContractAddress(contract) ? contract : await getAddressOfAlias(env, contract),
		mutezTransfer: parsedArgs.mutez ?? '0',
		parameter: parsedArgs.param ? await getParameter(parsedArgs, parsedArgs.param) : 'Unit',
		entrypoint: parsedArgs.entrypoint ?? 'default',
		destination: tezos.rpc.getRpcUrl(),
	};
};

const createBatchForTransfer = (tezos: TezosToolkit, contractInfos: TableRow[]): WalletOperationBatch =>
	contractInfos.reduce((acc, contractInfo) =>
		acc.withTransfer({
			to: contractInfo.contractAddress,
			amount: parseInt(contractInfo.mutezTransfer),
			parameter: {
				entrypoint: contractInfo.entrypoint,
				value: new Parser().parseMichelineExpression(contractInfo.parameter) as Expr,
			},
			mutez: true,
		}), tezos.wallet.batch());

export const performTransferOps = (tezos: TezosToolkit, contractInfos: TableRow[], env: string): Promise<string> =>
	createBatchForTransfer(tezos, contractInfos).send()
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

const transfer = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const tezos = await configureTezosToolKit(parsedArgs, env, parsedArgs.sender);
		const contractInfo = await getContractInfo(parsedArgs, env, tezos);
		const opHash = await performTransferOps(tezos, [contractInfo], getCurrentEnvironment(parsedArgs));
		return sendJsonRes([contractInfo]);
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default transfer;
