import { execCmd, getArch, sendAsyncErr, sendErr, sendJsonRes } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { readFile, writeFile } from 'fs/promises';
import { basename, extname, join } from 'path';

interface Opts extends RequestArgs.t {
	sourceFile: string;
}

type TableRow = { contract: string; artifact: string };

type ExprKind = 'storage' | 'default_storage' | 'parameter';

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
		throw new Error('Something went wrong internally when dealing with filename format');
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
			sendErr(err.message.replace(/Command failed.+?\n/, ''));
			return Promise.resolve({
				contract: sourceFile,
				artifact: 'Not compiled',
			});
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
				sendErr(err.message.replace(/Command failed.+?\n/, ''));
				return Promise.resolve({
					contract: sourceFile,
					artifact: 'Not compiled',
				});
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
			if (!exprNames) return Promise.resolve([]);
			const firstExprName = exprNames.slice(0, 1)[0];
			const restExprNames = exprNames.slice(1, exprNames.length);
			const firstExprKind = isStorageKind(exprKind) ? 'default_storage' : 'parameter';
			const restExprKind = isStorageKind(exprKind) ? 'storage' : 'parameter';
			const firstExprResult = compileExpr(parsedArgs, sourceFile, firstExprKind)(firstExprName);
			const restExprResults = restExprNames.map(compileExpr(parsedArgs, sourceFile, restExprKind));
			return Promise.all([firstExprResult].concat(restExprResults));
		})
		.catch(err => {
			sendErr(err.message);
			return Promise.resolve([{
				contract: sourceFile,
				artifact: `No ${isStorageKind(exprKind) ? 'storages' : 'parameters'} compiled`,
			}]);
		});

const mergeArtifactsOutput = (sourceFile: string) =>
	(tableRows: TableRow[]): TableRow[] => {
		const artifactsOutput = tableRows.reduce(
			(acc: string, row: TableRow) => row.artifact === 'Not compiled' ? acc : `${acc}${row.artifact}\n`,
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
	let p: Promise<TableRow[]>;
	if (isStoragesFile(sourceFile)) {
		p = compileExprs(parsedArgs, sourceFile, 'storage').then(mergeArtifactsOutput(sourceFile));
	} else if (isParametersFile(sourceFile)) {
		p = compileExprs(parsedArgs, sourceFile, 'parameter').then(mergeArtifactsOutput(sourceFile));
	} else {
		p = compileContract(parsedArgs, sourceFile).then(result => [result]);
	}
	return p.then(sendJsonRes).catch(err => sendAsyncErr(err, false));
};

export default compile;
