import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);
// import { reference } from './data/jest.config-reference';
// import { referenceCI } from './data/jest.config-reference-ci';

const taqueriaProjectPath = 'e2e/auto-test-ipfs-pinata-plugin';

describe('E2E Testing for the taqueria ipfs pinata plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['ipfs-pinata']);
		await exec(`cp -r e2e/data/ipfs ${taqueriaProjectPath}/ipfs`);
	});

	beforeEach(async () => {
		// Pinata requires a jwtToken which can be provided by an env variable or .env file
		await exec(`cp e2e/data/.env ${taqueriaProjectPath}/.env`);
	});

	test('ipfs pinata plugin should warn if no env jwt token exists', async () => {
		await exec(`rm ${taqueriaProjectPath}/.env`);

		const publishRun = await exec(`taq publish ./ipfs/0001.txt`, { cwd: taqueriaProjectPath });
		expect(publishRun.stderr).toMatch(/jwt *token.*not *found/i);
	});

	test('publish a single file to ipfs and get back the expected cid', async () => {
		const publishRun = await exec(`taq publish ./ipfs/0001.txt`, { cwd: taqueriaProjectPath });
		expect(publishRun.stdout).toMatch(/0001\.txt.*QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5/i);
	});

	test('publish a directory to ipfs and get back the expected cid for each file', async () => {
		const publishRun = await exec(`taq publish ./ipfs/`, { cwd: taqueriaProjectPath });

		for (let i = 1; i <= 12; i++) {
			expect(publishRun.stdout).toContain(`${i}.txt`);
		}

		expect(publishRun.stdout).toMatch(/0001\.txt.*QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5/i);
		expect(publishRun.stdout).toMatch(/0005\.txt.*QmQZF8kEyU6iuyc4xbnkTYNTtMEL4gjYgXhPjcXK14gnJ1/i);
		expect(publishRun.stdout).toMatch(/0010\.txt.*QmW6GqMj6bXPXygCVCeVvcZN6w1w8ou4aVNKvarQrz8N4w/i);
		expect(publishRun.stdout).toMatch(/0012\.txt.*QmZLSfobCPA8rQrm6dss28gyDwqXaw8GhQ8CXXQMSMnuNm/i);
	});

	test('pin using an ipfs hash', async () => {
		const publishRun = await exec(`taq pin QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5`, {
			cwd: taqueriaProjectPath,
		});
		expect(publishRun.stdout).toMatch(/QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5/i);
	});

	afterAll(async () => {
		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	});
});
