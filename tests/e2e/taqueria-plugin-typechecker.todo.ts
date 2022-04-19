import {generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync, exec as exec1} from "child_process";
import util from "util"
import * as contents from './data/typechecker-contents'

const exec = util.promisify(exec1)
const taqueriaProjectPath = 'e2e/auto-test-typechecker-plugin';

describe("E2E Testing for taqueria typechecker plugin", () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["typechecker"]);
    })

    test('Verify that taqueria typechecker plugin can typecheck one contract under contracts folder', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/contracts`);

            // 2. Run taq typecheck
            const {stdout, stderr} = await exec(`taq typecheck`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that it's well-typed and contains no errors
            expect(stdout).toContain("Well typed");
            expect(stderr).toBe("");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria typechecker plugin can typecheck one contract using typecheck [sourceFile] command', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/contracts`);

            // 2. Run taq typecheck hello-tacos.tz
            const {stdout, stderr} = await exec(`taq typecheck hello-tacos.tz`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that it's well-typed and contains no errors
            expect(stdout).toBe(contents.typecheckTableOneRow);
            expect(stderr).toBe("");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria typechecker plugin can typecheck multiple contracts under contracts folder', async () => {
        try {
            // 1. Copy two contracts from data folder to /contracts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/contracts/hello-tacos-one.tz`);
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/contracts/hello-tacos-two.tz`);

            // 2. Run taq typecheck
            const {stdout, stderr} = await exec(`taq typecheck`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that both are well-typed and contain no errors
            expect(stdout).toBe(contents.typecheckTableTwoRows);
            expect(stderr).toBe("");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria typechecker plugin can typecheck multiple contracts using typecheck [sourceFile1] [sourceFile2] command', async () => {
        try {
            // 1. Copy two contracts from data folder to /contracts folder under taqueria project
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/contracts/hello-tacos-one.tz`);
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/contracts/hello-tacos-two.tz`);

            // 2. Run taq typecheck hello-tacos-one.tz hello-tacos-two.tz
            const {stdout, stderr} = await exec(`taq typecheck hello-tacos-one.tz hello-tacos-two.tz`, {cwd: `./${taqueriaProjectPath}`});

            // 3. Verify that both are well-typed and contain no errors
            expect(stdout).toBe(contents.typecheckTableTwoRows);
            expect(stderr).toBe("");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taqueria typechecker plugin will display proper message if user tries to typecheck contract that does not exist', async () => {
        try {
            // 1. Run taq typecheck ${contractName} for contract that does not exist
            const {stdout, stderr} = await exec(`taq typecheck test.tz`, {cwd: `./${taqueriaProjectPath}`})

            // 2. Verify that output includes a table and an error message
            expect(stdout).toBe(contents.typecheckNonExistent)
            expect(stderr).toContain("Unknown primitive Users");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test("Verify that taqueria typechecker plugin emits error and yet displays table if contract is ill-typed", async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos-ill-typed.tz ${taqueriaProjectPath}/contracts`)

            // 2. Run taq typecheck hello-tacos-ill-typed.tz
            const {stdout, stderr} = await exec(`taq typecheck hello-tacos-ill-typed.tz`, {cwd: `./${taqueriaProjectPath}`})

            // 3. Verify that output includes a table and an error message
            expect(stdout).toBe(contents.typecheckIllTyped)
            expect(stderr).toContain("Type nat is not compatible with type string");

        } catch(error) {
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