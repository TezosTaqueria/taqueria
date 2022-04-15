import { promises as fs } from 'fs'
import path from 'path'
import { promisify } from 'util'
import { generateContractTypesFromMichelsonCode } from '../src/generator/process'
import { normalizeContractName } from '../src/generator/contract-name'
import { TypeAliasData } from '../src/generator/typescript-output'

const readFileText = async (filePath: string): Promise<string> => {
    return fs.readFile(filePath, { encoding: 'utf8' })
}

describe('Generate Example Contracts', () => {
    const typeAliasDataLibrary: TypeAliasData = { mode: 'library', importPath: '@taquito/contract-type-generator' }
    const typeAliasDataSimple: TypeAliasData = { mode: 'simple' }

    const exampleDir = path.resolve(__dirname, `../example`)

    const testContractTypeGeneration = async (
        contractFileName: string,
        format: 'tz' | 'json',
        mode: 'library' | 'simple',
    ) => {
        const contractRaw = await readFileText(`${exampleDir}/contracts/${contractFileName}.${format}`)
        const expectedTypeFileContent = await readFileText(
            `${exampleDir}/types${mode === 'simple' ? '-simple' : ''}/${contractFileName}.types.ts`,
        )
        const expectedCodeFileContent = await readFileText(
            `${exampleDir}/types${mode === 'simple' ? '-simple' : ''}/${contractFileName}.code.ts`,
        )
        const contractName = normalizeContractName(contractFileName)
        const typeAliasData = mode === 'library' ? typeAliasDataLibrary : typeAliasDataSimple
        const {
            typescriptCodeOutput: {
                typesFileContent: actualTypesFileContent,
                contractCodeFileContent: actualCodeFileContent,
            },
        } = generateContractTypesFromMichelsonCode(contractRaw, contractName, format, typeAliasData)
        expect(actualTypesFileContent.trim()).toEqual(expectedTypeFileContent.trim())
        expect(actualCodeFileContent.trim()).toEqual(expectedCodeFileContent.trim())
    }

    it('Generate Types 01 - tz library', async () => {
        await testContractTypeGeneration('example-contract-1', 'tz', 'library')
    })
    it('Generate Types 01 - tz simple', async () => {
        await testContractTypeGeneration('example-contract-1', 'tz', 'simple')
    })
    it('Generate Types 02 - tz library', async () => {
        await testContractTypeGeneration('example-contract-2', 'tz', 'library')
    })
    it('Generate Types 02 - tz simple', async () => {
        await testContractTypeGeneration('example-contract-2', 'tz', 'simple')
    })

    it('Generate Types 03 - json library', async () => {
        await testContractTypeGeneration('example-contract-3', 'json', 'library')
    })

    it('Generate Types 04 - newer protocol', async () => {
        await testContractTypeGeneration('example-contract-4', 'tz', 'library')
    })
    it('Generate Types 04 - tz simple', async () => {
        await testContractTypeGeneration('example-contract-4', 'tz', 'simple')
    })

    // it(`Generate Types - All`, async () => {
    //     const allExampleContracts = (await fs.readdir(`${exampleDir}/contracts/`)).filter(f=>f.endsWith('.tz') || f.endsWith('.json'));

    //     for(const f of allExampleContracts){
    //         const fRelative = f.replace(exampleDir,'');
    //         const m = fRelative.match(/^(.*)\.(tz|json)$/);
    //         if(!m){ return; }
    //         const [_,filename, ext] = m;

    //         await testContractTypeGeneration(filename, ext as 'tz'|'json', 'simple');
    //     }
    // });
})
