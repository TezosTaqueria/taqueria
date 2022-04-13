import {generateTestProject} from "./utils/utils";
import fs from "fs";
import { exec as exec1} from "child_process"
import path from "path";
import util from "util"
const exec = util.promisify(exec1)

const taqueriaProjectPath = 'e2e/auto-test-contract-types-plugin'

describe("E2E Testing for taqueria contract types plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["ligo", "contract-types"])
    })

    test('Verify that contract types plugin only outputs typeScriptDir and does not create types dir when no contracts exist', async () => {
        try {
            const generateTypesOutput = await exec(`cd ${taqueriaProjectPath} && taq generate types`)
            expect(generateTypesOutput.stdout).toContain(`generateTypes { typescriptDir: 'types' }`)

            const dirContents = await exec(`ls ${taqueriaProjectPath}`)
            expect(dirContents.stdout).not.toContain('types')

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria contract types plugin can compile one contract and generate types', async () => {
        const pwdPromise = await exec(`pwd`)
        const pwd = pwdPromise.stdout.trim()

        try {
            await exec(`cp e2e/data/increment.jsligo ${taqueriaProjectPath}/contracts`)
            await exec(`taq compile -p ${taqueriaProjectPath}`)

            const generateTypesOutput = await exec(`cd ${taqueriaProjectPath} && taq generate types`)
            expect(generateTypesOutput.stdout).toContain(`generateTypes { typescriptDir: 'types' }`)
            
            expect(generateTypesOutput.stdout).toContain(
                `Generating Types: ${pwd}/${taqueriaProjectPath}/artifacts => ${pwd}/${taqueriaProjectPath}/types`)
            
            expect(generateTypesOutput.stdout).toContain(
                `Contracts Found: \n\t- ${pwd}/${taqueriaProjectPath}/artifacts/increment.tz`)
            
            expect(generateTypesOutput.stdout).toContain(`Processing /increment.tz...`)
            expect(generateTypesOutput.stdout).toContain(`increment.tz: Types generated`)

            const dirContents = await exec(`ls ${taqueriaProjectPath}`)
            expect(dirContents.stdout).toContain('types')

            const typesContents = await exec(`ls ${taqueriaProjectPath}/types`)
            expect(typesContents.stdout).toContain('increment.code.ts')
            expect(typesContents.stdout).toContain('increment.types.ts')
            expect(typesContents.stdout).toContain('type-aliases.ts')
            expect(typesContents.stdout).toContain('type-utils.ts')

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria contract types plugin allows for different types folder specification', async () => {
        const pwdPromise = await exec(`pwd`)
        const pwd = pwdPromise.stdout.trim()
        const folderName = "otherFolder"

        try {
            await exec(`cp e2e/data/increment.jsligo ${taqueriaProjectPath}/contracts`)
            await exec(`taq compile -p ${taqueriaProjectPath}`)

            const generateTypesOutput = await exec(`cd ${taqueriaProjectPath} && taq generate types ${folderName}`)
            expect(generateTypesOutput.stdout).toContain(`generateTypes { typescriptDir: '${folderName}' }`)
            
            expect(generateTypesOutput.stdout).toContain(
                `Generating Types: ${pwd}/${taqueriaProjectPath}/artifacts => ${pwd}/${taqueriaProjectPath}/${folderName}`)

            const dirContents = await exec(`ls ${taqueriaProjectPath}`)
            expect(dirContents.stdout).toContain(`${folderName}`)

            const typesContents = await exec(`ls ${taqueriaProjectPath}/${folderName}`)
            expect(typesContents.stdout).toContain('increment.code.ts')
            expect(typesContents.stdout).toContain('increment.types.ts')
            expect(typesContents.stdout).toContain('type-aliases.ts')
            expect(typesContents.stdout).toContain('type-utils.ts')

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria contract types plugin can compile multiple contracts and generate types', async () => {
        const pwdPromise = await exec(`pwd`)
        const pwd = pwdPromise.stdout.trim()

        try {
            await exec(`cp e2e/data/increment.jsligo ${taqueriaProjectPath}/contracts`)
            await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`)
            await exec(`taq compile -p ${taqueriaProjectPath}`)

            const generateTypesOutput = await exec(`cd ${taqueriaProjectPath} && taq generate types`)
            expect(generateTypesOutput.stdout).toContain(`generateTypes { typescriptDir: 'types' }`)
            expect(generateTypesOutput.stdout).toContain(
                `Generating Types: ${pwd}/${taqueriaProjectPath}/artifacts => ${pwd}/${taqueriaProjectPath}/types`)
            
            expect(generateTypesOutput.stdout).toContain(
                `Contracts Found: \n\t- ${pwd}/${taqueriaProjectPath}/artifacts/increment.tz`)
            expect(generateTypesOutput.stdout).toContain(
                `Contracts Found: \n\t- ${pwd}/${taqueriaProjectPath}/artifacts/hello-tacos.tz`)

            expect(generateTypesOutput.stdout).toContain(`Processing /increment.tz...`)
            expect(generateTypesOutput.stdout).toContain(`Processing /hello-tacos.tz...`)
            expect(generateTypesOutput.stdout).toContain(`increment.tz: Types generated`)
            expect(generateTypesOutput.stdout).toContain(`hello-tacos.tz: Types generated`)

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    // Remove all files from artifacts folder without removing folder itself
    afterEach(() => {
        try {
            const files = fs.readdirSync(`${taqueriaProjectPath}/artifacts/`);
            for (const file of files) {
                fs.unlinkSync(path.join(`${taqueriaProjectPath}/artifacts/`, file));
            }
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll(() => {
        try {
            fs.rmdirSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});