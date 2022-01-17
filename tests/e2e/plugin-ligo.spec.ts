import {exec} from "child_process";
const fs = require('fs');

describe("E2E Testing for taqueria plugins", () => {
    test('Verify that taq init creates test folder', () => {
        // @ts-ignore
        exec("taqueria init auto-test", (error, stdout, stderr) => {
            if (error) {
                // console.log(`error: ${error.message}`);
                throw new Error (`error: ${error.message}`);
            }
            // console.log(stdout);
            expect(stdout).toBeDefined();
        });

        const taqueriaProject = './auto-test';

        // check if directory exists
        if (fs.existsSync(taqueriaProject)) {
            console.log('Directory exists!');
        } else {
            console.log('Directory not found.');
        }
    });

    // afterAll(() => {
    //     const taqueriaProject = './test-project';
    //     fs.rmdir(taqueriaProject, { recursive: true }, (err: string) => {
    //         if (err) {
    //             throw err;
    //         }
    //
    //         // console.log(`${taqueriaProject} is deleted!`);
    //     });
    // })
});