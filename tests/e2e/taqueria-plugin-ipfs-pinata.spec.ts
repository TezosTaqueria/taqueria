import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);
import * as contents from './data/help-contents/pinata-contents';

const taqueriaProjectPath = 'e2e/auto-test-ipfs-pinata-plugin';

let JWT: string;

async function configureForTests() {
	if (process.env.pinataJwtToken) {
		JWT = process.env.pinataJwtToken;
		await exec(`unset pinataJwtToken`);
		console.log(await exec(`env`));
		await exec(`echo "pinataJwtToken=${JWT}" > ${taqueriaProjectPath}/.env`);
		console.log(await exec(`cat ${taqueriaProjectPath}/.env`));
	}
	if (process.env.UNLIMITED_PINATA_TOKEN) {
		JWT = process.env.UNLIMITED_PINATA_TOKEN;
		await exec(`echo "pinataJwtToken=${JWT}" > ${taqueriaProjectPath}/.env`);
		console.log(await exec(`cat ${taqueriaProjectPath}/.env`));
	}
}

describe('e2e testing for the IPFS Pinata plugin with no JWT', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['ipfs-pinata']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}
	});

	test('ipfs pinata plugin should show the correct help contents', async () => {
		const publishRun = await exec(`taq --help`, { cwd: taqueriaProjectPath });
		expect(publishRun.stdout).toBe(contents.helpContentsIPFSPinataPlugin);
	});

	test('ipfs pinata plugin should show the correct help contents for publish', async () => {
		const publishRun = await exec(`taq publish --help`, { cwd: taqueriaProjectPath });
		expect(publishRun.stdout).toBe(contents.helpContentsIPFSPinataPluginPublish);
	});

	test('ipfs pinata plugin should show the correct help contents for pin', async () => {
		const publishRun = await exec(`taq pin --help`, { cwd: taqueriaProjectPath });
		expect(publishRun.stdout).toBe(contents.helpContentsIPFSPinataPluginPin);
	});

	test('ipfs pinata plugin should warn for publish if no env jwt token exists', async () => {
		const publishRun = await exec(`taq publish ./ipfs/0001.txt`, { cwd: taqueriaProjectPath });
		expect(publishRun.stderr).toMatch(/jwt *token.*not *found/i);
	});

	test('ipfs pinata plugin should warn for pin if no env jwt token exists', async () => {
		const publishRun = await exec(`taq pin QmZcEXgfE9K4zFVkTrqW5x4skvEqpNajZzvb7frrWnkQa5`, {
			cwd: taqueriaProjectPath,
		});
		expect(publishRun.stderr).toMatch(/jwt *token.*not *found/i);
	});

	afterAll(async () => {
		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	});
});

describe('E2E Testing for the taqueria ipfs pinata plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['ipfs-pinata']);
		// TODO: This can removed after this is resolved:
		// https://github.com/ecadlabs/taqueria/issues/528

		await configureForTests();
		console.log(await exec(`ls -al ${taqueriaProjectPath}`));
		try {
			await exec(`taq -p ${taqueriaProjectPath}`);
		} catch (_) {}

		await exec(`cp -r e2e/data/ipfs ${taqueriaProjectPath}/ipfs`);

		// if ((await exec(`stat ${taqueriaProjectPath}/.env`)).stderr.includes("No such file or directory")) {
		// 	console.log("NO .env file found for Pinata JWT, exiting tests and you should add that for these to work")
		// 	process.exit(1);
		// }
		// await exec(`cp e2e/data/.env ${taqueriaProjectPath}/.env`);
	});

	test('ipfs pinata plugin should warn if no file specified for publish', async () => {
		const publishRun = await exec(`taq publish`, { cwd: taqueriaProjectPath });
		expect(publishRun.stderr).toBe('path was not provided\n');
	});

	test('ipfs pinata plugin should warn if no filehash specified for pin', async () => {
		const publishRun = await exec(`taq pin`, { cwd: taqueriaProjectPath });
		expect(publishRun.stderr).toBe('ipfs hash was not provided\n');
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
