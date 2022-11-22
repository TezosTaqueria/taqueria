import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import fsPromises from 'fs/promises';
import path from 'path';
import util from 'util';
import * as contents from './data/help-contents/ligo-contents';
import { checkFolderExistsWithTimeout, generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-multi-test-plugins';

describe('E2E Testing for taqueria ligo plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo', 'jest']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}
	});

	test('Verify that --plugin required to', async () => {
		try {
			// 1. Copy contract and tests files from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);
			await exec(`cp e2e/data/hello-tacos-tests.mligo ${taqueriaProjectPath}/contracts`);

			// 2. Run taq test ${testFileName}
			await exec(`taq test hello-tacos-tests.mligo`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			expect(String(error)).toContain('Missing required argument: plugin');
		}
	});

	test('Verify that taqueria ligo plugin can run ligo test using taq test <sourceFile> command adding --plugin ligo to the command', async () => {
		try {
			// 2. Run taq test ${testFileName} with --plugin parameter
			const { stdout, stderr } = await exec(`taq test hello-tacos-tests.mligo --plugin ligo`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			expect(stdout).toContain('All tests passed');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Remove all files from artifacts folder without removing folder itself
	afterEach(async () => {
		try {
			const files = await fsPromises.readdir(`${taqueriaProjectPath}/artifacts/`);
			for (const file of files) {
				await fsPromises.rm(path.join(`${taqueriaProjectPath}/artifacts/`, file));
			}
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
