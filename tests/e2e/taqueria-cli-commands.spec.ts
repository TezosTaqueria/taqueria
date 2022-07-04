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
			await exec('taq --help').catch(
				(err: ExecException & { stdout: string; stderr: string }) => {
					expect(err.code).toEqual(1);
					expect(err.stderr).toBe(contents.helpContentsNoProject);
				},
			);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq --help gives the help menu for an initialized project', async () => {
		try {
			await exec(`taq --help -p ${taqueriaProjectPath}`).catch(
				(err: ExecException & { stdout: string; stderr: string }) => {
					expect(err.code).toEqual(1);
					expect(err.stderr).toBe(contents.helpContentsForProject);
				},
			);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq reports a version', () => {
		const version = execSync('taq --version');
		try {
			expect(version.toString('utf8').trim()).toMatch(
				/^((v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)|(dev-[\w-]+)|(\d+)-[\w-]+)$/,
			);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that build reports build information about the version', () => {
		const build = execSync('taq --build');
		try {
			expect(build.toString('utf8').trim()).toMatch(/^\w+$/);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the ligo plugin exposes the associated commands in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);

			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoPlugin);

			await exec(`taq uninstall @taqueria/plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the ligo plugin exposes the associated options in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the ligo plugin aliases expose the correct info in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoAliasCHelpContents = await exec(`taq c --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoAliasCHelpContents.stdout).toBe(contents.helpContentsLigoPluginSpecific);

			const ligoAliasCompileLigoHelpContents = await exec(
				`taq compile-ligo --help --projectDir=${taqueriaProjectPath}`,
			);
			expect(ligoAliasCompileLigoHelpContents.stdout).toBe(contents.helpContentsLigoPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the smartpy plugin exposes the associated commands in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const smartpyHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(smartpyHelpContents.stdout).toBe(contents.helpContentsSmartpyPlugin);

			await exec(`taq uninstall @taqueria/plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the smartpy plugin exposes the associated options in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const smartpyHelpContents = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(smartpyHelpContents.stdout).toBe(contents.helpContentsSmartpyPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the smartpy plugin aliases expose the correct info in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const smartpyAliasCHelpContents = await exec(`taq c --help --projectDir=${taqueriaProjectPath}`);
			expect(smartpyAliasCHelpContents.stdout).toBe(contents.helpContentsSmartpyPluginSpecific);

			const smartpyAliasCompileLigoHelpContents = await exec(
				`taq compile-smartpy --help --projectDir=${taqueriaProjectPath}`,
			);
			expect(smartpyAliasCompileLigoHelpContents.stdout).toBe(contents.helpContentsSmartpyPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the taquito plugin exposes the associated commands in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-taquito`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const taquitoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPlugin);

			await exec(`taq uninstall @taqueria/plugin-taquito`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the taquito plugin exposes the associated options in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-taquito`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const taquitoHelpContents = await exec(`taq deploy --help --projectDir=${taqueriaProjectPath}`);
			expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-taquito`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the taquito plugin aliases expose the correct info in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-taquito`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const taquitoHelpContents = await exec(`taq originate --help --projectDir=${taqueriaProjectPath}`);
			expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-taquito`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the archetype plugin exposes the associated commands in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const archetypeHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(archetypeHelpContents.stdout).toBe(contents.helpContentsArchetypePlugin);

			await exec(`taq uninstall @taqueria/plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the archetype plugin exposes the associated options in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const archetypeHelpContents = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(archetypeHelpContents.stdout).toBe(contents.helpContentsArchetypePluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the archetype plugin aliases expose the correct info in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const archetypeAliasCHelpContents = await exec(`taq c --help --projectDir=${taqueriaProjectPath}`);
			expect(archetypeAliasCHelpContents.stdout).toBe(contents.helpContentsArchetypePluginSpecific);

			const archetypeAliasCompileArchetypeHelpContents = await exec(
				`taq compile-archetype --help --projectDir=${taqueriaProjectPath}`,
			);
			expect(archetypeAliasCompileArchetypeHelpContents.stdout).toBe(contents.helpContentsArchetypePluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated commands in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const flextesaHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(contents.helpContentsFlextesaPlugin);

			await exec(`taq uninstall @taqueria/plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated option for starting a sandbox in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const flextesaHelpContents = await exec(`taq start sandbox --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(contents.helpContentsFlextesaPluginStartSandbox);

			await exec(`taq uninstall @taqueria/plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated alias for starting a sandbox in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const flextesaHelpContents = await exec(`taq start --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(contents.helpContentsFlextesaPluginStartSandbox);

			await exec(`taq uninstall @taqueria/plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated option for stopping a sandbox in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const flextesaHelpContents = await exec(`taq stop sandbox --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(contents.helpContentsFlextesaPluginStopSandbox);

			await exec(`taq uninstall @taqueria/plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated alias for stopping a sandbox in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const flextesaHelpContents = await exec(`taq stop --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(contents.helpContentsFlextesaPluginStopSandbox);

			await exec(`taq uninstall @taqueria/plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated option for listing sandbox accounts in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const flextesaHelpContents = await exec(`taq list accounts --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(contents.helpContentsFlextesaPluginListAccounts);

			await exec(`taq uninstall @taqueria/plugin-flextesa`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the contract types plugin exposes the associated commands in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-contract-types`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const generateTypesHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(generateTypesHelpContents.stdout).toBe(contents.helpContentsGenerateTypesPlugin);

			await exec(`taq uninstall @taqueria/plugin-contract-types`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the contract types plugin exposes the associated options in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-contract-types`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const generateTypesHelpContents = await exec(`taq generate types --help --projectDir=${taqueriaProjectPath}`);
			expect(generateTypesHelpContents.stdout).toBe(contents.helpContentsGenerateTypesPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-contract-types`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the contract types plugin exposes the associated aliases in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-contract-types`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const generateTypesHelpContentsGen = await exec(`taq gen --help --projectDir=${taqueriaProjectPath}`);
			expect(generateTypesHelpContentsGen.stdout).toBe(contents.helpContentsGenerateTypesPluginSpecific);

			const generateTypesHelpContentsGenTypes = await exec(`taq gentypes --help --projectDir=${taqueriaProjectPath}`);
			expect(generateTypesHelpContentsGenTypes.stdout).toBe(contents.helpContentsGenerateTypesPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-contract-types`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the jest plugin exposes the associated commands in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-jest`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const jestHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);

			expect(jestHelpContents.stdout).toBe(contents.helpContentsJestPlugin);

			await exec(`taq uninstall @taqueria/plugin-jest`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the jest plugin exposes the associated options in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-jest`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const jestHelpContents = await exec(`taq test --help --projectDir=${taqueriaProjectPath}`);
			expect(jestHelpContents.stdout).toBe(contents.helpContentsJestPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-jest`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the jest plugin aliases expose the correct info in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-jest`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const jestAliasCHelpContents = await exec(`taq jest --help --projectDir=${taqueriaProjectPath}`);
			expect(jestAliasCHelpContents.stdout).toBe(contents.helpContentsJestPluginSpecific);

			await exec(`taq uninstall @taqueria/plugin-jest`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that ligo and smartpy expose the plugin choice option for compile in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
			await exec(`taq install ../../../taqueria-plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoSmartpy);

			await exec(`taq uninstall @taqueria/plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
			await exec(`taq uninstall @taqueria/plugin-smartpy`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that ligo and archetype expose the plugin choice option for compile in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
			await exec(`taq install ../../../taqueria-plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoArchetype);

			await exec(`taq uninstall @taqueria/plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
			await exec(`taq uninstall @taqueria/plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that ligo and archetype expose the plugin choice option for compile in the help menu', async () => {
		try {
			await exec(`taq install ../../../taqueria-plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
			await exec(`taq install ../../../taqueria-plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });

			// TODO: This can removed after this is resolved:
			// https://github.com/ecadlabs/taqueria/issues/528
			try {
				await exec(`taq -p ${taqueriaProjectPath}`);
			} catch (_) {}

			const ligoHelpContents = await exec(`taq compile --help --projectDir=${taqueriaProjectPath}`);
			expect(ligoHelpContents.stdout).toBe(contents.helpContentsLigoArchetypeSpecific);

			await exec(`taq uninstall @taqueria/plugin-ligo`, { cwd: `./${taqueriaProjectPath}` });
			await exec(`taq uninstall @taqueria/plugin-archetype`, { cwd: `./${taqueriaProjectPath}` });
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
			await exec(`taq install acoupleofecadhamburgers`, { cwd: `./${taqueriaProjectPath}` }).catch(
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
