import { Option, Plugin, PositionalArg, Task } from '@taqueria/node-sdk';
import proxy from './proxy';

Plugin.create(_ => ({
	alias: 'tzcompose',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'run',
			command: 'run <scriptPath>',
			aliases: [],
			description: 'Runs a script using tzcompose',
			options: [
				Option.create({
					flag: 'verbosity',
					shortFlag: 'v',
					description: 'Verbose level (1-3)',
					type: 'number',
				}),
			],
			positionals: [
				PositionalArg.create({
					description: 'The path of the script to run using TzCompose',
					required: true,
					type: 'string',
					placeholder: 'scriptPath',
				}),
			],
			handler: 'proxy',
			encoding: 'none',
		}),
	],
	proxy,
}), process.argv);
