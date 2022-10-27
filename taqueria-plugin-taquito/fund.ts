import {
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	sendAsyncErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import { Environment } from '@taqueria/node-sdk/types';
import { TezosToolkit } from '@taquito/taquito';
import {
	configureToolKitWithNetwork,
	FundOpts as Opts,
	getDeclaredAccounts,
	getNetworkInstantiatedAccounts,
	getNetworkWithChecks,
} from './common';
import { ContractInfo, performTransferOps } from './transfer';

type TableRow = {
	accountAlias: string;
	accountAddress: string;
	mutezFunded: string;
};

const configureTezosToolKit = (parsedArgs: Opts, env: Environment.t): Promise<TezosToolkit> => {
	const targetConstraintErrMsg = 'Each environment can only have one target, be it a sandbox or a network';
	if (env.sandboxes?.length === 1 && env.networks?.length === 1) return sendAsyncErr(targetConstraintErrMsg);
	if (env.sandboxes?.length === 1) {
		return sendAsyncErr(`taq ${parsedArgs.task} cannot be executed in a sandbox environment`);
	}
	if (env.networks?.length === 1) return configureToolKitWithNetwork(parsedArgs, env.networks[0]);
	return sendAsyncErr(targetConstraintErrMsg);
};

const getAccountsInfo = (
	parsedArgs: Opts,
	tezos: TezosToolkit,
	instantiatedAccounts: Record<string, any>,
): Promise<ContractInfo[]> =>
	Promise.all(
		Object.entries(instantiatedAccounts)
			.map(async (instantiatedAccount: [string, any]) => {
				const alias = instantiatedAccount[0];
				const aliasInfo = instantiatedAccount[1];

				const declaredMutez: number | undefined = getDeclaredAccounts(parsedArgs)[alias];
				const currentBalanceInMutez = (await tezos.tz.getBalance(aliasInfo.publicKeyHash)).toNumber();
				const amountToFillInMutez = declaredMutez ? Math.max(declaredMutez - currentBalanceInMutez, 0) : 0;

				if (!declaredMutez) {
					sendWarn(
						`Warning: ${alias} is instantiated in the target environment but not declared in the root level "accounts" field of ./.taq/config.json so ${alias} will not be funded as we don't have a declared tez amount set there for ${alias}\n`,
					);
				}

				return {
					contractAlias: alias,
					contractAddress: aliasInfo.publicKeyHash,
					parameter: 'Unit',
					entrypoint: 'default',
					mutezTransfer: amountToFillInMutez.toString(),
				};
			}),
	)
		.then(accountsInfo => accountsInfo.filter(accountInfo => accountInfo.mutezTransfer !== '0'))
		.catch(err => sendAsyncErr(`Something went wrong while extracting account information - ${err}`));

const formatAccountsInfoForDisplay = (accountsInfo: ContractInfo[]): TableRow[] =>
	accountsInfo.map(accountInfo => {
		return {
			accountAlias: accountInfo.contractAlias,
			accountAddress: accountInfo.contractAddress,
			mutezFunded: accountInfo.mutezTransfer,
		};
	});

const fund = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const networkConfig = await getNetworkWithChecks(parsedArgs, env);
		const tezos = await configureTezosToolKit(parsedArgs, env);
		const instantiatedAccounts = getNetworkInstantiatedAccounts(networkConfig);

		const accountsInfo = await getAccountsInfo(parsedArgs, tezos, instantiatedAccounts);
		if (accountsInfo.length === 0) {
			return sendJsonRes(
				`All instantiated accounts in the current environment, "${parsedArgs.env}", are funded up to or beyond the declared amount.`,
			);
		}

		await performTransferOps(tezos, getCurrentEnvironment(parsedArgs), accountsInfo);

		const accountsInfoForDisplay = formatAccountsInfoForDisplay(accountsInfo);
		return sendJsonRes(accountsInfoForDisplay);
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default fund;
