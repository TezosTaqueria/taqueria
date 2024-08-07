import { Option, Plugin, Task } from '@taqueria/node-sdk';
import main from './main';

Plugin.create(i18n => ({
	alias: 'smartpy',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'compile',
			command: 'compile <sourceFile>',
			aliases: ['c', 'compile-smartpy'],
			description:
				'Compile a smart contract written in a SmartPy syntax to Michelson code, along with its associated storage values, per compilation targets, and some expressions per expression compilation targets',
			handler: 'proxy',
			encoding: 'json',
		}),
		Task.create({
			task: 'compile-all',
			command: 'compile-all',
			description:
				'Compile all SmartPy smart contracts with at least one SmartPy compilation target to Michelson code, along with their associated storage values, per compilation targets, and some expressions per expression compilation targets',
			handler: 'proxy',
			encoding: 'json',
		}),
		Task.create({
			task: 'test',
			command: 'test <sourceFile>',
			description: 'Test a smart contract written in SmartPy',
			handler: 'proxy',
			encoding: 'json',
		}),
	],
	proxy: main,
	postInstall: `node ${__dirname}/postinstall.js`,
}), process.argv);
