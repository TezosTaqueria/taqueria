import { execCmd, getArch, sendAsyncErr, sendErr, sendRes, sendWarn } from '@taqueria/node-sdk';
import { writeFile } from 'fs/promises';
import { LIGO_DOCKER_IMAGE, LigoOpts as Opts } from './common';

const MAX_OUTPUT_LIMIT = 50000;

const getArbitraryLigoCmd = (parsedArgs: Opts, cmd: string): string => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const baseCmd =
		`DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project -u $(id -u):$(id -g) ${LIGO_DOCKER_IMAGE}`;
	return `${baseCmd} ${cmd}`;
};

const runArbitraryLigoCmd = (parsedArgs: Opts, cmd: string): Promise<string> =>
	getArch()
		.then(() => getArbitraryLigoCmd(parsedArgs, cmd))
		.then(execCmd)
		.then(async ({ stdout, stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
			if (stdout.length >= MAX_OUTPUT_LIMIT) {
				const outputFile = './ligo.output';
				sendWarn(
					`The output of the underlying LIGO binary is too big so we are dumping it to "${outputFile}" instead of displaying it here in the console`,
				);
				await writeFile(outputFile, stdout, { encoding: 'utf8' });
				return '';
			}
			return stdout;
		})
		.catch(err => {
			sendErr(err.message.replace(/Command failed.+?\n/, ''));
			return '';
		});

const ligo = async (parsedArgs: Opts): Promise<void> => {
	const cmd = parsedArgs.command;
	return runArbitraryLigoCmd(parsedArgs, cmd).then(sendRes).catch(err => sendAsyncErr(err, false));
};

export default ligo;
