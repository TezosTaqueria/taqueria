import { Option, Plugin, PositionalArg, Task } from '@taqueria/node-sdk';
import proxy from './proxy';

Plugin.create(_i18n => ({
	alias: 'tezbox',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'start sandbox',
			command: 'start sandbox',
			aliases: ['start tezbox'],
			description: 'Starts a TezBox sandbox',
			options: [],
			handler: 'proxy',
			encoding: 'none',
		}),
		Task.create({
			task: 'stop sandbox',
			command: 'stop sandbox',
			aliases: ['stop tezbox'],
			description: 'Stops a TezBox sandbox',
			options: [],
			handler: 'proxy',
		}),
		Task.create({
			task: 'restart sandbox',
			command: 'restart sandbox',
			aliases: ['restart tezbox'],
			description: 'Restarts a TezBox sandbox',
			options: [],
			handler: 'proxy',
		}),
		Task.create({
			task: 'list accounts',
			command: 'list accounts',
			aliases: [],
			description: 'List the balances of all sandbox accounts',
			options: [],
			handler: 'proxy',
			encoding: 'json',
		}),
		Task.create({
			task: 'bake',
			command: 'bake',
			aliases: ['b'],
			description: 'Manually bake a block. Use when the "baking" setting of a TezBox sandbox is set to "disabled".',
			options: [
				Option.create({
					flag: 'watch',
					shortFlag: 'w',
					description:
						'Watch for operations as they are injected into the mempool and bake them as immediate as possible.',
					boolean: true,
				}),
			],
			handler: 'proxy',
			encoding: 'none',
		}),
		Task.create({
			task: 'show protocols',
			command: 'show protocols',
			aliases: ['list protocols'],
			description: 'List protocols understood by this version of TezBox',
			options: [],
			handler: 'proxy',
			encoding: 'json',
		}),
	],
	proxy: proxy,
}), process.argv);
