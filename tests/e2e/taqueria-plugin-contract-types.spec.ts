import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import fs from "fs";
import { exec as exec1, execSync } from "child_process"
import path from "path";
import util from "util"
const exec = util.promisify(exec1)

const taqueriaProjectPath = 'e2e/auto-test-contract-types-plugin'

describe("E2E Testing for taqueria contract types plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["ligo", "contract-types"])
    })

    test.only('Verify that taqueria contract types plugin can compile one contract and generate types', async () => {
        const pwd = await exec(`pwd`)

        try {
            await exec(`cp e2e/data/increment.jsligo ${taqueriaProjectPath}/contracts`)
            await exec(`taq compile -p ${taqueriaProjectPath}`)

            const generateTypesOutput = await exec(`cd ${taqueriaProjectPath} && taq generate types`)
            // expect(generateTypesOutput.stdout).toContain(`{
            //     "typescriptDir": "types"
            //   }`)
            expect(generateTypesOutput.stdout).toContain(`"typescriptDir": "types"`)
            console.log(`Generating Types: ${pwd.stdout}/${taqueriaProjectPath}/artifacts => ${pwd.stdout}/${taqueriaProjectPath}/types`)
            expect(generateTypesOutput.stdout).toContain(
                `Generating Types: ${pwd.stdout}/${taqueriaProjectPath}/artifacts => ${pwd.stdout}/${taqueriaProjectPath}/types`)
            expect(generateTypesOutput.stdout).toContain(
                `Processing /increment.tz...increment.tz: Types generated`)

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria archetype plugin can compile multiple contracts under contracts folder', async () => {
        try {
            // 1. Copy two contracts from data folder to /contracts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts/hello-tacos-one.mligo`);
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts/hello-tacos-two.mligo`);

            // 2. Run taq compile ${contractName}
            execSync(`taq compile`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version for both contracts has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`, 25000);
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`, 25000);


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