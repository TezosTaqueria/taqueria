import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import path from 'path';

import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Metadata Plugin E2E Testing for the Taqueria CLI', () => {
	jest.setTimeout(90000);

	test('generate-project-metadata will add a metadata entry to the config.json', async () => {
		const { execute, spawn, cleanup, ls, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-metadata', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat src/test-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const contracts_list = await ls('./test-project/contracts');
		expect(contracts_list).toContain('hello-tacos.mligo');

		const { waitForText: waitForText2, wait, writeText, pressKey, waitForFinish } = await spawn(
			'taq',
			'generate-project-metadata',
			'./test-project',
		);

		await wait(1000);
		await waitForText2('Enter project name');
		await writeText('test-project-name');
		await pressKey('enter');

		await waitForText2('Enter project description');
		await writeText('test-project-description');
		await pressKey('enter');

		await waitForText2('Enter project authors (comma separated)');
		await writeText('KentBeck, MartinFowler, ErichGamma');
		await pressKey('enter');

		await waitForText2('Enter project web url');
		await writeText('http://taqueria.io');
		await pressKey('enter');

		await waitForText2('Enter project license');
		await writeText('007');
		await pressKey('enter');

		await waitForFinish();

		const metadata_file = await readFile(path.join('./test-project', '.taq', 'config.json'));
		const json = JSON.parse(metadata_file);
		expect(json).toBeInstanceOf(Object);
		expect(json).toHaveProperty('metadata');
		expect(json.metadata).toEqual({
			'name': 'test-project-name',
			'projectDescription': 'test-project-description',
			'authors': [
				'KentBeck',
				'MartinFowler',
				'ErichGamma',
			],
			'homepage': 'http://taqueria.io',
			'license': '007',
		});

		await cleanup();
	});

	test('generate-metadata will error if no contract name provided', async () => {
		const { execute, spawn, cleanup, ls, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install @taqueria/plugin-metadata', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat src/test-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const contracts_list = await ls('./test-project/contracts');
		expect(contracts_list).toContain('hello-tacos.mligo');

		const { stderr: stderr2 } = await execute('taq', 'generate-metadata', './test-project');
		expect(stderr2).toEqual(expect.arrayContaining(['contractName was not provided']));

		await cleanup();
	});

	test('generate-metadata will create a metadata json file in the artifacts directory', async () => {
		const { execute, spawn, cleanup, ls, writeFile, readFile } = await prepareEnvironment();
		const { stdout } = await execute('taq', 'init test-project');
		expect(stdout).toContain("Project taq'ified!");
		const { stdout: stdout1 } = await execute('taq', 'install @taqueria/plugin-metadata', './test-project');
		expect(stdout1).toContain('Plugin installed successfully');

		const mligo_file = await (await exec(`cat src/test-data/hello-tacos.mligo`)).stdout;
		await writeFile('./test-project/contracts/hello-tacos.mligo', mligo_file);
		const contracts_list = await ls('./test-project/contracts');
		expect(contracts_list).toContain('hello-tacos.mligo');

		const { waitForText, wait, writeText, pressKey, waitForFinish } = await spawn(
			'taq',
			'generate-metadata hello-tacos.mligo',
			'./test-project',
		);

		await wait(1000);
		await waitForText('Enter contract name');
		await writeText('hello-tacos.mligo');
		await pressKey('enter');

		await waitForText('Enter contract description');
		await writeText('hello-tacos-description');
		await pressKey('enter');

		await waitForText('Enter contract authors (comma separated)');
		await writeText('Jimi&nbspHendrix, Kurt&nbspCobain');
		await pressKey('enter');

		await waitForText('Enter contract web url');
		await writeText('http://taqueria.io');
		await pressKey('enter');

		await waitForText('Enter contract license');
		await writeText('007');
		await pressKey('enter');

		await waitForFinish();

		expect(await ls('./test-project/artifacts')).toContain('hello-tacos.mligo.json');

		const metadata_file = await readFile(path.join('./test-project', 'artifacts', 'hello-tacos.mligo.json'));
		const json = JSON.parse(metadata_file);
		expect(json).toBeInstanceOf(Object);
		expect(json).toEqual({
			'name': 'hello-tacos.mligo',
			'version': 'v1.0.0',
			'description': 'hello-tacos-description',
			'authors': [
				'Jimi&nbspHendrix',
				'Kurt&nbspCobain',
			],
			'homepage': 'http://taqueria.io',
			'license': '007',
			'interfaces': [
				'TZIP-016',
			],
		});

		await cleanup();
	});
});
