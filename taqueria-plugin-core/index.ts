import { Plugin, Task } from '@taqueria/node-sdk';
import core from './core';

Plugin.create(_i18n => ({
	alias: 'core',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'clean',
			command: 'clean',
			description: 'Clean all the Taqueria-related docker images',
			handler: 'proxy',
			encoding: 'application/json',
		}),
	],
	proxy: core,
}), process.argv);
