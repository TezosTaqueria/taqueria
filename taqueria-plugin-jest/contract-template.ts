import { RequestArgs } from '@taqueria/node-sdk/types';
import { normalizeContractName } from '@taqueria/plugin-contract-types/src/generator/contract-name';
import { createTestingCodeGenerator } from '@taqueria/plugin-contract-types/src/generator/testing-code-generator';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { ensurePartitionExists } from './common';

interface Opts extends RequestArgs.t {
	readonly contractName: string;
	readonly partition?: string;
	readonly output?: string;
}

// TODO: Move to SDK
export const getArtifactsAbspath = (args: RequestArgs.t) =>
	join(
		args.projectDir,
		args.config.artifactsDir,
	);

// TODO Move to SDK
export const getArtifactAbspath = (args: RequestArgs.t, artifactName: string) =>
	join(
		getArtifactsAbspath(args),
		artifactName,
	);

export const toJest = async (contractName: string, contractSource: string) => {
	const gen = createTestingCodeGenerator({ contractSource, contractFormat: 'tz' });

	const methodCalls = gen.methods.map(m => ({
		name: m.name,
		methodCall: gen.generateMethodCall({
			methodName: m.name,
			formatting: {
				indent: 2,
			},
		}),
		storageAccess: gen.generateStorageAccess({ storagePath: '' }),
	}));

	const contractTypeName = normalizeContractName(contractName);

	const jestCode = `
import { TezosToolkit } from '@taquito/taquito';
import { char2Bytes } from '@taquito/utils';
import { tas } from '../types-file/type-aliases';
import { ${contractTypeName}ContractType as ContractType } from '../types-file/${contractName}.types';
import { ${contractTypeName}Code as ContractCode } from '../types-file/${contractName}.code';

describe('${contractName}', () => {
    const Tezos = new TezosToolkit('RPC_URL');
    let contract: ContractType = undefined as unknown as ContractType;
    beforeAll(async () => {
            ${gen.generateOrigination({ formatting: { indent: 3 } }).code}
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
	}
});
`;
	return jestCode;
};

export default (args: RequestArgs.t) => {
	const opts = args as Opts;

	const output = opts.output || opts.contractName.replace(/\.tz$/, '.spec.ts');

	return ensurePartitionExists(opts)
		.then(partitionAbspath => {
			const outputAbspath = join(partitionAbspath, output);

			return toJest(
				opts.contractName.replace(/\.tz$/, ''),
				getArtifactAbspath(args, opts.contractName),
			)
				.then(code => writeFile(outputAbspath, code));
		});
};
