import { CmdArgEnv, getArch, sendAsyncErr, sendRes, spawnCmd } from '@taqueria/node-sdk';
import { getLigoDockerImage, LigoOpts as Opts } from './common';

const getArbitraryLigoCmd = (parsedArgs: Opts, userArgs: string): CmdArgEnv => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const binary = 'docker';
	const baseArgs = ['run', '--rm', '-v', `${projectDir}:/project`, '-w', '/project', getLigoDockerImage()];
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
		.then(code =>
			code !== null && code === 0
				? `Command "${cmd}" ran successfully by LIGO`
				: `Command "${cmd}" failed. Please check your command`
		)
		.catch(err => sendAsyncErr(`An internal error has occurred: ${err.message}`));

const ligo = (parsedArgs: Opts): Promise<void> => {
	const args = parsedArgs.command;
	return runArbitraryLigoCmd(parsedArgs, args).then(sendRes).catch(err => sendAsyncErr(err, false));
};

export default ligo;
