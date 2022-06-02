import { exec as exec1 } from 'child_process';
import fsPromises from 'fs/promises';
import util from 'util';
import { generateTestProject } from './utils/utils';
const exec = util.promisify(exec1);

const taqueriaProjectPath = 'e2e/auto-test-jest-plugin';

describe('E2E Testing for taqueria jest plugin', () => {
	beforeAll(async () => {
		await generateTestProject(taqueriaProjectPath, ['jest']);
	});

	test('', async () => {
		try {
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});

	afterEach(async () => {
		try {
		} catch {}
	});

	// Clean up process to remove taquified project folder
	// Comment if need to debug
	afterAll(async () => {
		try {
			await fsPromises.rm(taqueriaProjectPath, { recursive: true });
		} catch (error) {
			throw new Error(`error: ${error}`);
		}
	});
});
