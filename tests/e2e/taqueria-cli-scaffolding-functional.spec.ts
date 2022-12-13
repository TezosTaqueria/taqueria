import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

// This test suite does two time-consuming things:
// - Scaffolds a project
// - Starts and stops a sandbox
jest.setTimeout(400000);
describe('E2E Testing for taqueria scaffolding initialization,', () => {
	test('Verify that scaffold project gets sets up.', async () => {
		const { execute, exists, cleanup } = await prepareEnvironment();
		const { code } = await execute(
			'taq',
			'scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git scaffold-test',
		);
		expect(code).toBe(0);
		await exists('./scaffold-test');
		await exists('./scaffold-test/.taq/config.json');
		await exists('./scaffold-test/app');
		await exists('./scaffold-test/node_modules');
		await exists('./scaffold-test/contracts');
		await exists('./scaffold-test/artifacts');
		await exists('./scaffold-test/artifacts/hello-tacos.tz');
		await exists('./scaffold-test/artifacts/hello-tacos.tz.meta.json');
		// see # https://github.com/ecadlabs/taqueria/issues/1592
		// const startResults = await exec(`taq start sandbox local-scaffold`, { cwd: `scaffold-test` });
		// expect(startResults.stdout).toContain('Started local-scaffold.');
		// const stopResults = await exec(`taq stop sandbox local-scaffold`, { cwd: `scaffold-test` });
		// expect(stopResults.stdout).toContain('Stopped local-scaffold.');
		await cleanup();
	});
});
