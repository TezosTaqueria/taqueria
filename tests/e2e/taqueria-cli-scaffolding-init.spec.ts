import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
const exec = util.promisify(exec1);

describe('E2E Testing for taqueria scaffolding initialization,', () => {
	const scaffoldDirName = `taqueria-taco-shop`;

	test('Verify that taq scaffold will create a baseline scaffold of the taco shop project', async () => {
		// the URL for the default scaffold project is https://github.com/ecadlabs/taqueria-scaffold-taco-shop
		try {
			await exec('mkdir -p ./scrap/scaffold01 && cd scrap/scaffold01 && taq scaffold');
			const homeDirContents = await exec('ls scrap/scaffold01');
			expect(homeDirContents.stdout).toContain(scaffoldDirName);
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq scaffold quickstart project has the correct file structure', async () => {
		try {
			await exec('mkdir -p ./scrap/scaffold02 && cd scrap/scaffold02 && taq scaffold');
			const scaffoldDirContents = await exec(`ls scrap/scaffold01/${scaffoldDirName}`);

			expect(scaffoldDirContents.stdout).toContain('README.md');
			expect(scaffoldDirContents.stdout).toContain('app');
			expect(scaffoldDirContents.stdout).toContain('contracts');
			expect(scaffoldDirContents.stdout).toContain('artifacts');
			expect(scaffoldDirContents.stdout).toContain('node_modules');
			expect(scaffoldDirContents.stdout).toContain('scaffold.log');
			expect(scaffoldDirContents.stdout).toContain('package.json');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq scaffold can use the URL parameter to clone a different scaffold into the project', async () => {
		try {
			await exec(
				'mkdir -p ./scrap/scaffold03 && cd scrap/scaffold03 && taq scaffold https://github.com/ecadlabs/taqueria-scaffold-nft.git',
			);
			const scaffoldDirContents = await exec(`ls scrap/scaffold03/${scaffoldDirName}`);

			expect(scaffoldDirContents.stdout).toContain('README.md');
			expect(scaffoldDirContents.stdout).toContain('app');
			expect(scaffoldDirContents.stdout).toContain('taqueria');
			expect(scaffoldDirContents.stdout).toContain('contracts');
			expect(scaffoldDirContents.stdout).toContain('artifacts');
			expect(scaffoldDirContents.stdout).toContain('node_modules');
			expect(scaffoldDirContents.stdout).toContain('scaffold.log');
			expect(scaffoldDirContents.stdout).toContain('package.json');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	// TODO: https://github.com/ecadlabs/taqueria/issues/737
	test('Verify that taq scaffold returns an error with a bogus URL', async () => {
		const scaffoldURL = 'https://github.com/ecadlabs/taqueria-scaffold-taco-shopzzz.git';
		try {
			if (process.env.CI === 'true') {
				await exec(
					`mkdir -p ./scrap/scaffold04 && cd scrap/scaffold04 && taq scaffold https://alexzbusko:${process.env.SCAFFOLDING_PAT}@github.com/ecadlabs/taqueria-scaffold-taco-shopzzz.git`,
				);
			}

			await exec(`mkdir -p ./scrap/scaffold04 && cd scrap/scaffold04 && taq scaffold ${scaffoldURL}`);
		} catch (error: any) {
			expect(error.toString()).toContain(`remote: Repository not found.`);
			expect(error.toString()).toContain(`repository '${scaffoldURL}/' not found`);
		}
	});

	// Remove scaffold directory after test completes
	afterEach(async () => {
		await fsPromises.rm(`./${scaffoldDirName}`, { recursive: true, force: true });
	});
});

describe('E2E Testing for taqueria scaffolding initialization in other directory,', () => {
	const alternateDirectory = 'scrap/alt-directory';
	test('Verify that taq scaffold quickstart project can be installed in a specific directory', async () => {
		try {
			await exec(`taq scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git ${alternateDirectory}`);
			const scaffoldDirContents = await exec(`ls ${alternateDirectory}`);

			expect(scaffoldDirContents.stdout).toContain('README.md');
			expect(scaffoldDirContents.stdout).toContain('app');
			expect(scaffoldDirContents.stdout).toContain('contracts');
			expect(scaffoldDirContents.stdout).toContain('artifacts');
			expect(scaffoldDirContents.stdout).toContain('node_modules');
			expect(scaffoldDirContents.stdout).toContain('scaffold.log');
			expect(scaffoldDirContents.stdout).toContain('package.json');
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test('Verify that taq scaffold quickstart project cannot be injected into an existing directory', async () => {
		try {
			await fsPromises.mkdir(`${alternateDirectory}`);
			await exec(
				`taq scaffold https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git ${alternateDirectory}`,
			);
		} catch (error) {
			expect(JSON.stringify(error)).toContain('Path already exists');
		}
	});

	// Remove scaffold directory after test completes
	afterEach(async () => {
		await fsPromises.rm(`./${alternateDirectory}`, { recursive: true, force: true });
	});
});
