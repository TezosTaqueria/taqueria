import { sendAsyncErr, sendRes } from '@taqueria/node-sdk';
import { ClientOpts as Opts, execOctezClient } from './common';

const runArbitraryClientCmd = (parsedArgs: Opts, cmd: string): Promise<string> =>
	execOctezClient(cmd, parsedArgs.projectDir)
		.then(() => `Command "${cmd}" ran successfully by octez-client`)
		.catch(err => sendAsyncErr(`An internal error has occurred: ${err.message}`));

const client = (parsedArgs: Opts): Promise<void> => {
	const args = parsedArgs.command;
	return runArbitraryClientCmd(parsedArgs, args)
		.then(sendRes)
		.catch(err => sendAsyncErr(err, false));
};

export default client;
