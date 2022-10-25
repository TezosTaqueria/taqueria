import {
	getAccountPrivateKey,
	getDefaultAccount,
	getNetworkConfig,
	getSandboxAccountConfig,
	getSandboxAccountNames,
	getSandboxConfig,
	sendAsyncErr,
	sendErr,
} from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { importKey, InMemorySigner } from '@taquito/signer';
import { TezosToolkit } from '@taquito/taquito';

export interface OriginateOpts extends RequestArgs.ProxyRequestArgs {
	contract: string;
	storage: string;
	alias?: string;
}

export interface TransferOpts extends RequestArgs.ProxyRequestArgs {
	contract: string;
	tez?: string;
	param?: string;
	entrypoint?: string;
}

export interface InstantiateAccountOpts extends RequestArgs.ProxyRequestArgs {
}

export interface FundOpts extends RequestArgs.ProxyRequestArgs {
}

// To be used for the main entrypoint of the plugin
export type IntersectionOpts = OriginateOpts & TransferOpts & InstantiateAccountOpts & FundOpts;

// To be used for common functions in this file
type UnionOpts = OriginateOpts | TransferOpts | InstantiateAccountOpts | FundOpts;

export const TAQ_ROOT_ACCOUNT = 'taqRootAccount';

export const getFirstAccountAlias = (sandboxName: string, opts: UnionOpts) => {
	const aliases = getSandboxAccountNames(opts)(sandboxName);
	return aliases.shift();
};

export const configureToolKitWithSandbox = async (
	parsedArgs: UnionOpts,
	sandboxName: string,
): Promise<TezosToolkit> => {
	const sandbox = getSandboxConfig(parsedArgs)(sandboxName);
	if (!sandbox) {
		return sendAsyncErr(
			`The current environment is configured to use a sandbox called '${sandboxName}'; however, no sandbox of this name has been configured in .taq/config.json.`,
		);
	}

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

	const tezos = new TezosToolkit(sandbox.rpcUrl as string);
	tezos.setProvider({
		signer: new InMemorySigner((defaultAccount.secretKey as string).replace(/^unencrypted:/, '')),
	});
	return tezos;
};

export const configureToolKitWithNetwork = async (
	parsedArgs: UnionOpts,
	networkName: string,
): Promise<TezosToolkit> => {
	const network = getNetworkConfig(parsedArgs)(networkName);
	if (!network) {
		return sendAsyncErr(
			`The current environment is configured to use a network called '${networkName}'; however, no network of this name has been configured in .taq/config.json.`,
		);
	}

	const tezos = new TezosToolkit(network.rpcUrl as string);
	const key = await getAccountPrivateKey(parsedArgs, network, TAQ_ROOT_ACCOUNT);
	await importKey(tezos, key);
	return tezos;
};

export const getDeclaredAccounts = (parsedArgs: UnionOpts) =>
	Object.entries(parsedArgs.config.accounts).reduce(
		(acc, declaredAccount) => {
			const name: string = declaredAccount[0];
			const tez: string | number = declaredAccount[1];
			return {
				...acc,
				[name]: typeof tez === 'string' ? parseFloat(tez) : tez,
			};
		},
		{} as any,
	);
