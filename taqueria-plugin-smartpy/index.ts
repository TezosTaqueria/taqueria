import { Option, Plugin, Task } from '@taqueria/node-sdk';
import compile from './compile';

Plugin.create(i18n => ({
	alias: 'smartpy',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'compile',
			command: 'compile [sourceFile]',
			aliases: ['c', 'compile-smartpy'],
			description: 'Compile a smart contract written in a SmartPy syntax to Michelson code',
			options: [],
			handler: 'proxy',
			encoding: 'json',
		}),
	],
	proxy: compile,
}), process.argv);
