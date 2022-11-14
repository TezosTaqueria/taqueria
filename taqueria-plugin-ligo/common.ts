import { RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

export interface LigoOpts extends RequestArgs.ProxyRequestArgs {
	command: string;
}

export interface CompileOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export interface TestOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export type IntersectionOpts = LigoOpts & CompileOpts & TestOpts;

type UnionOpts = LigoOpts | CompileOpts | TestOpts;

// Points to the latest stable version. Needs to update this as part of our release process
export const LIGO_DOCKER_IMAGE = 'ligolang/ligo:0.55.0';

export const getInputFilename = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir, sourceFile);
