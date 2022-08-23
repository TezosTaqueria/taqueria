import { Option, Plugin, PositionalArg, Task } from '@taqueria/node-sdk';
import client from './client';

Plugin.create(i18n => ({
	alias: 'tezos-client',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'typecheck',
			command: 'typecheck [sourceFiles...]',
			aliases: ['tc'],
			description: 'Typecheck Michelson contracts',
			options: [
				Option.create({
					shortFlag: 's',
					flag: 'sandboxName',
					description: 'The name of the sandbox to use',
					required: false,
				}),
			],
			handler: 'proxy',
			positionals: [
				PositionalArg.create({
					placeholder: 'sourceFiles',
					description: 'The names of the Michelson contracts you wish to typecheck, separated by space',
				}),
			],
			encoding: 'json',
		}),
		Task.create({
			task: 'simulate',
			command: 'simulate <sourceFile> <input>',
			aliases: ['sim'],
			description: 'Run Michelson contracts as a simulation',
			options: [
				Option.create({
					flag: 'storage',
					description:
						'The initial storage used to run the script. The value is a Michelson expression, wrapped in single quotes if specified in the CLI, wrapped in double quotes instead if specified in config.json',
					required: false,
				}),
				Option.create({
					shortFlag: 's',
					flag: 'sandboxName',
					description: 'The name of the sandbox to use',
					required: false,
				}),
				Option.create({
					flag: 'entrypoint',
					description:
						'This makes contract invocation easier by specifying the annotation of an entrypoint (if it exists)',
					required: false,
				}),
			],
			handler: 'proxy',
			positionals: [
				PositionalArg.create({
					placeholder: 'sourceFile',
					description: 'The name of the Michelson contract you wish to simulate',
				}),
				PositionalArg.create({
					placeholder: 'input',
					description: 'The input used to run the script. The value is a Michelson expression wrapped in single quotes',
				}),
			],
			encoding: 'json',
		}),
	],
	proxy: client,
}), process.argv);
