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
import {
	CompileOpts as Opts,
	emitExternalError,
	getInputFilenameAbsPath,
	getInputFilenameRelPath,
	getLigoDockerImage,
	UnionOpts,
} from './common';

export type TableRow = { source: string; artifact: string };

export type ExprKind = 'storage' | 'default_storage' | 'parameter';

export type ModuleInfo = {
	moduleName: string;
	sourceName: string;
	sourceFile: string;
	syntax: 'mligo' | 'jsligo' | 'religo' | 'ligo';
	type: 'file-main' | 'file-entry' | 'module-main' | 'module-entry';
};

const COMPILE_ERR_MSG: string = 'Not compiled';

const isStorageKind = (exprKind: ExprKind): boolean => exprKind === 'storage' || exprKind === 'default_storage';

export const isSupportedLigoSyntax = (sourceFile: string) => /\.(mligo|jsligo)$/.test(sourceFile);

export const isUnsupportedLigoSyntax = (sourceFile: string) => /\.(ligo|religo)$/.test(sourceFile);

export const isLIGOFile = (sourceFile: string) =>
	isSupportedLigoSyntax(sourceFile) || isUnsupportedLigoSyntax(sourceFile);

export const isStorageListFile = (sourceFile: string): boolean =>
	/.+\.(storageList|storages)\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

export const isParameterListFile = (sourceFile: string): boolean =>
	/.+\.(parameterList|parameters)\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

export const listContractModules = async (parsedArgs: UnionOpts, sourceFile: string): Promise<ModuleInfo[]> => {
	try {
		await getArch();
		const cmd = await getListDeclarationsCmd(parsedArgs, sourceFile);
		const { stderr, stdout } = await execCmd(cmd);
		if (stderr.length > 0) return Promise.reject(stderr);

		return JSON.parse(stdout).declarations.reduce(
			(acc: ModuleInfo[], decl: string) => {
				// We need to process delcarations (decl) like so:
				// 1. If the decl is equal to the string "main", then the module type is "file-main" and the name of the module is the sourceFile.
				// 2. If the decl is equal to $main, then the module type is "file-entry" and the name fo the module is the sourceFile.
				// 3. If the decl ends with .main, then the module type is "module-main" and the name of the module is the decl without the .main suffix.
				// 4. If the decl ends with .$main, then the module type is "module-entry" and the name of the module is the decl without the .$main suffix.
				// Otherwise, this is not a declaration we care about.
				const srcFile = removeExt(basename(sourceFile));
				const syntax = extractExt(sourceFile).replace('.', '');

				if (decl === 'main') {
					return [...acc, { moduleName: srcFile, sourceName: sourceFile, sourceFile, type: 'file-main', syntax }];
				} else if (decl === '$main') {
					return [...acc, { moduleName: srcFile, sourceName: sourceFile, sourceFile, type: 'file-entry', syntax }];
				} else if (decl.endsWith('.main')) {
					const moduleName = decl.replace(/\.main$/, '');
					return [...acc, {
						moduleName,
						sourceName: `${sourceFile}/${moduleName}`,
						sourceFile,
						type: 'module-main',
						syntax,
					}];
				} else if (decl.endsWith('.$main')) {
					const moduleName = decl.replace(/\.\$main$/, '');
					return [...acc, {
						moduleName,
						sourceName: `${sourceFile}/${moduleName}`,
						sourceFile,
						type: 'module-entry',
						syntax,
					}];
				}
				return acc;
			},
			[],
		);
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

const getOutputContractFilename = (parsedArgs: Opts, module: ModuleInfo): string => {
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	return join(getArtifactsDir(parsedArgs), `${module.moduleName}${ext}`);
};

const getOutputExprFilename = (parsedArgs: Opts, module: ModuleInfo, exprKind: ExprKind, exprName: string): string => {
	const contractName = module.moduleName;
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	const outputFile = exprKind === 'default_storage'
		? `${contractName}.default_storage${ext}`
		: `${contractName}.${exprKind}.${exprName}${ext}`;
	return join(getArtifactsDir(parsedArgs), `${outputFile}`);
};

const getCompileContractCmd = async (parsedArgs: Opts, sourceFile: string, module: ModuleInfo): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw new Error(`No project directory provided`);
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${getLigoDockerImage()} compile contract`;
	const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputContractFilename(parsedArgs, module)}`;
	const flags = isOutputFormatJSON(parsedArgs) ? ' --michelson-format json ' : '';
	const moduleFlag = module.type.startsWith('file-') ? '' : `-m ${module.moduleName}`;
	const cmd = `${baseCmd} ${inputFile} ${outputFile} ${flags}${moduleFlag}`;
	return cmd;
};

const getCompileExprCmd = (
	parsedArgs: Opts,
	sourceFile: string,
	module: ModuleInfo,
	exprKind: ExprKind,
	exprName: string,
): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw new Error(`No project directory provided`);
	const compilerType = isStorageKind(exprKind) ? 'storage' : 'parameter';
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${getLigoDockerImage()} compile ${compilerType}`;
	const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputExprFilename(parsedArgs, module, exprKind, exprName)}`;
	const flags = isOutputFormatJSON(parsedArgs) ? ' --michelson-format json ' : '';

	// Parameter and Storage list files are expected to import the smart contract file as the "Contract" module.
	const moduleFlag = (() => {
		switch (module.type) {
			case 'file-main':
			case 'file-entry':
				return '-m Contract';
			default:
				return `-m Contract.${module.moduleName}`;
		}
	})();

	const cmd = `${baseCmd} ${inputFile} ${exprName} ${outputFile} ${flags} ${moduleFlag}`;
	return cmd;
};

