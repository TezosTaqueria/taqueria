#!/usr/bin/env node
import { spawn } from 'cross-spawn';
import fs from 'fs/promises';
import { readFile, stat } from 'fs/promises';
import path from 'path';
import yargs from 'yargs';

class CustomErr extends Error {}

class TaqNotFoundError extends CustomErr {
	public isCustomErr = true;
}

function isCustomError(err: unknown): err is Error {
	return typeof err === 'object' && (err as object).hasOwnProperty('isCustomErr');
}

async function checkTaqProject(dir: string) {
	try {
		const searchPath = path.join(dir, '.taq');
		await stat(searchPath);
		return searchPath;
	} catch {
		throw new TaqNotFoundError(`${dir} is not a valid Taqueria project.`);
	}
}

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

function getEnvName(filename: string, prefix = '') {
	return `${prefix}TAQ_${filename}`
		.replace('.json', '')
		.replace(/\./mg, '_')
		.replace(/\-/mg, '_')
		.toUpperCase();
}

class TaqConfigError extends CustomErr {}
async function getConfig(taqDir: string, prefix: string) {
	try {
		const files = await fs.readdir(taqDir);
		return files.reduce(
			async (retval, file) => {
				if (!file.endsWith('.json')) return (await retval);
				return {
					...(await retval),
					[getEnvName(file, prefix)]: await readFile(path.join(taqDir, file), 'utf-8'),
				};
			},
			Promise.resolve({}),
		);
	} catch {
		throw new TaqConfigError(
			`There was a problem reading the config files in ${taqDir}. Please check file permissions are try again.`,
		);
	}
}

function toCommandWithEnvVars(cmd: string, config: Record<string, string>) {
	return Object.entries(config).reduce(
		(retval, [key, value]) => {
			try {
				return `${key}=${btoa(value)} ${retval}`;
			} catch (err) {
				console.warn(`Could not set ${key}`);
				if (err instanceof DOMException) {
					console.warn('Check the contents of the associated file and ensure that it can be base64 encoded');
				}
				return retval;
			}
		},
		cmd,
	);
}

async function run(projectDir: string, prefix: string, cmd: string) {
	try {
		const taqDir = await checkTaqProject(projectDir);
		const config = await getConfig(taqDir, prefix);
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
