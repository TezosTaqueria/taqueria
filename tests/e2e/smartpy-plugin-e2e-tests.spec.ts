import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import { join } from 'path';
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

	test.only('compile will compile one contract with compile <sourceFile> command', async () => {
		const { execute, cleanup, exists, writeFile, path } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

		const py_file = await (await exec(`cat e2e/data/smartpy-data/hello-tacos.py`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.py', py_file);

		// the execute() function of the prepared environment fails to work here
		const result = await exec(`taq compile hello-tacos.py`, {
			cwd: join(path, 'test-project'),
			shell: process.env['SHELL'],
		});

		expect(result.stdout).toMatch(/hello-tacos\.py | test-project\/artifacts\/hello-tacos.tz/m);
		expect(result.stdout).toMatch(/hello-tacos.default_storage.tz/m);

		await exists(`./test-project/artifacts/hello-tacos.tz`);
		await exists(`./test-project/artifacts/hello-tacos.default_storage.tz`);

		await cleanup();
	});

	test('compile will error if no contract', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

		const { stdout } = await execute('taq', 'compile no_such_file.py', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['│ no_such_file.py │ Not compiled │']));

		await cleanup();
	});

	test('test will run test on <sourceFile>', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

		const py_file = await (await exec(`cat e2e/data/smartpy-data/hello-tacos.py`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.py', py_file);

		const { stdout } = await execute('taq', 'test hello-tacos.py', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['│ hello-tacos.py │ 🎉 All tests passed 🎉 │']));

		await cleanup();
	});

	test('test will show fails on test file with fails', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-smartpy', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');

		const py_file = await (await exec(`cat e2e/data/smartpy-data/hello-tacos-failed-tests.py`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos-failed-tests.py', py_file);

		const { stdout } = await execute('taq', 'test hello-tacos-failed-tests.py', './test-project');
		expect(stdout).toEqual(expect.arrayContaining(['│ hello-tacos-failed-tests.py │ Some tests failed :( │']));

		await cleanup();
	});
});
