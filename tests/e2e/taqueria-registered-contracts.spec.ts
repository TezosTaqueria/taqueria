import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import util from 'util';
const exec = util.promisify(exec1);

describe('Registered Contracts Plugin E2E Tests for Taqueria CLI', () => {
	test('add-contract will register existing contract', async () => {
		const { execute, cleanup, writeFile, readFile, exists, ls } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'add-contract hello-tacos.mligo', './test-project');

		const bytes = await readFile('./test-project/contracts/hello-tacos.mligo');
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const configFile = await readFile('./test-project/.taq/config.json');
		const json = JSON.parse(configFile.toString());
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		expect(json.contracts).toEqual({
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		});

		await cleanup();
	});

	test('add-contract will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const { stdout } = await execute('taq', 'add-contract --help', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Add a contract to the contract registry']));

		await cleanup();
	});

	test('rm-contract will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const { stdout } = await execute('taq', 'rm-contract --help', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['Remove a contract from the contract registry']));

		await cleanup();
	});

	test('list-contracts will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const { stdout } = await execute('taq', 'list-contracts --help', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['List registered contracts']));

		await cleanup();
	});

	test('Initial config will have no registered contracts', async () => {
		const { execute, cleanup, readFile, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const json = JSON.parse(await readFile('./test-project/.taq/config.json'));
		expect(json).toBeInstanceOf(Object);
		expect(json).not.toHaveProperty('contracts');

		await cleanup();
	});

	test('add-contract will not register a contract that does not exist', async () => {
		const { execute, cleanup, readFile, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const { stderr } = await execute('taq', 'add-contract no_such_contract', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['Could not read {{base}}/test-project/contracts/no_such_contract']));

		const json = JSON.parse(await readFile('./test-project/.taq/config.json'));
		expect(json).toBeInstanceOf(Object);
		expect(json).not.toHaveProperty('contracts');

		await cleanup();
	});

	test('add-contract will not register the same contract twice', async () => {
		const { execute, cleanup, writeFile, readFile, exists, ls } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const {} = await execute('taq', 'add-contract hello-tacos.mligo', './test-project');

		const { stderr } = await execute('taq', 'add-contract hello-tacos.mligo', './test-project');
		expect(stderr).toContain('hello-tacos.mligo has already been registered');

		const bytes = await readFile('./test-project/contracts/hello-tacos.mligo');
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const configFile = await readFile('./test-project/.taq/config.json');
		const json = JSON.parse(configFile.toString());
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('contracts');
		expect(json.contracts).toEqual({
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		});

		await cleanup();
	});

	test('add-contract will register contract - test of all aliases', async () => {
		const { execute, cleanup, writeFile, readFile, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const { stderr } = await execute('taq', 'add-contract -n tacos1 hello-tacos.mligo', './test-project');
		expect(stderr).toEqual([]);
		const { stderr: stderr1 } = await execute('taq', 'add-contract --name tacos2 hello-tacos.mligo', './test-project');
		expect(stderr1).toEqual([]);
		const { stderr: stderr2 } = await execute(
			'taq',
			'add-contract --contractName tacos3 hello-tacos.mligo',
			'./test-project',
		);
		expect(stderr2).toEqual([]);

		const bytes = await readFile('./test-project/contracts/hello-tacos.mligo');
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const json = JSON.parse(await readFile('./test-project/.taq/config.json'));
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

		await cleanup();
	});

	test('rm-contract will not deregister a contract that does not exist', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const { stderr } = await execute('taq', 'rm-contract no_such_contract', './test-project');
		expect(stderr).toContain('no_such_contract is not a registered contract');

		await cleanup();
	});

	test('rm-contract will deregister a contract', async () => {
		const { execute, cleanup, writeFile, readFile, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const bytes = await readFile('./test-project/contracts/hello-tacos.mligo');
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const json = JSON.parse(await readFile('./test-project/.taq/config.json'));
		expect(json).toBeInstanceOf(Object);
		json.contracts = {
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		};
		await writeFile('./test-project/.taq/config.json', JSON.stringify(json));

		const { stderr } = await execute('taq', 'rm-contract hello-tacos.mligo', './test-project');
		expect(stderr).toEqual([]);

		const configAfter = await readFile('./test-project/.taq/config.json');
		const jsonAfter = JSON.parse(configAfter);
		expect(jsonAfter).toBeInstanceOf(Object);
		expect(jsonAfter.contracts).toEqual({});

		await cleanup();
	});

	test('list-contracts will list no contracts when there are no contracts', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const { stdout } = await execute('taq', 'list-contracts hello-tacos.mligo', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['│ No registered contracts found │']));

		await cleanup();
	});

	test('list-contracts will show registered contracts', async () => {
		const { execute, cleanup, exists, readFile, writeFile } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

		const bytes = await readFile('./test-project/contracts/hello-tacos.mligo');
		const digest = createHash('sha256');
		digest.update(bytes);
		const hash = digest.digest('hex');

		const json = JSON.parse(await readFile('./test-project/.taq/config.json'));
		expect(json).toBeInstanceOf(Object);
		json.contracts = {
			'hello-tacos.mligo': {
				sourceFile: 'hello-tacos.mligo',
				hash,
			},
		};
		await writeFile('./test-project/.taq/config.json', JSON.stringify(json));

		const { stdout } = await execute('taq', 'list-contracts', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['│ hello-tacos.mligo │ hello-tacos.mligo │ 530f224f        │']));

		await cleanup();
	});

	describe('E2E for Registered Contracts via SDK', () => {
		test('testRegisterContract will not register a contract that does not exist', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			const {} = await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-mock', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const { stderr } = await execute('taq', 'testRegisterContract no_such_contract', './test-project');
			expect(stderr).toEqual(
				expect.arrayContaining([
					'Error registering contract: Could not read {{base}}/test-project/contracts/no_such_contract',
				]),
			);

			await cleanup();
		});

		test('testRegisterContract will register a contract', async () => {
			const { execute, cleanup, exists, readFile, writeFile } = await prepareEnvironment();
			const {} = await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-mock', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

			const {} = await execute('taq', 'testRegisterContract hello-tacos.mligo', './test-project');

			const bytes = await readFile('./test-project/contracts/hello-tacos.mligo');
			const digest = createHash('sha256');
			digest.update(bytes);
			const hash = digest.digest('hex');

			const json = JSON.parse(await readFile('./test-project/.taq/config.json'));
			expect(json).toBeInstanceOf(Object);
			json.contracts = {
				'hello-tacos.mligo': {
					sourceFile: 'hello-tacos.mligo',
					hash,
				},
			};

			await cleanup();
		});

		test('testRegisterContract will not register the same contract twice', async () => {
			const { execute, cleanup, exists, readFile, writeFile } = await prepareEnvironment();
			const {} = await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');

			const mligo_file = await (await exec('cat e2e/data/hello-tacos.mligo')).stdout;
			await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);

			const { stdout } = await execute('taq', 'install ../taqueria-plugin-mock', './test-project');
			expect(stdout).toContain('Plugin installed successfully');

			const {} = await execute('taq', 'testRegisterContract hello-tacos.mligo', './test-project');

			const { stderr } = await execute('taq', 'testRegisterContract hello-tacos.mligo', './test-project');
			console.log(stderr);
			expect(stderr).toContain('hello-tacos.mligo has already been registered');

			const bytes = await readFile('./test-project/contracts/hello-tacos.mligo');
			const digest = createHash('sha256');
			digest.update(bytes);
			const hash = digest.digest('hex');

			const json = JSON.parse(await readFile('./test-project/.taq/config.json'));
			expect(json).toBeInstanceOf(Object);
			json.contracts = {
				'hello-tacos.mligo': {
					sourceFile: 'hello-tacos.mligo',
					hash,
				},
			};

			await cleanup();
		});
	});
});
