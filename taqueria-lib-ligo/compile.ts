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
import { createReadStream } from 'fs';
import { access, readFile, writeFile } from 'fs/promises';
import { basename, extname, join } from 'path';
import * as readline from 'readline';
import {
	Common,
	CompileOpts as Opts,
	emitExternalError,
	formatLigoError,
	getInputFilenameAbsPath,
	getInputFilenameRelPath,
	UnionOpts,
} from './common';

export type TableRow = { source: string; artifact: string; err?: unknown };

export type ExprKind = 'storage' | 'default_storage' | 'parameter';

export type Syntax = 'mligo' | 'jsligo' | 'religo' | 'ligo';

export type ModuleInfo = {
	moduleName: string;
	sourceName: string;
	sourceFile: string;
	syntax: Syntax;
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
	/.+\.(parameterList|parameters)\.(ligo|religo|mligo|jsligo)$/.test(
		sourceFile,
	);

const extractExt = (path: string): string => {
	const matchResult = path.match(/\.(ligo|religo|mligo|jsligo)$/);
	return matchResult ? matchResult[0] : '';
};

const removeExt = (path: string): string => {
	const extRegex = new RegExp(extractExt(path));
	return path.replace(extRegex, '');
};

const isOutputFormatJSON = (parsedArgs: Opts): boolean => parsedArgs.json;

const getOutputContractFilename = (
	parsedArgs: Opts,
	module: ModuleInfo,
): string => {
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	return join(getArtifactsDir(parsedArgs), `${module.moduleName}${ext}`);
};

const getOutputExprFilename = (
	parsedArgs: Opts,
	module: ModuleInfo,
	exprKind: ExprKind,
	exprName: string,
): string => {
	const contractName = module.moduleName;
	const ext = isOutputFormatJSON(parsedArgs) ? '.json' : '.tz';
	const outputFile = exprKind === 'default_storage'
		? `${contractName}.default_storage${ext}`
		: `${contractName}.${exprKind}.${exprName}${ext}`;
	return join(getArtifactsDir(parsedArgs), `${outputFile}`);
};

const getExprNames = (
	parsedArgs: Opts,
	sourceFile: string,
): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		const inputFilePath = getInputFilenameAbsPath(parsedArgs, sourceFile);
		const readInterface = readline.createInterface({
			input: createReadStream(inputFilePath),
			output: process.stdout,
		});

		const variableNames: string[] = [];

		readInterface.on('line', function(line) {
			// Skip lines that start with a comment
			if (!line.trim().startsWith('//')) {
				const matches = line.match(/(?<=\s*(let|const)\s+)[a-zA-Z0-9_]+/g);
				if (matches) {
					variableNames.push(...matches);
				}
			}
		});

		readInterface.on('close', function() {
			resolve(variableNames);
		});
	});
};

// Helper function to get the initial message based on the pair value
const getInitialMessage = (pair: string, module: ModuleInfo) => {
	const messages = {
		'mligo-file-main':
			`// When this file was created, the smart contract was defined with a main function that was not within a named module. As such, the examples below are written with that assumption in mind.`,
		'mligo-file-entry':
			`// When this file was created, the smart contract was defined with an entrypoint using \`@entry\` that was not within a named module. As such, the examples below are written with that assumption in mind.`,
		'mligo-module-main':
			`// When this file was created, the smart contract was defined with a main function that was within a named module. As such, the examples below are written with that assumption in mind.`,
		'mligo-module-entry':
			`// When this file was created, the smart contract was defined with an entrypoint using \`@entry\` that was within a named module. As such, the examples below are written with that assumption in mind.`,
		'jsligo-file-main':
			`// When this file was created, the smart contract was defined with a main function that was not within a namespace. As such, the examples below are written with that assumption in mind.\n`
			+ `// NOTE: The "storage" type should be exported from the contract file (${module.sourceFile})`,
		'jsligo-file-entry':
			`// When this file was created, the smart contract was defined with an entrypoint using \`@entry\` that was not within a namespace. As such, the examples below are written with that assumption in mind.`,
		'jsligo-module-main':
			`// When this file was created, the smart contract was defined with a main function that was within a namespace. As such, the examples below are written with that assumption in mind.\n`
			+ `// NOTE: The "storage" type should be exported from the contract file (${module.sourceFile})`,
		'jsligo-module-entry':
			`// When this file was created, the smart contract was defined with an entrypoint using \`@entry\` that was within a namespace. As such, the examples below are written with that assumption in mind.`,
		// ... any other combinations
	} as Record<string, string>;

	return messages[pair] || '// This file was created by Taqueria.';
};

