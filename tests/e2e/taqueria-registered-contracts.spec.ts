import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import { copyFile, readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import util from 'util';
import * as contents from './data/help-contents/register-contracts-contents';
import { generateTestProject, sleep } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-registered-contracts';
const configFile = join(taqueriaProjectPath, '.taq', 'config.json');
let configFileContents: string;

const noContractsTableOutput = `┌───────────────────────────────┐
│ Contract                      │
├───────────────────────────────┤
│ No registered contracts found │
└───────────────────────────────┘
`;
const expectedTableOutput = `┌───────────────────┬───────────────────┬─────────────────┐
│ Name              │ Source File       │ Last Known Hash │
├───────────────────┼───────────────────┼─────────────────┤
│ hello-tacos.mligo │ hello-tacos.mligo │ 530f224f        │
└───────────────────┴───────────────────┴─────────────────┘
`;

describe('E2E for Registered Contracts', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath);
		await sleep(1000);

		const config = await readFile(configFile, { encoding: 'utf-8' });
		configFileContents = JSON.stringify(config);
	});

	// Remove all files from contracts folder without removing folder itself
	afterEach(async () => {
		await writeFile(configFile, JSON.parse(configFileContents), { encoding: 'utf-8' });
	});

	afterAll(async () => {
		await rm(taqueriaProjectPath, { force: true, recursive: true });
	});

	test('Verify that the taqueria contract registration add command help is shown in the help menu', async () => {
		const registerAdd = await exec(`taq add-contract --help`, { cwd: `${taqueriaProjectPath}` });
		expect(registerAdd.stdout).toBe(contents.registerAddContract);
	});

	test('Verify that the taqueria contract registration remove command help is shown in the help menu', async () => {
		const registerRemove = await exec(`taq rm-contract --help`, { cwd: `${taqueriaProjectPath}` });
		expect(registerRemove.stdout).toBe(contents.registerRemoveContract);
	});

	test('Verify that the taqueria contract registration list command help is shown in the help menu', async () => {
		const registerList = await exec(`taq list-contracts --help`, { cwd: `${taqueriaProjectPath}` });
		expect(registerList.stdout).toBe(contents.registerListContracts);
	});

	test('Initial config has no registered contracts', async () => {
		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		expect(json).not.toHaveProperty('contracts');
	});

	test('Assure that a non-existing contract cannot be registered', async () => {
		const nonExistingContract = join(taqueriaProjectPath, 'contracts', 'nonexisting');
		const result = exec('taq add-contract nonexisting', { cwd: taqueriaProjectPath });
		expect(result).rejects.toHaveProperty('stderr');
		try {
			await result;
		} catch (err) {
			const { stderr } = err as { stderr: string };
			expect(stderr).toContain('Could not read');
			expect(stderr).toContain(nonExistingContract);
		}

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		return expect(json).not.toHaveProperty('contracts');
	});

	test('Assure that an existing contract can be registered', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);
		const result = exec('taq add-contract hello-tacos.mligo', { cwd: taqueriaProjectPath });
		expect(result).resolves.toHaveProperty('stdout');
		await result;

		const bytes = await readFile(join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		return expect(json.contracts).toEqual({
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		});
	});

	test('Assure that the same contract cannot be registered twice', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);
		await exec('taq add-contract hello-tacos.mligo', { cwd: taqueriaProjectPath });

		const result = exec('taq add-contract hello-tacos.mligo', { cwd: taqueriaProjectPath });
		expect(result).rejects.toHaveProperty('stderr');
		try {
			await result;
		} catch (err) {
			const { stderr } = err as { stderr: string };
			expect(stderr).toContain('hello-tacos.mligo has already been registered');
		}

		// Assure that just a single contract is registered
		const bytes = await readFile(join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		return expect(json.contracts).toEqual({
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		});
	});

	test('Ensure that a contract can be registered with a specific name using all aliases', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);

		const result1 = exec('taq add-contract -n tacos1 hello-tacos.mligo', { cwd: taqueriaProjectPath });
		expect(result1).resolves.toHaveProperty('stdout');
		await result1;

		const result2 = exec('taq add-contract --name tacos2 hello-tacos.mligo', { cwd: taqueriaProjectPath });
		expect(result2).resolves.toHaveProperty('stdout');
		await result2;

		const result3 = exec('taq add-contract --contractName tacos3 hello-tacos.mligo', { cwd: taqueriaProjectPath });
		expect(result3).resolves.toHaveProperty('stdout');
		await result3;

		const bytes = await readFile(join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		expect(json.contracts['tacos1']).toEqual({
			sourceFile: 'hello-tacos.mligo',
			hash,
		});

		expect(json.contracts['tacos2']).toEqual({
			sourceFile: 'hello-tacos.mligo',
			hash,
		});

		expect(json.contracts['tacos3']).toEqual({
			sourceFile: 'hello-tacos.mligo',
			hash,
		});
	});

	test('Assure that non-existent contract cannot be deregistered', async () => {
		const contractName = 'hello-tacos.mligo';
		const result = exec(`taq rm-contract ${contractName}`, { cwd: taqueriaProjectPath });
		expect(result).rejects.toHaveProperty('stderr');

		try {
			await result;
		} catch (err) {
			const { stderr } = err as { stderr: string };
			expect(stderr).toContain(`${contractName} is not a registered contract`);
		}
	});

	test('Assure that a contract can be deregistered', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);

		const bytes = await readFile(join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		json.contracts = {
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		};
		await writeFile(configFile, JSON.stringify(json), { encoding: 'utf-8' });

		// Remove the contract by sourcefile
		const result = exec('taq rm-contract hello-tacos.mligo', { cwd: taqueriaProjectPath });
		expect(result).resolves.toHaveProperty('stdout');
		await result;

		const configAfter = await readFile(configFile, { encoding: 'utf-8' });
		const jsonAfter = JSON.parse(configAfter);
		expect(jsonAfter).toBeInstanceOf(Object);
		expect(jsonAfter.contracts).toEqual({});
	});

	// Currently skipping this test due to https://github.com/ecadlabs/taqueria/issues/949
	test.skip('List contracts with no contracts', async () => {
		const result = exec('taq list-contracts', { cwd: taqueriaProjectPath });
		expect(result).resolves.toHaveProperty('stdout');
		const output = (await result).stdout;
		expect(output).toEqual(noContractsTableOutput);
	});

	test('List registered contracts', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);

		const bytes = await readFile(join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		json.contracts = {
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		};
		await writeFile(configFile, JSON.stringify(json), { encoding: 'utf-8' });

		const result = exec('taq list-contracts', { cwd: taqueriaProjectPath });
		expect(result).resolves.toHaveProperty('stdout');
		const output = (await result).stdout;
		expect(output).toEqual(expectedTableOutput);
	});
});

