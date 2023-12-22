import { exec as exec1 } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import * as Tzkt from './tzkt';

jest.setTimeout(50 * 60 * 1000);

async function delay(ms: number): Promise<void> {
	return new Promise(function(resolve) {
		setTimeout(_ => resolve(), ms);
	});
}

async function bootstrappedBlockAccountsAndContracts(
	cb: (accounts: Array<any>, contracts: Array<any>) => void,
	count: number = 0,
): Promise<void> {
	try {
		let accounts = await Tzkt.fetchAccounts();
		let contracts = await Tzkt.fetchContracts();
		cb(accounts, contracts);
	} catch (e: unknown) {
		if (count < 100) {
			await delay(2 * 1000);
			console.log(
				'Retry attempt',
				count + 1,
				'Recovering from',
				e,
				// (e as Error).message,
			);
			await bootstrappedBlockAccountsAndContracts(cb, count + 1);
		} else {
			throw e;
		}
	}
}
describe('Flextesa Plugin E2E Testing for Taqueria CLI', () => {
	test('start sandbox will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute(
			'taq',
			'install ../taqueria-plugin-flextesa',
			'./test-project',
		);
		await exists(
			'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
		);

		const { stdout: stdout2 } = await execute(
			'taq',
			'start sandbox --help',
			'./test-project',
		);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Starts a flextesa sandbox']),
		);

		await cleanup();
	});

	test('sandbox stop will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute(
			'taq',
			'install ../taqueria-plugin-flextesa',
			'./test-project',
		);
		await exists(
			'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
		);

		const { stdout: stdout2 } = await execute(
			'taq',
			'stop sandbox --help',
			'./test-project',
		);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Stops a flextesa sandbox']),
		);

		await cleanup();
	});

	test('show protocols will offer known protocols', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute(
			'taq',
			'install ../taqueria-plugin-flextesa',
			'./test-project',
		);
		await exists(
			'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
		);

		const { stdout: stdout2 } = await execute(
			'taq',
			'show protocols',
			'./test-project',
		);
		expect(stdout2).toEqual(
			expect.arrayContaining([
				'│ PtLimaPtLMwfNinJi9rCfDPWea8dFgTZ1MeJ9f1m2SRic6ayiwW │',
			]),
		);

		await cleanup();
	});

	test('stop sandbox will error if call stop on a stopped sandbox', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute(
			'taq',
			'install ../taqueria-plugin-flextesa',
			'./test-project',
		);
		await exists(
			'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
		);

		const { stdout: stdout2 } = await execute(
			'taq',
			'stop sandbox local',
			'./test-project',
		);
		expect(stdout2).toEqual(['The local sandbox was not running.']);

		await cleanup();
	});

	test('list accounts will error if called on a stopped sandbox', async () => {
		5;
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute(
			'taq',
			'install ../taqueria-plugin-flextesa',
			'./test-project',
		);
		await exists(
			'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
		);

		const result = await execute(
			'taq',
			'list accounts local',
			'./test-project',
		);
		expect(result.stderr).toContain(
			// '(node:195093) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.',
			// '(Use `node --trace-deprecation ...` to show where the warning was created)',
			// '(node:195103) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.',
			// '(Use `node --trace-deprecation ...` to show where the warning was created)',
			'The local sandbox is not running.',
		);

		await cleanup();
	});

	describe('slow tests', () => {
		test('start sandbox will error if called on a started sandbox - slowtest', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');

			await execute(
				'taq',
				'install ../taqueria-plugin-flextesa',
				'./test-project',
			);
			await exists(
				'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
			);

			await execute('taq', 'start sandbox local', './test-project');

			const { stdout: stdout2 } = await execute(
				'taq',
				'start sandbox local',
				'./test-project',
			);
			expect(stdout2).toEqual(expect.arrayContaining(['Already running.']));
			await execute('taq', 'stop sandbox local', './test-project');
			await delay(4000);
			await cleanup();
		});

		test('list accounts will display the sandbox accounts - slowtest', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');

			await execute(
				'taq',
				'install ../taqueria-plugin-flextesa',
				'./test-project',
			);
			await exists(
				'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
			);

			await execute('taq', 'start sandbox local', './test-project');

			const { stdout: stdout2 } = await execute(
				'taq',
				'list accounts local',
				'./test-project',
			);
			expect(stdout2).toEqual(
				expect.arrayContaining([
					'│ Account │ Balance │ Address                              │',
				]),
			);

			await execute('taq', 'stop sandbox local', './test-project');
			await delay(4000);
			await cleanup();
		});

		test('check tzkt for default set of accounts  - slowtest', async () => {
			const {
				execute,
				cleanup,
				exists,
				path: tmpPath,
			} = await prepareEnvironment();
			const { readFile, writeFile } = require('fs').promises;
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');
			const configJsonPath = path.join(
				tmpPath,
				'./test-project/.taq/config.json',
			);
			const configJson = require(configJsonPath);
			configJson.environments!.development!.protocol = 'Nairobi';
			fs.writeFileSync(configJsonPath, JSON.stringify(configJson, null, 2));

			await execute(
				'taq',
				'install ../taqueria-plugin-flextesa',
				'./test-project',
			);
			await execute(
				'taq',
				'install ../taqueria-plugin-taquito',
				'./test-project',
			);
			await exists(
				'./test-project/node_modules/@taqueria/plugin-flextesa/index.js',
			);
			await exists(
				'./test-project/node_modules/@taqueria/plugin-taquito/index.js',
			);

			// Copy contracts to the test project
			async function copy(file: string) {
				let src = `${__dirname}/data/artifacts-for-flextesa-originate-test/${file}`;
				let data = await readFile(src);
				return writeFile(`${tmpPath}/test-project/artifacts/${file}`, data);
			}

			await Promise.all(
				[
					`Counter.default_storage.tz`,
					`Counter.tz`,
					`Counter.storage.another_count.tz`,
					`Counter.parameter.increment_by_3.tz`,
				].map(f => copy(f)),
			);

			await execute('taq', 'stop sandbox local', './test-project');
			await delay(4000);
			await execute('taq', 'start sandbox local', './test-project');
			let previousContracts = 0;
			await bootstrappedBlockAccountsAndContracts(
				(accounts: Array<any>, contracts: Array<any>) => {
					expect(accounts.length).not.toEqual(0);
					previousContracts = contracts.length;
				},
			);

			let out = await execute('taq', 'originate Counter.tz', './test-project');
			await bootstrappedBlockAccountsAndContracts(
				(accounts: Array<any>, contracts: Array<any>) => {
					expect(contracts.length).toEqual(previousContracts + 1);
				},
			);
			await execute('taq', 'stop sandbox local', './test-project');
			await cleanup();
		});
	});
});