// Helper function to get a common message
const getCommonMsg = (langType: Syntax, listType: ExprKind) => {
	const varKeyword = langType === 'mligo' ? 'let' : 'const';
	const commonMsgForStorage = `// IMPORTANT: We suggest always explicitly typing your storage values:\n`
		+ `// E.g.: \`${varKeyword} storage: int = 10\` or \`${varKeyword} storage: Contract.storage = 10\``;

	const commonMsgForParameter = `// IMPORTANT: We suggest always explicitly typing your parameter values:\n`
		+ `// E.g.: \`${varKeyword} parameter: int = 10\` or \`${varKeyword} parameter: Contract.parameter = 10\``;

	return listType === 'storage' ? commonMsgForStorage : commonMsgForParameter;
};

// Main function to get the content for storage or parameter
const getContent = (moduleInfo: ModuleInfo, listType: ExprKind) => {
	const linkToContract = `#import "${moduleInfo.sourceFile}" "Contract"`;
	const pair = `${moduleInfo.syntax}-${moduleInfo.type}`;
	const initialMsg = getInitialMessage(pair, moduleInfo);
	const commonMsg = getCommonMsg(moduleInfo.syntax, listType);

	return `${linkToContract}\n\n${initialMsg}\n\n${commonMsg}`;
};

// Usage for storage list
const initContentForStorage = (moduleInfo: ModuleInfo) => getContent(moduleInfo, 'storage');

// Usage for parameter list
const initContentForParameter = (moduleInfo: ModuleInfo) => getContent(moduleInfo, 'parameter');

