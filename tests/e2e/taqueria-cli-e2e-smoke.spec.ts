import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import util from 'util';

const exec = util.promisify(exec1);

describe('Smoke Test E2E Testing for Taqueria CLI,', () => {
	test('init will create the correct directory structure', async () => {
		const { spawn, cleanup, exists } = await prepareEnvironment();
		const { waitForText, waitForFinish } = await spawn('taq', 'init temp');
		await waitForText("Project taq'ified!");

		await exists('./artifacts');
		await exists('./contracts');
		await waitForFinish();

		await cleanup();
	});

	test('init will create a package.json file with only {}', async () => {
		const { spawn, cleanup, execute, readFile, writeFile } = await prepareEnvironment();
		const { waitForFinish } = await spawn('taq', 'init test-project');
		await writeFile('./test-project/package.json', '{}');

		const {} = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await waitForFinish();

		const content = await readFile('./test-project/package.json');
		expect(content).toContain('"name": "test-project"');

		await cleanup();
	});

	test('--help will offer the help menu for a non-initialized project', async () => {
		const { spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', '--help');
		await waitForText('taq init [projectDir]');

		await cleanup();
	});

	test('--help will offer help for an initialized project', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', '--help', './test-project');
		expect(stdout).toContain('taq <command>');

		await cleanup();
	});

	test('--plugin parameter is required', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const mligo_file = await (await exec('cat e2e/data/ligo-data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const tests_file = await (await exec('cat e2e/data/ligo-data/hello-tacos-tests.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos-tests.mligo', tests_file);

		const { stderr } = await execute('taq', 'test hello-tacos-tests.mligo', './test-project/');
		expect(stderr).toContain('Missing required argument: plugin');

		await cleanup();
	});

	test('--version will report a version', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { code, stdout } = await execute('taq', '--version');
		expect(code).toBe(0);
		expect(stdout[0].toString().trim()).toMatch(
			/^((v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)|(dev-[\w-]+)|main?|(\d+)-[\w-]+)$/,
		);
		await cleanup();
	});

	test('build will report build information about the version', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { code, stdout } = await execute('taq', '--build');
		expect(code).toBe(0);
		expect(stdout[0].trim()).toMatch(/^\w+$/);
		await cleanup();
	});

	test('calling a non available command will error', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stderr } = await execute('taq', 'compile sourcefile.ligo', './test-project');
		expect(stderr).toContain("Taqueria isn't aware of this task. Perhaps you need to install a plugin first?");
		await cleanup();
	});

	// TODO - blocked by https://github.com/ecadlabs/taqueria/issues/1692
	test.skip('(quickstart scenario) - ligo compile will create an artifact from three files ', async () => {
		const { execute, spawn, cleanup, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat e2e/data/ligo-data/counter.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.mligo', mligo_file);

		const storage_file = await (await exec(`cat e2e/data/ligo-data/counter.storageList.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.storageList.mligo', storage_file);

		const permissions_file = await (await exec(`cat e2e/data/ligo-data/counter.parameterList.mligo`)).stdout;
		await writeFile('./test-project/contracts/counter.parameterList.mligo', permissions_file);

		const {} = await execute('taq', 'add-contract counter.mligo', './test-project');
		const {} = await execute('taq', 'add-contract counter.parameterList.mligo', './test-project');
		const {} = await execute('taq', 'add-contract counter.storageList.mligo', './test-project');

		const contracts_list = await ls('./test-project/contracts');
		expect(contracts_list).toEqual(
			expect.arrayContaining(['counter.mligo', 'counter.parameterList.mligo', 'counter.storageList.mligo']),
		);

		const { stdout: stdout1 } = await execute('taq', 'compile counter.mligo', './test-project');

		expect(stdout1).toMatchInlineSnapshot(`
              [
                "┌─────────────────────────────┬───────────────────────────────────────────────┐",
                "│ Contract                    │ Artifact                                      │",
                "├─────────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.mligo               │ artifacts/counter.tz                          │",
                "├─────────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.storageList.mligo   │ artifacts/counter.default_storage.tz          │",
                "│                             │ artifacts/counter.storage.another_count.tz    │",
                "├─────────────────────────────┼───────────────────────────────────────────────┤",
                "│ counter.parameterList.mligo │ artifacts/counter.parameter.increment_by_3.tz │",
                "└─────────────────────────────┴───────────────────────────────────────────────┘",
              ]
          `);

		await cleanup();
	});
});
