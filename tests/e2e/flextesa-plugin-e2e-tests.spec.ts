import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Flextesa Plugin E2E Testing for Taqueria CLI', () => {
	test('start sandbox will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const { stdout: stdout2 } = await execute(
			'taq',
			'start sandbox --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Starts a flextesa sandbox']));

		await cleanup();
	});

	test('sandbox stop will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const { stdout: stdout2 } = await execute(
			'taq',
			'stop sandbox --help',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(['Stops a flextesa sandbox']));

		await cleanup();
	});

	test('show protocols will offer known protocols', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const { stdout: stdout2 } = await execute('taq', 'show protocols', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['│ PtLimaPtLMwfNinJi9rCfDPWea8dFgTZ1MeJ9f1m2SRic6ayiwW │']));

		await cleanup();
	});

	test('stop sandbox will error if call stop on a stopped sandbox', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const { stdout: stdout2 } = await execute('taq', 'stop sandbox local', './test-project');
		expect(stdout2).toEqual(['The local sandbox was not running.']);

		await cleanup();
	});

	test('list accounts will error if called on a stopped sandbox', async () => {
		5;
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

		const { stderr } = await execute('taq', 'list accounts local --debug', './test-project');
		expect(stderr).toEqual(['The local sandbox is not running.']);

		await cleanup();
	});

	describe('slow tests', () => {
		jest.setTimeout(100000);

		test('start sandbox will error if called on a started sandbox - slowtest', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');

			await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
			await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

			await execute('taq', 'start sandbox local', './test-project');

			const { stdout: stdout2 } = await execute('taq', 'start sandbox local', './test-project');
			expect(stdout2).toEqual(expect.arrayContaining(['Already running.']));

			await cleanup();
		});

		test('list accounts will display the sandbox accounts - slowtest', async () => {
			const { execute, cleanup, exists } = await prepareEnvironment();
			await execute('taq', 'init test-project');
			await exists('./test-project/.taq/config.json');

			await execute('taq', 'install ../taqueria-plugin-flextesa', './test-project');
			await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');

			await execute('taq', 'start sandbox local', './test-project');

			const { stdout: stdout2 } = await execute('taq', 'list accounts local', './test-project');
			expect(stdout2).toEqual(expect.arrayContaining(['│ Account │ Balance │ Address                              │']));

			await cleanup();
		});
	});
});
