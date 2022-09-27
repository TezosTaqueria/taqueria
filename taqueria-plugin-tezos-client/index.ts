import { Option, Plugin, PositionalArg, Task } from '@taqueria/node-sdk';
import client from './client';

Plugin.create(i18n => ({
	alias: 'tezos-client',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'typecheck',
			command: 'typecheck <sourceFile>',
			aliases: ['tc'],
			description: 'Typecheck a Michelson contract',
			handler: 'proxy',
			positionals: [
				PositionalArg.create({
					placeholder: 'sourceFile',
					description: 'The name of the Michelson contract you wish to typecheck',
				}),
			],
			encoding: 'json',
		}),
		Task.create({
			task: 'simulate',
			command: 'simulate <sourceFile>',
			aliases: ['sim'],
			description: 'Run a Michelson contract as a simulation',
			options: [
				Option.create({
					flag: 'storage',
					description:
						'Name of the storage file that contains the storage value as a Michelson expression, in the artifacts directory, used for originating a contract',
					required: false,
				}),
				Option.create({
					flag: 'param',
					description:
						'Name of the parameter file that contains the parameter value as a Michelson expression, in the artifacts directory, used for invoking a deployed contract',
					required: true,
				}),
				Option.create({
					flag: 'entrypoint',
					description:
						'You may explicitly specify an entrypoint to make the parameter value shorter, without having to specify a chain of (Left (Right ... 14 ...))',
					required: false,
				}),
			],
			handler: 'proxy',
			positionals: [
				PositionalArg.create({
					placeholder: 'sourceFile',
					description: 'The name of the Michelson contract you wish to simulate',
				}),
			],
			encoding: 'json',
		}),
	],
	proxy: client,
}), process.argv);
