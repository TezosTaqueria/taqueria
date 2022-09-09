import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import utils from 'util';
import * as contents from './data/help-contents/taquito-contents';
import { networkInfo } from './data/network-info';
import { checkContractExistsOnNetwork, generateTestProject } from './utils/utils';
const exec = utils.promisify(exec1);

describe('E2E Testing for taqueria taquito plugin', () => {
	const taqueriaProjectPath = 'e2e/auto-test-taquito-plugin';
	const contractRegex = new RegExp(/(KT1)+\w{33}?/);
	let environment: string;

	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['taquito']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}
	});

	beforeEach(async () => {
		await exec(`cp e2e/data/anyContract.storage ${taqueriaProjectPath}/artifacts/`);
	});

	test('Verify that the taquito plugin exposes the associated commands in the help menu', async () => {
		try {
			const taquitoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
			expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPlugin);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the taquito plugin exposes the associated options in the help menu', async () => {
		try {
			const taquitoHelpContents = await exec(`taq deploy --help --projectDir=${taqueriaProjectPath}`);
			expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginSpecific);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that the taquito plugin aliases expose the correct info in the help menu', async () => {
		try {
			const taquitoHelpContents = await exec(`taq originate --help --projectDir=${taqueriaProjectPath}`);
			expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginSpecific);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	test('Verify that taqueria taquito plugin can deploy one contract using deploy command', async () => {
		environment = 'test';

		// 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

		// 2. Run taq deploy on a selected test network described in "test" environment

		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});
		console.log(deployCommand);
		const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

		// 3. Verify that contract has been originated on the network
		expect(deployResponse).toContain('hello-tacos.tz');
		expect(deployResponse).toContain(networkInfo.networkName);
		const contractHash = deployResponse.split('│')[2].trim();

		expect(contractHash).toMatch(contractRegex);

		// 4. Verify that contract has been originated to the network
		expect(
			await checkContractExistsOnNetwork(
				contractHash,
				networkInfo.networkURL,
			),
		)
			.toBe(contractHash);
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	test('Verify that taqueria taquito plugin can deploy one contract using deploy {contractName} command', async () => {
		try {
			environment = 'test';

			// 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
			await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
			await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts/`);

			// 2. Run taq deploy ${contractName} on a selected test network described in "test" environment

			const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
				cwd: `./${taqueriaProjectPath}`,
			});
			const deployResponse = deployCommand.stdout.trim().split(/\r?\n/)[3];

			// 3. Get the KT address from the output
			expect(deployResponse).toContain('hello-tacos.tz');
			expect(deployResponse).toContain(networkInfo.networkName);
			const contractHash = deployResponse.split('│')[2].trim();

			expect(contractHash).toMatch(contractRegex);

			// 4. Verify that contract has been originated to the network
			expect(
				await checkContractExistsOnNetwork(
					contractHash,
					networkInfo.networkURL,
				),
			)
				.toBe(contractHash);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	// Skipped because the deploy task will only deploy one contract at a time for now
	test.skip('Verify that taqueria taquito plugin can deploy multiple contracts using deploy command', async () => {
		environment = 'test';
		const contract1 = 'hello-tacos-one.tz';
		const contract2 = 'hello-tacos-two.tz';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(
			`cp e2e/data/config-taquito-test-environment-multiple-contracts.json ${taqueriaProjectPath}/.taq/config.json`,
		);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/${contract1}`);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/${contract2}`);

		const deployCommand = await exec(`taq originate -e ${environment}`, { cwd: `./${taqueriaProjectPath}` });
		const deployResponse = deployCommand.stdout.trim();

		expect(deployResponse).toContain(contract1);
		expect(deployResponse).toContain(networkInfo.networkName);
		const contractOneHash = (deployResponse
			.split('\n')
			.find(line => line.includes(contract1))
			?.split('│')[2]
			?.trim()) ?? 'one';
		expect(contractOneHash).toMatch(contractRegex);

		expect(deployResponse).toContain(contract2);
		expect(deployResponse).toContain(networkInfo.networkName);
		const contractTwoHash = (deployResponse
			.split('\n')
			.find(line => line.includes(contract2))
			?.split('│')[2]
			.trim()) ?? 'two';
		expect(contractTwoHash).toMatch(contractRegex);

		// 4. Verify that contracts have been originated to the network
		expect(
			await checkContractExistsOnNetwork(
				contractOneHash,
				networkInfo.networkURL,
			),
		)
			.toBe(contractOneHash);

		expect(
			await checkContractExistsOnNetwork(
				contractTwoHash,
				networkInfo.networkURL,
			),
		)
			.toBe(contractTwoHash);

		// 5. Verify that contracts originated on the network have different addresses
		expect(contractOneHash).not.toEqual(contractTwoHash);
	});

	test('Verify that taqueria taquito plugin will show proper error when environment does not exists', async () => {
		try {
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
			// Environment test does not exist on default config.json
			environment = 'tes';

			// 1. Run taq deploy on a network described in "test" environment
			await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
				cwd: `./${taqueriaProjectPath}`,
			});
		} catch (error) {
			// 2. Verify that proper error is displayed in the console
			expect(error).toContain('There is no environment called tes in your config.json.');
		}
	});

	// TODO: Reinstate test after https://github.com/ecadlabs/taqueria/issues/642
	test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> invalid network name in the environment', async () => {
		try {
			// Environment test does not exist on default config.json
			environment = 'test';

			// 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
			await exec(
				`cp e2e/data/config-taquito-test-environment-invalid-config-networkname.json ${taqueriaProjectPath}/.taq/config.json`,
			);
			await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

			// 2. Run taq deploy on a network described in "test" environment
			await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
				cwd: `./${taqueriaProjectPath}`,
			});
		} catch (error) {
			expect(error).toContain('E_INVALID_PLUGIN_RESPONSE');
			// throw new Error (`error: ${error}`);
		}
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/673
	test.skip('Verify that taqueria taquito plugin will show proper error when faucet is wrong -> network url is wrong', async () => {
		// Environment test does not exist on default config.json
		environment = 'test';

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
		expect(stdoutDeploy.stderr).toContain('HttpRequestFailed: Request to https://invalid.test/chains/main/blocks/');
	});

	// TODO: Reinstate this test after https://github.com/ecadlabs/taqueria/issues/641
	test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> empty', async () => {
		// Environment test does not exist on default config.json
		environment = 'test';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
		await exec(
			`cp e2e/data/config-taquito-test-environment-invalid-faucet-empty.json ${taqueriaProjectPath}/.taq/config.json`,
		);

		// 2. Run taq deploy on a network described in "test" environment
		const stdoutDeploy = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain('Error: Unsupported key type');
	});

	// TODO: Reinstate this test after https://github.com/ecadlabs/taqueria/issues/641
	test.skip('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> invalid pkh', async () => {
		// Environment test does not exist on default config.json
		environment = 'test';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
		await exec(
			`cp e2e/data/config-taquito-test-environment-invalid-faucet-pkh.json ${taqueriaProjectPath}/.taq/config.json`,
		);

		// 2. Run taq deploy on a network described in "test" environment
		const stdoutDeploy = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain('Error: Unsupported key type');
	});

	test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not provided', async () => {
		// Environment test does not exist on default config.json
		environment = 'test';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
		await exec(
			`cp e2e/data/config-taquito-test-environment-invalid-initial-storage.json ${taqueriaProjectPath}/.taq/config.json`,
		);

		// 2. Run taq deploy on a network described in "test" environment
		const stdoutDeploy = await exec(`taq deploy hello-tacos.tz -e ${environment}`, { cwd: `./${taqueriaProjectPath}` });

		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain('❌ No initial storage file was found for hello-tacos.tz');
		expect(stdoutDeploy.stderr).toContain(
			'Storage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "hello-tacos.default_storage.tz" in the artifacts directory',
		);
		expect(stdoutDeploy.stderr).toContain(
			'You can also manually pass a storage file to the deploy task using the --storage STORAGE_FILE_NAME option',
		);
	});

	test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not a number', async () => {
		// Environment test does not exist on default config.json
		environment = 'test';

		// 1. Copy config.json and two michelson contracts from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
		await exec(`cp e2e/data/string.storage ${taqueriaProjectPath}/artifacts/`);
		await exec(
			`cp e2e/data/config-taquito-test-environment-invalid-initial-storage-string.json ${taqueriaProjectPath}/.taq/config.json`,
		);

		// 2. Run taq deploy on a network described in "test" environment
		const stdoutDeploy = await exec(`taq deploy hello-tacos.tz --storage string.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain(
			"(permanent) proto.013-PtJakart.michelson_v1.invalid_expression_kind - There was a problem communicating with the chain. Perhaps review your RPC URL of the network or sandbox you're targeting.",
		);
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
		try {
			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
