import { Option, Plugin, PositionalArg, Task, Template } from '@taqueria/node-sdk';
import { CustomRequestArgs, toRequestArgs } from './common';
import createContractTest from './contractTestTemplate';
import proxy from './proxy';

Plugin.create<CustomRequestArgs>(requestArgs => ({
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
					shortFlag: 't',
					description: 'Run test files that match the provided pattern',
				}),
			],
		}),
	],
	templates: [
		Template.create({
			template: 'contract-test',
			command: 'contract-test <michelsonArtifact>',
			positionals: [
				PositionalArg.create({
					placeholder: 'michelsonArtifact',
					description: 'Name of the michelson contract (artifact) to generate tests for',
					required: true,
					type: 'string',
				}),
			],
			options: [
				Option.create({
					flag: 'partition',
					description: 'Partition to place generated test suite',
					type: 'string',
					defaultValue: toRequestArgs(requestArgs).config.jest.testsRootDir,
				}),
			],
			description: 'Generate integration test for a contract',
			handler: createContractTest,
		}),
	],
	proxy,
}), process.argv);
