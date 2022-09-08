import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject, getContainerID, getContainerName } from './utils/utils';
const exec = util.promisify(exec1);
import * as flexContents from './data/help-contents/flextesa-contents';

const taqueriaProjectPath = 'e2e/auto-test-flextesa-plugin';
let dockerName: string;

// TODO: to be moved into a different spec file when the tezos-client plugin no longer depends on the flextesa plugin.
// If I move it now, testing won't work.
// Starting docker in e2e/auto-test-flextesa-plugin and then e2e/auto-test-tezos-client-plugin won't work
// One solution is to have an extra parameter for the container name (docker run --name <the name>) when starting one.
// Right now it's "hardcoded" (in a sense) to be the same as the sandbox name.
// This might fix the problem because, right now, when we test flextesa and tezos-client at the same time
// (assuming we moved all tezos-client tests to its own spec file), it will start the container for flextesa.spec,
// but then it will attempt to start another container for tezos-client.spec in parallel, which would be a "no-op"
// since a container is already running. However, this container was started using a volume associated with the e2e/auto-test-flextesa-plugin.
// As a result, when running tests in tezos-client.spec, it will complain that files don't exist.

describe('E2E Testing for taqueria flextesa plugin sandbox starts/stops', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['flextesa']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}
	});

	test('Verify that the flextesa plugin exposes the associated commands in the help menu', async () => {
		try {
			const flextesaHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(flexContents.helpContentsFlextesaPlugin);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated option for starting a sandbox in the help menu', async () => {
		try {
			const flextesaHelpContents = await exec(`taq start sandbox --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(flexContents.helpContentsFlextesaPluginStartSandbox);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated alias for starting a sandbox in the help menu', async () => {
		try {
			const flextesaHelpContents = await exec(`taq start --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(flexContents.helpContentsFlextesaPluginStartSandbox);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated option for stopping a sandbox in the help menu', async () => {
		try {
			const flextesaHelpContents = await exec(`taq stop sandbox --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(flexContents.helpContentsFlextesaPluginStopSandbox);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated alias for stopping a sandbox in the help menu', async () => {
		try {
			const flextesaHelpContents = await exec(`taq stop --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(flexContents.helpContentsFlextesaPluginStopSandbox);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the flextesa plugin exposes the associated option for listing sandbox accounts in the help menu', async () => {
		try {
			const flextesaHelpContents = await exec(`taq list accounts --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(flexContents.helpContentsFlextesaPluginListAccounts);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria flextesa plugin can start and stop a default sandbox without specifying name', async () => {
		try {
			// Setting up docker container name
			dockerName = 'local';

			// 1. Run sandbox start command
			const sandboxStart = await exec(`taq start sandbox`, { cwd: `./${taqueriaProjectPath}` });

			// 2. Verify that sandbox has been started and taqueria returns proper message into console
			expect(sandboxStart.stdout).toContain(`Started ${dockerName}.`);
			expect(sandboxStart.stdout).toContain(`Done.`);

			// 3. Verify that docker container has been started
			const dockerContainerTest = await getContainerName(dockerName);
			expect(dockerContainerTest).toContain(`taq-flextesa-${dockerName}`);
			const dockerContainerID = await getContainerID(dockerName);

			// 5.  Run stop command and verify the output
			const sandboxStop = await exec(`taq stop sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });

			// 5. Verify that taqueria returns proper message into console
			expect(sandboxStop.stdout).toContain(`Stopped ${dockerName}.\n`);
			const dockerContainerStopID = await getContainerID(dockerName);
			expect(dockerContainerStopID).not.toContain(dockerContainerID);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria flextesa plugin can start and stop a custom name sandbox', async () => {
		try {
			// Setting up docker container name
			dockerName = 'test';

			// 1. Run sandbox start command
			await exec(`cp e2e/data/config-flextesa-test-sandbox.json ${taqueriaProjectPath}/.taq/config.json`);
			const sandboxStart = await exec(`taq start sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });

			// 2. Verify that sandbox has been started and taqueria returns proper message into console
			expect(sandboxStart.stdout).toContain(`Started ${dockerName}.`);

			// 3. Verify that docker container has been started
			const dockerContainerTest = await getContainerName(dockerName);
			expect(dockerContainerTest).toContain(`${dockerName}`);

			// 5.  Run stop command and verify the output
			const sandboxStop = await exec(`taq stop sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });

			// 5. Verify that taqueria returns proper message into console
			expect(sandboxStop.stdout).toContain(`Stopped ${dockerName}.`);
			const dockerContainerStopTest = await getContainerName(dockerName);
			expect(dockerContainerStopTest).toBe('');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria flextesa plugin will return "The local sandbox was not running." if user tries to call stop on sandbox that is not running', async () => {
		try {
			// 1. Run stop sandbox local on sandbox that is not running and verify result
			const sandboxWasNotRunning = await exec('taq stop sandbox local', { cwd: `./${taqueriaProjectPath}` });
			expect(sandboxWasNotRunning.stdout).toEqual('The local sandbox was not running.\n');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria flextesa plugin will return "The local sandbox is not running." if user tries to retrieve list of accounts that is not running', async () => {
		try {
			// 1. Run list accounts command on sandbox that is not running and verify result
			const stdoutSandboxIsNotRunning = await exec('taq list accounts local', { cwd: `./${taqueriaProjectPath}` });
			expect(stdoutSandboxIsNotRunning.stderr).toEqual('The local sandbox is not running.\n');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria flextesa plugin will return "Already running." if sandbox has started" if user tries to call start sandbox twice', async () => {
		try {
			dockerName = 'local';

			// 1. Run sandbox start command
			await exec(`taq start sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });

			// 2.  Run start command second time and verify the output
			const sandboxStart = await exec(`taq start sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
			expect(sandboxStart.stdout).toEqual('Already running.\n');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// TODO: Currently it cannot be done until this issue has been resolved
	// Issue to implement test: https://github.com/ecadlabs/taqueria/issues/366
	// Related developer issue: https://github.com/ecadlabs/taqueria/issues/243
	test.skip('Verify that taqueria flextesa plugin can retrieve data from updated config after restart', async () => {
		try {
			// Setting up docker container name
			dockerName = 'local';

			// 1. Start sandbox

			// 2. Check balance

			// 3. Stop sandbox

			// 4. Update config

			// 5. start sandbox again

			// 6. Check balance again and see that it changed
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Clean up process to stop container if it was not stopped properly during the test
	afterEach(async () => {
		try {
			await exec(`taq stop sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
		} catch {}
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
