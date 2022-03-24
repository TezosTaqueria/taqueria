import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync, exec as exec1} from "child_process";
import path from "path";
import util from 'util'
import * as contents from "./data/smartpy-contents"
const exec = util.promisify(exec1)

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
                fs.rmSync(path.join(`${taqueriaProjectPath}/artifacts/`, file), { recursive: true});
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

    test('Verify that taqueria smartpy plugin can compile one contract under contracts folder', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);

            // 2. Run taq compile ${contractName}
            const output = execSync(`taq compile`, {cwd: `./${taqueriaProjectPath}`}).toString();
            execSync(`rm ${taqueriaProjectPath}/contracts/hello-tacos.py`)

            // 3. Check output
            expect(output).toBe(contents.smartPyCompiledOutput)

            // 4. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/HelloTacos_comp`, 25000);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria smartpy plugin handles no contracts correctly', async () => {
        try {
            // 1. Run taq compile ${contractName}
            const {stdout, stderr} = await exec(`taq compile`, {cwd: `./${taqueriaProjectPath}`});

            console.log(stdout)
            console.log(stderr)

            expect(stderr).toBe(contents.smartPyNothingCompiled)

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });
})