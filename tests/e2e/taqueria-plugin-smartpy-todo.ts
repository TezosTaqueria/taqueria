import { exec as exec1, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';
import * as contents from './data/smartpy-contents';
import { checkFolderExistsWithTimeout, generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-smartpy-plugin';

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
	afterEach(() => {
		try {
			const files = fs.readdirSync(`${taqueriaProjectPath}/artifacts/`);
			for (const file of files) {
				fs.rmSync(path.join(`${taqueriaProjectPath}/artifacts/`, file), { recursive: true });
			}
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(() => {
		try {
			fs.rmSync(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Putting these tests here so they can be part of the smartpy suite when it gets looked at for Milestone 3
	test('Verify that the smartpy plugin exposes the associated commands in the help menu', async () => {
		try {
			const smartpyHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(smartpyHelpContents.stdout).toBe(contents.helpContentsSmartpyPlugin);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the smartpy plugin exposes the associated options in the help menu', async () => {
		try {
			const smartpyHelpContents = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(smartpyHelpContents.stdout).toBe(contents.helpContentsSmartpyPluginSpecific);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the smartpy plugin aliases expose the correct info in the help menu', async () => {
		try {
			const smartpyAliasCHelpContents = await exec(`taq c --help --projectDir=${taqueriaProjectPath}`);
			expect(smartpyAliasCHelpContents.stdout).toBe(contents.helpContentsSmartpyPluginSpecific);

			const smartpyAliasCompileLigoHelpContents = await exec(
				`taq compile-smartpy --help --projectDir=${taqueriaProjectPath}`,
			);
			expect(smartpyAliasCompileLigoHelpContents.stdout).toBe(contents.helpContentsSmartpyPluginSpecific);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria smartpy plugin can compile one contract under contracts folder', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			execSync(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);

			// 2. Run taq compile ${contractName}
			const output = execSync(`taq compile`, { cwd: `./${taqueriaProjectPath}` }).toString();
			execSync(`rm ${taqueriaProjectPath}/contracts/hello-tacos.py`);

			// 3. Check output
			expect(output).toBe(contents.smartPyCompiledOutput);

			// 4. Verify that compiled michelson version has been generated
			await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/HelloTacos_comp`, 25000);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria smartpy plugin handles no contracts correctly', async () => {
		try {
			// 1. Run taq compile ${contractName}
			const { stdout, stderr } = await exec(`taq compile`, { cwd: `./${taqueriaProjectPath}` });

			expect(stderr).toBe(contents.smartPyNothingCompiled);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
