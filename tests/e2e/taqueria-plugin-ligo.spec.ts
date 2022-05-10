import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync, exec as exec1} from "child_process";
import path from "path";
import util from "util"
import * as contents from './data/ligo-contents'
const exec = util.promisify(exec1)

const taqueriaProjectPath = 'e2e/auto-test-ligo-plugin';

describe("E2E Testing for taqueria ligo plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["ligo"]);
    })

    test('Verify that taqueria ligo plugin can compile one contract under contracts folder', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);

            // 2. Run taq compile ${contractName}
            execSync(`PROJECT_DIR=${taqueriaProjectPath} taq compile`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria ligo plugin can compile one contract using compile [sourceFile] command', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);

            // 2. Run taq compile ${contractName}
            execSync(`PROJECT_DIR=${taqueriaProjectPath} taq compile hello-tacos.mligo`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria ligo plugin can compile multiple contracts under contracts folder', async () => {
        try {
            // 1. Copy two contracts from data folder to /contracts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts/hello-tacos-one.mligo`);
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts/hello-tacos-two.mligo`);

            // 2. Run taq compile ${contractName}
            execSync(`PROJECT_DIR=${taqueriaProjectPath} taq compile`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version for both contracts has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`);
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`);


        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria ligo plugin will display proper message if user tries to compile contract that does not exist', async () => {
        try {
            // 1. Run taq compile ${contractName} for contract that does not exist
            const {stdout, stderr} = await exec(`PROJECT_DIR=${taqueriaProjectPath} taq compile test.mligo`, {cwd: `./${taqueriaProjectPath}`})

            // 2. Verify that output includes next messages:
            // There was a compilation error.
            // contracts/test.mligo: No such file or directory
            expect(stdout).toBe(contents.compileNonExistent)
            expect(stderr).toContain("contracts/test.mligo: No such file or directory");


        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test("Verify that taqueria ligo plugin emits error and yet displays table if contract is invalid", async () => {
        try {
            execSync(`cp e2e/data/invalid-contract.mligo ${taqueriaProjectPath}/contracts`)

            const {stdout, stderr} = await exec(`PROJECT_DIR=${taqueriaProjectPath} taq compile invalid-contract.mligo`, {cwd: `./${taqueriaProjectPath}`})

            expect(stdout).toBe(contents.compileInvalid)
            expect(stderr).toContain("File \"contracts/invalid-contract.mligo\", line 1, characters 23-27");
        } catch(error) {
            throw new Error (`error: ${error}`);
        }
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
            fs.rmSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});