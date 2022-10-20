import { execCmd, getArch, sendAsyncErr, sendErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { getInputFilename, LIGO_DOCKER_IMAGE, TestOpts as Opts } from './common';

type TableRow = { contract: string; testResults: string };

const getTestContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${LIGO_DOCKER_IMAGE} run test`;
	const inputFile = getInputFilename(parsedArgs, sourceFile);
	const cmd = `${baseCmd} ${inputFile}`;
	return cmd;
};

const testContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getArch()
		.then(() => getTestContractCmd(parsedArgs, sourceFile))
		.then(execCmd)
		.then(({ stdout, stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
			const result = '🎉 All tests passed 🎉';
			return {
				contract: sourceFile,
				testResults: stdout.length > 0 ? `${stdout}\n${result}` : result,
			};
		})
		.catch(err => {
			sendErr(`\n=== For ${sourceFile} ===`);
			sendErr(err.message.replace(/Command failed.+?\n/, ''));
			return {
				contract: sourceFile,
				testResults: 'Some tests failed :(',
			};
		});

const test = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = parsedArgs.sourceFile;
	return testContract(parsedArgs, sourceFile).then(result => [result]).then(sendJsonRes).catch(err =>
		sendAsyncErr(err, false)
	);
};

export default test;
