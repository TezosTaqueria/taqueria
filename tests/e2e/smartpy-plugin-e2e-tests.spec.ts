import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import { parse } from 'path';
import util from 'util';
const exec = util.promisify(exec1);

describe('SmartPy Plugin E2E Testing for Taqueria CLI', () => {
	test('compile will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

		const { stdout } = await execute('taq', 'compile --help', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['taq compile <sourceFile>']));

		await cleanup();
	});

	test('compile-all will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

		const { stdout } = await execute('taq', 'compile-all --help', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['taq compile-all']));

		await cleanup();
	});

	describe('test compile wrapper.py', () => {
		test('can compile a contract that requires no initial storage', async () => {
			const { execute, cleanup, exists, makeDir, path: testProjectDir } = await prepareEnvironment();
			const { readFile, writeFile } = require('fs').promises;
			const pipResult = await execute(
				'pip',
				'install https://preview.smartpy.io/0.19.0a0/tezos_smartpy-0.19.0a0-py3-none-any.whl',
			);
			expect(pipResult.stderr).toEqual([]);

			// Mimic the structure of a Taqueria project
			await makeDir('artifacts');
			await makeDir('contracts');

			// Create JSON string of parsedArgs
			const parsedArgs = JSON.stringify({
				projectDir: testProjectDir,
				config: {
					contractsDir: 'contracts',
					artifactsDir: 'artifacts',
				},
			});

			// Copy wrapper.py and some scripts to the test project
			await readFile('../taqueria-plugin-smartpy/wrapper.py', 'utf8').then((data: string) => {
				return writeFile(`${testProjectDir}/wrapper.py`, data, 'utf8');
			});

			await readFile(`${__dirname}/data/smartpy-data/minimal.py`, 'utf8').then((data: string) => {
				return writeFile(`${testProjectDir}/contracts/minimal.py`, data, 'utf8');
			});

			const wrapperResult = await execute('python', `wrapper.py ${testProjectDir}/contracts/minimal.py ${parsedArgs}`);
			expect(wrapperResult.stderr).toEqual([]);
			expect(wrapperResult.stdout).toEqual(['[{"source": "minimal.py/MyContract", "artifact": "MyContract.tz\\nMyContract.json"}]']);

			// Verify that artifacts exist
			expect(await exists('artifacts/MyContract/MyContract.tz')).toBe(true);
			expect(await exists('artifacts/MyContract/MyContract.json')).toBe(true);

			await cleanup();
		});

		test('can compile a contract that requires initial storage', async () => {
			const { execute, cleanup, exists, makeDir, path: testProjectDir } = await prepareEnvironment();
			const { readFile, writeFile } = require('fs').promises;
			const pipResult = await execute(
				'pip',
				'install https://preview.smartpy.io/0.19.0a0/tezos_smartpy-0.19.0a0-py3-none-any.whl',
			);
			expect(pipResult.stderr).toEqual([]);

			// Mimic the structure of a Taqueria project
			await makeDir('artifacts');
			await makeDir('contracts');

			// Create JSON string of parsedArgs
			const parsedArgs = JSON.stringify({
				projectDir: testProjectDir,
				config: {
					contractsDir: 'contracts',
					artifactsDir: 'artifacts',
				},
			});

			// Copy wrapper.py and some scripts to the test project
			await readFile('../taqueria-plugin-smartpy/wrapper.py', 'utf8').then((data: string) => {
				return writeFile(`${testProjectDir}/wrapper.py`, data, 'utf8');
			});

			await readFile(`${__dirname}/data/smartpy-data/chess.py`, 'utf8').then((data: string) => {
				return writeFile(`${testProjectDir}/contracts/chess.py`, data, 'utf8');
			});

			/*********** Test that missing storageList files produce a warning  ***********/

			const wrapperResult = await execute('python', `wrapper.py ${testProjectDir}/contracts/chess.py ${parsedArgs}`);

			// Expect compilation to fail due to missing a storageList file
			expect(wrapperResult.stdout).toEqual(['[{"source": "chess.py/Chess", "artifact": "Not Compiled"}]']);
			expect(wrapperResult.stderr).toEqual([
				"Warning: Contract Chess requires initial storage to be specified as an expression in the Chess.storageList.py file, which cannot be found. Here's an example:",
				'import smartpy as sp',
				'# storage expression variables must contain the word "storage"',
				'default_storage = {',
				'"count": sp.int(0)',
				'}',
			]);

			/*********** Test that empty storageList files produce a warning  ***********/
			// Copy an empty storageList.py file to the test project
			await readFile(`${__dirname}/data/smartpy-data/Chess.empty_storageList.py`, 'utf8').then((data: string) => {
				return writeFile(`${testProjectDir}/contracts/Chess.storageList.py`, data, 'utf8');
			});

			// Run the wrapper again
			const emptyResult = await execute('python', `wrapper.py ${testProjectDir}/contracts/chess.py ${parsedArgs}`);
			expect(emptyResult.stdout).toEqual(['[{"source": "chess.py/Chess", "artifact": "Not Compiled"}]']);
			expect(emptyResult.stderr).toEqual([
				"Warning: Contract Chess requires initial storage to be specified as an expression in the Chess.storageList.py file. Here's an example:",
				'import smartpy as sp',
				'# storage expression variables must contain the word "storage"',
				'default_storage = {',
				'"count": sp.int(0)',
				'}',
			]);

			/*********** Test that an invalid storageList results in no compilation  ***********/
			// Copy an invalid storageList.py file to the test project
			await readFile(`${__dirname}/data/smartpy-data/Chess.invalid_storageList.py`, 'utf8').then((data: string) => {
				return writeFile(`${testProjectDir}/contracts/Chess.storageList.py`, data, 'utf8');
			});

			// Run the wrapper again
			const invalidResult = await execute('python', `wrapper.py ${testProjectDir}/contracts/chess.py ${parsedArgs}`);
			expect(invalidResult.stdout).toEqual(['[{"source": "chess.py/Chess", "artifact": "Not Compiled"}]']);
			expect(invalidResult.stderr).toEqual([
				'Warning: Contract Chess failed to compile using the initial storage expression called default_storage.',
			]);

			/*********** Test that a valid storageList files work as expected  ***********/

			// Copy the storageList.py file to the test project
			await readFile(`${__dirname}/data/smartpy-data/Chess.storageList.py`, 'utf8').then((data: string) => {
				return writeFile(`${testProjectDir}/contracts/Chess.storageList.py`, data, 'utf8');
			});

			// Run the wrapper again
			const result = await execute('python', `wrapper.py ${testProjectDir}/contracts/chess.py ${parsedArgs}`);
			expect(result.stderr).toEqual([]);
			expect(result.stdout).toEqual([
				'[{"source": "chess.py/Chess", "artifact": "Chess.tz\\nChess.json\\nChess.default_storage.tz\\nChess.other_storage.tz"}]',
			]);

			// Expect artifacts to exist
			expect(await exists('artifacts/Chess/Chess.tz')).toBe(true);
			expect(await exists('artifacts/Chess/Chess.default_storage.tz')).toBe(true);
			expect(await exists('artifacts/Chess/Chess.other_storage.tz')).toBe(true);

			await cleanup();
		});
	});

	describe('test compile task', () => {
		test('can compile a single contract', async () => {
			const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
			const { readFile } = require('fs').promises;
		
			// Initialize project
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');
			await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
			await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

			// Copy contracts to the test project
			await readFile(`${__dirname}/data/smartpy-data/minimal.py`, 'utf8').then((data: string) => {
				return writeFile(`./test-project/contracts/minimal.py`, data);
			});
			await readFile(`${__dirname}/data/smartpy-data/chess.py`, 'utf8').then((data: string) => {
				return writeFile(`./test-project/contracts/chess.py`, data);
			});
			await readFile(`${__dirname}/data/smartpy-data/Chess.storageList.py`, 'utf8').then((data: string) => {
				return writeFile(`./test-project/contracts/Chess.storageList.py`, data);
			});
			
			// Compile the minimal contract
			const { stdout, stderr } = await execute('taq', 'compile minimal.py', './test-project');
			expect(stderr).toEqual([]);
			expect(stdout).toEqual([
				'┌───────────────────────┬─────────────────┐',
				'│ Source                │ Artifact        │',
				'├───────────────────────┼─────────────────┤',
				'│ minimal.py/MyContract │ MyContract.tz   │',
				'│                       │ MyContract.json │',
				'└───────────────────────┴─────────────────┘',
				'Compiled 1 contract(s) in "minimal.py"'
			]);

			// Verify that artifacts exist
			expect(await exists('artifacts/MyContract/MyContract.tz')).toBe(true);
			expect(await exists('artifacts/MyContract/MyContract.json')).toBe(true);

			// Clean up
			await cleanup();
		})

		test('can compile all contracts', async () => {
			const { execute, cleanup, exists, writeFile, ls } = await prepareEnvironment();
			const { readFile } = require('fs').promises;

			// Initialize project
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');
			await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
			await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

			// Copy contracts to the test project
			await Promise.all(['minimal.py', 'chess.py', 'Chess.storageList.py'].map(async (contract) => {
				await readFile(`${__dirname}/data/smartpy-data/${contract}`, 'utf8').then((data: string) => {
					return writeFile(`./test-project/contracts/${contract}`, data);
				});
			}));

			// Compile all contracts
			const { stdout, stderr } = await execute('taq', 'compile-all', './test-project');
			expect(stderr).toEqual([]);
			expect(stdout).toEqual([
				'┌───────────────────────┬──────────────────────────┐',
				'│ Source                │ Artifact                 │',
				'├───────────────────────┼──────────────────────────┤',
				'│ chess.py/Chess        │ Chess.tz                 │',
				'│                       │ Chess.json               │',
				'│                       │ Chess.default_storage.tz │',
				'│                       │ Chess.other_storage.tz   │',
				'├───────────────────────┼──────────────────────────┤',
				'│ minimal.py/MyContract │ MyContract.tz            │',
				'│                       │ MyContract.json          │',
				'└───────────────────────┴──────────────────────────┘',
				'Compiled 2 contract(s)."'
			]);

			// Verify that artifacts exist
			expect(await exists('./test-project/artifacts/MyContract/MyContract.tz')).toBe(true);
			expect(await exists('./test-project/artifacts/MyContract/MyContract.json')).toBe(true);
			expect(await exists('./test-project/artifacts/Chess/Chess.tz')).toBe(true);
			expect(await exists('./test-project/artifacts/Chess/Chess.json')).toBe(true);
			expect(await exists('./test-project/artifacts/Chess/Chess.default_storage.tz')).toBe(true);
			expect(await exists('./test-project/artifacts/Chess/Chess.other_storage.tz')).toBe(true);

			// Clean up
			await cleanup();
		})
	})

	describe('test task', () => {
		test('can test a contract', async () => {
			const { execute, cleanup, exists, writeFile, ls } = await prepareEnvironment();
			const { readFile } = require('fs').promises;

			// Initialize project
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');
			await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
			await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

			// Copy contracts to the test project
			await Promise.all(['minimal.py', 'chess.py', 'Chess.storageList.py'].map(async (contract) => {
				await readFile(`${__dirname}/data/smartpy-data/${contract}`, 'utf8').then((data: string) => {
					return writeFile(`./test-project/contracts/${contract}`, data);
				});
			}));

			// Test the minimal contract
			const { stdout, stderr } = await execute('taq', 'test minimal.py', './test-project');
			expect(stderr).toEqual([]);
			expect(stdout).toEqual(expect.arrayContaining([
				'┌────────────┬───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐',
				'│ Test       │ Results                                                                                                                   │',
				'├────────────┼───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤',
				'│ minimal.py │ === Minimal/log.txt ===                                                                                                   │',
				'│            │ Comment...                                                                                                                │',
				'│            │  h1: Minimal                                                                                                              │',
				'│            │ Creating contract KT1TezoooozzSmartPyzzSTATiCzzzwwBFA1                                                                    │',
				'│            │  -> Unit                                                                                                                  │',
			  ]));
			  

			// Assure that the log file exists
			expect(await exists('./test-project/artifacts/Minimal/log.txt')).toBe(true);

			// Clean up
			await cleanup();
		})
	})
});
