import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import fsPromises from 'fs/promises';
import path from 'path';
import util from 'util';
import * as contents from './data/help-contents/ligo-contents';
import { checkFolderExistsWithTimeout, generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { helpContentsFlextesaPluginStopSandbox } from './data/help-contents/flextesa-contents';
const taqueriaProjectPath = 'scrap/auto-test-ligo-plugin';

describe('E2E Testing for taqueria ligo plugin', () => {
	test('Verify that the ligo plugin exposes the associated commands in the help menu', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(code).toBe(0);
		const { stdout } = await execute('taq', '--help --projectDir=./test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Commands:']));
		await cleanup();
	});

	test('Verify that the ligo plugin exposes the associated options in the help menu', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(code).toBe(0);
		const { stdout } = await execute('taq', 'compile --help --projectDir=./test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Commands:']));
		await cleanup();
	});

	test.skip('Verify that the ligo plugin aliases expose the correct info in the help menu', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(code).toBe(0);
		const { stdout } = await execute('taq', 'c --help --projectDir=./test-project', './test-project');
		expect(stdout).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code']),
		);
		const { stdout: stdout2 } = await execute(
			'taq',
			'compile-ligo --help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code']),
		);
		await cleanup();
	});

	test.skip('Verify that taqueria ligo plugin outputs no contracts message if no contracts exist', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(code).toBe(0);
		const { stdout } = await execute('taq', 'compile', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Not enough non-option arguments: got 0, need at least 1']));
		await cleanup();
	});

	test('Verify that the taqueria ligo plugin throws an error message if a contract name is not specified', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(code).toBe(0);
		const mligo_file = await (await exec(`cat e2e/data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const { stdout } = await execute('taq', 'add-contract hello-tacos.mligo', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['│ Name              │ Source File       │ Last Known Hash │']));
		const { stdout: stdout2 } = await execute('taq', 'taq compile', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining(["No contracts found to compile. Have you run 'taq add-contract [sourceFile]'"]),
		);
		await cleanup();
	});

	test('Verify that taqueria ligo plugin can compile one contract using compile <sourceFile> command', async () => {
		// try {
		// 	// 1. Copy contract from data folder to taqueria project folder
		// 	await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);

		// 	// 2. Register the contracts
		// 	// await exec(`taq add-contract hello-tacos.mligo`, { cwd: `./${taqueriaProjectPath}` });

		// 	// 2. Run taq compile ${contractName}
		// 	await exec(`taq compile hello-tacos.mligo`, { cwd: `./${taqueriaProjectPath}` });

		// 	// 3. Verify that compiled michelson version has been generated
		// 	await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
		// } catch (error) {
		// 	throw new Error(`error: ${error}`);
		// }

		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(code).toBe(0);
		const mligo_file = await (await exec(`cat e2e/data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const {} = await execute('taq', 'taq compile hello-tacos.mligo', './test-project');
		const artifacts_list = await ls('./test-project/artifacts');
		expect(artifacts_list).toContain('hello-tacos.tz');
		await cleanup();
	});

	test.skip('Verify that taqueria ligo plugin will display proper message if user tries to compile contract that does not exist', async () => {
		try {
			// 1. Run taq compile ${contractName} for contract that does not exist
			const { stdout, stderr } = await exec(`taq compile test.mligo`, { cwd: `./${taqueriaProjectPath}` });

			// 2. Verify that output includes next messages:
			// There was a compilation error.
			// contracts/test.mligo: No such file or directory
			expect(stdout).toBe(contents.compileNonExistent);
			expect(stderr).toContain('contracts/test.mligo: No such file or directory');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('Verify that taqueria ligo plugin emits error and yet displays table if contract is invalid', async () => {
		try {
			await exec(`cp e2e/data/invalid-contract.mligo ${taqueriaProjectPath}/contracts`);
			await exec(`taq add-contract invalid-contract.mligo`, { cwd: `./${taqueriaProjectPath}` });

			const { stdout, stderr } = await exec(`taq compile invalid-contract.mligo`, { cwd: `./${taqueriaProjectPath}` });

			expect(stdout).toBe(contents.compileInvalid);
			expect(stderr).toContain('File "contracts/invalid-contract.mligo", line 1, characters 23-27');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('Verify that taqueria ligo plugin can run ligo test using taq test <sourceFile> command', async () => {
		try {
			// 1. Copy contract  and tests files from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos-tests.mligo ${taqueriaProjectPath}/contracts`);

			// 2. Run taq test ${testFileName}
			const { stdout, stderr } = await exec(`taq test hello-tacos-tests.mligo`, { cwd: `./${taqueriaProjectPath}` });
			expect(stdout).toContain('All tests passed');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('Verify that taqueria ligo plugin will output proper error message running taq test <sourceFile> command against invalid test file', async () => {
		try {
			// 1. Copy contract  and tests files from data folder to taqueria project folder
			await exec(`cp e2e/data/hello-tacos-invalid-tests.mligo ${taqueriaProjectPath}/contracts`);

			// 2. Run taq test ${testFileName}
			// const output =   await exec(`taq test hello-tacos-invalid-tests.mligo`, { cwd: `./${taqueriaProjectPath}` });
			const { stdout, stderr } = await exec(`taq test hello-tacos-invalid-tests.mligo`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			expect(stdout).toContain('Some tests failed :(');
			expect(stderr).toContain('Variable "initial_storage" not found.');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('Verify that taqueria ligo plugin will output proper error message running taq test <sourceFile> command against non-existing file', async () => {
		try {
			// 1. Run taq test ${testFileName} against file that does not exist
			const { stdout, stderr } = await exec(`taq test hello-tacos-test.mligo`, { cwd: `./${taqueriaProjectPath}` });
			expect(stderr).toContain('contracts/hello-tacos-test.mligo: No such file or directory');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('Verify that a different version of the LIGO image can be used', async () => {
		const imageName = 'ligolang/ligo:0.54.1';

		const result = await exec(`TAQ_LIGO_IMAGE=${imageName} taq get-image --plugin ligo`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(result.stdout.trim()).toBe(imageName);

		// 1. Copy contract from data folder to taqueria project folder
		const contractName = 'hello-custom-image.mligo';
		await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts/${contractName}`);

		// 2. Run taq compile ${contractName}
		await exec(`taq compile ${contractName}`, { cwd: `./${taqueriaProjectPath}` });

		// 3. Verify that compiled michelson version has been generated
		await checkFolderExistsWithTimeout(`./${taqueriaProjectPath}/artifacts/${contractName.replace('mligo', 'tz')}`);
	});

	test.skip('Verify that the LIGO contract template is instantiated with the right content and registered', async () => {
		try {
			await exec(`taq create contract counter.mligo`, { cwd: `./${taqueriaProjectPath}` });
			const artifactsContents = await exec(`ls ${taqueriaProjectPath}/contracts`);
			expect(artifactsContents.stdout).toContain('counter.mligo');

			const bytes = await fsPromises.readFile(path.join(taqueriaProjectPath, 'contracts', 'counter.mligo'));
			const digest = createHash('sha256');
			digest.update(bytes);
			const hash = digest.digest('hex');

			const configFile = path.join(taqueriaProjectPath, '.taq', 'config.json');
			const config = await fsPromises.readFile(configFile, { encoding: 'utf-8' });
			const json = JSON.parse(config);
			expect(json).toBeInstanceOf(Object);
			expect(json).toHaveProperty('contracts');
			return expect(json.contracts).toEqual({
				'counter.mligo': {
					'hash': '241556bb7f849d22564378991ce6c15ffd7fd5727620f207fb53e6dc538e66ef',
					'sourceFile': 'counter.mligo',
				},
				'hello-tacos.mligo': {
					'hash': '530f224fb713e4fb6d250f1c94fdc4a10a4cdde16fe02385071021637cc914e6',
					'sourceFile': 'hello-tacos.mligo',
				},
				'invalid-contract.mligo': {
					'hash': '2c7affa29be3adc8cb8b751a27a880165327e96cf8b446a9f73df323b1dceb0f',
					'sourceFile': 'invalid-contract.mligo',
				},
			});
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
