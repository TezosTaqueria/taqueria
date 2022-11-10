import { CmdArgEnv, getArch, sendAsyncErr, sendErr, sendRes, sendWarn, spawnCmd } from '@taqueria/node-sdk';
import { LIGO_DOCKER_IMAGE, LigoOpts as Opts } from './common';

const getArbitraryLigoCmd = (parsedArgs: Opts, userArgs: string): CmdArgEnv => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const binary = 'docker';
	const baseArgs = ['run', '--rm', '-v', `${projectDir}:/project`, '-w', '/project', LIGO_DOCKER_IMAGE];
	const processedUserArgs = userArgs.split(' ').map(arg => arg.startsWith('\\-') ? arg.substring(1) : arg).filter(arg =>
		arg
	);
	const args = baseArgs.concat(processedUserArgs);
	const envVars = { 'DOCKER_DEFAULT_PLATFORM': 'linux/amd64' };
	return [binary, args, envVars];
};

const runArbitraryLigoCmd = (parsedArgs: Opts, cmd: string): Promise<string> =>
	getArch()
		.then(() => getArbitraryLigoCmd(parsedArgs, cmd))
		.then(spawnCmd)
		.then(({ stdout, stderr }) => {
			if (stderr.length > 0) sendWarn(stderr);
			return stdout;
		})
		.catch(err => {
			sendErr(err.message.replace(/Command failed.+?\n/, ''));
			return '';
		});

const ligo = (parsedArgs: Opts): Promise<void> => {
	const cmd = parsedArgs.command;
	return runArbitraryLigoCmd(parsedArgs, cmd).then(sendRes).catch(err => sendAsyncErr(err, false));
};

export default ligo;
