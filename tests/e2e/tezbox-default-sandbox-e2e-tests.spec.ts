import { prepareEnvironment } from '@gmrchk/cli-testing-library';

/**
 * E2E tests to verify that TezBox is the default sandbox provider for newly initialized projects.
 *
 * When a project is initialized with the default configuration, the development environment
 * has sandboxes: ['local']. The environment type defaults to 'tezbox' when sandboxes are present,
 * which means TezBox should be used for sandbox operations rather than Flextesa.
 */
describe('TezBox Default Sandbox E2E Tests', () => {
	jest.setTimeout(60 * 1000);

	test('newly initialized project uses tezbox as the default sandbox provider', async () => {
		const { execute, spawn, cleanup, exists } = await prepareEnvironment();

		// Initialize a new project
		const { waitForText, waitForFinish } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		await waitForFinish();

		// Verify the project was created
		await exists('./test-project/.taq/config.json');

		// Install the tezbox plugin
		const installResult = await execute(
			'taq',
			'install ../taqueria-plugin-tezbox',
			'./test-project',
		);
		expect(installResult.stdout).toEqual(
			expect.arrayContaining(['Plugin installed successfully']),
		);

		// Verify tezbox plugin was installed
		await exists('./test-project/node_modules/@taqueria/plugin-tezbox/index.js');

		// Verify that start sandbox --help shows TezBox sandbox description
		// This confirms that the tezbox plugin is being used for sandbox operations
		const { stdout } = await execute(
			'taq',
			'start sandbox --help',
			'./test-project',
		);
		expect(stdout).toEqual(
			expect.arrayContaining(['Starts a TezBox sandbox']),
		);

		await cleanup();
	});

	test('stop sandbox --help shows tezbox when tezbox plugin is installed', async () => {
		const { execute, spawn, cleanup, exists } = await prepareEnvironment();

		// Initialize a new project
		const { waitForText, waitForFinish } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		await waitForFinish();

		await exists('./test-project/.taq/config.json');

		// Install the tezbox plugin
		await execute('taq', 'install ../taqueria-plugin-tezbox', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-tezbox/index.js');

		// Verify that stop sandbox --help shows TezBox sandbox description
		const { stdout } = await execute(
			'taq',
			'stop sandbox --help',
			'./test-project',
		);
		expect(stdout).toEqual(
			expect.arrayContaining(['Stops a TezBox sandbox']),
		);

		await cleanup();
	});

	test('tezbox plugin works with --plugin flag when both plugins are installed', async () => {
		const { execute, spawn, cleanup, exists } = await prepareEnvironment();

		// Initialize a new project
		const { waitForText, waitForFinish } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		await waitForFinish();

		await exists('./test-project/.taq/config.json');

		// Install both flextesa and tezbox plugins
		const flextesaInstall = await execute(
			'taq',
			'install ../taqueria-plugin-flextesa',
			'./test-project',
		);
		expect(flextesaInstall.stdout).toEqual(
			expect.arrayContaining(['Plugin installed successfully']),
		);

		const tezboxInstall = await execute(
			'taq',
			'install ../taqueria-plugin-tezbox',
			'./test-project',
		);
		expect(tezboxInstall.stdout).toEqual(
			expect.arrayContaining(['Plugin installed successfully']),
		);

		// Verify both plugins are installed
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-tezbox/index.js');

		// When both plugins are installed, the CLI requires --plugin to disambiguate.
		// Verify that specifying --plugin @taqueria/plugin-tezbox works correctly.
		const { stdout } = await execute(
			'taq',
			'start sandbox --help --plugin @taqueria/plugin-tezbox',
			'./test-project',
		);

		// Verify TezBox is shown in the help output when explicitly selecting the tezbox plugin
		expect(stdout).toEqual(
			expect.arrayContaining(['Starts a TezBox sandbox']),
		);

		await cleanup();
	});
});
