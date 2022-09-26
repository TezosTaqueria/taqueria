import { execCmd, sendAsyncErr, sendErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { join } from 'path';

interface Opts extends RequestArgs.t {
	sourceFile: string;
}

type TableRow = { contract: string; result: string };

const FLEXTESA_IMAGE = 'oxheadalpha/flextesa:rc-20220915-arm64';

const getInputFilename = (opts: Opts, sourceFile: string) => join('/project', opts.config.artifactsDir, sourceFile);

const getCheckFileExistenceCommand = (parsedArgs: Opts, sourceFile: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project ${FLEXTESA_IMAGE} ls`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} ${inputFile}`;
	return cmd;
};

const getTypecheckCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project ${FLEXTESA_IMAGE}`;
	const globalOptions = '--endpoint https://kathmandunet.ecadinfra.com';
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} tezos-client ${globalOptions} typecheck script ${inputFile}`;
	return cmd;
};

const typecheckContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	execCmd(getCheckFileExistenceCommand(parsedArgs, sourceFile))
		.then(() =>
			execCmd(getTypecheckCmd(parsedArgs, sourceFile))
				.then(({ stderr }) => {
					if (stderr.length > 0) sendWarn(stderr);
					return {
						contract: sourceFile,
						result: 'Valid',
					};
				})
				.catch(err => {
					sendErr(`\n=== For ${sourceFile} ===`);
					sendErr(err.message.replace(/Command failed.+?\n/, ''));
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
