import { execCmd, getArtifactsDir, getContractsDir, sendErr, sendWarn } from '@taqueria/node-sdk';
import { ProxyTaskArgs } from '@taqueria/node-sdk/types';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { access } from 'fs/promises';
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

// Should point to the latest version, so it needs to be updated as part of our release process.
// Currently this points to v0.15.0
const SMARTPY_INSTALLER =
	'https://smartpy.io/releases/20221026-28e8c18e46035c353804eb5fd725573c5d434e8a/cli/install.sh';

const SMARTPY_INSTALL_CMD =
	`curl -s ${SMARTPY_INSTALLER} > ~/SmartPyCliInstaller.sh; bash ~/SmartPyCliInstaller.sh --yes; rm ~/SmartPyCliInstaller.sh`;

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

export const getSmartPyCli = (): string => `${process.env.HOME}/smartpy-cli/SmartPy.sh`;

export const getInputFilename = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(getContractsDir(parsedArgs), sourceFile);

export const getCompilationTargetsDirname = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(getArtifactsDir(parsedArgs), SMARTPY_ARTIFACTS_DIR, removeExt(sourceFile));

export const installSmartPyCliIfNotExist = () =>
	access(getSmartPyCli())
		.catch(() => {
			sendWarn('SmartPy CLI not found. Installing it now...');
			return execCmd(SMARTPY_INSTALL_CMD)
				.then(({ stderr }) => {
					if (stderr.length > 0) sendWarn(stderr);
				});
		});

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};
