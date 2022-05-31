import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
const exec = util.promisify(exec1);

const scaffoldDirName = `taqueria-quickstart`;

describe('E2E Testing for taqueria scaffolding initialization,', () => {
	beforeAll(async () => {
		await exec('taq scaffold');
		await exec(`cd ${scaffoldDirName} && npm run setup`);
	});

	// TODO: Activate other tests after 620-operations branch has
	// been merged and released.
	//
	// Why? The version of the plugins used by the scaffold are offical
	// versions published on the NPM registry. The pluginInfo that is
	// returned from those versions of plugins doesn't match the shape/type
	// expected in this branch, and therefore fail.
	//
	// See issue: https://github.com/ecadlabs/taqueria/issues/736
	test.only('Verify that scaffold project can be set up', async () => {
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

    test('Verify that scaffold project can be set up', async () => {
        const appContents = await exec(`ls ${scaffoldDirName}/app`)
        const taqContents = await exec(`ls ${scaffoldDirName}/taqueria`)
        expect(appContents.stdout).toContain('node_modules')
        expect(taqContents.stdout).toContain('node_modules')
        expect(taqContents.stdout).toContain('contracts')
        expect(taqContents.stdout).toContain('artifacts')
    })
    test('Verify that scaffold project can build taqueria', async () => {
        await exec(`cd ${scaffoldDirName} && npm run build:taqueria`)
        const taqContents = await exec(`ls ${scaffoldDirName}/taqueria/artifacts`)
        expect(taqContents.stdout).toContain('example.tz')
    })

		const stopResults = await exec(`cd ${scaffoldDirName}/taqueria && npm run stop:local`);
		expect(stopResults.stdout).toContain('Stopped local.');
	});

	afterAll(async () => {
		await fsPromises.rm(`${scaffoldDirName}`, { recursive: true, force: true });
	});
});
