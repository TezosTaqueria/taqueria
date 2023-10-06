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
			`By convention, Taqueria expects you to import your contract with Contract as the module name.\nFor instance, if you have a contract in a file called "increment.mligo", in your parameter/storage list file you must include #import "Increment.mligo" "Contract" for compilation to be successful.`;
	}

	err.message = result
		.replace(
			'An internal error ocurred. Please, contact the developers.',
			'The LIGO compiler experienced an internal error. Please contact the LIGO developers.',
		).replace(
			/Module ("Contract\.[^"]+") not found/,
			'The module $1 was not found. If your contract is defined within a namespace, please ensure that it has been exported.',
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

export const configure = (dockerImage: string, dockerImageEnvVar: string) => ({
	LIGO_DEFAULT_IMAGE: dockerImage,
	LIGO_IMAGE_ENV_VAR: dockerImageEnvVar,
	getLigoDockerImage: () => getDockerImage(dockerImage, dockerImageEnvVar),
});

export type Common = ReturnType<typeof configure>;
