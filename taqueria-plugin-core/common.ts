import { ProxyTaskArgs } from '@taqueria/node-sdk';

export interface CleanOpts extends ProxyTaskArgs.t {
}

// To be used for the main entrypoint of the plugin
export type IntersectionOpts = CleanOpts;

// To be used for common functions in this file
type UnionOpts = CleanOpts;
