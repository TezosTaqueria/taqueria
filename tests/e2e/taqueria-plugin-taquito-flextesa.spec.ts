import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import utils from 'util';
import { transferOutput } from './data/help-contents/taquito-flextesa-content';
import { generateTestProject, getContainerName, itemArrayInTable, sleep } from './utils/utils';
const exec = utils.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-taquito-flextesa-plugin';
const contractRegex = new RegExp(/(KT1)+\w{33}?/);
let environment: string;
let dockerName: string = 'local';
const addressRegex = /tz1[A-Za-z0-9]{7,}/g;
const amountRegex = /[0-9]{4,} ꜩ/g;

describe('E2E Testing for taqueria taquito plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['taquito', 'flextesa']);
		await exec(
			`cp e2e/data/config-taquito-flextesa-local-sandbox-test-environment.json ${taqueriaProjectPath}/.taq/config.json`,
		);

		await exec(`taq start sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
	});

	beforeEach(async () => {
		await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts/`);
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	test('Verify that taqueria taquito plugin can deploy one contract using deploy command', async () => {
		environment = 'development';

		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

		// 1. Run taq deploy on a selected test network described in "test" environment
		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		console.log(deployCommand);
		const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

		// 2. Verify that contract has been originated on the network
		expect(deployResponse).toContain('hello-tacos.tz');
		expect(deployResponse).toContain(dockerName);
		const contractHash = deployResponse.split('│')[2].trim();

		expect(contractHash).toMatch(contractRegex);

		// 3. Verify that contract has been originated to the network and contains storage
		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);
		const port = configContents.sandbox.local.rpcUrl;
		const contractFromSandbox = await exec(
			`curl ${port}/chains/main/blocks/head/context/contracts/${contractHash}`,
		);
		expect(contractFromSandbox.stdout).toContain('"balance":"0"');
		expect(contractFromSandbox.stdout).toContain('"storage":{"int":"12"}');
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	test('Verify that taqueria taquito plugin can deploy one contract using deploy {contractName} command', async () => {
		environment = 'development';

		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

		// 1. Run taq deploy ${contractName} on a selected test network described in "test" environment
		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

		// 2. Get the KT address from the output
		expect(deployResponse).toContain('hello-tacos.tz');
		expect(deployResponse).toContain(dockerName);
		const contractHash = deployResponse.split('│')[2].trim();

		expect(contractHash).toMatch(contractRegex);

		// 3. Verify that contract has been originated to the network
		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);
		const port = configContents.sandbox.local.rpcUrl;
		const contractFromSandbox = await exec(
			`curl ${port}/chains/main/blocks/head/context/contracts/${contractHash}`,
		);
		expect(contractFromSandbox.stdout).toContain('"balance":"0"');
		expect(contractFromSandbox.stdout).toContain('"storage":{"int":"12"}');
	});

	test('Verify that taqueria taquito plugin can transfer amount of tezos using transfer command from one account to another', async () => {
		try {
			// 1. Setting up environment name
			environment = 'development';

			// 2. Get Bob's and Alice's account addresses
			const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
			const addressArray = itemArrayInTable(addressRegex, initialContractList);

			// 3. Call transfer to transfer
			await exec(`taq transfer ${addressArray[1]} --mutez 1000000000`, { cwd: `./${taqueriaProjectPath}` });
			sleep(2500);

			// 4. Verify transfer results
			const resultContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
			const amountArray = itemArrayInTable(amountRegex, resultContractList);
			expect(amountArray[1]).toEqual('4000 ꜩ');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria taquito plugin cant transfer 0 tez using transfer command from one account to another', async () => {
		try {
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
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria taquito plugin cant transfer from non-instantiated account to another', async () => {
		try {
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
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria taquito plugin can transfer amount of tezos using transfer command from one account to another if account does not enough tezos', async () => {
		try {
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
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taqueria taquito plugin can transfer amount of tezos using call command from an account to a contract with using parameters file', async () => {
		try {
			// 1. Setting up environment name
			environment = 'development';

			// 2. Copy contract and parameters files in contract directory
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
			await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts/`);
			await exec(`cp e2e/data/hello-tacos.parameter.decrement_by_1.tz ${taqueriaProjectPath}/artifacts/`);

			// 3. Get default (Bob's) account initial amount
			const initialContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
			const addressArray = itemArrayInTable(addressRegex, initialContractList);
			const initAmountArray = itemArrayInTable(amountRegex, initialContractList);

			// 4. Run taq deploy ${contractName} on a selected test network described in "test" environment
			const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			console.log(deployCommand);
			const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

			// 5. Get the KT address from the output
			const contractHash = deployResponse.split('│')[2].trim();

			// 6. Call taq call command to transfer 0 tez from account to the contract
			const transferResult = await exec(`taq call ${contractHash} --param hello-tacos.parameter.decrement_by_1.tz`, {
				cwd: `./${taqueriaProjectPath}`,
			});

			// 7. Verify output result
			expect(transferResult.stdout).toEqual(transferOutput(contractHash));

			// 8. Verify that amount was not charged
			const resultContractList = await exec(`taq list accounts ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
			const resultAmountArray = itemArrayInTable(amountRegex, resultContractList);

			// TODO: issue with an amount
			// expect(resultAmountArray[0]).toEqual(initAmountArray[0]);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Remove all files from artifacts folder without removing folder itself
	afterEach(async () => {
		try {
			const files = await fsPromises.readdir(`${taqueriaProjectPath}/artifacts/`);
			for (const file of files) {
				await fsPromises.rm(`${taqueriaProjectPath}/artifacts/${file}`);
			}
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		const dockerContainer = await getContainerName(dockerName);
		try {
			await exec(`taq stop sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
		} catch (e: unknown) {
			console.log(
				'Could not stop sandbox. This can affect next tests. This happened in taqueria-plugin-taquito-flextesa.spec.ts',
			);
			console.log(e);
		}
		await fsPromises.rm(taqueriaProjectPath, { recursive: true });

		const dockerListStdout = await exec('docker ps -a');
		if (dockerListStdout.stdout.includes(dockerContainer)) {
			console.log(dockerListStdout);
			throw new Error('Container was not stopped properly');
		}
	});
});
