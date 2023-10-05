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

		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await waitForFinish();

		const content = await readFile('./test-project/package.json');
		expect(content).toContain('"name": "test-project"');

		await cleanup();
	});

	test('a BETA warning will be inluded in the help content', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', '--help', './test-project');
		expect(stdout).toContain('Please be advised that Taqueria is currently in BETA.');

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

	describe('slow tests due to having to pull docker images', () => {
		jest.setTimeout(60 * 1000);

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
	});

	test('--version will report a version', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { code, stdout } = await execute('taq', '--version');
		expect(code).toBe(0);
		// First pattern - vX.Y.Z
		// Second pattern - dev-<branch-name>
		// Third pattern: <PR-number>-merge
		// Fourth pattern: main
		expect(stdout[0].toString().trim()).toMatch(/^(v?\d+\.(0?\d+|\d+)\.?(0?\d*)|dev-[A-Za-z0-9-_\.]+|\d+-merge|main)$/);
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

	test('can uninstall plugins', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const result = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(result.stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		expect(result.stderr.join().trim()).toEqual('');
	});

	describe('various regressions', () => {
		test('regression against #1911, opt-in to anonymous usage analytics works for first-time users', async () => {
			const { execute, spawn, cleanup } = await prepareEnvironment();

			// Setup project
			const { waitForText } = await spawn('taq', 'init test-project');
			await waitForText("Project taq'ified!");

			// Remove the analytics file
			await exec('rm $HOME/.taq-settings/taq-settings.json').catch(() => {});

			// Run the command
			const results = await execute('taq', 'opt-in --yes', './test-project');
			expect(results.stderr).not.toContain('Path does not exist: {{homedir}}/.taq-settings/taq-settings.json');
			expect(results.stdout).toEqual([
				'You have successfully opted-in to sharing anonymous usage analytics.',
			]);

			// Cleanup
			await cleanup();
		});
	});
});