describe('E2E for Registered Contracts via SDK', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['mock']);
		await sleep(1000);

		const config = await readFile(configFile, { encoding: 'utf-8' });
		configFileContents = JSON.stringify(config);
	});

	// Remove all files from contracts folder without removing folder itself
	afterEach(async () => {
		await writeFile(configFile, JSON.parse(configFileContents), { encoding: 'utf-8' });
	});

	afterAll(async () => {
		await rm(taqueriaProjectPath, { force: true, recursive: true });
	});

	test('Assure that a non-existing contract cannot be registered', async () => {
		const nonExistingContract = join(taqueriaProjectPath, 'contracts', 'nonexisting');

		// testRegisterContract is a task from the mock plugin that calls registerContract from the SDK
		const { stderr } = await exec('taq testRegisterContract nonexisting', { cwd: taqueriaProjectPath });

		expect(stderr).toContain('Could not read');
		expect(stderr).toContain(nonExistingContract);

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		return expect(json).not.toHaveProperty('contracts');
	});

	test('Assure that an existing contract can be registered', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);

		// testRegisterContract is a task from the mock plugin that calls registerContract from the SDK
		await exec('taq testRegisterContract hello-tacos.mligo', { cwd: taqueriaProjectPath });

		const bytes = await readFile(join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		return expect(json.contracts).toEqual({
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		});
	});

	test('Assure that the same contract cannot be registered twice', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);

		// testRegisterContract is a task from the mock plugin that calls registerContract from the SDK
		await exec('taq testRegisterContract hello-tacos.mligo', { cwd: taqueriaProjectPath });

		// testRegisterContract is a task from the mock plugin that calls registerContract from the SDK
		const { stderr } = await exec('taq testRegisterContract hello-tacos.mligo', { cwd: taqueriaProjectPath });

		expect(stderr).toContain('hello-tacos.mligo has already been registered');

		// Assure that just a single contract is registered
		const bytes = await readFile(join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'));
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		return expect(json.contracts).toEqual({
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		});
	});
});
