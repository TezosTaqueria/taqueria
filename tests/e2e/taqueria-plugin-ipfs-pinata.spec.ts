import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';
import * as contents from './data/help-contents/pinata-contents';

// const taqueriaProjectPath = 'scrap/auto-test-ipfs-pinata-plugin';

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// IF RUNNING LOCALLY MAKE SURE YOU ADD A .env FILE WITH YOUR PINATA JWT
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// let JWT: string;
// async function configureForTests() {
// 	if (process.env.pinataJwtToken) {
// 		JWT = process.env.pinataJwtToken;
// 		await exec(`unset pinataJwtToken`);
// 		await exec(`echo "pinataJwtToken=${JWT}" > ./test-project/.env`);
// 	}
// 	if (process.env.UNLIMITED_PINATA_TOKEN) {
// 		JWT = process.env.UNLIMITED_PINATA_TOKEN;
// 		await exec(`echo "pinataJwtToken=${JWT}" > ./test-project/.env`);
// 		await exec(`cat ./test-project/.env`);
// 	} else {
// 		// The .env file should be in the root directory of the taqueria project
// 		// this just makes sure it gets into the test directory for use
// 		await exec(`cp ../.env ./test-project/.env`);
// 	}
// }

describe('IPFS Pinata plugin E2E tests for Taqueria CLI', () => {
	test('publish will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		const {} = await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stdout: stdout2 } = await execute('taq', 'publish --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Upload and pin files using your pinata account.']));

		await cleanup();
	});

	test('pin will offer contextual help', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		const {} = await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stdout: stdout2 } = await execute('taq', 'pin --help', './test-project');
		expect(stdout2).toEqual(expect.arrayContaining(['Pin a file already on ipfs with your pinata account.']));

		await cleanup();
	});

	test('publish will error if no env jwt token exists', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		const {} = await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'publish ./ipfs/0001.txt', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(["The 'credentials.pinataJwtToken' was not found in config"]));

		await cleanup();
	});

	test('pin will error if no env jwt token exists', async () => {
		const { execute, cleanup, exists } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');
		const {} = await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'pin QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(["The 'credentials.pinataJwtToken' was not found in config"]));

		await cleanup();
	});

	test('publish will error if no file specified', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const env_file =
			'pinataJwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1M2FkZjkxZi0yY2Q0LTQ3ZGUtYThlOS00YmM0YjI5NDI4NzYiLCJlbWFpbCI6Im1pY2hhZWxrZXJuYWdoYW5AZWNhZGxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNiOGMzMzVkN2RhOThiZGQ2MTRmIiwic2NvcGVkS2V5U2VjcmV0IjoiZWIwYmUxYjRhYzNhZjE5ZGE3MjQ3MTAxNmFlZjFjNTllNjQzNTdlOTcwZmY1ZmYxZDBjNmU1ZTBkYmI1ODkzMCIsImlhdCI6MTY2OTEzMzI2MH0.U9JyTzEviH5y-GxSmD6YEkCVkcjsSX6d13a9fHE70LM';
		await writeFile('./test-project/.env', env_file);

		const {} = await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'publish', './test-project');
		expect(stderr).toEqual(expect.arrayContaining(['path was not provided']));

		await cleanup();
	});

	test('pin will error if no filehash specified', async () => {
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const env_file =
			'pinataJwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1M2FkZjkxZi0yY2Q0LTQ3ZGUtYThlOS00YmM0YjI5NDI4NzYiLCJlbWFpbCI6Im1pY2hhZWxrZXJuYWdoYW5AZWNhZGxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNiOGMzMzVkN2RhOThiZGQ2MTRmIiwic2NvcGVkS2V5U2VjcmV0IjoiZWIwYmUxYjRhYzNhZjE5ZGE3MjQ3MTAxNmFlZjFjNTllNjQzNTdlOTcwZmY1ZmYxZDBjNmU1ZTBkYmI1ODkzMCIsImlhdCI6MTY2OTEzMzI2MH0.U9JyTzEviH5y-GxSmD6YEkCVkcjsSX6d13a9fHE70LM';
		await writeFile('./test-project/.env', env_file);

		const {} = await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stderr } = await execute('taq', 'pin', './test-project');
		console.log(stderr);
		expect(stderr).toEqual(expect.arrayContaining(['ipfs hash was not provided']));

		await cleanup();
	});

	test('publish a file will return the expected cid', async () => {
		// const publishRun = await exec(`taq publish ./ipfs/0001.txt`, { cwd: taqueriaProjectPath });
		// expect(publishRun.stdout).toMatch(/0001\.txt.*QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5/i);
		const { execute, cleanup, exists, writeFile } = await prepareEnvironment();
		const {} = await execute('taq', 'init test-project');
		await exists('./test-project/.taq/config.json');

		const env_file =
			'pinataJwtToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1M2FkZjkxZi0yY2Q0LTQ3ZGUtYThlOS00YmM0YjI5NDI4NzYiLCJlbWFpbCI6Im1pY2hhZWxrZXJuYWdoYW5AZWNhZGxhYnMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImNiOGMzMzVkN2RhOThiZGQ2MTRmIiwic2NvcGVkS2V5U2VjcmV0IjoiZWIwYmUxYjRhYzNhZjE5ZGE3MjQ3MTAxNmFlZjFjNTllNjQzNTdlOTcwZmY1ZmYxZDBjNmU1ZTBkYmI1ODkzMCIsImlhdCI6MTY2OTEzMzI2MH0.U9JyTzEviH5y-GxSmD6YEkCVkcjsSX6d13a9fHE70LM';
		await writeFile('./test-project/.env', env_file);

		const ipfs_file = await (await exec('cat e2e/data/ipfs/0001.txt')).stdout;
		await writeFile('./test-project/ipfs/0001.txt', ipfs_file);

		const {} = await execute('taq', 'install ../taqueria-plugin-ipfs-pinata', './test-project');
		await exists('./test-project/node_modules/@taqueria/plugin-ipfs-pinata/index.js');

		const { stdout: stdout1 } = await execute('taq', 'publish ipfs/0001.txt', './test-project');
		expect(stdout1).toEqual(
			expect.arrayContaining([
				'│ ✔ │ {{base}}/test-project/ipfs/0001.txt │ QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5 │',
			]),
		);

		await cleanup();
	});

	test('publish a directory will return the expected cid for each file', async () => {
		// const publishRun = await exec(`taq publish ./ipfs/`, { cwd: taqueriaProjectPath });

		// for (let i = 1; i <= 12; i++) {
		// 	expect(publishRun.stdout).toContain(`${i}.txt`);
		// }

		// expect(publishRun.stdout).toMatch(/0001\.txt.*QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5/i);
		// expect(publishRun.stdout).toMatch(/0005\.txt.*QmQZF8kEyU6iuyc4xbnkTYNTtMEL4gjYgXhPjcXK14gnJ1/i);
		// expect(publishRun.stdout).toMatch(/0010\.txt.*QmW6GqMj6bXPXygCVCeVvcZN6w1w8ou4aVNKvarQrz8N4w/i);
		// expect(publishRun.stdout).toMatch(/0012\.txt.*QmZLSfobCPA8rQrm6dss28gyDwqXaw8GhQ8CXXQMSMnuNm/i);
	});

	test('pin will accept an ipfs hash', async () => {
		// const publishRun = await exec(`taq pin QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5`, {
		// 	cwd: taqueriaProjectPath,
		// });
		// expect(publishRun.stdout).toMatch(/QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5/i);
	});
});
