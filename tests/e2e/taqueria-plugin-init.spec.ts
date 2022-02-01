import {execSync} from "child_process";
import fs from "fs";

const taqueriaProjectPath = './e2e/auto-test';

describe("E2E Testing for taqueria general functionality", () => {
    test('Verify that taq init creates test folder', () => {

        try {
            const stdout = execSync("taq init e2e/auto-test").toString();
            expect(stdout.trim()).toEqual("Project taq'ified!")
        } catch(error) {
            throw new Error (`error: ${error}`);
        }

        const isTaquified = fs.existsSync(taqueriaProjectPath);
        expect(isTaquified).toBeTruthy();
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