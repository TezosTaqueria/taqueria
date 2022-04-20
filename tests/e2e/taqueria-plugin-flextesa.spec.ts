import {generateTestProject, getContainerName} from "./utils/utils";
import fsPromises from "fs/promises"
import { exec as exec1, execSync } from "child_process"
import util from "util"
const exec = util.promisify(exec1)
import {isPortReachable} from "./utils/utils";
import * as contents from './data/typechecker-contents'
import fs from "fs";
import path from "path";

const taqueriaProjectPath = 'e2e/auto-test-flextesa-plugin';
let dockerName: string;

describe("E2E Testing for taqueria flextesa plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["flextesa"]);
    })

    test('Verify that taqueria flextesa plugin can start and stop a default sandbox without specifying name', async () => {
        try {

            // Setting up docker container name
            dockerName = "local"

            // 1. Run sandbox start command
            const sandboxStart = await exec(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`})

            // 2. Verify that sandbox has been started and taqueria returns proper message into console
            expect(sandboxStart.stdout).toEqual("Started local.\nDone.\n");

            // 3. Verify that docker container has been started
            const dockerContainerTest = getContainerName(dockerName);
            expect(dockerContainerTest).toContain("node index.js --sandbox local")

            // 4. Verify that sandbox started on the proper port 0.0.0.0:20000->20000/tcp
            let isReachable = await isPortReachable(20000, {host: 'localhost'});
            expect(isReachable).toBeTruthy();

            // 5.  Run stop command and verify the output
            const sandboxStop = await exec(`taq stop sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})

            // 5. Verify that taqueria returns proper message into console
            expect(sandboxStop.stdout).toEqual("Stopped local.\n");
            isReachable = await isPortReachable(20000, {host: 'localhost'})
            expect(isReachable).toBeFalsy();

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria flextesa plugin can start and stop a default "local" sandbox', async () => {
        try {

            // Setting up docker container name
            dockerName = "local"

            // 1. Run sandbox start command
            const sandboxStart = await exec(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})

            // 2. Verify that sandbox has been started and taqueria returns proper message into console
            expect(sandboxStart.stdout).toContain("Started local.");

            // 3. Verify that docker container has been started
            const dockerContainerTest = getContainerName(dockerName);
            expect(dockerContainerTest).toContain("node index.js --sandbox local")

            // 4. Verify that sandbox started on the proper port 0.0.0.0:20000->20000/tcp
            let isReachable = await isPortReachable(20000, {host: 'localhost'});
            expect(isReachable).toBeTruthy();

            // 5.  Run stop command and verify the output
            const sandboxStop = await exec(`taq stop sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})

            // 5. Verify that taqueria returns proper message into console
            expect(sandboxStop.stdout).toContain("Stopped local.");
            isReachable = await isPortReachable(20000, {host: 'localhost'})
            expect(isReachable).toBeFalsy();

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria flextesa plugin can return list of accounts from a sandbox', async () => {
        try {

            // Setting up docker container name
            dockerName = "local"

            // 1. Run sandbox start command
            await exec(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})

            const accounts = await exec(`taq list accounts ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})
            expect(accounts.stdout).toContain("bob")

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    test('Verify that taqueria flextesa plugin will return "Already running." if sandbox has started" if user tries to call start sandbox twice', async () => {
        try {

            // Setting up docker container name
            dockerName = "local"

            // 1. Run sandbox start command
            await exec(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})

            // 2.  Run start command second time and verify the output
            const sandboxStart = await exec(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})
            expect(sandboxStart.stdout).toEqual("Already running.\n");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria flextesa plugin will return "The local sandbox was not running." if user tries to call stop on sandbox that is not running', async () => {
        try {
            // 1. Run stop sandbox local on sandbox that is not running and verify result
            const sandboxWasNotRunning = await exec("taq stop sandbox local", {cwd: `./${taqueriaProjectPath}`})
            expect(sandboxWasNotRunning.stdout).toEqual("The local sandbox was not running.\n");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently it cannot be done until the output will be places to stdout
    // Issue to implement the test: https://github.com/ecadlabs/taqueria/issues/368
    // Related developer issue: https://github.com/ecadlabs/taqueria/issues/367
    test('Verify that taqueria flextesa plugin will return "The local sandbox is not running." if user tries to retrieve list of accounts that is not running', async () => {
        try {
            // 1. Run list accounts command on sandbox that is not running and verify result
            const stdoutSandboxIsNotRunning = await exec("taq list accounts local", {cwd: `./${taqueriaProjectPath}`})
            expect(stdoutSandboxIsNotRunning.stderr).toEqual("The local sandbox is not running.\n");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Currently it cannot be done until this issue has been resolved
    // Issue to implement test: https://github.com/ecadlabs/taqueria/issues/366
    // Related developer issue: https://github.com/ecadlabs/taqueria/issues/243
    test('Verify that taqueria flextesa plugin can start and stop a sandbox with custom name', async () => {
        try {
            // Setting up docker container name
            dockerName = "test"

            // 1. Updating config to add test sandbox
            await exec(`cp e2e/data/config-flextesa-test-sandbox.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run sandbox start command with customer name
            const stdoutStart = await exec(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})
            // 3. Verify that sandbox has been started and taqueria returns proper message into console
            expect(stdoutStart.stdout).toEqual(`Started ${dockerName}.\n`);

            // 4. Run list accounts command and verify that it returns list of default accounts
            const stdoutList = await exec(`taq list accounts ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})
            expect(stdoutList.stdout).toContain("ken");

            // 5.  Run stop command and verify the output
            const stdoutStop = await exec(`taq stop sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})

            // 6. Verify that taqueria returns proper message into console
            expect(stdoutStop.stdout).toEqual(`Stopped ${dockerName}.\n`);

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    // TODO: Currently it cannot be done until this issue has been resolved
    // Issue to implement test: https://github.com/ecadlabs/taqueria/issues/366
    // Related developer issue: https://github.com/ecadlabs/taqueria/issues/243
    test.skip('Verify that taqueria flextesa plugin can retrieve data from updated config after restart', async () => {
        try {
            // Setting up docker container name
            dockerName = "local"

            // 1. Start sandbox

            // 2. Check balance

            // 3. Stop sandbox

            // 4. Update config

            // 5. start sandbox again

            // 6. Check balance again and see that it changed

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    // Clean up process to stop container if it was not stopped properly during the test
    afterEach( () => {
        try {
            let dockerContainer = getContainerName(dockerName);
            if(dockerContainer !== undefined){
                execSync(`docker stop ${dockerName}`);
            }

            const dockerListStdout = execSync("docker ps").toString().trim();
            if(dockerListStdout.includes(dockerName)){
                throw new Error("Container was not stopped properly");
            }
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    });

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll( async () => {
        try {
            await fsPromises.rm(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});

describe("E2E Testing for taqueria typechecker plugin", () => {

    beforeAll(async () => {
        dockerName = "local"
        await generateTestProject(taqueriaProjectPath, ["flextesa"]);
        await exec(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`})
    })

    test('Verify that taqueria typechecker plugin can typecheck one contract under contracts folder', async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/contracts`);

            // 2. Run taq typecheck
            const {stdout, stderr} = await exec(`taq typecheck ${dockerName}`, {cwd: `./${taqueriaProjectPath}`});

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
            const {stdout, stderr} = await exec(`taq typecheck ${dockerName} hello-tacos.tz`, {cwd: `./${taqueriaProjectPath}`});

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
            const {stdout, stderr} = await exec(`taq typecheck ${dockerName}`, {cwd: `./${taqueriaProjectPath}`});

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
            const {stdout, stderr} = await exec(`taq typecheck ${dockerName} hello-tacos-one.tz hello-tacos-two.tz`, {cwd: `./${taqueriaProjectPath}`});

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
            const {stdout, stderr} = await exec(`taq typecheck ${dockerName} test.tz`, {cwd: `./${taqueriaProjectPath}`})

            // 2. Verify that output includes a table and an error message
            expect(stdout).toBe(contents.typecheckNonExistent)
            expect(stderr).toContain("Does not exist");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test("Verify that taqueria typechecker plugin emits error and yet displays table if contract is ill-typed", async () => {
        try {
            // 1. Copy contract from data folder to taqueria project folder
            execSync(`cp e2e/data/hello-tacos-ill-typed.tz ${taqueriaProjectPath}/contracts`)

            // 2. Run taq typecheck hello-tacos-ill-typed.tz
            const {stdout, stderr} = await exec(`taq typecheck ${dockerName} hello-tacos-ill-typed.tz`, {cwd: `./${taqueriaProjectPath}`})

            // 3. Verify that output includes a table and an error message
            expect(stdout).toBe(contents.typecheckIllTyped)
            expect(stderr).toContain("Type nat is not compatible with type string");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    })

    // Remove all files from contracts folder without removing folder itself
    afterEach(() => {
        try {
            const files = fs.readdirSync(`${taqueriaProjectPath}/contracts/`);
            for (const file of files) {
                fs.unlinkSync(path.join(`${taqueriaProjectPath}/contracts/`, file));
            }
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

    // Clean up process to stop container if it was not stopped properly during the test
    // And
    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll( async () => {
        try {
            let dockerContainer = getContainerName(dockerName);
            if(dockerContainer !== undefined){
                execSync(`docker stop ${dockerName}`);
            }

            const dockerListStdout = execSync("docker ps").toString().trim();
            if(dockerListStdout.includes(dockerName)){
                throw new Error("Container was not stopped properly");
            }
            await fsPromises.rm(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

})