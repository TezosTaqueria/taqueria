import { exec as exec1, execSync } from 'child_process';
import type { ExecException } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';
import util from 'util';
import * as contents from './data/help-contents';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = './e2e/auto-test-cli';

describe('E2E Testing for taqueria CLI,', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath);
	});

	test('Verify that taq --help gives the help menu for a non-initialized project', async () => {
		try {
			const output = await exec('taq --help');
			expect(output.stdout).toBe(contents.helpContentsNoProject);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq --help gives the help menu for an initialized project', async () => {
		try {
			const output = await exec(`taq --help -p ${taqueriaProjectPath}`);
			expect(output.stdout).toBe(contents.helpContentsForProject);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq reports a version', async () => {
		const version = await exec('taq --version');
		try {
			expect(version.stdout.trim()).toMatch(/^((v\d+\.\d+\.\d+)|(dev-[\w-]+)|(\d+)-[\w-]+)$/);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.only('Verify that build reports build information about the version', async () => {
		const build = await exec('taq --build');
		try {
			expect(build.stdout.trim()).toMatch(/^\w+$/);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that ligo and smartpy expose the plugin choice option for compile in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo -p ${taqueriaProjectPath}`);
			await exec(`taq install ../../../taqueria-plugin-smartpy -p ${taqueriaProjectPath}`);

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoSmartpy);

			await exec(`taq uninstall @taqueria/plugin-ligo -p ${taqueriaProjectPath}`);
			await exec(`taq uninstall @taqueria/plugin-smartpy -p ${taqueriaProjectPath}`);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that ligo and archetype expose the plugin choice option for compile in the help menu', async () => {
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

	test('Verify that ligo and archetype expose the plugin choice option for compile in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo -p ${taqueriaProjectPath}`);
			await exec(`taq install ../../../taqueria-plugin-archetype -p ${taqueriaProjectPath}`);

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoArchetypeSpecific);

			await exec(`taq uninstall @taqueria/plugin-ligo -p ${taqueriaProjectPath}`);
			await exec(`taq uninstall @taqueria/plugin-archetype -p ${taqueriaProjectPath}`);
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

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(() => {
		try {
			fs.rmSync(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
