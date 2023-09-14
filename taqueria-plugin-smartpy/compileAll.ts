import { sendErr, sendJsonRes } from '@taqueria/node-sdk';
import { readdir } from 'fs/promises';
import { join, resolve } from 'path';
import { COMPILE_ERR_MSG, compileContract } from './compile';

import { CompileAllOpts, isParameterListFile, isSmartPyFile, isStorageListFile, TableRow } from './common';

export const getFilesRecursively = async (dir: string): Promise<string[]> => {
	const dirents = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		dirents.map(dirent => {
			const res = resolve(dir, dirent.name);
			return dirent.isDirectory() ? getFilesRecursively(res) : res;
		}),
	);

	return Array.prototype.concat(...files);
};

export const compileAll = async (parsedArgs: CompileAllOpts): Promise<void> => {
	// Find all contracts in the contractDirs directory
	const contractsAbsPath = join(parsedArgs.config.projectDir, parsedArgs.config.contractsDir ?? 'contracts');

	try {
		// This line will now get all files, including those in subdirectories
		const allFiles = await getFilesRecursively(contractsAbsPath);

		const data = await allFiles.reduce(
			async (acc, contractAbsPath) => {
				debugger;
				const contractRelPath = contractAbsPath.replace(contractsAbsPath, '').replace(/^\//, '');
				if (
					isSmartPyFile(contractAbsPath)
					&& !(isParameterListFile(contractAbsPath) || isStorageListFile(contractAbsPath))
				) {
					const tableRows = await acc;
					const results = await compileContract({ ...parsedArgs, sourceFile: contractRelPath }, contractRelPath);
					return [...tableRows, ...results];
				}
				return acc;
			},
			Promise.resolve([] as TableRow[]),
		);
		sendJsonRes(data, {
			footer: `\nCompiled ${data.filter(result => result.artifact != COMPILE_ERR_MSG).length} contract(s)."`,
		});
	} catch (err) {
		sendErr(err instanceof Error ? err.message : String(err));
	}
};

export default compileAll;
