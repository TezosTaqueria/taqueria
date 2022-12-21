import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import path from 'path';
import util from 'util';
import * as contents from './data/help-contents/contract-types-contents';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Contract Types Plugin E2E Testing for Taqueria CLI', () => {
	test('contract types plugin will offer help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', '--help --projectDir=./test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Commands:']));

		await cleanup();
	});

	test.skip('1635 - generate types offers contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'generate types --help --projectDir=./test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Generate types for a contract to be used with taquito']));

		await cleanup();
	});

	test.skip('1635 - gen offers contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', 'gen --help --projectDir=./test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Generate types for a contract to be used with taquito']));

		await cleanup();
	});

	test('generate types will only output the typeScriptDir and will not create a types dir when no contracts exist', async () => {
		const { execute, spawn, cleanup, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout1 } = await execute('taq', 'generate types', './test-project');
		expect(stdout1).toContain(`generateTypes { typescriptDir: 'types' }`);

		expect(await ls('./test-project/')).not.toContain('types');

		await cleanup();
	});

	test('generate types types can compile one contract and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		const {} = await execute('taq', 'compile increment.jsligo', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'generate types types', './test-project');
		expect(stdout2).toContain(`generateTypes { typescriptDir: 'types' }`);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Generating Types: {{base}}/test-project/artifacts => {{base}}/test-project/types']),
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Contracts Found:']));
		expect(stdout2).toEqual(expect.arrayContaining(['- {{base}}/test-project/artifacts/increment.tz']));
		expect(stdout2).toEqual(expect.arrayContaining(['Processing /increment.tz...']));
		expect(stdout2).toEqual(expect.arrayContaining(['increment.tz: Types generated']));

		expect(await ls('./test-project/')).toContain('types');
		expect(await ls('./test-project/types')).toContain('increment.code.ts');
		expect(await ls('./test-project/types')).toContain('increment.types.ts');
		expect(await ls('./test-project/types')).toContain('type-aliases.ts');
		expect(await ls('./test-project/types')).toContain('type-utils.ts');

		await cleanup();
	});

	test('gentypes types can compile one contract and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		const {} = await execute('taq', 'compile increment.jsligo', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'gentypes types', './test-project');
		expect(stdout2).toContain(`generateTypes { typescriptDir: 'types' }`);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Generating Types: {{base}}/test-project/artifacts => {{base}}/test-project/types']),
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Contracts Found:']));
		expect(stdout2).toEqual(expect.arrayContaining(['- {{base}}/test-project/artifacts/increment.tz']));
		expect(stdout2).toEqual(expect.arrayContaining(['Processing /increment.tz...']));
		expect(stdout2).toEqual(expect.arrayContaining(['increment.tz: Types generated']));

		expect(await ls('./test-project/')).toContain('types');
		expect(await ls('./test-project/types')).toContain('increment.code.ts');
		expect(await ls('./test-project/types')).toContain('increment.types.ts');
		expect(await ls('./test-project/types')).toContain('type-aliases.ts');
		expect(await ls('./test-project/types')).toContain('type-utils.ts');

		await cleanup();
	});

	test('gen types can compile one contract and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		const {} = await execute('taq', 'compile increment.jsligo', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'gen types', './test-project');
		expect(stdout2).toContain(`generateTypes { typescriptDir: 'types' }`);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Generating Types: {{base}}/test-project/artifacts => {{base}}/test-project/types']),
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Contracts Found:']));
		expect(stdout2).toEqual(expect.arrayContaining(['- {{base}}/test-project/artifacts/increment.tz']));
		expect(stdout2).toEqual(expect.arrayContaining(['Processing /increment.tz...']));
		expect(stdout2).toEqual(expect.arrayContaining(['increment.tz: Types generated']));

		expect(await ls('./test-project/')).toContain('types');
		expect(await ls('./test-project/types')).toContain('increment.code.ts');
		expect(await ls('./test-project/types')).toContain('increment.types.ts');
		expect(await ls('./test-project/types')).toContain('type-aliases.ts');
		expect(await ls('./test-project/types')).toContain('type-utils.ts');

		await cleanup();
	});

	test('generate types -t "file" can compile one contract and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		const {} = await execute('taq', 'compile increment.jsligo', './test-project');

		const { stdout: stdout2 } = await execute('taq', 'generate types -t "file"', './test-project');
		expect(stdout2).toContain(`generateTypes { typescriptDir: 'types' }`);
		expect(stdout2).toEqual(
			expect.arrayContaining(['Generating Types: {{base}}/test-project/artifacts => {{base}}/test-project/types']),
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Contracts Found:']));
		expect(stdout2).toEqual(expect.arrayContaining(['- {{base}}/test-project/artifacts/increment.tz']));
		expect(stdout2).toEqual(expect.arrayContaining(['Processing /increment.tz...']));
		expect(stdout2).toEqual(expect.arrayContaining(['increment.tz: Types generated']));

		expect(await ls('./test-project/')).toContain('types');
		expect(await ls('./test-project/types')).toContain('increment.code.ts');
		expect(await ls('./test-project/types')).toContain('increment.types.ts');
		expect(await ls('./test-project/types')).toContain('type-aliases.ts');
		expect(await ls('./test-project/types')).toContain('type-utils.ts');

		await cleanup();
	});

	// describe('E2E Testing for taqueria contract types plugin: Generate Example Contracts', () => {
	// 	beforeAll(async () => {
	// 		await generateTestProject(taqueriaProjectPath, ['contract-types']);
	// 		// TODO: This can removed after this is resolved:
	// 		// https://github.com/ecadlabs/taqueria/issues/528
	// 		try {
	// 			await exec(`taq -p ${taqueriaProjectPath}`);
	// 		} catch (_) {}

	// 		await exec(`cp -r ../taqueria-plugin-contract-types/example/contracts/* ${taqueriaProjectPath}/artifacts`);
	// 		await exec(`cp -r ../taqueria-plugin-contract-types/example/types-file/ ${taqueriaProjectPath}/types-expected`);

	// 		await exec(`taq generate types`, { cwd: `./${taqueriaProjectPath}` });
	// 	});

	// 	const testContractTypeGeneration = async (
	// 		contractFileName: string,
	// 	) => {
	// 		const expectedRaw = await fsPromises.readFile(
	// 			`${taqueriaProjectPath}/types-expected/${contractFileName}.types.ts`,
	// 			{ encoding: 'utf-8' },
	// 		);
	// 		const actualRaw = await fsPromises.readFile(`${taqueriaProjectPath}/types/${contractFileName}.types.ts`, {
	// 			encoding: 'utf-8',
	// 		});

	// 		const expected = expectedRaw; // .replace(/\s+/g, ' ');
	// 		const actual = actualRaw; // .replace(/\s+/g, ' ');

	// 		expect(expected).toEqual(actual);
	// 	};

	// 	it('Generate Types 01 - tz library', async () => {
	// 		await testContractTypeGeneration('example-contract-1');
	// 	});
	// 	it('Generate Types 02 - tz library', async () => {
	// 		await testContractTypeGeneration('example-contract-2');
	// 	});
	// 	it('Generate Types 04 - newer protocol', async () => {
	// 		await testContractTypeGeneration('example-contract-4');
	// 	});
	// 	it('Generate Types 01A - subdir', async () => {
	// 		await testContractTypeGeneration('subdir/example-contract-0');
	// 	});
	// 	it('Generate Types 01B - subsubdir', async () => {
	// 		await testContractTypeGeneration('subdir/subsubdir/example-contract-0');
	// 	});
	// 	it('Generate lambda', async () => {
	// 		await testContractTypeGeneration('example-lambda');
	// 	});

	// 	// Clean up process to remove taquified project folder
	// 	// Comment if need to debug
	// 	afterAll(async () => {
	// 		try {
	// 			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	// 		} catch (error) {
	// 			throw new Error(`error: ${error}`);
	// 		}
	// 	});
});
