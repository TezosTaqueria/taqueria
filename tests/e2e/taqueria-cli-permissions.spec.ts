import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import os from 'os';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = './e2e/auto-test-cli-permissions';
let username = os.userInfo().username;

describe('E2E Testing for taqueria plugin file permissions,', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo', 'archetype', 'smartpy', 'contract-types']);
		await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);
		await exec(`cp e2e/data/increment.jsligo ${taqueriaProjectPath}/contracts`);
		await exec(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);
	});

	test('testing that ligo artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin ligo`, { cwd: `./${taqueriaProjectPath}` });
		const fileUser = await exec(`stat -c %U ${taqueriaProjectPath}/artifacts/increment.tz`);
		const fileGroup = await exec(`stat -c %G ${taqueriaProjectPath}/artifacts/increment.tz`);

		expect(fileUser.stdout.trim()).toBe(username);
		expect(fileGroup.stdout.trim()).toBe(username);
	});

	test('testing that archetype artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin archetype`, { cwd: `./${taqueriaProjectPath}` });
		const fileUser = await exec(`stat -c %U ${taqueriaProjectPath}/artifacts/fa12.tz`);
		const fileGroup = await exec(`stat -c %G ${taqueriaProjectPath}/artifacts/fa12.tz`);

		expect(fileUser.stdout.trim()).toBe(username);
		expect(fileGroup.stdout.trim()).toBe(username);
	});

	test('testing that smartpy artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin smartpy`, { cwd: `./${taqueriaProjectPath}` });
		const fileFolderUser = await exec(`stat -c %U ${taqueriaProjectPath}/artifacts/HelloTacos_comp/`);
		const fileFolderGroup = await exec(`stat -c %G ${taqueriaProjectPath}/artifacts/HelloTacos_comp/`);

		expect(fileFolderUser.stdout.trim()).toBe(username);
		expect(fileFolderGroup.stdout.trim()).toBe(username);

		const fileContractUser = await exec(`stat -c %U ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*contract.tz`);
		const fileContractGroup = await exec(`stat -c %G ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*contract.tz`);

		expect(fileContractUser.stdout.trim()).toBe(username);
		expect(fileContractGroup.stdout.trim()).toBe(username);

		const fileStorageUser = await exec(`stat -c %U ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*storage.tz`);
		const fileStorageGroup = await exec(`stat -c %G ${taqueriaProjectPath}/artifacts/HelloTacos_comp/*storage.tz`);

		expect(fileStorageUser.stdout.trim()).toBe(username);
		expect(fileStorageGroup.stdout.trim()).toBe(username);
	});

	test('testing that type generation artifacts will have the correct permissions', async () => {
		await exec(`taq compile --plugin ligo`, { cwd: `./${taqueriaProjectPath}` });
		await exec(`taq generate types`, { cwd: `./${taqueriaProjectPath}` });
		const incrementCodeUser = await exec(`stat -c %U ${taqueriaProjectPath}/types/increment.code.ts`);
		const incrementCodeGroup = await exec(`stat -c %G ${taqueriaProjectPath}/types/increment.code.ts`);

		expect(incrementCodeUser.stdout.trim()).toBe(username);
		expect(incrementCodeGroup.stdout.trim()).toBe(username);

		const incrementTypeUser = await exec(`stat -c %U ${taqueriaProjectPath}/types/increment.types.ts`);
		const incrementTypeGroup = await exec(`stat -c %G ${taqueriaProjectPath}/types/increment.types.ts`);

		expect(incrementTypeUser.stdout.trim()).toBe(username);
		expect(incrementTypeGroup.stdout.trim()).toBe(username);

		const typeAliasUser = await exec(`stat -c %U ${taqueriaProjectPath}/types/type-aliases.ts`);
		const typeAliasGroup = await exec(`stat -c %G ${taqueriaProjectPath}/types/type-aliases.ts`);

		expect(typeAliasUser.stdout.trim()).toBe(username);
		expect(typeAliasGroup.stdout.trim()).toBe(username);

		const typeUtilUser = await exec(`stat -c %U ${taqueriaProjectPath}/types/type-utils.ts`);
		const typeUtilGroup = await exec(`stat -c %G ${taqueriaProjectPath}/types/type-utils.ts`);

		expect(typeUtilUser.stdout.trim()).toBe(username);
		expect(typeUtilGroup.stdout.trim()).toBe(username);
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
