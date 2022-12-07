import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('E2E Testing for taqueria CLI,', () => {
	test('Verify that taq --help gives the help menu for a non-initialized project', async () => {
		const { execute, cleanup } = await prepareEnvironment();

		const { code, stdout } = await execute(
			'taq',
			'--help',
		);

		expect(code).toBe(0);
		expect.arrayContaining(['taq scaffold ']);

		await cleanup();
	});

	test('Verify that taq --help gives the help menu for an initialized project', async () => {
		const { execute, cleanup } = await prepareEnvironment();

		const { code } = await execute(
			'taq',
			'--help -p auto-test-cli',
		);

		expect(code).toBe(0);
		expect.arrayContaining(['taq install <pluginName> ']);

		await cleanup();
	});

	test('Verify that taq reports a version', async () => {
		const { execute, cleanup } = await prepareEnvironment();

		const { code, stdout } = await execute(
			'taq',
			'--version',
		);

		expect(code).toBe(0);

		expect(stdout[0].toString().trim()).toMatch(
			/^((v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)|(dev-[\w-]+)|main?|(\d+)-[\w-]+)$/,
		);

		await cleanup();
	});

	test('Verify that build reports build information about the version', async () => {
		const { execute, cleanup } = await prepareEnvironment();

		const { code, stdout } = await execute(
			'taq',
			'--build',
		);

		expect(code).toBe(0);
		expect(stdout[0].trim()).toMatch(/^\w+$/);

		await cleanup();
	});

	test('Verify that trying a command that is not available returns an error', async () => {
		const { execute, cleanup } = await prepareEnvironment();

		const { code, stderr } = await execute(
			'taq',
			'compile -p foobar',
		);

		expect(code).toBe(1);
		expect.arrayContaining(["Taqueria isn't aware of this task. Perhaps you need to install a plugin first?"]);

		await cleanup();
	});

	test('Verify that trying to install a package that does not exist returns an error', async () => {
		const { execute, cleanup } = await prepareEnvironment();

		const { code } = await execute(
			'taq',
			'install acoupleofecadhamburgers -p foobar',
		);

		expect(code).toBe(1);
		expect.arrayContaining(['Could not read.*acoupleofecadhamburgers']);

		await cleanup();
	});

	test('Verify that ligo and smartpy expose the plugin choice option for compile in the help menu', async () => {
		const { execute, cleanup } = await prepareEnvironment();

		const { code } = await execute(
			'taq',
			'install ../../../taqueria-plugin-ligo -p foobar',
		);

		await execute(
			'taq',
			'install ../../../taqueria-plugin-smartpy -p foobar',
		);

		await execute(
			'taq',
			'--help --projectDir=foobar',
		);

		expect(code).toBe(1);
		expect.arrayContaining(['taq ligo ']);

		const {} = await execute(
			'taq',
			'uninstall @taqueria/plugin-ligo -p foobar',
		);

		const {} = await execute(
			'taq',
			'uninstall @taqueria/plugin-smartpy -p foobar`',
		);

		await cleanup();
	});
});
