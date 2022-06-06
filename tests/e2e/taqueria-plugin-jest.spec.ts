import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-jest-plugin';

describe('E2E Testing for the taqueria jest plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['jest']);
	});

	test.skip('', async () => {
		try {
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Jest plugin creates default "tests" partition and jest config when running command with no arguments', async () => {
		try {
			await exec(`taq test -p ${taqueriaProjectPath}`);
			const directoryContents = await exec(`ls ${taqueriaProjectPath}`);
			const taqContents = await exec(`ls ${taqueriaProjectPath}/.taq`);
			const testsContents = await exec(`ls ${taqueriaProjectPath}/tests`);

			expect(directoryContents.stdout).toContain('tests');
			expect(taqContents.stdout).toContain('jest.config.js');
			expect(testsContents.stdout).toContain('jest.config.js');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Initializing a different partition with the init argument', async () => {
		const directory = 'automated-tests-initialization';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
			const directoryContents = await exec(`ls ${taqueriaProjectPath}`);

			expect(directoryContents.stdout).toContain(directory);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('local jest config references global config with local info added', async () => {
		const directory = 'test-config';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
			const pwd = await exec(`pwd`);
			const pwdFormatted = pwd.stdout.replace(/(\r\n|\n|\r)/gm, '');
			const localConfigContents = await exec(`cat ${pwdFormatted}/${taqueriaProjectPath}/${directory}/jest.config.js`);

			expect(localConfigContents.stdout).toContain(
				`const parentConfig = require('${pwdFormatted}/${taqueriaProjectPath}/.taq/jest.config.js')`,
			);
			expect(localConfigContents.stdout).toContain(
				`roots: [\n        "${pwdFormatted}/${taqueriaProjectPath}/${directory}"\n    ]`,
			);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('simple jest test file can be run successfully with plugin', async () => {
		const directory = 'dummy-test';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
			await exec(
				`cp e2e/data/empty-jest-test-file-1.spec.ts ${taqueriaProjectPath}/${directory}/empty-jest-test-file-1.spec.ts`,
			);
			const testOutput = await exec(`taq test ${directory} -p ${taqueriaProjectPath}`);
			console.log(testOutput);

			expect(testOutput.stdout).toContain(`PASS ${taqueriaProjectPath}/${directory}/empty-jest-test-file-1.spec.ts`);
			expect(testOutput.stdout).toContain('dummy test for jest plugin testing');
			expect(testOutput.stdout).toContain('✓ 1 test for jest');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Run all tests inside of a test partition', async () => {
		const directory = 'multi-file-test';
		const file1 = 'empty-jest-test-file-1.spec.ts';
		const file2 = 'empty-jest-test-file-2.spec.ts';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);

			await exec(`cp e2e/data/${file1} ${taqueriaProjectPath}/${directory}/`);
			await exec(`cp e2e/data/${file2} ${taqueriaProjectPath}/${directory}/`);
			const testOutput = await exec(`taq test ${directory} -p ${taqueriaProjectPath}`);

			expect(testOutput.stdout).toContain(`PASS ${taqueriaProjectPath}/${directory}/${file1}`);
			expect(testOutput.stdout).toContain(`PASS ${taqueriaProjectPath}/${directory}/${file2}`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('Run all tests matching test pattern inside of a test partition', async () => {
		const directory = 'multi-file-single-test';
		const file1 = 'empty-jest-test-file-1.spec.ts';
		const file2 = 'empty-jest-test-file-2.spec.ts';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);

			await exec(`cp e2e/data/${file1} ${taqueriaProjectPath}/${directory}/`);
			await exec(`cp e2e/data/${file2} ${taqueriaProjectPath}/${directory}/`);
			const testOutput = await exec(`taq test ${directory} --testPattern file-* -p ${taqueriaProjectPath}`);
			console.log(testOutput);

			expect(testOutput.stdout).toContain(`PASS ${taqueriaProjectPath}/${directory}/${file1}`);
			expect(testOutput.stdout).toContain(`PASS ${taqueriaProjectPath}/${directory}/${file2}`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('no tests present will result in an error', async () => {
		try {
			const testOutput = await exec(`taq test -p ${taqueriaProjectPath}`);
			expect(testOutput.stderr).toContain('No tests found, exiting with code 1');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.only('global jest config matches reference config', async () => {
		const directory = 'config-matching';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);

			const configContents = await exec(`cat ${taqueriaProjectPath}/.taq/jest.config.js`);
			console.log(await exec(`pwd`));
			const referenceContents = await exec(`cat ./e2e/data/jest.config-reference.js`);
			expect(configContents.stdout).toBe(referenceContents.stdout);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	afterEach(async () => {
		try {
		} catch {}
	});

	afterAll(async () => {
		try {
			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
