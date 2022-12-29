import { exec as exec1 } from 'child_process';
import utils from 'util';
const exec = utils.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Archetype Plugin E2E Testing for Taqueria CLI', () => {
	test('project help offers help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		1;

		const { stdout: stdout1 } = await execute('taq', '--help --projectDir=./test-project/', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['taq [command]']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('compile offers contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		1;

		const { stdout: stdout1 } = await execute('taq', 'c --help --projectDir=./test-project/', './test-project');
		expect(stdout1).toEqual(
			expect.arrayContaining(['Compile a smart contract written in a Archetype syntax to Michelson code']),
		);

		await cleanup();
	});

	test('compile will error if no contract parameter passed and no contract exists', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		1;

		const { stdout: stdout1 } = await execute('taq', 'compile', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['│ None found │ N/A      │']));

		await cleanup();
	});

	// this isn't working. should it? should compile find all files in contracts dir?
	// see https://github.com/ecadlabs/taqueria/issues/1678
	test.skip('compile will compile one contract under contracts folder without a parameter', async () => {
		const { execute, spawn, writeFile, exists, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const arl_file = await (await exec('cat e2e/data/fa12.arl')).stdout;
		writeFile('./test-project/contracts/fa12.arl', arl_file);

		const { stdout: stdout2, stderr } = await execute('taq', 'compile', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ fa12.arl │ artifacts/fa12.tz │']));

		await exists(`./test-project/artifacts/fa12.tz`);

		await cleanup();
	});

	test('compile will compile one contract with [sourceFile] command', async () => {
		const { execute, spawn, writeFile, exists, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const arl_file = await (await exec('cat e2e/data/fa12.arl')).stdout;
		writeFile('./test-project/contracts/fa12.arl', arl_file);

		const { stdout: stdout2, stderr } = await execute('taq', 'compile fa12.arl', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ fa12.arl │ artifacts/fa12.tz │']));

		await exists(`./test-project/artifacts/fa12.tz`);

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1678
	test.skip('compile will compile multiple contracts in the contracts folder', async () => {
		const { execute, spawn, writeFile, exists, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const arl_file = await (await exec('cat e2e/data/fa12.arl')).stdout;
		writeFile('./test-project/contracts/fa12.arl', arl_file);
		const animal_file = await (await exec('cat e2e/data/animal_tracking.arl')).stdout;
		writeFile('./test-project/contracts/animal_tracking.arl', animal_file);

		const { stdout: stdout2, stderr } = await execute('taq', 'compile', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ fa12.arl │ artifacts/fa12.tz │']));

		await exists(`./test-project/artifacts/fa12.tz`);
		await exists(`./test-project/artifacts/animal_tracking.tz`);

		await cleanup();
	});

	test('compile will error if named contract does not exist', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2, stderr } = await execute('taq', 'compile no_such_file.arl', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ no_such_file.arl │ Not compiled │']));

		await cleanup();
	});

	// hangs waiting to execute the image command
	test.skip('compile can use different versions of the Archetype image', async () => {
		const { execute, spawn, writeFile, exists, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout1, stderr } = await execute(
			'TAQ_ARCHETYPE_IMAGE=completium/archetype:1.3.5 taq',
			'get-image --plugin archetype',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ completium/archetype:1.3.5 │']));

		const arl_file = await (await exec('cat e2e/data/arch-1.3.5-example.arl')).stdout;
		writeFile('./test-project/contracts/arch-1.3.5-example.arl', arl_file);

		const { stdout: stdout2, stderr: stderr1 } = await execute(
			'taq',
			'compile arch-1.3.5-example.arl',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['│ completium/archetype:1.3.5 │']));

		await exists(`./test-project/artifacts/arch-1.3.5-example.tz`);

		await cleanup();
	});

	test('compile will require the plugin argument when other compile plugins are installed', async () => {
		const { execute, spawn, writeFile, exists, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const arl_file = await (await exec('cat e2e/data/fa12.arl')).stdout;
		writeFile('./test-project/contracts/fa12.arl', arl_file);

		const { stdout: stdout2, stderr: stderr1 } = await execute(
			'taq',
			'compile fa12.arl --plugin @taqueria/plugin-archetype',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['│ fa12.arl │ artifacts/fa12.tz │']));

		await exists(`./test-project/artifacts/fa12.tz`);

		await cleanup();
	});
});
