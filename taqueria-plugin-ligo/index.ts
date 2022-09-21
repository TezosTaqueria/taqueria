import { Option, Plugin, PositionalArg, Task, Template } from '@taqueria/node-sdk';
import createContract from './createContract';
import ligo from './ligo';

Plugin.create(i18n => ({
	schema: '1.0',
	version: '0.1',
	alias: 'ligo',
	tasks: [
		Task.create({
			task: 'compile',
			command: 'compile <sourceFile>',
			aliases: ['c', 'compile-ligo'],
			description:
				'Compile a smart contract written in a LIGO syntax to Michelson code, along with its associated storages and parameters files if they are found',
			handler: 'proxy',
			encoding: 'json',
		}),
		Task.create({
			task: 'test',
			command: 'test <sourceFile>',
			description: 'Test a smart contract written in LIGO',
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
			options: [
				Option.create({
					shortFlag: 's',
					flag: 'syntax',
					type: 'string',
					description: 'The syntax used in the contract',
				}),
			],
			handler: createContract,
		}),
	],
	proxy: ligo,
}), process.argv);
