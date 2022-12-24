import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { ExecException } from 'child_process';
import { exec as exec1, execSync } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import * as contents from './data/help-contents/help-contents';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

describe('E2E Testing for taqueria CLI,', () => {
	const taqueriaProjectPath = 'auto-test-cli';

	test('Verify that taq --help gives the help menu for a non-initialized project', async () => {
		const { spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', '--help');
		await waitForText('taq scaffold');
		await cleanup();
	});

	test.skip('Verify that taq --help gives the help menu for an initialized project', async () => {
		const { spawn, execute, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout, code } = await execute('taq', '--help -p test-project');
		expect(stdout).toContain('taq [command]');
		expect(code).toBe(0);
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

	test('Verify that build reports build information about the version', async () => {
		const { execute, cleanup } = await prepareEnvironment();
		const { code, stdout } = await execute('taq', '--build');
		expect(code).toBe(0);
		expect(stdout[0].trim()).toMatch(/^\w+$/);
		await cleanup();
	});

	test('Verify that trying a command that is not available returns an error', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'compile sourcefile.ligo');
		expect(code).toBe(1);
		await cleanup();
	});

	test('Verify that trying to install a package that does not exist returns an error', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { code } = await execute('taq', 'install acoupleofecadhamburgers -p foobar');
		expect(code).toBe(1);
		await cleanup();
	});
});
