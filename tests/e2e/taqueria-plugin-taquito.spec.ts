import { exec as exec1 } from 'child_process';
import utils from 'util';
const exec = utils.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import path from 'path';

describe('Taquito Plugin E2E testing for Taqueria CLI', () => {
	test('deploy will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2, stderr } = await execute('taq', 'deploy --help', './test-project');
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	test('originate will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'originate --help', './test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('transfer will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'transfer --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('call will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'call --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('fund will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'fund --help', './test-project');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('instantiate-account will give contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account --help');
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	test('deploy will deploy one contract using deploy {contractName} when there are multiple contracts in the artifacts', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const storage_file = await (await exec('cat e2e/data/michelson-data/anyContract.storage.tz')).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', storage_file);

		const config_file = await (await exec('cat e2e/data/config-data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const hello_tz_file = await (await exec('cat e2e/data/michelson-data/hello-tacos.tz')).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', hello_tz_file);

		const increment_tz_file = await (await exec('cat e2e/data/michelson-data/increment.tz')).stdout;
		await writeFile('./test-project/artifacts/increment.tz', increment_tz_file);

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e testing',
			'./test-project',
		);
		if (stderr.length > 0) console.error(stderr);
		expect(stdout2).toEqual(expect.arrayContaining(
			['│ Contract       │ Address                              │ Alias       │ Balance In Mutez │ Destination                    │'],
		));

		await cleanup();
	});

	test('fund will error if funding maxed out accounts', async () => {
		const { execute, spawn, cleanup, writeFile, makeDir, readFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const test_config_file = await (await exec('cat e2e/data/config-data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const { stdout: stdout3, stderr } = await execute('taq', 'fund -e testing', './test-project');
		if (stderr.length > 0) console.error(stderr);
		expect(stdout3).toContain(
			'All instantiated accounts in the current environment, "testing", are funded up to or beyond the declared amount',
		);

		await cleanup();
	});

	test('fund will error if calling fund in a non-network environment', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stderr } = await execute('taq', 'fund', './test-project');
		expect(stderr).toContain('taq fund can only be executed in a network environment');

		await cleanup();
	});

	test('instantiate-account can only once instantiate an account on a network', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const test_config_file = await (await exec('cat e2e/data/config-data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account -e testing', './test-project');
		expect(stdout2).toContain('Please execute "taq fund" targeting the same environment to fund these accounts');

		const { stdout: stdout3, stderr } = await execute('taq', 'instantiate-account -e testing', './test-project');
		expect(stdout3).toContain(
			'No accounts were instantiated because they were all instantiated in the target environment already',
		);
		expect(stderr).toContain('Note: bob is already instantiated in the current environment, "testing"');

		await cleanup();
	});

	test('deploy will error if a named environment does not exist', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const tz_file = await (await exec('cat e2e/data/michelson-data/hello-tacos.tz')).stdout;
		await writeFile('./.taq/artifacts/hello-tacos.tz', tz_file);

		const { stderr } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e no_such_env',
			'./test-project',
		);
		expect(stderr).toContain('There is no environment called no_such_env in your config.json');

		await cleanup();
	});

	test.skip(/* No longer possible to have missing network in config */ 'deploy will error if an invalid network name is in the environment configuration', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const test_config_file =
			await (await exec('cat e2e/data/config-data/config-taquito-test-environment-invalid-config-networkname.json'))
				.stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const tz_file = await (await exec('cat e2e/data/michelson-data/hello-tacos.tz')).stdout;
		await writeFile('./test-project/.taq/artifacts/hello-tacos.tz', tz_file);

		const { stderr } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e testing',
			'./test-project',
		);
		expect(stderr).toContain(
			"The current environment is configured to use a network called 'ghost'; however, no network of this name has been configured in .taq/config.json",
		);
		expect(stderr).toContain('No operations performed');

		await cleanup();
	});
});
