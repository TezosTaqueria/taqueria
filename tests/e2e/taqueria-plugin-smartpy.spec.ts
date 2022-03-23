import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";
import path from "path";

const taqueriaProjectPath = 'e2e/auto-test-ligo-plugin';

describe("E2E Testing for taqueria SmartPy plugin",  () => {
    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["smartpy"]);
    })

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

    test('Verify that taqueria ligo plugin can compile one contract under contracts folder', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);

            // 2. Run taq compile ${contractName}
            execSync(`taq compile`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/HelloTacos_comp`, 25000);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });
})