// Inject commonObj to return some functions
export const inject = (commonObj: Common) => {
	const { getLigoDockerImage } = commonObj;

	const getListDeclarationsCmd = async (
		parsedArgs: UnionOpts,
		sourceFile: string,
	): Promise<string> => {
		const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
		if (!projectDir) throw new Error(`No project directory provided`);
		const baseCmd = `${commonObj.baseDriverCmd(projectDir)} info list-declarations`;
		const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
		const flags = '--display-format json';
		const cmd = `${baseCmd} ${inputFile} ${flags}`;
		return cmd;
	};

	const listContractModules = async (
		parsedArgs: UnionOpts,
		sourceFile: string,
	): Promise<ModuleInfo[]> => {
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
						return [
							...acc,
							{
								moduleName: srcFile,
								sourceName: sourceFile,
								sourceFile,
								type: 'file-main',
								syntax,
							},
						];
					} else if (decl === '$main') {
						return [
							...acc,
							{
								moduleName: srcFile,
								sourceName: sourceFile,
								sourceFile,
								type: 'file-entry',
								syntax,
							},
						];
					} else if (decl.endsWith('.main')) {
						const moduleName = decl.replace(/\.main$/, '');
						return [
							...acc,
							{
								moduleName,
								sourceName: `${sourceFile}/${moduleName}`,
								sourceFile,
								type: 'module-main',
								syntax,
							},
						];
					} else if (decl.endsWith('.$main')) {
						const moduleName = decl.replace(/\.\$main$/, '');
						return [
							...acc,
							{
								moduleName,
								sourceName: `${sourceFile}/${moduleName}`,
								sourceFile,
								type: 'module-entry',
								syntax,
							},
						];
					}
					return acc;
				},
				[],
			);
		} catch (err) {
			const formattedErr = err instanceof Error ? formatLigoError(err) : err;
			emitExternalError(err, sourceFile);
			return [];
		}
	};

	const getCompileContractCmd = async (
		parsedArgs: Opts,
		sourceFile: string,
		module: ModuleInfo,
	): Promise<string> => {
		const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
		if (!projectDir) throw new Error(`No project directory provided`);
		const baseCmd = `${commonObj.baseDriverCmd(projectDir)} compile contract`;
		const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
		const outputFile = `-o ${getOutputContractFilename(parsedArgs, module)}`;
		const flags = isOutputFormatJSON(parsedArgs)
			? ' --michelson-format json '
			: '';
		const moduleFlag = module.type.startsWith('file-')
			? ''
			: `-m ${module.moduleName}`;
		const cmd = `${baseCmd} ${inputFile} ${outputFile} ${flags}${moduleFlag}`;
		return cmd;
	};

	const compileContract = async (
		parsedArgs: Opts,
		sourceFile: string,
		module: ModuleInfo,
	): Promise<TableRow> => {
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
		const baseCmd = `${commonObj.baseDriverCmd(projectDir)} compile ${compilerType}`;
		const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
		const outputFile = `-o ${
			getOutputExprFilename(
				parsedArgs,
				module,
				exprKind,
				exprName,
			)
		}`;
		const flags = isOutputFormatJSON(parsedArgs)
			? ' --michelson-format json '
			: '';

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

	const compileExpr = (
		parsedArgs: Opts,
		sourceFile: string,
		module: ModuleInfo,
		exprKind: ExprKind,
	) =>
	(exprName: string): Promise<TableRow> => {
		return getArch()
			.then(() => getCompileExprCmd(parsedArgs, sourceFile, module, exprKind, exprName))
			.then(execCmd)
			.then(({ stderr }) => {
				if (stderr.length > 0) sendWarn(stderr);
				const artifactName = getOutputExprFilename(
					parsedArgs,
					module,
					exprKind,
					exprName,
				);
				return {
					source: module.sourceName,
					artifact: artifactName,
				};
			})
			.catch(err => {
				return {
					source: module.sourceName,
					artifact: `${exprName} in ${sourceFile} not compiled`,
					err,
				};
			});
	};

	const compileExprs = async (
		parsedArgs: Opts,
		sourceFile: string,
		module: ModuleInfo,
		exprKind: ExprKind,
	): Promise<TableRow[]> => {
		// Get expressions from file
		let exprs = [];
		try {
			exprs = await getExprNames(parsedArgs, sourceFile);
		} catch (err) {
			emitExternalError(err, sourceFile);
			return [
				{
					source: module.sourceName,
					artifact: `No ${isStorageKind(exprKind) ? 'storage' : 'parameter'} expressions compiled`,
				},
			];
		}

		const results = await Promise.all(
			exprs.map(async (exprName, index) => {
				const compileResult = await compileExpr(
					parsedArgs,
					sourceFile,
					module,
					exprKind === 'storage' && exprName === 'default_storage' ? 'default_storage' : exprKind,
				)(exprName);
				return compileResult;
			}),
		);

		// Collect errors
		const errors = results.reduce((acc, result) => {
			if (result.err) {
				// If its not an Error object, then just add it to the list
				if (!(result.err instanceof Error)) return [...acc, result.err];

				// Otherwise, get all ligo errors and ensure that the list is unique
				const ligoErrs = (
					acc.filter(err => err instanceof Error) as Error[]
				).map(err => err.message);

				const formattedError = formatLigoError(result.err);

				return ligoErrs.includes(formattedError.message)
					? acc
					: [...acc, formattedError];
			}
			return acc;
		}, [] as unknown[]);

		// Collect table rows
		const retval = results.map(({ source, artifact }) => ({
			source,
			artifact,
		}));

		if (errors.length) emitExternalError(errors, sourceFile);

		return retval;
	};

	const compileContractWithStorageAndParameter = async (
		parsedArgs: Opts,
		sourceFile: string,
		module: ModuleInfo,
	): Promise<TableRow[]> => {
		const contractCompileResult = await compileContract(
			parsedArgs,
			sourceFile,
			module,
		);
		if (contractCompileResult.artifact === COMPILE_ERR_MSG) return [contractCompileResult];

		const storageListFile = `${module.moduleName}.storageList${
			extractExt(
				sourceFile,
			)
		}`;
		const storageListFilename = getInputFilenameAbsPath(
			parsedArgs,
			storageListFile,
		);
		const storageCompileResult = await access(storageListFilename)
			.then(() => compileExprs(parsedArgs, storageListFile, module, 'storage'))
			.catch(() => {
				sendWarn(
					`Note: storage file associated with "${module.moduleName}" can't be found, so "${storageListFile}" has been created for you. Use this file to define all initial storage values for this contract\n`,
				);
				return writeFile(
					storageListFilename,
					initContentForStorage(module),
					'utf8',
				);
			});

		const parameterListFile = `${module.moduleName}.parameterList${
			extractExt(
				sourceFile,
			)
		}`;
		const parameterListFilename = getInputFilenameAbsPath(
			parsedArgs,
			parameterListFile,
		);
		const parameterCompileResult = await access(parameterListFilename)
			.then(() => compileExprs(parsedArgs, parameterListFile, module, 'parameter'))
			.catch(() => {
				sendWarn(
					`Note: parameter file associated with "${module.moduleName}" can't be found, so "${parameterListFile}" has been created for you. Use this file to define all parameter values for this contract\n`,
				);
				return writeFile(
					parameterListFilename,
					initContentForParameter(module),
					'utf8',
				);
			});

		const storageArtifacts = storageCompileResult
			? storageCompileResult.map(res => res.artifact).join('\n')
			: '';
		const parameterArtifacts = parameterCompileResult
			? parameterCompileResult.map(res => res.artifact).join('\n')
			: '';

		const combinedArtifact = [
			contractCompileResult.artifact,
			storageArtifacts,
			parameterArtifacts,
		]
			.filter(Boolean)
			.join('\n');

		const combinedRow: TableRow = {
			source: module.sourceName,
			artifact: combinedArtifact,
		};

		return [combinedRow];
	};

	return {
		getLigoDockerImage,
		getListDeclarationsCmd,
		listContractModules,
		getCompileContractCmd,
		compileContract,
		getCompileExprCmd,
		compileExpr,
		compileExprs,
		compileContractWithStorageAndParameter,
	};
};

