import { execCmd, getArch, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { access, readFile, writeFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import { CompileOpts as Opts, emitExternalError, getInputFilename, getLigoDockerImage } from './common';

type TableRow = { contract: string; artifact: string };

type ExprKind = 'storage' | 'default_storage' | 'parameter';

const COMPILE_ERR_MSG: string = 'Not compiled';

const isStorageKind = (exprKind: ExprKind): boolean => exprKind === 'storage' || exprKind === 'default_storage';

const isLIGOFile = (sourceFile: string): boolean => /.+\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isStorageListFile = (sourceFile: string): boolean =>
	/.+\.(storageList|storages)\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isParameterListFile = (sourceFile: string): boolean =>
	/.+\.(parameterList|parameters)\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isContractFile = (sourceFile: string): boolean =>
	isLIGOFile(sourceFile) && !isStorageListFile(sourceFile) && !isParameterListFile(sourceFile);

const extractExt = (path: string): string => {
	const matchResult = path.match(/\.(ligo|religo|mligo|jsligo)$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

const getOutputFilename = (parsedArgs: Opts, sourceFile: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	return join(parsedArgs.config.artifactsDir, `${outputFile}.tz`);
};

// Get the contract name that the storage/parameter file is associated with
// e.g. If sourceFile is token.storageList.mligo, then it'll return token.mligo
const getContractNameForExpr = (sourceFile: string, exprKind: ExprKind): string => {
	try {
		return isStorageKind(exprKind)
			? sourceFile.match(/.+(?=\.(?:storageList|storages)\.(ligo|religo|mligo|jsligo))/)!.join('.')
			: sourceFile.match(/.+(?=\.(?:parameterList|parameters)\.(ligo|religo|mligo|jsligo))/)!.join('.');
	} catch (err) {
		throw new Error(`Something went wrong internally when dealing with filename format: ${err}`);
	}
};

// If sourceFile is token.storageList.mligo, then it'll return token.storage.{storageName}.tz
const getOutputExprFileName = (parsedArgs: Opts, sourceFile: string, exprKind: ExprKind, exprName: string): string => {
	const contractName = basename(getContractNameForExpr(sourceFile, exprKind), extname(sourceFile));
	const outputFile = exprKind === 'default_storage'
		? `${contractName}.default_storage.tz`
		: `${contractName}.${exprKind}.${exprName}.tz`;
	return join(parsedArgs.config.artifactsDir, `${outputFile}`);
};

const getCompileContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${getLigoDockerImage()} compile contract`;
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
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${getLigoDockerImage()} compile ${compilerType}`;
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

const compileExpr = (parsedArgs: Opts, sourceFile: string, exprKind: ExprKind) =>
	(exprName: string): Promise<TableRow> =>
		getArch()
			.then(() => getCompileExprCmd(parsedArgs, sourceFile, exprKind, exprName))
			.then(execCmd)
			.then(({ stderr }) => {
				if (stderr.length > 0) sendWarn(stderr);
				return {
					contract: sourceFile,
					artifact: getOutputExprFileName(parsedArgs, sourceFile, exprKind, exprName),
				};
			})
			.catch(err => {
				emitExternalError(err, sourceFile);
				return {
					contract: sourceFile,
					artifact: COMPILE_ERR_MSG,
				};
			});

const compileExprs = (parsedArgs: Opts, sourceFile: string, exprKind: ExprKind): Promise<TableRow[]> =>
	readFile(getInputFilename(parsedArgs, sourceFile), 'utf8')
		.then(data => data.match(/(?<=\n\s*(let|const)\s+)[a-zA-Z0-9_]+/g))
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
			emitExternalError(err, sourceFile);
			return [{
				contract: sourceFile,
				artifact: `No ${isStorageKind(exprKind) ? 'storage' : 'parameter'} values compiled`,
			}];
		})
		.then(mergeArtifactsOutput(sourceFile));

// TODO: Just for backwards compatibility. Can be deleted in the future.
const tryLegacyStorageNamingConvention = (parsedArgs: Opts, sourceFile: string) => {
	const storageListFile = `${removeExt(sourceFile)}.storages${extractExt(sourceFile)}`;
	const storageListFilename = getInputFilename(parsedArgs, storageListFile);
	return access(storageListFilename).then(() => {
		sendWarn(
			`Warning: The naming convention of "<CONTRACT>.storages.<EXTENSION>" is deprecated and renamed to "<CONTRACT>.storageList.<EXTENSION>". Please adjust your storage file names accordingly\n`,
		);
		return compileExprs(parsedArgs, storageListFile, 'storage');
	});
};

// TODO: Just for backwards compatibility. Can be deleted in the future.
const tryLegacyParameterNamingConvention = (parsedArgs: Opts, sourceFile: string) => {
	const parameterListFile = `${removeExt(sourceFile)}.parameters${extractExt(sourceFile)}`;
	const parameterListFilename = getInputFilename(parsedArgs, parameterListFile);
	return access(parameterListFilename).then(() => {
		sendWarn(
			`Warning: The naming convention of "<CONTRACT>.parameters.<EXTENSION>" is deprecated and renamed to "<CONTRACT>.parameterList.<EXTENSION>". Please adjust your parameter file names accordingly\n`,
		);
		return compileExprs(parsedArgs, parameterListFile, 'parameter');
	});
};

const initContentForStorage = (sourceFile: string): string => {
	const linkToContract = `#include "${sourceFile}"\n\n`;

	const instruction =
		'// Define your initial storage values as a list of LIGO variable definitions,\n// the first of which will be considered the default value to be used for origination later on\n';

	const ext = extractExt(sourceFile);
	let syntax = '';
	if (ext === '.ligo') syntax = '// E.g. const aStorageValue : aStorageType = 10;\n\n';
	else if (ext === '.religo') syntax = '// E.g. let aStorageValue : aStorageType = 10;\n\n';
	else if (ext === '.mligo') syntax = '// E.g. let aStorageValue : aStorageType = 10\n\n';
	else if (ext === '.jsligo') syntax = '// E.g. const aStorageValue : aStorageType = 10;\n\n';

	return linkToContract + instruction + syntax;
};

const initContentForParameter = (sourceFile: string): string => {
	const linkToContract = `#include "${sourceFile}"\n\n`;

	const instruction = '// Define your parameter values as a list of LIGO variable definitions\n';

	const ext = extractExt(sourceFile);
	let syntax = '';
	if (ext === '.ligo') syntax = '// E.g. const aParameterValue : aParameterType = Increment(1);\n\n';
	else if (ext === '.religo') syntax = '// E.g. let aParameterValue : aParameterType = (Increment (1));\n\n';
	else if (ext === '.mligo') syntax = '// E.g. let aParameterValue : aParameterType = Increment 1\n\n';
	else if (ext === '.jsligo') syntax = '// E.g. const aParameterValue : aParameterType = (Increment (1));\n\n';

	return linkToContract + instruction + syntax;
};

const compileContractWithStorageAndParameter = async (parsedArgs: Opts, sourceFile: string): Promise<TableRow[]> => {
	const contractCompileResult = await compileContract(parsedArgs, sourceFile);
	if (contractCompileResult.artifact === COMPILE_ERR_MSG) return [contractCompileResult];

	const storageListFile = `${removeExt(sourceFile)}.storageList${extractExt(sourceFile)}`;
	const storageListFilename = getInputFilename(parsedArgs, storageListFile);
	const storageCompileResult = await access(storageListFilename)
		.then(() => compileExprs(parsedArgs, storageListFile, 'storage'))
		.catch(() => tryLegacyStorageNamingConvention(parsedArgs, sourceFile))
		.catch(() => {
			sendWarn(
				`Note: storage file associated with "${sourceFile}" can't be found, so "${storageListFile}" has been created for you. Use this file to define all initial storage values for this contract\n`,
			);
			writeFile(storageListFilename, initContentForStorage(sourceFile), 'utf8');
		});

	const parameterListFile = `${removeExt(sourceFile)}.parameterList${extractExt(sourceFile)}`;
	const parameterListFilename = getInputFilename(parsedArgs, parameterListFile);
	const parameterCompileResult = await access(parameterListFilename)
		.then(() => compileExprs(parsedArgs, parameterListFile, 'parameter'))
		.catch(() => tryLegacyParameterNamingConvention(parsedArgs, sourceFile))
		.catch(() => {
			sendWarn(
				`Note: parameter file associated with "${sourceFile}" can't be found, so "${parameterListFile}" has been created for you. Use this file to define all parameter values for this contract\n`,
			);
			writeFile(parameterListFilename, initContentForParameter(sourceFile), 'utf8');
		});

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
┌─────────────────────────┬─────────────────────────────────────────────┐
│ Contract                │ Artifact                                    │
├─────────────────────────┼─────────────────────────────────────────────┤
│ hello.storageList.mligo │ artifacts/hello.default_storage.storage1.tz │
├─────────────────────────┼─────────────────────────────────────────────┤
│ hello.storageList.mligo │ artifacts/hello.storage.storage2.tz         │
└─────────────────────────┴─────────────────────────────────────────────┘
								versus
┌─────────────────────────┬─────────────────────────────────────────────┐
│ Contract                │ Artifact                                    │
├─────────────────────────┼─────────────────────────────────────────────┤
│ hello.storageList.mligo │ artifacts/hello.default_storage.storage1.tz │
│                         │ artifacts/hello.storage.storage2.tz         │
└─────────────────────────┴─────────────────────────────────────────────┘
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

const compile = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = parsedArgs.sourceFile;
	let p: Promise<TableRow[]>;
	if (isStorageListFile(sourceFile)) p = compileExprs(parsedArgs, sourceFile, 'storage');
	else if (isParameterListFile(sourceFile)) p = compileExprs(parsedArgs, sourceFile, 'parameter');
	else if (isContractFile(sourceFile)) p = compileContractWithStorageAndParameter(parsedArgs, sourceFile);
	else {
		return sendAsyncErr(
			`${sourceFile} doesn't have a valid LIGO extension ('.ligo', '.religo', '.mligo' or '.jsligo')`,
		);
	}
	return p.then(sendJsonRes).catch(err => sendAsyncErr(err, false));
};

export default compile;
