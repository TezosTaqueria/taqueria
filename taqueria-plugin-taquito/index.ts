import { Option, Plugin, Task } from '@taqueria/node-sdk';
import taquito from './taquito';

Plugin.create(_i18n => ({
	alias: 'taquito',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'deploy',
			command: 'deploy <contract>',
			description: 'Deploy a smart contract to a particular environment',
			options: [
				Option.create({
					flag: 'alias',
					description: "Alias used to refer to the deployed contract's address",
					required: false,
				}),
				Option.create({
					flag: 'storage',
					description:
						'Name of the storage file that contains the storage value as a Michelson expression, in the artifacts directory, used for originating a contract',
					required: false,
				}),
			],
			aliases: ['originate'],
			handler: 'proxy',
			encoding: 'application/json',
		}),
		Task.create({
			task: 'transfer',
			command: 'transfer <contract>',
			description:
				'Transfer/call an implicit account or a smart contract (specified via its alias or address) deployed to a particular environment',
			options: [
				Option.create({
					flag: 'tez',
					description: 'Amount of Tez to transfer',
					required: false,
				}),
				Option.create({
					flag: 'param',
					description: 'Parameter to invoke the smart contract',
					required: false,
				}),
				Option.create({
					flag: 'entrypoint',
					description:
						'You may explicitly specify an entrypoint to make the parameter value shorter, without having to specify a chain of (Left (Right ... 14 ...))',
					required: false,
				}),
			],
			aliases: ['call'],
			handler: 'proxy',
			encoding: 'application/json',
		}),
	],
	proxy: taquito,
}), process.argv);
