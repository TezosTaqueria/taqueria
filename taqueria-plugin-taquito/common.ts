import {
	getAccountPrivateKey,
	getDefaultSandboxAccount,
	getNetworkConfig,
	getSandboxConfig,
	RequestArgs,
	sendAsyncErr,
	sendErr,
	TAQ_OPERATOR_ACCOUNT,
} from '@taqueria/node-sdk';
import {
	Environment,
	NetworkConfig,
	Protocol,
	ProxyTaskArgs,
	SandboxAccountConfig,
	SandboxConfig,
} from '@taqueria/node-sdk/types';
import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';

export type OriginateOpts = ProxyTaskArgs.t & {
	contract: string;
	storage: string;
	alias?: string;
	sender?: string;
	mutez?: string;
	timeout: number;
};

export type TransferOpts = ProxyTaskArgs.t & {
	contract: string;
	mutez?: string;
	param?: string;
	entrypoint?: string;
	sender?: string;
	timeout: number;
};

export type FundOpts = ProxyTaskArgs.t & {
	timeout: number;
};

export type InstantiateAccountOpts = ProxyTaskArgs.t;

// To be used for the main entrypoint of the plugin
export type IntersectionOpts = OriginateOpts & TransferOpts & InstantiateAccountOpts & FundOpts;

// To be used for common functions in this file
type UnionOpts = OriginateOpts | TransferOpts | InstantiateAccountOpts | FundOpts;

export const getEnvTypeAndNodeConfig = (
	parsedArgs: RequestArgs.t,
	env: Environment.t,
): Promise<['Network', NetworkConfig.t] | ['Sandbox', SandboxConfig.t]> => {
	const targetConstraintErrMsg = 'Each environment can only have one target, be it a network or a sandbox';
	if (env.networks?.length === 1 && env.sandboxes?.length === 1) return sendAsyncErr(targetConstraintErrMsg);
	if (env.networks?.length === 1) {
		const networkName = env.networks[0];
		const network = getNetworkConfig(parsedArgs)(networkName);
		if (!network) {
			return sendAsyncErr(
				`The current environment is configured to use a network called '${networkName}'; however, no network of this name has been configured in .taq/config.json`,
			);
		}
		return Promise.resolve(['Network', network]);
	}
	if (env.sandboxes?.length === 1) {
		const sandboxName = env.sandboxes[0];
		const sandbox = getSandboxConfig(parsedArgs)(sandboxName);
		if (!sandbox) {
			return sendAsyncErr(
				`The current environment is configured to use a sandbox called '${sandboxName}'; however, no sandbox of this name has been configured in .taq/config.json`,
			);
		}
		return Promise.resolve(['Sandbox', sandbox]);
	}
	return sendAsyncErr(targetConstraintErrMsg);
};

export const configureToolKitForSandbox = async (sandbox: SandboxConfig.t, sender?: string): Promise<TezosToolkit> => {
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
		const defaultAccount = getDefaultSandboxAccount(sandbox);
		if (!defaultAccount) {
			return sendAsyncErr(
				`No default account is specified in the sandbox to perform the operation. Please use the --sender flag to explicitly specify the account to use as the sender of the operation`,
			);
		}
		accountKey = defaultAccount.secretKey;
	}

	const tezos = new TezosToolkit(sandbox.rpcUrl as string);
	tezos.setProvider({ signer: new InMemorySigner(accountKey.replace(/^unencrypted:/, '')) });
	return tezos;
};

export const configureToolKitForNetwork = async (
	parsedArgs: RequestArgs.t,
	network: NetworkConfig.t,
	sender?: string,
): Promise<TezosToolkit> => {
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

export const getDeclaredAccounts = (parsedArgs: RequestArgs.t): Record<string, number> =>
	Object.entries(parsedArgs.config.accounts ?? {}).reduce(
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
				const keys = instantiatedAccount[1];
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
	network.accounts
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

export const generateAccountKeys = async (
	parsedArgs: RequestArgs.t,
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
		if (/ENOTFOUND/.test(msg)) return sendAsyncErr('The RPC URL may be invalid. Check ./.taq/config.json');
		if (/ECONNREFUSED/.test(msg)) return sendAsyncErr('The RPC URL may be down or the sandbox is not running');
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

export const doWithin = async <T>(seconds: number, fn: () => Promise<T>) => {
	let captured: Error = new Error(
		'Operation timed out. Please try again and perhaps increase the timeout using the --timeout option.',
	);
	let timeout: ReturnType<typeof setTimeout>;

	const maxTimeout = new Promise((resolve, reject) => {
		timeout = setTimeout(() => {
			reject(captured);
		}, seconds * 1000);
	}) as Promise<T>;

	const process = async () => {
		while (true) {
			try {
				const retval: T = await fn();
				return retval;
			} catch (err) {
				captured = err as Error;
			}
		}
	};

	return Promise.race<T>([process(), maxTimeout]).then(retval => {
		clearTimeout(timeout);
		return retval;
	});
};
