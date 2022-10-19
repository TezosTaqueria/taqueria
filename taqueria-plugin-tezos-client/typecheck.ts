import {
	execCmd,
	getArch,
	getLatestFlextesaImage,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import {
	getCheckFileExistenceCommand,
	getInputFilename,
	GLOBAL_OPTIONS,
	trimTezosClientMenuIfPresent,
	TypeCheckOpts as Opts,
} from './common';

type TableRow = { contract: string; result: string };

const getTypecheckCmd = async (parsedArgs: Opts, sourceFile: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const arch = await getArch();
	const flextesaImage = await getLatestFlextesaImage(arch);
	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project --platform ${arch} ${flextesaImage}`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} tezos-client ${GLOBAL_OPTIONS} typecheck script ${inputFile}`;
	return cmd;
};

const typecheckContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getCheckFileExistenceCommand(parsedArgs, sourceFile)
		.then(execCmd)
		.then(() =>
			getTypecheckCmd(parsedArgs, sourceFile)
				.then(execCmd)
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

export const typecheck = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = parsedArgs.sourceFile;
	return typecheckContract(parsedArgs, sourceFile).then(result => [result]).then(sendJsonRes).catch(err =>
		sendAsyncErr(err, false)
	);
};

export default typecheck;
