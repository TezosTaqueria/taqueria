import fs from 'fs';
import path from 'path';
import { createTestingCodeGenerator } from './testing-code-generator';

export const toJest = async (contractSource: string, format: 'tz') => {
    const gen = createTestingCodeGenerator({ contractSource, format });

    const methodCalls = gen.methods.map(m => gen.generateMethodCall(m.name)).join('');

    const jestCode = `${methodCalls}`;
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
        const result = await toJest(fileContent, 'tz');

        await fs.promises.mkdir(path.dirname(outputFilePath), { recursive: true });
        await fs.promises.writeFile(outputFilePath, result.jestCode);
    }
};
void run();