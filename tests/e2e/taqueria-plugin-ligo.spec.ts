import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";
import path from "path";

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
            execSync(`taq compile`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`, 25000);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria ligo plugin can compile one contract using compile [sourceFile] command', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);

            // 2. Run taq compile ${contractName}
            execSync(`taq compile hello-tacos.mligo`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`, 25000);

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
            execSync(`taq compile`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that compiled michelson version for both contracts has been generated
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos-one.tz`, 25000);
            await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos-two.tz`, 25000);


        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria ligo plugin will display proper message if user tries to compile contract that does not exist', async () => {
        try {
            // 1. Run taq compile ${contractName} for contract that does not exist
            const stdout = execSync(`taq compile test.mligo`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();;

            // 2. Verify that output includes next messages:
            // There was a compilation error.
            // contracts/test.mligo: No such file or directory
            expect(stdout).toContain("There was a compilation error.");
            expect(stdout).toContain("contracts/test.mligo: No such file or directory");


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