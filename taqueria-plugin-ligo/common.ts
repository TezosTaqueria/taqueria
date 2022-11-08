import { RequestArgs } from '@taqueria/node-sdk';
import { join } from 'path';

export interface CompileOpts extends RequestArgs {
	sourceFile?: string;
	task?: string;
}

export interface TestOpts extends RequestArgs {
	task?: string;
	sourceFile?: string;
}

export type IntersectionOpts = CompileOpts & TestOpts;

type UnionOpts = CompileOpts | TestOpts;

// Points to the latest stable version. Needs to update this as part of our release process
export const LIGO_DOCKER_IMAGE = 'ligolang/ligo:0.51.0';

export const getInputFilename = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir ?? 'contracts', sourceFile);
