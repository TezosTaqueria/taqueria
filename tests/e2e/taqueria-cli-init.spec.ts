import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = './e2e/auto-test';
const taqueriaProjectPathNPMSuccess = './e2e/auto-test-npm-success';
const taqueriaProjectPathNPMFull = './e2e/auto-test-npm-full';

describe('E2E Testing for taqueria general functionality', () => {
	test('Verify that taq init creates test folder', async () => {
		try {
			const projectInit = await generateTestProject(taqueriaProjectPath);
			expect(projectInit.stdout.trim()).toEqual("Project taq'ified!");

			const taquifiedDirContents = await fsPromises.readdir(taqueriaProjectPath);
			expect(taquifiedDirContents).toContain('artifacts');
			expect(taquifiedDirContents).toContain('contracts');
			expect(taquifiedDirContents).toContain('quickstart.md');

			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	test.skip('Verify that to install a plugin all you need is a package.json file with {}', async () => {
		try {
			await exec(`taq init ${taqueriaProjectPathNPMSuccess}`);
			await exec(`echo "{}" > ${taqueriaProjectPathNPMSuccess}/package.json`);
			await exec(`taq install @taqueria/plugin-ligo`, { cwd: `./${taqueriaProjectPathNPMSuccess}` });

			const ligoPackageContents = await exec(`cat ../taqueria-plugin-ligo/package.json`);
			const ligoVersion = JSON.parse(ligoPackageContents.stdout).version;
			const packageContents = await exec(`cd ${taqueriaProjectPathNPMSuccess} && cat package.json`);

			const fileContentsBare = {
				'devDependencies': {
					'@taqueria/plugin-ligo': `^${ligoVersion}`,
				},
			};
			expect(JSON.parse(packageContents.stdout)).toEqual(fileContentsBare);

			await fsPromises.rm(`${taqueriaProjectPathNPMSuccess}`, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
