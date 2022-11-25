import { execCmd, getArch, sendAsyncErr, sendErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { copyFile, readFile } from 'fs/promises';
import { basename, extname, join } from 'path';

type TableRow = { contract: string; artifact: string };

interface Opts extends RequestArgs.ProxyRequestArgs {
	sourceFile: string;
}

const COMPILE_ERR_MSG: string = 'Not compiled';

const SMARTPY_ARTIFACTS_DIR = '.smartpy';

const addPyExtensionIfMissing = (sourceFile: string): string => {
	return /\.py$/.test(sourceFile) ? sourceFile : `${sourceFile}.py`;
};

const extractExt = (path: string): string => {
	const matchResult = path.match(/\.py$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

export const emitExternalError = (err: unknown, sourceFile: string): void => {
	sendErr(`\n=== Error messages for ${sourceFile} ===`);
	err instanceof Error ? sendErr(err.message.replace(/Command failed.+?\n/, '')) : sendErr(err as any);
	sendErr(`\n===`);
};

export const getInputFilename = (parsedArgs: Opts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir, sourceFile);

const getOutputContractFilename = (parsedArgs: Opts, sourceFile: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	return join(parsedArgs.config.artifactsDir, `${outputFile}.tz`);
};

const outputStorageFilename = (
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

const outputExprFilename = (parsedArgs: Opts, sourceFile: string, compilationTargetName: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	const exprName = `${outputFile}.expression.${compilationTargetName}.tz`;
	return join(parsedArgs.config.artifactsDir, exprName);
};

const getSmartPyArtifactDirname = (parsedArgs: Opts, sourceFile: string): string =>
	join(parsedArgs.config.artifactsDir, SMARTPY_ARTIFACTS_DIR, removeExt(sourceFile));

const getCompilationTargetNames = (
	parsedArgs: Opts,
	sourceFile: string,
): Promise<{ compTargetsNames: string[]; exprCompTargetsNames: string[] }> =>
	readFile(getInputFilename(parsedArgs, sourceFile), 'utf8')
		.then(data => {
			const compTargetsNames = data.match(/(?<=add_compilation_target\s*\(\s*['"])[^'"]+(?=['"])/g) ?? [];
			const exprCompTargetsNames = data.match(/(?<=add_expression_compilation_target\s*\(\s*['"])[^'"]+(?=['"])/g)
				?? [];
			return { compTargetsNames, exprCompTargetsNames };
		});

const copyRelevantArtifactForCompTargets = (parsedArgs: Opts, sourceFile: string) =>
	async (
		{ compTargetsNames, exprCompTargetsNames }: { compTargetsNames: string[]; exprCompTargetsNames: string[] },
	): Promise<string> => {
		const copyArtifactsForFirstCompTarget = async () => {
			if (compTargetsNames.length === 0) return [];
			const firstCompTargetName = compTargetsNames.slice(0, 1)[0];

			const dstContractPath = getOutputContractFilename(parsedArgs, sourceFile);
			await copyFile(
				join(
					getSmartPyArtifactDirname(parsedArgs, sourceFile),
					firstCompTargetName,
					'step_000_cont_0_contract.tz',
				),
				dstContractPath,
			);

			const dstDefaultStoragePath = outputStorageFilename(parsedArgs, sourceFile, firstCompTargetName, true);
			await copyFile(
				join(
					getSmartPyArtifactDirname(parsedArgs, sourceFile),
					firstCompTargetName,
					'step_000_cont_0_storage.tz',
				),
				dstDefaultStoragePath,
			);

			return [dstContractPath, dstDefaultStoragePath];
		};

		const copyArtifactsForRestCompTargets = async () => {
			if (compTargetsNames.length === 0) return [];
			const restCompTargetNames = compTargetsNames.slice(1, compTargetsNames.length);

			const dstStoragePaths = await Promise.all(restCompTargetNames.map(async compTargetName => {
				const dstStoragePath = outputStorageFilename(parsedArgs, sourceFile, compTargetName, false);
				await copyFile(
					join(
						getSmartPyArtifactDirname(parsedArgs, sourceFile),
						compTargetName,
						'step_000_cont_0_storage.tz',
					),
					dstStoragePath,
				);
				return dstStoragePath;
			}));

			return dstStoragePaths;
		};

		const copyArtifactsForExprCompTargets = async () => {
			if (exprCompTargetsNames.length === 0) return [];

			const dstStoragePaths = await Promise.all(exprCompTargetsNames.map(async exprCompTargetName => {
				const dstStoragePath = outputExprFilename(parsedArgs, sourceFile, exprCompTargetName);
				await copyFile(
					join(
						getSmartPyArtifactDirname(parsedArgs, sourceFile),
						exprCompTargetName,
						'step_000_expression.tz',
					),
					dstStoragePath,
				);
				return dstStoragePath;
			}));

			return dstStoragePaths;
		};

		if (compTargetsNames.length === 0 && exprCompTargetsNames.length === 0) return 'No compilation targets defined';
		const dstContractAndDefaultStoragePaths = await copyArtifactsForFirstCompTarget();
		const dstStoragePaths = await copyArtifactsForRestCompTargets();
		const dstExpressionPaths = await copyArtifactsForExprCompTargets();
		return dstContractAndDefaultStoragePaths.concat(dstStoragePaths).concat(dstExpressionPaths).join('\n');
	};

const getCompileContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const outputDir = getSmartPyArtifactDirname(parsedArgs, sourceFile);
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
