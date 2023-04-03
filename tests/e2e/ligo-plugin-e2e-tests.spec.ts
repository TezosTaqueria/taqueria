import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Ligo Plugin E2E Testing for Taqueria CLI', () => {
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

	test('compile-ligo will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute(
			'taq',
			'compile-ligo --help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code, along with']),
		);

		await cleanup();
	});

	test('ligo plugin will support cli options', async () => {
		const { execute, cleanup, writeFile, readFile, ls, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute('taq', '--version', './test-project');
		expect(stderr).toEqual([]);
		expect(stdout2).not.toEqual([]);

		const { stdout: stdout3, stderr: stderr2 } = await execute('taq', '--build', './test-project');
		expect(stderr2).toEqual([]);
		expect(stdout3).not.toEqual([]);

		const mligo_file = await (await exec(`cat e2e/data/ligo-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		await execute('taq', 'compile hello-tacos.mligo --json', './test-project');
		const artifacts_list = await ls('./test-project/artifacts');
		expect(artifacts_list).toContain('hello-tacos.json');
		const json_file = await readFile('./test-project/artifacts/hello-tacos.json');
		expect(json_file).toContain('[ { "prim": "parameter", "args": [ { "prim": "nat" } ] },');

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

	test('compile will only compile one contract using compile <sourceFile> command', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifacts_list_before = await ls('./test-project/artifacts');
		expect(artifacts_list_before).toEqual([]);

		const mligo_file = await (await exec(`cat e2e/data/ligo-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

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
		expect(compileOutput).toEqual(expect.arrayContaining(['│ does_not_exist.mligo │ Not compiled │']));
		expect(compileErr.join()).toContain('contracts/does_not_exist.mligo: No such file or directory.');

		await cleanup();
	});

	test('test will run ligo test', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat e2e/data/ligo-data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const test_file = await (await exec('cat e2e/data/ligo-data/hello-tacos-tests.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos-tests.mligo', test_file);

		const { stdout: testOutput, stderr: _testErrOutput } = await execute(
			'taq',
			'test hello-tacos-tests.mligo',
			'./test-project',
		);
		expect(testOutput).toEqual(
			expect.arrayContaining(['│                         │ 🎉 All tests passed 🎉                       │']),
		);

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
		expect(testOutput).toEqual(expect.arrayContaining(['│ hello-tacos-invalid-tests.mligo │ Some tests failed :( │']));
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

	test('compile can use a different version of the LIGO image', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: imageOutput } = await execute('taq', 'get-image --plugin ligo', './test-project');
		expect(imageOutput).toEqual(expect.arrayContaining([expect.stringContaining('ligolang/ligo:')]));

		const mligo_file = await (await exec('cat e2e/data/ligo-data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-custom-image.mligo', mligo_file);

		const { stdout: stdout3 } = await execute('taq', 'compile hello-custom-image.mligo', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['│ hello-custom-image.mligo │ artifacts/hello-custom-image.tz │']));

		const artifacts_list = await ls('./test-project/artifacts');
		expect(artifacts_list).toContain('hello-custom-image.tz');

		await cleanup();
	});

	test('LIGO contract template will be instantiated with the right content', async () => {
		const { execute, cleanup, spawn, readFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
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

	test('ligo compile will compile counter contracts with renamed parameter file', async () => {
		const { execute, cleanup, writeFile, exists, ls } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');

		const mligo_file = await (await exec(`cat e2e/data/ligo-data/counter.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.mligo', mligo_file);
		const storage_file = await (await exec(`cat e2e/data/ligo-data/counter.storageList.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.storageList.mligo', storage_file);
		const parameter_file = await (await exec(`cat e2e/data/ligo-data/counter.parameterList.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.parameters.mligo', parameter_file);
		expect(await ls('./test-project/contracts')).toEqual(
			expect.arrayContaining(['counter.mligo', 'counter.parameters.mligo', 'counter.storageList.mligo']),
		);

		const { stdout: stdout1 } = await execute('taq', 'compile counter.mligo', './test-project');
		expect(stdout1).toMatchInlineSnapshot(`
              [
                "┌───────────────────────────┬───────────────────────────────────────────────┐",
                "│ Contract                  │ Artifact                                      │",
                "├───────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.mligo             │ artifacts/counter.tz                          │",
                "├───────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.storageList.mligo │ artifacts/counter.default_storage.tz          │",
                "│                           │ artifacts/counter.storage.another_count.tz    │",
                "├───────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.parameters.mligo  │ artifacts/counter.parameter.increment_by_3.tz │",
                "└───────────────────────────┴───────────────────────────────────────────────┘",
              ]
          `);

		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const { stdout: stdout2 } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Starting node...']));

		const { stdout: stdout3 } = await execute('taq', 'list accounts local', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['│ Account │ Balance │ Address                              │']));
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('bob')]));

		await cleanup();
	});

	test('ligo compile will error with missing storage file', async () => {
		const { execute, cleanup, writeFile, exists, ls } = await prepareEnvironment();
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

		const { stderr } = await execute('taq', 'compile counter.mligo', './test-project');
		expect(stderr).toEqual(
			expect.arrayContaining([expect.stringContaining('=== Error messages for counter.mligo ===')]),
		);

		await cleanup();
	});

	test('ligo can create template that the user owns the file', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		const result = await execute(
			'taq',
			"ligo --command 'init contract --template shifumi-jsligo shifumiTemplate'",
			'./test-project',
		);
		console.log(result);
		await exists('./test-project/shifumiTemplate');
		const { stdout } = await execute('ls', '-l', './test-project');
		const output = stdout.join('\n');
		expect(output).toContain(process.env.USER);
		expect(output).not.toContain('root');
		await cleanup();
	});
});
