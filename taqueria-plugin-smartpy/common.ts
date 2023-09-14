import { getDockerImage, sendErr } from '@taqueria/node-sdk';
import { ProxyTaskArgs, RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';
import os from 'os';
import {mkdirSync, writeFileSync} from 'fs'

export interface SmartPyOpts extends ProxyTaskArgs.t {
	command: string;
}

export interface CompileOpts extends ProxyTaskArgs.t {
	sourceFile: string;
}

export interface CompileAllOpts extends ProxyTaskArgs.t {
}

export interface TestOpts extends RequestArgs.t {
	task?: string;
	sourceFile: string;
}

export type IntersectionOpts = SmartPyOpts & CompileOpts & CompileAllOpts & TestOpts;

export type UnionOpts = SmartPyOpts | CompileOpts | CompileAllOpts | TestOpts;

export type TableRow = { source: string; artifact: string };

export const getInputFilenameAbsPath = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.projectDir, parsedArgs.config.contractsDir ?? 'contracts', sourceFile);

export const getInputFilenameRelPath = (parsedArgs: UnionOpts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir ?? 'contracts', sourceFile);

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};

export const isSmartPyFile = (sourceFile: string) => sourceFile.endsWith('.py');

export const isStorageListFile = (sourceFile: string): boolean => /.+\.(storageList)\.py$/.test(sourceFile);

export const isParameterListFile = (sourceFile: string): boolean => /.+\.(parameterList)\.py$/.test(sourceFile);

export const getSmartPyTempDir = (() => {
	// Utilize once and done memoization
	let computedValue: string|undefined = undefined
	return (parsedArgs: UnionOpts): string => {
		if (computedValue === undefined) {
			computedValue = join(parsedArgs.projectDir, parsedArgs.config.artifactsDir ?? 'artifacts', `.tempDir_${Date.now()}`)
		}
		return computedValue!
	}
})()


export const getCmdEnvVars = (parsedArgs: UnionOpts): string => {
	const retval: Record<string, unknown> = {
		'SMARTPY_OUTPUT_DIR': getSmartPyTempDir(parsedArgs),
	};

	if (parsedArgs.debug) retval['TAQ_DEBUG'] = 1;
	return Object.entries(retval)
    .map(([key, val]) => `${key}=${val}`)
    .join(' ') + ' ';
};
