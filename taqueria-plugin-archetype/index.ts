import { Option, Plugin, Task } from '@taqueria/node-sdk';
import compile from './compile';

Plugin.create(i18n => ({
	schema: '1.0',
	version: '0.1',
	alias: 'archetype',
	tasks: [
		Task.create({
			task: 'compile',
			command: 'compile [sourceFile]',
			aliases: ['c', 'compile-archetype'],
			description: 'Compile a smart contract written in a Archetype syntax to Michelson code',
			options: [],
			handler: 'proxy',
			encoding: 'json',
		}),
	],
	proxy: compile,
}), process.argv);
