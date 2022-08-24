import { execCmd, getArch, sendAsyncErr, sendErr, sendJsonRes } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { access, readFile, writeFile } from 'fs/promises';
import { basename, extname, join, parse } from 'path';

interface Opts extends RequestArgs.t {
	sourceFile: string;
}

type TableRow = { contract: string; artifact: string };

type ExprKind = 'storage' | 'default_storage' | 'parameter';

const COMPILE_ERR_MSG: string = 'Not compiled';

const isStorageKind = (exprKind: ExprKind): boolean => exprKind === 'storage' || exprKind === 'default_storage';

const isStoragesFile = (sourceFile: string): boolean => /.+\.storages\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isParametersFile = (sourceFile: string): boolean =>
	/.+\.parameters\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const getInputFilename = (parsedArgs: Opts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir, sourceFile);

const getOutputFilename = (parsedArgs: Opts, sourceFile: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	return join(parsedArgs.config.artifactsDir, `${outputFile}.tz`);
};

// Get the contract name that the storage/parameter file is associated with
// e.g. If sourceFile is token.storages.mligo, then it'll return token.mligo
const getContractNameForExpr = (sourceFile: string, exprKind: ExprKind): string => {
	try {
		return isStorageKind(exprKind)
			? sourceFile.match(/.+(?=\.storages\.(ligo|religo|mligo|jsligo))/)!.join('.')
			: sourceFile.match(/.+(?=\.parameters\.(ligo|religo|mligo|jsligo))/)!.join('.');
	} catch (err) {
		throw new Error(`Something went wrong internally when dealing with filename format: ${err}`);
	}
};

// If sourceFile is token.storages.mligo, then it'll return token.storage.{storageName}.tz
const getOutputExprFileName = (parsedArgs: Opts, sourceFile: string, exprKind: ExprKind, exprName: string): string => {
	const contractName = basename(getContractNameForExpr(sourceFile, exprKind), extname(sourceFile));
	const outputFile = `${contractName}.${exprKind}.${exprName}.tz`;
	return join(parsedArgs.config.artifactsDir, `${outputFile}`);
};

const getCompileContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile contract`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputFilename(parsedArgs, sourceFile)}`;
	const cmd = `${baseCmd} ${inputFile} ${outputFile}`;
	return cmd;
};

const getCompileExprCmd = (parsedArgs: Opts, sourceFile: string, exprKind: ExprKind, exprName: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const compilerType = isStorageKind(exprKind) ? 'storage' : 'parameter';
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile ${compilerType}`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputExprFileName(parsedArgs, sourceFile, exprKind, exprName)}`;
	const cmd = `${baseCmd} ${inputFile} ${exprName} ${outputFile}`;
	return cmd;
};

const compileContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getArch()
		.then(() => getCompileContractCmd(parsedArgs, sourceFile))
		.then(execCmd)
		.then(({ stderr }) => {
			if (stderr.length > 0) sendErr(stderr);
			return {
				contract: sourceFile,
				artifact: getOutputFilename(parsedArgs, sourceFile),
			};
		})
		.catch(err => {
			sendErr(`\n=== For ${sourceFile} ===`);
			sendErr(err.message.replace(/Command failed.+?\n/, ''));
			return {
				contract: sourceFile,
				artifact: COMPILE_ERR_MSG,
			};
		});

const compileExpr = (parsedArgs: Opts, sourceFile: string, exprKind: ExprKind) =>
	(exprName: string): Promise<TableRow> =>
		getArch()
			.then(() => getCompileExprCmd(parsedArgs, sourceFile, exprKind, exprName))
			.then(execCmd)
			.then(({ stderr }) => {
				if (stderr.length > 0) sendErr(stderr);
				return {
					contract: sourceFile,
					artifact: getOutputExprFileName(parsedArgs, sourceFile, exprKind, exprName),
				};
			})
			.catch(err => {
				sendErr(`\n=== For ${sourceFile} ===`);
				sendErr(err.message.replace(/Command failed.+?\n/, ''));
				return {
					contract: sourceFile,
					artifact: COMPILE_ERR_MSG,
				};
			});

