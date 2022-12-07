import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import path from 'path';
import utils from 'util';
import { generateTestProject, waitFor } from './utils/utils';
const exec = utils.promisify(exec1);

const taqueriaProjectPath = 'scrap/auto-test-persistent-state';

describe('Test CLI Persistent State', () => {
	beforeEach(() => fsPromises.rm(taqueriaProjectPath, { force: true, recursive: true }));

	test('Ensure that the state file named using the default config.json and no env set using the CLI', async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo']);
		await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);
		await exec(`taq compile hello-tacos.mligo`, { cwd: taqueriaProjectPath });
		const result = await waitFor(
			() => fsPromises.stat(path.join(taqueriaProjectPath, '.taq', 'development-state.json')),
		);

		return expect(result).toBeTruthy();
	});

	test('Ensure that state file is named after a valid environment when there is no default in the config', async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo']);
		await exec(`cp e2e/data/config-without-default-environment.json ${taqueriaProjectPath}/.taq/config.json`);
		await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);
		await exec(`taq compile hello-tacos.mligo`, { cwd: taqueriaProjectPath });
		const result = await waitFor(
			() => fsPromises.stat(path.join(taqueriaProjectPath, '.taq', 'development-state.json')),
		);

		expect(result).toBeTruthy();
	});

	test('Ensure that state file is named after testing environment when the default in the config is set to testing', async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo']);
		await exec(`cp e2e/data/config-default-environment-testing.json ${taqueriaProjectPath}/.taq/config.json`);
		await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);
		await exec(`taq compile hello-tacos.mligo`, { cwd: taqueriaProjectPath });

		const result = await waitFor(
			() => fsPromises.stat(path.join(taqueriaProjectPath, '.taq', 'testing-state.json')),
		);

		expect(result).toBeTruthy();
	});

	test('Ensure that state file is named after testing environment when the env is specified using the CLI', async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo']);
		await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);
		await exec(`taq compile -e testing hello-tacos.mligo`, { cwd: taqueriaProjectPath });

		const result = await waitFor(
			() => fsPromises.stat(path.join(taqueriaProjectPath, '.taq', 'testing-state.json')),
		);

		expect(result).toBeTruthy();
	});

	afterAll(() => fsPromises.rm(taqueriaProjectPath, { force: true, recursive: true }));
});
