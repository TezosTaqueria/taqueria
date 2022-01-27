import {execSync} from "child_process";

describe("Integration tests using taqueria-mock-plugin", () => {
    test('Verify that mock-plugin will return pong when taq ping send', () => {

        execSync("cd .. && cd .. && cd test-project && taq ping", (error, stdout) => {
            if (error) {
                throw new Error (`error: ${error.message}`);
            }
            // console.log(stdout);
            expect(stdout).toEqual("pong");
        });
    });
});