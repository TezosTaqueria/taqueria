import {generateTestProject} from "./utils/utils";
import fs from "fs";


const configFilePath = 'e2e/auto-test-plugins';

describe("E2E Testing for taqueria ligo plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(configFilePath);
    })

    test('Verify that taqueria ligo plugin can compile the contract', async () => {
    });

    // Commented out for debug purpose
    // afterAll(() => {
    //     // @ts-ignore
    //     fs.rmdir(configFilePath, { recursive: true }, (error: string) => {
    //         if (error) {
    //             throw new Error (`error: ${error}`);
    //         }
    //     });
    // })

});