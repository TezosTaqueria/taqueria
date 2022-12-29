import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { ExecException } from 'child_process';
import { exec as exec1, execSync } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import * as contents from './data/help-contents/help-contents';
import { generateTestProject } from './utils/utils';
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
		await waitForText('taq scaffold');

		await cleanup();
	});

	test.skip('--help will offer help for an initialized project', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', '--help -p test-project');
		expect(stdout).toContain('taq [command]');

		await cleanup();
	});

	test('Verify that taq reports a version', async () => {
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
		const { code } = await execute('taq', 'compile sourcefile.ligo');
		expect(code).toBe(1);
		await cleanup();
	});

	test('install a package that does not exist will  error', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install acoupleofecadhamburgers -p foobar');
		expect(code).toBe(1);
		await cleanup();
	});
});