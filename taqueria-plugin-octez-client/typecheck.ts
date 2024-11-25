import {
	addTzExtensionIfMissing,
	execCmd,
	getArch,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import {
	execOctezClient,
	getCheckFileExistenceCommand,
	getClientDockerImage,
	getInputFilename,
	GLOBAL_OPTIONS,
	trimTezosClientMenuIfPresent,
	TypeCheckOpts as Opts,
} from './common';

export type TableRow = { contract: string; result: string };

export const typecheckContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getCheckFileExistenceCommand(parsedArgs, sourceFile)
		.then(execCmd)
		.then(() =>
			execOctezClient(`typecheck script ${getInputFilename(parsedArgs, sourceFile)}`, parsedArgs.projectDir)
				.then(({ stderr }) => {
					if (stderr.length > 0) sendWarn(stderr);
					return {
						contract: sourceFile,
						result: 'Valid',
					};
				})
				.catch(err => {
					sendErr(`\n=== For ${sourceFile} ===`);
					const msg: string = trimTezosClientMenuIfPresent(err.message);
					sendErr(msg.replace(/Command failed.+?\n/, ''));
					return {
						contract: sourceFile,
						result: 'Invalid',
					};
				})
		)
		.catch(err => {
			sendErr(`\n=== For ${sourceFile} ===`);
			sendErr(err.message.replace(/Command failed.+?\n/, ''));
			return {
				contract: sourceFile,
				result: 'N/A',
			};
		});

const typecheck = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = addTzExtensionIfMissing(parsedArgs.sourceFile);
	return typecheckContract(parsedArgs, sourceFile).then(result => [result]).then(sendJsonRes).catch(err =>
		sendAsyncErr(err, false)
	);
};

export default typecheck;
