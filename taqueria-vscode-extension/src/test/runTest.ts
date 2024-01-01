import { runTests } from '@vscode/test-electron';
import * as fse from 'fs-extra';
import * as path from 'path';

const homedir = require('os').homedir();
const testProjectDestination = path.resolve(homedir, 'TVsCE_e2e/vscode-taq-test-project/');
const vsCodeUserData = path.resolve(homedir, '.vscode-test/user-data'); // fixes long path warning

async function main() {
	try {
		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to the extension test script
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, '../../out/test/suite/index');

		const launchArgs = [`${testProjectDestination}/`, '--disable-extension=true', `--user-data-dir=${vsCodeUserData}`];

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionDevelopmentPath, extensionTestsPath, launchArgs });
	} catch (err) {
		console.error('Failed to run tests');

		if (fse.existsSync(vsCodeUserData)) {
			fse.rmdirSync(vsCodeUserData, { recursive: true });
		}
		if (fse.existsSync(testProjectDestination)) {
			fse.rmdirSync(testProjectDestination, { recursive: true });
		}
		process.exit(1);
	} finally {
		process.exit(0);
	}
}

main();
