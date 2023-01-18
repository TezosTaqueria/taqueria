import { sendErr, sendJsonRes } from '@taqueria/node-sdk';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import { CompileAllOpts as Opts, CompileOpts, getInputFilename } from './common';
import { compileOneContract, TableRow } from './compile';

const isMainContract = (parsedArgs: Opts, contactFilename: string): Promise<boolean> =>
	readFile(getInputFilename(parsedArgs, contactFilename), 'utf8')
		.then(data => /(const|let|function)\s+main/.test(data));

const compileAll = async (parsedArgs: Opts): Promise<void> => {
	let p: Promise<TableRow[]>[] = [];

	const contractFilenames = await glob(
		['**/*.ligo', '**/*.mligo', '**/*.jsligo'],
		{ cwd: parsedArgs.config.contractsDir, absolute: false },
	);

	for (const filename of contractFilenames) {
		if (await isMainContract(parsedArgs, filename)) {
			p.push(compileOneContract(parsedArgs as CompileOpts, filename));
		}
	}

	return Promise.all(p).then(tables => tables.flat()).then(sendJsonRes).catch(err => sendErr(err, false));
};

export default compileAll;
