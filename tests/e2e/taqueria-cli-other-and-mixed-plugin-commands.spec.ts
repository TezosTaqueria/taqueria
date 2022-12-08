import { exec as exec1, execSync } from 'child_process';
import type { ExecException } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import * as contents from './data/help-contents/help-contents';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = './scrap/auto-test-cli';

describe('E2E Testing for taqueria CLI,', () => {
	beforeAll(() => generateTestProject(taqueriaProjectPath));

	test('Verify that taq --help gives the help menu for a non-initialized project', async () => {
		const output = await exec('taq --help');
		expect(output.stdout).toBe(contents.helpContentsNoProject);
	});

	test('Verify that taq --help gives the help menu for an initialized project', async () => {
		try {
			const output = await exec(`taq --help -p ${taqueriaProjectPath}`);
			await exec(`cp -r ${taqueriaProjectPath} ${taqueriaProjectPath}-backup`);
			expect(output.stdout).toBe(contents.helpContentsForProject);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq reports a version', () => {
		const version = execSync('taq --version');
		try {
			expect(version.toString('utf8').trim()).toMatch(
				/^((v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)|(dev-[\w-]+)|main?|(\d+)-[\w-]+)$/,
			);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that build reports build information about the version', async () => {
		const build = await exec('taq --build');
		try {
			expect(build.stdout.trim()).toMatch(/^\w+$/);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that trying a command that is not available returns an error', async () => {
		try {
			await exec(`taq compile -p ${taqueriaProjectPath}`).catch(
				(err: ExecException & { stdout: string; stderr: string }) => {
					expect(err.code).toEqual(5);
					expect(err.stderr).toContain(
						"Taqueria isn't aware of this task. Perhaps you need to install a plugin first?",
					);
				},
			);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that trying to install a package that does not exist returns an error', async () => {
		try {
			await exec(`taq install acoupleofecadhamburgers -p ${taqueriaProjectPath}`).catch(
				(err: ExecException & { stdout: string; stderr: string }) => {
					const pattern = /Could not read.*acoupleofecadhamburgers\/package\.json$/m;
					expect(err.code).toEqual(9);
					expect(err.stderr).toMatch(pattern);
				},
			);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that ligo and smartpy expose the plugin choice option for compile in the help menu', async () => {
		await exec(`taq install ../../../taqueria-plugin-ligo -p ${taqueriaProjectPath}`);
		await exec(`taq install ../../../taqueria-plugin-smartpy -p ${taqueriaProjectPath}`);

		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}

		const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
		await exec(`cp -r ${taqueriaProjectPath} ${taqueriaProjectPath}-backup`);
		expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoSmartpy);

		await exec(`taq uninstall @taqueria/plugin-ligo -p ${taqueriaProjectPath}`);
		await exec(`taq uninstall @taqueria/plugin-smartpy -p ${taqueriaProjectPath}`);
	});

	test('Verify that ligo and archetype expose the plugin choice option in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo -p ${taqueriaProjectPath}`);
			await exec(`taq install ../../../taqueria-plugin-archetype -p ${taqueriaProjectPath}`);

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoArchetype);

			await exec(`taq uninstall @taqueria/plugin-ligo -p ${taqueriaProjectPath}`);
			await exec(`taq uninstall @taqueria/plugin-archetype -p ${taqueriaProjectPath}`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that friendly error messages are displayed when config is invalid', async () => {
		await exec(`sed -i -e "s/\\"contracts\\"/123/" ${taqueriaProjectPath}/.taq/config.json`);
		const { stderr } = await exec('taq || true', { cwd: taqueriaProjectPath });
		expect(stderr).toContain(`Your .taq/config.json is invalid:\ncontractsDir: Expected string, received number`);
	}, 10000);

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(() => fsPromises.rm(taqueriaProjectPath, { recursive: true }));
});
