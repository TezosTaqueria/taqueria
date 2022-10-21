import {
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	getNetworkConfig,
	sendAsyncErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import { Environment } from '@taqueria/node-sdk/types';
import { TezosToolkit } from '@taquito/taquito';
import { TAQ_ROOT_ACCOUNT, TransferOpts as Opts } from './common';
import { configureToolKitWithNetwork, performTransferOps, TableRow } from './transfer';

const configureTezosToolKit = (parsedArgs: Opts, env: Environment.t): Promise<TezosToolkit> => {
	const targetConstraintErrMsg = 'Each environment can only have one target, be it a sandbox or a network';
	if (env.sandboxes?.length === 1 && env.networks?.length === 1) return sendAsyncErr(targetConstraintErrMsg);
	if (env.sandboxes?.length === 1) return sendAsyncErr('taq fund cannot be executed in a sandbox environment');
	if (env.networks?.length === 1) return configureToolKitWithNetwork(parsedArgs, env.networks[0]);
	return sendAsyncErr(targetConstraintErrMsg);
};

const getInstantiatedAccounts = (parsedArgs: Opts, env: Environment.t): [string, any][] | undefined => {
	const networkName = env.networks[0];
	const network = getNetworkConfig(parsedArgs)(networkName);
	const instantiatedAccounts = network?.accounts;
	return instantiatedAccounts
		? Object.entries(instantiatedAccounts).filter((instantiatedAccount: [string, any]) => {
			const alias = instantiatedAccount[0];
			return alias !== TAQ_ROOT_ACCOUNT;
		})
		: undefined;
};

const getAccountsInfos = async (
	parsedArgs: Opts,
	tezos: TezosToolkit,
	instantiatedAccounts: [string, any][],
): Promise<TableRow[]> => {
	const declaredAccounts = Object.entries(parsedArgs.config.accounts).reduce(
		(acc, declaredAccount) => {
			const name = declaredAccount[0];
			const tez = declaredAccount[1];
			return {
				...acc,
				[name]: typeof tez === 'string' ? parseFloat(tez) : tez,
			};
		},
		{} as any,
	);

	return Promise.all(instantiatedAccounts
		.map(async (instantiatedAccount: [string, any]) => {
			const alias = instantiatedAccount[0];
			const aliasInfos = instantiatedAccount[1];

			const declaredTez: number | undefined = declaredAccounts[alias];
			const currentBalanceInMutez = await tezos.tz.getBalance(aliasInfos.publicKeyHash);
			const currentBalanceInTez = currentBalanceInMutez.toNumber() / 1000000;
			const amountToFill = declaredTez ? Math.max(declaredTez - currentBalanceInTez, 0) : 0;

			if (!declaredTez) {
				sendWarn(
					`Warning: ${alias} is instantiated in the target environment but not declared in the root level "accounts" field of ./.taq/config.json so ${alias} will not be funded as we don't have a declared tez amount set there for ${alias}\n`,
				);
			}

			return {
				contractAlias: alias,
				contractAddress: aliasInfos.publicKeyHash,
				tezTransfer: amountToFill.toString(),
				parameter: 'Unit',
				entrypoint: 'default',
				destination: '',
			};
		}))
		.then(accountInfo => accountInfo.filter(accountInfo => accountInfo.tezTransfer !== '0'))
		.catch(err => sendAsyncErr(`Something went wrong while extracting account information - ${err}`));
};

const simplifyAccountInfos = (accountInfos: TableRow[], opHash: string) =>
	accountInfos.map(accountInfo => {
		return {
			accountAlias: accountInfo.contractAlias,
			accountAddress: accountInfo.contractAddress,
			tezTransfer: accountInfo.tezTransfer,
			operationHash: opHash,
		};
	});

const fund = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const tezos = await configureTezosToolKit(parsedArgs, env);

		const instantiatedAccounts = getInstantiatedAccounts(parsedArgs, env);
		if (!instantiatedAccounts || instantiatedAccounts.length === 0) {
			return sendAsyncErr(`There are no instantiated accounts in the current environment, "${parsedArgs.env}".`);
		}

		const accountsInfos = await getAccountsInfos(parsedArgs, tezos, instantiatedAccounts);
		if (accountsInfos.length === 0) {
			return sendJsonRes(
				`All instantiated accounts in the current environment, "${parsedArgs.env}", are funded up to or beyond the declared amount.`,
			);
		}

		const opHash = await performTransferOps(tezos, accountsInfos, getCurrentEnvironment(parsedArgs));
		return sendJsonRes(simplifyAccountInfos(accountsInfos, opHash));
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default fund;
