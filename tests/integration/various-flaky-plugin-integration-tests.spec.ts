import { exec as exec1 } from 'child_process';
import utils from 'util';
const exec = utils.promisify(exec1);

import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import path from 'path';

describe('Plugin Integration testing for Taqueria CLI', () => {
	// FLAKY in cicd, example: https://github.com/ecadlabs/taqueria/actions/runs/3770115326/jobs/6409755728
	//     Expected: ArrayContaining ["│ Account Alias │ Account Address                      │ Mutez Funded │"]
	// 	   Received: []

	jest.setTimeout(90000);

	// hangs for a long time waiting for the image name
	// this passes manually in pre-release v0.25.23-rc
	test.skip('different tezos client image can be used', async () => {
		const { execute, cleanup, spawn, writeFile, readFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const { stdout } = await execute('taq', 'install ../taqueria-plugin-tezos-client', './test-project');
		expect(stdout).toContain('Plugin installed successfully');

		const artifact_file = await (await exec(`cat integration/data/hello-tacos.tz`)).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', artifact_file);

		const { stdout: stdout1, stderr } = await execute(
			'TAQ_TEZOS_CLIENT_IMAGE=oxheadalpha/flextesa:20221123 taq',
			'get-image --plugin tezos-client',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ hello-tacos.tz │ Valid  │']));

		await cleanup();
	});

	// hangs waiting to execute the image command
	// works fine manually in pre-release v0.25.23-rc
	test.skip('compile can use different versions of the Archetype image', async () => {
		const { execute, cleanup, writeFile, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-archetype', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-archetype/index.js');

		const { stdout, stderr } = await execute(
			'TAQ_ARCHETYPE_IMAGE=completium/archetype:1.3.5 taq',
			'get-image --plugin archetype',
			'./test-project',
		);
		expect(stdout).toEqual(expect.arrayContaining(['│ completium/archetype:1.3.5 │']));

		const arl_file = await (await exec('cat integration/data/arch-1.3.5-example.arl')).stdout;
		writeFile('./test-project/contracts/arch-1.3.5-example.arl', arl_file);

		const { stdout: stdout1 } = await execute(
			'taq',
			'compile arch-1.3.5-example.arl',
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['│ completium/archetype:1.3.5 │']));

		await exists(`./test-project/artifacts/arch-1.3.5-example.tz`);

		await cleanup();
	});
});
