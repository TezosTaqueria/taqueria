import { prepareEnvironment } from '@gmrchk/cli-testing-library';

// Increase timeout for Github Actions
const timeout = process.env.CI ? 80 : 30;
jest.setTimeout(1000 * timeout);

// Use test.skip when RUNNER_OS is MacOS
// https://docs.github.com/en/actions/reference/environment-variables#default-environment-variables
const testFn = process.env.RUNNER_OS === 'macOS' ? test.skip : test;

// This test suite does two time-consuming things:
// - Scaffolds a project
// - Starts and stops a sandbox
describe('E2E Testing for taqueria scaffolding initialization,', () => {
	testFn('Verify that scaffold project gets sets up.', async () => {
		const { execute, exists, cleanup } = await prepareEnvironment();
		const { code } = await execute(
			'taq',
			'scaffold https://github.com/pinnacle-labs/taqueria-scaffold-taco-shop.git scaffold-test',
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
		// see # https://github.com/pinnacle-labs/taqueria/issues/1592
		// const startResults = await exec(`taq start sandbox local-scaffold`, { cwd: `scaffold-test` });
		// expect(startResults.stdout).toContain('Started local-scaffold.');
		// const stopResults = await exec(`taq stop sandbox local-scaffold`, { cwd: `scaffold-test` });
		// expect(stopResults.stdout).toContain('Stopped local-scaffold.');
		return await cleanup();
	});
});
