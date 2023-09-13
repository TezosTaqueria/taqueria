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

	describe('test wrapper.py', () => {
		test('can compile a contract that requires no initial storage', async () => {
			const { execute, cleanup, exists, makeDir, path: testProjectDir } = await prepareEnvironment();
			const { readFile, writeFile } = require('fs').promises;
			const pipResult = await execute(
				'pip',
				'install https://preview.smartpy.io/0.19.0a0/tezos_smartpy-0.19.0a0-py3-none-any.whl',
			);
			expect(pipResult.stderr).toEqual([]);

			// Mimic the structure of a Taqueria project
			await makeDir('artifacts')
			await makeDir('contracts')

			// Create JSON string of parsedArgs
			const parsedArgs = JSON.stringify({
				projectDir: testProjectDir,
				config: {
					contractsDir: 'contracts',
					artifactsDir: 'artifacts',
				}
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
			expect(wrapperResult.stdout).toEqual(['[{"source": "minimal.py/MyContract", "artifact": "MyContract.tz"}]']);

			// Verify that artifacts exist
			expect(await exists('artifacts/MyContract/MyContract.tz')).toBe(true);

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
			await makeDir('artifacts')
			await makeDir('contracts')

			// Create JSON string of parsedArgs
			const parsedArgs = JSON.stringify({
				projectDir: testProjectDir,
				config: {
					contractsDir: 'contracts',
					artifactsDir: 'artifacts',
				}
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
				'[{"source": "chess.py/Chess", "artifact": "Chess.tz\\nChess.default_storage.tz\\nChess.other_storage.tz"}]',
			]);

			// Expect artifacts to exist
			expect(await exists('artifacts/Chess/Chess.tz')).toBe(true);
			expect(await exists('artifacts/Chess/Chess.default_storage.tz')).toBe(true);
			expect(await exists('artifacts/Chess/Chess.other_storage.tz')).toBe(true);

			await cleanup();
		});
	});
});
