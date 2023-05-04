import { exec as exec1 } from 'child_process';
import { createHash } from 'crypto';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

// See https://github.com/ecadlabs/taqueria/issues/1859
// See https://github.com/ecadlabs/taqueria/issues/1867
test('regression against #1859, ligo compile-all will not create infinite storage files', async () => {
	const { execute, cleanup, writeFile, exists } = await prepareEnvironment();

	// set up the project
	await execute('taq', 'init test-project');
	await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');

	// copy jsligo files to contracts folder
	const jligo_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.jsligo`)).stdout;
	await writeFile('./test-project/contracts/pokeGame.jsligo', jligo_file);
	const storage_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.storageList.jsligo`)).stdout;
	await writeFile('./test-project/contracts/pokeGame.storageList.jsligo', storage_file);
	const parameters_file = await (await exec(`cat e2e/data/ligo-data/pokeGame.parameterList.jsligo`)).stdout;
	await writeFile('./test-project/contracts/pokeGame.parameterList.jsligo', parameters_file);

	// compile the contract using compile-all task
	const { stdout } = await execute('taq', 'compile-all', './test-project');
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

	// Cleanup
	await cleanup();
});
