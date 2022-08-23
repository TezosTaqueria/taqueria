import { execCmd, getArch, getContracts, sendAsyncErr, sendErr, sendJsonRes } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { mapOperationsToPlugins } from '@taqueria/protocol/EphemeralState';
import { readFile, writeFile } from 'fs/promises';
import { basename, extname, join } from 'path';

interface Opts extends RequestArgs.t {
	sourceFile: string;
}

type TableRow = { contract: string; artifact: string };

const getInputFilename = (parsedArgs: Opts, sourceFile: string): string =>
	join(parsedArgs.config.contractsDir, sourceFile);

const getOutputFilename = (parsedArgs: Opts, sourceFile: string): string => {
	const outputFile = basename(sourceFile, extname(sourceFile));
	return join(parsedArgs.config.artifactsDir, `${outputFile}.tz`);
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
			sendErr(' ');
			sendErr(err.message.split('\n').slice(1).join('\n'));
			return Promise.resolve({
				contract: sourceFile,
				artifact: 'Not compiled',
			});
		});

// Get the contract name that the storage file is associated with
// e.g. If sourceFile is token.storages.mligo, then it'll return token.mligo
const getContractNameForStorage = (sourceFile: string): string =>
	sourceFile.match(/.+(?=\.storages\.(ligo|religo|mligo|jsligo))/)!.join('.');

// If sourceFile is token.storages.mligo, then it'll return token.storage.{storageName}.tz
const getOutputStorageFileName = (parsedArgs: Opts, sourceFile: string, storageName: string): string => {
	const contractName = basename(getContractNameForStorage(sourceFile), extname(sourceFile));
	const outputFile = `${contractName}.storage.${storageName}.tz`;
	return join(parsedArgs.config.artifactsDir, `${outputFile}`);
};

const getCompileStorageCmd = (parsedArgs: Opts, sourceFile: string, storageName: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile storage`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputStorageFileName(parsedArgs, sourceFile, storageName)}`;
	const cmd = `${baseCmd} ${inputFile} ${storageName} ${outputFile}`;
	return cmd;
};

const compileStorage = (parsedArgs: Opts, sourceFile: string) =>
	(storageName: string): Promise<TableRow> =>
		getArch()
			.then(() => getCompileStorageCmd(parsedArgs, sourceFile, storageName))
			.then(execCmd)
			.then(({ stderr }) => {
				if (stderr.length > 0) sendErr(stderr);
				return {
					contract: sourceFile,
					artifact: getOutputStorageFileName(parsedArgs, sourceFile, storageName),
				};
			})
			.catch(err => {
				sendErr(' ');
				sendErr(err.message.split('\n').slice(1).join('\n'));
				return Promise.resolve({
					contract: sourceFile,
					artifact: 'Not compiled',
				});
			});

const compileStorages = (parsedArgs: Opts, sourceFile: string): Promise<TableRow[]> =>
	readFile(getInputFilename(parsedArgs, sourceFile), 'utf8')
		.then(data => {
			if (!data.includes('#include')) {
				writeFile(
					getInputFilename(parsedArgs, sourceFile),
					`#include "${getContractNameForStorage(sourceFile)}"\n` + data,
					'utf8',
				);
			}
			return data;
		})
		.then(data => data.match(/(?<=\s*(let|const)\s+)[a-zA-Z0-9_]+/g))
		.then(storageNames =>
			storageNames
				? Promise.all(storageNames.map(compileStorage(parsedArgs, sourceFile)))
				: Promise.resolve([])
		);

// Get the contract name that the parameter file is associated with
// e.g. If sourceFile is token.parameters.mligo, then it'll return token.mligo
const getContractNameForParameter = (sourceFile: string): string =>
	sourceFile.match(/.+(?=\.parameters\.(ligo|religo|mligo|jsligo))/)!.join('.');

// If sourceFile is token.parameters.mligo, then it'll return token.parameter.{parameterName}.tz
const getOutputParameterFileName = (parsedArgs: Opts, sourceFile: string, parameterName: string): string => {
	const contractName = basename(getContractNameForParameter(sourceFile), extname(sourceFile));
	const outputFile = `${contractName}.parameter.${parameterName}.tz`;
	return join(parsedArgs.config.artifactsDir, `${outputFile}`);
};

const getCompileParameterCmd = (parsedArgs: Opts, sourceFile: string, parameterName: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile parameter`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const outputFile = `-o ${getOutputParameterFileName(parsedArgs, sourceFile, parameterName)}`;
	const cmd = `${baseCmd} ${inputFile} ${parameterName} ${outputFile}`;
	return cmd;
};

const compileParameter = (parsedArgs: Opts, sourceFile: string) =>
	(parameterName: string): Promise<TableRow> =>
		getArch()
			.then(() => getCompileParameterCmd(parsedArgs, sourceFile, parameterName))
			.then(execCmd)
			.then(({ stderr }) => {
				if (stderr.length > 0) sendErr(stderr);
				return {
					contract: sourceFile,
					artifact: getOutputParameterFileName(parsedArgs, sourceFile, parameterName),
				};
			})
			.catch(err => {
				sendErr(' ');
				sendErr(err.message.split('\n').slice(1).join('\n'));
				return Promise.resolve({
					contract: sourceFile,
					artifact: 'Not compiled',
				});
			});

const compileParameters = (parsedArgs: Opts, sourceFile: string): Promise<TableRow[]> =>
	readFile(getInputFilename(parsedArgs, sourceFile), 'utf8')
		.then(data => {
			if (!data.includes('#include')) {
				writeFile(
					getInputFilename(parsedArgs, sourceFile),
					`#include "${getContractNameForParameter(sourceFile)}"\n` + data,
					'utf8',
				);
			}
			return data;
		})
		.then(data => data.match(/(?<=\s*(let|const)\s+)[a-zA-Z0-9_]+/g))
		.then(parameterNames =>
			parameterNames
				? Promise.all(parameterNames.map(compileParameter(parsedArgs, sourceFile)))
				: Promise.resolve([])
		);

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

const isStoragesFile = (sourceFile: string): boolean => /.+\.storages\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

const isParametersFile = (sourceFile: string): boolean =>
	/.+\.parameters\.(ligo|religo|mligo|jsligo)$/.test(sourceFile);

export const compile = (parsedArgs: Opts) => {
	const sourceFile: string = parsedArgs.sourceFile;
	let p: Promise<TableRow[]>;
	if (isStoragesFile(sourceFile)) {
		p = compileStorages(parsedArgs, sourceFile).then(mergeArtifactsOutput(sourceFile));
	} else if (isParametersFile(sourceFile)) {
		p = compileParameters(parsedArgs, sourceFile).then(mergeArtifactsOutput(sourceFile));
	} else {
		p = compileContract(parsedArgs, sourceFile).then(result => [result]);
	}
	return p.then(sendJsonRes).catch(err => sendAsyncErr(err, false));
};

export default compile;
