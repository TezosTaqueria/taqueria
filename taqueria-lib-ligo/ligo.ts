import { sendAsyncErr, sendRes, spawnCmd } from '@taqueria/node-sdk';
import { Common, LigoOpts as Opts } from './common';

const getArbitraryLigoCmd = (
	commonObj: Common,
	parsedArgs: Opts,
	userArgs: string,
): [string, Record<string, string>] => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;

	const processedUserArgs = userArgs
		.split(' ')
		.map(arg => (arg.startsWith('\\-') ? arg.substring(1) : arg))
		.filter(arg => arg);

	const cmd = `${commonObj.baseDriverCmd(projectDir)} ${processedUserArgs.join(' ')}`;

	const envVars = { DOCKER_DEFAULT_PLATFORM: 'linux/amd64' };
	return [cmd, envVars];
};

const runArbitraryLigoCmd = (
	commonObj: Common,
	parsedArgs: Opts,
	userCmd: string,
): Promise<string> => {
	let [cmd, envVars] = getArbitraryLigoCmd(commonObj, parsedArgs, userCmd);
	return spawnCmd(cmd, envVars)
		.then(code =>
			code !== null && code === 0
				? `Command "${cmd}" ran successfully by LIGO`
				: `Command "${cmd}" failed. Please check your command`
		)
		.catch(err => sendAsyncErr(`An internal error has occurred: ${err.message}`));
};

const ligo = (commonObj: Common, parsedArgs: Opts): Promise<void> => {
	const args = parsedArgs.command;
	return runArbitraryLigoCmd(commonObj, parsedArgs, args)
		.then(sendRes)
		.catch(err => sendAsyncErr(err, false));
};

export default ligo;
