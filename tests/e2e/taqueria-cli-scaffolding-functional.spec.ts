import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
const exec = util.promisify(exec1);

const scaffoldDirName = `taqueria-quickstart`;

describe.skip('E2E Testing for taqueria scaffolding initialization,', () => {
	beforeAll(async () => {
		await exec('taq scaffold');
		await exec(`cd ${scaffoldDirName} && npm run setup`);
	});

	test('Verify that scaffold project can be set up', async () => {
		const appContents = await exec(`ls ${scaffoldDirName}/app`);
		const taqContents = await exec(`ls ${scaffoldDirName}/taqueria`);
		expect(appContents.stdout).toContain('node_modules');
		expect(taqContents.stdout).toContain('node_modules');
		expect(taqContents.stdout).toContain('contracts');
		expect(taqContents.stdout).toContain('artifacts');
	});
	test('Verify that scaffold project can build taqueria', async () => {
		await exec(`cd ${scaffoldDirName} && npm run build:taqueria`);
		const taqContents = await exec(`ls ${scaffoldDirName}/taqueria/artifacts`);
		expect(taqContents.stdout).toContain('example.tz');
	});

	test('Verify that scaffold project can start and stop taqueria locally', async () => {
		const startResults = await exec(`cd ${scaffoldDirName} && npm run start:taqueria:local`);
		expect(startResults.stdout).toContain('Processing /example.tz...');
		expect(startResults.stdout).toContain('example.tz: Types generated');
		expect(startResults.stdout).toContain('Started local.');

		const stopResults = await exec(`cd ${scaffoldDirName}/taqueria && npm run stop:local`);
		expect(stopResults.stdout).toContain('Stopped local.');
	});

	afterAll(async () => {
		await fsPromises.rm(`${scaffoldDirName}`, { recursive: true });
	});
});
