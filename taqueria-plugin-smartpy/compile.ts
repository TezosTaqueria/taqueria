import { execCmd, getArch, sendAsyncErr, sendErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { readFile } from 'fs/promises';
import { basename, extname, join } from 'path';

type TableRow = { contract: string; artifact: string };

interface Opts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

const COMPILE_ERR_MSG: string = 'Not compiled';

const getArtifacts = (sourceAbspath: string) => {
	return readFile(sourceAbspath, { encoding: 'utf-8' })
		.then((source: string) => {
			const pattern = new RegExp(/add_compilation_target\s*\(\s*(['"])([^'"]+)\1/, 'mg');
			const results = source.matchAll(pattern);
			return results
				? Array.from(results).map(match => match[2])
				: ['--'];
		});
};

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};

export const getInputFilename = (parsedArgs: Opts, sourceFile: string): string => {
	return join(parsedArgs.config.contractsDir, sourceFile);
};

const getOutputFilename = (parsedArgs: Opts, sourceFile: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	return join(parsedArgs.config.artifactsDir, `${outputFile}.tz`);
};

const getCompileContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	return `~/smartpy-cli/SmartPy.sh compile ${
		getInputFilename(parsedArgs, sourceFile)
	} ${parsedArgs.config.artifactsDir}`;
};

const compileContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> => {
	return getArch()
		.then(() => getCompileContractCmd(parsedArgs, sourceFile))
		.then(execCmd)
		.then(async ({ stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
			return {
				contract: sourceFile,
				artifact: getOutputFilename(parsedArgs, sourceFile),
			};
		})
		.catch(err => {
			emitExternalError(err, sourceFile);
			return {
				contract: sourceFile,
				artifact: COMPILE_ERR_MSG,
			};
		});
};

const compile = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = parsedArgs.sourceFile;
	let p: Promise<TableRow[]> = compileContract(parsedArgs, sourceFile).then(result => [result]);
	return p.then(sendJsonRes).catch(err => sendAsyncErr(err, false));
};

export default compile;
