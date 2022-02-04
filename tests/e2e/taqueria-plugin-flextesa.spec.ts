import {generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";
import waitForExpect from "wait-for-expect";

const taqueriaProjectPath = 'e2e/auto-test-flextesa-plugin';
let dockerId: string = "";

describe("E2E Testing for taqueria flextesa plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["flextesa"]);
    })

    test('Verify that taqueria flextesa plugin can start and stop a sandbox', async () => {
        try {
            // 1. Run sandbox start command
            const stdoutStart = execSync(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 2. Verify that sandbox has been started and taqueria returns proper message into console
            expect(stdoutStart).toEqual("Started local.");

            // 3. Verify that docker container has been started and get container id for clean-up process
            const dockerContainerList = execSync("docker ps").toString().trim().split(/\r?\n/);
            dockerContainerList.forEach(item => {
                if(item.includes("ecadlabs/taqueria-flextesa:latest")){
                    [dockerId] = item.split(" ");
                }
            })
            expect(dockerId).not.toEqual("")

            // 4.  Run stop command and verify the output
            const stdoutStop = execSync(`taq stop sandbox local`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 5. Verify that taqueria returns proper message into console
            expect(stdoutStop).toEqual("Stopped local.");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    test('Verify that taqueria flextesa plugin can return list of accounts from a sandbox', async () => {
        try {
            // 1. Run sandbox start command
            execSync(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 2. Get docker container id to use in clean up process
            const dockerContainerList = execSync("docker ps").toString().trim().split(/\r?\n/);
            dockerContainerList.forEach(item => {
                if(item.includes("ecadlabs/taqueria-flextesa:latest")){
                    [dockerId] = item.split(" ");
                }
            })

            // TODO: Ask Michael if it is a bug that plugin does not wait any signal from sandbox?
            // 3. Run list accounts command and verify that it returns list of default accounts
            await waitForExpect(() => {
                const stdoutList = execSync("taq list accounts local", {cwd: `./${taqueriaProjectPath}`}).toString().trim();
                expect(stdoutList).toContain("bob");
            });

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    test('Verify that taqueria flextesa plugin will return "Already running." if sandbox has started" if user tries to call start sandbox twice', async () => {
        try {
            // 1. Run sandbox start command
            execSync(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 2. Get docker container id to use in clean up process
            const dockerContainerList = execSync("docker ps").toString().trim().split(/\r?\n/);
            dockerContainerList.forEach(item => {
                if(item.includes("ecadlabs/taqueria-flextesa:latest")){
                    [dockerId] = item.split(" ");
                }
            })

            // 3.  Run start command second time and verify the output
            const stdoutStart = execSync(`taq start sandbox`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();
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

    // Clean up process to stop container if it was not stopped properly during the test
    afterEach( () => {
        try {
            let dockerListStdout = execSync("docker ps").toString().trim();
            if(dockerListStdout.includes(dockerId)){
                execSync(`docker stop ${dockerId}`);
            }

            dockerListStdout = execSync("docker ps").toString().trim();
            if(dockerListStdout.includes(dockerId)){
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