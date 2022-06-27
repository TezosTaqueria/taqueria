import { chain, chainRej, map } from 'fluture';
import { camelCase } from 'https://deno.land/x/case@2.1.1/mod.ts';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import {
	EphemeralState,
	LoadedConfig,
	PluginInfo,
	SanitizedAbsPath,
	Task,
} from './taqueria-protocol/taqueria-protocol-types.ts';
import * as utils from './taqueria-utils/taqueria-utils.ts';
// Get utils
const {
	joinPaths,
	writeTextFile,
	doesPathExist,
} = utils.inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

const toInterfaceName = (value: string) =>
	pipe(
		value
			.replace('@', '')
			.replace('-', '_')
			.replace('/', '_')
			.replace(/\s+/, '_')
			.replace('__', '_'),
		camelCase,
	);

const toTasksInterface = (pluginName: string) =>
	(task: Task.t): [string, string, string] => {
		const interfaceName = toInterfaceName(`${pluginName}_${task.task}`);
		const positionals = task.positionals
			? task.positionals!.reduce(
				(retval, positional) => {
					const key = positional.required
						? positional.placeholder
						: `${positional.placeholder}?`;

					const defaultValue = positional.defaultValue !== undefined
						? (positional.type === 'string' ? `'${positional.defaultValue}'` : positional.defaultValue)
						: undefined;

					const value = defaultValue !== undefined
						? positional.type
						: `${defaultValue} | ${positional.type}`;

					return [...retval, `${key}: ${value}`];
				},
				[] as string[],
			)
			: [];
		const options = task.options
			? task.options!.reduce(
				(retval, option) => {
					const key = option.required
						? option.flag
						: `${option.flag}?`;

					const choices = option.choices
						? (
							option.type === 'string'
								? option.choices.map(val => `"${val}"`).join(' | ')
								: option.choices.join(' | ')
						)
						: option.type;

					const value = option.defaultValue !== undefined
						? `${option.defaultValue} | ${choices}`
						: option.type;

					return [...retval, `${key}: ${value}`];
				},
				[] as string[],
			)
			: [];

		return [
			task.task,
			interfaceName,
			`
	export interface ${interfaceName} {
	${positionals.join('\n')}
	${options.join('\n')}
	}
	`,
		];
	};

const toPluginInterface = (plugin: PluginInfo.t): [string, string, string, string] => {
	const tasks = plugin.tasks
		? plugin.tasks!.map(toTasksInterface(plugin.name))
		: [];

	const interfaceName = toInterfaceName(plugin.name);

	const output = [
		...tasks.map(([_, __, taskInterface]) => taskInterface),
		`export interface ${interfaceName} {`,
		...tasks.map(([taskName, taskInterfaceName, _]) => `${toInterfaceName(taskName)}: ${taskInterfaceName}`),
		'}',
	];

	return [
		plugin.alias,
		`'${plugin.name}'`,
		interfaceName,
		output.join('\n'),
	];
};

const toEnvInterface = (envName: string): [string, string, string] => [
	toInterfaceName(envName),
	`import ${envName}_state from "./${envName}-state.json" assert {type: "json"}`,
	`export type ${toInterfaceName(envName)} = typeof ${envName}_state`,
];

export const createProvisionerTypes = (config: LoadedConfig.t) =>
	(state: EphemeralState.t) => {
		const plugins = state.plugins.map(toPluginInterface);

		const configs = config.environment
			? Object.keys(config.environment).filter(key => key !== 'default').map(toEnvInterface)
			: [toEnvInterface('development')];

		const config_imports = configs.map(([_, configImport]) => configImport);

		const configInterfaces = configs.map(([_, __, configInterface]) => configInterface);

		const configInterfaceNames = configs.map(([configInterfaceName]) => configInterfaceName);

		const output = [
			config_imports.join('\n'),
			`
declare global {
${configInterfaces.join('\n')}

export type RawState = ${configInterfaceNames.join(' | ')}

export interface State {
raw: RawState
}

export type ID = string

export interface Provision {
readonly id: ID
after: ID[]
when: (fn: (state: State) => boolean) => Provision
task: (fn: (state: State) => unknown) => Provision
}

export function provision(id: ID): Provision
`,
			...plugins.map(([_, __, ___, pluginInterface]) => pluginInterface),
			`export interface Tasks {`,
			...plugins.map(([pluginAlias, pluginName, pluginInterfaceName, _]) => `
${pluginAlias}: ${pluginInterfaceName}
${pluginName}: ${pluginInterfaceName}
`),
			'}',
			'export const tasks: Tasks',
			`}`,
		];

		return pipe(
			output.join('\n'),
			writeTextFile(joinPaths(config.projectDir, '.taq', 'provisioner.d.ts')),
			map(_ => state),
		);
	};

export const getProvisionerAbspath = (projectAbsPath: SanitizedAbsPath.t) =>
	joinPaths(projectAbsPath, '.taq', 'provisioner.ts');

export const createProvisioner = (config: LoadedConfig.t) =>
	(state: EphemeralState.t) =>
		pipe(
			getProvisionerAbspath(config.projectDir),
			doesPathExist,
			chainRej(_ =>
				writeTextFile(getProvisionerAbspath(config.projectDir))(`/// <reference types="./provisioner.d.ts" />\n`)
			),
			map(_ => state),
		);
