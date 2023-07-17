import { getDockerImage, sendErr } from '@taqueria/node-sdk';
import { ProxyTaskArgs, RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

export interface LigoOpts extends ProxyTaskArgs.t {
	command: string;
}

export interface CompileOpts extends ProxyTaskArgs.t {
	sourceFile: string;
	json: boolean;
}

export interface CompileAllOpts extends ProxyTaskArgs.t {
	json: boolean;
}

export interface TestOpts extends RequestArgs.t {
	task?: string;
	sourceFile?: string;
}

export type IntersectionOpts = LigoOpts & CompileOpts & CompileAllOpts & TestOpts;

type UnionOpts = LigoOpts | CompileOpts | CompileAllOpts | TestOpts;

// Should point to the latest stable version, so it needs to be updated as part of our release process.
const LIGO_DEFAULT_IMAGE = 'ligolang/ligo:0.69.0';

const LIGO_IMAGE_ENV_VAR = 'TAQ_LIGO_IMAGE';

export const getLigoDockerImage = (): string => getDockerImage(LIGO_DEFAULT_IMAGE, LIGO_IMAGE_ENV_VAR);

export const getInputFilenameAbsPath = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.projectDir, parsedArgs.config.contractsDir ?? 'contracts', sourceFile);

export const getInputFilenameRelPath = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir ?? 'contracts', sourceFile);

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};
