import fs from 'fs';
import path from 'path';
import { normalizeContractName } from './contract-name';
import { createTestingCodeGenerator } from './testing-code-generator';

export const toJest = async (contractName: string, contractSource: string, format: 'tz') => {
	const gen = createTestingCodeGenerator({ contractSource, contractFormat: format });

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
	return {
		jestCode,
	};
};

const run = async () => {
	const contractDirPath = path.join(__dirname, '../../example/contracts');
	const dirFiles = await fs.promises.readdir(contractDirPath);
	const tzFiles = dirFiles.filter(x => x.endsWith('.tz'));

	for (const f of tzFiles) {
		const contractFilePath = path.join(contractDirPath, f);
		const outputFilePath = contractFilePath
			.replace('/example/contracts/', '/example/tests/')
			.replace(/\.tz$/, '.test.ts');

		console.log('Create Jest Test', { contractFilePath, outputFilePath });

		const fileContent = await fs.promises.readFile(contractFilePath, { encoding: 'utf-8' });
		const result = await toJest(f.replace(/\.tz$/, ''), fileContent, 'tz');

		await fs.promises.mkdir(path.dirname(outputFilePath), { recursive: true });
		await fs.promises.writeFile(outputFilePath, result.jestCode);
	}
};
void run();
