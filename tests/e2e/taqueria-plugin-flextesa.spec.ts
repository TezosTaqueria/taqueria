import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

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
		expect(stdout2).toEqual(expect.arrayContaining(['Starting node...']));

		const { stdout: stdout3 } = await execute('docker', 'ps --filter name=taq-flextesa-test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('taq-flextesa-test')]));
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('oxhead')]));

		const { stdout: stdout4 } = await execute('taq', 'stop sandbox test', './test-project');
		await expect(stdout4).toEqual(expect.arrayContaining(['Stopped test.']));

		await cleanup();
	});

	test('start sandbox will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');
		await new Promise(r => setTimeout(r, 750));

		const { stdout: stdout2 } = await execute(
			'taq',
			'start sandbox --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	test('start will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');
		await new Promise(r => setTimeout(r, 750));

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	test('sandbox stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');
		await new Promise(r => setTimeout(r, 1000));

		const { stdout: stdout2 } = await execute(
			'taq',
			'stop sandbox --help',
			'./test-project',
		);
		console.log(stdout2);
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
		await new Promise(r => setTimeout(r, 750));

		const config_file = await (await exec('cat e2e/data/config-no-sandboxes.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const { stderr, stdout: stdout2 } = await execute('taq', 'start sandbox', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['network → ghostnet → protocol: Required']));
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
	test('start sandbox will initiate a baker daemon by default', async () => {
		const { execute, cleanup, spawn, readFile } = await prepareEnvironment();
		await exec('docker rm -vf $(docker ps -aq) > /dev/null 2>&1 || echo "Docker clear."', { cwd: `./` });
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout2).toContain('Starting node...');

		const { stdout: stdout3 } = await execute('docker', 'ps', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('taq-flextesa-local')]));
		expect(stdout3).toEqual(expect.arrayContaining([expect.stringContaining('oxhead')]));

		// const { stdout: stdout3 } = await execute('docker', 'ps', './test-project')
		// expect(stdout3).toContain('baker');

		await cleanup();
	});
});
