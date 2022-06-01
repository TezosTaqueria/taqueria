import { readJsonFile } from '@taqueria/node-sdk';
import yargs from 'yargs';
import { configureAccounts, configureTezosClient, importAccounts, startMininet } from './lib';
import * as SanitizedArgs from './SanitizedArgs';

const sleep = (ms: number) =>
	new Promise((resolve, reject) => {
		setTimeout(() => {}, ms);
	});

/**** Program Execution Starts Here */
const inputArgs = yargs(process.argv)
	.option('configAbsPath', {
		default: '/project/.taq/config.json',
	})
	.option('sandbox', {
		default: '',
	})
	.option('configure', {
		default: false,
		boolean: true,
	})
	.option('importAccounts', {
		default: false,
		boolean: true,
	})
	.parse();

(async () => {
	const sanitizedArgs = await SanitizedArgs.create(inputArgs);
	if (sanitizedArgs.importAccounts) return await importAccounts(sanitizedArgs);
	else if (sanitizedArgs.configure) return await configureTezosClient();
	else {
		const updated = await configureAccounts(sanitizedArgs);
		return startMininet(updated);
	}
})()
	.then(stdout => {
		console.log(stdout);
	})
	.catch((err: string) => {
		console.error(err);
		process.exit(-1);
	});
