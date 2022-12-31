import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { generateContractTypesFromMichelsonCode } from '@taqueria/plugin-contract-types/src/taquito-contract-type-generator';
import { readFile } from 'fs';
import { resolve } from 'path';
import * as contents from './data/help-contents/jest-contents';
import { reference } from './data/jest.config-reference';
import { referenceCI } from './data/jest.config-reference-ci';

describe('Jest Plugin E2E Testing for the Taqueria CLI', () => {
	test('help will offer project based help', async () => {
		const { execute, cleanup, spawn, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', '--help --projectDir=./test-project', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['taq [command]']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('test will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test --help --projectDir=./test-project', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('jest will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		1;
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'jest --help --projectDir=./test-project', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	// blocked by https://github.com/ecadlabs/taqueria/issues/1635
	test.skip('create contract-test will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'create contract-test --help', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Create files from pre-existing templates']));

		await cleanup();
	});

	test('test will create a default "tests" partition and jest config when called with no arguments', async () => {
		const { execute, cleanup, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['No tests found, exiting with code 1']));

		await exists('./test-project/.taq/jest.config.js');
		await exists('./test-project/tests/jest.config.js');

		await cleanup();
	});

	test('init will initialize a different partition', async () => {
		const { execute, cleanup, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test -i automated-tests-initialization', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Initialized successfully.']));

		await exists('./test-project/automated-tests-initialization');

		await cleanup();
	});

	test('local jest config will reference global config with local info added', async () => {
		const { execute, cleanup, readFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test -i test-config', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Initialized successfully.']));

		await exists('./test-project/test-config/jest.config.js');
		const local_config_file = await readFile('./test-project/test-config/jest.config.js');
		expect(local_config_file).toContain(`const parentConfig = require('../.taq/jest.config.js'`);
		expect(local_config_file).toContain(`roots: [\n        "./"\n    ]`);

		await cleanup();
	});

	test('test can be run successfully with jest plugin', async () => {
		const { execute, cleanup, writeFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test -i dummy-test', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file = await (await exec(`cat e2e/data/empty-jest-test-file-1.ts`)).stdout;
		await writeFile('./test-project/dummy-test/empty-jest-test-file-1.spec.ts', test_file);

		const { stderr } = await execute('taq', 'test dummy-test', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['PASS  dummy-test/empty-jest-test-file-1.spec.ts']));

		await cleanup();
	});

	test('all tests inside of a test partition will run', async () => {
		const { execute, cleanup, writeFile, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test -i multi-file-test', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file_one = await (await exec(`cat e2e/data/empty-jest-test-file-1.ts`)).stdout;
		await writeFile('./test-project/multi-file-test/empty-jest-test-file-1.spec.ts', test_file_one);
		const test_file_two = await (await exec(`cat e2e/data/empty-jest-test-file-2.ts`)).stdout;
		await writeFile('./test-project/multi-file-test/empty-jest-test-file-2.spec.ts', test_file_two);

		const { stderr } = await execute('taq', 'test multi-file-test', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['PASS  multi-file-test/empty-jest-test-file-1.spec.ts']));
		expect(stderr).toEqual(expect.arrayContaining(['PASS  multi-file-test/empty-jest-test-file-2.spec.ts']));

		await cleanup();
	});

	test('all tests matching a test pattern will run inside of a test partition', async () => {
		const { execute, cleanup, writeFile, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test -i multi-file-single-test', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file_one = await (await exec(`cat e2e/data/empty-jest-test-file-1.ts`)).stdout;
		await writeFile('./test-project/multi-file-single-test/empty-jest-test-file-1.spec.ts', test_file_one);
		const test_file_two = await (await exec(`cat e2e/data/empty-jest-test-file-2.ts`)).stdout;
		await writeFile('./test-project/multi-file-single-test/empty-jest-test-file-2.spec.ts', test_file_two);

		const { stderr } = await execute('taq', 'test multi-file-single-test', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['PASS  multi-file-single-test/empty-jest-test-file-1.spec.ts']));
		expect(stderr).toEqual(expect.arrayContaining(['PASS  multi-file-single-test/empty-jest-test-file-2.spec.ts']));

		await cleanup();
	});

	test('only the tests matching a test pattern will run inside of a test partition', async () => {
		const { execute, cleanup, writeFile, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test -i multi-file-single-test', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file_one = await (await exec(`cat e2e/data/empty-jest-test-file-1.ts`)).stdout;
		await writeFile('./test-project/multi-file-single-test/empty-jest-test-file-1.spec.ts', test_file_one);
		const test_file_two = await (await exec(`cat e2e/data/empty-jest-test-file-2.ts`)).stdout;
		await writeFile('./test-project/multi-file-single-test/empty-jest-test-file-2.spec.ts', test_file_two);

		const { stderr } = await execute('taq', 'test multi-file-single-test --testPattern 1', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['PASS  multi-file-single-test/empty-jest-test-file-1.spec.ts']));
		expect(stderr).not.toEqual(expect.arrayContaining(['PASS  multi-file-single-test/empty-jest-test-file-2.spec.ts']));

		await cleanup();
	});

	test('test will error if no tests', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout1 } = await execute('taq', 'test', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining(['No tests found, exiting with code 1']));

		await cleanup();
	});

	test('create contract-test will create an integration-test for a contract from test stubs', async () => {
		const { execute, cleanup, writeFile, readFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout2 } = await execute('npm', 'i -g ts-node', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const tz_file = await (await exec(`cat e2e/data/increment.tz`)).stdout;
		await writeFile('./test-project/artifacts/increment.tz', tz_file);

		const { stdout: stdout1 } = await execute('taq', 'create contract-test increment.tz', './test-project');
		expect(stdout1).toEqual(
			expect.arrayContaining(['Test suite generated: {{base}}/test-project/tests/increment.spec.ts']),
		);

		await exists('./test-project/tests/increment.spec.ts');
		await exists('./test-project/tests/jest.config.js');
		await exists('./test-project/tests/types/');

		const specContents = await readFile(`./test-project/tests/increment.spec.ts`);
		expect(specContents).toContain("describe('increment', () => {");

		await cleanup();
	});

	// perhaps better as an integration test
	test.skip('Regression: #1098, Assure that ts-jest installs correctly', async () => {
		// // NOTE:
		// // The generateTestProject is executed once per test suite run via the
		// // beforeAll hook.
		// //
		// // generateTestProject installs a local version of the plugin via symlink
		// // (a side-effect of how NPM works when installing a plugin from a local
		// // directory)
		// //
		// // Thus, we need to install the plugin in such a way that doesn't result
		// // in NPM installing via symlink. Pack to the rescue!

		// // Pack the jest plugin
		// const taqRoot = resolve(`${__dirname}/../../`);
		// await exec('npm pack -w taqueria-plugin-jest', { cwd: taqRoot });

		// // Uninstall the npm package for the current version of the jest plugin
		// await exec('npm uninstall -D @taqueria/plugin-jest', { cwd: taqueriaProjectPath });

		// // Install the packed plugin in our project
		// await exec(`npm i -D ${taqRoot}/taqueria-plugin-jest*.tgz`, { cwd: taqueriaProjectPath });
		// await exec(`rm ${taqRoot}/taqueria-plugin-jest*.tgz`);

		// await fsPromises.stat(`./test-project//node_modules/.bin/ts-jest`);

		// // Revert to the local non-packed version of the jest plugin
		// await exec('npm uninstall -D @taqueria/plugin-jest', { cwd: taqueriaProjectPath });
		// await exec(`npm install -D ${taqRoot}/taqueria-plugin-jest`, { cwd: taqueriaProjectPath });
	});

	// perhaps better as an integration test
	test.skip('global jest config will match reference config', async () => {
		// const directory = 'config-matching';

		// await exec(`taq test -i ${directory}`, { cwd: `./test-project/` });
		// const configContents = require(`.././test-project//.taq/jest.config.js`);

		// if (process.env.CI === 'true') {
		// 	expect(configContents).toMatchObject(referenceCI);
		// } else {
		// 	expect(configContents).toMatchObject(reference);
		// }
		// const { execute, cleanup, exists, readFile, spawn } = await prepareEnvironment();
		// const { waitForText } = await spawn('taq', 'init test-project');
		// await waitForText("Project taq'ified!");
		// const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		// expect(stdout).toContain('Plugin installed successfully');

		// const { stdout: stdout1 } = await execute('taq', 'test -i config-matching', './test-project');
		// expect(stdout1).toEqual(expect.arrayContaining(["Initialized successfully."]));

		// await exists('./test-project/.taq/jest.config.js');
		// const local_config_file = await readFile('./test-project/config-matching/jest.config.js')
		// console.log(local_config_file)
		// expect(local_config_file).toContain(`const parentConfig = require('../.taq/jest.config.js'`);

		//  const reference_file = await (await exec(`cat e2e/data/jest.config-reference.ts`)).stdout;
		//  console.log(reference_file)
		//  const referenceCI_file = await (await exec(`cat e2e/data/jest.config-reference-ci.ts`)).stdout;
		//  console.log(referenceCI_file)

		//  if (process.env.CI === 'true') {
		//   	expect(local_config_file).toContain('export const reference = {');
		//   } else {
		//   	expect(local_config_file).toContain('export const referenceCI = {');
		//   }

		// await cleanup();
	});
});
