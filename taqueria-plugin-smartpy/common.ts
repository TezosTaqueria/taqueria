import { getArtifactsDir, getContractsDir, sendErr } from '@taqueria/node-sdk';
import { ProxyTaskArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

export interface CompileOpts extends ProxyTaskArgs.t {
	sourceFile: string;
	json: boolean;
}

export interface TestOpts extends ProxyTaskArgs.t {
	sourceFile: string;
}

export type IntersectionOpts = CompileOpts & TestOpts;

type UnionOpts = CompileOpts | TestOpts;

const SMARTPY_ARTIFACTS_DIR = '.smartpy';

export const addPyExtensionIfMissing = (sourceFile: string): string =>
	/\.py$/.test(sourceFile) ? sourceFile : `${sourceFile}.py`;

const extractExt = (path: string): string => {
	const matchResult = path.match(/\.py$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

export const getInputFilename = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(getContractsDir(parsedArgs), sourceFile);

export const getCompilationTargetsDirname = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(getArtifactsDir(parsedArgs), SMARTPY_ARTIFACTS_DIR, removeExt(sourceFile));

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};
