import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Jest Plugin E2E Testing for the Taqueria CLI', () => {
	test('test will offer contextual help - slowtest', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		await new Promise(r => setTimeout(r, 2750));
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	test('jest will offer contextual help', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		await new Promise(r => setTimeout(r, 750));

		const { stdout: stdout3 } = await execute('taq', 'jest --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Setup a directory as a partition to run Jest tests']));

		await cleanup();
	});

	test('create contract-test will offer contextual help - slowtest', async () => {
		const { execute, cleanup, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		await new Promise(r => setTimeout(r, 750));

		const { stdout: stdout3 } = await execute('taq', 'create contract-test --help', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Create files from pre-existing templates']));

		await cleanup();
	});

	test('test will create a default "tests" partition and jest config when called with no arguments', async () => {
		const { execute, cleanup, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['No tests found, exiting with code 1']));

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
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test -i automated-tests-initialization', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Initialized successfully.']));

		await exists('./test-project/automated-tests-initialization');

		await cleanup();
	});

	test('local jest config will reference global config with local info added - slowtest', async () => {
		const { execute, cleanup, readFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test -i test-config', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Initialized successfully.']));

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
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test -i dummy-test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file = await (await exec(`cat e2e/data/jest-data/empty-jest-test-file-1.ts`)).stdout;
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
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test -i multi-file-test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file_one = await (await exec(`cat e2e/data/jest-data/empty-jest-test-file-1.ts`)).stdout;
		await writeFile('./test-project/multi-file-test/empty-jest-test-file-1.spec.ts', test_file_one);
		const test_file_two = await (await exec(`cat e2e/data/jest-data/empty-jest-test-file-2.ts`)).stdout;
		await writeFile('./test-project/multi-file-test/empty-jest-test-file-2.spec.ts', test_file_two);

		const { stderr } = await execute('taq', 'test multi-file-test', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['PASS  multi-file-test/empty-jest-test-file-1.spec.ts']));
		expect(stderr).toEqual(expect.arrayContaining(['PASS  multi-file-test/empty-jest-test-file-2.spec.ts']));

		await cleanup();
	});

	test('all tests matching a test pattern will run inside of a test partition - slowtest', async () => {
		const { execute, cleanup, writeFile, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test -i multi-file-single-test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file_one = await (await exec(`cat e2e/data/jest-data/empty-jest-test-file-1.ts`)).stdout;
		await writeFile('./test-project/multi-file-single-test/empty-jest-test-file-1.spec.ts', test_file_one);
		const test_file_two = await (await exec(`cat e2e/data/jest-data/empty-jest-test-file-2.ts`)).stdout;
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
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test -i multi-file-single-test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['Initialized successfully.']));

		const test_file_one = await (await exec(`cat e2e/data/jest-data/empty-jest-test-file-1.ts`)).stdout;
		await writeFile('./test-project/multi-file-single-test/empty-jest-test-file-1.spec.ts', test_file_one);
		const test_file_two = await (await exec(`cat e2e/data/jest-data/empty-jest-test-file-2.ts`)).stdout;
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
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const { stdout: stdout3 } = await execute('taq', 'test', './test-project');
		expect(stdout3).toEqual(expect.arrayContaining(['No tests found, exiting with code 1']));

		await cleanup();
	});

	test('create contract-test will create an integration-test for a contract from test stubs', async () => {
		const { execute, cleanup, writeFile, readFile, exists, spawn } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-jest', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('npm', 'install --save-dev ts-jest', './test-project');
		expect(stdout1).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));
		const { stdout: stdout2 } = await execute('npm', 'i --save-dev @types/jest', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining([expect.stringContaining('packages')]));

		const tz_file = await (await exec(`cat e2e/data/michelson-data/increment.tz`)).stdout;
		await writeFile('./test-project/artifacts/increment.tz', tz_file);

		const { stdout: stdout3 } = await execute('taq', 'create contract-test increment.tz', './test-project');
		expect(stdout3).toEqual(
			expect.arrayContaining(['Test suite generated: {{base}}/test-project/tests/increment.spec.ts']),
		);

		await exists('./test-project/tests/increment.spec.ts');
		await exists('./test-project/tests/jest.config.js');
		await exists('./test-project/tests/types/');

		const specContents = await readFile(`./test-project/tests/increment.spec.ts`);
		expect(specContents).toContain("describe('increment', () => {");

		await cleanup();
	});
});
