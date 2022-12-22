import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('E2E Testing for taqueria general functionality', () => {
	test('init will create the correct directory structure', async () => {
		const { spawn, cleanup, exists } = await prepareEnvironment();
		const { waitForText, waitForFinish } = await spawn('taq', 'init temp');
		await waitForText("Project taq'ified!");

		await exists('./artifacts');
		await exists('./contracts');
		await waitForFinish();

		await cleanup();
	});

	test('init will create a package.json file with only {}', async () => {
		const { spawn, cleanup, execute, readFile, writeFile } = await prepareEnvironment();
		const { waitForFinish } = await spawn('taq', 'init test-project');
		await writeFile('./test-project/package.json', '{}');

		const {} = await execute('taq', 'install @taqueria/plugin-ligo');
		await waitForFinish();

		const content = await readFile('./test-project/package.json');
		expect(content).toContain('"name": "test-project"');

		await cleanup();
	});
});
