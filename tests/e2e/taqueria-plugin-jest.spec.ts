import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-jest-plugin';
let directory = 'tests';

describe('E2E Testing for the taqueria jest plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['jest']);
	});

	beforeEach(async () => {
		await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
	});

	test.skip('', async () => {
		try {
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Jest plugin creates default "tests" partition and jest config when running command with no arguments', async () => {
		directory = 'tests';
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
		directory = 'automated-tests-initialization';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
			const directoryContents = await exec(`ls ${taqueriaProjectPath}`);

			expect(directoryContents.stdout).toContain(directory);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('local jest config references global config with local info added', async () => {
		directory = 'tests';
		try {
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

	test.skip('simple jest test file can be run successfully with plugin', async () => {
		directory = 'dummy-test';
		try {
			await exec(``);
			await exec(`cp e2e/data/empty-jest-test-file-1.spec.ts `);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// afterEach(async () => {
	// 	try {
	// 		await fsPromises.rm(`${taqueriaProjectPath}/${directory}`, { recursive: true })
	// 	} catch {}
	// });

	// afterAll(async () => {
	// 	try {
	// 		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	// 	} catch (error) {
	// 		throw new Error(`error: ${error}`);
	// 	}
	// });
});
