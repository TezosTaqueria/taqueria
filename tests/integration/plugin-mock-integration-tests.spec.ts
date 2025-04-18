import { exec as exec1, execSync, spawnSync } from 'child_process';
import { readFile, rm } from 'fs/promises';
import { join } from 'path';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const testProjectPath = 'scrap/auto-test-integration';

const tableOutput = `
┌──────┐
│ Ping │
├──────┤
│ pong │
└──────┘`;

describe('Unit tests using taqueria-mock-plugin', () => {
	jest.setTimeout(90000);

	beforeAll(async () => {
		await generateTestProject(testProjectPath, ['mock']);
	});

	test('Verify that proxied requests with no encoding output valid string', () => {
		try {
			const result = execSync(`cd ./${testProjectPath} && taq ping`, { stdio: 'pipe' });
			const stdout = result.toString().trim();
			expect(stdout).toEqual('pong');
		} catch (error) {
			console.log('Full error output:', error);
			throw error;
		}
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

	// test.skip('Verify that a template cannot be instantiated without required positional args', async () => {
	// 	const { execaCommand } = execa;
	// 	const result = await execaCommand('taq create text', {
	// 		cwd: testProjectPath,
	// 		encoding: 'utf8',
	// 		reject: false,
	// 	});
	// 	expect(result.stderr).toContain('Not enough non-option arguments: got 1, need at least 2');
	// 	expect(result.stderr).toMatch(/filename.*required/);
	// });

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

	test.skip('Verify that if an invalid schema is used, error messaging works as expected', async () => {
		const withoutDebug = await exec('taq proxy --invalid-schema || true', {
			cwd: testProjectPath,
			encoding: 'utf8',
		});
		expect(withoutDebug.stderr).toContain(
			'@taqueria/plugin-mock encountered an unexpected problem. Use --debug to learn more.',
		);

		const withDebug = await exec('taq proxy --invalid-schema --debug || true', {
			cwd: testProjectPath,
			encoding: 'utf8',
		});
		expect(withDebug.stderr).not.toEqual(
			'@taqueria/plugin-mock encountered an unexpected problem. Use --debug to learn more.',
		);
		expect(withDebug.stderr).toContain(`"secretKey":"[hidden]"`);
		expect(withDebug.stderr).toContain(`"privateKey":"[hidden]"`);
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
