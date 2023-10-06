import {
	addTzExtensionIfMissing,
	execCmd,
	getArch,
	getContractContent,
	getParameter,
	sendAsyncErr,
	sendErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import { basename, extname } from 'path';
import {
	getCheckFileExistenceCommand,
	getClientDockerImage,
	getInputFilename,
	GLOBAL_OPTIONS,
	SimulateOpts as Opts,
	trimTezosClientMenuIfPresent,
} from './common';

type TableRow = { contract: string; result: string };

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
	const storage = (await getContractContent(parsedArgs, storageFilename))?.trim();

	if (storage === undefined) {
		return Promise.reject(
			new Error(
				`❌ No initial storage file was found for ${sourceFile}\nStorage must be specified in a file as a Michelson expression and will automatically be linked to this contract if specified with the name "${
					getDefaultStorageFilename(sourceFile)
				}" in the artifacts directory\nYou can also manually pass a storage file to the simulate task using the --storage STORAGE_FILE_NAME option\n`,
			),
		);
	}

	const paramFilename = parsedArgs.param!;
	const param = (await getParameter(parsedArgs, paramFilename)).trim();

	const arch = await getArch();
	const flextesaImage = getClientDockerImage();
	const baseCmd = `docker run --rm -v \"${projectDir}\":/project -w /project --platform ${arch} ${flextesaImage}`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const entrypoint = parsedArgs.entrypoint ? `--entrypoint ${parsedArgs.entrypoint}` : '';

	const cmd =
		`${baseCmd} octez-client ${GLOBAL_OPTIONS} run script ${inputFile} on storage \'${storage}\' and input \'${param}\' ${entrypoint}`;
	return cmd;
};

const simulateContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getCheckFileExistenceCommand(parsedArgs, sourceFile)
		.then(execCmd)
		.then(() =>
			retrySimulateCmd(parsedArgs, sourceFile, 0)
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

const retrySimulateCmd = (
	parsedArgs: Opts,
	sourceFile: string,
	retryCount: number,
): Promise<{ stdout: string; stderr: string }> => {
	const max_retries = 3;
	const relay_delay_ms = 1000;
	return getSimulateCmd(parsedArgs, sourceFile)
		.then(execCmd)
		.catch(err => {
			if (retryCount < max_retries && err.stderr.includes('503 Service Temporarily')) {
				const delay = relay_delay_ms * Math.pow(2, retryCount);
				return new Promise(resolve => setTimeout(resolve, delay))
					.then(() => retrySimulateCmd(parsedArgs, sourceFile, retryCount + 1));
			} else {
				throw err;
			}
		});
};

const simulate = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = addTzExtensionIfMissing(parsedArgs.sourceFile!);
	return simulateContract(parsedArgs, sourceFile).then(result => [result]).then(sendJsonRes).catch(err =>
		sendAsyncErr(err, false)
	);
};

export default simulate;
