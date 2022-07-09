import { execSync, spawnSync } from 'child_process';
import { readFile, rm } from 'fs/promises';
import { join } from 'path';
import { generateTestProject } from '../e2e/utils/utils';
const testProjectPath = 'integration/auto-test-integration';

const tableOutput = `
┌──────┐
│ Ping │
├──────┤
│ pong │
└──────┘`;

describe('Integration tests using taqueria-mock-plugin', () => {
	beforeAll(async () => {
		await generateTestProject(testProjectPath, ['mock']);
	});

	test('Verify that proxied requests with no encoding output valid string', () => {
		const stdout = execSync(`cd ./${testProjectPath} && taq ping`).toString().trim();
		expect(stdout).toEqual('pong');
	});

	test('Verify that proxied requests with no encoding return error', () => {
		try {
			const _ = spawnSync(`cd ./${testProjectPath} && taq ping -e`, {});
		} catch (stderr) {
			expect(stderr).toEqual('error');
		}
	});

	test('Verify that proxied requests with JSON encoding output valid string', () => {
		const stdout = execSync(`cd ./${testProjectPath} && taq proxy-json -r string`).toString().trim();
		expect(stdout).toEqual('pong');
	});

	test('Verify that proxied request with JSON encoding outputs valid table', () => {
		const stdout = execSync(`cd ./${testProjectPath} && taq proxy-json --return object`).toString().trim();
		expect(stdout).toEqual(tableOutput.trimStart());
	});

	test('Verify that proxied request with JSON encoding output error', () => {
		try {
			const _ = spawnSync(`cd ./${testProjectPath} && taq proxy-json -e`, {});
		} catch (stderr) {
			expect(stderr).toEqual('error');
		}
	});

	test('Verify that non-proxied request outputs valid string', () => {
		const stdout = execSync(`cd ./${testProjectPath} && taq without-proxy`).toString().trim();
		expect(stdout).toEqual('pong');
	});

	test('Verify that non-proxied request outputs valid table', () => {
		const stdout = execSync(`cd ./${testProjectPath} && taq json-without-proxy --return object`).toString().trim();
		expect(stdout).toEqual(tableOutput.trimStart());
	});

	test('Verify that a template is included in the create help contents', () => {
		const stdout = execSync('taq create --help', { cwd: testProjectPath }).toString().trim();
		expect(stdout).toMatch(/choices.*json/);
		expect(stdout).toMatch(/choices:.*text/);
	});

	test("Verify that a template's options are included in the help contents", () => {
		const stdout = execSync('taq create json --help', { cwd: testProjectPath }).toString().trim();
		expect(stdout).toMatch(/--greeting/);
	});

	test('Verify that a template cannot be instantiated without required positional args', async () => {
		const execa = await import('execa');
		const { execaCommand } = execa;
		const result = await execaCommand('taq create text', {
			cwd: testProjectPath,
			encoding: 'utf-8',
			reject: false,
		});
		expect(result.stderr).toContain('Not enough non-option arguments: got 1, need at least 2');
		expect(result.stderr).toMatch(/filename.*required/);
	});

	test('Verify that the text template creates a text file from an EJS template', async () => {
		const stdout = execSync('taq create text hello.txt', { cwd: testProjectPath }).toString().trim();
		expect(stdout.trim()).toBeFalsy();

		const output = await readFile(join(testProjectPath, 'artifacts', 'hello.txt'), 'utf8');
		expect(output).toEqual('Hi there, Tester!!\n');
	});

	test('Verify that the text template creates a text file from an EJS template with a custom greeter', async () => {
		const stdout = execSync('taq create text hello.txt -g "QA Team"', { cwd: testProjectPath }).toString().trim();
		expect(stdout.trim()).toBeFalsy();

		const output = await readFile(join(testProjectPath, 'artifacts', 'hello.txt'), 'utf-8');
		expect(output).toEqual('Hi there, QA Team!\n');
	});

	test('Verify that the json template creates a JSON file from a function', async () => {
		const stdout = execSync('taq create json hello.json', { cwd: testProjectPath }).toString().trim();
		expect(stdout).toEqual('Your wish is my command!');

		const output = await readFile(join(testProjectPath, 'artifacts', 'hello.json'), 'utf-8');
		expect(output).toEqual('{"greeting":"Hello, Tester!"}');
	});

	test('Verify that the json template creates a JSON file from a function with custom greeting', async () => {
		const stdout = execSync('taq create json hello.json -g "QA Team"', { cwd: testProjectPath }).toString().trim();
		expect(stdout).toEqual('Your wish is my command!');

		const output = await readFile(join(testProjectPath, 'artifacts', 'hello.json'), 'utf-8');
		expect(output).toEqual('{"greeting":"Hello, QA Team!"}');
	});

	// Clean up process to remove taqified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			await rm(testProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
