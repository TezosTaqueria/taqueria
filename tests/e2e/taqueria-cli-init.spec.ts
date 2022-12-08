import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('E2E Testing for taqueria general functionality', () => {
	test('Verify that taq init creates the correct directory structure', async () => {
		const { spawn, cleanup, exists } = await prepareEnvironment();
		const { waitForText, waitForFinish } = await spawn('taq', 'init temp');
		await waitForText("Project taq'ified!");
		await exists('./artifacts');
		await exists('./contracts');
		await waitForFinish();
		await cleanup();
	});

	test('Verify that to install a plugin all you need is a package.json file with {}', async () => {
		const { spawn, cleanup, execute, readFile, writeFile } = await prepareEnvironment();
		const { waitForFinish } = await spawn('taq', 'init auto-test-npm-success');
		await writeFile('./auto-test-npm-success/package.json', '{}');
		const {} = await execute('taq', 'install @taqueria/plugin-ligo');
		await waitForFinish();
		const content = await readFile('./auto-test-npm-success/package.json');
		expect(content).toContain('"name": "auto-test-npm-success"');
		await cleanup();
	});
});
