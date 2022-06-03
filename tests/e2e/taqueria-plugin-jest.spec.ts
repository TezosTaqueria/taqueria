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

			expect(directoryContents.stdout).toContain('tests');
			expect(taqContents.stdout).toContain('jest.config.js');
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

	test('global jest config matches partition config after initialization', async () => {
		const directory = 'config-match';
		try {
			await exec(`taq test -i ${directory} -p ${taqueriaProjectPath}`);
			const taqConfigContents = await exec(`cat ${taqueriaProjectPath}/.taq/jest.config.js`);
			const localConfigContents = await exec(`cat ${taqueriaProjectPath}/${directory}/jest.config.js`);

			expect(taqConfigContents.stdout).toBe(localConfigContents.stdout);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	afterEach(async () => {
		try {
		} catch {}
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
