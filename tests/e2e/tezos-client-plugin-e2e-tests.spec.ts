import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Tezos-Client Plugin E2E Testing for Taqueria CLI', () => {
	// blocked by https://github.com/ecadlabs/taqueria/issues/1671
	// this fail has been confirmed manually in pre-release v0.25.23-rc
	test.only('typecheck will check a contract in the artifacts folder', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_file = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_file);

		const { stdout: stdout1 } = await execute('taq', 'typecheck', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos.tz │ Valid  │']));

		await cleanup();
	});

	test('typecheck will check one contract using typecheck [sourceFile] command', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_file = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_file);

		const { stdout: stdout1, stderr } = await execute('taq', 'typecheck hello-tacos.tz', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos.tz │ Valid  │']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1671
	// this fail has been confirmed manually in pre-release v0.25.23-rc
	test.skip('typechecker will check all contracts under artifacts folder', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos-one.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos-two.tz', artifact_two);

		const { stdout: stdout1 } = await execute('taq', 'typecheck', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos-one.tz │ Valid  │']));
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos-two.tz │ Valid  │']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1671
	// this fail has been confirmed manually in pre-release v0.25.23-rc
	test.skip('typecheck will check multiple (but not all) contracts using typecheck [sourceFile1] [sourceFile2] command', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos-one.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos-two.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos-three.tz', artifact_three);

		const { stdout: stdout1 } = await execute(
			'taq',
			'typecheck hello-tacos-one.tz hello-tacos-two.tz',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos-one.tz │ Valid  │']));
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos-two.tz │ Valid  │']));

		await cleanup();
	});

	// hangs for a long time waiting for the image name
	// this passes manually in pre-release v0.25.23-rc
	test.skip('different tezos client image can be used', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_file = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_file);

		const { stdout: stdout1, stderr } = await execute(
			'TAQ_TEZOS_CLIENT_IMAGE=oxheadalpha/flextesa:20221123 taq',
			'get-image --plugin tezos-client',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos.tz │ Valid  │']));

		await cleanup();
	});

	test('typecheck will error if no contract', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout1, stderr } = await execute('taq', 'typecheck no_such_contract.tz', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['│ no_such_contract.tz │ N/A    │']));

		await cleanup();
	});

	test('typecheck will error and yet displays table if contract is ill-typed', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_file = await (await exec(`cat e2e/data/michelson-data/hello-tacos-ill-typed.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos-ill-typed.tz', artifact_file);

		const { stdout: stdout1, stderr } = await execute('taq', 'typecheck hello-tacos-ill-typed.tz', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos-ill-typed.tz │ Invalid │']));

		await cleanup();
	});

	test('simulate will simulate one contract using simulate [sourceFile] command', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/integerParameter10.tz`)).stdout;
		await writeFile('./test-project/artifacts/integerParameter10.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stdout: stdout1, stderr } = await execute(
			'taq',
			'simulate hello-tacos.tz --param integerParameter10.tz --storage anyContract.storage.tz',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos.tz │ storage            │']));
		expect(stdout1).toEqual(expect.arrayContaining(['│                │ big_map diff       │']));

		await cleanup();
	});

	test('simulate will error if no contract', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_two = await (await exec(`cat e2e/data/michelson-data/integerParameter10.tz`)).stdout;
		await writeFile('./test-project/artifacts/integerParameter10.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stdout: stdout1 } = await execute(
			'taq',
			'simulate no_such_contract.tz --param integerParameter10.tz --storage anyContract.storage.tz',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ no_such_contract.tz │ N/A    │']));

		await cleanup();
	});

	test('simulate will pass errors from Michelson', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/integerParameter15.tz`)).stdout;
		await writeFile('./test-project/artifacts/integerParameter15.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stderr } = await execute(
			'taq',
			'simulate hello-tacos.tz --param integerParameter15.tz --storage anyContract.storage.tz',
			'./test-project',
		);
		expect(stderr).toEqual(expect.arrayContaining(['with "NOT_ENOUGH_TACOS"']));

		await cleanup();
	});

	test('simulate will error with incorrect parameter', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/stringParameter.tz`)).stdout;
		await writeFile('./test-project/artifacts/stringParameter.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stderr } = await execute(
			'taq',
			'simulate hello-tacos.tz --param stringParameter.tz --storage anyContract.storage.tz',
			'./test-project',
		);
		expect(stderr).toEqual(expect.arrayContaining(['At (unshown) location 0, value "hello" is invalid for type nat.']));

		await cleanup();
	});

	test('simulate will error on supplying list instead of nat', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/listParameter.tz`)).stdout;
		await writeFile('./test-project/artifacts/listParameter.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stderr } = await execute(
			'taq',
			'simulate hello-tacos.tz --param listParameter.tz --storage anyContract.storage.tz',
			'./test-project',
		);
		expect(stderr).toEqual(
			expect.arrayContaining(['At (unshown) location 0, unexpected sequence, only an int can be used here.']),
		);

		await cleanup();
	});

	test('simulate will error when map supplied instead of nat', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/mapParameter.tz`)).stdout;
		await writeFile('./test-project/artifacts/mapParameter.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stderr } = await execute(
			'taq',
			'simulate hello-tacos.tz --param mapParameter.tz --storage anyContract.storage.tz',
			'./test-project',
		);
		expect(stderr).toEqual(
			expect.arrayContaining(['At (unshown) location 0, unexpected sequence, only an int can be used here.']),
		);

		await cleanup();
	});

	test('Taqueria CLI will pass 0x00 to the simulator', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/byteSlice.tz`)).stdout;
		await writeFile('./test-project/artifacts/byteSlice.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/byteSlice.default_storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/byteSlice.default_storage.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/byteSlice.parameter.param1.tz`)).stdout;
		await writeFile('./test-project/artifacts/byteSlice.parameter.param1.tz', artifact_three);

		const { stdout: stdout1 } = await execute(
			'taq',
			'simulate byteSlice.tz --param byteSlice.parameter.param1.tz --storage byteSlice.parameter.param1.tz',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ byteSlice.tz │ storage            │']));
		expect(stdout1).toEqual(expect.arrayContaining(['│              │   0xa47ef2         │']));

		await cleanup();
	});

	test('simulator will handle Left and Right (part of input and storage value) correctly', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/increment.tz`)).stdout;
		await writeFile('./test-project/artifacts/increment.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/incrementBy3.tz`)).stdout;
		await writeFile('./test-project/artifacts/incrementBy3.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stdout: stdout1 } = await execute(
			'taq',
			'simulate increment.tz --param incrementBy3.tz --storage anyContract.storage.tz',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ increment.tz │ storage            │']));
		expect(stdout1).toEqual(expect.arrayContaining(['│              │   15               │']));

		await cleanup();
	});

	test('simulate will accept --entrypoint flag', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_one = await (await exec(`cat e2e/data/michelson-data/increment.tz`)).stdout;
		await writeFile('./test-project/artifacts/increment.tz', artifact_one);
		const artifact_two = await (await exec(`cat e2e/data/michelson-data/integerParameter10.tz`)).stdout;
		await writeFile('./test-project/artifacts/integerParameter10.tz', artifact_two);
		const artifact_three = await (await exec(`cat e2e/data/michelson-data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', artifact_three);

		const { stdout: stdout1, stderr } = await execute(
			'taq',
			'simulate increment.tz --param integerParameter10.tz --storage anyContract.storage.tz --entrypoint increment',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ increment.tz │ storage            │']));
		expect(stdout1).toEqual(expect.arrayContaining(['│              │   22               │']));

		await cleanup();
	});
});
