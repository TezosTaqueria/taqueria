import {exec} from "child_process";

describe("Integration tests using taqueria-mock-plugin", () => {
    test('Verify that mock-plugin will return pong when taq ping send', () => {
        // @ts-ignore
        exec("cd .. && cd .. && cd test-project && taqueria ping", (error, stdout) => {
            if (error) {
                // console.log(`error: ${error.message}`);
                throw new Error (`error: ${error.message}`);
            }
            // console.log(stdout);
            expect(stdout).toBeDefined();
            expect(stdout).toContain("pong");
        });
    });
});