import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Marigold Training E2E Smoke Test for Taqueria CLI', () => {
	test('Step 1 : Create folder & file', async () => {
		const { execute, cleanup, writeFile, ls, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');
		await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-tezos-client/index.js');

		const jligo_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
		const storage_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.storageList.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.storageList.jsligo', storage_file);
		const parameters_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.parameterList.jsligo`)).stdout;
		await writeFile('./test-project/contracts/pokeGame.parameterList.jsligo', parameters_file);

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

		const { stdout: stdout2 } = await execute(
			'taq',
			'simulate pokeGame.tz --param pokeGame.parameter.default_parameter.tz',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['│ pokeGame.tz │ storage                                      │']));

		await cleanup();
	});
});
