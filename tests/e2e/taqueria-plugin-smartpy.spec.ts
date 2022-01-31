import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";

const taqueriaProjectPath = 'e2e/auto-test-smartpy-plugin';

describe("E2E Testing for taqueria smartpy plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["smartpy"]);
    })

    // TODO: Ask Michael about the issue with smartpy plugin
    //
    test('VVerify that taqueria smartpy plugin can compile one contract using compile all command', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);

            // 2. Run taq compile ${contractName}
            execSync(`cd ./${taqueriaProjectPath} && taq compile`);

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`, 25000);


        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Comment for debug purpose
    // afterAll(() => {
    //     try {
    //         fs.rmdirSync(taqueriaProjectPath, { recursive: true })
    //     } catch(error){
    //         throw new Error (`error: ${error}`);
    //     }
    // })

});