const compileContract = async (parsedArgs: Opts, sourceFile: string, module: ModuleInfo): Promise<TableRow> => {
	try {
		await getArch();
		const cmd = await getCompileContractCmd(parsedArgs, sourceFile, module);
		const { stderr } = await execCmd(cmd);
		if (stderr.length > 0) sendWarn(stderr);

		return {
			source: module.sourceName,
			artifact: getOutputContractFilename(parsedArgs, module),
		};
	} catch (err) {
		emitExternalError(err, sourceFile);
		return {
			source: module.sourceName,
			artifact: COMPILE_ERR_MSG,
		};
	}
};

const compileExpr =
	(parsedArgs: Opts, sourceFile: string, module: ModuleInfo, exprKind: ExprKind) =>
	(exprName: string): Promise<TableRow> => {
		return getArch()
			.then(() => getCompileExprCmd(parsedArgs, sourceFile, module, exprKind, exprName))
			.then(execCmd)
			.then(({ stderr }) => {
				if (stderr.length > 0) sendWarn(stderr);
				const artifactName = getOutputExprFilename(parsedArgs, module, exprKind, exprName);
				return {
					source: module.sourceName,
					artifact: artifactName,
				};
			})
			.catch(err => {
				emitExternalError(err, sourceFile);
				return {
					source: module.sourceName,
					artifact: `${sourceFile} not compiled`,
				};
			});
	};

const getExprNames = (parsedArgs: Opts, sourceFile: string): Promise<string[]> =>
	readFile(getInputFilenameAbsPath(parsedArgs, sourceFile), 'utf8')
		.then(data => data.match(/(?<=\n\s*(let|const)\s+)[a-zA-Z0-9_]+/g) ?? []);

const compileExprs = (
	parsedArgs: Opts,
	sourceFile: string,
	module: ModuleInfo,
	exprKind: ExprKind,
): Promise<TableRow[]> =>
	getExprNames(parsedArgs, sourceFile)
		.then(exprNames => {
			if (exprNames.length === 0) return [];
			const firstExprName = exprNames.slice(0, 1)[0];
			const restExprNames = exprNames.slice(1, exprNames.length);
			const firstExprKind = isStorageKind(exprKind) ? 'default_storage' : 'parameter';
			const restExprKind = isStorageKind(exprKind) ? 'storage' : 'parameter';
			const firstExprResult = compileExpr(parsedArgs, sourceFile, module, firstExprKind)(firstExprName);
			const restExprResults = restExprNames.map(compileExpr(parsedArgs, sourceFile, module, restExprKind));
			return Promise.all([firstExprResult].concat(restExprResults));
		})
		.catch(err => {
			emitExternalError(err, sourceFile);
			return [{
				source: module.sourceName,
				artifact: `No ${isStorageKind(exprKind) ? 'storage' : 'parameter'} expressions compiled`,
			}];
		})
		.then(results =>
			results.length > 0 ? results : [{
				source: module.sourceName,
				artifact: `No ${isStorageKind(exprKind) ? 'storage' : 'parameter'} expressions found`,
			}]
		);

