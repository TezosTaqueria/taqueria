import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import fsPromises from 'fs/promises';
import utils from 'util';
import {
	checkContractBalanceOnNetwork,
	exec,
	generateTestProject,
	getContainerName,
	itemArrayInTable,
	sleep,
} from './utils/utils';

const taqueriaProjectPath = 'scrap/auto-test-taquito-flextesa-plugin';
const contractRegex = new RegExp(/(KT1)+\w{33}?/);
let environment: string;
let dockerName: string = 'localTF';
const addressRegex = /tz1[A-Za-z0-9]{7,}/g;
const amountRegex = /[0-9]{4,} ꜩ/g;

describe('Taquito and Flextesa Plugins E2E Testing for Taqueria CLI', () => {
	test.only('deploy will create one contract using deploy command', async () => {
		const { execute, spawn, cleanup, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));
		const { stdout: stdout2 } = await execute('taq', 'install ../taqueria-plugin-taquito', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const config_file = await (await exec(`cat e2e/data/config-taquito-flextesa-local-sandbox-test-environment.json`))
			.stdout;
		await writeFile('./test-project/.taq/config.json', config_file);
		const storage_file = await (await exec(`cat e2e/data/anyContract.storage.tz`)).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', storage_file);
		const tz_file = await (await exec(`cat e2e/data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', tz_file);

		const { stdout: stdout3 } = await execute('taq', 'start sandbox localTF', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Starting node...']));
		sleep(4000);
		const { stdout: stdout4, stderr } = await execute('taq', 'list accounts localTF', './test-project');
		expect(stdout4).toEqual(expect.arrayContaining(['│ Account │ Balance │ Address                              │']));
		console.log(stdout4);
		console.log(stderr);

		const { stdout: stdout5, stderr: stderr1 } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e development',
			'./test-project',
		);
		console.log(stdout5);
		console.log(stderr1);

		const deployResponse = stdout2[0].trim().split(/\r?\n/)[3];
		expect(deployResponse).toContain('hello-tacos.tz');
		const contractHash = deployResponse.split('│')[2].trim();
		expect(contractHash).toMatch(contractRegex);

		const configContents = JSON.parse(await readFile('./test-project/.taq/sinfig.json'));
		const port = configContents.sandbox.localTF.rpcUrl;

		const contractFromSandbox = await exec(`curl ${port}/chains/main/blocks/head/context/contracts/${contractHash}`);
		expect(contractFromSandbox.stdout).toContain('"balance":"0"');
		expect(contractFromSandbox.stdout).toContain('"storage":{"int":"12"}');

		await cleanup();
	});

	test('deploy will create one contract using deploy {contractName} command', async () => {
		await sleep(20000);
		environment = 'development';

		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

		// 1. Run taq deploy ${contractName} on a selected test network described in "test" environment
		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

		// 2. Get the KT address from the output
		expect(deployResponse).toContain('hello-tacos.tz');
		const contractHash = deployResponse.split('│')[2].trim();

		expect(contractHash).toMatch(contractRegex);

		// 3. Verify that contract has been originated to the network
		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);
		const port = configContents.sandbox.localTF.rpcUrl;
		const contractFromSandbox = await exec(
			`curl ${port}/chains/main/blocks/head/context/contracts/${contractHash}`,
		);
		expect(contractFromSandbox.stdout).toContain('"balance":"0"');
		expect(contractFromSandbox.stdout).toContain('"storage":{"int":"12"}');
	});

	test('Verify that taqueria taquito plugin can transfer amount of tezos using transfer command from one account to another', async () => {
		// 1. Setting up environment name
		environment = 'development';

		// 2. Get Bob's and Alice's account addresses
		const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
		const addressArray = itemArrayInTable(addressRegex, initialContractList);

		// 3. Call transfer to transfer
		await exec(`taq transfer ${addressArray[1]} --mutez 1000000000`, { cwd: `./${taqueriaProjectPath}` });
		await sleep(2500);

		// 4. Verify transfer results
		const resultContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
		const amountArray = itemArrayInTable(amountRegex, resultContractList);
		expect(amountArray[1]).toEqual('4000 ꜩ');
	});

	test('Verify that taqueria taquito plugin cant transfer 0 tez using transfer command from one account to another', async () => {
		// 1. Setting up environment name
		environment = 'development';

		// 2. Get Bob's and Alice's account addresses
		const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
		const addressArray = itemArrayInTable(addressRegex, initialContractList);

		// 3. Call transfer to transfer
		const transferResult = await exec(`taq transfer ${addressArray[1]} --mutez 0`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(transferResult.stderr).toContain('Error while performing operation');
		expect(transferResult.stderr).toContain('empty_transaction');
		expect(transferResult.stderr).toContain('No operations performed');
	});

	test('Verify that taqueria taquito plugin cant transfer from non-instantiated account to another', async () => {
		// 1. Setting up environment name
		environment = 'development';

		// 2. Get Bob's and Alice's account addresses
		const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
		const addressArray = itemArrayInTable(addressRegex, initialContractList);

		// 3. Call transfer to transfer
		const transferResult = await exec(
			`taq transfer ${addressArray[1]} --mutez 1000000000 --sender ${addressArray[3]}`,
			{ cwd: `./${taqueriaProjectPath}` },
		);

		expect(transferResult.stderr).toContain(
			`${addressArray[3]} is not an account instantiated in the current environment. Check .taq/config.json`,
		);
		expect(transferResult.stderr).toContain(`No operations performed`);
	});

	test('Verify that taqueria taquito plugin can transfer amount of tezos using transfer command from one account to another if account does not enough tezos', async () => {
		// 1. Setting up environment name
		environment = 'development';

		// 2. Get Bob's and Alice's account addresses
		const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });

		const addressArray = itemArrayInTable(addressRegex, initialContractList);

		// 3. Call transfer to transfer
		const transferResult = await exec(`taq transfer ${addressArray[1]} --mutez 5000000000`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 4. Verify that taqueria throw an error for transfer
		expect(transferResult.stderr).toContain('Error while performing operation');
		expect(transferResult.stderr).toContain('balance_too_low');
		expect(transferResult.stderr).toContain('No operations performed');
	});

	test('Verify that taqueria taquito plugin can transfer amount of tezos using call command from an account to a contract with using parameters file', async () => {
		// 1. Setting up environment name
		environment = 'development';

		// 2. Copy contract and parameters files in contract directory
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
		await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts/`);
		await exec(`cp e2e/data/hello-tacos.parameter.decrement_by_1.tz ${taqueriaProjectPath}/artifacts/`);

		// 4. Run taq deploy ${contractName} on a selected test network described in "test" environment
		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

		// 5. Get the KT address from the output
		const contractHash = deployResponse.split('│')[2].trim();

		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);
		const localURL = configContents.sandbox.localTF.rpcUrl;
		const beforeAmount = await checkContractBalanceOnNetwork(contractHash, localURL);

		// 6. Call taq call command to transfer 0 tez from account to the contract
		await exec(`taq call ${contractHash} --param hello-tacos.parameter.decrement_by_1.tz`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		const afterAmount = await checkContractBalanceOnNetwork(contractHash, localURL);

		// 8. Verify that amount was not charged
		expect(beforeAmount).toStrictEqual(afterAmount);
	});

	// // Remove all files from artifacts folder without removing folder itself
	// afterEach(async () => {
	// 	const files = await fsPromises.readdir(`${taqueriaProjectPath}/artifacts/`);
	// 	for (const file of files) {
	// 		await fsPromises.rm(`${taqueriaProjectPath}/artifacts/${file}`);
	// 	}
	// });

	// // Clean up process to remove taquified project folder
	// // Comment if need to debug
	// afterAll(async () => {
	// 	try {
	// 		await exec(`taq stop sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
	// 	} catch (e: unknown) {
	// 		console.log(e);
	// 	}
	// 	await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	// });
});
