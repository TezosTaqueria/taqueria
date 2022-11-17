import { Option, Plugin, PositionalArg, Task, Template } from '@taqueria/node-sdk';
import compile from './compile';
import createContract from './createContract';

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
			template: 'archetypeContract',
			command: 'archetypeContract <sourceFileName>',
			description: 'Create a Archetype contract with boilerplate code',
			positionals: [
				PositionalArg.create({
					placeholder: 'sourceFileName',
					type: 'string',
					description: 'The name of the Archetype contract to generate',
				}),
			],
			handler: createContract,
		}),
	],
	proxy: compile,
}), process.argv);
