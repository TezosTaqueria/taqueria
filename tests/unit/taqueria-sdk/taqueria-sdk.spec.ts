import { getArch, getDockerImage, readJsonFile, writeJsonFile } from '@taqueria/node-sdk';
import * as fs from 'fs';

const jsonObject = {
	'testkey': 'testvalue',
};

describe('Unit tests for Taqueria SDK', () => {
	test('Verify that writeJsonFile can write json data to a file', async () => {
		const filePath = './unit/taqueria-sdk/data/writeJsonFileTest.json';
		const result = await writeJsonFile(filePath)(jsonObject);
		expect(result).toEqual('./unit/taqueria-sdk/data/writeJsonFileTest.json');
		fs.unlinkSync(filePath);
	});

	test('Verify that readJsonFile can read json data from a file', async () => {
		const filePath = './unit/taqueria-sdk/data/readJsonFileTest.json';
		const result = await readJsonFile(filePath);
		expect(result).toEqual(jsonObject);
	});

	test.skip('Verify that writeJsonFile can write config.json V2', async () => {
		const config = JSON.parse(
			await fs.promises.readFile('./unit/taqueria-sdk/data/runtime/config.json', { encoding: `utf-8` }),
		);

		await fs.promises.mkdir(`./unit/taqueria-sdk/temp/config-test/.taq/`, { recursive: true });
		await writeJsonFile('./unit/taqueria-sdk/temp/config-test/.taq/config.json')(config);
		const actual = JSON.parse(
			await fs.promises.readFile('./unit/taqueria-sdk/temp/config-test/.taq/config.json', { encoding: `utf-8` }),
		);
		const expected = JSON.parse(
			await fs.promises.readFile('./unit/taqueria-sdk/data/v2/.taq/config.json', { encoding: `utf-8` }),
		);

		expect(actual).toEqual(expected);
	});

	test.skip('Verify that readJsonFile can read config.json V2', async () => {
		const result = await readJsonFile('./unit/taqueria-sdk/data/v2/.taq/config.json');
		const expected = JSON.parse(
			await fs.promises.readFile('./unit/taqueria-sdk/data/runtime/config.json', { encoding: `utf-8` }),
		);
		expect(result).toEqual(expected);
	});

	test('Verify that readJsonFile can read config.json V1 (auto migrate)', async () => {
		const result = await readJsonFile('./unit/taqueria-sdk/data/v1/.taq/config.json');
		const expected = JSON.parse(
			await fs.promises.readFile('./unit/taqueria-sdk/data/runtime/config.json', { encoding: `utf-8` }),
		);
		expect(result).toEqual(expected);
	});

	test('Verify that getArch returns the proper version', async () => {
		const platforms = ['linux/amd64', 'linux/arm64/v8'];
		const result = await getArch();
		expect(platforms).toContain(result);
	});

	test('Verify that getDockerImage evaluates environment variables as it should', () => {
		const imageName = 'foobar';
		const envVarValue = 'FOOBAR';
		const envVarName = 'TAQ_FOOBAR';
		expect(getDockerImage(imageName, envVarName)).toBe(imageName);

		process.env[envVarName] = envVarValue;
		expect(getDockerImage(imageName, envVarName)).toBe(envVarValue);
	});
});
