import { Option, Plugin, PositionalArg, Task } from '@taqueria/node-sdk';
import proxy from './src/proxy';

Plugin.create(() => ({
	schema: '0.1',
	version: '0.4.0',
	alias: 'pinata',
	tasks: [
		Task.create({
			task: 'publish',
			command: 'publish [path]',
			description: 'Upload and pin files using your pinata account.',
			aliases: [],
			handler: 'proxy',
			positionals: [
				PositionalArg.create({
					placeholder: 'path',
					description: 'Directory or file path to publish',
					type: 'string',
				}),
			],
			encoding: 'json',
		}),
		Task.create({
			task: 'pin',
			command: 'pin [hash]',
			description: 'Pin a file already on ipfs with your pinata account.',
			aliases: [],
			handler: 'proxy',
			positionals: [
				PositionalArg.create({
					placeholder: 'hash',
					description: 'Ipfs hash of the file or directory that is already on the ipfs network.',
					type: 'string',
				}),
			],
		}),
	],
	proxy,
}), process.argv);
