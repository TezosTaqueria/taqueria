import {generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";
import exp from "constants";

const taqueriaProjectPath = 'e2e/auto-test-flextesa-plugin';
let dockerId: string;

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

            // 3. Verify that docker container has been started
            const [,flextesaDockerStdout] = execSync("docker ps").toString().trim().split(/\r?\n/);
            expect(flextesaDockerStdout).toContain("ecadlabs/taqueria-flextesa:latest");
            [dockerId] = flextesaDockerStdout.split(" ");

            // 4.  Run stop command and verify the output
            const stdoutStop = execSync(`taq stop sandbox local`, {cwd: `./${taqueriaProjectPath}`}).toString().trim();

            // 5. Verify that taqueria returns proper message into console
            expect(stdoutStop).toEqual("Stopped local.");

            // 3. Verify that docker container has been stopped
            const dockerListStdout = execSync("docker ps").toString().trim()
            expect(dockerListStdout).not.toContain("ecadlabs/taqueria-flextesa:latest");

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    test.skip('Verify that taqueria flextesa plugin can return list of accounts from a sandbox', async () => {
        try {
            // 1. Run list accounts command and verify that it returns list of default accounts
            // execSync(`cd ./${taqueriaProjectPath} && taq compile`).toString()

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });


    test.skip('Verify that taqueria flextesa plugin will return "Already running if sandbox has started"', async () => {
        try {
            // 1. Run list accounts command and verify that it returns list of default accounts
            // execSync(`cd ./${taqueriaProjectPath} && taq compile`).toString()

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll(() => {
        try {
            const dockerListStdout = execSync("docker ps").toString().trim();
            if(dockerListStdout.includes(dockerId)){
                execSync(`docker stop ${dockerId}`);
            }
            fs.rmdirSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});