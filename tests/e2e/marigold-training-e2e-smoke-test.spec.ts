import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Marigold Training E2E Smoke Test for Taqueria CLI', () => {
	test('Part 1, Step 1 : Create folder & file', async () => {
		// set up the project
		const { execute, cleanup, writeFile, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		// use prepard config with funded PKH
		const test_config_file =
			await (await exec('cat e2e/data/config-data/config-taquito-test-environment-funded-pkh.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		// install plugins
		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');
		await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-tezos-client/index.js');
		await execute('taq', 'install ../taqueria-plugin-taquito', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');

		// copy jsligo files to contracts folder
		const jligo_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
		const storage_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.storageList.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.storageList.jsligo', storage_file);
		const parameters_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.parameterList.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.parameterList.jsligo', parameters_file);

		// compile the contract
		const compileResult = await execute('taq', 'compile pokeGame.jsligo', './test-project');
		console.log(compileResult);
		expect(compileResult.stdout).toEqual([
			'┌─────────────────┬───────────────────────────────────────────────────┐',
			'│ Source          │ Artifact                                          │',
			'├─────────────────┼───────────────────────────────────────────────────┤',
			'│ pokeGame.jsligo │ artifacts/pokeGame.tz                             │',
			'│                 │ artifacts/pokeGame.default_storage.tz             │',
			'│                 │ artifacts/pokeGame.parameter.default_parameter.tz │',
			'└─────────────────┴───────────────────────────────────────────────────┘',
			'Compiled 1 contract(s) in "pokeGame.jsligo"',
		]);

		// simulate the contract
		const { stdout: stdout2 } = await execute(
			'taq',
			'simulate pokeGame.tz --param pokeGame.parameter.default_parameter.tz',
			'./test-project',
		);

		// deploy the contract
		const { stdout: stdout4 } = await execute(
			'taq',
			'deploy pokeGame.tz -e "testing"',
			'./test-project',
		);
		expect(stdout4).toEqual(expect.arrayContaining([expect.stringContaining('https://rpc.ghostnet.teztnets.xyz/')]));

		// tear down the project
		await cleanup();
	});

	test('Part 2, Step 2 : Write unit tests', async () => {
		const { execute, cleanup, writeFile, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const test_config_file =
			await (await exec('cat e2e/data/config-data/config-taquito-test-environment-funded-pkh.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');
		await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-tezos-client/index.js');
		await execute('taq', 'install ../taqueria-plugin-taquito', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');

		const jligo_file = await (await exec(`cat e2e/data/ligo-data/unit_pokeGame.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
		const storage_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.storageList.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.storageList.jsligo', storage_file);
		const parameters_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.parameterList.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.parameterList.jsligo', parameters_file);
		const unit_test_file = await (await exec(`cat e2e/data/ligo-data/unit_pokeGame.jsligo`)).stdout;
		await writeFile('./test-project/contracts/unit_pokeGame.jsligo', unit_test_file);

		const { stdout, stderr: _stderr } = await execute('taq', 'test unit_pokeGame.jsligo', './test-project');
		expect(stdout).toEqual(expect.arrayContaining([expect.stringContaining('🎉 All tests passed 🎉')]));

		await cleanup();
	});
});
