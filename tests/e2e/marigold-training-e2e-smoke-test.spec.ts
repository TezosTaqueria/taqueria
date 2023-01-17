import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { readFile } from 'fs';

describe('Marigold Training E2E Smoke Test for Taqueria CLI', () => {
	test('Step 1 : Create folder & file', async () => {
		// set up the project
		const { execute, cleanup, writeFile, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		// use prepard config with funded PKH
		const test_config_file =
			await (await exec('cat e2e/data/config-data/config-taquito-test-environment-funded-pkh.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		// install plugins
		await execute('taq', 'install ../taqueria-plugin-core', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-core/index.js');
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
		const { stdout } = await execute('taq', 'compile pokeGame.jsligo', './test-project');
		expect(stdout).toMatchInlineSnapshot(`
       [
         "┌───────────────────────────────┬───────────────────────────────────────────────────┐",
         "│ Contract                      │ Artifact                                          │",
         "├───────────────────────────────┼───────────────────────────────────────────────────┤",
         "│ pokeGame.jsligo               │ artifacts/pokeGame.tz                             │",
         "├───────────────────────────────┼───────────────────────────────────────────────────┤",
         "│ pokeGame.storageList.jsligo   │ artifacts/pokeGame.default_storage.tz             │",
         "├───────────────────────────────┼───────────────────────────────────────────────────┤",
         "│ pokeGame.parameterList.jsligo │ artifacts/pokeGame.parameter.default_parameter.tz │",
         "└───────────────────────────────┴───────────────────────────────────────────────────┘",
       ]
   `);

		// simulate the contract
		const { stdout: stdout2 } = await execute(
			'taq',
			'simulate pokeGame.tz --param pokeGame.parameter.default_parameter.tz',
			'./test-project',
		);

		// deploy the contract
		// expect(stdout2).toEqual(expect.arrayContaining(['│ pokeGame.tz │ storage                                      │']));
		// await execute(
		// 	'taq',
		// 	'deploy pokeGame.tz -e "testing"',
		// 	'./test-project',
		// );
		// await execute('taq', 'fund -e testing', './test-project');
		const { stdout: stdout4 } = await execute(
			'taq',
			'deploy pokeGame.tz -e "testing"',
			'./test-project',
		);
		expect(stdout4).toEqual(expect.arrayContaining([expect.stringContaining('https://ghostnet.ecadinfra.com')]));

		// tear down the project
		await cleanup();
	});
});
