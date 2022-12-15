import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import utils from 'util';
import * as contents from './data/help-contents/taquito-contents';
import { networkInfo } from './data/network-info';
import {
	checkContractBalanceOnNetwork,
	checkContractExistsOnNetwork,
	generateTestProject,
	itemArrayInTable,
} from './utils/utils';
const exec = utils.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { executionAsyncResource } from 'async_hooks';
import path from 'path';
import { cwd, stderr } from 'process';

describe('E2E Testing for taqueria taquito plugin', () => {
	const taqueriaProjectPath = 'scrap/auto-test-taquito-plugin';
	const contractRegex = new RegExp(/(KT1)+\w{33}?/);
	let environment: string;

	// beforeAll(async () => {
	// 	await generateTestProject(taqueriaProjectPath, ['taquito']);
	// 	// TODO: This can removed after this is resolved:
	// 	// https://github.com/ecadlabs/taqueria/issues/528
	// 	try {
	// 		await exec(`taq -p ${taqueriaProjectPath}`);
	// 	} catch (_) {}
	// });

	// beforeEach(async () => {
	// 	await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts/`);
	// });

	test('Verify that the taquito plugin exposes the associated commands in the help menu', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', '--help --projectDir=test-project', './test-project');
		expect(stdout).toContain('taq [command]');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('Verify that the taquito plugin exposes the associated options for deploy in the help menu', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'deploy --help --projectDir=test-project');
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('Verify that the taquito plugin originate alias exposes the correct info in the help menu', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', 'test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await exec(`taq originate --help --projectDir=test-project`);
		expect(stdout2).toContain('Deploy a smart contract to a particular environment');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('Verify that the taquito plugin transfer task expose the correct info in the help menu', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await exec(`taq transfer --help --projectDir=test-project`);
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('Verify that the taquito plugin transfer alias exposes the correct info in the help menu', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await exec(`taq call --help --projectDir=test-project`);
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('Verify that the taquito plugin fund task exposes the correct info in the help menu', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await exec(`taq fund --help --projectDir=test-project`);
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('Verify that the taquito plugin instantiate-account task exposes the correct info in the help menu', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await exec(`taq instantiate-account --help`);
		expect(stdout2).toContain('Transfer/call an implicit account or a smart contract');

		await cleanup();
	});

	// This test looks to be redundant givent the following one. Both test the same thing.

	// test('Verify that taqueria taquito plugin can deploy one contract using deploy command', async () => {
	// 	const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
	// 	const { waitForText } = await spawn('taq', 'init test-project');
	// 	await waitForText("Project taq'ified!");
	// 	const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
	// 	expect (stdout).toContain('Plugin installed successfully');

	// 	const storage_file = await (await exec('cat e2e/data/anyContract.storage.tz')).stdout;
	// 	await writeFile ('./test-project/artifacts/anyContract.storage.tz', storage_file);

	// 	const env_file = await (await exec('cat e2e/data/config-taquito-test-environment.json')).stdout;
	// 	await writeFile ('./test-project/.taq/config.json', env_file);

	// 	const tz_file = await (await exec('cat e2e/data/hello-tacos.tz')).stdout;
	// 	await writeFile ('./test-project/artifacts/hello-tacos.tz', tz_file);

	// 	const { stdout: stdout2 } = await execute('taq', 'deploy hello-tacos.tz --storage anyContract.storage.tz -e testing', './test-project');
	// 	expect (stdout2).toEqual(expect.arrayContaining(
	// 		['│ Contract       │ Address                              │ Alias       │ Balance In Mutez │ Destination                    │']
	// 	));

	// 	const result = stdout2[3].match(/(KT1)+\w{33}?/);
	// 	expect(result).not.toBe(null);
	// 	const contractHash = (result as RegExpMatchArray)[0];

	// 	expect(await checkContractExistsOnNetwork(contractHash,	networkInfo.networkURL,),).toBe(contractHash);

	// 	await cleanup();
	// });

	test('Verify taquito plugin can deploy one contract using deploy {contractName} when there are multiple contracts in the artifacts', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const storage_file = await (await exec('cat e2e/data/anyContract.storage.tz')).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', storage_file);

		const config_file = await (await exec('cat e2e/data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);

		const hello_tz_file = await (await exec('cat e2e/data/hello-tacos.tz')).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', hello_tz_file);

		const increment_tz_file = await (await exec('cat e2e/data/increment.tz')).stdout;
		await writeFile('./test-project/artifacts/increment.tz', increment_tz_file);

		const { stdout: stdout2 } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e testing',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(
			['│ Contract       │ Address                              │ Alias       │ Balance In Mutez │ Destination                    │'],
		));

		const result = stdout2[3].match(/(KT1)+\w{33}?/);
		expect(result).not.toBe(null);
		const contractHash = (result as RegExpMatchArray)[0];

		expect(await checkContractExistsOnNetwork(contractHash, networkInfo.networkURL)).toBe(contractHash);

		await cleanup();
	});

	test.skip('Verify that taqueria taquito plugin will show an error when running the taq fund command in a non-network environment', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stderr } = await execute('taq', 'fund', './test-project');
		expect(stderr).toContain('taq fund can only be executed in a network environment');

		await cleanup();
	});

	test('Verify that taqueria taquito plugin will error when trying to fund maxed out accounts', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const test_config_file = await (await exec('cat e2e/data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const { stdout: stdout2 } = await execute('taq', 'fund -e testing', './test-project');
		expect(stdout2).toContain(
			'All instantiated accounts in the current environment, "testing", are funded up to or beyond the declared amount',
		);

		await cleanup();
	});

	test('Verify that taqueria taquito plugin can only instantiate accounts on a network once', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const test_config_file = await (await exec('cat e2e/data/config-taquito-test-environment.json')).stdout;
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

	test('Verify that taqueria taquito plugin will fund instantiated accounts on a network', async () => {
		const { execute, spawn, cleanup, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const test_config_file = await (await exec('cat e2e/data/config-taquito-test-environment-low-tez.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account -e testing', './test-project');
		expect(stdout2).toContain('Please execute "taq fund" targeting the same environment to fund these accounts');

		const configFile = await readFile(path.join('./test-project', '.taq', 'config.json'));
		const json = JSON.parse(configFile);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('accounts');

		const { stdout: stdout3 } = await execute('taq', 'fund -e testing', './test-project');
		expect(stdout3).toEqual(
			expect.arrayContaining(['│ Account Alias │ Account Address                      │ Mutez Funded │']),
		);

		await cleanup();
	});

	test.skip('Verify that taqueria taquito plugin can send from one instantiated account to another', async () => {
		const { execute, spawn, cleanup, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-taquito', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const test_config_file = await (await exec('cat e2e/data/config-taquito-test-environment-low-tez.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account -e testing', './test-project');
		expect(stdout2).toContain('Accounts instantiated: bob, alice, john, jane, joe.');

		const { stdout: stdout3 } = await execute('taq', 'fund -e testing', './test-project');
		expect(stdout3).toEqual(
			expect.arrayContaining(['│ Account Alias │ Account Address                      │ Mutez Funded │']),
		);

		const configFile = await readFile(path.join('./test-project', '.taq', 'config.json'));
		const json = JSON.parse(configFile);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('accounts');

		const configAlicePKH = json.network.ghostnet.accounts.alice.publicKeyHash;
		const configAliceAmount = json.accounts.alice;
		const configBobPKH = json.network.ghostnet.accounts.bob.publicKeyHash;
		// console.log(`Alice's PKH: ${configAlicePKH}`);
		// console.log(`Bob's PKH: ${configBobPKH}`);

		const networkContractInfoPrior = checkContractBalanceOnNetwork(
			'tz3RobfdmYYQaiF5W343wdSiFhwWF2xUfjEy',
			networkInfo.networkURL,
		);

		const { stdout: stdout4 } = await execute(
			'taq',
			'transfer tz3RobfdmYYQaiF5W343wdSiFhwWF2xUfjEy --mutez 100000 --sender bob -e testing',
			'./test-project',
		);
		expect(stdout4).toEqual(
			expect.arrayContaining([
				'│ N/A            │ tz3RobfdmYYQaiF5W343wdSiFhwWF2xUfjEy │ Unit      │ default    │ 100000         │ https://ghostnet.ecadinfra.com │',
			]),
		);

		// const finalTezValue = Number(configAliceAmount) + 100000;
		// const networkContractInfo = checkContractBalanceOnNetwork('tz3RobfdmYYQaiF5W343wdSiFhwWF2xUfjEy', networkInfo.networkURL);
		// await networkContractInfo.then(info => {
		//  	expect(info).toStrictEqual([networkContractInfo, networkContractInfoPrior + 100000]);
		// });
	});

	test.skip('Verify that taqueria taquito plugin will show proper error when environment does not exists', async () => {
		try {
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
			// Environment test does not exist on default config.json
			environment = 'tes';

			// 1. Run taq deploy on a network described in "test" environment
			await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
				cwd: `./${taqueriaProjectPath}`,
			});
		} catch (error) {
			// 2. Verify that proper error is displayed in the console
			expect(error).toContain('There is no environment called tes in your config.json.');
		}
	});

	test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> invalid network name in the environment', async () => {
		// Environment test does not exist on default config.json
		environment = 'testing';

		// 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
		await exec(
			`cp e2e/data/config-taquito-test-environment-invalid-config-networkname.json ${taqueriaProjectPath}/.taq/config.json`,
		);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

		// 2. Run taq deploy on a network described in "test" environment
		const badNameDeploy = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(badNameDeploy.stderr).toContain(
			"The current environment is configured to use a network called 'ghost'; however, no network of this name has been configured in .taq/config.json",
		);
		expect(badNameDeploy.stderr).toContain('No operations performed');
	});

	test.skip('Verify that taqueria taquito plugin will show proper error when faucet is wrong -> network url is wrong', async () => {
		// Environment test does not exist on default config.json
		environment = 'testing';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(
			`cp e2e/data/config-taquito-test-environment-invalid-config-network-url.json ${taqueriaProjectPath}/.taq/config.json`,
		);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);

		// 2. Run taq deploy on a network described in "test" environment
		const stdoutDeploy = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain('The RPC URL may be invalid. Check ./.taq/config.json');
		expect(stdoutDeploy.stderr).toContain('No operations performed');
	});

	test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not provided', async () => {
		// Environment test does not exist on default config.json
		environment = 'testing';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);

		// 2. Run taq deploy on a network described in "test" environment
		const stdoutDeploy = await exec(`taq deploy hello-tacos.tz -e ${environment}`, { cwd: `./${taqueriaProjectPath}` });

		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain('❌ No initial storage file was found for hello-tacos.tz');
		expect(stdoutDeploy.stderr).toContain(
			'Storage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "hello-tacos.default_storage.tz" in the artifacts directory',
		);
		expect(stdoutDeploy.stderr).toContain(
			'You can also manually pass a storage file to the originate task using the --storage STORAGE_FILE_NAME option',
		);
	});

	test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not a number', async () => {
		// Environment test does not exist on default config.json
		environment = 'testing';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
		await exec(`cp e2e/data/string.storage.tz ${taqueriaProjectPath}/artifacts/`);
		await exec(
			`cp e2e/data/config-taquito-test-environment-invalid-initial-storage-string.json ${taqueriaProjectPath}/.taq/config.json`,
		);

		// 2. Run taq deploy on a network described in "test" environment
		const stdoutDeploy = await exec(`taq deploy hello-tacos.tz --storage string.storage.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain('Error while performing operation');
		expect(stdoutDeploy.stderr).toContain('michelson_v1.invalid_expression_kind');
		expect(stdoutDeploy.stderr).toContain('No operations performed');
	});

	// // Remove all files from artifacts folder without removing folder itself
	// afterEach(async () => {
	// 	try {
	// 		const files = await fsPromises.readdir(`${taqueriaProjectPath}/artifacts/`);
	// 		for (const file of files) {
	// 			await fsPromises.rm(`${taqueriaProjectPath}/artifacts/${file}`);
	// 		}
	// 	} catch (error) {
	// 		throw new Error(`error: ${error}`);
	// 	}
	// });

	// // Clean up process to remove taquified project folder
	// // Comment if need to debug
	// afterAll(async () => {
	// 	try {
	// 		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	// 	} catch (error) {
	// 		throw new Error(`error: ${error}`);
	// 	}
	// });
});
