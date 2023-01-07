import { getArch, getDockerImage, readJsonFile, writeJsonFile } from '@taqueria/node-sdk';
import * as fs from 'fs';

const jsonObject = {
	'testkey': 'testvalue',
};

describe('Unit tests for Taqueria SDK', () => {
	test('Verify that writeJsonFile can write json data to a file', async () => {
		const filePath = '.\/unit\/taqueria-sdk\/data\/writeJsonFileTest.json';
		const result = await writeJsonFile(filePath)(jsonObject);
		expect(result).toEqual('./unit/taqueria-sdk/data/writeJsonFileTest.json');
		fs.unlinkSync(filePath);
	});

	test('Verify that readJsonFile can write json data to a file', async () => {
		const filePath = '.\/unit\/taqueria-sdk\/data\/readJsonFileTest.json';
		const result = await readJsonFile(filePath);
		expect(result).toEqual(jsonObject);
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
