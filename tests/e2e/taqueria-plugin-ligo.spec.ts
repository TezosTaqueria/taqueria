import {generateTestProject} from "./utils/utils";
import fs from "fs";
import {execSync} from "child_process";

const taqueriaProjectPath = 'e2e/auto-test-plugins';

describe("E2E Testing for taqueria ligo plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(taqueriaProjectPath);
    })

    test('Verify that taqueria ligo plugin can compile the contract', async () => {
        try {
            const stdout = execSync("taq init e2e/auto-test").toString();
            expect(stdout.trim()).toEqual("Project taq'ified!")
        } catch(error) {
            throw new Error (`error: ${error}`);
        }

    });

    // Comment for debug purpose
    // afterAll(() => {
    //     try {
    //         fs.rmdirSync(taqueriaProjectPath, { recursive: true })
    //     } catch(error){
    //         throw new Error (`error: ${error}`);
    //     }
    // })

});