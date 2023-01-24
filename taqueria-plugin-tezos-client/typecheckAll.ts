import { getArtifactsDir, isContractFile, sendAsyncErr, sendJsonRes } from '@taqueria/node-sdk';
import glob from 'fast-glob';
import { join } from 'path';
import { TypeCheckAllOpts as Opts, TypeCheckOpts } from './common';
import { TableRow, typecheckContract } from './typecheck';

const compileAll = async (parsedArgs: Opts): Promise<void> => {
	let p: Promise<TableRow>[] = [];

	const contractFilenames = await glob(
		['**/*.tz'],
		{ cwd: join(parsedArgs.config.projectDir, getArtifactsDir(parsedArgs)), absolute: false },
	);

	for (const filename of contractFilenames) {
		if (isContractFile(filename)) p.push(typecheckContract(parsedArgs as TypeCheckOpts, filename));
	}

	return Promise.all(p).then(sendJsonRes).catch(err => sendAsyncErr(err, false));
};

export default compileAll;
