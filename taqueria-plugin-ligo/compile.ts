import {
	execCmd,
	getArch,
	getArtifactsDir,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	sendWarn,
	
} from '@taqueria/node-sdk';
import { access, readFile, writeFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import {
	CompileOpts as Opts,
	emitExternalError,
	getInputFilenameAbsPath,
	getInputFilenameRelPath,
	getLigoDockerImage,
	UnionOpts,
} from './common';

export type TableRow = { contract: string; artifact: string };

export type ExprKind = 'storage' | 'default_storage' | 'parameter';

const COMPILE_ERR_MSG: string = 'Not compiled';

const isStorageKind = (exprKind: ExprKind): boolean => exprKind === 'storage' || exprKind === 'default_storage';

const isLIGOFile = (sourceFile: string): boolean => /.+\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isStorageListFile = (sourceFile: string): boolean =>
	/.+\.(storageList|storages)\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isParameterListFile = (sourceFile: string): boolean =>
	/.+\.(parameterList|parameters)\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isContractFile = (sourceFile: string): boolean =>
	isLIGOFile(sourceFile) && !isStorageListFile(sourceFile) && !isParameterListFile(sourceFile);

const getModuleName = async (parsedArgs: Opts, sourceFile: string): Promise<string | undefined> => {
	const fileContent = await readFile(getInputFilenameAbsPath(parsedArgs, sourceFile), 'utf8');
	if (fileContent.includes('@entry') && fileContent.includes('module')) {
		const match = fileContent.match(/module ([^\s]+)/);
		return match ? match[1] : undefined;
	}
	return undefined;
};

export const listContractModules = async (parsedArgs: UnionOpts, sourceFile: string): Promise<string[]> => {
	try {
		await getArch();
		const cmd = await getListDeclarationsCmd(parsedArgs, sourceFile);
		const { stderr, stdout } = await execCmd(cmd);
		if (stderr.length > 0) return Promise.reject(stderr);

		const modules = JSON.parse(stdout).declarations
			.filter((decl: string) => decl.endsWith('.$main'))
			.map((decl: string) => decl.split('.')[0]);

		return modules;
	} catch (err) {
		emitExternalError(err, sourceFile);
		return [];
	}
};

const getListDeclarationsCmd = async (parsedArgs: UnionOpts, sourceFile: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw new Error(`No project directory provided`);
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${getLigoDockerImage()} info list-declarations`;
	const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
	const flags = '--display-format json';
	const cmd = `${baseCmd} ${inputFile} ${flags}`;
	return cmd;
};

const extractExt = (path: string): string => {
	const matchResult = path.match(/\.(ligo|religo|mligo|jsligo)$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

const isOutputFormatJSON = (parsedArgs: Opts): boolean => parsedArgs.json;

const getOutputContractFilename = (parsedArgs: Opts, moduleName: string): string => {
	const outputFile = `${moduleName}`;
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	return join(getArtifactsDir(parsedArgs), `${outputFile}${ext}`);
};

// Get the contract name that the storage/parameter file is associated with based on module name
const getContractNameForExpr = (moduleName: string, exprKind: ExprKind): string => {
	try {
		return isStorageKind(exprKind)
			? moduleName
			: moduleName;
	} catch (err) {
		throw new Error(`Something went wrong internally when dealing with filename format: ${err}`);
	}
};

const getOutputExprFilename = (parsedArgs: Opts, moduleName: string, exprKind: ExprKind, exprName: string): string => {
	const contractName = getContractNameForExpr(moduleName, exprKind);
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	const outputFile = exprKind === 'default_storage'
		? `${contractName}.default_storage${ext}`
		: `${contractName}.${exprKind}.${exprName}${ext}`;
	return join(getArtifactsDir(parsedArgs), `${outputFile}`);
};

const getCompileContractCmd = async (parsedArgs: Opts, sourceFile: string, moduleName: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw new Error(`No project directory provided`);
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${getLigoDockerImage()} compile contract`;
	const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputContractFilename(parsedArgs, moduleName)}`;
	const flags = isOutputFormatJSON(parsedArgs) ? ' --michelson-format json ' : '';
	const entryFlag = `-m ${moduleName}`;
	const cmd = `${baseCmd} ${inputFile} ${outputFile} ${flags}${entryFlag}`;
	return cmd;
};

const getCompileExprCmd = (parsedArgs: Opts, sourceFile: string, moduleName: string, exprKind: ExprKind, exprName: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw new Error(`No project directory provided`);
	const compilerType = isStorageKind(exprKind) ? 'storage' : 'parameter';
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${getLigoDockerImage()} compile ${compilerType}`;
	const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputExprFilename(parsedArgs, moduleName, exprKind, exprName)}`;
	const flags = isOutputFormatJSON(parsedArgs) ? ' --michelson-format json ' : '';
	const cmd = `${baseCmd} ${inputFile} ${exprName} ${outputFile} ${flags} -m ${moduleName}`;
	console.warn(cmd)
	return cmd;
};

const compileContract = async (parsedArgs: Opts, sourceFile: string, moduleName: string): Promise<TableRow> => {
	try {
		await getArch();
		const cmd = await getCompileContractCmd(parsedArgs, sourceFile, moduleName);
		const { stderr } = await execCmd(cmd);
		if (stderr.length > 0) sendWarn(stderr);
		return {
			contract: moduleName,
			artifact: getOutputContractFilename(parsedArgs, moduleName),
		};
	} catch (err) {
		emitExternalError(err, sourceFile);
		return {
			contract: moduleName,
			artifact: COMPILE_ERR_MSG,
		};
	}
};

const compileExpr = (parsedArgs: Opts, sourceFile: string, moduleName: string, exprKind: ExprKind) =>
	(exprName: string): Promise<TableRow> =>
		getArch()
			.then(() => getCompileExprCmd(parsedArgs, sourceFile, moduleName, exprKind, exprName))
			.then(execCmd)
			.then(({ stderr }) => {
				if (stderr.length > 0) sendWarn(stderr);
				const artifactName = getOutputExprFilename(parsedArgs, moduleName, exprKind, exprName);
				return {
					contract: moduleName,
					artifact: artifactName,
				};
			})
			.catch(err => {
				emitExternalError(err, sourceFile);
				return {
					contract: moduleName,
					artifact: COMPILE_ERR_MSG,
				};
			});

const getExprNames = (parsedArgs: Opts, sourceFile: string): Promise<string[]> =>
	readFile(getInputFilenameAbsPath(parsedArgs, sourceFile), 'utf8')
		.then(data => data.match(/(?<=\n\s*(let|const)\s+)[a-zA-Z0-9_]+/g) ?? []);

const compileExprs = (parsedArgs: Opts, sourceFile: string, moduleName: string, exprKind: ExprKind): Promise<TableRow[]> =>
	getExprNames(parsedArgs, sourceFile)
		.then(exprNames => {
			if (exprNames.length === 0) return [];
			const firstExprName = exprNames.slice(0, 1)[0];
			const restExprNames = exprNames.slice(1, exprNames.length);
			const firstExprKind = isStorageKind(exprKind) ? 'default_storage' : 'parameter';
			const restExprKind = isStorageKind(exprKind) ? 'storage' : 'parameter';
			const firstExprResult = compileExpr(parsedArgs, sourceFile, moduleName, firstExprKind)(firstExprName);
			const restExprResults = restExprNames.map(compileExpr(parsedArgs, sourceFile, moduleName, restExprKind));
			return Promise.all([firstExprResult].concat(restExprResults));
		})
		.catch(err => {
			emitExternalError(err, sourceFile);
			return [{
				contract: moduleName,
				artifact: `No ${isStorageKind(exprKind) ? 'storage' : 'parameter'} expressions compiled`,
			}];
		})
		.then(results =>
			results.length > 0 ? results : [{
				contract: moduleName,
				artifact: `No ${isStorageKind(exprKind) ? 'storage' : 'parameter'} expressions found`,
			}]
		)
		.then(mergeArtifactsOutput(moduleName));

const initContentForStorage = (sourceFile: string): string => {
	const linkToContract = `#include "${sourceFile}"\n\n`;
	const instruction =
		'// Define your initial storage values as a list of LIGO variable definitions, the first of which will be considered the default value to be used for origination later on\n';
	const ext = extractExt(sourceFile);
	let syntax = '';
	switch (ext) {
		case '.ligo':
			syntax = '// E.g. const aStorageValue : aStorageType = 10;\n\n';
			break;
		case '.religo':
			syntax = '// E.g. let aStorageValue : aStorageType = 10;\n\n';
			break;
		case '.mligo':
			syntax = '// E.g. let aStorageValue : aStorageType = 10\n\n';
			break;
		case '.jsligo':
			syntax = '// E.g. const aStorageValue : aStorageType = 10;\n\n';
			break;
	}
	return linkToContract + instruction + syntax;
};

