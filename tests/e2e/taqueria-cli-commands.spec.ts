import {checkFolderExistsWithTimeout, generateTestProject} from "./utils/utils";
import {exec, execSync} from "child_process";
import fs from "fs";

const taqueriaProjectPath = './e2e/auto-test-cli';

describe("E2E Testing for taqueria general functionality", () => {

    // beforeAll(async () => {
    //     await generateTestProject(taqueriaProjectPath, []);
    // })

    test.skip('Verify that taq gives the help menu', () => {
        try {
            const stdout = execSync("taq").toString();
            expect(stdout.trim()).toEqual("Project taq'ified!")
            // console.log(output)
            // expect(output).toContain("--env")
        } catch(error) {
            throw new Error (`error: ${error}`);
        }
    });

    test('Verify that taq reports the correct version', () => {
        const version = execSync('taq --version').toString().trim();
        if (process.env.CI === 'true') {
            try {
                const packageJsonContents = JSON.parse(fs.readFileSync('package.json').toString())
                expect(version).toEqual('v' + packageJsonContents.version)
            } catch (error) {
                throw new Error (`error: ${error}`);
            }
        } else {
            try {
                const branch = execSync('git branch --show-current').toString().trim()
                expect(version).toMatch('dev:' + branch)
            } catch (error) {
                throw new Error (`error: ${error}`);
            }
        }
        
    });

    // Clean up process to remove taquified project folder
    // Comment if need to debug
    // afterAll(() => {
    //     try {
    //         fs.rmdirSync(taqueriaProjectPath, { recursive: true })
    //     } catch(error){
    //         throw new Error (`error: ${error}`);
    //     }
    // })
});