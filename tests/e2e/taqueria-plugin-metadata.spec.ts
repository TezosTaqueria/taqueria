import { exec as execRaw, spawn } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(execRaw);

const taqueriaProjectPath = 'e2e/auto-test-metadata-plugin';

describe('E2E Testing for the taqueria metadata plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['metadata']);
		await exec(`cp e2e/data/hello-tacos.tz ${taqueriaProjectPath}/artifacts/hello-tacos.tz`);
	});

	test('metadata plugin should create a contract metadata.json file', async () => {
		const taqProcess = spawn(`cd ${taqueriaProjectPath} && taq generate metadata hello-tacos`);

		taqProcess.stdout.on('data', data => {
			console.log(`stdout: "${data}"`);
		});

		// Answer prompts
		const writeInput = async (text: string) =>
			await util.promisify<void>(callback => {
				taqProcess.stdin.write(`${text}\n`, callback);
			})();
		await writeInput('test-name');
		await writeInput('test-desc');
		await writeInput('test-author1, test-author2');
		await writeInput('test-url');
		await writeInput('test-license');

		await util.promisify(callback => {
			taqProcess.on('close', callback);
		})();

		const metadataFileContents = await fsPromises.readFile(`${taqueriaProjectPath}/artifacts/hello-tacos.json`, {
			encoding: 'utf-8',
		});
		expect(metadataFileContents).toMatch(/name.*hello-tacos/i);
	});

	afterAll(async () => {
		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	});
});