const initContentForStorage = (module: ModuleInfo): string => {
	const linkToContract = `#import "${module.sourceFile}" "Contract"\n\n`;
	const instruction =
		'// Define your initial storage values as a list of LIGO variable definitions, the first of which will be considered the default value to be used for origination later on\n';

	const syntax = (() => {
		const pair = [module.syntax, module.type].join('-');
		switch (pair) {
			case 'mligo-file-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was not within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. let storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract',
					'// E.g. let storage : Contract.storage = 10',
				];
				break;
			case 'mligo-file-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was not within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. let storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract',
					'// E.g. let storage : Contract.storage = 10',
				];
				break;
			case 'mligo-module-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. let storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract',
					`// E.g. let storage : Contract.${module.moduleName}.storage = 10`,
				];
				break;
			case 'mligo-module-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. let storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract',
					`// E.g. let storage : Contract.${module.moduleName}.storage = 10`,
				];
				break;
			case 'jsligo-file-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was not within a namespace. As such, the examples below are written with that assumption in mind.',
					`// NOTE: The "storage" type should be exported from the contract file (${module.sourceFile})`,
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. const storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract. This assumes that you have exported your `storage` type from the contract file.',
					'// E.g. const storage : Contract.storage = 10',
				];
				break;
			case 'jsligo-file-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was not within a namespace. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. const storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract. This assumes that you have exported your `storage` type from the contract file.',
					'// E.g. const storage : Contract.storage = 10',
				];
				break;
			case 'jsligo-module-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was within a namespace. As such, the examples below are written with that assumption in mind.',
					`// NOTE: The "storage" type should be exported from the contract file (${module.sourceFile})`,
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. const storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract. This assumes that you have exported your `storage` type from the contract file.',
					`// E.g. const storage : Contract.${module.moduleName}.storage = 10`,
				];
				break;
			case 'jsligo-module-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was within a namespace. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your storage is a simple value, you can define it directly',
					'// E.g. const storage = 10',
					'',
					'// For added type-safety, you can reference the type of your storage from the contract. This assumes that you have exported your `storage` type from the contract file.',
					`// E.g. const storage : Contract.${module.moduleName}.storage = 10`,
				];
				break;
			default:
				return [];
		}
	})();
	return linkToContract + instruction + syntax.join('\n');
};

const initContentForParameter = (module: ModuleInfo): string => {
	const linkToContract = `#import "${module.sourceFile}" "Contract"\n\n`;
	const instruction = '// Define your parameter values as a list of LIGO variable definitions\n';

	const syntax = (() => {
		const pair = [module.syntax, module.type].join('-');
		switch (pair) {
			case 'mligo-file-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was not within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. let default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					'// E.g. let default_parameter : Contract.parameter = 10',
				];
				break;
			case 'mligo-file-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was not within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. let default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					'// E.g. let default_parameter : parameter_of Contract = 10',
				];
				break;
			case 'mligo-module-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. let default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					`// E.g. let default_parameter : Contract.${module.moduleName}.parameter = 10`,
				];
				break;
			case 'mligo-module-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was within a named module. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. let default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					`// E.g. let default_parameter : parameter_of Contract.${module.moduleName} = 10`,
				];
				break;
			case 'jsligo-file-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was not within a namespace. As such, the examples below are written with that assumption in mind.',
					`// NOTE: The "parameter" type should be exported from the contract file (${module.sourceFile})`,
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. const default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					'// E.g. const default_parameter : Contract.parameter = 10',
				];
				break;
			case 'jsligo-file-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was not within a namespace. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. const default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					'// E.g. const default_parameter : parameter_of Contract = 10',
				];
				break;
			case 'jsligo-module-main':
				return [
					'// When this file was created, the smart contract was defined with a main function that was within a namespace. As such, the examples below are written with that assumption in mind.',
					`// NOTE: The "parameter" type should be exported from the contract file (${module.sourceFile})`,
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. const default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					`// E.g. const default_parameter : Contract.${module.moduleName}.parameter = 10`,
				];
				break;
			case 'jsligo-module-entry':
				return [
					'// When this file was created, the smart contract was defined with an entrypoint using `@entry` that was within a namespace. As such, the examples below are written with that assumption in mind.',
					'',
					'// If your parameter is a simple value, you can define it directly',
					'// E.g. const default_parameter = 10',
					'',
					'// For added type-safety, you can reference the type of your parameter from the contract',
					`// E.g. const default_parameter : parameter_of Contract.${module.moduleName} = 10`,
				];
				break;
			default:
				return [];
		}
	})();

	return linkToContract + instruction + syntax.join('\n');
};

