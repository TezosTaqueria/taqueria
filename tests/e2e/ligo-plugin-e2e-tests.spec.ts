import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import fs from 'fs';
import os from 'os';
import { join } from 'path';

describe('Ligo Plugin E2E Testing for Taqueria CLI', () => {
	describe('tasks that rarely change', () => {
		test('will use ligo binary from $PATH if available', async function() {
			let testLigoDir = fs.realpathSync(os.tmpdir());
			let testLigoPath = join(testLigoDir, 'ligo');
			fs.writeFileSync(testLigoPath, '#!/bin/sh\necho Hello from test ligo');
			fs.chmodSync(testLigoPath, '755');
			let cwd = process.cwd();
			const { execute, spawn, cleanup } = await prepareEnvironment();
			process.env.PATH = `${testLigoDir}:${process.env.PATH}`;
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");
			const { stdout: stdout1, stderr: stderr1 } = await execute(
				'taq',
				`install ../taqueria-plugin-ligo`,
				'./test-project',
			);
			expect(stdout1).toEqual(
				expect.arrayContaining(['Plugin installed successfully']),
			);
			const { stdout: stdout2 } = await execute(
				'env',
				`PATH=${process.env.PATH} taq ligo --command help`,
				'./test-project',
			);
			expect(stdout2).toEqual(expect.arrayContaining(['Hello from test ligo']));
			await cleanup();
		});

		test('ligo plugin help will show help', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const { stdout: stdout2 } = await execute(
				'taq',
				'--help',
				'./test-project',
			);
			expect(stdout2).toEqual(expect.arrayContaining(['taq <command>']));

			await cleanup();
		});

		test('compile will show contextual help', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");
			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const { stdout: stdout2 } = await execute(
				'taq',
				'compile --help',
				'./test-project',
			);
			expect(stdout2).toEqual(
				expect.arrayContaining([
					'Compile a smart contract written in a LIGO syntax to Michelson code, along with',
				]),
			);

			await cleanup();
		});

		test('compile will error if missing <contract> parameter', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const { stderr: compileErr } = await execute(
				'taq',
				'compile',
				'./test-project',
			);
			expect(compileErr).toEqual(
				expect.arrayContaining([
					'Not enough non-option arguments: got 0, need at least 1',
				]),
			);

			await cleanup();
		});

		test('ligo postInstall script runs after installation', async () => {
			const { execute, cleanup, writeFile, ls, spawn, readFile, exists } = await prepareEnvironment();

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout, stderr } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');
			expect(stdout.join('\n')).toContain('LIGO collects anonymous usage data');

			const postInstallRan = await exists(
				'./test-project/.ligo/term_acceptance',
			);
			expect(postInstallRan).toEqual(true);
		});

		test('get-image returns the docker image for ligo', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const { stdout: imageOutput } = await execute(
				'taq',
				'get-image --plugin ligo',
				'./test-project',
			);
			expect(imageOutput).toEqual(
				expect.arrayContaining([expect.stringContaining('ligolang/ligo:')]),
			);

			await cleanup();
		});
	});

	describe('support for smart contracts which use @entry without a namespace/module', () => {
		test('compile should compile a contract that uses @entry and is not within a namespace/module', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				ls,
				path: projectDir,
			} = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (
				await exec(`cat e2e/data/ligo-data/entry.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/entry.jsligo', contract);

			// Write the parameter file for the contract
			const parameterFile = await (
				await exec(`cat e2e/data/ligo-data/entry.parameterList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/entry.parameterList.jsligo',
				parameterFile,
			);

			// Write the storage file for the contract
			const storageFile = await (
				await exec(`cat e2e/data/ligo-data/entry.storageList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/entry.storageList.jsligo',
				storageFile,
			);

			// Compile using the `compile` task
			const compileResult = await execute(
				'taq',
				'compile entry.jsligo',
				'./test-project',
			);
			// console.log(compileResult);
			expect(compileResult.stderr).toHaveLength(0);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌──────────────┬────────────────────────────────────────────────┐',
				'│ Source       │ Artifact                                       │',
				'├──────────────┼────────────────────────────────────────────────┤',
				'│ entry.jsligo │ artifacts/entry.tz                             │',
				'│              │ artifacts/entry.default_storage.tz             │',
				'│              │ artifacts/entry.parameter.default_parameter.tz │',
				'└──────────────┴────────────────────────────────────────────────┘',
				'Compiled 1 contract(s) in "entry.jsligo"',
			]);

			// Expect the artifacts to be created
			const artifacts_list = await ls('./test-project/artifacts');
			const expectedContracts = [
				'entry.tz',
				'entry.default_storage.tz',
				'entry.parameter.default_parameter.tz',
			];
			expect(artifacts_list).toHaveLength(expectedContracts.length);
			expectedContracts.map(contract => expect(artifacts_list).toContain(contract));

			// Cleanup
			await cleanup();
		});

		test('compile should create a missing parameterList file for a contract that uses @entry without a namespace/module', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				ls,
				readFile,
				path: projectDir,
			} = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (
				await exec(`cat e2e/data/ligo-data/entry.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/entry.jsligo', contract);

			// Write the storage file for the contract
			const storageFile = await (
				await exec(`cat e2e/data/ligo-data/entry.storageList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/entry.storageList.jsligo',
				storageFile,
			);

			// Compile using the `compile` task
			const compileResult = await execute(
				'taq',
				'compile entry.jsligo',
				'./test-project',
			);
			// console.log(compileResult);

			// Expect stderr to contain a warning about the missing parameter file
			expect(compileResult.stderr).toHaveLength(1);
			expect(compileResult.stderr[0]).toEqual(
				`Note: parameter file associated with "entry" can't be found, so "entry.parameterList.jsligo" has been created for you. Use this file to define all parameter values for this contract`,
			);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌──────────────┬────────────────────────────────────┐',
				'│ Source       │ Artifact                           │',
				'├──────────────┼────────────────────────────────────┤',
				'│ entry.jsligo │ artifacts/entry.tz                 │',
				'│              │ artifacts/entry.default_storage.tz │',
				'└──────────────┴────────────────────────────────────┘',
				'Compiled 1 contract(s) in "entry.jsligo"',
			]);

			// Expect the parameter file to be created
			const contractsList = await ls('./test-project/contracts');
			expect(contractsList).toContain('entry.parameterList.jsligo');

			// Expect the parameterList file to have the correct contents
			const parameterFile = await readFile(
				'./test-project/contracts/entry.parameterList.jsligo',
			);
			// console.log(parameterFile)
			const expectedParameterFile = await (
				await exec(`cat e2e/data/ligo-data/expected-entry.parameterList.jsligo`)
			).stdout;
			expect(parameterFile).toEqual(expectedParameterFile);

			// Cleanup
			await cleanup();
		});
	});

	describe('support for smart contracts which use @entry within a namespace/module', () => {
		test('compile should compile a contract that uses @entry and is within a namespace/module', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				ls,
				path: projectDir,
			} = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (
				await exec(`cat e2e/data/ligo-data/IncDec.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/IncDec.jsligo', contract);

			// Write the parameter file for the contract
			const parameterFile = await (
				await exec(`cat e2e/data/ligo-data/IncDec.parameterList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/IncDec.parameterList.jsligo',
				parameterFile,
			);

			// Write the storage file for the contract
			const storageFile = await (
				await exec(`cat e2e/data/ligo-data/IncDec.storageList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/IncDec.storageList.jsligo',
				storageFile,
			);

			// Compile using the `compile` task
			const compileResult = await execute(
				'taq',
				'compile IncDec.jsligo',
				'./test-project',
			);
			// console.log(compileResult);
			expect(compileResult.stderr).toHaveLength(0);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌──────────────────────┬─────────────────────────────────────────┐',
				'│ Source               │ Artifact                                │',
				'├──────────────────────┼─────────────────────────────────────────┤',
				'│ IncDec.jsligo/IncDec │ artifacts/IncDec.tz                     │',
				'│                      │ artifacts/IncDec.default_storage.tz     │',
				'│                      │ artifacts/IncDec.parameter.increment.tz │',
				'│                      │ artifacts/IncDec.parameter.decrement.tz │',
				'└──────────────────────┴─────────────────────────────────────────┘',
				'Compiled 1 contract(s) in "IncDec.jsligo"',
			]);

			// Expect the artifacts to be created
			const artifacts_list = await ls('./test-project/artifacts');
			const expectedContracts = [
				'IncDec.tz',
				'IncDec.default_storage.tz',
				'IncDec.parameter.increment.tz',
				'IncDec.parameter.decrement.tz',
			];
			expect(artifacts_list).toHaveLength(expectedContracts.length);
			expectedContracts.map(contract => expect(artifacts_list).toContain(contract));

			// Cleanup
			await cleanup();
		});

		test('compile should create a missing parameterList file for a contract that uses @entry within a namespace/module', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				ls,
				readFile,
				path: projectDir,
			} = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (
				await exec(`cat e2e/data/ligo-data/IncDec.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/IncDec.jsligo', contract);

			// Write the storage file for the contract
			const storageFile = await (
				await exec(`cat e2e/data/ligo-data/IncDec.storageList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/IncDec.storageList.jsligo',
				storageFile,
			);

			// Compile using the `compile` task
			const compileResult = await execute(
				'taq',
				'compile IncDec.jsligo',
				'./test-project',
			);
			// console.log(compileResult);

			// Expect stderr to contain a warning about the missing parameter file
			expect(compileResult.stderr).toHaveLength(1);
			expect(compileResult.stderr[0]).toEqual(
				`Note: parameter file associated with "IncDec" can't be found, so "IncDec.parameterList.jsligo" has been created for you. Use this file to define all parameter values for this contract`,
			);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌──────────────────────┬─────────────────────────────────────┐',
				'│ Source               │ Artifact                            │',
				'├──────────────────────┼─────────────────────────────────────┤',
				'│ IncDec.jsligo/IncDec │ artifacts/IncDec.tz                 │',
				'│                      │ artifacts/IncDec.default_storage.tz │',
				'└──────────────────────┴─────────────────────────────────────┘',
				'Compiled 1 contract(s) in "IncDec.jsligo"',
			]);

			// Expect the parameter file to be created
			const contractsList = await ls('./test-project/contracts');
			expect(contractsList).toContain('IncDec.parameterList.jsligo');

			// Expect the parameterList file to have the correct contents
			const parameterFile = await readFile(
				'./test-project/contracts/IncDec.parameterList.jsligo',
			);
			const expectedParameterFile = await exec(
				'cat e2e/data/ligo-data/expected-IncDec.parameterList.jsligo',
			);
			expect(parameterFile).toEqual(expectedParameterFile.stdout);

			// Cleanup
			await cleanup();
		});
	});

	describe('other compilation tasks', () => {
		test('compile will compile only the specified module in the given source file when multiple modules exist', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				ls,
				path: projectDir,
			} = await prepareEnvironment();
			// console.log(projectDir);

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (
				await exec(`cat e2e/data/ligo-data/MultipleContracts.mligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/MultipleContracts.mligo',
				contract,
			);

			// Compile using the `compile` task
			const compileResult = await execute(
				'taq',
				'compile MultipleContracts.mligo -m HelloWorld',
				'./test-project',
			);
			// console.log(compileResult);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌────────────────────────────────────┬─────────────────────────┐',
				'│ Source                             │ Artifact                │',
				'├────────────────────────────────────┼─────────────────────────┤',
				'│ MultipleContracts.mligo/HelloWorld │ artifacts/HelloWorld.tz │',
				'└────────────────────────────────────┴─────────────────────────┘',
				'Compiled 1 contract(s) in "MultipleContracts.mligo"',
			]);

			// Expect no errors
			expect(compileResult.stderr).toEqual([
				`Note: storage file associated with "HelloWorld" can't be found, so "HelloWorld.storageList.mligo" has been created for you. Use this file to define all initial storage values for this contract`,
				`Note: parameter file associated with "HelloWorld" can't be found, so "HelloWorld.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract`,
			]);

			// Cleanup
			await cleanup();
		});

		test('compile to json-encoded michelson', async () => {
			const { execute, cleanup, writeFile, readFile, ls, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const jsligo_file = await (
				await exec(`cat e2e/data/ligo-data/IncDec.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/IncDec.jsligo', jsligo_file);

			await execute('taq', 'compile IncDec.jsligo --json', './test-project');
			const artifacts_list = await ls('./test-project/artifacts');
			expect(artifacts_list).toContain('IncDec.json');
			const json_file = await readFile('./test-project/artifacts/IncDec.json');
			expect(json_file).toContain(
				'[{"prim":"parameter","args":[{"prim":"or","args":[{"prim":"unit","annots":["%reset"]},{"prim":"or","args":[{"prim":"int","annots":["%decrement"]},{"prim":"int","annots":["%increment"]}]}]}]},{"prim":"storage","args":[{"prim":"int"}]},{"prim":"code","args":[[{"prim":"UNPAIR"},{"prim":"IF_LEFT","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"int"},{"int":"0"}]}],[{"prim":"IF_LEFT","args":[[{"prim":"SWAP"},{"prim":"SUB"}],[{"prim":"ADD"}]]}]]},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"}]]}]',
			);

			await cleanup();
		});

		test('compile will only compile one contract using compile <sourceFile> command when multiple contracts exist', async () => {
			const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const artifacts_list_before = await ls('./test-project/artifacts');
			expect(artifacts_list_before).toEqual([]);

			const mligo_file = await (
				await exec(`cat e2e/data/ligo-data/IncDec.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/IncDec.jsligo', mligo_file);

			const jsligo_file = await (
				await exec(`cat e2e/data/ligo-data/entry.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/entry.jsligo', jsligo_file);

			await execute('taq', 'compile IncDec.jsligo', './test-project');
			const artifacts_list = await ls('./test-project/artifacts');
			expect(artifacts_list).toContain('IncDec.tz');

			await cleanup();
		});

		test('compile will error if the named contract does not exist', async () => {
			const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const compileResult = await execute(
				'taq',
				'compile does_not_exist.mligo',
				'./test-project',
			);
			// console.log(compileResult)
			expect(compileResult.stdout.join('\n')).toContain(
				'│ does_not_exist.mligo │ No contract modules found in "does_not_exist.mligo"',
			);
			expect(compileResult.stderr.join()).toContain(
				'The file does_not_exist.mligo was not found. Please ensure that the file exists and that it is in the contracts directory.',
			);

			await cleanup();
		});
	});

	describe('ligo test framework', () => {
		test('test will run ligo test', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				path: projectDir,
			} = await prepareEnvironment();
			// console.log(projectDir)

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const mligo_file = await (
				await exec('cat e2e/data/ligo-data/hello-tacos.mligo')
			).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
			const test_file = await (
				await exec('cat e2e/data/ligo-data/hello-tacos-tests.mligo')
			).stdout;
			await writeFile(
				'./test-project/contracts/hello-tacos-tests.mligo',
				test_file,
			);

			const testResult = await execute(
				'taq',
				'test hello-tacos-tests.mligo',
				'./test-project',
			);

			expect(testResult.stdout).toEqual([
				'┌─────────────────────────┬──────────────────────────────────────────────┐',
				'│ Contract                │ Test Results                                 │',
				'├─────────────────────────┼──────────────────────────────────────────────┤',
				'│ hello-tacos-tests.mligo │ Everything at the top-level was executed.    │',
				'│                         │ - test_available_tacos exited with value (). │',
				'│                         │ - test_buy_tacos exited with value ().       │',
				'│                         │                                              │',
				'│                         │ 🎉 All tests passed 🎉                       │',
				'└─────────────────────────┴──────────────────────────────────────────────┘',
			]);

			expect(testResult.stderr).toEqual([]);

			await cleanup();
		});

		test('test will error if test file is invalid', async () => {
			const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const mligo_file = await (
				await exec('cat e2e/data/ligo-data/hello-tacos.mligo')
			).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
			const invalid_test_file = await (
				await exec('cat e2e/data/ligo-data/hello-tacos-invalid-tests.mligo')
			).stdout;
			await writeFile(
				'./test-project/contracts/hello-tacos-invalid-tests.mligo',
				invalid_test_file,
			);

			const { stdout: testOutput, stderr: testErr } = await execute(
				'taq',
				'test hello-tacos-invalid-tests.mligo',
				'./test-project',
			);
			expect(testOutput).toEqual(
				expect.arrayContaining([
					'│ hello-tacos-invalid-tests.mligo │ Some tests failed :( │',
				]),
			);
			expect(testErr.join()).toContain(
				'Error messages for hello-tacos-invalid-tests.mligo',
			);

			await cleanup();
		});

		test('test will error if named file does not exist', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			const { stderr: testErr } = await execute(
				'taq',
				'test hello-tacos-test.mligo',
				'./test-project',
			);
			expect(testErr.toString()).toContain(
				'contracts/hello-tacos-test.mligo: No such file or directory.',
			);

			await cleanup();
		});
	});

	test('LIGO contract template will be instantiated with the right content', async () => {
		const { execute, cleanup, spawn, readFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute(
			'taq',
			'install ../taqueria-plugin-ligo',
			'./test-project',
		);
		expect(stdout).toContain('Plugin installed successfully');

		await execute('taq', 'create contract counter.mligo', './test-project');
		expect(await ls('./test-project/contracts')).toContain('counter.mligo');

		const bytes = await readFile(
			path.join('./test-project', 'contracts', 'counter.mligo'),
		);
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');
		expect(hash).toEqual(
			'e1ceba3bc28cb7a86f07eef36ea9baa835af4b58901b5b0d3e07730054400f55',
		);
		await cleanup();
	});

	test('ligo compile will error with missing storage file', async () => {
		const {
			execute,
			cleanup,
			writeFile,
			exists,
			ls,
			path: projectDir,
		} = await prepareEnvironment();
		// console.log(projectDir)

		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');

		const mligo_file = await (
			await exec(`cat e2e/data/ligo-data/hello-tacos.mligo`)
		).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const parameters_file = await (
			await exec(`cat e2e/data/ligo-data/hello-tacos.parameters.mligo`)
		).stdout;
		await writeFile(
			'./test-project/contracts/hello-tacos.parameters.mligo',
			parameters_file,
		);

		expect(await ls('./test-project/contracts')).toEqual(
			expect.arrayContaining([
				'hello-tacos.mligo',
				'hello-tacos.parameters.mligo',
			]),
		);

		const { stderr, stdout } = await execute(
			'taq',
			'compile counter.mligo',
			'./test-project',
		);

		expect(stderr).toEqual(
			expect.arrayContaining([
				expect.stringContaining('=== Error messages for counter.mligo ==='),
			]),
		);

		await cleanup();
	});

	describe('ligo package registry', () => {
		test('ligo can create template (contract from the package registry) and the user owns the file', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			const result = await execute(
				'taq',
				"ligo --command 'init contract --template shifumi-jsligo shifumiTemplate'",
				'./test-project',
			);
			await exists('./test-project/shifumiTemplate');
			const { stdout } = await execute('ls', '-l', './test-project');
			const output = stdout.join('\n');
			expect(output).toContain(process.env.USER);
			expect(output).not.toContain('root');
			await cleanup();
		});

		// See https://github.com/tezostaqueria/taqueria/issues/1870
		test('ligo task with install command does not result in an error', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			const result = await execute(
				'taq',
				'ligo --command "install"',
				'./test-project',
			);
			expect(result.stderr.join('').trim()).not.toContain('error');
			await cleanup();
		});
	});

	describe('long running tests', () => {
		jest.setTimeout(100000);

		test('compile-all will find and compile all contracts', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				ls,
				path: projectDir,
			} = await prepareEnvironment();

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);
			expect(stdout).toContain('Plugin installed successfully');

			// List of test files to copy to test project
			const testFiles = await exec('ls e2e/data/ligo-data').then(res =>
				res.stdout
					.split('\n')
					.filter(
						file => file !== 'hello-tacos-invalid-tests.mligo' && file.length > 0,
					)
			);

			// Copy the test files to the test project
			await Promise.all(
				testFiles.map(async file => {
					const fileContents = (await exec(`cat e2e/data/ligo-data/${file}`))
						.stdout;
					return await writeFile(
						`./test-project/contracts/${file}`,
						fileContents,
					);
				}),
			);

			// Expect files to exist in test project
			const contractsList = await ls('./test-project/contracts');
			console.log(contractsList);
			testFiles.map(file => expect(contractsList).toContain(file));

			// Compile the contracts using the `compile-all` task
			const compileResult = await execute(
				'taq',
				'compile-all',
				'./test-project',
			);
			console.log(compileResult);

			// Check that the output contains the expected files
			expect(compileResult.stdout).toEqual([
				'┌────────────────────────────────────┬───────────────────────────────────────────────────┐',
				'│ Source                             │ Artifact                                          │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ IncDec.jsligo/IncDec               │ artifacts/IncDec.tz                               │',
				'│                                    │ artifacts/IncDec.default_storage.tz               │',
				'│                                    │ artifacts/IncDec.parameter.increment.tz           │',
				'│                                    │ artifacts/IncDec.parameter.decrement.tz           │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ MultipleContracts.mligo/HelloWorld │ artifacts/HelloWorld.tz                           │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ MultipleContracts.mligo/Increment  │ artifacts/Increment.tz                            │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ entry-module.mligo/C               │ artifacts/C.tz                                    │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ entry.jsligo                       │ artifacts/entry.tz                                │',
				'│                                    │ artifacts/entry.default_storage.tz                │',
				'│                                    │ artifacts/entry.parameter.default_parameter.tz    │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ hello-tacos.mligo                  │ artifacts/hello-tacos.tz                          │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ hello-tacos.mligo                  │ artifacts/hello-tacos.tz                          │',
				'├────────────────────────────────────┼───────────────────────────────────────────────────┤',
				'│ pokeGame.jsligo                    │ artifacts/pokeGame.tz                             │',
				'│                                    │ artifacts/pokeGame.default_storage.tz             │',
				'│                                    │ artifacts/pokeGame.parameter.default_parameter.tz │',
				'└────────────────────────────────────┴───────────────────────────────────────────────────┘',
			]);

			const expectedStdErr = [
				'Note: storage file associated with "HelloWorld" can\'t be found, so "HelloWorld.storageList.mligo" has been created for you. Use this file to define all initial storage values for this contract',
				'Note: parameter file associated with "HelloWorld" can\'t be found, so "HelloWorld.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract',
				'Note: storage file associated with "Increment" can\'t be found, so "Increment.storageList.mligo" has been created for you. Use this file to define all initial storage values for this contract',
				'Note: parameter file associated with "Increment" can\'t be found, so "Increment.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract',
				'Note: storage file associated with "C" can\'t be found, so "C.storageList.mligo" has been created for you. Use this file to define all initial storage values for this contract',
				'Note: parameter file associated with "C" can\'t be found, so "C.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract',
				'Note: storage file associated with "hello-tacos" can\'t be found, so "hello-tacos.storageList.mligo" has been created for you. Use this file to define all initial storage values for this contract',
				'Note: storage file associated with "hello-tacos" can\'t be found, so "hello-tacos.storageList.mligo" has been created for you. Use this file to define all initial storage values for this contract',
				'Note: parameter file associated with "hello-tacos" can\'t be found, so "hello-tacos.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract',
				'Note: parameter file associated with "hello-tacos" can\'t be found, so "hello-tacos.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract',
			];

			expectedStdErr.map(err => expect(compileResult.stderr).toContain(err));
			// expect(compileResult.stderr).toHaveLength(expectedStdErr.length);

			await cleanup();
		});
	});

	describe('regression tests', () => {
		// See https://github.com/tezostaqueria/taqueria/issues/1859
		// See https://github.com/tezostaqueria/taqueria/issues/1867
		test('regression against #1859, ligo compile-all will not create infinite storage files', async () => {
			const {
				execute,
				cleanup,
				writeFile,
				path: projectDir,
			} = await prepareEnvironment();

			// console.log(projectDir)

			// set up the project
			await execute('taq', 'init test-project');
			await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');

			// copy jsligo files to contracts folder
			const jligo_file = await (
				await exec(`cat e2e/data/ligo-data/pokeGame.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
			const storage_file = await (
				await exec(`cat e2e/data/ligo-data/pokeGame.storageList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/pokeGame.storageList.jsligo',
				storage_file,
			);
			const parameters_file = await (
				await exec(`cat e2e/data/ligo-data/pokeGame.parameterList.jsligo`)
			).stdout;
			await writeFile(
				'./test-project/contracts/pokeGame.parameterList.jsligo',
				parameters_file,
			);

			// compile the contract using compile-all task
			const { stdout } = await execute('taq', 'compile-all', './test-project');
			expect(stdout).toEqual([
				'┌─────────────────┬───────────────────────────────────────────────────┐',
				'│ Source          │ Artifact                                          │',
				'├─────────────────┼───────────────────────────────────────────────────┤',
				'│ pokeGame.jsligo │ artifacts/pokeGame.tz                             │',
				'│                 │ artifacts/pokeGame.default_storage.tz             │',
				'│                 │ artifacts/pokeGame.parameter.default_parameter.tz │',
				'└─────────────────┴───────────────────────────────────────────────────┘',
			]);

			// Cleanup
			await cleanup();
		});

		// https://github.com/tezostaqueria/taqueria/issues/1907
		test('regression against #1907, compile task will NOT compile storage/parameter expressions for variables which were commented out', async () => {
			const {
				execute,
				cleanup,
				spawn,
				writeFile,
				ls,
				path: projectDir,
			} = await prepareEnvironment();

			// console.log(projectDir);

			// set up the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute(
				'taq',
				'install ../taqueria-plugin-ligo',
				'./test-project',
			);

			// copy jsligo files to contracts folder
			const jligo_file = await (
				await exec(`cat e2e/data/ligo-data/pokeGame.jsligo`)
			).stdout;
			await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
			const storage_file = await (
				await exec(
					`cat e2e/data/ligo-data/pokeGame.storageList-with-comments.jsligo`,
				)
			).stdout;
			await writeFile(
				'./test-project/contracts/pokeGame.storageList.jsligo',
				storage_file,
			);
			const parameters_file = await (
				await exec(
					`cat e2e/data/ligo-data/pokeGame.parameterList-with-comments.jsligo`,
				)
			).stdout;
			await writeFile(
				'./test-project/contracts/pokeGame.parameterList.jsligo',
				parameters_file,
			);

			// compile the contract using compile task
			const results = await execute(
				'taq',
				'compile pokeGame.jsligo',
				'./test-project',
			);
			expect(results.stdout).toEqual([
				'┌─────────────────┬───────────────────────────────────────────┐',
				'│ Source          │ Artifact                                  │',
				'├─────────────────┼───────────────────────────────────────────┤',
				'│ pokeGame.jsligo │ artifacts/pokeGame.tz                     │',
				'│                 │ artifacts/pokeGame.default_storage.tz     │',
				'│                 │ artifacts/pokeGame.parameter.parameter.tz │',
				'└─────────────────┴───────────────────────────────────────────┘',
				'Compiled 1 contract(s) in "pokeGame.jsligo"',
			]);

			// assure that no storage/parameter files were created
			const artifacts_list = await ls('./test-project/artifacts');
			expect(artifacts_list).toEqual([
				'pokeGame.default_storage.tz',
				'pokeGame.parameter.parameter.tz',
				'pokeGame.tz',
			]);

			// Cleanup
			await cleanup();
		});
	});
});
