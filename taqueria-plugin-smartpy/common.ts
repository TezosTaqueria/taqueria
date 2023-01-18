import { execCmd, getArtifactsDir, getContractsDir, sendErr, sendWarn } from '@taqueria/node-sdk';
import { ProxyTaskArgs } from '@taqueria/node-sdk/types';
import { access } from 'fs/promises';
import { join } from 'path';

export interface CompileOpts extends ProxyTaskArgs.t {
	sourceFile: string;
	json: boolean;
}

export interface CompileAllOpts extends ProxyTaskArgs.t {
	json: boolean;
}

export interface TestOpts extends ProxyTaskArgs.t {
	sourceFile: string;
}

export type IntersectionOpts = CompileOpts & CompileAllOpts & TestOpts;

type UnionOpts = CompileOpts | CompileAllOpts | TestOpts;

// Should point to the latest stable version, so it needs to be updated as part of our release process.
const SMARTPY_DEFAULT_VERSION = 'v0.16.0';

const SMARTPY_VERSION_ENV_VAR = 'TAQ_SMARTPY_VERSION';

const SMARTPY_ARTIFACTS_DIR = '.smartpy';

const smartpyVersionToInstallerMap: { [k: string]: string } = {
	'v0.16.0': 'https://smartpy.io/releases/20221215-8f134ebb649f5a7b37c44fca8f336f970f523565/cli/install.sh',
	'v0.15.0': 'https://smartpy.io/releases/20221026-28e8c18e46035c353804eb5fd725573c5d434e8a/cli/install.sh',
	'v0.14.0': 'https://smartpy.io/releases/20220926-1c748c4572188f65a525792468e37da2182f18a2/cli/install.sh',
};

const getSmartpyVersion = (): string => {
	const userDefinedSmartpyVersion = process.env[SMARTPY_VERSION_ENV_VAR];
	if (userDefinedSmartpyVersion) {
		if (smartpyVersionToInstallerMap[userDefinedSmartpyVersion]) {
			return userDefinedSmartpyVersion;
		} else {
			sendWarn(
				`Version ${userDefinedSmartpyVersion} is not supported by Taqueria yet. The supported versions are [${
					Object.keys(smartpyVersionToInstallerMap)
				}]. Will default to ${SMARTPY_DEFAULT_VERSION}`,
			);
			return SMARTPY_DEFAULT_VERSION;
		}
	} else {
		return SMARTPY_DEFAULT_VERSION;
	}
};

const getPathToSmartPyCliDir = (): string => `${process.env.HOME}/smartpy-cli-${getSmartpyVersion()}`;

export const getSmartPyCli = (): string => `${getPathToSmartPyCliDir()}/SmartPy.sh`;

const getSmartPyInstallerCmd = (): string => {
	const installer = '~/SmartPyCliInstaller.sh';
	const download = `curl -s ${smartpyVersionToInstallerMap[getSmartpyVersion()]} > ${installer};`;
	const install = `bash ${installer} --yes --prefix ${getPathToSmartPyCliDir()};`;
	const clean = `rm ${installer};`;
	return download + install + clean;
};

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

export const installSmartPyCliIfNotExist = () =>
	access(getSmartPyCli())
		.catch(() => {
			sendWarn('SmartPy CLI not found. Installing it now...');
			return execCmd(getSmartPyInstallerCmd())
				.then(({ stderr }) => {
					if (stderr.length > 0) sendWarn(stderr);
				});
		});

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};
