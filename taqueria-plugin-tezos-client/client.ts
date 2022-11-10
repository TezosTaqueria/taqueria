import { getArch, getFlextesaImage, sendAsyncErr, sendErr, sendRes, sendWarn, spawnCmd } from '@taqueria/node-sdk';
import { ClientOpts as Opts } from './common';

const getArbitraryClientCmd = async (
	parsedArgs: Opts,
	cmd: string,
): Promise<[string, string[], { [key: string]: string }]> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const arch = await getArch();
	const flextesaImage = await getFlextesaImage(arch);
	const binary = 'docker';
	const baseArgs = [
		'run',
		'--rm',
		'-v',
		`${projectDir}:/project`,
		'-w',
		'/project',
		'--platform',
		`${arch}`,
		`${flextesaImage}`,
		'octez-client',
	];
	const args = baseArgs.concat(cmd.split(' ').map(arg => arg.startsWith('\\-') ? arg.substring(1) : arg));
	const envVars = {};
	return [binary, args, envVars];
};

const runArbitraryClientCmd = (parsedArgs: Opts, cmd: string): Promise<string> =>
	getArbitraryClientCmd(parsedArgs, cmd)
		.then(spawnCmd)
		.then(async ({ stdout, stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
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
