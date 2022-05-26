import {execSync, spawnSync} from "child_process";
import {generateTestProject} from "../e2e/utils/utils";
import fs, { readFileSync } from "fs";

const testProjectPath = 'integration/auto-test-integration';


const tableOutput = `
┌──────┐
│ Ping │
├──────┤
│ pong │
└──────┘`

describe("Integration tests using taqueria-mock-plugin", () => {

    beforeAll(async () => {
        await generateTestProject(testProjectPath, ["mock"]);
    })

    test('Verify that proxied requests with no encoding output valid string', () => {
        const stdout = execSync(`cd ./${testProjectPath} && taq ping`).toString().trim();
        expect(stdout).toEqual("pong");
    });

    test("Verify that proxied requests with no encoding return error", () => {
        try {
            const _ = spawnSync(`cd ./${testProjectPath} && taq ping -e`, {})
        }
        catch (stderr) {
            expect(stderr).toEqual("error")
        }
    })


    test('Verify that proxied requests with JSON encoding output valid string', () => {
        const stdout = execSync(`cd ./${testProjectPath} && taq proxy-json -r string`).toString().trim();
        expect(stdout).toEqual("pong");
    })

    test('Verify that proxied request with JSON encoding outputs valid table', () => {
        const stdout = execSync(`cd ./${testProjectPath} && taq proxy-json --return object`).toString().trim();
        expect(stdout).toEqual(tableOutput.trimStart());
    })

    test('Verify that proxied request with JSON encoding output error', () => {
        try {
            const _ = spawnSync(`cd ./${testProjectPath} && taq proxy-json -e`, {})
        }
        catch (stderr) {
            expect(stderr).toEqual("error")
        }
    })

    test('Verify that non-proxied request outputs valid string', () => {
        const stdout = execSync(`cd ./${testProjectPath} && taq without-proxy`).toString().trim();
        expect(stdout).toEqual("pong");
    })

    test('Verify that non-proxied request outputs valid table', () => {
        const stdout = execSync(`cd ./${testProjectPath} && taq json-without-proxy --return object`).toString().trim();
        expect(stdout).toEqual(tableOutput.trimStart());
    })

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