import { sendAsyncErr, sendJsonRes } from '@taqueria/node-sdk';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import { CompileAllOpts as Opts, CompileOpts, getInputFilename } from './common';
import { compileOneContract, TableRow } from './compile';

const contractHasCompTarget = (parsedArgs: Opts, contactFilename: string): Promise<boolean> =>
	readFile(getInputFilename(parsedArgs, contactFilename), 'utf8')
		.then(data => /add_(expression_)?compilation_target\s*\(\s*['"][^'"]+['"]/.test(data));

const compileAll = async (parsedArgs: Opts): Promise<void> => {
	let p: Promise<TableRow>[] = [];

	const contractFilenames = await glob(
		['**/*.py'],
		{ cwd: parsedArgs.config.contractsDir, absolute: false },
	);

	for (const filename of contractFilenames) {
		if (await contractHasCompTarget(parsedArgs, filename)) {
			p.push(compileOneContract(parsedArgs as CompileOpts, filename));
		}
	}

	return Promise.all(p).then(sendJsonRes).catch(err => sendAsyncErr(err, false));
};

export default compileAll;
