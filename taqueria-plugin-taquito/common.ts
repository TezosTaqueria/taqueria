import {
	getAccountPrivateKey,
	getDefaultAccount,
	getNetworkConfig,
	getSandboxAccountConfig,
	getSandboxAccountNames,
	getSandboxConfig,
	sendAsyncErr,
	sendErr,
	TAQ_OPERATOR_ACCOUNT,
} from '@taqueria/node-sdk';
import { Environment, NetworkConfig, RequestArgs, SandboxAccountConfig, SandboxConfig } from '@taqueria/node-sdk/types';
import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';

export interface OriginateOpts extends RequestArgs.ProxyRequestArgs {
	contract: string;
	storage: string;
	alias?: string;
	sender?: string;
}

export interface TransferOpts extends RequestArgs.ProxyRequestArgs {
	contract: string;
	mutez?: string;
	param?: string;
	entrypoint?: string;
	sender?: string;
}

export interface InstantiateAccountOpts extends RequestArgs.ProxyRequestArgs {
}

export interface FundOpts extends RequestArgs.ProxyRequestArgs {
}

// To be used for the main entrypoint of the plugin
export type IntersectionOpts = OriginateOpts & TransferOpts & InstantiateAccountOpts & FundOpts;

// To be used for common functions in this file
type UnionOpts = OriginateOpts | TransferOpts | InstantiateAccountOpts | FundOpts;

export const getFirstAccountAlias = (sandboxName: string, opts: UnionOpts) => {
	const [first, ..._] = getSandboxAccountNames(opts)(sandboxName);
	return first;
};

export const configureTezosToolKit = (
	parsedArgs: UnionOpts,
	env: Environment.t,
	sender?: string,
): Promise<TezosToolkit> => {
	const targetConstraintErrMsg = 'Each environment can only have one target, be it a sandbox or a network';
	if (env.sandboxes?.length === 1 && env.networks?.length === 1) return sendAsyncErr(targetConstraintErrMsg);
	if (env.sandboxes?.length === 1) return configureToolKitWithSandbox(parsedArgs, env.sandboxes[0], sender);
	if (env.networks?.length === 1) return configureToolKitWithNetwork(parsedArgs, env.networks[0], sender);
	return sendAsyncErr(targetConstraintErrMsg);
};

export const configureToolKitWithSandbox = async (
	parsedArgs: UnionOpts,
	sandboxName: string,
	sender?: string,
): Promise<TezosToolkit> => {
	const sandbox = getSandboxConfig(parsedArgs)(sandboxName);
	if (!sandbox) {
		return sendAsyncErr(
			`The current environment is configured to use a sandbox called '${sandboxName}'; however, no sandbox of this name has been configured in .taq/config.json.`,
		);
	}

	let accountKey: string;
	if (sender && sender !== 'default') {
		const accounts = getSandboxInstantiatedAccounts(sandbox);
		if (accounts.hasOwnProperty(sender)) {
			accountKey = accounts[sender].secretKey;
		} else {
			return sendAsyncErr(
				`${sender} is not an account instantiated in the current environment. Check .taq/config.json`,
			);
		}
	} else {
		let defaultAccount = getDefaultAccount(parsedArgs)(sandboxName);
		if (!defaultAccount) {
			const first = getFirstAccountAlias(sandboxName, parsedArgs);
			if (first) {
				defaultAccount = getSandboxAccountConfig(parsedArgs)(sandboxName)(first);
				sendErr(
					`Warning: A default account has not been specified for sandbox ${sandboxName}. Taqueria will use the account ${first} for this operation.\nA default account can be specified in .taq/config.json at JSON path: sandbox.${sandboxName}.accounts.default\n`,
				);
			}
		}
		if (!defaultAccount) {
			return sendAsyncErr(`No accounts are available for the sandbox called ${sandboxName} to perform the operation.`);
		}
		accountKey = defaultAccount.secretKey;
	}

	const tezos = new TezosToolkit(sandbox.rpcUrl as string);
	tezos.setProvider({
		signer: new InMemorySigner(accountKey.replace(/^unencrypted:/, '')),
	});
	return tezos;
};

