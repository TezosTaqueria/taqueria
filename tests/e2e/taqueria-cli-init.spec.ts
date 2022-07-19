import { exec as exec1 } from 'child_process';
import type { ExecException } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
const exec = util.promisify(exec1);

const taqueriaProjectPath = './e2e/auto-test';
const taqueriaProjectPathNPM = './e2e/auto-test-npm-empty';
const taqueriaProjectPathNPMSuccess = './e2e/auto-test-npm-success';
const taqueriaProjectPathNPMFull = './e2e/auto-test-npm-full';

describe('E2E Testing for taqueria general functionality', () => {
	test('Verify that taq init creates test folder', async () => {
		try {
			const projectInit = await exec(`taq init ${taqueriaProjectPath}`);
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

	test('Verify that trying to install a plugin before initializing as an npm project fails', async () => {
		try {
			await exec(`taq init ${taqueriaProjectPathNPM}`);

			await exec(`cd ${taqueriaProjectPathNPM} && taq install @taqueria/plugin-ligo`).catch(
				(err: ExecException & { stdout: string; stderr: string }) => {
					expect(err.code).toEqual(8);
					expect(err.stderr).toContain(`This project isn't a valid NPM project. Please run: npm init`);
				},
			);

			await fsPromises.rm(`${taqueriaProjectPathNPM}`, { recursive: true });
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

	test.skip('Verify plugin install with full npm initialization', async () => {
		try {
			await exec(`taq init ${taqueriaProjectPathNPMFull}`);
			await exec(`npm init -y`, { cwd: `./${taqueriaProjectPathNPMFull}` });
			await exec(`npm init -y && taq install @taqueria/plugin-ligo -p ./${taqueriaProjectPathNPMFull}`);

			const ligoPackageContents = await exec(`cat ../taqueria-plugin-ligo/package.json`);
			const ligoVersion = JSON.parse(ligoPackageContents.stdout).version;
			const packageContentsFull = await exec(`cd ${taqueriaProjectPathNPMFull} && cat package.json`);

			const fileContentsFull = {
				'name': 'auto-test-npm-full',
				'version': '1.0.0',
				'description': '',
				'main': 'index.js',
				'directories': {
					'test': 'tests',
				},
				'scripts': {
					'test': 'echo "Error: no test specified" && exit 1',
				},
				'keywords': [],
				'author': '',
				'license': 'ISC',
				'devDependencies': {
					'@taqueria/plugin-ligo': `^${ligoVersion}`,
				},
			};

			expect(JSON.parse(packageContentsFull.stdout)).toEqual(fileContentsFull);

			await fsPromises.rm(`${taqueriaProjectPathNPMFull}`, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
