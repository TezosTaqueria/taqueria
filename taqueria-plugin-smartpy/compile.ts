import {
	execCmd,
	getArch,
	getArtifactsDir,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	sendRes,
	sendWarn,
} from '@taqueria/node-sdk';
import { access, readFile, writeFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import os from 'os';
import {
	CompileOpts as Opts,
	emitExternalError,
	getInputFilenameAbsPath,
	getInputFilenameRelPath,
	UnionOpts,
} from './common';

export type TableRow = { source: string; artifact: string };

export type ExprKind = 'storage' | 'default_storage' | 'parameter';

const COMPILE_ERR_MSG: string = 'Not compiled';

export const isSmartPyFile = (sourceFile: string) =>
	sourceFile.endsWith('.py')

export const isStorageListFile = (sourceFile: string): boolean =>
	/.+\.(storageList)\.py$/.test(sourceFile);

export const isParameterListFile = (sourceFile: string): boolean =>
	/.+\.(parameterList)\.py$/.test(sourceFile);


const extractExt = (path: string): string => {
	const matchResult = path.match(/\.py$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

const getCompileCmdEnvVars = (parsedArgs: Opts): string => {
	const retval: Record<string, unknown> = {
		'SMARTPY_OUTPUT_DIR': join(os.tmpdir(), `tempDir_${Date.now()}`)
	}
	if (parsedArgs.debug) retval['TAQ_DEBUG'] = 1;
	return Object.entries(retval).reduce((acc, [key, val]) => acc.length > 0 ? `${acc} ${key}=${val} ` : acc, '');
}

const getCompileContractCmd = async (parsedArgs: Opts, sourceFile: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw new Error(`No project directory provided`);
	const artifactsDir = getArtifactsDir(parsedArgs);
	const envVars = getCompileCmdEnvVars(parsedArgs);
	const cmd = `${envVars}python ${__dirname}/wrapper.py ${getInputFilenameAbsPath(parsedArgs, sourceFile)} '${JSON.stringify(parsedArgs)}'`;
	return cmd;
};

const compileContract = async (parsedArgs: Opts, sourceFile: string): Promise<TableRow[]> => {
	try {
		const cmd = await getCompileContractCmd(parsedArgs, sourceFile);
		const { stderr, stdout } = await execCmd(cmd);
		if (stderr.length > 0) sendWarn(stderr);

		return JSON.parse(stdout) as TableRow[];
	} catch (err) {
		emitExternalError(err, sourceFile);
		return [{
			source: getInputFilenameRelPath(parsedArgs, sourceFile),
			artifact: COMPILE_ERR_MSG,
		}];
	}
};

export const compile = async (parsedArgs: Opts): Promise<void> => {
	const sourceFile = parsedArgs.sourceFile;
	if (!isSmartPyFile(sourceFile)) {
		sendErr(`${sourceFile} is not a SmartPy file`);
		return;
	}
	if (isStorageListFile(sourceFile) || isParameterListFile(sourceFile)) {
		sendErr(`Storage and parameter list files are not meant to be compiled directly`);
		return;
	}

	try {
		const data = await compileContract(parsedArgs, sourceFile);
		sendJsonRes(data, { footer: `\nCompiled ${data.filter(result => result.artifact != 'Not Compiled').length} contract(s) in "${sourceFile}"` });
	} catch (err) {
		sendErr(`Error processing "${sourceFile}": ${err}`);
	}
};

export default compile;
