import { ChildProcess, exec as exec1, spawn } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import {
	generateTestProject,
	getContainerID,
	getContainerImage,
	getContainerImages,
	getContainerName,
	sleep,
} from './utils/utils';
const exec = util.promisify(exec1);
import * as flexContents from './data/help-contents/flextesa-contents';

const taqueriaProjectPath = 'scrap/auto-test-flextesa-plugin';
let sandboxName: string;

// List of child processes that will need to be cleanup after test case finishes
// These processes will be killed in the afterAll() hook
const processes: ChildProcess[] = [];

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
		try {
			await fsPromises.rm(taqueriaProjectPath, { recursive: true, force: true });
		} catch {}
		await generateTestProject(taqueriaProjectPath, ['flextesa']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch {}
	});

	// TODO: may add it add later
	test.skip('Verify that an environment variable can override the flextesa docker image', async () => {
		sandboxName = 'local';
		const imageName = 'ghcr.io/ecadlabs/taqueria-flextesa:1429-merge-1ccbcc8';

		const sandboxStart = await exec(`TAQ_ECAD_FLEXTESA_IMAGE=${imageName} taq start sandbox`, {
			cwd: `./${taqueriaProjectPath}`,
			// Cannot use the env property as it replaces the environment, which
			// contains the PATH for how to find the `taq` binary
			// env: {'TAQ_FLEXTESA_IMAGE': imageName}
		});

		// 2. Verify that sandbox has been started and taqueria returns proper message into console
		expect(sandboxStart.stdout).toContain(`The sandbox "${sandboxName}" is ready.`);

		// 3. Verify that docker container has been started
		const dockerContainerTest = await getContainerName(sandboxName);
		expect(dockerContainerTest).toContain(`taq-flextesa-${sandboxName}`);
		expect(await getContainerImage(sandboxName)).toBe(imageName);

		// 4.  Run stop command and verify the output
		const sandboxStop = await exec(`TAQ_ECAD_FLEXTESA_IMAGE=${imageName} taq stop sandbox ${sandboxName}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		await sleep(2500);
	});

	// Skipped due to changes in help output, such as `taq bake` being added
	test.skip('Verify that the flextesa plugin exposes the associated commands in the help menu', async () => {
		try {
			const flextesaHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(flextesaHelpContents.stdout).toBe(flexContents.helpContentsFlextesaPlugin);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// failing in CICD Dec. 14, 2022
	test.skip('Verify that the flextesa plugin exposes the associated option for starting a sandbox in the help menu', async () => {
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
		// Setting up docker container name
		sandboxName = 'local';

		// 1. Run sandbox start command
		const sandboxStart = await exec(`taq start sandbox`, { cwd: `./${taqueriaProjectPath}` });

		// 2. Verify that sandbox has been started and taqueria returns proper message into console
		expect(sandboxStart.stdout).toContain(`The sandbox "${sandboxName}" is ready.`);

		// 3. Verify that docker container has been started
		const dockerContainerTest = await getContainerName(sandboxName);
		expect(dockerContainerTest).toContain(`taq-flextesa-${sandboxName}`);

		const dockerImageName = await getContainerImage(sandboxName);
		expect(dockerImageName).toContain('oxheadalpha/flextesa');

		// 4.  Run stop command and verify the output
		const sandboxStop = await exec(`taq stop sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
		await sleep(2500);

		// 5. Verify that taqueria returns proper message into console
		expect(sandboxStop.stdout).toContain(`Stopped ${sandboxName}.\n`);
		await sleep(2500);
	});

	test('Verify that taqueria flextesa plugin can start and stop a custom name sandbox', async () => {
		await exec(`cp e2e/data/config-flextesa-test-sandbox.json ${taqueriaProjectPath}/.taq/config.json`);
		await exec(`cp -r ${taqueriaProjectPath} ${taqueriaProjectPath}-backup`);

		// Setting up docker container name
		sandboxName = 'test';

		// 1. Run sandbox start command
		const sandboxStart = await exec(`taq start sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });

		// 2. Verify that sandbox has been started and taqueria returns proper message into console
		expect(sandboxStart.stdout).toContain(`The sandbox "${sandboxName}" is ready.`);

		// 3. Verify that docker container has been started
		const dockerContainerTest = await getContainerName(sandboxName);
		expect(dockerContainerTest).toContain(`${sandboxName}`);

		// 5.  Run stop command and verify the output
		const sandboxStop = await exec(`taq stop sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });

		// 5. Verify that taqueria returns proper message into console
		expect(sandboxStop.stdout).toContain(`Stopped ${sandboxName}.`);
		const dockerContainerStopTest = await getContainerName(sandboxName);
		expect(dockerContainerStopTest).toBe('');
	});

	test('Assure that the appropriate error is given when you attempt to start a sandbox without one in your config', async () => {
		// Preserve previous config so that we don't corrupt other tests
		await exec(`cp ${taqueriaProjectPath}/.taq/config.json ${taqueriaProjectPath}/.taq/config.json.old`);
		await exec(`cp e2e/data/config-no-sandboxes.json ${taqueriaProjectPath}/.taq/config.json`);
		expect.assertions(1);
		try {
			await exec(`taq start sandbox`, {
				cwd: `./${taqueriaProjectPath}`,
				// Cannot use the env property as it replaces the environment, which
				// contains the PATH for how to find the `taq` binary
				// env: {'TAQ_ECAD_FLEXTESA_IMAGE': imageName}
			});
		} catch (err) {
			const execErr = err as { stderr: string };
			expect(execErr.stderr).toContain(
				"No sandbox name was specified. We couldn't find a valid sandbox config for the current environment",
			);
		}

		// Restore config
		await exec(`cp ${taqueriaProjectPath}/.taq/config.json.old ${taqueriaProjectPath}/.taq/config.json`);
	});

	test('Assure that the appropriate error is given if you specify an invalid sandbox to start', async () => {
		expect.assertions(1);
		try {
			await exec(`taq start sandbox foobar`, {
				cwd: `./${taqueriaProjectPath}`,
				// Cannot use the env property as it replaces the environment, which
				// contains the PATH for how to find the `taq` binary
				// env: {'TAQ_ECAD_FLEXTESA_IMAGE': imageName}
			});
		} catch (err) {
			const execErr = err as { stderr: string };
			expect(execErr.stderr).toContain('There is no sandbox called foobar in your .taq/config.json.');
		}
	});

	test('Verify that a "show protocols" task outputs some known protocols', async () => {
		const cmd = await exec(`TAQ_ECAD_FLEXTESA_IMAGE=oxheadalpha/flextesa:20221026 taq show protocols`, {
			cwd: `./${taqueriaProjectPath}`,
			// Cannot use the env property as it replaces the environment, which
			// contains the PATH for how to find the `taq` binary
			// env: {'TAQ_ECAD_FLEXTESA_IMAGE': imageName}
		});

		expect(cmd.stdout).toContain('Kath');
	});

	// TODO skipping for now - I don't know why, but this test only works if run-in-band (-i) is specified
	test.skip('Verify that a baker daemon is started by default', async () => {
		await exec(`taq start sandbox local`, {
			cwd: `./${taqueriaProjectPath}`,
			// Cannot use the env property as it replaces the environment, which
			// contains the PATH for how to find the `taq` binary
			// env: {'TAQ_ECAD_FLEXTESA_IMAGE': imageName}
		});
		const containerName = await getContainerName('local');
		await exec(`docker exec ${containerName} ps | grep baker`);
		expect(true); // should not throw
	});

	test('Verify that an environment variable can override the flextesa docker image', async () => {
		sandboxName = 'override';
		const imageName = 'oxheadalpha/flextesa:20221026';

		await exec(`cp e2e/data/config-flextesa-test-sandbox.json ${taqueriaProjectPath}/.taq/config.json`);

		const sandboxStart = await exec(`TAQ_ECAD_FLEXTESA_IMAGE=${imageName} taq start sandbox ${sandboxName}`, {
			cwd: `./${taqueriaProjectPath}`,
			// Cannot use the env property as it replaces the environment, which
			// contains the PATH for how to find the `taq` binary
			// env: {'TAQ_ECAD_FLEXTESA_IMAGE': imageName}
		});

		// 2. Verify that sandbox has been started and taqueria returns proper message into console
		expect(sandboxStart.stdout).toContain(`The sandbox "${sandboxName}" is ready.`);

		// 3. Verify that docker container has been started
		const dockerContainerTest = await getContainerName(sandboxName);
		expect(dockerContainerTest).toContain(`taq-flextesa-${sandboxName}`);

		// Verify that the specific image is being used
		expect(await getContainerImage(sandboxName)).toContain(imageName);

		// 4.  Run stop command and verify the output
		await exec(`taq stop sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
		await sleep(5000);
	});

	test('Verify that taqueria flextesa plugin will return "The local sandbox was not running." if user tries to call stop on sandbox that is not running', async () => {
		// 1. Run stop sandbox local on sandbox that is not running and verify result
		const sandboxWasNotRunning = await exec('taq stop sandbox local', { cwd: `./${taqueriaProjectPath}` });
		expect(sandboxWasNotRunning.stdout).toEqual('The local sandbox was not running.\n');
	});

	test('Verify that taqueria flextesa plugin will return "The local sandbox is not running." if user tries to retrieve list of accounts that is not running', async () => {
		// 1. Run list accounts command on sandbox that is not running and verify result
		const stdoutSandboxIsNotRunning = await exec('taq list accounts local', { cwd: `./${taqueriaProjectPath}` });
		expect(stdoutSandboxIsNotRunning.stderr).toEqual('The local sandbox is not running.\n');
	});

	test('Verify that taqueria flextesa plugin will return "Already running." if sandbox has started" if user tries to call start sandbox twice', async () => {
		sandboxName = 'local';

		// 1. Run sandbox start command
		await exec(`taq start sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });

		// 2.  Run start command second time and verify the output
		const sandboxStart = await exec(`taq start sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
		expect(sandboxStart.stdout).toEqual('Already running.\n');
	});

	test.skip('Verify that Taqueria accepts any origin and does not emit any CORS related errors', async () => {
		// Start web server for preflight request
		const p = await spawn('npx', ['ws'], {
			// detached: true,
			shell: true,
		});
		processes.push(p); // store process for cleanup

		// Stop the sandbox
		await exec(`taq start sandbox local`, { cwd: `./${taqueriaProjectPath}` });

		// Give the sandbox some time to bake the genesis block
		await sleep(2000);

		// Get the port that the sandbox is running on
		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);
		const port = configContents.sandbox.local.rpcUrl;

		// Connect to the sandbox using a different origin (CORS test)
		const { stdout } = await exec(`curl -i -H "Origin: http://localhost:8080" ${port}/version`);

		// Stop the sandbox when done
		await exec(`taq stop sandbox local`, { cwd: `./${taqueriaProjectPath}` });

		// Assert that the connection to the sandbox via different origin was successful
		expect(stdout).toContain('HTTP/1.1 200 OK');
	});

	test('Verify that taqueria flextesa plugin can return list of accounts from a sandbox', async () => {
		sandboxName = 'local';
		await exec(`taq start sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });

		const accounts = await exec(`taq list accounts ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
		expect(accounts.stdout).toContain('bob');

		await exec(`taq stop sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
	});

	// TODO: Need to come back to this one. Sometimes it succeeds, and other times it fails.
	test.skip('Verify that taqueria can return JSON when request for list of accounts from a sandbox is made by TVsCE', async () => {
		sandboxName = 'local';
		await exec(`taq start sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
		await sleep(17000); // not too sure why this is needed here
		const accounts = await exec(`taq list accounts ${sandboxName} --fromVsCode`, { cwd: `./${taqueriaProjectPath}` });
		expect(accounts.stdout).toEqual(
			JSON.stringify([
				{
					account: 'bob',
					balance: '3000 ꜩ',
					address: 'tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6',
				},
				{
					account: 'alice',
					balance: '3000 ꜩ',
					address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
				},
				{
					account: 'john',
					balance: '3000 ꜩ',
					address: 'tz1Zwoh1QCVAvJ4sVTojMp9pLYp6Ji4NoZy6',
				},
				{
					account: 'jane',
					balance: '3000 ꜩ',
					address: 'tz1aHUAC4oviwJuZF1EvVSvFz7cu9KMNYBph',
				},
				{
					account: 'joe',
					balance: '3000 ꜩ',
					address: 'tz1MVGjgD1YtAPwohsSfk8i3ZiT1yEGM2YXB',
				},
			]) + '\n',
		);
	});

	// Clean up process to stop container if it was not stopped properly during the test
	afterEach(async () => {
		try {
			await exec(`taq stop sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
		} catch {}
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			// Clean up any processes created during testing
			processes.map(child => child.kill());

			// Clean up test projects
			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
