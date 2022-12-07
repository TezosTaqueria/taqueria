import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('E2E Testing for taqueria scaffolding initialization,', () => {
	test('Verify that scaffold project sets up compiles contracts as part of setup', async () => {
		const { execute, exists } = await prepareEnvironment();
		const { code } = await execute(
			'taq',
			'scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git auto-test-taco-shop-functional',
		);
		expect(code).toBe(0);
		await exists('./auto-test-taco-shop-functional}/app');
		await exists('./auto-test-taco-shop-functional');
		await exists('./auto-test-taco-shop-functional/node_modules');
		await exists('./auto-test-taco-shop-functional/contracts');
		await exists('./auto-test-taco-shop-functional/artifacts');
		await exists('./auto-test-taco-shop-functional/artifacts/hello-tacos.tz');
	});

	test('Verify that scaffold project can start and stop taqueria locally', async () => {
		jest.setTimeout(500000);
		const { execute, spawn, cleanup } = await prepareEnvironment();

		const {} = await spawn(
			'taq',
			'install @taqueria/plugin-flextesa',
		);

		expect.arrayContaining(['Plugin installed successfully']);

		const { code } = await execute(
			'taq',
			'scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git auto-test-taco-shop-functional',
		);

		expect(code).toBe(0);

		const {} = await spawn(
			'taq',
			'install @taqueria/plugin-flextesa',
		);

		expect.arrayContaining(['Plugin installed successfully']);

		const {} = await execute(
			'taq',
			'scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git auto-test-taco-shop-functional',
		);

		expect(code).toBe(0);
		expect.arrayContaining(['Scaffolding 🛠']);
		expect.arrayContaining(["Project Taq'ified"]);

		const {} = await execute(
			'taq',
			'start sandbox local-scaffold',
		);

		expect.arrayContaining(['start']);

		const { stdout } = await execute(
			'taq',
			'start sandbox local-scaffold',
		);

		console.log(stdout);
		expect(code).toBe(0);
		expect.arrayContaining(['start']);

		const {} = await execute(
			'taq',
			'stop sandbox local-scaffold',
		);

		expect(code).toBe(0);
		expect.arrayContaining(['stop']);

		await cleanup();
	});
});
