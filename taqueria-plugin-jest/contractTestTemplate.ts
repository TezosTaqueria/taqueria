// import { normalizeContractName } from '@taqueria/plugin-contract-types/src/generator/contract-name';
import {} from '@taqueria/node-sdk';
import { generateContractTypesProcessContractFiles } from '@taqueria/plugin-contract-types/src/cli-process.js';
import { stat } from 'fs/promises';
import { dirname, join } from 'path';
import { CustomRequestArgs, ensurePartitionExists } from './common';

interface Opts extends CustomRequestArgs {
	readonly michelsonArtifact: string;
	readonly partition?: string;
}

const getContractAbspath = (parsedArgs: Opts) => join(parsedArgs.config.artifactsDir, parsedArgs.michelsonArtifact);

const generateContractTypes = async (parsedArgs: Opts) => {
	const contractAbspath = getContractAbspath(parsedArgs);
	return ensurePartitionExists(parsedArgs)
		.then(partitionConfigAbsPath =>
			generateContractTypesProcessContractFiles({
				inputTzContractDirectory: parsedArgs.config.artifactsDir,
				inputFiles: [contractAbspath],
				outputTypescriptDirectory: join(dirname(partitionConfigAbsPath), 'types'),
				format: 'tz',
				typeAliasMode: 'file',
			})
		);
};

export default (args: Opts) => {
	generateContractTypes(args);
};
