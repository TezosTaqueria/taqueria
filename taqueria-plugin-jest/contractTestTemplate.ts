// import { normalizeContractName } from '@taqueria/plugin-contract-types/src/generator/contract-name';
import { generateContractTypesProcessContractFiles } from '@taqueria/plugin-contract-types';
import { join } from 'path';
import { CustomRequestArgs, ensurePartitionExists } from './common';

interface Opts extends CustomRequestArgs {
	readonly michelsonArtifact: string;
	readonly partition?: string;
}

const getContractAbspath = (parsedArgs: Opts) => join(parsedArgs.config.artifactsDir, parsedArgs.michelsonArtifact);

const generateContractTypes = async (parsedArgs: Opts) => {
	const contractAbspath = getContractAbspath(parsedArgs);
	const partitionAbspath = await ensurePartitionExists(parsedArgs);
	await generateContractTypesProcessContractFiles({
		inputTzContractDirectory: parsedArgs.config.artifactsDir,
		inputFiles: [contractAbspath],
		outputTypescriptDirectory: join(partitionAbspath, 'types'),
		format: 'tz',
		typeAliasMode: 'file',
	});
};

export default (args: Opts) => {
	generateContractTypes(args);
};
