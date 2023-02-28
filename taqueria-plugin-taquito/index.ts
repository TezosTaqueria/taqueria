import { Option, Plugin, Task } from '@taqueria/node-sdk';
import main from './main';

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
				Option.create({
					flag: 'sender',
					description: 'Name of an instantiated account to use as the sender of the originate operation',
					required: false,
				}),
				Option.create({
					flag: 'mutez',
					description: 'Amount of Mutez to transfer',
					required: false,
				}),
				Option.create({
					flag: 'timeout',
					shortFlag: 't',
					defaultValue: 40,
					description: 'Number of retry attempts (to avoid congestion and network failures)',
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
					flag: 'mutez',
					description: 'Amount of Mutez to transfer',
					required: false,
				}),
				Option.create({
					flag: 'param',
					description:
						'Name of the parameter file that contains the parameter value as a Michelson expression, in the artifacts directory, used for invoking a deployed contract',
					required: false,
				}),
				Option.create({
					flag: 'entrypoint',
					description:
						'You may explicitly specify an entrypoint to make the parameter value shorter, without having to specify a chain of (Left (Right ... 14 ...))',
					required: false,
				}),
				Option.create({
					flag: 'sender',
					description: 'Name of an instantiated account to use as the sender of the transfer operation',
					required: false,
				}),
				Option.create({
					flag: 'timeout',
					shortFlag: 't',
					defaultValue: 40,
					description: 'Number of retry attempts (to avoid congestion and network failures)',
					required: false,
				}),
			],
			aliases: ['call'],
			handler: 'proxy',
			encoding: 'application/json',
		}),
		Task.create({
			task: 'fund',
			command: 'fund',
			description: 'Fund all the instantiated accounts up to the desired/declared amount in a target environment',
			handler: 'proxy',
			encoding: 'application/json',
			options: [
				Option.create({
					flag: 'timeout',
					shortFlag: 't',
					defaultValue: 40,
					description: 'Number of retry attempts (to avoid congestion and network failures)',
					required: false,
				}),
			],
		}),
		Task.create({
			task: 'instantiate-account',
			command: 'instantiate-account',
			description:
				'Instantiate all accounts declared in the "accounts" field at the root level of the config file to a target environment',
			handler: 'proxy',
			encoding: 'application/json',
		}),
	],
	proxy: main,
}), process.argv);
