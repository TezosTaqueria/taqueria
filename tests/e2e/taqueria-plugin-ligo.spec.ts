import {generateTestProject} from "./utils/utils";


const testProjectPath = 'e2e/auto-test-plugins';

describe("E2E Testing for taqueria ligo plugin",  () => {

    beforeAll(async () => {
        await generateTestProject(testProjectPath);
    })

    test('Verify that taqueria ligo plugin can compile the contract', async () => {
    });

    // Comment for debug purpose
    afterAll(() => {
        // @ts-ignore
        fs.rmdir(configFilePath, { recursive: true }, (error: string) => {
            if (error) {
                throw new Error (`error: ${error}`);
            }
        });
    })

});