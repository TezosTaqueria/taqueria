import { Option, Plugin, Task } from '@taqueria/node-sdk';
import originate from './originate';

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
	],
	proxy: originate,
}), process.argv);
