import { sendErr, sendJsonRes } from '@taqueria/node-sdk';
import glob from 'fast-glob';
import { join } from 'path';
import { Common, CompileAllOpts, CompileAllOpts as Opts, CompileOpts } from './common';
import { inject, isParameterListFile, isStorageListFile, TableRow } from './compile';

const compileAll = async (commonObj: Common, parsedArgs: Opts): Promise<void> => {
	const { listContractModules, compileContractWithStorageAndParameter } = inject(commonObj);

	let compilePromises: Promise<TableRow[]>[] = [];

	const contractFilenames = await glob(
		['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
		{
			cwd: join(parsedArgs.config.projectDir, parsedArgs.config.contractsDir ?? 'contracts'),
			absolute: false,
		},
	);

	for (const filename of contractFilenames) {
		if (isStorageListFile(filename) || isParameterListFile(filename)) continue;
		const moduleNames = await listContractModules(parsedArgs as unknown as CompileAllOpts, filename);
		for (const moduleName of moduleNames) {
			compilePromises.push(compileContractWithStorageAndParameter(parsedArgs as CompileOpts, filename, moduleName));
		}
	}

	return Promise.all(compilePromises)
		.then(tables => tables.flat())
		.then(sendJsonRes)
		.catch(err => sendErr(err, false));
};

export default compileAll;
