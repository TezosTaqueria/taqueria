import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import path from 'path';
import util from 'util';
import { checkFolderExistsWithTimeout, generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'scrap/auto-test-smartpy-plugin';

describe('E2E Testing for taqueria SmartPy plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['smartpy']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}
	});

	// Remove all files from artifacts folder without removing folder itself
	afterEach(async () => {
		try {
			const files = await fsPromises.readdir(`${taqueriaProjectPath}/artifacts/`);
			for (const file of files) {
				await fsPromises.rm(path.join(`${taqueriaProjectPath}/artifacts/`, file), { recursive: true });
			}
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
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

	test('Verify that the SmartPy plugin exposes the associated commands in the help menu', async () => {
		try {
			const { stdout } = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(stdout).toContain('taq compile <sourceFile>');
			expect(stdout).toContain('taq test <sourceFile>');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the compile task of the SmartPy plugin exposes the associated options in the help menu', async () => {
		try {
			const { stdout } = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(stdout).toContain('--json');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria SmartPy plugin can compile one contract using taq compile <sourceFile> command', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);

			// 2. Run taq compile ${contractName}
			await exec(`taq compile hello-tacos.py`, { cwd: `./${taqueriaProjectPath}` });

			// 3. Verify that compiled michelson version has been generated
			await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
			await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.default_storage.tz`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria SmartPy plugin will display proper message if user tries to compile contract that does not exist', async () => {
		try {
			// 1. Run taq compile ${contractName} for contract that does not exist
			const { stdout } = await exec(`taq compile test.py`, { cwd: `./${taqueriaProjectPath}` });

			// 2. Verify that output includes next messages:
			expect(stdout).toContain('Not compiled');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria SmartPy plugin can run SmartPy test using taq test <sourceFile> command', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);

			// 2. Run taq test ${testFileName}
			const { stdout } = await exec(`taq test hello-tacos.py`, { cwd: `./${taqueriaProjectPath}` });
			expect(stdout).toContain('All tests passed');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria SmartPy plugin will output proper error message running taq test <sourceFile> command against invalid test file', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos-failed-tests.py ${taqueriaProjectPath}/contracts`);

			// 2. Run taq test ${testFileName}
			const { stdout } = await exec(`taq test hello-tacos-failed-tests.py`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			expect(stdout).toContain('Some tests failed');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
