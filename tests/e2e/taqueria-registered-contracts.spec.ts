import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import { copyFile, readFile, rm, writeFile } from 'fs/promises';
import { join } from 'path';
import util from 'util';
import { generateTestProject, sleep } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-registered-contracts';
const configFile = join(taqueriaProjectPath, '.taq', 'config.json');

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
	});

	afterAll(async () => {
		await rm(taqueriaProjectPath, { force: true, recursive: true });
	});

	test('Initial config has no registered contracts', async () => {
		const config = await readFile(configFile, { encoding: 'utf-8' });
		const json = JSON.parse(config);
		expect(json).toBeInstanceOf(Object);
		expect(json).not.toHaveProperty('contracts');
	});

	test('Assure that a non-existing contract cannot be registered', async () => {
		const nonExistingContract = join(taqueriaProjectPath, 'contracts', 'nonexisting');
		const result = await exec('taq add-contract nonexisting', { cwd: taqueriaProjectPath });
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

	test('Ensure that a contract can be registered with a specific name', async () => {
		await copyFile(
			'e2e/data/hello-tacos.mligo',
			join(taqueriaProjectPath, 'contracts', 'hello-tacos.mligo'),
		);

		const result = exec('taq add-contract -n tacos hello-tacos.mligo', { cwd: taqueriaProjectPath });
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
		return expect(json.contracts['tacos']).toEqual({
			sourceFile: 'hello-tacos.mligo',
			hash,
		});
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