const initContentForParameter = (sourceFile: string, moduleName: string): string => {
	const linkToContract = `#include "${sourceFile}"\n\n`;
	const instruction = '// Define your parameter values as a list of LIGO variable definitions\n';
	const ext = extractExt(sourceFile);
	let syntax = '';
	switch (ext) {
		case '.ligo':
			syntax = `// E.g. const default_parameter : parameter_of ${moduleName} = Increment(1);\n\n`;
			break;
		case '.mligo':
			syntax = `// E.g. let default_parameter :  (${moduleName} parameter_of) = (Increment 1);\n\n `;
			break;
		case '.jsligo':
			syntax = `// E.g. const default_parameter : parameter_of ${moduleName} = (Increment (1));\n\n`;
			break;
	}
	return linkToContract + instruction + syntax;
};

export const compileContractWithStorageAndParameter = async (
	parsedArgs: Opts,
	sourceFile: string,
	moduleName: string
): Promise<TableRow[]> => {
	const contractCompileResult = await compileContract(parsedArgs, sourceFile, moduleName);
	if (contractCompileResult.artifact === COMPILE_ERR_MSG) return [contractCompileResult];

	const storageListFile = `${removeExt(moduleName)}.storageList${extractExt(sourceFile)}`;
	const storageListFilename = getInputFilenameAbsPath(parsedArgs, storageListFile);
	const storageCompileResult = await access(storageListFilename)
		.then(() => compileExprs(parsedArgs, storageListFile, moduleName, 'storage'))
		.catch(() => {
			sendWarn(
				`Note: storage file associated with "${moduleName}" can't be found, so "${storageListFile}" has been created for you. Use this file to define all initial storage values for this contract\n`,
			);
			return writeFile(storageListFilename, initContentForStorage(sourceFile), 'utf8');
		});

	const parameterListFile = `${removeExt(moduleName)}.parameterList${extractExt(sourceFile)}`;
	const parameterListFilename = getInputFilenameAbsPath(parsedArgs, parameterListFile);
	const parameterCompileResult = await access(parameterListFilename)
		.then(() => compileExprs(parsedArgs, parameterListFile, moduleName, 'parameter'))
		.catch(() => {
			sendWarn(
				`Note: parameter file associated with "${moduleName}" can't be found, so "${parameterListFile}" has been created for you. Use this file to define all parameter values for this contract\n`,
			);
			return writeFile(parameterListFilename, initContentForParameter(sourceFile, moduleName), 'utf8');
		});

	let compileResults: TableRow[] = [contractCompileResult];
	if (storageCompileResult) compileResults = compileResults.concat(storageCompileResult);
	if (parameterCompileResult) compileResults = compileResults.concat(parameterCompileResult);
	return compileResults;
};

