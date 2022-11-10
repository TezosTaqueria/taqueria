import {
	CmdArgEnv,
	getArch,
	getFlextesaImage,
	sendAsyncErr,
	sendErr,
	sendRes,
	sendWarn,
	spawnCmd,
} from '@taqueria/node-sdk';
import { ClientOpts as Opts } from './common';

const getArbitraryClientCmd = async (
	parsedArgs: Opts,
	userArgs: string,
): Promise<CmdArgEnv> => {
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
		arch,
		flextesaImage,
		'octez-client',
	];
	const processedUserArgs = userArgs.split(' ').map(arg => arg.startsWith('\\-') ? arg.substring(1) : arg).filter(arg =>
		arg
	);
	const args = baseArgs.concat(processedUserArgs);
	const envVars = {};
	return [binary, args, envVars];
};

const runArbitraryClientCmd = (parsedArgs: Opts, cmd: string): Promise<string> =>
	getArbitraryClientCmd(parsedArgs, cmd)
		.then(spawnCmd)
		.then(() => `Command "${cmd}" ran successfully by octez-client`)
		.catch(() => `Command "${cmd}" didn't run successfully by octez-client`);

const client = (parsedArgs: Opts): Promise<void> => {
	const args = parsedArgs.command;
	return runArbitraryClientCmd(parsedArgs, args).then(sendRes).catch(err => sendAsyncErr(err, false));
};

export default client;
