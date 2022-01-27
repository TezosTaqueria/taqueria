import {execSync} from "child_process";
import {generateTestProject} from "../e2e/utils/utils";

const testProjectPath = 'integration/auto-test-integration';


describe("Integration tests using taqueria-mock-plugin", () => {

    beforeAll(async () => {
        await generateTestProject(testProjectPath);
    })

    test('Verify that mock-plugin will return pong when taq ping send', () => {
        try{
            const stdout = execSync(`cd .. && cd ${testProjectPath} && taq ping`)
            expect(stdout).toEqual("pong");
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    });
});