export const compile = async (parsedArgs: Opts): Promise<void> => {
    const sourceFile = parsedArgs.sourceFile;
    if (!isLIGOFile(sourceFile)) {
        sendErr(`${sourceFile} is not a LIGO file`);
        return;
    }
    if (isStorageListFile(sourceFile) || isParameterListFile(sourceFile)) {
        sendErr(`Storage and parameter list files are not meant to be compiled directly`);
        return;
    }

    try {
        const moduleNames = await listContractModules(parsedArgs, sourceFile);
        if (moduleNames.length === 0) {
            sendErr(`No contract modules found in "${sourceFile}"`);
            return;
        }

        let allCompileResults: TableRow[] = [];
        for (const moduleName of moduleNames) {
            const compileResults = await compileContractWithStorageAndParameter(parsedArgs, sourceFile, moduleName);
            allCompileResults = allCompileResults.concat(compileResults);
        }

        sendJsonRes(allCompileResults);
    } catch (err) {
        sendErr(`Error processing "${sourceFile}": ${err}`);
    }
};

const mergeArtifactsOutput = (moduleName: string) => (compileResults: TableRow[]): TableRow[] => {
	const filteredResults = compileResults.filter(result => result.artifact !== COMPILE_ERR_MSG);
	if (filteredResults.length === 0) return compileResults;

	const mergedArtifact = {
		contract: moduleName,
		artifact: filteredResults.map(result => result.artifact).join('; '),
	};
	return [mergedArtifact];
};

export default compile;