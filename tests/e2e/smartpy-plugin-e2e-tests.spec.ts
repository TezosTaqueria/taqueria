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
		const filterDockerImageMessages = (stderr: string[]) => {
			/**
			stderr could look like the following:
			Unable to find image 'ligolang/ligo:0.71.0' locally
			0.71.0: Pulling from ligolang/ligo
			31e352740f53: Pulling fs layer
			4f4fb700ef54: Pulling fs layer
			d66873d3e354: Pulling fs layer
			01000b0059ad: Pulling fs layer
			69adc53ad7bd: Pulling fs layer
			574acbf36bfc: Pulling fs layer
			01000b0059ad: Waiting
			69adc53ad7bd: Waiting
			574acbf36bfc: Waiting
			d66873d3e354: Verifying Checksum
			d66873d3e354: Download complete
			4f4fb700ef54: Verifying Checksum
			4f4fb700ef54: Download complete
			31e352740f53: Verifying Checksum
			31e352740f53: Download complete
			69adc53ad7bd: Verifying Checksum
			69adc53ad7bd: Download complete
			31e352740f53: Pull complete
			574acbf36bfc: Verifying Checksum
			574acbf36bfc: Download complete
			4f4fb700ef54: Pull complete
			d66873d3e354: Pull complete
			01000b0059ad: Verifying Checksum
			01000b0059ad: Download complete
			01000b0059ad: Pull complete
			69adc53ad7bd: Pull complete
			574acbf36bfc: Pull complete
			Digest: sha256:f70a1fb1dafa8e74237d3412e84c85eabbf8a1d539eb9c557b70e971a3adf997
			Status: Downloaded newer image for ligolang/ligo:0.71.0

			In that case, we need to remove the line that starts with "Unable to find image .* locally" and that lines that follow it till (but including) the line that starts with "Downloaded newer image"
			 */
			let skip = false;
			const filteredStderr = stderr
				.filter(line => {
					if (line.startsWith('Unable to find image')) {
						skip = true;
					}
					if (skip && line.startsWith('Downloaded newer image')) {
						skip = false;
						return false; // Also skip the line that starts with "Downloaded newer image"
					}
					return !skip;
				});

			return filteredStderr;
		};

		test('can compile a contract that requires no initial storage', async () => {
			const { execute, cleanup, exists, makeDir, path: testProjectDir } = await prepareEnvironment();
			const { readFile, writeFile } = require('fs').promises;
			const pipResult = await exec(
				'pip install https://preview.smartpy.io/0.19.0a0/tezos_smartpy-0.19.0a0-py3-none-any.whl',
			);
			expect(pipResult.stderr.trim().split('\n').filter(l => !l.includes('pip') && l.length > 0)).toEqual([]);

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
			expect(filterDockerImageMessages(wrapperResult.stderr)).toEqual([]);
			expect(wrapperResult.stdout).toEqual([
				'[{"source": "minimal.py/MyContract", "artifact": "MyContract.tz\\nMyContract.json"}]',
			]);

			// Verify that artifacts exist
			expect(await exists('artifacts/MyContract/MyContract.tz')).toBe(true);
			expect(await exists('artifacts/MyContract/MyContract.json')).toBe(true);

			await cleanup();
		});

		describe('slow test', () => {
			jest.setTimeout(100000);

			test('can compile a contract that requires initial storage', async () => {
				const { execute, cleanup, exists, makeDir, path: testProjectDir } = await prepareEnvironment();
				const { readFile, writeFile } = require('fs').promises;
				const pipResult = await exec(
					'pip install https://smartpy.io/static/tezos_smartpy-0.20.0-py3-none-any.whl',
				);
				expect(pipResult.stderr.trim().split('\n').filter(l => !l.includes('pip') && l.length > 0)).toEqual([]);

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
				expect(filterDockerImageMessages(wrapperResult.stderr)).toEqual([
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
				expect(filterDockerImageMessages(emptyResult.stderr)).toEqual([
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
				expect(filterDockerImageMessages(invalidResult.stderr).join('')).toContain(
					'Warning: Contract Chess failed to compile using the initial storage expression called default_storage.',
				);

				/*********** Test that a valid storageList files work as expected  ***********/

				// Copy the storageList.py file to the test project
				await readFile(`${__dirname}/data/smartpy-data/Chess.storageList.py`, 'utf8').then((data: string) => {
					return writeFile(`${testProjectDir}/contracts/Chess.storageList.py`, data, 'utf8');
				});

				// Run the wrapper again
				const result = await execute('python', `wrapper.py ${testProjectDir}/contracts/chess.py ${parsedArgs}`);
				expect(filterDockerImageMessages(result.stderr)).toEqual([]);
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
				'Compiled 1 contract(s) in "minimal.py"',
			]);

			// Verify that artifacts exist
			expect(await exists('./test-project/artifacts/MyContract/MyContract.tz')).toBe(true);
			expect(await exists('./test-project/artifacts/MyContract/MyContract.json')).toBe(true);

			// Clean up
			// await cleanup();
		});

		test('can compile all contracts', async () => {
			const { execute, cleanup, exists, writeFile, ls } = await prepareEnvironment();
			const { readFile } = require('fs').promises;

			// Initialize project
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');
			await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
			await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

			// Copy contracts to the test project
			await Promise.all(['minimal.py', 'chess.py', 'Chess.storageList.py'].map(async contract => {
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
				'Compiled 2 contract(s)."',
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
		});
	});

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
			await Promise.all(['minimal.py', 'chess.py', 'Chess.storageList.py'].map(async contract => {
				await readFile(`${__dirname}/data/smartpy-data/${contract}`, 'utf8').then((data: string) => {
					return writeFile(`./test-project/contracts/${contract}`, data);
				});
			}));

			// Test the minimal contract
			const { stdout, stderr } = await execute('taq', 'test minimal.py', './test-project');

			expect(stderr).toEqual([]);
			expect(stdout).toEqual(expect.arrayContaining([
				'┌────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐',
				'│ Test       │ Results                                                                                                                                      │',
				'├────────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤',
				'│ minimal.py │ === Minimal/log.txt ===                                                                                                                      │',
				'│            │ Comment...                                                                                                                                   │',
				'│            │  h1: Minimal                                                                                                                                 │',
				'│            │ Creating contract KT1TezoooozzSmartPyzzSTATiCzzzwwBFA1                                                                                       │',
				'│            │  -> Unit                                                                                                                                     │',
			]));

			// Assure that the log file exists
			expect(await exists('./test-project/artifacts/Minimal/log.txt')).toBe(true);

			// Clean up
			await cleanup();
		});
	});
});
