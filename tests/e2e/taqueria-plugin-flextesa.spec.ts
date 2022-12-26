import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { stderr } from 'process';
import { arrayBuffer } from 'stream/consumers';

// TODO: (AZ?) to be moved into a different spec file when the tezos-client plugin no longer depends on the flextesa plugin.
// If I move it now, testing won't work.
// Starting docker in e2e/auto-test-flextesa-plugin and then e2e/auto-test-tezos-client-plugin won't work
// One solution is to have an extra parameter for the container name (docker run --name <the name>) when starting one.
// Right now it's "hardcoded" (in a sense) to be the same as the sandbox name.
// This might fix the problem because, right now, when we test flextesa and tezos-client at the same time
// (assuming we moved all tezos-client tests to its own spec file), it will start the container for flextesa.spec,
// but then it will attempt to start another container for tezos-client.spec in parallel, which would be a "no-op"
// since a container is already running. However, this container was started using a volume associated with the e2e/auto-test-flextesa-plugin.
// As a result, when running tests in tezos-client.spec, it will complain that files don't exist.(/AZ?)

describe('Flextesa Plugin E2E Testing for Taqueria CLI', () => {
	test('start and stop will work with a custom name sandbox', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat e2e/data/config-flextesa-test-sandbox.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const { stdout: stdout2 } = await execute('taq', 'start sandbox test', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['The sandbox "test" is ready.']));
		expect(stdout2).toEqual(expect.arrayContaining(['Starting postgresql']));
		expect(stdout2).toEqual(expect.arrayContaining(['Starting TzKt.Sync']));
		expect(stdout2).toEqual(expect.arrayContaining(['Starting TzKt.Api']));

		const { stdout: stdout3 } = await execute('docker', 'ps --filter name=taq-flextesa-test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('taq-flextesa-test')]));
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('oxhead')]));

		const { stdout: stdout4 } = await execute('taq', 'stop sandbox test', './test-project');
		await expect(stdout4).toEqual(expect.arrayContaining(['Stopped test.']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('help will offer contenxtual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'--help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('start sandbox will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start sandbox --help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('start will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start --help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('sandbox stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'sandbox stop --help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'stop --help --projectDir=./test-project',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	test('start sandbox will error if no sandbox in config', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat e2e/data/config-no-sandboxes.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const { stderr } = await execute('taq', 'start sandbox', './test-project');
		expect(stderr).toEqual([
			"No sandbox name was specified. We couldn't find a valid sandbox config for the current environment.",
		]);

		await cleanup();
	});

	test('start sandbox will error if incorrect sandbox name called', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'start sandbox no_such_sandbox', './test-project');
		expect(stderr).toEqual(['There is no sandbox called no_such_sandbox in your .taq/config.json.']);

		await cleanup();
	});

	test('show protocols will offer known protocols', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'show protocols', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ PtLimaPtLMwfNinJi9rCfDPWea8dFgTZ1MeJ9f1m2SRic6ayiwW │']));

		await cleanup();
	});

	test('stop sandbox will error if call stop on a stopped sandbox', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'stop sandbox local', './test-project');
		expect(stdout2).toEqual(['The local sandbox was not running.']);

		await cleanup();
	});

	test('list accounts will error if called on a stopped sandbox', async () => {
		5;
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'list accounts local', './test-project');
		expect(stderr).toEqual(['The local sandbox is not running.']);

		await cleanup();
	});

	test('start sandbox will error if called on a started sandbox', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const {} = await execute('taq', 'start sandbox local', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Already running.']));

		await cleanup();
	});

	test('list accounts will display the sandbox accounts', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const {} = await execute('taq', 'start sandbox local', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'list accounts local', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ Account │ Balance │ Address                              │']));

		await cleanup();
	});

	// config does not include baker by default - is this a bug?
	test.skip('start sandbox will initiate a baker daemon by default', async () => {
		const { execute, cleanup, spawn, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout2).toContain('The sandbox "local" is ready.');

		console.log(await readFile('./test-project/.taq/config.json'));

		const { stdout: stdout3 } = await execute('docker', 'ps', './test-project');

		console.log(stdout3);

		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('taq-flextesa-local')]));
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('oxhead')]));

		// const { stdout: stdout3 } = await execute('docker', 'ps', './test-project')
		// expect(stdout3).toContain('baker');

		await cleanup();
	});
});
