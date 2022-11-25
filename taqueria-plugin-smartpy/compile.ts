import { execCmd, getArch, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { copyFile, readFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import { CompileOpts as Opts, emitExternalError, getCompilationTargetsDirName, getInputFilename } from './common';

type TableRow = { contract: string; artifact: string };

const COMPILE_ERR_MSG: string = 'Not compiled';

const addPyExtensionIfMissing = (sourceFile: string): string => {
	return /\.py$/.test(sourceFile) ? sourceFile : `${sourceFile}.py`;
};

const getOutputContractFilename = (parsedArgs: Opts, sourceFile: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	return join(parsedArgs.config.artifactsDir, `${outputFile}.tz`);
};

const getOutputStorageFilename = (
	parsedArgs: Opts,
	sourceFile: string,
	compilationTargetName: string,
	isDefaultStorage: boolean,
): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	const storageName = isDefaultStorage
		? `${outputFile}.default_storage.tz`
		: `${outputFile}.storage.${compilationTargetName}.tz`;
	return join(parsedArgs.config.artifactsDir, storageName);
};

const getOutputExprFilename = (parsedArgs: Opts, sourceFile: string, compilationTargetName: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	const exprName = `${outputFile}.expression.${compilationTargetName}.tz`;
	return join(parsedArgs.config.artifactsDir, exprName);
};

const getCompilationTargetNames = (
	parsedArgs: Opts,
	sourceFile: string,
): Promise<{ compTargetsNames: string[]; exprCompTargetsNames: string[] }> =>
	readFile(getInputFilename(parsedArgs, sourceFile), 'utf8')
		.then(data => ({
			compTargetsNames: data.match(/(?<=add_compilation_target\s*\(\s*['"])[^'"]+(?=['"])/g) ?? [],
			exprCompTargetsNames: data.match(/(?<=add_expression_compilation_target\s*\(\s*['"])[^'"]+(?=['"])/g) ?? [],
		}));

const copyArtifactsForFirstCompTarget = async (
	parsedArgs: Opts,
	sourceFile: string,
	compTargetsNames: string[],
): Promise<string[]> => {
	if (compTargetsNames.length === 0) return [];
	const firstCompTargetName = compTargetsNames.slice(0, 1)[0];

	const dstContractPath = getOutputContractFilename(parsedArgs, sourceFile);
	await copyFile(
		join(
			getCompilationTargetsDirName(parsedArgs, sourceFile),
			firstCompTargetName,
			'step_000_cont_0_contract.tz',
		),
		dstContractPath,
	);

	const dstDefaultStoragePath = getOutputStorageFilename(parsedArgs, sourceFile, firstCompTargetName, true);
	await copyFile(
		join(
			getCompilationTargetsDirName(parsedArgs, sourceFile),
			firstCompTargetName,
			'step_000_cont_0_storage.tz',
		),
		dstDefaultStoragePath,
	);

	return [dstContractPath, dstDefaultStoragePath];
};

const copyArtifactsForRestCompTargets = async (
	parsedArgs: Opts,
	sourceFile: string,
	compTargetsNames: string[],
): Promise<string[]> => {
	if (compTargetsNames.length === 0) return [];
	const restCompTargetNames = compTargetsNames.slice(1, compTargetsNames.length);

	const dstStoragePaths = await Promise.all(restCompTargetNames.map(async compTargetName => {
		const dstStoragePath = getOutputStorageFilename(parsedArgs, sourceFile, compTargetName, false);
		await copyFile(
			join(
				getCompilationTargetsDirName(parsedArgs, sourceFile),
				compTargetName,
				'step_000_cont_0_storage.tz',
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
	exprCompTargetsNames: string[],
): Promise<string[]> => {
	if (exprCompTargetsNames.length === 0) return [];

	const dstStoragePaths = await Promise.all(exprCompTargetsNames.map(async exprCompTargetName => {
		const dstStoragePath = getOutputExprFilename(parsedArgs, sourceFile, exprCompTargetName);
		await copyFile(
			join(
				getCompilationTargetsDirName(parsedArgs, sourceFile),
				exprCompTargetName,
				'step_000_expression.tz',
			),
			dstStoragePath,
		);
		return dstStoragePath;
	}));

	return dstStoragePaths;
};

const copyRelevantArtifactForCompTargets = (parsedArgs: Opts, sourceFile: string) =>
	async (
		{ compTargetsNames, exprCompTargetsNames }: { compTargetsNames: string[]; exprCompTargetsNames: string[] },
	): Promise<string> => {
		if (compTargetsNames.length === 0 && exprCompTargetsNames.length === 0) return 'No compilation targets defined';

		const dstContractAndDefaultStoragePaths = await copyArtifactsForFirstCompTarget(
			parsedArgs,
			sourceFile,
			compTargetsNames,
		);

		const dstStoragePaths = await copyArtifactsForRestCompTargets(
			parsedArgs,
			sourceFile,
			compTargetsNames,
		);

		const dstExpressionPaths = await copyArtifactsForExprCompTargets(
			parsedArgs,
			sourceFile,
			exprCompTargetsNames,
		);

		return dstContractAndDefaultStoragePaths.concat(dstStoragePaths).concat(dstExpressionPaths).join('\n');
	};

const getCompileContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const outputDir = getCompilationTargetsDirName(parsedArgs, sourceFile);
	return `~/smartpy-cli/SmartPy.sh compile ${getInputFilename(parsedArgs, sourceFile)} ${outputDir}`;
};

const compileContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getArch()
		.then(() => getCompileContractCmd(parsedArgs, sourceFile))
		.then(execCmd)
		.then(({ stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
		})
		.then(() => getCompilationTargetNames(parsedArgs, sourceFile))
		.then(copyRelevantArtifactForCompTargets(parsedArgs, sourceFile))
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

const compile = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = addPyExtensionIfMissing(parsedArgs.sourceFile);
	let p: Promise<TableRow[]> = compileContract(parsedArgs, sourceFile).then(result => [result]);
	return p.then(sendJsonRes).catch(err => sendAsyncErr(err, false));
};

export default compile;