export const compile = async (
	commonObj: Common,
	parsedArgs: Opts,
): Promise<void> => {
	const { listContractModules, compileContractWithStorageAndParameter } = inject(commonObj);

	const sourceFile = parsedArgs.sourceFile;
	if (!isLIGOFile(sourceFile)) {
		sendErr(`${sourceFile} is not a LIGO file`);
		return;
	}
	if (isStorageListFile(sourceFile) || isParameterListFile(sourceFile)) {
		sendErr(
			`Storage and parameter list files are not meant to be compiled directly`,
		);
		return;
	}
	if (isUnsupportedLigoSyntax(sourceFile)) {
		sendErr(
			`Unsupported LIGO syntax detected in ${sourceFile}. Note, we only support .jsligo and .mligo files.`,
		);
		return;
	}

	try {
		const modules = await listContractModules(parsedArgs, sourceFile);
		if (modules.length === 0) {
			return sendJsonRes([
				{
					source: sourceFile,
					artifact:
						`No contract modules found in "${sourceFile}".\nIf your contract is defined within a namespace, please ensure that it is exported from the contract file."`,
				},
			]);
		}

		let allCompileResults: TableRow[] = [];
		for (const module of modules) {
			// If we're only to compile a particular module, then we'll skip any that don't match
			if (parsedArgs.module && parsedArgs.module !== module.moduleName) continue;

			const compileResults = await compileContractWithStorageAndParameter(
				parsedArgs,
				sourceFile,
				module,
			);
			allCompileResults = allCompileResults.concat(compileResults);
		}

		sendJsonRes(allCompileResults, {
			footer: `\nCompiled ${allCompileResults.length} contract(s) in "${sourceFile}"`,
		});
	} catch (err) {
		sendErr(`Error processing "${sourceFile}": ${err}`);
	}
};

export default compile;
