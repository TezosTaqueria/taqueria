import {generateTestProject} from "./utils/utils";
import {execSync} from "child_process";
import waitForExpect from "wait-for-expect";
import fs from "fs";
import {isPortReachable} from "./utils/utils";


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
            const stdoutStart = execSync(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 2. Verify that sandbox has been started and taqueria returns proper message into console
            expect(stdoutStart).toEqual("Started local.");

            // 3. Verify that docker container has been started
            const [,dockerContainerLocal] = execSync(`docker ps --filter "name=${dockerName}"`).toString().trim().split(/\r?\n/);
            expect(dockerContainerLocal).toBeDefined();

            // 4.  Run stop command and verify the output
            const stdoutStop = execSync(`taq stop sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 5. Verify that taqueria returns proper message into console
            expect(stdoutStop).toEqual("Stopped local.");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria flextesa plugin can start and stop a default "local" sandbox', async () => {
        try {

            // Setting up docker container name
            dockerName = "local"

            // 1. Run sandbox start command
            const stdoutStart = execSync(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 2. Verify that sandbox has been started and taqueria returns proper message into console
            expect(stdoutStart).toEqual("Started local.");

            // 3. Verify that docker container has been started
            const [,dockerContainerLocal] = execSync(`docker ps --filter "name=${dockerName}"`).toString().trim().split(/\r?\n/);
            expect(dockerContainerLocal).toBeDefined();

            // 4. Verify that sandbox started on the proper port 0.0.0.0:20000->20000/tcp
            let isReachable = await isPortReachable(20000, {host: 'localhost'});
            expect(isReachable).toBeTruthy();

            // 4.  Run stop command and verify the output
            const stdoutStop = execSync(`taq stop sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 5. Verify that taqueria returns proper message into console
            expect(stdoutStop).toEqual("Stopped local.");
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
            execSync(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 2. Run list accounts command and verify that it returns list of default accounts
            await waitForExpect(() => {
                const stdoutList = execSync(`taq list accounts ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();
                expect(stdoutList).toContain("bob");
            });

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    test('Verify that taqueria flextesa plugin will return "Already running." if sandbox has started" if user tries to call start sandbox twice', async () => {
        try {

            // Setting up docker container name
            dockerName = "local"

            // 1. Run sandbox start command
            execSync(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 2.  Run start command second time and verify the output
            const stdoutStart = execSync(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();
            expect(stdoutStart).toEqual("Already running.");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria flextesa plugin will return "The local sandbox is not running." if user tries to retrieve list of accounts that is not running', async () => {
        try {
            // 1. Run list accounts command on sandbox that is not running and verify result
            const stdoutSandboxIsNotRunning = execSync("taq list accounts local", {cwd: `./${taqueriaProjectPath}`}).toString().trim();
            expect(stdoutSandboxIsNotRunning).toEqual("The local sandbox is not running.");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria flextesa plugin will return "he local sandbox was not running." if user tries to call stop on sandbox that is not running', async () => {
        try {
            // 1. Run stop sandbox local on sandbox that is not running and verify result
            const stdoutSandboxIsNotRunning = execSync("taq stop sandbox local", {cwd: `./${taqueriaProjectPath}`}).toString().trim();
            expect(stdoutSandboxIsNotRunning).toEqual("The local sandbox was not running.");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // TODO: Ask Michael about the using custom accounts with different initialBalance e. g.
    //             "accounts": {
    //                 "default": "ken",
    //                 "ken": {
    //                     "initialBalance": "1"
    //                 },
    //                 "tran": {
    //                     "initialBalance": "2"
    //                 },
    //                 "mathew": {
    //                     "initialBalance": "3"
    //                 }
    //             },
    test('Verify that taqueria flextesa plugin can start and stop a sandbox with custom name', async () => {
        try {
            // Setting up docker container name
            dockerName = "test"

            // 1. Updating config to add test sandbox
            execSync(`cp e2e/data/config-flextesa-test-sandbox.json ${taqueriaProjectPath}/.taq/config.json`);

            // 2. Run sandbox start command with customer name
            const stdoutStart = execSync(`taq start sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 3. Verify that sandbox has been started and taqueria returns proper message into console
            expect(stdoutStart).toEqual("Started test.");

            // 4. Verify that docker container has been started
            const [,dockerContainerTest] = execSync(`docker ps --filter "name=${dockerName}"`).toString().trim().split(/\r?\n/);
            expect(dockerContainerTest).toBeDefined();

            // 5. Run list accounts command and verify that it returns list of default accounts
            await waitForExpect(() => {
                const stdoutList = execSync(`taq list accounts ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();
                expect(stdoutList).toContain("bob");
                expect(stdoutList).not.toContain("jane");
            });

            // 6.  Run stop command and verify the output
            const stdoutStop = execSync(`taq stop sandbox ${dockerName}`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 7. Verify that taqueria returns proper message into console
            expect(stdoutStop).toEqual("Stopped test.");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    // TODO: Need to clarify about updating accounts, otherwise there is no way to do step d.
    test.skip('Verify that taqueria flextesa plugin can retrieve data from updated config after restart', async () => {
        try {
            // Setting up docker container name
            dockerName = "local"
            //      a. Start sandbox
            //      b. Check balance
            //      c. Stop sandbox
            //      d. Update config
            //      e. start sandbox again
            //      f. Check balance again and see that it changed


        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    // Clean up process to stop container if it was not stopped properly during the test
    afterEach( () => {
        try {
            let [,dockerContainer] = execSync(`docker ps --filter "name=${dockerName}"`).toString().trim().split(/\r?\n/);
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
    afterAll(() => {
        try {
            fs.rmdirSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});