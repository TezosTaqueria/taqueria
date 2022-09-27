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
});