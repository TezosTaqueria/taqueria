import { getSandboxAccountNames } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';

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

// To be used for the main entrypoint of the plugin
export type IntersectionOpts = OriginateOpts & TransferOpts;

// To be used for common functions in this file
type UnionOpts = OriginateOpts | TransferOpts;

export const getFirstAccountAlias = (sandboxName: string, opts: UnionOpts) => {
	const aliases = getSandboxAccountNames(opts)(sandboxName);
	return aliases.shift();
};
