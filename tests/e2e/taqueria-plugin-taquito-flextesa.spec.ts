import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import utils from 'util';
import {
	storage_part1,
	storage_part2,
	storage_part3,
	storage_part4,
	storage_part5,
} from './data/all-types-storage-data';
import { generateTestProject, getContainerName, sleep } from './utils/utils';
const exec = utils.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-taquito-flextesa-plugin';
const contractRegex = new RegExp(/(KT1)+\w{33}?/);
let environment: string;
let dockerName: string = 'local';

describe('E2E Testing for taqueria taquito plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['taquito', 'flextesa']);
		await exec(
			`cp e2e/data/config-taquito-flextesa-local-sandbox-test-environment.json ${taqueriaProjectPath}/.taq/config.json`,
		);

		await exec(`taq start sandbox ${dockerName}`, { cwd: `./${taqueriaProjectPath}` });
	});

	beforeEach(async () => {
		await exec(`cp e2e/data/anyContract.storage ${taqueriaProjectPath}/artifacts/`);
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	test('Verify that taqueria taquito plugin can deploy one contract using deploy command', async () => {
		environment = 'development';

		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

		// 1. Run taq deploy on a selected test network described in "test" environment
		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		console.log(deployCommand);
		const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];
		console.log(deployResponse);

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
		try {
			environment = 'development';

			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

			// 1. Run taq deploy ${contractName} on a selected test network described in "test" environment
			const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
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
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	// Skipped because the deploy task will only deploy one contract at a time for now
	test.skip('Verify that taqueria taquito plugin can deploy multiple contracts using deploy command', async () => {
		environment = 'development';
		const contract1 = 'hello-tacos.tz';
		const contract2 = 'increment.tz';

		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
		await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts/`);

		const deployCommand = await exec(`taq originate -e ${environment}`, { cwd: `./${taqueriaProjectPath}` });
		const deployResponse = deployCommand.stdout.trim();

		expect(deployResponse).toContain(contract1);
		expect(deployResponse).toContain(dockerName);
		const contractOneHash = (deployResponse
			.split('\n')
			.find(line => line.includes(contract1))
			?.split('│')[2]
			?.trim()) ?? 'one';
		expect(contractOneHash).toMatch(contractRegex);

		expect(deployResponse).toContain(contract2);
		expect(deployResponse).toContain(dockerName);
		const contractTwoHash = (deployResponse
			.split('\n')
			.find(line => line.includes(contract2))
			?.split('│')[2]
			.trim()) ?? 'two';
		expect(contractTwoHash).toMatch(contractRegex);

		// 4. Verify that contracts have been originated to the network
		const contractOneFromSandbox = await exec(
			`curl http://localhost:20000/chains/main/blocks/head/context/contracts/${contractOneHash}`,
		);
		expect(contractOneFromSandbox.stdout).toContain('%numTacosToConsume');
		expect(contractOneFromSandbox.stdout).toContain('"storage":{"int":"12"}');

		const contractTwoFromSandbox = await exec(
			`curl http://localhost:20000/chains/main/blocks/head/context/contracts/${contractTwoHash}`,
		);
		expect(contractTwoFromSandbox.stdout).toContain('%increment');
		expect(contractTwoFromSandbox.stdout).toContain('"storage":{"int":"12"}');

		// 5. Verify that contracts originated on the network have different addresses
		expect(contractOneHash).not.toEqual(contractTwoHash);
	});

	test.skip('Verify that taqueria taquito plugin can deploy the all types contract to check storage of all michelson types', async () => {
		environment = 'development';

		await exec(`cp e2e/data/all-types.tz ${taqueriaProjectPath}/artifacts/`);

		// 1. Run taq deploy ${contractName} on a selected test network described in "test" environment
		const deployCommand = await exec(`taq deploy all-types.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		console.log(deployCommand);
		const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

		// 2. Get the KT address from the output
		expect(deployResponse).toContain('all-types.tz');
		expect(deployResponse).toContain(dockerName);
		const contractHash = deployResponse.split('│')[2].trim();

		expect(contractHash).toMatch(contractRegex);

		// 3. Verify that contract has been originated to the network
		const contractFromSandbox = await exec(
			`curl http://localhost:20000/chains/main/blocks/head/context/contracts/${contractHash}`,
		);

		expect(contractFromSandbox.stdout).toContain(storage_part1);
		expect(contractFromSandbox.stdout).toMatch(storage_part2);
		expect(contractFromSandbox.stdout).toContain(storage_part3);
		expect(contractFromSandbox.stdout).toMatch(storage_part4);
		expect(contractFromSandbox.stdout).toContain(storage_part5);
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
