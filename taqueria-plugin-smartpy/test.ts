import { execCmd, getArch, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { emitExternalError, getInputFilename, getSmartPyArtifactDirname, TestOpts as Opts } from './common';

type TableRow = { contract: string; testResults: string };

const getTestContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const outputDir = getSmartPyArtifactDirname(parsedArgs, sourceFile);
	return `~/smartpy-cli/SmartPy.sh test ${getInputFilename(parsedArgs, sourceFile)} ${outputDir}`;
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
			emitExternalError(err, sourceFile);
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
