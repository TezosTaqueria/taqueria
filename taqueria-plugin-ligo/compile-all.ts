import { sendErr, sendJsonRes } from '@taqueria/node-sdk';
import glob from 'fast-glob';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { CompileAllOpts as Opts, CompileOpts, getInputFilenameAbsPath } from './common';
import { compileContractWithStorageAndParameter, TableRow } from './compile';

const isMainContract = (parsedArgs: Opts, contactFilename: string): Promise<boolean> =>
	readFile(getInputFilenameAbsPath(parsedArgs, contactFilename), 'utf8')
		.then(data => /(const|let|function)\s+main/.test(data));

const compileAll = async (parsedArgs: Opts): Promise<void> => {
	let p: Promise<TableRow[]>[] = [];

	const contractFilenames = await glob(
		['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
		{ cwd: join(parsedArgs.config.projectDir, parsedArgs.config.contractsDir ?? 'contracts'), absolute: false },
	);

	for (const filename of contractFilenames) {
		if (await isMainContract(parsedArgs, filename)) {
			p.push(compileContractWithStorageAndParameter(parsedArgs as CompileOpts, filename));
		}
	}

	return Promise.all(p).then(tables => tables.flat()).then(sendJsonRes).catch(err => sendErr(err, false));
};

export default compileAll;
