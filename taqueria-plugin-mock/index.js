const { Plugin, Task, Option, PositionalArg, Operation, Template, sendAsyncRes, sendAsyncJsonRes, experimental } =
	require(
		'@taqueria/node-sdk',
	);
const { join } = require('path');
const { writeFile } = require('fs/promises');

const tableResponse = JSON.stringify({
	render: 'table',
	data: [{ ping: 'pong' }],
});

// If the CLI has requested an invalid-schema, then we modify
// the schema to make it invalid
const processArgs = (() => {
	if (!process.argv.includes('--invalidSchema')) return process.argv;
	const configIndex = process.argv.indexOf('--config') + 1;
	const json = JSON.parse(process.argv[configIndex]);
	json.accounts.secretKey = 'my secret key';
	json.accounts.privateKey = 'my private key';
	process.argv[configIndex] = JSON.stringify(json);
	return process.argv;
})();

Plugin.create(i18n => ({
	schema: '1.0',
	version: '0.1',
	alias: 'mock',
	tasks: [
		Task.create({
			task: 'proxy',
			command: 'proxy',
			aliases: ['ping'],
			description: 'Return predefined result for CLI integration testing',
			options: [
				Option.create({
					shortFlag: 'e',
					flag: 'error',
					description: 'Forces the task to return an error.',
					boolean: true,
				}),
			],
			handler: 'proxy',
		}),
		Task.create({
			task: 'proxy-json',
			command: 'proxy-json',
			description: 'Gets a JSON response from a plugin and outputs a string',
			options: [
				Option.create({
					shortFlag: 'r',
					flag: 'return',
					description: 'Return either a string or object in the JSON response',
					choices: [
						'string',
						'object',
					],
					required: true,
				}),
				Option.create({
					shortFlag: 'e',
					flag: 'error',
					description: 'Forces the task to return an error.',
				}),
			],
			handler: 'proxy',
			encoding: 'json',
		}),
		Task.create({
			task: 'without-proxy',
			command: 'without-proxy',
			description: 'Tests handling a task without proxy',
			options: [
				Option.create({
					shortFlag: 'e',
					flag: 'error',
					description: 'Forces the task to return an error.',
				}),
			],
			handler: 'echo pong',
		}),
		Task.create({
			task: 'json-without-proxy',
			command: 'json-without-proxy',
			description: 'Tests handling a task that returns JSON without proxy',
			options: [
				Option.create({
					shortFlag: 'r',
					flag: 'return',
					description: 'Return either a string or object in the JSON response',
					choices: [
						'string',
						'object',
					],
					required: true,
				}),
				Option.create({
					shortFlag: 'o',
					flag: 'object',
					description: 'Render object in table encoded in JSON response',
				}),
			],
			encoding: 'application/json',
			handler: `echo '<% if (it.return == 'object') { %>${tableResponse}<% } else %><%= "pong" %>'`,
		}),
		Task.create({
			task: 'testRegisterContract',
			command: 'testRegisterContract <sourceFile>',
			description: 'Tests handling a task that registers a contract',
			encoding: 'application/json',
			handler: 'proxy',
		}),
	],
	templates: [
		Template.create({
			template: 'json',
			command: 'json <filename>',
			description: 'Creates a JSON artifact using proxy handler',
			positionals: [
				PositionalArg.create({
					placeholder: 'filename',
					type: 'string',
					required: true,
					description: 'The name of the filename to generate',
				}),
			],
			options: [
				Option.create({
					shortFlag: 'g',
					flag: 'greeting',
					type: 'string',
					description: 'Greeting to include in JSON file',
				}),
			],
			handler: async requestArgs => {
				await writeFile(
					join(requestArgs.projectDir, requestArgs.config.artifactsDir, requestArgs.filename),
					JSON.stringify({
						greeting: `Hello, ${requestArgs.greeting ?? 'Tester'}!`,
					}),
					'utf8',
				);
				return sendAsyncJsonRes('Your wish is my command!');
			},
			encoding: 'json',
		}),
		Template.create({
			template: 'text',
			command: 'text <filename>',
			description: 'Creates a textfile artifact using shell command',
			positionals: [
				PositionalArg.create({
					placeholder: 'filename',
					type: 'string',
					required: true,
					description: 'The name of the filename to generate',
				}),
			],
			options: [
				Option.create({
					shortFlag: 'g',
					flag: 'greeting',
					type: 'string',
					description: 'Greeting to include in text file',
				}),
			],
			handler: `
<%
var greeting = it.greeting ?? "Tester!";
var outputFile = it.joinPaths(it.projectDir, it.config.artifactsDir, it.filename);
%>
echo 'Hi there, <%= greeting %>!' ><%= outputFile %>
`,
		}),
	],
	proxy: parsedArgs => {
		if (parsedArgs.task) {
			switch (parsedArgs.task) {
				case 'proxy':
				case 'ping':
					return parsedArgs.error
						? Promise.reject('error')
						: sendAsyncRes('pong', false);
					break;
				case 'proxy-json':
					return parsedArgs.error
						? sendAsyncErr('error')
						: sendAsyncJsonRes(
							parsedArgs.return === 'object'
								? [{ 'ping': 'pong' }]
								: 'pong',
						);
					break;
				case 'testRegisterContract':
					return experimental.registerContract(parsedArgs, parsedArgs.sourceFile);
				default:
					return sendAsyncErr('Non-expected task');
			}
		} else if (parsedArgs.template) {
			switch (parsedArgs.template) {
				case 'json':
					return;
			}
		}
	},
}), processArgs);
