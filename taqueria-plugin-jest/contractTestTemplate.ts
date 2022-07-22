// import { normalizeContractName } from '@taqueria/plugin-contract-types/src/generator/contract-name';
import { sendAsyncRes } from '@taqueria/node-sdk';
import { generateContractTypesProcessContractFiles } from '@taqueria/plugin-contract-types/src/cli-process.js';
import {
	createTestingCodeGenerator,
	normalizeContractName,
} from '@taqueria/plugin-contract-types/src/generator/testing-code-generator.js';
import { readFile, stat, writeFile } from 'fs/promises';
import { basename, dirname, join } from 'path';
import { CustomRequestArgs, ensureSelectedPartitionExists, getPartitionAbspath, getTestsRootDir } from './common';

type Generator = ReturnType<typeof createTestingCodeGenerator>;

interface Opts extends CustomRequestArgs {
	readonly michelsonArtifact: string;
	readonly partition?: string;
	readonly name?: string;
}

const getMichelsonAbspath = (parsedArgs: Opts) => join(parsedArgs.config.artifactsDir, parsedArgs.michelsonArtifact);

const ensureMichelsonExists = (parsedArgs: Opts) => {
	const abspath = getMichelsonAbspath(parsedArgs);
	return stat(abspath)
		.then(() => parsedArgs)
		.catch(() => Promise.reject(`${abspath} does not exist. Perhaps you need to run "taq compile"?`));
};

const getPartition = (parsedArgs: Opts) => {
	const partition = parsedArgs.partition ?? getTestsRootDir(parsedArgs.config);
	return getPartitionAbspath(partition);
};

const getTypesOutputAbspath = (parsedArgs: Opts) => join(getPartition(parsedArgs), 'types');

const generateContractTypes = (parsedArgs: Opts) =>
	generateContractTypesProcessContractFiles({
		inputTzContractDirectory: parsedArgs.config.artifactsDir,
		inputFiles: [getMichelsonAbspath(parsedArgs)],
		outputTypescriptDirectory: getTypesOutputAbspath(parsedArgs),
		format: 'tz',
		typeAliasMode: 'file',
	}).then(_ => parsedArgs);

const getContractName = (parsedArgs: Opts) =>
	parsedArgs.name
		? parsedArgs.name.trim().replace(/\.ts$/, '')
		: basename(parsedArgs.michelsonArtifact, '.tz');

const generateTestSuite = (parsedArgs: Opts) => {
	const michelsonAbspath = getMichelsonAbspath(parsedArgs);
	const contractName = getContractName(parsedArgs);
	const partition = getPartition(parsedArgs);
	const jestSuiteAbspath = join(partition, `${contractName}.ts`);

	return readFile(michelsonAbspath, { encoding: 'utf-8' })
		.then(contractSource => ({ contractSource, contractFormat: 'tz' as const }))
		.then(createTestingCodeGenerator)
		.then(toJest(contractName))
		.then(contents => writeFile(jestSuiteAbspath, contents, { encoding: 'utf-8' }))
		.then(() => jestSuiteAbspath);
};

const toJest = (contractName: string) =>
	(generator: Generator) => {
		const methodCalls = generator.methods.map(m => ({
			name: m.name,
			methodCall: generator.generateMethodCall({
				methodName: m.name,
				formatting: {
					indent: 2,
				},
			}),
			storageAccess: generator.generateStorageAccess({ storagePath: '' }),
		}));
		return `
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tas } from './types/type-aliases';
import { ${normalizeContractName(contractName)}ContractType as ContractType } from './types/${contractName}.types';
import { ${normalizeContractName(contractName)}Code as ContractCode } from './types/${contractName}.code';

describe('${contractName}', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
        ${generator.generateOrigination({ formatting: { indent: 3 } }).code}
    });

${
			methodCalls.map(x => `
    it('should call ${x.name}', async () => {
        ${x.storageAccess.getStorageValueFunctionCode}
        const storageValueBefore = await ${x.storageAccess.getStorageValueFunctionName}();
        ${x.methodCall.code}
        const storageValueAfter = await ${x.storageAccess.getStorageValueFunctionName}();

        expect(storageValueAfter).toBe('');
    });
`).join('')
		});
`;
	};

export default (parsedArgs: Opts) => {
	return ensureMichelsonExists(parsedArgs)
		.then(ensureSelectedPartitionExists)
		.then(() => parsedArgs)
		.then(generateContractTypes)
		.then(generateTestSuite)
		.then(outFile => sendAsyncRes(`Test suite generated: ${outFile}`));
};
