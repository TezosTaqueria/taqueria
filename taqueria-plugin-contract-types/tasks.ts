import { LikeAPromise, PluginResponse, RequestArgs, TaqError } from '@taqueria/node-sdk/types';
import glob from 'fast-glob';
import { join } from 'path';
import { generateContractTypesProcessContractFiles } from './src/cli-process';
interface Opts extends RequestArgs.ProxyRequestArgs {
	// TODO: Document these
	typescriptDir?: string;
	typeAliasMode?: 'local' | 'file' | 'library' | 'simple';
	contract?: string;
}

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) =>
	join(parsedArgs.config.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`);

const generateContractTypes = (parsedArgs: Opts) =>
	async (contractFilename: string): Promise<string> => {
		const contractAbspath = getContractAbspath(contractFilename, parsedArgs);
		await generateContractTypesProcessContractFiles({
			inputTzContractDirectory: parsedArgs.config.artifactsDir,
			inputFiles: [contractAbspath],
			outputTypescriptDirectory: parsedArgs.typescriptDir || 'types',
			format: 'tz',
			typeAliasMode: parsedArgs.typeAliasMode ?? 'file',
		});

		return `${contractFilename}: Types generated`;
	};

const generateContractTypesAll = async (parsedArgs: Opts): Promise<string[]> => {
	const files = await glob('**/*.tz', { cwd: parsedArgs.config.artifactsDir });
	return await Promise.all(files.map(generateContractTypes(parsedArgs)));
};

export const generateTypes = (parsedArgs: Opts): LikeAPromise<PluginResponse, TaqError.t> => {
	parsedArgs.typescriptDir = parsedArgs.typescriptDir || 'types';

	console.log('generateTypes', {
		typescriptDir: parsedArgs.typescriptDir,
	});

	const p = parsedArgs.contract
		? generateContractTypes(parsedArgs)(parsedArgs.contract)
		: generateContractTypesAll(parsedArgs);

	return p.then(data => {
		console.log(
			(Array.isArray(data))
				? data.join('\n')
				: data,
		);
	});
};

export const tasks = {
	generateTypes,
};
