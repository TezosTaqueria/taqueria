import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import { exec as exec1 } from 'child_process';
import util from 'util';

const exec = util.promisify(exec1);

describe('Workflows E2E Testing for Taqueria CLI,', () => {
	test('ligo workflow will load expected plugins ', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project --workflow ligo');
		await exists('./test-project/.taq/config.json');
		await exists('./test-project/node_modules/@taqueria/plugin-core/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-ligo/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');

		await cleanup();
	});

	test('smartpy workflow will load expected plugins ', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project --workflow smartpy');
		await exists('./test-project/.taq/config.json');
		await exists('./test-project/node_modules/@taqueria/plugin-core/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-smartpy/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');

		await cleanup();
	});

	test('archetype workflow will load expected plugins ', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project --workflow archetype');
		await exists('./test-project/.taq/config.json');
		await exists('./test-project/node_modules/@taqueria/plugin-core/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-archetype/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');

		await cleanup();
	});

	test('michelson workflow will load expected plugins ', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project --workflow michelson');
		await exists('./test-project/.taq/config.json');
		await exists('./test-project/node_modules/@taqueria/plugin-core/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-flextesa/index.js');
		await exists('./test-project/node_modules/@taqueria/plugin-taquito/index.js');

		await cleanup();
	});

	test('workflow will error when no such workflow ', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const { stderr } = await execute('taq', 'init test-project --workflow god-mode');
		await exists('./test-project/.taq/config.json');
		expect(stderr).toContain(
			'Taqueria is only providing the following workflows for initializing a project: ligo|smartpy|archetype|michelson',
		);

		await cleanup();
	});
});
