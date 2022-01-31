import {generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";

const taqueriaProjectPath = 'e2e/auto-test-flextesa-plugin';

describe("E2E Testing for taqueria flextesa plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath, ["flextesa"]);
    })

    test.skip('Verify that taqueria flextesa plugin can start and stop a sandbox', async () => {
        try {
            // 1. Run start command and verify the output


            // 2.  Run stop command and verify the output

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    test('Verify that taqueria flextesa plugin can return list of accounts from a sandbox', async () => {
        try {
            // 1. Run list accounts command and verify that it returns list of default accounts
            // execSync(`cd ./${taqueriaProjectPath} && taq compile`).toString()

        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Comment for debug purpose
    afterAll(() => {
        try {
            fs.rmdirSync(taqueriaProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })

});