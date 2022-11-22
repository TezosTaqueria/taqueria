import { Option, Plugin, PositionalArg, Task, Template } from '@taqueria/node-sdk';
import createContract from './createContract';
import main from './main';

Plugin.create(i18n => ({
	schema: '1.0',
	version: '0.1',
	alias: 'ligo',
	tasks: [
		Task.create({
			task: 'ligo',
			command: 'ligo',
			description:
				'This task allows you to run arbitrary LIGO native commands. Note that they might not benefit from the abstractions provided by Taqueria',
			options: [
				Option.create({
					shortFlag: 'c',
					flag: 'command',
					type: 'string',
					description: 'The command to be passed to the underlying LIGO binary, wrapped in quotes',
					required: true,
				}),
			],
			handler: 'proxy',
			encoding: 'none',
		}),
		Task.create({
			task: 'compile',
			command: 'compile <sourceFile>',
			aliases: ['c', 'compile-ligo'],
			description:
				'Compile a smart contract written in a LIGO syntax to Michelson code, along with its associated storage/parameter list files if they are found',
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
		Task.create({
			task: 'get-image',
			command: 'get-image',
			description: 'Gets the name of the image to be used',
			handler: 'proxy',
			hidden: true,
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
	proxy: main,
}), process.argv);
