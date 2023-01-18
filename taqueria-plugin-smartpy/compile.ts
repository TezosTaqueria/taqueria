import { execCmd, getArch, getArtifactsDir, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { copyFile, readFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import {
	addPyExtensionIfMissing,
	CompileOpts as Opts,
	emitExternalError,
	getCompilationTargetsDirname,
	getInputFilename,
	getSmartPyCli,
	installSmartPyCliIfNotExist,
} from './common';

export type TableRow = { contract: string; artifact: string };

const COMPILE_ERR_MSG: string = 'Not compiled';

const isOutputFormatJSON = (parsedArgs: Opts): boolean => parsedArgs.json;

const getOutputContractFilename = (parsedArgs: Opts, sourceFile: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	return join(getArtifactsDir(parsedArgs), `${outputFile}${ext}`);
};

const getOutputStorageFilename = (
	parsedArgs: Opts,
	sourceFile: string,
	compilationTargetName: string,
	isDefaultStorage: boolean,
): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	const storageName = isDefaultStorage
		? `${outputFile}.default_storage${ext}`
		: `${outputFile}.storage.${compilationTargetName}${ext}`;
	return join(getArtifactsDir(parsedArgs), storageName);
};

const getOutputExprFilename = (parsedArgs: Opts, sourceFile: string, compilationTargetName: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	const exprName = `${outputFile}.expression.${compilationTargetName}${ext}`;
	return join(getArtifactsDir(parsedArgs), exprName);
};

const getCompilationTargetNames = (
	parsedArgs: Opts,
	sourceFile: string,
): Promise<{ compTargetNames: string[]; exprCompTargetNames: string[] }> =>
	readFile(getInputFilename(parsedArgs, sourceFile), 'utf8')
		.then(data => ({
			compTargetNames: data.match(/(?<=add_compilation_target\s*\(\s*['"])[^'"]+(?=['"])/g) ?? [],
			exprCompTargetNames: data.match(/(?<=add_expression_compilation_target\s*\(\s*['"])[^'"]+(?=['"])/g) ?? [],
		}));

const copyArtifactsForFirstCompTarget = async (
	parsedArgs: Opts,
	sourceFile: string,
	compTargetNames: string[],
): Promise<string[]> => {
	if (compTargetNames.length === 0) return [];
	const firstCompTargetName = compTargetNames.slice(0, 1)[0];

	const dstContractPath = getOutputContractFilename(parsedArgs, sourceFile);
	await copyFile(
		join(
			getCompilationTargetsDirname(parsedArgs, sourceFile),
			firstCompTargetName,
			isOutputFormatJSON(parsedArgs) ? 'step_000_cont_0_contract.json' : 'step_000_cont_0_contract.tz',
		),
		dstContractPath,
	);

	const dstDefaultStoragePath = getOutputStorageFilename(parsedArgs, sourceFile, firstCompTargetName, true);
	await copyFile(
		join(
			getCompilationTargetsDirname(parsedArgs, sourceFile),
			firstCompTargetName,
			isOutputFormatJSON(parsedArgs) ? 'step_000_cont_0_storage.json' : 'step_000_cont_0_storage.tz',
		),
		dstDefaultStoragePath,
	);

	return [dstContractPath, dstDefaultStoragePath];
};

const copyArtifactsForRestCompTargets = async (
	parsedArgs: Opts,
	sourceFile: string,
	compTargetNames: string[],
): Promise<string[]> => {
	if (compTargetNames.length === 0) return [];
	const restCompTargetNames = compTargetNames.slice(1, compTargetNames.length);

	const dstStoragePaths = await Promise.all(restCompTargetNames.map(async compTargetName => {
		const dstStoragePath = getOutputStorageFilename(parsedArgs, sourceFile, compTargetName, false);
		await copyFile(
			join(
				getCompilationTargetsDirname(parsedArgs, sourceFile),
				compTargetName,
				isOutputFormatJSON(parsedArgs) ? 'step_000_cont_0_storage.json' : 'step_000_cont_0_storage.tz',
			),
			dstStoragePath,
		);
		return dstStoragePath;
	}));

	return dstStoragePaths;
};

const copyArtifactsForExprCompTargets = async (
	parsedArgs: Opts,
	sourceFile: string,
	exprCompTargetNames: string[],
): Promise<string[]> => {
	if (exprCompTargetNames.length === 0) return [];

	const dstExprPaths = await Promise.all(exprCompTargetNames.map(async compTargetName => {
		const dstExprPath = getOutputExprFilename(parsedArgs, sourceFile, compTargetName);
		await copyFile(
			join(
				getCompilationTargetsDirname(parsedArgs, sourceFile),
				compTargetName,
				isOutputFormatJSON(parsedArgs) ? 'step_000_expression.json' : 'step_000_expression.tz',
			),
			dstExprPath,
		);
		return dstExprPath;
	}));

	return dstExprPaths;
};

const copyRelevantArtifactsForCompTargets = (parsedArgs: Opts, sourceFile: string) =>
	async (
		{ compTargetNames, exprCompTargetNames }: { compTargetNames: string[]; exprCompTargetNames: string[] },
	): Promise<string> => {
		if (compTargetNames.length === 0 && exprCompTargetNames.length === 0) return 'No compilation targets defined';

		const dstContractAndDefaultStoragePaths = await copyArtifactsForFirstCompTarget(
			parsedArgs,
			sourceFile,
			compTargetNames,
		);

		const dstStoragePaths = await copyArtifactsForRestCompTargets(
			parsedArgs,
			sourceFile,
			compTargetNames,
		);

		const dstExpressionPaths = await copyArtifactsForExprCompTargets(
			parsedArgs,
			sourceFile,
			exprCompTargetNames,
		);

		return dstContractAndDefaultStoragePaths.concat(dstStoragePaths).concat(dstExpressionPaths).join('\n');
	};

const getCompileContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const outputDir = getCompilationTargetsDirname(parsedArgs, sourceFile);
	const booleanFlags = ' --html --purge ';
	return `${getSmartPyCli()} compile ${getInputFilename(parsedArgs, sourceFile)} ${outputDir} ${booleanFlags}`;
};

const compileContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getArch()
		.then(() => installSmartPyCliIfNotExist())
		.then(() => getCompileContractCmd(parsedArgs, sourceFile))
		.then(execCmd)
		.then(({ stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
		})
		.then(() => getCompilationTargetNames(parsedArgs, sourceFile))
		.then(copyRelevantArtifactsForCompTargets(parsedArgs, sourceFile))
		.then(relevantArtifacts => ({
			contract: sourceFile,
			artifact: relevantArtifacts,
		}))
		.catch(err => {
			emitExternalError(err, sourceFile);
			return {
				contract: sourceFile,
				artifact: COMPILE_ERR_MSG,
			};
		});

export const compileOneContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	compileContract(parsedArgs, sourceFile);

const compile = (parsedArgs: Opts): Promise<void> =>
	compileOneContract(parsedArgs, addPyExtensionIfMissing(parsedArgs.sourceFile))
		.then(result => [result])
		.then(sendJsonRes)
		.catch(err => sendAsyncErr(err, false));

export default compile;
