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
import { prepareEnvironment } from '@gmrchk/cli-testing-library';
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

describe('Flextesa Plugin E2E Testing for Taqueria CLI', () => {
	// beforeAll(async () => {
	// 	await fsPromises.rm(taqueriaProjectPath, { recursive: true, force: true });
	// 	await generateTestProject(taqueriaProjectPath, ['flextesa']);
	// 	// TODO: This can removed after this is resolved:
	// 	// https://github.com/ecadlabs/taqueria/issues/528
	// 	try {
	// 		await exec(`taq -p ${taqueriaProjectPath}`);
	// 	} catch (_) { }
	// });

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('help will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute('taq', '--help --projectDir=./test-project', './test-project');
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(
			expect.arrayContaining(['taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad']),
		);

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('start sandbox will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start sandbox --help --projectDir=./test-project',
			'./test-project',
		);
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('start will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'start --help --projectDir=./test-project',
			'./test-project',
		);
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('sandbox stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'sandbox stop --help --projectDir=./test-project',
			'./test-project',
		);
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('stop will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'stop --help --projectDir=./test-project',
			'./test-project',
		);
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('list accounts will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'list accounts --help --projectDir=./test-project',
			'./test-project',
		);
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(['List the balances of all sandbox accounts']));

		await cleanup();
	});

	test('start and stop will work with a default sandbox without a provided name', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute('taq', 'start sandbox', './test-project');
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(['Started local.']));
		expect(stdout2).toEqual(expect.arrayContaining(['Done.']));

		const dockerContainerTest = await getContainerName('local');
		expect(dockerContainerTest).toContain(`taq-flextesa-local`);
		const dockerImageName = await getContainerImage('local');
		expect(dockerImageName).toContain('ghcr.io/ecadlabs/taqueria-flextesa');

		const { stdout: stdout3, stderr: stderr2 } = await execute('taq', 'stop sandbox local', './test-project');
		if (stderr2.length > 0) console.error(stderr2);
		await expect(stdout3).toEqual(expect.arrayContaining(['Stopped local.']));

		await cleanup();
	});

	test.only('start and stop will work with a custom name sandbox', async () => {
		const { execute, cleanup, spawn, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project --debug');
		await waitForText("Project taq'ified!");
		// const { } = await execute('taq', 'uninstall @taqueria/plugin-core', './test-project');
		// const { } = await execute('taq', 'install @taqueria/plugin-core --debug', './test-project');
		const { stdout } = await execute('taq', 'install @taqueria/plugin-flextesa --debug', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const config_file = await (await exec('cat e2e/data/config-flextesa-test-sandbox.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const { stdout: stdout2, stderr } = await execute('taq', 'start sandbox test', './test-project');
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(['Started test.']));

		const dockerContainerTest = await getContainerName('test');
		expect(dockerContainerTest).toContain(`taq-flextesa-test`);
		const dockerImageName = await getContainerImage('test');
		expect(dockerImageName).toContain('ghcr.io/ecadlabs/taqueria-flextesa');

		const { stdout: stdout3, stderr: stderr2 } = await execute('taq', 'stop sandbox test', './test-project');
		if (stderr2.length > 0) console.error(stderr2);
		await expect(stdout3).toEqual(expect.arrayContaining(['Stopped test.']));

		await cleanup();
	});

	test('Verify that an environment variable can override the flextesa docker image', async () => {
		sandboxName = 'override';
		const imageName = 'ghcr.io/ecadlabs/taqueria-flextesa:1429-merge-1ccbcc8';

		await exec(`cp e2e/data/config-flextesa-test-sandbox.json ${taqueriaProjectPath}/.taq/config.json`);

		const sandboxStart = await exec(`TAQ_ECAD_FLEXTESA_IMAGE=${imageName} taq start sandbox ${sandboxName}`, {
			cwd: `./${taqueriaProjectPath}`,
			// Cannot use the env property as it replaces the environment, which
			// contains the PATH for how to find the `taq` binary
			// env: {'TAQ_ECAD_FLEXTESA_IMAGE': imageName}
		});

		// 2. Verify that sandbox has been started and taqueria returns proper message into console
		expect(sandboxStart.stdout).toContain(`Started ${sandboxName}.`);

		// 3. Verify that docker container has been started
		const dockerContainerTest = await getContainerName(sandboxName);
		expect(dockerContainerTest).toContain(`taq-flextesa-${sandboxName}`);

		// Verify that the specific image is being used
		expect(await getContainerImages(sandboxName)).toContain(imageName);

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

	test('Verify that taqueria can return JSON when request for list of accounts from a sandbox is made by TVsCE', async () => {
		sandboxName = 'local';
		await exec(`taq start sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });

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

		await exec(`taq stop sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
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
		expect(sandboxStart.stdout).toContain(`Started ${sandboxName}.`);
		expect(sandboxStart.stdout).toContain(`Done.`);

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

	// // Clean up process to stop container if it was not stopped properly during the test
	// afterEach(async () => {
	// 	try {
	// 		await exec(`taq stop sandbox ${sandboxName}`, { cwd: `./${taqueriaProjectPath}` });
	// 	} catch { }
	// });

	// // Clean up process to remove taquified project folder
	// // Comment if need to debug
	// afterAll(async () => {
	// 	try {
	// 		// Clean up any processes created during testing
	// 		processes.map(child => child.kill());

	// 		// Clean up test projects
	// 		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	// 	} catch (error) {
	// 		throw new Error(`error: ${error}`);
	// 	}
	// });
});
