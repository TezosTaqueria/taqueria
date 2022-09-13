import { execSync } from 'child_process';
import { join, resolve } from 'path';

const cwd = resolve(join(__dirname, '/../../'));
const encoding = 'utf-8' as const;
const opts = { cwd, encoding };
const result = JSON.parse(execSync('npm version -w taqueria-sdk --json', opts));
const sdkVersion = result['@taqueria/node-sdk'];
const pResult = JSON.parse(execSync('npm version -w taqueria-protocol --json', opts));
const protoVersion = pResult['@taqueria/protocol'];

describe('Assure that SDK and Protocol are packaged correctly', () => {
	beforeAll(() => {
		// Create NPM package
		execSync('npm pack -w taqueria-sdk', opts);
		execSync('npm pack -w taqueria-protocol', opts);
	});

	test('@taqueria/node-sdk is correct', () => {
		// Get files of NPM package
		const sdkFiles = execSync(`tar -ztvf taqueria-node-sdk-${sdkVersion}.tgz`, opts);
		expect(sdkFiles).not.toContain('tsconfig.json');
		expect(sdkFiles).not.toMatch(/(?<!d)\.ts$/m);
	});

	test('@taqueria/protocol is correct', () => {
		// Get files of NPM package
		const sdkFiles = execSync(`tar -ztvf taqueria-protocol-${protoVersion}.tgz`, opts);
		expect(sdkFiles).not.toContain('tsconfig.json');
		expect(sdkFiles).not.toMatch(/(?<!d)\.ts$/m);
	});

	afterAll(() => {
		execSync('rm *.tgz', opts);
	});
});
