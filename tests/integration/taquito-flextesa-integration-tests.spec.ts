import { exec as exec1 } from 'child_process';
import utils from 'util';
const exec = utils.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

const contractRegex = new RegExp(/(KT1)+\w{33}?/);

describe('E2E Testing for taqueria taquito plugin', () => {
	jest.setTimeout(90000);

	test('deploy will create one contract using deploy command', async () => {
		const { execute, exists, cleanup, writeFile, readFile, ls } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-taquito', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');
		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const storage_file = await (await exec(`cat integration/data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', storage_file);
		const tz_file = await (await exec(`cat integration/data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', tz_file);

		const { stdout } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Starting node...']));

		await new Promise(resolve => setTimeout(resolve, 15000));

		const { stdout: stdout1 } = await execute('taq', 'list accounts local', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['│ Account │ Balance │ Address                              │']));
		expect(stdout1).not.toEqual(expect.arrayContaining([expect.stringContaining('Error')]));

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e development',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('http://localhost:20000')]));
		expect(stdout2[3].trim().split('│')[2]).toMatch(contractRegex);

		const devconfigContents = JSON.parse(await readFile('./test-project/.taq/config.local.development.json'));
		const port = devconfigContents.rpcUrl;

		const contractFromSandbox = await exec(
			`curl ${port}/chains/main/blocks/head/context/contracts/${stdout2[3].trim().split('│')[2].trim()}`,
		);
		expect(contractFromSandbox.stdout).toContain('"balance":"0"');
		expect(contractFromSandbox.stdout).toContain('"storage":{"int":"12"}');

		await cleanup();
	});

	test('instantiate-account will not re-instantiate accounts on a network', async () => {
		const { execute, spawn, cleanup, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const testing_env_config_file =
			await (await exec('cat integration/data/config-testing-environment-with-funded-accounts.json'))
				.stdout;
		await writeFile('./test-project/.taq/config.local.testing.json', testing_env_config_file);

		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account -e testing', './test-project');
		expect(stdout2).toContain(
			'No accounts were instantiated because they were all instantiated in the target environment already',
		);

		await cleanup();
	});

	test('fund will not re-fund instantiated accounts on a network', async () => {
		const { execute, spawn, cleanup, writeFile, readFile, path } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const testing_env_config_file =
			await (await exec('cat integration/data/config-testing-environment-with-funded-accounts.json'))
				.stdout;
		await writeFile('./test-project/.taq/config.local.testing.json', testing_env_config_file);

		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout3 } = await execute('taq', 'fund -e testing', './test-project');
		expect(stdout3).toEqual(
			expect.arrayContaining([
				'All instantiated accounts in the current environment, "testing", are funded up to or beyond the declared amount',
			]),
		);

		await cleanup();
	});

	test('instantiate-account can only be executed in a network environment', async () => {
		const { execute, spawn, cleanup, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const testing_env_config_file =
			await (await exec('cat integration/data/config-testing-environment-with-funded-accounts.json'))
				.stdout;
		await writeFile('./test-project/.taq/config.local.testing.json', testing_env_config_file);

		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stderr } = await execute('taq', 'instantiate-account -e development', './test-project');
		expect(stderr).toContain('taq instantiate-account can only be executed in a network environment');

		await cleanup();
	});

	test('transfer will send mutez from one instantiated account to another', async () => {
		// FLAKY - https://github.com/ecadlabs/taqueria/issues/1694
		const { execute, spawn, cleanup, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const testing_env_config_file =
			await (await exec('cat integration/data/config-testing-environment-with-funded-accounts.json'))
				.stdout;
		await writeFile('./test-project/.taq/config.local.testing.json', testing_env_config_file);

		const { stdout: stdout1 } = await execute(
			'taq',
			'install ../taqueria-plugin-taquito',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout4 } = await execute(
			'taq',
			'transfer tz3RobfdmYYQaiF5W343wdSiFhwWF2xUfjEy --mutez 1 --sender bob -e testing',
			'./test-project',
		);
		expect(stdout4).toEqual(
			expect.arrayContaining([
				'│ N/A            │ tz3RobfdmYYQaiF5W343wdSiFhwWF2xUfjEy │ Unit      │ default    │ 1              │ https://ghostnet.ecadinfra.com │',
			]),
		);

		await cleanup();
	});

	test('Taquito plugin can transfer from one account to another', async () => {
		const { execute, spawn, cleanup, writeFile, exists } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const testing_env_config_file =
			await (await exec('cat integration/data/config-testing-environment-with-funded-accounts.json'))
				.stdout;
		await writeFile('./test-project/.taq/config.local.testing.json', testing_env_config_file);

		await execute('taq', 'install ../taqueria-plugin-taquito', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');
		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const { stdout: stdout0 } = await execute('taq', 'start sandbox local', './test-project');
		expect(stdout0).toEqual(expect.arrayContaining(['Starting node...']));

		await new Promise(resolve => setTimeout(resolve, 15000));

		const { stdout: stdout1 } = await execute('taq', 'list accounts local', './test-project');
		const bob_balance_before = (stdout1[3].trim().split('│')[2].trim());
		const alice_balance_before = (stdout1[5].trim().split('│')[2].trim());
		expect(bob_balance_before).toEqual('3000 ꜩ');
		expect(alice_balance_before).toEqual('3000 ꜩ');

		await execute(
			'taq',
			'transfer tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb --mutez 1000000 --sender bob -e development',
			'./test-project',
		);
		await new Promise(resolve => setTimeout(resolve, 5000));

		const { stdout: stdout3 } = await execute('taq', 'list accounts local', './test-project');
		const bob_balance_after = (stdout3[3].trim().split('│')[2].trim());
		const alice_balance_after = (stdout3[5].trim().split('│')[2].trim());
		expect(bob_balance_after).toEqual('2998.999601 ꜩ');
		expect(alice_balance_after).toEqual('3001 ꜩ');

		await cleanup();
	});

	// test.skip('Verify that taqueria taquito plugin cant transfer 0 tez using transfer command from one account to another', async () => {
	// 	// 1. Setting up environment name
	// 	environment = 'development';

	// 	// 2. Get Bob's and Alice's account addresses
	// 	const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
	// 	const addressArray = itemArrayInTable(addressRegex, initialContractList);

	// 	// 3. Call transfer to transfer
	// 	const transferResult = await exec(`taq transfer ${addressArray[1]} --mutez 0`, {
	// 		cwd: `./${taqueriaProjectPath}`,
	// 	});

	// 	expect(transferResult.stderr).toContain('Error while performing operation');
	// 	expect(transferResult.stderr).toContain('empty_transaction');
	// 	expect(transferResult.stderr).toContain('No operations performed');
	// });

	// test.skip('Verify that taqueria taquito plugin cant transfer from non-instantiated account to another', async () => {
	// 	// 1. Setting up environment name
	// 	environment = 'development';

	// 	// 2. Get Bob's and Alice's account addresses
	// 	const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
	// 	const addressArray = itemArrayInTable(addressRegex, initialContractList);

	// 	// 3. Call transfer to transfer
	// 	const transferResult = await exec(
	// 		`taq transfer ${addressArray[1]} --mutez 1000000000 --sender ${addressArray[3]}`,
	// 		{ cwd: `./${taqueriaProjectPath}` },
	// 	);

	// 	expect(transferResult.stderr).toContain(
	// 		`${addressArray[3]} is not an account instantiated in the current environment. Check .taq/config.json`,
	// 	);
	// 	expect(transferResult.stderr).toContain(`No operations performed`);
	// });

	// test.skip('Verify that taqueria taquito plugin can transfer amount of tezos using transfer command from one account to another if account does not enough tezos', async () => {
	// 	// 1. Setting up environment name
	// 	environment = 'development';

	// 	// 2. Get Bob's and Alice's account addresses
	// 	const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });

	// 	const addressArray = itemArrayInTable(addressRegex, initialContractList);

	// 	// 3. Call transfer to transfer
	// 	const transferResult = await exec(`taq transfer ${addressArray[1]} --mutez 5000000000`, {
	// 		cwd: `./${taqueriaProjectPath}`,
	// 	});

	// 	// 4. Verify that taqueria throw an error for transfer
	// 	expect(transferResult.stderr).toContain('Error while performing operation');
	// 	expect(transferResult.stderr).toContain('balance_too_low');
	// 	expect(transferResult.stderr).toContain('No operations performed');
	// });

	// test.skip('Verify that taqueria taquito plugin can transfer amount of tezos using call command from an account to a contract with using parameters file', async () => {
	// 	// 1. Setting up environment name
	// 	environment = 'development';

	// 	// 2. Copy contract and parameters files in contract directory
	// 	await exec(`cp integration/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
	// 	await exec(`cp integration/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts/`);
	// 	await exec(`cp integration/data/hello-tacos.parameter.decrement_by_1.tz ${taqueriaProjectPath}/artifacts/`);

	// 	// 4. Run taq deploy ${contractName} on a selected test network described in "test" environment
	// 	const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
	// 		cwd: `./${taqueriaProjectPath}`,
	// 	});
	// 	const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

	// 	// 5. Get the KT address from the output
	// 	const contractHash = deployResponse.split('│')[2].trim();

	// 	const configEnvironmentContents = JSON.parse(
	// 		await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.local.${environment}.json`, { encoding: 'utf-8' }),
	// 	);
	// 	const localURL = configEnvironmentContents.rpcUrl;
	// 	const beforeAmount = await checkContractBalanceOnNetwork(contractHash, localURL);

	// 	// 6. Call taq call command to transfer 0 tez from account to the contract
	// 	await exec(`taq call ${contractHash} --param hello-tacos.parameter.decrement_by_1.tz`, {
	// 		cwd: `./${taqueriaProjectPath}`,
	// 	});

	// 	const afterAmount = await checkContractBalanceOnNetwork(contractHash, localURL);

	// 	// 8. Verify that amount was not charged
	// 	expect(beforeAmount).toStrictEqual(afterAmount);
	// });
});
