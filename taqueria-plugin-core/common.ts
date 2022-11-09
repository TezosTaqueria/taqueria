import { RequestArgs } from '@taqueria/node-sdk/types';

export interface CleanOpts extends RequestArgs.ProxyRequestArgs {
}

// To be used for the main entrypoint of the plugin
export type IntersectionOpts = CleanOpts;

// To be used for common functions in this file
type UnionOpts = CleanOpts;
