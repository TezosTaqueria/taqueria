import { getDockerImage, sendErr } from '@taqueria/node-sdk';
import { ProxyTaskArgs, RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

export interface LigoOpts extends ProxyTaskArgs.t {
	command: string;
}

export interface CompileOpts extends ProxyTaskArgs.t {
	sourceFile: string;
	json: boolean;
	module?: string;
}

export interface CompileAllOpts extends ProxyTaskArgs.t {
	json: boolean;
}

export interface TestOpts extends RequestArgs.t {
	task?: string;
	sourceFile?: string;
}

export type IntersectionOpts = LigoOpts & CompileOpts & CompileAllOpts & TestOpts;

export type UnionOpts = LigoOpts | CompileOpts | CompileAllOpts | TestOpts;

// Should point to the latest stable version, so it needs to be updated as part of our release process.
const LIGO_DEFAULT_IMAGE = 'ligolang/ligo:0.73.0';

const LIGO_IMAGE_ENV_VAR = 'TAQ_LIGO_IMAGE';

export const getLigoDockerImage = (): string => getDockerImage(LIGO_DEFAULT_IMAGE, LIGO_IMAGE_ENV_VAR);

export const getInputFilenameAbsPath = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.projectDir, parsedArgs.config.contractsDir ?? 'contracts', sourceFile);

export const getInputFilenameRelPath = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir ?? 'contracts', sourceFile);

export const formatLigoError = (err: Error): Error => {
	let result = err.message.replace(/Command failed.+?\n/, '');
	if (
		result.includes('An internal error ocurred. Please, contact the developers.')
		&& result.includes('Module Contract not found with last Contract.')
	) {
		result =
			`The contract must be imported with "Contract" as the namespace: #import "path/to/contract.ligo" "Contract"`;
	}

	err.message = result.replace(
		'An internal error ocurred. Please, contact the developers.',
		'The LIGO compiler experienced an internal error. Please contact the LIGO developers.',
	);

	return err;
};

export const emitExternalError = (errs: unknown[] | unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	const errors = Array.isArray(errs) ? errs : [errs];
	errors.map(err => {
		err instanceof Error ? sendErr(err.message) : sendErr(err as any);
	});
	sendErr(`===`);
};
