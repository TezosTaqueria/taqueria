import {execSync} from "child_process";
import {generateTestProject} from "../e2e/utils/utils";
import fs from "fs";

const testProjectPath = 'integration/auto-test-integration';


describe("Integration tests using taqueria-mock-plugin", () => {

    beforeAll(async () => {
        await generateTestProject(testProjectPath, ["mock"]);
    })

    test('Verify that mock-plugin will return pong when taq ping send', () => {
        try{
            const stdout = execSync(`cd ./${testProjectPath} && taq ping`).toString().trim();
            expect(stdout).toEqual("pong");
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    });

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    afterAll(() => {
        try {
            fs.rmSync(testProjectPath, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })
});