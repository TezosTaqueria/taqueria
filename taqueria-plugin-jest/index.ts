import { Option, Plugin, PositionalArg, Task, Template } from '@taqueria/node-sdk';
import contractTemplateHandler from './contract-template';
import proxy from './proxy';

Plugin.create(() => ({
	schema: '0.1',
	version: '0.4.0',
	alias: 'jest',
	tasks: [
		Task.create({
			task: 'test',
			command: 'test [partition]',
			description: 'Setup a directory as a partition to run Jest tests',
			aliases: ['jest'],
			handler: 'proxy',
			positionals: [
				PositionalArg.create({
					placeholder: 'partition',
					description: 'Name of the partition for these tests',
					defaultValue: 'tests',
					type: 'string',
				}),
			],
			options: [
				Option.create({
					flag: 'init',
					shortFlag: 'i',
					description: 'Initializes the partition for Jest',
					boolean: true,
				}),
				Option.create({
					flag: 'testPattern',
					description: 'Run test files that match the provided pattern',
					boolean: true,
				}),
			],
		}),
	],
	templates: [
		Template.create({
			command: 'test-suite <contractName>',
			template: 'test-suite',
			description: 'Generate a test suite for a contract',
			handler: contractTemplateHandler,
			options: [
				Option.create({
					flag: 'partition',
					description: 'The partition to create the test within',
				}),
				Option.create({
					shortFlag: 'o',
					flag: 'output',
					description: 'The output filename',
				}),
			],
		}),
	],
	proxy,
}), process.argv);
