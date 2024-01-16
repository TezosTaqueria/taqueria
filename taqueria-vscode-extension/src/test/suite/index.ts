import { glob } from 'glob';
import Mocha from 'mocha';
import * as path from 'path';

export async function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'bdd',
	});
	mocha.timeout(20 * 60 * 1000);
	mocha.options.color = true;

	const testsRoot = path.resolve(__dirname, '../../../');

	// TODO extension.test.ts is broken and needs to be fixed.
	const files = await glob('**/mini-block-explorer.test.js', {
		cwd: testsRoot,
	});

	// Add files to the test suite
	files.map(f => {
		const filePath = path.resolve(testsRoot, f);
		mocha.addFile(filePath);
	});

	// Run the mocha test
	return new Promise(function(resolve, reject) {
		mocha.run(failures => {
			if (failures > 0) {
				reject(new Error(`${failures} tests failed.`));
			} else {
				resolve();
			}
		});
	});
}
