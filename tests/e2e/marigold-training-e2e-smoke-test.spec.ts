import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import { readFile } from 'fs/promises';

describe('Marigold Training E2E Smoke Test for Taqueria CLI', () => {
	test('Part 1, Step 1 : Create folder & file - slowTest', async () => {
		// set up the project
		const { execute, cleanup, writeFile, exists, path: projectPath } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		// console.log(projectPath)

		// use prepard config with funded PKH
		const test_config_file = await readFile(
			'e2e/data/config-data/config-taquito-test-environment-funded-pkh.json',
			'utf8',
		);
		await writeFile('./test-project/.taq/config.json', test_config_file);

		// install plugins
		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		await execute('taq', 'install ../taqueria-plugin-taquito', './test-project');

		// copy jsligo files to contracts folder
		const jligo_file = await readFile('e2e/data/ligo-data/pokeGame.jsligo', 'utf8');
		await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
		const storage_file = await readFile('e2e/data/ligo-data/pokeGame.storageList.jsligo', 'utf8');
		await writeFile('./test-project/contracts/pokeGame.storageList.jsligo', storage_file);
		const parameters_file = await readFile('e2e/data/ligo-data/pokeGame.parameterList.jsligo', 'utf8');
		await writeFile('./test-project/contracts/pokeGame.parameterList.jsligo', parameters_file);

		// compile the contract
		const compileResult = await execute('taq', 'compile pokeGame.jsligo', './test-project');
		// console.log(compileResult);
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
		// TODO: fix
		// const { stdout: stdout2 } = await execute(
		// 	'taq',
		// 	'simulate pokeGame.tz --param pokeGame.parameter.default_parameter.tz',
		// 	'./test-project',
		// );

		// deploy the contract
		const deplotResult = await execute(
			'taq',
			'deploy pokeGame.tz -e "testing"',
			'./test-project',
		);

		expect(deplotResult.stdout.join("\n")).toContain('https://rpc.ghostnet.teztnets.xyz/')

		// tear down the project
		await cleanup();
	});

	test('Part 2, Step 2 : Write unit tests', async () => {
		const { execute, cleanup, writeFile, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const test_config_file = await readFile(
			'e2e/data/config-data/config-taquito-test-environment-funded-pkh.json',
			'utf8',
		);
		await writeFile('./test-project/.taq/config.json', test_config_file);

		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		await execute('taq', 'install ../taqueria-plugin-taquito', './test-project');

		const jligo_file = await readFile('e2e/data/ligo-data/unit_pokeGame.jsligo', 'utf8');
		await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
		const storage_file = await readFile('e2e/data/ligo-data/pokeGame.storageList.jsligo', 'utf8');
		await writeFile('./test-project/contracts/pokeGame.storageList.jsligo', storage_file);
		const parameters_file = await readFile('e2e/data/ligo-data/pokeGame.parameterList.jsligo', 'utf8');
		await writeFile('./test-project/contracts/pokeGame.parameterList.jsligo', parameters_file);
		const unit_test_file = await readFile('e2e/data/ligo-data/unit_pokeGame.jsligo', 'utf8');
		await writeFile('./test-project/contracts/unit_pokeGame.jsligo', unit_test_file);

		const { stdout, stderr: _stderr } = await execute('taq', 'test unit_pokeGame.jsligo', './test-project');
		expect(stdout).toEqual(expect.arrayContaining([expect.stringContaining('🎉 All tests passed 🎉')]));

		await cleanup();
	});
});
