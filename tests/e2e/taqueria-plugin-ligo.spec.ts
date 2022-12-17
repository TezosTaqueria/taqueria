import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('E2E Testing for ligo plugin', () => {
	test('ligo plugin help will show help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', '--help --projectDir=./test-project', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['taq [command]']));

		await cleanup();
	});

	// DEMONSTRATION OF https://github.com/ecadlabs/taqueria/issues/1635
	test('bug - ligo plugin compile will only give contextual help in stderr', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		// provide --help parameter
		const { stdout: stdout1 } = await execute('taq', 'compile --help', './test-project');

		// displays default help, not contextual help
		expect(stdout1).toContain('taq [command]');

		// fail to provide enough parameters
		const { stderr: stderr1 } = await execute('taq', 'compile', './test-project');

		// invokes stderr to display contextual help
		expect(stderr1).toContain('Compile a smart contract written in a LIGO syntax to Michelson code, along with');
		expect(stderr1).toContain('Not enough non-option arguments: got 0, need at least 1');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635 - ligo plugin compile will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'compile --help --projectDir=./test-project', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a LIGO syntax to Michelson code, along with']),
		);

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('1635 - ligo plugin compile-ligo will show contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
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

	test('ligo plugin compile will error if missing <contract> parameter', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'compile', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['Not enough non-option arguments: got 0, need at least 1']));

		await cleanup();
	});

	test('ligo plugin add-contract will error if named contract does not exist', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat e2e/data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const { stdout: stdout2 } = await execute('taq', 'add-contract hello-tacos.mligo', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ No registered contracts found │']));

		await cleanup();
	});

	test('ligo plugin compile will only compile one contract using compile <sourceFile> command', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat e2e/data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'compile hello-tacos.mligo', './test-project');
		const artifacts_list = await ls('./test-project/artifacts');
		expect(artifacts_list).toContain('hello-tacos.tz');

		await cleanup();
	});

	test('ligo plugin compile will error if the named contract does not exist', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute('taq', 'compile does_not_exist.mligo', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ does_not_exist.mligo │ Not compiled │']));
		expect(stderr).toEqual(expect.arrayContaining(['contracts/does_not_exist.mligo: No such file or directory.']));

		await cleanup();
	});

	test('ligo plugin add-contract will error if contract is invalid', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat e2e/data/invalid-contract.mligo')).stdout;
		await writeFile('./test-project/contracts/invalid-contract.mligo', mligo_file);
		const check_the_file = await readFile('./test-project/contracts/invalid-contract.mligo');
		expect(check_the_file).toContain('type available_tacos = natu');

		const { stdout: stdout2 } = await execute('taq', 'add-contract invalid-contract.mligo', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining(['│ No registered contracts found │']),
		);

		const { stdout: stdout3, stderr: stderr2 } = await execute(
			'taq',
			'compile invalid-contract.mligo',
			'./test-project',
		);
		expect(stdout3).toEqual(expect.arrayContaining(['│ invalid-contract.mligo │ Not compiled │']));
		expect(stderr2[1]).toEqual('File "contracts/invalid-contract.mligo", line 1, characters 23-27:');

		await cleanup();
	});

	test('ligo plugin test can run ligo test', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const test_file = await (await exec('cat e2e/data/hello-tacos-tests.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos-tests.mligo', test_file);

		const { stdout: stdout2 } = await execute('taq', 'test hello-tacos-tests.mligo', './test-project');
		expect(stdout2).toEqual(
			expect.arrayContaining(['│                         │ 🎉 All tests passed 🎉                       │']),
		);

		await cleanup();
	});

	test('ligo plugin test will error if test file is invalid', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const invalid_test_file = await (await exec('cat e2e/data/hello-tacos-invalid-tests.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos-invalid-tests.mligo', invalid_test_file);

		const { stdout: stdout2, stderr } = await execute('taq', 'test hello-tacos-invalid-tests.mligo', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ hello-tacos-invalid-tests.mligo │ Some tests failed :( │']));
		expect(stderr).toEqual(expect.arrayContaining(['Variable "initial_storage" not found.']));

		await cleanup();
	});

	test('ligo plugin test will error if named file does not exist', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'test hello-tacos-test.mligo', './test-project');
		expect(stderr).toContain('contracts/hello-tacos-test.mligo: No such file or directory.');

		await cleanup();
	});

	test('ligo plugin compile can use a different version of the LIGO image', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'get-image --plugin ligo', './test-project');
		expect(stdout2).toContain('ligolang/ligo:0.54.1');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-custom-image.mligo', mligo_file);

		const { stdout: stdout3 } = await execute('taq', 'compile hello-custom-image.mligo', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['│ hello-custom-image.mligo │ artifacts/hello-custom-image.tz │']));

		const artifacts_list = await ls('./test-project/artifacts');
		expect(artifacts_list).toContain('hello-custom-image.tz');

		await cleanup();
	});

	test('LIGO contract template will be instantiated with the right content and registered', async () => {
		const { execute, cleanup, spawn, readFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { code } = await execute('taq', 'create contract counter.mligo', './test-project');
		expect(code).toEqual(0);
		expect(await ls('./test-project/contracts')).toContain('counter.mligo');

		const bytes = await readFile(path.join('./test-project', 'contracts', 'counter.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');
		expect(hash).toEqual('241556bb7f849d22564378991ce6c15ffd7fd5727620f207fb53e6dc538e66ef');

		const configFile = await readFile(path.join('./test-project', '.taq', 'config.json'));
		const json = JSON.parse(configFile);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		expect(json.contracts).toEqual({
			'counter.mligo': {
				'hash': '241556bb7f849d22564378991ce6c15ffd7fd5727620f207fb53e6dc538e66ef',
				'sourceFile': 'counter.mligo',
			},
		});

		await cleanup();
	});
});