export const configureToolKitWithNetwork = async (
	parsedArgs: UnionOpts,
	networkName: string,
	sender?: string,
): Promise<TezosToolkit> => {
	const network = getNetworkConfig(parsedArgs)(networkName);
	if (!network) {
		return sendAsyncErr(
			`The current environment is configured to use a network called '${networkName}'; however, no network of this name has been configured in .taq/config.json.`,
		);
	}

	let account: string;
	if (sender && sender !== TAQ_OPERATOR_ACCOUNT) {
		const accounts = getNetworkInstantiatedAccounts(network);
		if (accounts.hasOwnProperty(sender)) {
			account = sender;
		} else {
			return sendAsyncErr(
				`${sender} is not an account instantiated in the current environment. Check .taq/config.json`,
			);
		}
	} else {
		account = TAQ_OPERATOR_ACCOUNT;
	}

	const tezos = new TezosToolkit(network.rpcUrl as string);
	const key = await getAccountPrivateKey(parsedArgs, network, account);
	await importKey(tezos, key);
	return tezos;
};

export const getDeclaredAccounts = (parsedArgs: UnionOpts): Record<string, number> =>
	Object.entries(parsedArgs.config.accounts).reduce(
		(acc, declaredAccount) => {
			const alias: string = declaredAccount[0];
			const mutez: string | number = declaredAccount[1];
			return {
				...acc,
				[alias]: typeof mutez === 'string' ? parseFloat(mutez) : mutez,
			};
		},
		{} as Record<string, number>,
	);

export const getSandboxInstantiatedAccounts = (sandbox: SandboxConfig.t): Record<string, SandboxAccountConfig.t> =>
	(sandbox?.accounts)
		? Object.entries(sandbox.accounts).reduce(
			(acc, instantiatedAccount) => {
				const alias: string = instantiatedAccount[0];
				const keys = instantiatedAccount[1] as SandboxAccountConfig.t;
				return alias !== 'default'
					? {
						...acc,
						[alias]: keys,
					}
					: acc;
			},
			{},
		)
		: {};

export const getNetworkInstantiatedAccounts = (network: NetworkConfig.t): Record<string, any> =>
	(network?.accounts)
		? Object.entries(network.accounts).reduce(
			(acc, instantiatedAccount) => {
				const alias: string = instantiatedAccount[0];
				const keys = instantiatedAccount[1];
				return alias !== TAQ_OPERATOR_ACCOUNT
					? {
						...acc,
						[alias]: keys,
					}
					: acc;
			},
			{},
		)
		: {};

export const getNetworkWithChecks = (parsedArgs: UnionOpts, env: Environment.t): Promise<NetworkConfig.t> => {
	const targetConstraintErrMsg = 'Each environment can only have one target, be it a sandbox or a network';
	if (env.sandboxes?.length === 1 && env.networks?.length === 1) return sendAsyncErr(targetConstraintErrMsg);
	if (env.sandboxes?.length === 1) {
		return sendAsyncErr(`taq ${parsedArgs.task} cannot be executed in a sandbox environment`);
	}
	if (env.networks?.length === 1) {
		const networkName = env.networks[0];
		const network = getNetworkConfig(parsedArgs)(networkName);
		if (!network) {
			return sendAsyncErr(
				`The current environment is configured to use a network called '${networkName}'; however, no network of this name has been configured in .taq/config.json.`,
			);
		}
		return Promise.resolve(network);
	}
	return sendAsyncErr(targetConstraintErrMsg);
};

export const generateAccountKeys = async (
	parsedArgs: UnionOpts,
	network: NetworkConfig.t,
	account: string,
): Promise<void> => {
	const tezos = new TezosToolkit(network.rpcUrl as string);
	const key = await getAccountPrivateKey(parsedArgs, network, account);
	await importKey(tezos, key);
};

export const handleOpsError = (err: unknown, env: string): Promise<never> => {
	if (err instanceof Error) {
		const msg = err.message;
		if (/ENOTFOUND/.test(msg)) return sendAsyncErr('The RPC URL may be invalid. Check ./.taq/config.json.');
		if (/ECONNREFUSED/.test(msg)) return sendAsyncErr('The RPC URL may be down or the sandbox is not running.');
		if (/empty_implicit_contract/.test(msg)) {
			const result = msg.match(/(?<="implicit":")tz[^"]+(?=")/);
			const publicKeyHash = result ? result[0] : undefined;
			if (publicKeyHash) {
				return sendAsyncErr(
					`The account ${publicKeyHash} for the target environment, "${env}", may not be funded\nTo fund this account:\n1. Go to https://teztnets.xyz and click "Faucet" of the target testnet\n2. Copy and paste the above key into the wallet address field\n3. Request some Tez (Note that you might need to wait for a few seconds for the network to register the funds)`,
				);
			}
		}
	}
	return sendAsyncErr(`Error while performing operation:\n${err} ${JSON.stringify(err, null, 2)}`);
};
