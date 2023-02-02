#!/usr/bin/env node
import { spawn } from 'cross-spawn';
import path from 'path';
import yargs from 'yargs';
import { checkTaqProject, getEncodedConfig, isCustomError } from '../lib/env';

function withArguments(cliArgs: string[], fn: (projectDir: string, prefix: string, cmd: string) => Promise<void>) {
	if (cliArgs[0].endsWith('node')) cliArgs.shift();

	const script = cliArgs.shift();

	const parsedArgs = yargs(cliArgs)
		.option('projectDir', {
			alias: 'p',
			type: 'string',
			requiresArg: true,
		})
		.option('prefix', {
			type: 'string',
			requiresArg: true,
			default: '',
		})
		.global(['projectDir'])
		.parseSync();

	if (parsedArgs._.length > 0 && parsedArgs.projectDir) {
		fn(parsedArgs.projectDir, parsedArgs.prefix, parsedArgs._.join(' '));
	} else console.log(`Usage: ${script} --projectDir <projectDir> [--prefix <prefix>] <command>`);
}

function toCommandWithEnvVars(cmd: string, config: Record<string, string>) {
	return Object.entries(config).reduce(
		(retval, [key, value]) => {
			try {
				return `${key}=${value} ${retval}`;
			} catch (err) {
				console.warn(`Could not set ${key}`);
				console.warn('Check the contents of the associated file and ensure that it can be Base64 encoded.');
				return retval;
			}
		},
		cmd,
	);
}

async function run(projectDir: string, prefix: string, cmd: string) {
	try {
		const taqDir = await checkTaqProject(projectDir);
		const config = await getEncodedConfig(taqDir, prefix);
		const cmdWithEnvVars = toCommandWithEnvVars(cmd, config);

		spawn(cmdWithEnvVars, {
			shell: true,
			stdio: 'inherit',
		});
	} catch (err) {
		if (isCustomError(err)) {
			console.error(err.message);
			return;
		}
		throw err;
	}
}

withArguments(process.argv, run);
