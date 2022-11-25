import { sendErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

export interface CompileOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export interface TestOpts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

export type IntersectionOpts = CompileOpts & TestOpts;

type UnionOpts = CompileOpts | TestOpts;

const SMARTPY_ARTIFACTS_DIR = '.smartpy';

const extractExt = (path: string): string => {
	const matchResult = path.match(/\.py$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

export const getInputFilename = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir, sourceFile);

export const getSmartPyArtifactDirname = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.artifactsDir, SMARTPY_ARTIFACTS_DIR, removeExt(sourceFile));

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};
