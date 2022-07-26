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
		await new Promise<void>((resolve, reject) => {
			// const taqProcess = spawn(`cd ${taqueriaProjectPath} && taq generate metadata hello-tacos`);
			const taqProcess = spawn(`taq`, `generate metadata hello-tacos`.split(' '), {
				cwd: taqueriaProjectPath,
			});

			taqProcess.stdin.setDefaultEncoding('utf-8');
			const writeInput = async (text: string) => {
				console.log(`stdin write`, { text });

				taqProcess.stdin.cork();
				taqProcess.stdin.write(`${text}\n`);
				taqProcess.stdin.uncork();
			};

			taqProcess.on('close', data => {
				console.log(`close`, { data });
				resolve();
			});
			taqProcess.stderr.on('data', data => {
				console.log(`stderr: ${data}`);
			});

			const outputResponses = [
				['name', 'test-name'],
				['description', 'test-description'],
				['author', 'test-author'],
				['url', 'test-url'],
				['license', 'test-license'],
			];
			taqProcess.stdout.on('data', data => {
				const dataText = `${data}`;
				console.log(`stdout: ${dataText}`);

				const dataTextLines = dataText.split('\n');
				const dataTextLastLine = dataTextLines[dataTextLines.length - 1];

				const response = outputResponses.find(x => dataTextLastLine.includes(x[0]));

				if (response) {
					writeInput(response[1]);
					response[0] += '=USED';
				}
			});
		});

		const metadataFileContents = await fsPromises.readFile(`${taqueriaProjectPath}/artifacts/hello-tacos.json`, {
			encoding: 'utf-8',
		});
		expect(metadataFileContents).toMatch(/name.*test-name/i);
		expect(metadataFileContents).toMatch(/description.*test-description/i);
		expect(metadataFileContents).toMatch(/authors(.|\n)*test-author/i);
		expect(metadataFileContents).toMatch(/homepage.*test-url/i);
		expect(metadataFileContents).toMatch(/license.*test-license/i);
	});

	afterAll(async () => {
		await fsPromises.rm(taqueriaProjectPath, { recursive: true });
	});
});
