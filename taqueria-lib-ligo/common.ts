import { getDockerImage, sendErr } from '@taqueria/node-sdk';
import { ProxyTaskArgs, RequestArgs } from '@taqueria/node-sdk/types';
import * as fs from 'fs';
import { delimiter, join } from 'path';

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

export type IntersectionOpts =
	& LigoOpts
	& CompileOpts
	& CompileAllOpts
	& TestOpts;

export type UnionOpts = LigoOpts | CompileOpts | CompileAllOpts | TestOpts;

export const getInputFilenameAbsPath = (
	parsedArgs: UnionOpts,
	sourceFile: string,
): string =>
	join(
		parsedArgs.config.projectDir,
		parsedArgs.config.contractsDir ?? 'contracts',
		sourceFile,
	);

export const getInputFilenameRelPath = (
	parsedArgs: UnionOpts,
	sourceFile: string,
): string => join(parsedArgs.config.contractsDir ?? 'contracts', sourceFile);

export const formatLigoError = (err: Error): Error => {
	let result = err.message.replace(/Command failed.+?\n/, '');
	if (
		result.includes(
			'An internal error ocurred. Please, contact the developers.',
		)
		&& result.includes('Module Contract not found with last Contract.')
	) {
		result =
			`By convention, Taqueria expects you to import your contract with Contract as the module name.\nFor instance, if you have a contract in a file called "increment.mligo", in your parameter/storage list file you must include #import "Increment.mligo" "Contract" for compilation to be successful.`;
	} else {
		const regex = /contracts\/(.+): No such file or directory/;
		const match = regex.exec(result);
		if (match) {
			const filename = match[1];
			result =
				`The file ${filename} was not found. Please ensure that the file exists and that it is in the contracts directory.`;
		}
	}

	err.message = result
		.replace(
			'An internal error ocurred. Please, contact the developers.',
			'The LIGO compiler experienced an internal error. Please contact the LIGO developers.',
		)
		.replace(
			/Module ("Contract\.[^"]+") not found/,
			'The module $1 was not found. If your contract is defined within a namespace, please ensure that it has been exported.',
		);

	return err;
};

export const emitExternalError = (
	errs: unknown[] | unknown,
	sourceFile: string,
): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	const errors = Array.isArray(errs) ? errs : [errs];
	errors.map(err => {
		err instanceof Error ? sendErr(err.message) : sendErr(err as any);
	});
	sendErr(`===`);
};

export const configure = (dockerImage: string, dockerImageEnvVar: string, canUseLIGOBinary: boolean) => ({
	LIGO_DEFAULT_IMAGE: dockerImage,
	LIGO_IMAGE_ENV_VAR: dockerImageEnvVar,
	getLigoDockerImage: () => getDockerImage(dockerImage, dockerImageEnvVar),
	baseDriverCmd: (projectDir: string) => baseDriverCmd(projectDir, dockerImage, canUseLIGOBinary),
});

export type Common = ReturnType<typeof configure>;
function exists(path: string): boolean {
	try {
		fs.accessSync(path, fs.constants.X_OK);
		return true;
	} catch {
		return false;
	}
}

function getLigoBinaryFromPath() {
	const { PATH } = process.env;
	if (!PATH) {
		return null;
	}
	const paths = PATH.split(delimiter);
	for (const candidatePath of paths) {
		const possibleLigoPath = join(candidatePath, 'ligo');
		if (exists(possibleLigoPath)) {
			return possibleLigoPath;
		}
	}
	return null;
}

function baseDriverCmd(
	projectDir: string,
	ligoDockerImage: string,
	canUseLIGOBinary: boolean,
): string {
	const ligoBinaryFromPath = canUseLIGOBinary ? getLigoBinaryFromPath() : null;
	if (ligoBinaryFromPath !== null) {
		return ligoBinaryFromPath;
	} else {
		return `DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${ligoDockerImage}`;
	}
}
