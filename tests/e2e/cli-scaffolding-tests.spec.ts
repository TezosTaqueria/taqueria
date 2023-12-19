import { prepareEnvironment } from '@gmrchk/cli-testing-library';

// This test suite does two time-consuming things:
// - Scaffolds a project
// - Starts and stops a sandbox
describe('E2E Testing for taqueria scaffolding initialization,', () => {
	jest.setTimeout(100000);

	test('Verify that scaffold project gets sets up.', async () => {
		const { execute, cleanup, path: projectDir } = await prepareEnvironment();
		// console.log(projectDir)

		// Scaffold the project
		const { code } = await execute(
			'taq',
			'scaffold https://github.com/pinnacle-labs/taqueria-scaffold-taco-shop.git scaffold-test',
		);
		expect(code).toBe(0);
		const expectedContents: string[] = [
			'scaffold-test/.taq/config.json',
			'scaffold-test/app',
			'scaffold-test/node_modules',
			'scaffold-test/contracts',
		];

		// Get the path to the `ls` command
		const whichResult = await execute('which', 'ls');
		const ls = whichResult.stdout.join('').trim();

		// Get the contents of the scaffold directory
		const scaffoldDirContents = await execute(ls, `-d ${expectedContents.join(' ')}`);
		expectedContents.map(file => expect(scaffoldDirContents.stdout).toContain(file));

		// Cleanup
		return await cleanup();
	});
});