const compileExprs = (parsedArgs: Opts, sourceFile: string, exprKind: ExprKind): Promise<TableRow[]> =>
	readFile(getInputFilename(parsedArgs, sourceFile), 'utf8')
		.then(data => {
			if (!data.includes('#include')) {
				writeFile(
					getInputFilename(parsedArgs, sourceFile),
					`#include "${getContractNameForExpr(sourceFile, exprKind)}"\n` + data,
					'utf8',
				);
			}
			return data;
		})
		.then(data => data.match(/(?<=\s*(let|const)\s+)[a-zA-Z0-9_]+/g))
		.then(exprNames => {
			if (!exprNames) return [];
			const firstExprName = exprNames.slice(0, 1)[0];
			const restExprNames = exprNames.slice(1, exprNames.length);
			const firstExprKind = isStorageKind(exprKind) ? 'default_storage' : 'parameter';
			const restExprKind = isStorageKind(exprKind) ? 'storage' : 'parameter';
			const firstExprResult = compileExpr(parsedArgs, sourceFile, firstExprKind)(firstExprName);
			const restExprResults = restExprNames.map(compileExpr(parsedArgs, sourceFile, restExprKind));
			return Promise.all([firstExprResult].concat(restExprResults));
		})
		.catch(err => {
			sendErr(`\n=== For ${sourceFile} ===`);
			sendErr(err.message);
			return [{
				contract: sourceFile,
				artifact: `No ${isStorageKind(exprKind) ? 'storages' : 'parameters'} compiled`,
			}];
		})
		.then(mergeArtifactsOutput(sourceFile));

const compileContractWithStorageAndParameter = async (parsedArgs: Opts, sourceFile: string) => {
	const contractCompileResult = await compileContract(parsedArgs, sourceFile);

	const parsedPath = parse(sourceFile);
	const storagesFilename = `${parsedPath.name}.storages${parsedPath.ext}`;
	const parametersFilename = `${parsedPath.name}.parameters${parsedPath.ext}`;
	const storageFilePath = `${parsedArgs.config.contractsDir}/${storagesFilename}`;
	const parameterFilePath = `${parsedArgs.config.contractsDir}/${parametersFilename}`;

	const storageCompileResult = await access(storageFilePath)
		.then(() => compileExprs(parsedArgs, storagesFilename, 'storage'))
		.catch(() =>
			console.error(
				`Note: storage file associated with ${sourceFile} can't be found. You should create a file named ${storagesFilename} in the same directory as ${sourceFile} and define initial storage values as a list of LIGO variable definitions. e.g. "let STORAGE_NAME: storage = LIGO_EXPR" for mligo`,
			)
		);

	const parameterCompileResult = await access(parameterFilePath)
		.then(() => compileExprs(parsedArgs, parametersFilename, 'parameter'))
		.catch(() =>
			console.error(
				`Note: parameter file associated with ${sourceFile} can't be found. You should create a file named ${parametersFilename} in the same directory as ${sourceFile} and define parameter values as a list of LIGO variable definitions. e.g. "let PARAMETER_NAME: parameter = LIGO_EXPR" for mligo`,
			)
		);

	let compileResults: TableRow[] = [contractCompileResult];
	if (storageCompileResult) compileResults = compileResults.concat(storageCompileResult);
	if (parameterCompileResult) compileResults = compileResults.concat(parameterCompileResult);
	return compileResults;
};

/*
Compiling storage/parameter file amounts to compiling multiple expressions in that file,
resulting in multiple rows with the same file name but different artifact names.
This will merge these rows into one row with just one mention of the file name.
e.g.
┌──────────────────────┬─────────────────────────────────────────────┐
│ Contract             │ Artifact                                    │
├──────────────────────┼─────────────────────────────────────────────┤
│ hello.storages.mligo │ artifacts/hello.default_storage.storage1.tz │
├──────────────────────┼─────────────────────────────────────────────┤
│ hello.storages.mligo │ artifacts/hello.storage.storage2.tz         │
└──────────────────────┴─────────────────────────────────────────────┘
								versus
┌──────────────────────┬─────────────────────────────────────────────┐
│ Contract             │ Artifact                                    │
├──────────────────────┼─────────────────────────────────────────────┤
│ hello.storages.mligo │ artifacts/hello.default_storage.storage1.tz │
│                      │ artifacts/hello.storage.storage2.tz         │
└──────────────────────┴─────────────────────────────────────────────┘
*/
const mergeArtifactsOutput = (sourceFile: string) =>
	(tableRows: TableRow[]): TableRow[] => {
		const artifactsOutput = tableRows.reduce(
			(acc: string, row: TableRow) => row.artifact === COMPILE_ERR_MSG ? acc : `${acc}${row.artifact}\n`,
			'',
		);
		return [{
			contract: sourceFile,
			artifact: artifactsOutput,
		}];
	};

export const compile = (parsedArgs: Opts) => {
	const sourceFile = parsedArgs.sourceFile;
	if (!sourceFile) return sendAsyncErr('No source file specified.');
	try {
		if (isStoragesFile(sourceFile)) return compileExprs(parsedArgs, sourceFile, 'storage').then(sendJsonRes);
		if (isParametersFile(sourceFile)) return compileExprs(parsedArgs, sourceFile, 'parameter').then(sendJsonRes);
		return compileContractWithStorageAndParameter(parsedArgs, sourceFile).then(sendJsonRes);
	} catch (err: any) {
		return sendAsyncErr(err, false);
	}
};

export default compile;
