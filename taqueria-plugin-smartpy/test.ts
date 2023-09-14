import os from 'os'
import {join, basename} from 'path'
import { readdir, mkdir, copyFile, readFile } from 'fs/promises';
import { sendErr, sendWarn, execCmd, sendAsyncErr, sendJsonRes } from '@taqueria/node-sdk';
import { TestOpts, getCmdEnvVars, getInputFilenameAbsPath, emitExternalError, getSmartPyTempDir } from "./common";

const testCommand = (parsedArgs: TestOpts) => {
    const envVars = getCmdEnvVars(parsedArgs);
    const testFileAbspath = getInputFilenameAbsPath(parsedArgs, parsedArgs.sourceFile);

    const cmd = `${envVars}python ${testFileAbspath}`;

    return cmd
}

// A function to merge two directories recursively.
const mergeDirectories = async (sourceDir: string, targetDir: string): Promise<void> => {
    // Ensure the target directory exists
    await mkdir(targetDir, { recursive: true });

    const sourceDirents = await readdir(sourceDir, { withFileTypes: true });

    // Loop through all items in the source directory
    for (const sourceDirent of sourceDirents) {
        const sourcePath = join(sourceDir, sourceDirent.name);
        const targetPath = join(targetDir, sourceDirent.name);

        // Check if the current item is a directory or a file
        if (sourceDirent.isDirectory()) {
        // Recurse into the directory
        await mergeDirectories(sourcePath, targetPath);
        } else {
        // It's a file, let's copy it over
        await copyFile(sourcePath, targetPath);
        }
    }
};
  
export const getLogOutput = async (absPath: string): Promise<string> => {
    const subDirs = await readdir(absPath, { withFileTypes: true });

    const subDirNames = subDirs
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    const logReads = await Promise.all(
        subDirNames.map(async (subDirName) => {
        const logFilePath = join(absPath, subDirName, 'log.txt');
        try {
            const logContent = await readFile(logFilePath, 'utf-8');
            return `=== ${subDirName}/log.txt ===\n${logContent}\n`;
        } catch (err) {
            console.warn(`Failed to read log file at ${subDirName}/log.txt: ${err}`);
            return '';
        }
        })
    );

    const accumulatedLog = logReads.reduce((acc, log) => acc + log, '');
    return accumulatedLog;
};
  

export const testContract = async (parsedArgs: TestOpts): Promise<{test: string, results: string}> => {
    try {
        const cmd = testCommand(parsedArgs);
        const { stderr, stdout } = await execCmd(cmd);
        if (stderr.length > 0) sendWarn(stderr);

        const tmpDir = getSmartPyTempDir(parsedArgs);

        // Read the log files and add to the stdout
        const logOutput = await getLogOutput(tmpDir);

        // Move the test results in the SmartPy temp folder to the artifacts directory. If there are existing directories, merge and overwrite.
        const artifactsAbsPath = join(parsedArgs.projectDir, parsedArgs.config.artifactsDir ?? 'artifacts');
        await mergeDirectories(tmpDir, artifactsAbsPath);

        return {
            test: parsedArgs.sourceFile,
            results: stdout.length > 0 ? `${stdout}\n${logOutput}` : logOutput,
        };

    } catch (err) {
        emitExternalError(err, parsedArgs.sourceFile);
			return {
				test: parsedArgs.sourceFile,
				results: 'Some tests failed :(',
			};
    }

}

export const test = async(parsedArgs: TestOpts): Promise<void> => {
    const sourceFile = parsedArgs.sourceFile;
	if (!sourceFile) return sendAsyncErr(`No source file provided`);
	return testContract(parsedArgs).then(result => [result]).then(sendJsonRes).catch(err =>
		sendAsyncErr(err, false)
	);
}

export default test