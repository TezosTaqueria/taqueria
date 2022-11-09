import { execCmd, getArch, getFlextesaImage, sendAsyncErr, sendErr, sendRes, sendWarn } from '@taqueria/node-sdk';
import { writeFile } from 'fs/promises';
import { ClientOpts as Opts } from './common';

const MAX_OUTPUT_LIMIT = 50000;

const getArbitraryClientCmd = async (parsedArgs: Opts, cmd: string): Promise<string> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const arch = await getArch();
	const flextesaImage = await getFlextesaImage(arch);
	const baseCmd =
		`docker run --rm -v \"${projectDir}\":/project -w /project --platform ${arch} ${flextesaImage} octez-client`;
	return `${baseCmd} ${cmd}`;
};

const runArbitraryClientCmd = (parsedArgs: Opts, cmd: string): Promise<string> =>
	getArbitraryClientCmd(parsedArgs, cmd)
		.then(execCmd)
		.then(async ({ stdout, stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
			if (stdout.length >= MAX_OUTPUT_LIMIT) {
				const outputFile = './octez-client.output';
				sendWarn(
					`The output of the underlying Octez Client binary is too big so we are dumping it to "${outputFile}" instead of displaying it here in the console`,
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

const client = async (parsedArgs: Opts): Promise<void> => {
	const cmd = parsedArgs.command;
	return runArbitraryClientCmd(parsedArgs, cmd).then(sendRes).catch(err => sendAsyncErr(err, false));
};

export default client;
