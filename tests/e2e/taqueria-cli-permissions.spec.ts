import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import os from 'os';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-cli-permissions';
let username = os.userInfo().username;
let userGroup: string;

const operatingSystem = os.type();
let userStatCommand: string;
let groupStatCommand: string;

if (operatingSystem == `Linux`) {
	userStatCommand = `stat -c %U`;
	groupStatCommand = `stat -c %G`;
}

if (operatingSystem == `Darwin`) {
	userStatCommand = `stat -f %Su`;
	groupStatCommand = `stat -f %Sg`;
}

describe('E2E Testing for taqueria plugin file permissions,', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo', 'archetype', 'contract-types']);

		await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);
		await exec(`cp e2e/data/increment.jsligo ${taqueriaProjectPath}/contracts`);
		await exec(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);

		// Register the contracts
		await exec(`taq add-contract fa12.arl`, { cwd: `./${taqueriaProjectPath}` });
		await exec(`taq add-contract increment.jsligo`, { cwd: `./${taqueriaProjectPath}` });
		await exec(`taq add-contract hello-tacos.py`, { cwd: `./${taqueriaProjectPath}` });

		if (operatingSystem == `Linux`) {
			userGroup = (await exec(`id -g -n ${username}`)).stdout.trim();
		}

		if (operatingSystem == `Darwin`) {
			userGroup = 'wheel';
		}
	});

	test('testing that CI pipeline is not running as root', async () => {
		expect(username).not.toBe('root');
		expect(userGroup).not.toBe('root');
		// If the CI pipeline is running as root, the following tests will always pass
		// even if the logic being tested is failing
	});

	test.skip('testing that ligo artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin ligo increment.jsligo`, { cwd: `./${taqueriaProjectPath}` });
		const fileUser = await exec(`${userStatCommand} ${taqueriaProjectPath}/artifacts/increment.tz`);
		const fileGroup = await exec(`${groupStatCommand} ${taqueriaProjectPath}/artifacts/increment.tz`);

		expect(fileUser.stdout.trim()).toBe(username);
		expect(fileGroup.stdout.trim()).toBe(userGroup);
	});

	test('testing that archetype artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin archetype`, { cwd: `./${taqueriaProjectPath}` });
		const fileUser = await exec(`${userStatCommand} ${taqueriaProjectPath}/artifacts/fa12.tz`);
		const fileGroup = await exec(`${groupStatCommand} ${taqueriaProjectPath}/artifacts/fa12.tz`);

		expect(fileUser.stdout.trim()).toBe(username);
		expect(fileGroup.stdout.trim()).toBe(userGroup);
	});

	// Skipping test currently due to smartpy installation in pipeline causing build to hang for hours
	// and in the future we will use a docker container. When that is a reality we can enable this test
	test.skip('testing that smartpy artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin smartpy`, { cwd: `./${taqueriaProjectPath}` });
		const fileFolderUser = await exec(`${userStatCommand} ${taqueriaProjectPath}/artifacts/HelloTacos_comp/`);
		const fileFolderGroup = await exec(`${groupStatCommand} ${taqueriaProjectPath}/artifacts/HelloTacos_comp/`);

		expect(fileFolderUser.stdout.trim()).toBe(username);
		expect(fileFolderGroup.stdout.trim()).toBe(userGroup);

		const fileContractUser = await exec(
			`${userStatCommand} ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*contract.tz`,
		);
		const fileContractGroup = await exec(
			`${groupStatCommand} ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*contract.tz`,
		);

		expect(fileContractUser.stdout.trim()).toBe(username);
		expect(fileContractGroup.stdout.trim()).toBe(userGroup);

		const fileStorageUser = await exec(
			`${userStatCommand} ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*storage.tz`,
		);
		const fileStorageGroup = await exec(
			`${groupStatCommand} ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*storage.tz`,
		);

		expect(fileStorageUser.stdout.trim()).toBe(username);
		expect(fileStorageGroup.stdout.trim()).toBe(userGroup);
	});

	test('testing that type generation artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin ligo increment.jsligo`, { cwd: `./${taqueriaProjectPath}` });
		await exec(`taq generate types`, { cwd: `./${taqueriaProjectPath}` });

		const incrementCodeUser = await exec(`${userStatCommand} ${taqueriaProjectPath}/types/increment.code.ts`);
		const incrementCodeGroup = await exec(`${groupStatCommand} ${taqueriaProjectPath}/types/increment.code.ts`);

		expect(incrementCodeUser.stdout.trim()).toBe(username);
		expect(incrementCodeGroup.stdout.trim()).toBe(userGroup);

		const incrementTypeUser = await exec(`${userStatCommand} ${taqueriaProjectPath}/types/increment.types.ts`);
		const incrementTypeGroup = await exec(`${groupStatCommand} ${taqueriaProjectPath}/types/increment.types.ts`);

		expect(incrementTypeUser.stdout.trim()).toBe(username);
		expect(incrementTypeGroup.stdout.trim()).toBe(userGroup);

		const typeAliasUser = await exec(`${userStatCommand} ${taqueriaProjectPath}/types/type-aliases.ts`);
		const typeAliasGroup = await exec(`${groupStatCommand} ${taqueriaProjectPath}/types/type-aliases.ts`);

		expect(typeAliasUser.stdout.trim()).toBe(username);
		expect(typeAliasGroup.stdout.trim()).toBe(userGroup);

		const typeUtilUser = await exec(`${userStatCommand} ${taqueriaProjectPath}/types/type-utils.ts`);
		const typeUtilGroup = await exec(`${groupStatCommand} ${taqueriaProjectPath}/types/type-utils.ts`);

		expect(typeUtilUser.stdout.trim()).toBe(username);
		expect(typeUtilGroup.stdout.trim()).toBe(userGroup);
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	// afterAll(async () => {
	// 	try {
	// 		fsPromises.rm(taqueriaProjectPath, { recursive: true });
	// 	} catch (error) {
	// 		throw new Error(`error: ${error}`);
	// 	}
	// });
});
