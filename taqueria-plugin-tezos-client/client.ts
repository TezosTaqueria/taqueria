import { getArch, sendAsyncErr, sendRes, spawnCmd } from '@taqueria/node-sdk';
import { ClientOpts as Opts, getClientDockerImage } from './common';

const getArbitraryClientCmd = async (
	parsedArgs: Opts,
	userArgs: string,
): Promise<[string, Record<string, string>]> => {
	const projectDir = process.env.PROJECT_DIR ?? parsedArgs.projectDir;
	if (!projectDir) throw `No project directory provided`;
	const arch = await getArch();
	const flextesaImage = getClientDockerImage();
	const binary = 'docker';
	const baseArgs = [
		'run',
		'--rm',
		'-v',
		`${projectDir}:/project`,
		'-w',
		'/project',
		'--platform',
		arch,
		flextesaImage,
		'octez-client',
	];
	const processedUserArgs = userArgs.split(' ').map(arg => arg.startsWith('\\-') ? arg.substring(1) : arg).filter(arg =>
		arg
	);
	const args = baseArgs.concat(processedUserArgs);
	const envVars = {};
	return [
		[binary, ...args].join(' '),
		envVars,
	];
};

const runArbitraryClientCmd = (parsedArgs: Opts, cmd: string): Promise<string> =>
	getArbitraryClientCmd(parsedArgs, cmd)
		.then(([cmd, envVars]) => spawnCmd(cmd, envVars))
		.then(code =>
			code !== null && code === 0
				? `Command "${cmd}" ran successfully by octez-client`
				: `Command "${cmd}" failed. Please check your command`
		)
		.catch(err => sendAsyncErr(`An internal error has occurred: ${err.message}`));

const client = (parsedArgs: Opts): Promise<void> => {
	const args = parsedArgs.command;
	return runArbitraryClientCmd(parsedArgs, args).then(sendRes).catch(err => sendAsyncErr(err, false));
};

export default client;
