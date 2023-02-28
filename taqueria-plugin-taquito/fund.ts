import {
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	RequestArgs,
	sendAsyncErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import { TezosToolkit } from '@taquito/taquito';
import {
	configureToolKitForNetwork,
	FundOpts,
	FundOpts as Opts,
	getDeclaredAccounts,
	getEnvTypeAndNodeConfig,
	getNetworkInstantiatedAccounts,
} from './common';
import { ContractInfo, performTransferOps } from './transfer';

type TableRow = {
	accountAlias: string;
	accountAddress: string;
	mutezFunded: string;
};

const getAccountsInfo = (
	parsedArgs: RequestArgs.t,
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
						`Warning: ${alias} is instantiated in the target environment but not declared in the root level "accounts" field of ./.taq/config.json so ${alias} will not be funded as you don't have a declared tez amount set there for ${alias}\n`,
					);
				}

				return {
					contractAlias: alias,
					contractAddress: aliasInfo.publicKeyHash,
					parameter: 'Unit',
					entrypoint: 'default',
					mutezTransfer: parseInt(amountToFillInMutez.toString()),
				};
			}),
	)
		.then(accountsInfo => accountsInfo.filter(accountInfo => accountInfo.mutezTransfer !== 0))
		.catch(err => sendAsyncErr(`Something went wrong while extracting account information - ${err}`));

const prepAccountsInfoForDisplay = (accountsInfo: ContractInfo[]): TableRow[] =>
	accountsInfo.map(accountInfo => {
		return {
			accountAlias: accountInfo.contractAlias,
			accountAddress: accountInfo.contractAddress,
			mutezFunded: accountInfo.mutezTransfer.toString(),
		};
	});

const fund = async (parsedArgs: FundOpts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	try {
		const [envType, nodeConfig] = await getEnvTypeAndNodeConfig(parsedArgs, env);
		if (envType !== 'Network') return sendAsyncErr('taq fund can only be executed in a network environment');
		const tezos = await configureToolKitForNetwork(parsedArgs, nodeConfig);

		const instantiatedAccounts = getNetworkInstantiatedAccounts(nodeConfig);

		const accountsInfo = await getAccountsInfo(parsedArgs, tezos, instantiatedAccounts);
		if (accountsInfo.length === 0) {
			return sendJsonRes(
				`All instantiated accounts in the current environment, "${parsedArgs.env}", are funded up to or beyond the declared amount`,
			);
		}

		await performTransferOps(tezos, getCurrentEnvironment(parsedArgs), accountsInfo, parsedArgs.timeout);

		const accountsInfoForDisplay = prepAccountsInfoForDisplay(accountsInfo);
		return sendJsonRes(accountsInfoForDisplay);
	} catch {
		return sendAsyncErr('No operations performed');
	}
};

export default fund;
