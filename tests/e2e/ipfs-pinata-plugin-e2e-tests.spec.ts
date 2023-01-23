import { exec as exec1 } from 'child_process';
import util from 'util';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

const env_file =
	'pinataJwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1M2FkZjkxZi0yY2Q0LTQ3ZGUtYThlOS00YmM0YjI5NDI4NzYiLCJlbWFpbCI6Im1pY2hhZWxrZXJuYWdoYW5AZWNhZGxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNiOGMzMzVkN2RhOThiZGQ2MTRmIiwic2NvcGVkS2V5U2VjcmV0IjoiZWIwYmUxYjRhYzNhZjE5ZGE3MjQ3MTAxNmFlZjFjNTllNjQzNTdlOTcwZmY1ZmYxZDBjNmU1ZTBkYmI1ODkzMCIsImlhdCI6MTY2OTEzMzI2MH0.U9JyTzEviH5y-GxSmD6YEkCVkcjsSX6d13a9fHE70LM';

describe('IPFS Pinata plugin E2E tests for Taqueria CLI', () => {
	test('publish will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stdout: stdout2 } = await execute('taq', 'publish --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Upload and pin files using your pinata account.']));

		await cleanup();
	});

	test('pin will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stdout: stdout2 } = await execute('taq', 'pin --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Pin a file already on ipfs with your pinata account.']));

		await cleanup();
	});

	test('publish will error if no env jwt token exists', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'publish ./ipfs/0001.txt', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(["The 'credentials.pinataJwtToken' was not found in config"]));

		await cleanup();
	});

	test('pin will error if no env jwt token exists', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'pin QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(["The 'credentials.pinataJwtToken' was not found in config"]));

		await cleanup();
	});

	test('publish will error if no file specified', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await writeFile('./test-project/.env', env_file);

		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'publish', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['path was not provided']));

		await cleanup();
	});

	test('pin will error if no filehash specified', async () => {
		// note the error is not what is expected, but it is what is returned
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await writeFile('./test-project/.env', env_file);

		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'pin', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['ipfs hash was not provided']));

		await cleanup();
	});

	test('publish a file will return the expected cid', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await writeFile('./test-project/.env', env_file);

		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const ipfs_file = await (await exec('cat e2e/data/ipfs-data/0001.txt')).stdout;
		await writeFile('./test-project/ipfs/0001.txt', ipfs_file);

		const { stdout: stdout1 } = await execute('taq', 'publish ipfs/0001.txt', './test-project');
		expect(stdout1).toEqual(
			expect.arrayContaining([
				'│ ✔ │ {{base}}/test-project/ipfs/0001.txt │ QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5 │',
			]),
		);

		await cleanup();
	});

	test('publish a directory will return the expected cid for each file', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await writeFile('./test-project/.env', env_file);

		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const ipfs_file_1 = await (await exec('cat e2e/data/ipfs-data/0001.txt')).stdout;
		await writeFile('./test-project/ipfs/0001.txt', ipfs_file_1);
		const ipfs_file_2 = await (await exec('cat e2e/data/ipfs-data/0002.txt')).stdout;
		await writeFile('./test-project/ipfs/0002.txt', ipfs_file_2);
		const ipfs_file_3 = await (await exec('cat e2e/data/ipfs-data/0003.txt')).stdout;
		await writeFile('./test-project/ipfs/0003.txt', ipfs_file_3);

		const { stdout: stdout1 } = await execute('taq', 'publish ipfs', './test-project');
		expect(stdout1).toEqual(
			expect.arrayContaining([
				'│ ✔ │ {{base}}/test-project/ipfs/0003.txt │ Qmbg3rnnFw5d16HECdRPpoLRsvvoBvFgVAZa9owMbLLLe9 │',
			]),
		);
		expect(stdout1).toEqual(
			expect.arrayContaining([
				'│ ✔ │ {{base}}/test-project/ipfs/0002.txt │ QmQeKydANxVEkysp8GGFS7fmw3Kd266RdAJx6w9n4o7Ev6 │',
			]),
		);
		expect(stdout1).toEqual(
			expect.arrayContaining([
				'│ ✔ │ {{base}}/test-project/ipfs/0001.txt │ QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5 │',
			]),
		);

		await cleanup();
	});

	test('pin will accept an ipfs hash', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		await writeFile('./test-project/.env', env_file);

		await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const ipfs_file_1 = await (await exec('cat e2e/data/ipfs-data/0001.txt')).stdout;
		await writeFile('./test-project/ipfs/0001.txt', ipfs_file_1);

		const { stdout: stdout1 } = await execute(
			'taq',
			'pin QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5',
			'./test-project',
		);
		expect(stdout1).toEqual(
			expect.arrayContaining([
				'{"data":[{"ipfsHash":"QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5"}],"render":"table"}',
			]),
		);
	});
});
