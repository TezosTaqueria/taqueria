import { Option, Plugin, Task } from '@taqueria/node-sdk';

Plugin.create(_ => ({
	alias: 'helloworld',
	schema: '1.0',
	version: '0.1',
	tasks: [
		Task.create({
			task: 'hello',
			command: 'hello',
			aliases: [],
			description: 'Hello World!',
			options: [
				Option.create({
					flag: 'name',
					shortFlag: 'n',
					description: 'Your name',
					type: 'string',
					defaultValue: 'world!',
				}),
			],
			handler: "echo 'Hello <%= it.name %>'",
			encoding: 'none',
		}),
	],
}), process.argv);
