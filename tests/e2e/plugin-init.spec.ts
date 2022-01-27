import {execSync} from "child_process";
import fs from "fs";

const taqueriaProject = './e2e/auto-test';

describe("E2E Testing for taqueria general functionality", () => {
    test('Verify that taq init creates test folder', () => {

        try {
            execSync("taqueria init e2e/auto-test")
        } catch(error){
            throw new Error (`error: ${error}`);
        }

        setTimeout(() => {}, 2000);
        const isTaquified = fs.existsSync(taqueriaProject);
        expect(isTaquified).toBeTruthy();
        expect(isTaquified).toEqual("Project taq'ified!")
    });

    afterAll(() => {
        try {
            fs.rmdirSync(taqueriaProject, { recursive: true })
        } catch(error){
            throw new Error (`error: ${error}`);
        }
    })
});