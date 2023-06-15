import { exec as exec1 } from 'child_process';
import path from 'path';
import util from 'util';
const exec = util.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Contract Types Plugin E2E Testing for Taqueria CLI', () => {
	test('contract types plugin will offer help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2 } = await execute('taq', '--help');
		expect(stdout2).toEqual(expect.arrayContaining(['Commands:']));

		await cleanup();
	});

	test('generate types offers contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute('taq', 'generate types --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Generate types for a contract to be used with taquito']));

		await cleanup();
	});

	test('gen offers contextual help', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout2, stderr } = await execute('taq', 'gen --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Generate types for a contract to be used with taquito']));

		await cleanup();
	});

	test('generate types will only output the typeScriptDir and will not create a types dir when no contracts exist', async () => {
		const { execute, spawn, cleanup, ls } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
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

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/ligo-data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		await execute('taq', 'compile increment.jsligo', './test-project');

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

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/ligo-data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		await execute('taq', 'compile increment.jsligo', './test-project');

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

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/ligo-data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		await execute('taq', 'compile increment.jsligo', './test-project');

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

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const jsligo_file = await (await exec(`cat e2e/data/ligo-data/increment.jsligo`)).stdout;
		await writeFile('./test-project/contracts/increment.jsligo', jsligo_file);

		await execute('taq', 'compile increment.jsligo', './test-project');

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

	test('generate types can compile an Auction contract and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const tz_file = await (await exec(`cat ../taqueria-plugin-contract-types/example/contracts/example-contract-1.tz`))
			.stdout;
		await writeFile('./test-project/artifacts/example-contract-1.tz', tz_file);
		const expected_types_file =
			await (await exec(`cat ../taqueria-plugin-contract-types/example/types-file/example-contract-1.types.ts`)).stdout;

		await execute('taq', 'generate types', './test-project');
		const generated_types_file = await readFile(path.join('./test-project', 'types', 'example-contract-1.types.ts'));

		expect(generated_types_file).toBe(expected_types_file);

		await cleanup();
	});

	test('generate types can compile an FA2 contract and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout, stderr } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');

		expect(stdout).toContain('Plugin installed successfully');

		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const tz_file = await (await exec(`cat ../taqueria-plugin-contract-types/example/contracts/example-contract-2.tz`))
			.stdout;
		await writeFile('./test-project/artifacts/example-contract-2.tz', tz_file);
		const expected_types_file =
			await (await exec(`cat ../taqueria-plugin-contract-types/example/types-file/example-contract-2.types.ts`)).stdout;

		await execute('taq', 'generate types', './test-project');
		const generated_types_file = await readFile(path.join('./test-project', 'types', 'example-contract-2.types.ts'));

		expect(generated_types_file).toBe(expected_types_file);

		await cleanup();
	});

	test('generate types can compile a contract from a sub-directory and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const tz_file =
			await (await exec(`cat ../taqueria-plugin-contract-types/example/contracts/subdir/example-contract-0.tz`)).stdout;
		await writeFile('./test-project/artifacts/subdir/example-contract-0.tz', tz_file);
		const expected_types_file =
			await (await exec(`cat ../taqueria-plugin-contract-types/example/types-file/subdir/example-contract-0.types.ts`))
				.stdout;

		await execute('taq', 'generate types', './test-project');
		const generated_types_file = await readFile(
			path.join('./test-project', 'types', 'subdir/example-contract-0.types.ts'),
		);

		expect(generated_types_file).toBe(expected_types_file);

		await cleanup();
	});

	test('generate types can compile a Lambda contract and generate types', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');
		const { stdout: stdout1 } = await execute('taq', 'install ../taqueria-plugin-ligo', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const tz_file = await (await exec(`cat ../taqueria-plugin-contract-types/example/contracts/example-lambda.tz`))
			.stdout;
		await writeFile('./test-project/artifacts/example-lambda.tz', tz_file);
		const expected_types_file =
			await (await exec(`cat ../taqueria-plugin-contract-types/example/types-file/example-lambda.types.ts`)).stdout;

		await execute('taq', 'generate types', './test-project');
		const generated_types_file = await readFile(path.join('./test-project', 'types', 'example-lambda.types.ts'));

		expect(generated_types_file).toBe(expected_types_file);

		await cleanup();
	});

	// See https://github.com/pinnacle-labs/taqueria/issues/1861
	test('Assure that entrypoints with optional parameters generate valid TypeScript', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout } = await execute('taq', 'install ../taqueria-plugin-contract-types', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const tz_file =
			await (await exec(`cat ../taqueria-plugin-contract-types/example/contracts/example-contract-optionals.tz`))
				.stdout;
		await writeFile('./test-project/artifacts/example.tz', tz_file);

		await execute('taq', 'generate types', './test-project');
		const generated_types_file = path.join('./test-project', 'types', 'example.types.ts');

		// Assure that the generated file is valid TypeScript
		const { stdout: stdout1 } = await execute('npx', `tsx ${generated_types_file}`, './test-project');
		expect(stdout1.join('').trim()).toBe('');

		await cleanup();
	});
});
