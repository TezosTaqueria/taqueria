import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import path from 'path';
import utils from 'util';
import { checkFolderExistsWithTimeout, generateTestProject } from './utils/utils';
const exec = utils.promisify(exec1);
import * as contents from './data/help-contents/archetype-contents';

const taqueriaProjectPath = 'e2e/auto-test-archetype-plugin';

describe('E2E Testing for taqueria archetype plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['archetype']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}
	});

	test('Verify that the archetype plugin exposes the associated commands in the help menu', async () => {
		try {
			const archetypeHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(archetypeHelpContents.stdout).toBe(contents.helpContentsArchetypePlugin);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the archetype plugin exposes the associated options in the help menu', async () => {
		try {
			const archetypeHelpContents = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(archetypeHelpContents.stdout).toBe(contents.helpContentsArchetypePluginSpecific);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the archetype plugin aliases expose the correct info in the help menu', async () => {
		try {
			const archetypeAliasCHelpContents = await exec(`taq c --help --projectDir=${taqueriaProjectPath}`);
			expect(archetypeAliasCHelpContents.stdout).toBe(contents.helpContentsArchetypePluginSpecific);

			const archetypeAliasCompileArchetypeHelpContents = await exec(
				`taq compile-archetype --help --projectDir=${taqueriaProjectPath}`,
			);
			expect(archetypeAliasCompileArchetypeHelpContents.stdout).toBe(contents.helpContentsArchetypePluginSpecific);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria archetype plugin outputs no contracts found if no contracts exist', async () => {
		try {
			const noContracts = await exec(`taq compile`, { cwd: `./${taqueriaProjectPath}` });

			expect(noContracts.stdout).toEqual(contents.archetypeNoContracts);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria archetype plugin can compile one contract under contracts folder', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);

			// 2. Register the contract
			await exec(`taq add-contract fa12.arl`, { cwd: `./${taqueriaProjectPath}` });

			// 3. Run taq compile ${contractName}
			await exec(`taq compile`, { cwd: `./${taqueriaProjectPath}` });

			// 4. Verify that compiled michelson version has been generated
			await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/fa12.tz`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria archetype plugin can compile one contract using compile [sourceFile] command', async () => {
		try {
			// 1. Copy contract from data folder to taqueria project folder
			await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);

			// 2. Register the contract
			// await exec(`taq add-contract fa12.arl`, { cwd: `./${taqueriaProjectPath}` });

			// 3. Run taq compile ${contractName}
			await exec(`taq compile fa12.arl`, { cwd: `./${taqueriaProjectPath}` });

			// 4. Verify that compiled michelson version has been generated
			await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/fa12.tz`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria archetype plugin can compile multiple contracts under contracts folder', async () => {
		try {
			// 1. Copy two contracts from data folder to /contracts folder under taqueria project
			await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);
			await exec(`cp e2e/data/animal_tracking.arl ${taqueriaProjectPath}/contracts`);

			// 2. Register the contracts
			// await exec(`taq add-contract fa12.arl`, { cwd: `./${taqueriaProjectPath}` });
			await exec(`taq add-contract animal_tracking.arl`, { cwd: `./${taqueriaProjectPath}` });

			// 3. Run taq compile ${contractName}
			await exec(`taq compile`, { cwd: `./${taqueriaProjectPath}` });

			// 4. Verify that compiled michelson version for both contracts has been generated
			await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/fa12.tz`);
			await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/animal_tracking.tz`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// TODO: Currently it cannot be done until the output will be places to stdout
	// Issue to implement the test: https://github.com/ecadlabs/taqueria/issues/373
	// Related developer issue: https://github.com/ecadlabs/taqueria/issues/372
	test('Verify that taqueria archetype plugin will display proper message if user tries to compile contract that does not exist', async () => {
		try {
			// 1. Run taq compile ${contractName} for contract that does not exist
			const compileOutput = await exec(`taq compile test.arl`, { cwd: `./${taqueriaProjectPath}` });

			// 2. Verify that output includes next messages:
			// There was a compilation error.
			// contracts/test.mligo: No such file or directory
			expect(compileOutput.stdout).toContain(contents.archetypeNotCompiled);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria archetype plugin requires the plugin argument when other compile plugins installed', async () => {
		// 1. Copy contract from data folder to taqueria project folder
		await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);

		await exec('taq install ../../../taqueria-plugin-ligo', { cwd: `./${taqueriaProjectPath}` });

		// 2. Run taq compile ${contractName}
		await exec(`taq compile fa12.arl --plugin @taqueria/plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });

		// 3. Verify that compiled michelson version has been generated
		await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/fa12.tz`);
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
