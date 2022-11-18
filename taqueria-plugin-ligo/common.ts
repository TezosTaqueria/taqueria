import { getDockerImage, sendErr } from '@taqueria/node-sdk';
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

// Should point to the latest stable version, so it needs to be updated as part of our release process.
const LIGO_DEFAULT_IMAGE = 'ligolang/ligo:0.54.1';

const LIGO_IMAGE_ENV_VAR = 'TAQ_LIGO_IMAGE';

export const getLigoDockerImage = (): string => getDockerImage(LIGO_DEFAULT_IMAGE, LIGO_IMAGE_ENV_VAR);

export const getInputFilename = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir, sourceFile);

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== For ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
};
