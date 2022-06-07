import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);
import { reference } from './data/jest.config-reference';
import { referenceCI } from './data/jest.config-reference-ci';

const taqueriaProjectPath = 'e2e/auto-test-jest-plugin';

// Jest currently outputs to stderr by default and an open issue exists for it here:
// https://github.com/facebook/jest/issues/11925. Once that is fixed we can update these tests

describe('E2E Testing for the taqueria jest plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['jest']);
	});

	test('Jest plugin creates default "tests" partition and jest config when running command with no arguments', async () => {
		await exec(`taq test -p ${taqueriaProjectPath}`);
		const directoryContents = await exec(`ls ${taqueriaProjectPath}`);
		const taqContents = await exec(`ls ${taqueriaProjectPath}/.taq`);
		const testsContents = await exec(`ls ${taqueriaProjectPath}/tests`);

		expect(directoryContents.stdout).toContain('tests');
		expect(taqContents.stdout).toContain('jest.config.js');
		expect(testsContents.stdout).toContain('jest.config.js');
	});

	test('Initializing a different partition with the init argument', async () => {
		const directory = 'automated-tests-initialization';
		await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
		const directoryContents = await exec(`ls ${taqueriaProjectPath}`);
		expect(directoryContents.stdout).toContain(directory);
	});

	test('local jest config references global config with local info added', async () => {
		const directory = 'test-config';

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
	});

	test('simple jest test file can be run successfully with plugin', async () => {
		const directory = 'dummy-test';

		await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
		await exec(
			`cp e2e/data/empty-jest-test-file-1.ts ${taqueriaProjectPath}/${directory}/empty-jest-test-file-1.spec.ts`,
		);
		const testOutput = await exec(`taq test ${directory} -p ${taqueriaProjectPath}`);

		expect(testOutput.stderr).toContain(
			`\x1B[0m\x1B[7m\x1B[1m\x1B[32m PASS \x1B[39m\x1B[22m\x1B[27m\x1B[0m \x1B[2m${taqueriaProjectPath}/${directory}/\x1B[22m\x1B[1mempty-jest-test-file-1.spec.ts\x1B[22m`,
		);
	});

	test('Run all tests inside of a test partition', async () => {
		const directory = 'multi-file-test';
		const file1 = 'empty-jest-test-file-1.spec.ts';
		const file2 = 'empty-jest-test-file-2.spec.ts';

		await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);

		await exec(`cp e2e/data/empty-jest-test-file-1.ts ${taqueriaProjectPath}/${directory}/${file1}`);
		await exec(`cp e2e/data/empty-jest-test-file-2.ts ${taqueriaProjectPath}/${directory}/${file2}`);
		const testOutput = await exec(`taq test ${directory} -p ${taqueriaProjectPath}`);

		expect(testOutput.stderr).toContain(
			`\x1B[0m\x1B[7m\x1B[1m\x1B[32m PASS \x1B[39m\x1B[22m\x1B[27m\x1B[0m \x1B[2m${taqueriaProjectPath}/${directory}/\x1B[22m\x1B[1m${file1}\x1B[22m`,
		);
		expect(testOutput.stderr).toContain(
			`\x1B[0m\x1B[7m\x1B[1m\x1B[32m PASS \x1B[39m\x1B[22m\x1B[27m\x1B[0m \x1B[2m${taqueriaProjectPath}/${directory}/\x1B[22m\x1B[1m${file2}\x1B[22m`,
		);
	});

	test('Run all tests matching test pattern inside of a test partition', async () => {
		const directory = 'multi-file-single-test';
		const file1 = 'empty-jest-test-file-1.spec.ts';
		const file2 = 'empty-jest-test-file-2.spec.ts';

		await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);

		await exec(`cp e2e/data/empty-jest-test-file-1.ts ${taqueriaProjectPath}/${directory}/${file1}`);
		await exec(`cp e2e/data/empty-jest-test-file-2.ts ${taqueriaProjectPath}/${directory}/${file2}`);
		const testOutput = await exec(`taq test ${directory} --testPattern file-* -p ${taqueriaProjectPath}`);

		expect(testOutput.stderr).toContain(
			`\x1B[0m\x1B[7m\x1B[1m\x1B[32m PASS \x1B[39m\x1B[22m\x1B[27m\x1B[0m \x1B[2m${taqueriaProjectPath}/${directory}/\x1B[22m\x1B[1m${file1}\x1B[22m`,
		);
		expect(testOutput.stderr).toContain(
			`\x1B[0m\x1B[7m\x1B[1m\x1B[32m PASS \x1B[39m\x1B[22m\x1B[27m\x1B[0m \x1B[2m${taqueriaProjectPath}/${directory}/\x1B[22m\x1B[1m${file2}\x1B[22m`,
		);
	});

	test('Run only tests matching test pattern inside of a test partition', async () => {
		const directory = 'multi-file-single-test';
		const file1 = 'empty-jest-test-file-1.spec.ts';
		const file2 = 'empty-jest-test-file-2.spec.ts';

		await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);

		await exec(`cp e2e/data/empty-jest-test-file-1.ts ${taqueriaProjectPath}/${directory}/${file1}`);
		await exec(`cp e2e/data/empty-jest-test-file-2.ts ${taqueriaProjectPath}/${directory}/${file2}`);
		const testOutput = await exec(`taq test ${directory} --testPattern 1 -p ${taqueriaProjectPath}`);

		expect(testOutput.stderr).toContain(
			`\x1B[0m\x1B[7m\x1B[1m\x1B[32m PASS \x1B[39m\x1B[22m\x1B[27m\x1B[0m \x1B[2m${taqueriaProjectPath}/${directory}/\x1B[22m\x1B[1m${file1}\x1B[22m`,
		);
	});

	test('no tests present will result in an error', async () => {
		const testOutput = await exec(`taq test -p ${taqueriaProjectPath}`);
		expect(testOutput.stdout).toContain('No tests found, exiting with code 1');
	});

	test('global jest config matches reference config', async () => {
		const directory = 'config-matching';

		await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
		const configContents = require(`../${taqueriaProjectPath}/.taq/jest.config.js`);

		if (process.env.CI === 'true') {
			expect(configContents).toMatchObject(referenceCI);
		} else {
			expect(configContents).toMatchObject(reference);
		}
	});

	afterAll(async () => {
		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	});
});
