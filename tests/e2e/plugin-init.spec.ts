import {exec} from "child_process";
const fs = require('fs');

const taqueriaProject = './e2e/auto-test';

describe("E2E Testing for taqueria general functionality", () => {
    test('Verify that taq init creates test folder', async () => {
        // @ts-ignore
        exec("taqueria init e2e/auto-test", (error, stdout, stderr) => {
            if (error) {
                throw new Error (`error: ${error.message}`);
            }
            expect(stdout).toBeDefined();
        });

        await new Promise((r) => setTimeout(r, 2000));
        const isTaquified = fs.existsSync(taqueriaProject);
        expect(isTaquified).toBeTruthy();
    });

    afterAll(() => {
        fs.rmdir(taqueriaProject, { recursive: true }, (error: string) => {
            if (error) {
                throw new Error (`error: ${error}`);
            }
        });
    })
});