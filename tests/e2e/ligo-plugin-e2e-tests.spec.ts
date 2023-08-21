import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Ligo Plugin E2E Testing for Taqueria CLI', () => {
	describe('tasks that rarely change', () => {
		test('ligo plugin help will show help', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const { stdout: stdout2 } = await execute('taq', '--help', './test-project');
			expect(stdout2).toEqual(expect.arrayContaining(['taq <command>']));

			await cleanup();
		});

		test('compile will show contextual help', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const { stdout: stdout2 } = await execute('taq', 'compile --help', './test-project');
			expect(stdout2).toEqual(
				expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code, along with']),
			);

			await cleanup();
		});

		test('compile will error if missing <contract> parameter', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const { stderr: compileErr } = await execute('taq', 'compile', './test-project');
			expect(compileErr).toEqual(expect.arrayContaining(['Not enough non-option arguments: got 0, need at least 1']));

			await cleanup();
		});

		test('ligo postInstall script runs after installation', async () => {
			const { execute, cleanup, writeFile, ls, spawn, readFile, exists } = await prepareEnvironment();

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout, stderr } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');
			expect(stdout.join('\n')).toContain('LIGO collects anonymous usage data');

			const postInstallRan = await exists('./test-project/.ligo/term_acceptance');
			expect(postInstallRan).toEqual(true);
		});

		test('get-image returns the docker image for ligo', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const { stdout: imageOutput } = await execute('taq', 'get-image --plugin ligo', './test-project');
			expect(imageOutput).toEqual(expect.arrayContaining([expect.stringContaining('ligolang/ligo:')]));

			await cleanup();
		});
	});

	describe('support for smart contracts which use a main function but no namespace/module', () => {
		test('compile should compile a contract that uses a main function and is not a module', async () => {
			const { execute, cleanup, spawn, writeFile, ls, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/counter-main.mligo`)).stdout;
			await writeFile('./test-project/contracts/counter-main.mligo', contract);

			// Write the parameter file for the contract
			const parameterFile = await (await exec(`cat e2e/data/ligo-data/counter-main.parameterList.mligo`)).stdout;
			await writeFile('./test-project/contracts/counter-main.parameterList.mligo', parameterFile);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/counter-main.storageList.mligo`)).stdout;
			await writeFile('./test-project/contracts/counter-main.storageList.mligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile counter-main.mligo', './test-project');
			// console.log(compileResult);
			expect(compileResult.stderr).toHaveLength(0);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌────────────────────┬──────────────────────────────────────────────────────┐',
				'│ Source             │ Artifact                                             │',
				'├────────────────────┼──────────────────────────────────────────────────────┤',
				'│ counter-main.mligo │ artifacts/counter-main.tz                            │',
				'│                    │ artifacts/counter-main.default_storage.tz            │',
				'│                    │ artifacts/counter-main.storage.zero_storage.tz       │',
				'│                    │ artifacts/counter-main.parameter.increment_by_one.tz │',
				'│                    │ artifacts/counter-main.parameter.increment_by_two.tz │',
				'└────────────────────┴──────────────────────────────────────────────────────┘',
				'Compiled 1 contract(s) in "counter-main.mligo"',
			]);

			// Expect the artifacts to be created
			const artifacts_list = await ls('./test-project/artifacts');
			const expectedContracts = [
				'counter-main.tz',
				'counter-main.default_storage.tz',
				'counter-main.storage.zero_storage.tz',
				'counter-main.parameter.increment_by_one.tz',
				'counter-main.parameter.increment_by_two.tz',
			];
			expect(artifacts_list).toHaveLength(expectedContracts.length);
			expectedContracts.map(contract => expect(artifacts_list).toContain(contract));

			// Expect the counter-main.tz file to have the correct file owner
			const currentUser = (await exec('whoami')).stdout.trim();
			const fileOwnerResult = execute('ls', '-l ./test-project/artifacts/counter-main.tz', './test-project');
			expect((await fileOwnerResult).stdout.join('\n')).toContain(fileOwnerResult);

			// Cleanup
			await cleanup();
		});

		test('compile should create a missing parameterList file for a contract that uses a main function and is not a module', async () => {
			const { execute, cleanup, spawn, writeFile, ls, readFile, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/counter-main.mligo`)).stdout;
			await writeFile('./test-project/contracts/counter-main.mligo', contract);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/counter-main.storageList.mligo`)).stdout;
			await writeFile('./test-project/contracts/counter-main.storageList.mligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile counter-main.mligo', './test-project');
			// console.log(compileResult);

			// Expect stderr to contain a warning about the missing parameter file
			expect(compileResult.stderr).toHaveLength(1);
			expect(compileResult.stderr[0]).toEqual(
				`Note: parameter file associated with "counter-main" can't be found, so "counter-main.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract`,
			);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌────────────────────┬────────────────────────────────────────────────┐',
				'│ Source             │ Artifact                                       │',
				'├────────────────────┼────────────────────────────────────────────────┤',
				'│ counter-main.mligo │ artifacts/counter-main.tz                      │',
				'│                    │ artifacts/counter-main.default_storage.tz      │',
				'│                    │ artifacts/counter-main.storage.zero_storage.tz │',
				'└────────────────────┴────────────────────────────────────────────────┘',
				'Compiled 1 contract(s) in "counter-main.mligo"',
			]);

			// Expect the parameter file to be created
			const contractsList = await ls('./test-project/contracts');
			expect(contractsList).toContain('counter-main.parameterList.mligo');

			// Expect the parameterList file to have the correct contents
			const parameterFile = await readFile('./test-project/contracts/counter-main.parameterList.mligo');
			const expectedParameterFile =
				await (await exec(`cat e2e/data/ligo-data/expected-counter-main.parameterList.mligo`)).stdout;
			expect(parameterFile).toEqual(expectedParameterFile);

			// Expect the example parameter in the file to compile
			const example = expectedParameterFile.split('\n').pop()!.replace(/^\/\/ E.g\. /, '').replace('10', 'Increment 1');
			const importStmt = expectedParameterFile.split('\n')[0]!;
			writeFile('./test-project/contracts/counter-main.parameterList.mligo', [importStmt, example].join('\n'));
			const compileExampleResult = await execute('taq', 'compile counter-main.mligo', './test-project');
			// console.log(compileExampleResult)
			expect(compileExampleResult.stderr).toHaveLength(0);

			// Expect the parameter artifact to be created
			const artifactsList = await ls('./test-project/artifacts');
			expect(artifactsList).toContain('counter-main.parameter.default_parameter.tz');

			// Cleanup
			await cleanup();
		});
	});

	describe('support for smart contracts which use a main function within a namespace/module', () => {
		test('compile should compile a contract that uses a main function and is a module', async () => {
			const { execute, cleanup, spawn, writeFile, ls, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/counter-module-main.mligo`)).stdout;
			await writeFile('./test-project/contracts/counter-module-main.mligo', contract);

			// Write the parameter file for the contract
			const parameterFile = await (await exec(`cat e2e/data/ligo-data/Counter.parameterList.mligo`)).stdout;
			await writeFile('./test-project/contracts/Counter.parameterList.mligo', parameterFile);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/Counter.storageList.mligo`)).stdout;
			await writeFile('./test-project/contracts/Counter.storageList.mligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile counter-module-main.mligo', './test-project');
			// console.log(compileResult);
			expect(compileResult.stderr).toHaveLength(0);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌───────────────────────────────────┬───────────────────────────────────────────────┐',
				'│ Source                            │ Artifact                                      │',
				'├───────────────────────────────────┼───────────────────────────────────────────────┤',
				'│ counter-module-main.mligo/Counter │ artifacts/Counter.tz                          │',
				'│                                   │ artifacts/Counter.default_storage.tz          │',
				'│                                   │ artifacts/Counter.storage.another_count.tz    │',
				'│                                   │ artifacts/Counter.parameter.increment_by_3.tz │',
				'└───────────────────────────────────┴───────────────────────────────────────────────┘',
				'Compiled 1 contract(s) in "counter-module-main.mligo"',
			]);

			// Expect the artifacts to be created
			const artifacts_list = await ls('./test-project/artifacts');
			const expectedContracts = [
				'Counter.tz',
				'Counter.default_storage.tz',
				'Counter.storage.another_count.tz',
				'Counter.parameter.increment_by_3.tz',
			];
			expect(artifacts_list).toHaveLength(expectedContracts.length);
			expectedContracts.map(contract => expect(artifacts_list).toContain(contract));

			// Cleanup
			await cleanup();
		});

		test('compile should create a missing parameterList file for a contract that uses a main function and in a namespace/module', async () => {
			const { execute, cleanup, spawn, writeFile, ls, readFile, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/counter-module-main.mligo`)).stdout;
			await writeFile('./test-project/contracts/counter-module-main.mligo', contract);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/Counter.storageList.mligo`)).stdout;
			await writeFile('./test-project/contracts/Counter.storageList.mligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile counter-module-main.mligo', './test-project');
			// console.log(compileResult);

			// Expect stderr to contain a warning about the missing parameter file
			expect(compileResult.stderr).toHaveLength(1);
			expect(compileResult.stderr[0]).toEqual(
				`Note: parameter file associated with "Counter" can't be found, so "Counter.parameterList.mligo" has been created for you. Use this file to define all parameter values for this contract`,
			);

			// Expect the output to be correct
			expect(compileResult.stdout).toEqual([
				'┌───────────────────────────────────┬────────────────────────────────────────────┐',
				'│ Source                            │ Artifact                                   │',
				'├───────────────────────────────────┼────────────────────────────────────────────┤',
				'│ counter-module-main.mligo/Counter │ artifacts/Counter.tz                       │',
				'│                                   │ artifacts/Counter.default_storage.tz       │',
				'│                                   │ artifacts/Counter.storage.another_count.tz │',
				'└───────────────────────────────────┴────────────────────────────────────────────┘',
				'Compiled 1 contract(s) in "counter-module-main.mligo"',
			]);

			// Expect the parameter file to be created
			const contractsList = await ls('./test-project/contracts');
			expect(contractsList).toContain('Counter.parameterList.mligo');

			// Expect the parameterList file to have the correct contents
			const parameterFile = await readFile('./test-project/contracts/Counter.parameterList.mligo');
			const expectedParameterFile = await (await exec(`cat e2e/data/ligo-data/expected-Counter.parameterList.mligo`))
				.stdout;
			expect(parameterFile).toEqual(expectedParameterFile);

			// Expect the example parameter in the file to compile
			const example = expectedParameterFile.split('\n').pop()!.replace(/^\/\/ E.g\. /, '').replace('10', 'Increment 1');
			const importStmt = expectedParameterFile.split('\n')[0]!;
			writeFile('./test-project/contracts/Counter.parameterList.mligo', [importStmt, example].join('\n'));
			const compileExampleResult = await execute('taq', 'compile counter-module-main.mligo', './test-project');
			// console.log(compileExampleResult)
			expect(compileExampleResult.stderr).toHaveLength(0);

			// Expect the parameter artifact to be created
			const artifactsList = await ls('./test-project/artifacts');
			expect(artifactsList).toContain('Counter.parameter.default_parameter.tz');

			// Cleanup
			await cleanup();
		});
	});

	describe('support for smart contracts which use @entry without a namespace/module', () => {
		test('compile should compile a contract that uses @entry and is not within a namespace/module', async () => {
			const { execute, cleanup, spawn, writeFile, ls, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/entry.jsligo`)).stdout;
			await writeFile('./test-project/contracts/entry.jsligo', contract);

			// Write the parameter file for the contract
			const parameterFile = await (await exec(`cat e2e/data/ligo-data/entry.parameterList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/entry.parameterList.jsligo', parameterFile);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/entry.storageList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/entry.storageList.jsligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile entry.jsligo', './test-project');
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
			const { execute, cleanup, spawn, writeFile, ls, readFile, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/entry.jsligo`)).stdout;
			await writeFile('./test-project/contracts/entry.jsligo', contract);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/entry.storageList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/entry.storageList.jsligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile entry.jsligo', './test-project');
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
			const parameterFile = await readFile('./test-project/contracts/entry.parameterList.jsligo');
			// console.log(parameterFile)
			const expectedParameterFile = await (await exec(`cat e2e/data/ligo-data/expected-entry.parameterList.jsligo`))
				.stdout;
			expect(parameterFile).toEqual(expectedParameterFile);

			// Expect the example parameter in the file to compile
			const example = expectedParameterFile.split('\n').pop()!.replace(/^\/\/ E.g\. /, '').replace(
				'10',
				'Increment(1)',
			);
			const importStmt = expectedParameterFile.split('\n')[0]!;
			writeFile('./test-project/contracts/entry.parameterList.jsligo', [importStmt, example].join('\n'));
			const compileExampleResult = await execute('taq', 'compile entry.jsligo', './test-project');
			// console.log(compileExampleResult)
			expect(compileExampleResult.stderr).toHaveLength(0);

			// Expect the parameter artifact to be created
			const artifactsList = await ls('./test-project/artifacts');
			expect(artifactsList).toContain('entry.parameter.default_parameter.tz');

			// Cleanup
			await cleanup();
		});
	});

	describe('support for smart contracts which use @entry within a namespace/module', () => {
		test('compile should compile a contract that uses @entry and is within a namespace/module', async () => {
			const { execute, cleanup, spawn, writeFile, ls, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/IncDec.jsligo`)).stdout;
			await writeFile('./test-project/contracts/IncDec.jsligo', contract);

			// Write the parameter file for the contract
			const parameterFile = await (await exec(`cat e2e/data/ligo-data/IncDec.parameterList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/IncDec.parameterList.jsligo', parameterFile);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/IncDec.storageList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/IncDec.storageList.jsligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile IncDec.jsligo', './test-project');
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
			const { execute, cleanup, spawn, writeFile, ls, readFile, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			// Create the project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Install the plugin
			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/IncDec.jsligo`)).stdout;
			await writeFile('./test-project/contracts/IncDec.jsligo', contract);

			// Write the storage file for the contract
			const storageFile = await (await exec(`cat e2e/data/ligo-data/IncDec.storageList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/IncDec.storageList.jsligo', storageFile);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile IncDec.jsligo', './test-project');
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
			const parameterFile = await readFile('./test-project/contracts/IncDec.parameterList.jsligo');
			// console.log(parameterFile)
			const expectedParameterFile = await (await exec(`cat e2e/data/ligo-data/expected-IncDec.parameterList.jsligo`))
				.stdout;
			expect(parameterFile).toEqual(expectedParameterFile);

			// Expect the example parameter in the file to compile
			const example = expectedParameterFile.split('\n').pop()!.replace(/^\/\/ E.g\. /, '').replace(
				'10',
				'Increment(1)',
			);
			const importStmt = expectedParameterFile.split('\n')[0]!;
			writeFile('./test-project/contracts/IncDec.parameterList.jsligo', [importStmt, example].join('\n'));
			const compileExampleResult = await execute('taq', 'compile IncDec.jsligo', './test-project');
			// console.log(compileExampleResult)
			expect(compileExampleResult.stderr).toHaveLength(0);

			// Expect the parameter artifact to be created
			const artifactsList = await ls('./test-project/artifacts');
			expect(artifactsList).toContain('IncDec.parameter.default_parameter.tz');

			// Cleanup
			await cleanup();
		});
	});

	describe('other compilation tasks', () => {
		test('compile will compile only the specified module in the given source file when multiple modules exist', async () => {
			const { execute, cleanup, spawn, writeFile, ls, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir);

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// Write the contract to the test project
			const contract = await (await exec(`cat e2e/data/ligo-data/MultipleContracts.mligo`)).stdout;
			await writeFile('./test-project/contracts/MultipleContracts.mligo', contract);

			// Compile using the `compile` task
			const compileResult = await execute('taq', 'compile MultipleContracts.mligo -m HelloWorld', './test-project');
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

		test('compile-all will find and compile all contracts', async () => {
			const { execute, cleanup, spawn, writeFile, ls, path: projectDir } = await prepareEnvironment();

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			// List of test files to copy to test project
			const testFiles = [
				'counter-main.mligo',
				'counter-main.parameterList.mligo',
				'counter-main.storageList.mligo',
				'counter-module-main.mligo',
				'Counter.parameterList.mligo',
				'Counter.storageList.mligo',
				'counter.storageList.mligo',
				'C.parameterList.mligo',
				'C.storageList.mligo',
				'entry.jsligo',
				'entry-module.mligo',
				'entry.parameterList.jsligo',
				'entry.storageList.jsligo',
				'hello-tacos-invalid-tests.mligo',
				'hello-tacos.mligo',
				'hello-tacos.parameters.mligo',
				'hello-tacos-tests.mligo',
				'importer.mligo',
				'IncDec.jsligo',
				'IncDec.parameterList.jsligo',
				'IncDec.storageList.jsligo',
				'IncDec.tz',
				'increment.jsligo',
				'invalid-contract.mligo',
				'math-helpers.mligo',
				'pokeGame.jsligo',
				'pokeGame.parameterList.jsligo',
				'pokeGame.storageList.jsligo',
				'unit_pokeGame.jsligo',
			];

			// Copy the test files to the test project
			await Promise.all(testFiles.map(async file => {
				const fileContents = await (await exec(`cat e2e/data/ligo-data/${file}`)).stdout;
				return await writeFile(`./test-project/contracts/${file}`, fileContents);
			}));

			// Expect files to exist in test project
			const contractsList = await ls('./test-project/contracts');
			testFiles.map(file => expect(contractsList).toContain(file));

			// Compile the contracts using the `compile-all` task
			const compileResult = await execute('taq', 'compile-all', './test-project');
			// console.log(compileResult);

			// Check that the output contains the expected files
			expect(compileResult.stdout).toEqual(
				[
					'┌───────────────────────────────────┬──────────────────────────────────────────────────────┐',
					'│ Source                            │ Artifact                                             │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ IncDec.jsligo/IncDec              │ artifacts/IncDec.tz                                  │',
					'│                                   │ artifacts/IncDec.default_storage.tz                  │',
					'│                                   │ artifacts/IncDec.parameter.increment.tz              │',
					'│                                   │ artifacts/IncDec.parameter.decrement.tz              │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ counter-main.mligo                │ artifacts/counter-main.tz                            │',
					'│                                   │ artifacts/counter-main.default_storage.tz            │',
					'│                                   │ artifacts/counter-main.storage.zero_storage.tz       │',
					'│                                   │ artifacts/counter-main.parameter.increment_by_one.tz │',
					'│                                   │ artifacts/counter-main.parameter.increment_by_two.tz │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ counter-module-main.mligo/Counter │ artifacts/Counter.tz                                 │',
					'│                                   │ artifacts/Counter.default_storage.tz                 │',
					'│                                   │ artifacts/Counter.storage.another_count.tz           │',
					'│                                   │ artifacts/Counter.parameter.increment_by_3.tz        │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ entry-module.mligo/C              │ artifacts/C.tz                                       │',
					'│                                   │ artifacts/C.default_storage.tz                       │',
					'│                                   │ artifacts/C.parameter.default_parameter.tz           │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ entry.jsligo                      │ artifacts/entry.tz                                   │',
					'│                                   │ artifacts/entry.default_storage.tz                   │',
					'│                                   │ artifacts/entry.parameter.default_parameter.tz       │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ hello-tacos.mligo                 │ artifacts/hello-tacos.tz                             │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ importer.mligo                    │ artifacts/importer.tz                                │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ increment.jsligo                  │ artifacts/increment.tz                               │',
					'├───────────────────────────────────┼──────────────────────────────────────────────────────┤',
					'│ pokeGame.jsligo                   │ artifacts/pokeGame.tz                                │',
					'│                                   │ artifacts/pokeGame.default_storage.tz                │',
					'│                                   │ artifacts/pokeGame.parameter.default_parameter.tz    │',
					'└───────────────────────────────────┴──────────────────────────────────────────────────────┘',
				],
			);

			await cleanup();
		});

		test('compile to json-encoded michelson', async () => {
			const { execute, cleanup, writeFile, readFile, ls, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const mligo_file = await (await exec(`cat e2e/data/ligo-data/hello-tacos.mligo`)).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

			await execute('taq', 'compile hello-tacos.mligo --json', './test-project');
			const artifacts_list = await ls('./test-project/artifacts');
			expect(artifacts_list).toContain('hello-tacos.json');
			const json_file = await readFile('./test-project/artifacts/hello-tacos.json');
			expect(json_file).toContain(
				'[{"prim":"parameter","args":[{"prim":"nat"}]},{"prim":"storage","args":[{"prim":"nat"}]},{"prim":"code","args":[[{"prim":"UNPAIR"},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"DUP","args":[{"int":"2"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"string"},{"string":"NOT_ENOUGH_TACOS"}]},{"prim":"FAILWITH"}],[{"prim":"SWAP"},{"prim":"SUB"},{"prim":"ABS"},{"prim":"NIL","args":[{"prim":"operation"}]},{"prim":"PAIR"}]]}]]}]',
			);

			await cleanup();
		});

		test('compile will only compile one contract using compile <sourceFile> command when multiple contracts exist', async () => {
			const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const artifacts_list_before = await ls('./test-project/artifacts');
			expect(artifacts_list_before).toEqual([]);

			const mligo_file = await (await exec(`cat e2e/data/ligo-data/hello-tacos.mligo`)).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

			const jsligo_file = await (await exec(`cat e2e/data/ligo-data/increment.jsligo`)).stdout;
			await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

			await execute('taq', 'compile hello-tacos.mligo', './test-project');
			const artifacts_list = await ls('./test-project/artifacts');
			expect(artifacts_list).toContain('hello-tacos.tz');

			await cleanup();
		});

		test('compile will error if the named contract does not exist', async () => {
			const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const { stdout: compileOutput, stderr: compileErr } = await execute(
				'taq',
				'compile does_not_exist.mligo',
				'./test-project',
			);
			expect(compileOutput.join('\n')).toContain(
				'│ does_not_exist.mligo │ No contract modules found in "does_not_exist.mligo"',
			);
			expect(compileErr.join()).toContain('does_not_exist.mligo: No such file or directory');

			await cleanup();
		});
	});

	describe('ligo test framework', () => {
		test('test will run ligo test', async () => {
			const { execute, cleanup, spawn, writeFile, path: projectDir } = await prepareEnvironment();
			// console.log(projectDir)

			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const mligo_file = await (await exec('cat e2e/data/ligo-data/hello-tacos.mligo')).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
			const test_file = await (await exec('cat e2e/data/ligo-data/hello-tacos-tests.mligo')).stdout;
			await writeFile('./test-project/contracts/hello-tacos-tests.mligo', test_file);

			const testResult = await execute(
				'taq',
				'test hello-tacos-tests.mligo',
				'./test-project',
			);

			// console.log(testResult)

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

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const mligo_file = await (await exec('cat e2e/data/ligo-data/hello-tacos.mligo')).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
			const invalid_test_file = await (await exec('cat e2e/data/ligo-data/hello-tacos-invalid-tests.mligo')).stdout;
			await writeFile('./test-project/contracts/hello-tacos-invalid-tests.mligo', invalid_test_file);

			const { stdout: testOutput, stderr: testErr } = await execute(
				'taq',
				'test hello-tacos-invalid-tests.mligo',
				'./test-project',
			);
			expect(testOutput).toEqual(
				expect.arrayContaining(['│ hello-tacos-invalid-tests.mligo │ Some tests failed :( │']),
			);
			expect(testErr.join()).toContain('Error messages for hello-tacos-invalid-tests.mligo');

			await cleanup();
		});

		test('test will error if named file does not exist', async () => {
			const { execute, cleanup, spawn } = await prepareEnvironment();
			const { waitForText } = await spawn('taq', 'init test-project --debug');
			await waitForText("Project taq'ified!");

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const { stderr: testErr } = await execute('taq', 'test hello-tacos-test.mligo', './test-project');
			expect(testErr.toString()).toContain('contracts/hello-tacos-test.mligo: No such file or directory.');

			await cleanup();
		});
	});

	test('LIGO contract template will be instantiated with the right content', async () => {
		const { execute, cleanup, spawn, readFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		await execute('taq', 'create contract counter.mligo', './test-project');
		expect(await ls('./test-project/contracts')).toContain('counter.mligo');

		const bytes = await readFile(path.join('./test-project', 'contracts', 'counter.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');
		expect(hash).toEqual('241556bb7f849d22564378991ce6c15ffd7fd5727620f207fb53e6dc538e66ef');
		await cleanup();
	});

	test('ligo compile will error with missing storage file', async () => {
		const { execute, cleanup, writeFile, exists, ls, path: projectDir } = await prepareEnvironment();
		// console.log(projectDir)

		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');

		const mligo_file = await (await exec(`cat e2e/data/ligo-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const parameters_file = await (await exec(`cat e2e/data/ligo-data/hello-tacos.parameters.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.parameters.mligo', parameters_file);

		expect(await ls('./test-project/contracts')).toEqual(
			expect.arrayContaining(['hello-tacos.mligo', 'hello-tacos.parameters.mligo']),
		);

		const { stderr, stdout } = await execute('taq', 'compile counter.mligo', './test-project');

		expect(stderr).toEqual(
			expect.arrayContaining([expect.stringContaining('=== Error messages for counter.mligo ===')]),
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

		// See https://github.com/pinnacle-labs/taqueria/issues/1870
		test('ligo task with install command does not result in an error', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
			const result = await execute('taq', 'ligo --command "install"', './test-project');
			expect(result.stderr.join('').trim()).not.toContain('error');
			await cleanup();
		});
	});

	describe('regression tests', () => {
		// See https://github.com/pinnacle-labs/taqueria/issues/1859
		// See https://github.com/pinnacle-labs/taqueria/issues/1867
		test('regression against #1859, ligo compile-all will not create infinite storage files', async () => {
			const { execute, cleanup, writeFile, path: projectDir } = await prepareEnvironment();

			// console.log(projectDir)

			// set up the project
			await execute('taq', 'init test-project');
			await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');

			// copy jsligo files to contracts folder
			const jligo_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.jsligo`)).stdout;
			await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
			const storage_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.storageList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/pokeGame.storageList.jsligo', storage_file);
			const parameters_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.parameterList.jsligo`)).stdout;
			await writeFile('./test-project/contracts/pokeGame.parameterList.jsligo', parameters_file);

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
	});
});