export const compileContractWithStorageAndParameter = async (
	parsedArgs: Opts,
	sourceFile: string,
	module: ModuleInfo,
): Promise<TableRow[]> => {
	const contractCompileResult = await compileContract(parsedArgs, sourceFile, module);
	if (contractCompileResult.artifact === COMPILE_ERR_MSG) return [contractCompileResult];

	const storageListFile = `${module.moduleName}.storageList${extractExt(sourceFile)}`;
	const storageListFilename = getInputFilenameAbsPath(parsedArgs, storageListFile);
	const storageCompileResult = await access(storageListFilename)
		.then(() => compileExprs(parsedArgs, storageListFile, module, 'storage'))
		.catch(() => {
			sendWarn(
				`Note: storage file associated with "${module.moduleName}" can't be found, so "${storageListFile}" has been created for you. Use this file to define all initial storage values for this contract\n`,
			);
			return writeFile(storageListFilename, initContentForStorage(module), 'utf8');
		});

	const parameterListFile = `${module.moduleName}.parameterList${extractExt(sourceFile)}`;
	const parameterListFilename = getInputFilenameAbsPath(parsedArgs, parameterListFile);
	const parameterCompileResult = await access(parameterListFilename)
		.then(() => compileExprs(parsedArgs, parameterListFile, module, 'parameter'))
		.catch(() => {
			sendWarn(
				`Note: parameter file associated with "${module.moduleName}" can't be found, so "${parameterListFile}" has been created for you. Use this file to define all parameter values for this contract\n`,
			);
			return writeFile(parameterListFilename, initContentForParameter(module), 'utf8');
		});

	const storageArtifacts = storageCompileResult ? storageCompileResult.map(res => res.artifact).join('\n') : '';
	const parameterArtifacts = parameterCompileResult ? parameterCompileResult.map(res => res.artifact).join('\n') : '';

	const combinedArtifact = [
		contractCompileResult.artifact,
		storageArtifacts,
		parameterArtifacts,
	].filter(Boolean).join('\n');

	const combinedRow: TableRow = {
		source: module.sourceName,
		artifact: combinedArtifact,
	};

	return [combinedRow];
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
	if (isUnsupportedLigoSyntax(sourceFile)) {
		sendErr(`Unsupported LIGO syntax detected in ${sourceFile}. Note, we only support .jsligo and .mligo files.`);
		return;
	}

	try {
		const modules = await listContractModules(parsedArgs, sourceFile);
		if (modules.length === 0) {
			return sendJsonRes([
				{
					source: sourceFile,
					artifact: `No contract modules found in "${sourceFile}"`,
				},
			]);
		}

		let allCompileResults: TableRow[] = [];
		for (const module of modules) {
			// If we're only to compile a particular module, then we'll skip any that don't match
			if (parsedArgs.module && parsedArgs.module !== module.moduleName) continue;

			const compileResults = await compileContractWithStorageAndParameter(parsedArgs, sourceFile, module);
			allCompileResults = allCompileResults.concat(compileResults);
		}

		sendJsonRes(allCompileResults, { footer: `\nCompiled ${allCompileResults.length} contract(s) in "${sourceFile}"` });
	} catch (err) {
		sendErr(`Error processing "${sourceFile}": ${err}`);
	}
};

export default compile;
