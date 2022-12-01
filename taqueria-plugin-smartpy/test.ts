import { execCmd, getArch, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import {
	addPyExtensionIfMissing,
	emitExternalError,
	getCompilationTargetsDirname,
	getInputFilename,
	getSmartPyCli,
	installSmartPyCliIfNotExist,
	TestOpts as Opts,
} from './common';

type TableRow = { contract: string; testResults: string };

const getTestContractCmd = (parsedArgs: Opts, sourceFile: string): string => {
	const outputDir = getCompilationTargetsDirname(parsedArgs, sourceFile);
	const booleanFlags = ' --html --purge ';
	return `${getSmartPyCli()} test ${getInputFilename(parsedArgs, sourceFile)} ${outputDir} ${booleanFlags}`;
};

const testContract = (parsedArgs: Opts, sourceFile: string): Promise<TableRow> =>
	getArch()
		.then(() => installSmartPyCliIfNotExist())
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
			const outputDir = getCompilationTargetsDirname(parsedArgs, sourceFile);
			return {
				contract: sourceFile,
				testResults: `Some tests failed :(\nInspect the log files inside the test subfolders of\n"${outputDir}"`,
			};
		});

const test = (parsedArgs: Opts): Promise<void> => {
	const sourceFile = addPyExtensionIfMissing(parsedArgs.sourceFile);
	return testContract(parsedArgs, sourceFile).then(result => [result]).then(sendJsonRes).catch(err =>
		sendAsyncErr(err, false)
	);
};

export default test;
