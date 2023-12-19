import { execCmd, getArch, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { Common, emitExternalError, getInputFilenameRelPath, TestOpts as Opts } from './common';

type TableRow = { contract: string; testResults: string };

const inject = (commonObj: Common) => {
	const { baseDriverCmd } = commonObj;

	const getTestContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
		const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
		if (!projectDir) throw `No project directory provided`;
		const baseCmd = `${baseDriverCmd(projectDir)} run test`;
		const inputFile = getInputFilenameRelPath(parsedArgs, sourceFile);
		const cmd = `${baseCmd} ${inputFile}`;
		return cmd;
	};

	const testContract = (
		parsedArgs: Opts,
		sourceFile: string,
	): Promise<TableRow> =>
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
				emitExternalError(err, sourceFile);
				return {
					contract: sourceFile,
					testResults: 'Some tests failed :(',
				};
			});

	return {
		testContract,
		getTestContractCmd,
	};
};

const test = (commonObj: Common, parsedArgs: Opts): Promise<void> => {
	const { testContract } = inject(commonObj);

	const sourceFile = parsedArgs.sourceFile;
	if (!sourceFile) return sendAsyncErr(`No source file provided`);
	return testContract(parsedArgs, sourceFile)
		.then(result => [result])
		.then(sendJsonRes)
		.catch(err => sendAsyncErr(err, false));
};

export default test;
