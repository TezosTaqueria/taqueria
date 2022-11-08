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

		const { stdout } = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that contract has been originated on the network
		expect(stdout).toContain('hello-tacos.tz');
		expect(stdout).toContain(networkInfo.networkName);

		const result = stdout.match(/(KT1)+\w{33}?/);
		expect(result).not.toBe(null);
		const contractHash = (result as RegExpMatchArray)[0];

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

			const { stdout } = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage -e ${environment}`, {
				cwd: `./${taqueriaProjectPath}`,
			});

			// 3. Verify that contract has been originated on the network
			expect(stdout).toContain('hello-tacos.tz');
			expect(stdout).toContain(networkInfo.networkName);

			const result = stdout.match(/(KT1)+\w{33}?/);
			expect(result).not.toBe(null);
			const contractHash = (result as RegExpMatchArray)[0];

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

	test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> invalid network name in the environment', async () => {
		// Environment test does not exist on default config.json
		environment = 'test';

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
			"The current environment is configured to use a network called 'ithaca'; however, no network of this name has been configured in .taq/config.json",
		);
		expect(badNameDeploy.stderr).toContain('No operations performed');
	});

	test('Verify that taqueria taquito plugin will show proper error when faucet is wrong -> network url is wrong', async () => {
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
		expect(stdoutDeploy.stderr).toContain('The RPC URL may be invalid. Check ./.taq/config.json');
		expect(stdoutDeploy.stderr).toContain('No operations performed');
	});

	test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not provided', async () => {
		// Environment test does not exist on default config.json
		environment = 'test';

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

		console.log(stdoutDeploy);
		// 3. Verify that proper error displays in the console
		expect(stdoutDeploy.stderr).toContain('Error while performing operation');
		expect(stdoutDeploy.stderr).toContain('michelson_v1.invalid_expression_kind');
		expect(stdoutDeploy.stderr).toContain('No operations performed');
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
