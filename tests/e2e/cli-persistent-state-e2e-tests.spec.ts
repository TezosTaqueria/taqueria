import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import utils from 'util';
const exec = utils.promisify(exec1);

describe('Persistent State E2E Tests for Taqueria CLI', () => {
	test('taqueria will create a development-state file', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat e2e/data/ligo-legacy-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		await execute('taq', 'compile hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/development-state.json');

		await cleanup();
	});

	test('taqueria will create a development-state file when there is no default environment in the config', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat e2e/data/config-data/config-without-default-environment.json')).stdout;
		writeFile('./test-project/.taq/config.json', config_file);
		const mligo_file = await (await exec('cat e2e/data/ligo-legacy-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		await execute('taq', 'compile hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/development-state.json');

		await cleanup();
	});

	test('taqueria will create a testing-state file when the default in the config is set to testing', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat e2e/data/config-data/config-default-environment-testing.json')).stdout;
		writeFile('./test-project/.taq/config.json', config_file);
		const mligo_file = await (await exec('cat e2e/data/ligo-legacy-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		await execute('taq', 'compile hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/development-state.json');
		await exists('./test-project/.taq/testing-state.json');

		await cleanup();
	});

	test('taqueria will create a testing-state file when the test environment is specified using the CLI', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec('cat e2e/data/ligo-legacy-data/hello-tacos.mligo')).stdout;
		writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		await execute('taq', 'compile -e testing hello-tacos.mligo', './test-project');
		await exists('./test-project/artifacts/hello-tacos.tz');
		await exists('./test-project/.taq/testing-state.json');

		await cleanup();
	});
});
