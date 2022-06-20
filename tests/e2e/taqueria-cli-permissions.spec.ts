import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = './e2e/auto-test-cli-permissions';
let user;

describe('E2E Testing for taqueria plugin file permissions,', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['ligo', 'archetype', 'smartpy']);
		await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);
		await exec(`cp e2e/data/hello-tacos.mligo ${taqueriaProjectPath}/contracts`);
		await exec(`cp e2e/data/hello-tacos.py ${taqueriaProjectPath}/contracts`);
	});

	test.skip('', async () => {
	});

	test.only('testing that ligo artifacts will have the correct permissions', async () => {
		await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);

		await exec(`taq compile`, { cwd: `./${taqueriaProjectPath}` });
	});

	test.only('testing that archetype artifacts will have the correct permissions', async () => {
		await exec(`cp e2e/data/fa12.arl ${taqueriaProjectPath}/contracts`);
	});
});
