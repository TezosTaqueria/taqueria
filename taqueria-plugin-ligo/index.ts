import { Option, Plugin, PositionalArg, Task, Template } from '@taqueria/node-sdk';
import compile from './compile';
import createContract from './createContract';

Plugin.create(i18n => ({
	schema: '1.0',
	version: '0.1',
	alias: 'ligo',
	tasks: [
		Task.create({
			task: 'compile',
			command: 'compile [sourceFile]',
			aliases: ['c', 'compile-ligo'],
			description: 'Compile a smart contract written in a Ligo syntax to Michelson code',
			options: [
				Option.create({
					shortFlag: 'e',
					flag: 'entrypoint',
					description: 'The entry point that will be compiled',
				}),
				Option.create({
					shortFlag: 's',
					flag: 'syntax',
					description: 'The syntax used in the contract',
				}),
				Option.create({
					shortFlag: 'i',
					flag: 'infer',
					description: 'Enable type inference',
				}),
			],
			handler: 'proxy',
			encoding: 'json',
		}),
	],
	templates: [
		Template.create({
			template: 'contract',
			command: 'contract <sourceFileName>',
			description: 'Create a LIGO contract with boilerplate code',
			positionals: [
				PositionalArg.create({
					placeholder: 'sourceFileName',
					type: 'string',
					description: 'The name of the LIGO contract to generate',
				}),
			],
			handler: createContract,
		}),
	],
	proxy: compile,
}), process.argv);
