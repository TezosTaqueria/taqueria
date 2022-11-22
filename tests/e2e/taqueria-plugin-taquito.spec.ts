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
		await exec(`cp e2e/data/anyContract.storage.tz ${taqueriaProjectPath}/artifacts/`);
	});

	test('Verify that the taquito plugin exposes the associated commands in the help menu', async () => {
		const taquitoHelpContents = await exec(`taq --help --projectDir=${taqueriaProjectPath}`);
		expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPlugin);
	});

	test('Verify that the taquito plugin exposes the associated options for deploy in the help menu', async () => {
		const taquitoHelpContents = await exec(`taq deploy --help --projectDir=${taqueriaProjectPath}`);
		expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginSpecific);
	});

	test('Verify that the taquito plugin deploy alias exposes the correct info in the help menu', async () => {
		const taquitoHelpContents = await exec(`taq originate --help --projectDir=${taqueriaProjectPath}`);
		expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginSpecific);
	});

	test('Verify that the taquito plugin transfer task expose the correct info in the help menu', async () => {
		const taquitoHelpContents = await exec(`taq transfer --help --projectDir=${taqueriaProjectPath}`);
		expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginTransferSpecific);
	});

	test('Verify that the taquito plugin transfer alias exposes the correct info in the help menu', async () => {
		const taquitoHelpContents = await exec(`taq call --help --projectDir=${taqueriaProjectPath}`);
		expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginTransferSpecific);
	});

	test('Verify that the taquito plugin fund task exposes the correct info in the help menu', async () => {
		const taquitoHelpContents = await exec(`taq fund --help --projectDir=${taqueriaProjectPath}`);
		expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginFundSpecific);
	});

	test('Verify that the taquito plugin instantiate-account task exposes the correct info in the help menu', async () => {
		const taquitoHelpContents = await exec(`taq instantiate-account --help --projectDir=${taqueriaProjectPath}`);
		expect(taquitoHelpContents.stdout).toBe(contents.helpContentsTaquitoPluginInstantiateAccountSpecific);
	});

	// TODO: Consider in future to use keygen service to update account balance programmatically
	// https://github.com/ecadlabs/taqueria/issues/378
	test('Verify that taqueria taquito plugin can deploy one contract using deploy command', async () => {
		environment = 'testing';

		// 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);

		// 2. Run taq deploy on a selected test network described in "test" environment

		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that contract has been originated on the network
		expect(deployCommand.stdout).toContain('hello-tacos.tz');
		expect(deployCommand.stdout).toContain(networkInfo.networkName);

		const result = deployCommand.stdout.match(/(KT1)+\w{33}?/);
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
		environment = 'testing';

		// 1. Copy config.json and michelson contract from data folder to artifacts folder under taqueria project
		await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/`);
		await exec(`cp e2e/data/increment.tz ${taqueriaProjectPath}/artifacts/`);

		// 2. Run taq deploy ${contractName} on a selected test network described in "test" environment

		const deployCommand = await exec(`taq deploy hello-tacos.tz --storage anyContract.storage.tz -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		// 3. Verify that contract has been originated on the network
		expect(deployCommand.stdout).toContain('hello-tacos.tz');
		expect(deployCommand.stdout).toContain(networkInfo.networkName);

		const result = deployCommand.stdout.match(/(KT1)+\w{33}?/);
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

	test('Verify that taqueria taquito plugin will show an error when running the taq fund command in a non-network environment', async () => {
		const result = await exec(`taq fund`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(result.stderr).toBe('taq fund can only be executed in a network environment\n');
	});

	test('Verify that taqueria taquito plugin will create a funding account using the taq fund command', async () => {
		environment = 'funds';

		await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);

		const result = await exec(`taq fund -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);

		const configPKH = configContents.network.fundnet.accounts.taqOperatorAccount.publicKeyHash;

		expect(result.stderr).toContain(
			`A keypair with public key hash ${configPKH} was generated for you.
To fund this account:
1. Go to https://teztnets.xyz and click "Faucet" of the target testnet
2. Copy and paste the above key into the wallet address field
3. Request some Tez (Note that you might need to wait for a few seconds for the network to register the funds)
No operations performed
`,
		);
	});

	test('Verify that taqueria taquito plugin will error when trying to fund maxed out accounts', async () => {
		environment = 'testing';

		await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);

		const result = await exec(`taq fund -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(result.stdout).toContain(
			'All instantiated accounts in the current environment, "testing", are funded up to or beyond the declared amount',
		);
	});

	test('Verify that taqueria taquito plugin can only instantiate accounts on a network once', async () => {
		environment = 'testing';

		await exec(`cp e2e/data/config-taquito-test-environment.json ${taqueriaProjectPath}/.taq/config.json`);

		const result = await exec(`taq instantiate-account -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(result.stdout).toBe(`Accounts instantiated: bob, alice, john, jane, joe.
Please execute "taq fund" targeting the same environment to fund these accounts\n`);

		const result2 = await exec(`taq instantiate-account -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(result2.stdout).toBe(
			`No accounts were instantiated because they were all instantiated in the target environment already\n`,
		);
		expect(result2.stderr).toBe(`Note: bob is already instantiated in the current environment, "testing"
Note: alice is already instantiated in the current environment, "testing"
Note: john is already instantiated in the current environment, "testing"
Note: jane is already instantiated in the current environment, "testing"
Note: joe is already instantiated in the current environment, "testing"\n`);
	});

	test('Verify that taqueria taquito plugin will fund instantiated accounts on a network', async () => {
		environment = 'testing';

		await exec(`cp e2e/data/config-taquito-test-environment-low-tez.json ${taqueriaProjectPath}/.taq/config.json`);

		const accountResult = await exec(`taq instantiate-account -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);
		const configTezAmounts = Object.values(configContents.accounts);

		expect(accountResult.stdout).toBe(`Accounts instantiated: bob, alice, john, jane, joe.
Please execute "taq fund" targeting the same environment to fund these accounts\n`);

		const fundResult = await exec(`taq fund -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		const amountFundedArray = itemArrayInTable(/[0-9]{7,}/g, fundResult);
		expect(amountFundedArray).toStrictEqual(configTezAmounts);
	});

	test('Verify that taqueria taquito plugin will can send from one instantiated account to another', async () => {
		environment = 'testing';
		const transferAmountMutez = 1000000;

		await exec(`cp e2e/data/config-taquito-test-environment-low-tez.json ${taqueriaProjectPath}/.taq/config.json`);

		const accountResult = await exec(`taq instantiate-account -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		expect(accountResult.stdout).toBe(`Accounts instantiated: bob, alice, john, jane, joe.
Please execute "taq fund" targeting the same environment to fund these accounts\n`);

		await exec(`taq fund -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		const configContents = JSON.parse(
			await fsPromises.readFile(`${taqueriaProjectPath}/.taq/config.json`, { encoding: 'utf-8' }),
		);
		const configAlicePKH = configContents.network.ghostnet.accounts.alice.publicKeyHash;
		const configAliceAmount = configContents.accounts.alice;

		await exec(`taq transfer ${configAlicePKH} --mutez ${transferAmountMutez} --sender bob -e ${environment}`, {
			cwd: `./${taqueriaProjectPath}`,
		});

		const finalTezValue = Number(configAliceAmount) + transferAmountMutez;
		const networkContractInfo = checkContractBalanceOnNetwork(configAlicePKH, networkInfo.networkURL);
		await networkContractInfo.then(info => {
			expect(info).toStrictEqual([finalTezValue]);
		});
	});

	test('Verify that taqueria taquito plugin will show proper error when environment does not exists', async () => {
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

	test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> invalid network name in the environment', async () => {
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

	test('Verify that taqueria taquito plugin will show proper error when faucet is wrong -> network url is wrong', async () => {
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

	test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not provided', async () => {
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

	test('Verify that taqueria taquito plugin will show proper error when configuration is wrong -> initial storage is not a number', async () => {
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
