import {
	execCmd,
	getParameter,
	newGetInitialStorage,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';
import { basename, extname, join } from 'path';

interface Opts extends RequestArgs.t {
	sourceFile: string;
	storage?: string;
	param: string;
	entrypoint?: string;
}

type TableRow = { contract: string; result: string };

const FLEXTESA_IMAGE = 'oxheadalpha/flextesa:20220510';

const getInputFilename = (opts: Opts, sourceFile: string) => join('/project', opts.config.artifactsDir, sourceFile);

const getCheckFileExistenceCommand = (parsedArgs: Opts, sourceFile: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project ${FLEXTESA_IMAGE} ls`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} ${inputFile}`;
	return cmd;
};

// This is needed mostly due to the fact that execCmd() wraps the command in double quotes
const preprocessString = (value: string): string => {
	// 1. if the string contains escaped double quotes, escape them further
	value = value.replace(/\\"/g, '\\\\\\"');
	// 2. if the string contains unescaped double quotes, escape them
	value = value.replace(/(?<!\\)"/g, '\\"');
	return value;
};

const getDefaultStorageFilename = (contractName: string): string => {
	const baseFilename = basename(contractName, extname(contractName));
	const extFilename = extname(contractName);
	const defaultStorage = `${baseFilename}.default_storage${extFilename}`;
	return defaultStorage;
};

const getSimulateCmd = async (parsedArgs: Opts, sourceFile: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;

	const storageFilename = parsedArgs.storage ?? getDefaultStorageFilename(sourceFile);
	const storage = (await newGetInitialStorage(parsedArgs, storageFilename))?.trim();

	if (storage === undefined) {
		return sendAsyncErr(
			`❌ No initial storage file was found for ${sourceFile}\nStorage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "${
				getDefaultStorageFilename(sourceFile)
			}" in the artifacts directory\nYou can also manually pass a storage file to the simulate task using the --storage STORAGE_FILE_NAME option\n`,
		);
	}

	const paramFilename = parsedArgs.param;
	const param = (await getParameter(parsedArgs, paramFilename)).trim();

	const processedStorage = preprocessString(storage);
	const processedParam = preprocessString(param);

	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project ${FLEXTESA_IMAGE}`;
	const globalOptions = '--endpoint https://jakartanet.ecadinfra.com';
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const entrypoint = parsedArgs.entrypoint ? `--entrypoint ${parsedArgs.entrypoint}` : '';

	const cmd =
		`${baseCmd} tezos-client ${globalOptions} run script ${inputFile} on storage \'${processedStorage}\' and input \'${processedParam}\' ${entrypoint}`;
	return cmd;
};

const trimTezosClientMenuIfPresent = (msg: string): string => {
	return msg.replace(/Usage:(.|\n)+/, '');
};

const simulateContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	execCmd(getCheckFileExistenceCommand(parsedArgs, sourceFile))
		.then(() => {
			try {
				return getSimulateCmd(parsedArgs, sourceFile)
					.then(execCmd)
					.then(({ stdout, stderr }) => {
						if (stderr.length > 0) sendWarn(`\n${stderr}`);
						return {
							contract: sourceFile,
							result: stdout,
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
					});
			} catch (err: any) {
				sendErr(`\n=== For ${sourceFile} ===`);
				sendErr(err.message.replace(/Command failed.+?\n/, ''));
				return {
					contract: sourceFile,
					result: 'Bad parameter or storage value',
				};
			}
		})
		.catch(err => {
			sendErr(`\n=== For ${sourceFile} ===`);
			sendErr(err.message.replace(/Command failed.+?\n/, ''));
			return {
				contract: sourceFile,
				result: 'N/A',
			};
		});

export const simulate = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = parsedArgs.sourceFile;
	return simulateContract(parsedArgs, sourceFile).then(result => [result]).then(sendJsonRes).catch(err =>
		sendAsyncErr(err, false)
	);
};

export default simulate;
