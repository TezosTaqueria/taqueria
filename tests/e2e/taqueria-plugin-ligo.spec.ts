import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";

const taqueriaProjectPath = 'e2e/auto-test-ligo-plugin';

describe("E2E Testing for taqueria ligo plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["ligo"]);
    })

    test('Verify that taqueria ligo plugin can compile one contract using compile all command', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);

            // 2. Run taq compile ${contractName}
            execSync(`cd ./${taqueriaProjectPath} && taq compile`);

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`, 25000);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test.skip('Verify that taqueria ligo plugin can compile one contract using compile [sourceFile] command', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`)

            // 2. Run taq compile ${contractName}
            execSync(`cd ./${taqueriaProjectPath} && taq compile hello-tacos.mligo`).toString()

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`, 25000)

        } catch(error) {
            // throw new Error (`error: ${error}`);
        }

    });

    // TODO: Finish test with multiple contracts
    test.skip('Verify that taqueria ligo plugin can compile all contracts under compile folder', async () => {
        try {
            // 1. Copy two contracts from data folder to /contracts folder under taqueria project

            // 2. Run taq compile

            // 3. Verify that compiled michelson version has been generated


        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Clean up process to remove taquified project folder
    afterAll(() => {
        try {
            fs.rmdirSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});