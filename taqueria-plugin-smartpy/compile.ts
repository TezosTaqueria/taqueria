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
import os from 'os';
import { join } from 'path';
import {
	CompileOpts as Opts,
	emitExternalError,
	getCmdEnvVars,
	getInputFilenameAbsPath,
	getInputFilenameRelPath,
	getPythonCommand,
	isParameterListFile,
	isSmartPyFile,
	isStorageListFile,
	TableRow,
} from './common';

export type ExprKind = 'storage' | 'default_storage' | 'parameter';

export const COMPILE_ERR_MSG: string = 'Not compiled';

const extractExt = (path: string): string => {
	const matchResult = path.match(/\.py$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

const getCompileContractCmd = async (parsedArgs: Opts, sourceFile: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw new Error(`No project directory provided`);
	const envVars = getCmdEnvVars(parsedArgs);
	const pythonCmd = getPythonCommand(projectDir);
	const cmd = `${envVars}${pythonCmd} ${__dirname}/wrapper.py ${getInputFilenameAbsPath(parsedArgs, sourceFile)} '${
		JSON.stringify(parsedArgs)
	}'`;
	return cmd;
};

export const compileContract = async (parsedArgs: Opts, sourceFile: string): Promise<TableRow[]> => {
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
		sendJsonRes(data, {
			footer: `\nCompiled ${
				data.filter(result => result.artifact != COMPILE_ERR_MSG).length
			} contract(s) in "${sourceFile}"`,
		});
	} catch (err) {
		sendErr(`Error processing "${sourceFile}": ${err}`);
	}
};

export default compile;
