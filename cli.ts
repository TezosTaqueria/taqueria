import {
	EphemeralState,
	i18n,
	InstalledPlugin,
	NonEmptyString,
	Option,
	ParsedTemplate,
	PluginInfo,
	PluginJsonResponse,
	PluginResponseEncoding,
	PositionalArg,
	SanitizedAbsPath,
	SanitizedArgs,
	ScaffoldConfig,
	Task,
} from '@taqueria/protocol';
import * as PluginActionName from '@taqueria/protocol/PluginActionName';
import * as TaqError from '@taqueria/protocol/TaqError';
import {
	attemptP,
	bichain,
	bimap,
	chain,
	chainRej,
	coalesce,
	debugMode,
	forkCatch,
	FutureInstance as Future,
	go,
	map,
	mapRej,
	parallel,
	reject,
	resolve,
} from 'fluture';
import { titleCase } from 'https://deno.land/x/case@2.1.1/mod.ts';
import { Table } from 'https://deno.land/x/cliffy@v0.20.1/table/mod.ts';
import { identity, pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import { has, last, uniq } from 'https://deno.land/x/ramda@v0.27.2/mod.ts';
import type { Arguments } from 'https://deno.land/x/yargs@v17.4.0-deno/deno-types.ts';
import yargs from 'https://deno.land/x/yargs@v17.4.0-deno/deno.ts';
import { __, match } from 'https://esm.sh/ts-pattern@3.3.5';
import * as Analytics from './analytics.ts';
import { addContract, listContracts, removeContract } from './contracts.ts';
import * as NPM from './npm.ts';
import { addTask } from './persistent-state.ts';
import inject from './plugins.ts';
import { addNewProvision, apply, loadProvisions, plan } from './provisions.ts';
import { getConfig, getDefaultMaxConcurrency } from './taqueria-config.ts';
import type { CLIConfig, DenoArgs, EnvKey, EnvVars } from './taqueria-types.ts';
import { LoadedConfig } from './taqueria-types.ts';
import * as utils from './taqueria-utils/taqueria-utils.ts';
import { createRegistry } from './task-registry.ts';

// Get utils
const {
	execText,
	joinPaths,
	mkdir,
	readJsonFile,
	writeTextFile,
	appendTextFile,
	doesPathNotExistOrIsEmptyDir,
	gitClone,
	rm,
	log,
	eager,
	isTaqError,
	taqResolve,
	// logInput,
	// debug
} = utils.inject({
	stdout: Deno.stdout,
	stderr: Deno.stderr,
});

const {
	optInAnalytics,
	optOutAnalytics,
	sendEvent,
} = Analytics.inject({
	env: Deno.env,
	inputArgs: Deno.args,
	build: Deno.build,
});

// Add alias
const exec = execText;
type PluginLib = ReturnType<typeof inject>;

// Registry of tasks that are internal and available regardless of whether executed in the context of a Taqueria project
const globalTasks = createRegistry();

// Registry of tasks that are internal and only available when executed in the context of a Taqueria project
const internalTasks = createRegistry();

/**
 * Parsing arguments is done in two different stages.
 *
 * In the first stage, we try to determine if the "init" command is being run,
 * which initializes a project. During this phase, plugins aren't available as
 * there's no configuration for them in the taq configuration file
 *
 * The second phase assumes a configuration file exists, and will try to load it
 * using any args found in phase in the "init phase" above. This configuration file
 * is then used to determine what plugins to load, which will add additional configuration
 * for parsing CLI arguments.
 */

// TODO: Integrate https://deno.land/x/omelette@v0.4.17

const getFromEnv = <T>(key: EnvKey, defaultValue: T, env: EnvVars) => env.get(key) || defaultValue;

const getVersion = (inputArgs: DenoArgs) => {
	const i = inputArgs.findIndex((str: string) => str === '--setVersion');
	return i > -1
		? inputArgs[i + 1]
		: 'not-provided';
};

const commonCLI = (env: EnvVars, args: DenoArgs, i18n: i18n.t) =>
	yargs(args)
		.scriptName('taq')
		.option('setVersion', {
			describe: i18n.__('setVersionDesc'),
			demandOption: true,
			requiresArg: true,
			type: 'string',
		})
		.hide('setVersion')
		.option('disableState', {
			describe: i18n.__('disableStateDesc'),
			default: getFromEnv('TAQ_DISABLE_STATE', false, env),
			boolean: true,
		})
		.hide('disableState')
		.option('logPluginRequests', {
			describe: i18n.__('logPluginCallsDesc'),
			default: false,
			boolean: true,
		})
		.hide('logPluginRequests')
		.option('setBuild', {
			describe: i18n.__('buildDesc'),
			demandOption: true,
			requiresArg: true,
			type: 'string',
		})
		.hide('setBuild')
		.option('maxConcurrency', {
			describe: i18n.__('maxConcurrencyDesc'),
			default: getFromEnv('TAQ_MAX_CONCURRENCY', getDefaultMaxConcurrency(), env),
		})
		.hide('maxConcurrency')
		.option('debug', {
			alias: 'd',
			describe: i18n.__('Enable internal debugging'),
			default: false,
		})
		.boolean('debug')
		.hide('debug')
		.option('p', {
			alias: 'projectDir',
			default: './',
			describe: i18n.__('initPathDesc'),
		})
		.hide('projectDir')
		.option('env', {
			alias: 'e',
			describe: i18n.__('envDesc'),
		})
		.option('fromVsCode', {
			describe: i18n.__('fromVsCodeDesc'),
			default: false,
			boolean: true,
		})
		.epilogue(i18n.__('betaWarning'))
		.help(false);

const initCLI = (env: EnvVars, args: DenoArgs, i18n: i18n.t) => {
	// Add "init" task used to initialize a new project
	globalTasks.registerTask({
		taskName: NonEmptyString.create('init'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'init [projectDir]',
					i18n.__('initDesc'),
					(yargs: Arguments) => {
						yargs.positional('projectDir', {
							describe: i18n.__('initPathDesc'),
							type: 'string',
							default: getFromEnv('TAQ_PROJECT_DIR', '.', env),
						});
					},
				),
		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				parsedArgs,
				({ projectDir, maxConcurrency }) => initProject(projectDir, maxConcurrency, i18n),
				map(log),
			),
	});

	// Add "scaffold" task to scaffold full projects
	globalTasks.registerTask({
		taskName: NonEmptyString.create('scaffold'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'scaffold [scaffoldUrl] [scaffoldProjectDir]',
					i18n.__('scaffoldDesc'),
					(yargs: Arguments) => {
						yargs
							.positional('scaffoldUrl', {
								describe: i18n.__('scaffoldUrlDesc'),
								type: 'string',
								default: 'https://github.com/ecadlabs/taqueria-scaffold-taco-shop.git',
							})
							.positional('scaffoldProjectDir', {
								type: 'string',
								describe: i18n.__('scaffoldProjectDirDesc'),
								default: './taqueria-taco-shop',
							});
					},
				),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				SanitizedArgs.ofScaffoldTaskArgs(parsedArgs),
				chain(scaffoldProject(i18n)),
				map(log),
			),
	});

	// Add "opt-in" task to opt-in to to analytics tracking
	globalTasks.registerTask({
		taskName: NonEmptyString.create('opt-in'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'opt-in',
					i18n.__('optInDesc'),
					() => {},
				),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				parsedArgs,
				optInAnalytics,
				map(log),
			),
	});

	// Add "opt-out" task to opt-out of analytics tracking
	globalTasks.registerTask({
		taskName: NonEmptyString.create('opt-out'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'opt-out',
					i18n.__('optOutDesc'),
					() => {},
				),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				parsedArgs,
				optOutAnalytics,
				map(log),
			),
	});

	// Add a task for vscode to learn more about the CLI
	globalTasks.registerTask({
		taskName: NonEmptyString.create('fromVsCode'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.hide('fromVsCode')
				.command(
					'testFromVsCode',
					false,
					() => {},
				),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				log('OK'),
				taqResolve,
			),
	});

	// Add "--version" command to show the CLI version number
	globalTasks.registerTask({
		taskName: NonEmptyString.create('version'),
		configure: (cliConfig: CLIConfig) => cliConfig.version(getVersion(args)),
		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				log(parsedArgs.setVersion),
				taqResolve,
			),
		isRunning: (parsedArgs: SanitizedArgs.t) => parsedArgs.version ? true : false,
	});

	// Add "--build" command to show the build version
	globalTasks.registerTask({
		taskName: NonEmptyString.create('build'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.option('build', {
					describe: i18n.__('buildDesc'),
					type: 'boolean',
				}),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				log(parsedArgs.setBuild),
				taqResolve,
			),

		isRunning: (parsedArgs: SanitizedArgs.t) => parsedArgs.build ? true : false,
	});

	return globalTasks.configure(commonCLI(env, args, i18n));
};

const loadInternalTasks = (cliConfig: CLIConfig, config: LoadedConfig.t, env: EnvVars, i18n: i18n.t) => {
	// Add "install" task to install plugins
	internalTasks.registerTask({
		taskName: NonEmptyString.create('install'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'install <pluginName>',
					i18n.__('installDesc'),
					(yargs: Arguments) => {
						yargs.positional('pluginName', {
							describe: i18n.__('pluginNameDesc'),
							type: 'string',
							required: true,
						});
					},
				)
				.alias('install', 'i'),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				SanitizedArgs.ofInstallTaskArgs(parsedArgs),
				chain(args => NPM.installPlugin(config, parsedArgs.projectDir, i18n, args.pluginName)),
				map(log),
				chain(() => loadPlugins(cliConfig, config, env, parsedArgs, i18n)),
				chain(_ => taqResolve<void>()),
			),
	});

	// Add "uninstall" task
	internalTasks.registerTask({
		taskName: NonEmptyString.create('uninstall'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'uninstall <pluginName>',
					i18n.__('uninstallDesc'),
					(yargs: Arguments) => {
						yargs.positional('pluginName', {
							describe: i18n.__('pluginNameDesc'),
							type: 'string',
							required: true,
						});
					},
				)
				.alias('u', 'uninstall'),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				SanitizedArgs.ofUninstallTaskArgs(parsedArgs),
				chain(parsedArgs => NPM.uninstallPlugin(config, parsedArgs.projectDir, i18n, parsedArgs.pluginName)),
				map(log),
			),
	});

	// Add a hidden task "list-known-tasks" task to show all known tasks
	internalTasks.registerTask({
		taskName: NonEmptyString.create('list-known-tasks'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'list-known-tasks',
					false, // hide
					() => {},
				),
		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				parsedArgs,
				listKnownTasks,
				map(log),
			),
	});

	// Add "add-contract" task used to add/register a known contract
	// TODO: Remove?
	internalTasks.registerTask({
		taskName: NonEmptyString.create('add-contract'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'add-contract <sourceFile>',
					i18n.__('addContractDesc'),
					(yargs: Arguments) => {
						yargs.positional('sourceFile', {
							describe: i18n.__('addSourceFileDesc'),
							type: 'string',
							required: true,
						});

						yargs.option('contractName', {
							alias: ['name', 'n'],
							type: 'string',
						});
					},
				),
		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				SanitizedArgs.ofAddContractArgs(parsedArgs),
				chain(args => addContract(config, args, i18n)),
				chain(_ => listContracts(config, parsedArgs, i18n)),
				map(renderTable),
			),
	});

	// Add "rm-contract" task to remove (unregister) a known contract
	internalTasks.registerTask({
		taskName: NonEmptyString.create('rm-contract'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'rm-contract <contractName>',
					i18n.__('removeContractDesc'),
					(yargs: Arguments) => {
						yargs.positional('contractName', {
							describe: i18n.__('removeContractNameDesc'),
							type: 'string',
							required: true,
						});
					},
				)
				.alias('remove-contract', 'rm-contract'),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				SanitizedArgs.ofRemoveContractsArgs(parsedArgs),
				chain(args => removeContract(config, args, i18n)),
				chain(_ => listContracts(config, parsedArgs, i18n)),
				map(renderTable),
			),
	});

	// Add "list-contracts" task to show a list of all known (registered) contracts
	internalTasks.registerTask({
		taskName: NonEmptyString.create('list-contract'),
		configure: (cliConfig: CLIConfig) =>
			cliConfig
				.command(
					'list-contracts',
					i18n.__('listContractsDesc'),
					() => {},
				)
				.alias('show-contracts', 'list-contracts'),

		handler: (parsedArgs: SanitizedArgs.t) =>
			pipe(
				SanitizedArgs.of(parsedArgs),
				chain(args => listContracts(config, args, i18n)),
				map(renderTable),
			),
	});

	return internalTasks.configure(cliConfig)
		// TODO: Discuss with team. I think this should be a global option, and it was originally,
		// but it was later moved.
		.option('y', {
			describe: i18n.__('yesOptionDesc'),
			alias: 'yes',
			default: false,
			boolean: true,
		});
};

const demandCommand = (cliConfig: CLIConfig) => cliConfig.demandCommand(1) as CLIConfig;

const postInitCLI = (env: EnvVars, args: DenoArgs, parsedArgs: SanitizedArgs.t, i18n: i18n.t) =>
	pipe(
		initCLI(env, args, i18n),
		demandCommand,
		extendCLI(env, parsedArgs, i18n),
	);

const parseArgs = (cliConfig: CLIConfig): Future<TaqError.t, Record<string, unknown>> =>
	pipe(
		attemptP<Error, Record<string, unknown>>(() => cliConfig.parseAsync()),
		mapRej<Error, TaqError.t>(previous => ({
			kind: 'E_INVALID_ARGS',
			msg: 'Invalid arguments were provided and could not be parsed',
			context: cliConfig,
			previous,
		})),
	);

const listKnownTasks = (parsedArgs: SanitizedArgs.t) =>
	pipe(
		joinPaths(parsedArgs.projectDir, 'state.json'),
		stateAbsPath => readJsonFile<EphemeralState.t>(stateAbsPath), // TypeScript won't allow pointfree here
		map(state =>
			Object.entries(state.tasks).reduce(
				(retval, [taskName, implementation]) => {
					if ('task' in implementation) {
						const task = implementation as Task.t;
						const plugins = task.options
							? task.options.reduce(
								(retval: string[], option) =>
									option.choices
										? [...retval, ...option.choices]
										: retval,
								[],
							)
							: [];
						const obj: Record<string, string[]> = {};
						obj[taskName] = plugins;
						return { ...retval, ...obj };
					} else {
						const obj: Record<string, null> = {};
						obj[taskName] = null;
						return { ...retval, ...obj };
					}
				},
				{},
			)
		),
		map(JSON.stringify),
	);

const mkInitialDirectories = (projectDir: SanitizedAbsPath.t, maxConcurrency: number, i18n: i18n.t) =>
	pipe(
		getConfig(projectDir, i18n, true),
		chain(({ artifactsDir, contractsDir, projectDir }: LoadedConfig.t) => {
			const jobs = [artifactsDir, contractsDir].reduce(
				(retval, abspath) => abspath ? [...retval, mkdir(joinPaths(projectDir, abspath))] : retval,
				[] as Future<TaqError.TaqError, string>[],
			);
			return parallel(maxConcurrency)(jobs);
		}),
	);

const createGitIgnoreFile = (projectDir: SanitizedAbsPath.t): Future<TaqError.TaqError, string> => {
	const toIgnore = ['.DS_Store', 'artifacts', '.taq/*-state.json', 'node_modules/'];
	return writeTextFile(`${projectDir}/.gitignore`)(toIgnore.join('\n'));
};

const initProject = (
	projectDir: SanitizedAbsPath.t,
	maxConcurrency: number,
	i18n: i18n.t,
) =>
	pipe(
		mkInitialDirectories(projectDir, maxConcurrency, i18n),
		chain(_ => exec('npm init -y 2>&1 > /dev/null', {}, false, projectDir)),
		chain(_ => exec('taq install @taqueria/plugin-core 2>&1 > /dev/null', {}, false, projectDir)),
		chain(_ => createGitIgnoreFile(projectDir)),
		map(_ => i18n.__('bootstrapMsg')),
	);

const runScaffoldPostInit = (scaffoldDir: SanitizedAbsPath.t): Future<TaqError.t, SanitizedAbsPath.t> => {
	const scaffoldConfigAbspath = SanitizedAbsPath.create(`${scaffoldDir}/scaffold.json`);
	return pipe(
		readJsonFile<ScaffoldConfig.t>(scaffoldConfigAbspath),
		coalesce(_ => ({}) as ScaffoldConfig.t)(identity),
		chain(scaffoldConfig =>
			typeof scaffoldConfig === 'object' && scaffoldConfig.postInit
				? pipe(
					exec(`${scaffoldConfig.postInit!} 2>&1`, {}, true, scaffoldDir),
					map(JSON.stringify),
					chain(appendTextFile(joinPaths(scaffoldDir, 'scaffold.log'))),
					chain(_ =>
						pipe(
							rm(scaffoldConfigAbspath),
							coalesce(_ => scaffoldConfigAbspath)(_ => scaffoldConfigAbspath),
						)
					),
				)
				: taqResolve(scaffoldConfigAbspath)
		),
	);
};

const scaffoldProject = (i18n: i18n.t) =>
	({ scaffoldUrl, scaffoldProjectDir, maxConcurrency }: SanitizedArgs.ScaffoldTaskArgs) =>
		go(
			function*() {
				const abspath: SanitizedAbsPath.t = yield SanitizedAbsPath.make(scaffoldProjectDir);
				const destDir: SanitizedAbsPath.t = yield doesPathNotExistOrIsEmptyDir(abspath);

				log(`\n Scaffolding 🛠 \n into: ${destDir}\n from: ${scaffoldUrl} \n`);
				yield gitClone(scaffoldUrl)(destDir);

				log('\n Initializing Project...');

				const gitDir = yield SanitizedAbsPath.make(`${destDir}/.git`);
				yield rm(gitDir);
				log('    ✓ Remove Git directory');

				const installOutput = yield exec(`npm install 2>&1`, {}, true, destDir);
				yield appendTextFile(joinPaths(destDir, 'scaffold.log'))(installOutput.toString());
				log('    ✓ Install plugins');

				const initOutput = yield exec(`taq init 2>&1`, {}, true, destDir);
				yield appendTextFile(joinPaths(destDir, 'scaffold.log'))(initOutput.toString());

				yield runScaffoldPostInit(abspath);
				log('    ✓ Run scaffold post-init script');

				log("    ✓ Project Taq'ified \n");

				return ('🌮 Project created successfully 🌮');
			},
		);

const getCanonicalTask = (pluginName: string, taskName: string, state: EphemeralState.t) =>
	state.plugins.reduce(
		(retval: Task.t | undefined, pluginInfo: PluginInfo.t) =>
			pluginInfo.name === pluginName || pluginInfo.alias === pluginName
				? pluginInfo.tasks?.find((task: Task.t) => task.task === taskName)
				: retval,
		undefined,
	);

const getCanonicalTemplate = (pluginName: string, templateName: string, state: EphemeralState.t) =>
	state.plugins.reduce(
		(retval: ParsedTemplate.t | undefined, pluginInfo: PluginInfo.t) =>
			pluginInfo.name === pluginName || pluginInfo.alias === pluginName
				? pluginInfo.templates?.find((template: ParsedTemplate.t) => template.template == templateName)
				: retval,
		undefined,
	);

const addOperations = (
	cliConfig: CLIConfig,
	config: LoadedConfig.t,
	_env: EnvVars,
	_parsedArgs: SanitizedArgs.t,
	_i18n: i18n.t,
	state: EphemeralState.t,
	_pluginLib: PluginLib,
) =>
	cliConfig.command(
		'provision <operation> [..operation args]',
		'Provision an operation to populate project state',
		(yargs: CLIConfig) => {
			yargs.positional('operation', {
				describe: 'The name of the operation to provision',
				required: true,
				type: 'string',
				choices: Object.keys(state.operations),
			});
			yargs.option('name', {
				describe: 'Unique name of the provisioner',
				type: 'string',
			});
		},
		(argv: Arguments) =>
			pipe(
				SanitizedArgs.ofProvisionTaskArgs(argv),
				chain(inputArgs => addNewProvision(inputArgs, config, state)),
				map(() => 'Added provision to .taq/provisions.json'),
				forkCatch(displayError(cliConfig))(displayError(cliConfig))(log),
			),
	);
// .command(
// 	'plan',
// 	'Display the execution plan for applying all provisioned operations',
// 	() => {},
// 	(argv: Arguments) =>
// 		pipe(
// 			SanitizedArgs.of(argv),
// 			map(inputArgs => joinPaths(inputArgs.projectDir, '.taq', 'provisions.json')),
// 			chain(SanitizedAbsPath.make),
// 			chain(loadProvisions),
// 			map(plan),
// 			forkCatch(displayError(cliConfig))(displayError(cliConfig))(log),
// 		),
// );

const getTemplateName = (parsedArgs: SanitizedArgs.t, state: EphemeralState.t) => {
	if (parsedArgs._.length >= 2 && parsedArgs._[0] === 'create') {
		const templateName = last(parsedArgs._.slice(0, 2));
		return templateName && state.templates[templateName]
			? templateName
			: undefined;
	}
	return undefined;
};

const addRequiredTemplatePositional = (yargs: CLIConfig, state: EphemeralState.t, i18n: i18n.t) =>
	yargs.positional('template', {
		describe: i18n.__('templateDesc'),
		type: 'string',
		choices: Object.keys(state.templates),
		required: true,
	});

const getTemplateCommandArgs = (parsedArgs: SanitizedArgs.t, state: EphemeralState.t, i18n: i18n.t) => {
	const templateName = getTemplateName(parsedArgs, state);
	if (templateName) {
		const implementation = state.templates[templateName];

		// Get the template
		const template: ParsedTemplate.t = has('template', implementation)
			? implementation as ParsedTemplate.t
			: getCanonicalTemplate(
				(implementation as InstalledPlugin.t).name,
				templateName,
				state,
			) as ParsedTemplate.t;

		const command = 'create ' + template.command.replace(
			new RegExp(`^${template.template}`),
			'<template>',
		);

		const builder = (yargs: CLIConfig) => {
			addRequiredTemplatePositional(yargs, state, i18n);
			template.options?.map(option =>
				yargs.option(option.flag, {
					alias: option.shortFlag,
					describe: option.description,
					type: option.type,
					required: option.required,
					default: option.defaultValue,
					choices: option.choices,
				})
			);
			template.positionals?.map(p =>
				yargs.positional(p.placeholder, {
					default: p.defaultValue,
					describe: p.description,
					type: p.type,
					required: p.required,
				})
			);
			return yargs;
		};
		return { command, builder };
	}
	return {
		command: 'create <template>',
		builder: (yargs: CLIConfig) => addRequiredTemplatePositional(yargs, state, i18n),
	};
};

const exposeTemplates = (
	cliConfig: CLIConfig,
	config: LoadedConfig.t,
	_env: EnvVars,
	parsedArgs: SanitizedArgs.t,
	i18n: i18n.t,
	state: EphemeralState.t,
	pluginLib: PluginLib,
) => {
	if (Object.keys(state.templates).length > 0) {
		const { command, builder } = getTemplateCommandArgs(parsedArgs, state, i18n);

		cliConfig.command(
			command,
			i18n.__('createDesc'),
			builder,
			(args: Arguments) =>
				pipe(
					SanitizedArgs.ofCreateTaskArgs(args),
					chain((parsedArgs: SanitizedArgs.CreateTaskArgs) => {
						// We need to determine first if the template is provided by more than one plugin, and if so,
						// that the plugin option was provided to know which one should be targeted.
						// We can then see if handling this template should be proxied to the plugin or have a shell command executed
						const isComposite = has('template', state.templates[parsedArgs.template]);

						if (isComposite) {
							if (parsedArgs.plugin) {
								const installedPlugin = config.plugins?.find(plugin => plugin.name === parsedArgs.plugin);
								if (installedPlugin) {
									return handleTemplate(parsedArgs, config, installedPlugin, state, pluginLib, i18n);
								}
							}
							return resolve(log(i18n.__('providedByMany')));
						}

						const installedPlugin = state.templates[parsedArgs.template] as InstalledPlugin.t;
						return handleTemplate(parsedArgs, config, installedPlugin, state, pluginLib, i18n);
					}),
					forkCatch(displayError(cliConfig))(displayError(cliConfig))(identity),
				),
		);
	}
	return cliConfig;
};

const handleTemplate = (
	parsedArgs: SanitizedArgs.CreateTaskArgs,
	config: LoadedConfig.t,
	plugin: InstalledPlugin.t,
	state: EphemeralState.t,
	pluginLib: PluginLib,
	i18n: i18n.t,
) => {
	const template = getCanonicalTemplate(plugin.name, parsedArgs.template, state);
	if (template) {
		return template.handler === 'function'
			? pipe(
				PluginActionName.make('proxyTemplate'),
				chain(action =>
					pluginLib.sendPluginActionRequest<PluginJsonResponse.t>(plugin)(
						action,
						template.encoding ?? PluginResponseEncoding.create('none'),
					)({
						...parsedArgs,
						action: 'proxyTemplate',
					})
				),
				map(decoded => {
					if (decoded) return renderPluginJsonRes(decoded, parsedArgs);
				}),
			)
			: pipe(
				exec(
					template.handler,
					{ ...parsedArgs, config },
					['json', 'application/json'].includes(template.encoding ?? 'none'),
				),
				map(([_, output, errOutput]) => {
					if (errOutput.length > 0) console.error(errOutput);
					if (output.length > 0) return renderPluginJsonRes(JSON.parse(output), parsedArgs);
				}),
			);
	}
	return resolve(log(i18n.__('templateNotFound')));
};

const getPluginOption = (task: Task.t) => {
	return task.options?.find(option => option.flag === 'plugin');
};

const exposeTasks = (
	cliConfig: CLIConfig,
	config: LoadedConfig.t,
	env: EnvVars,
	parsedArgs: SanitizedArgs.t,
	i18n: i18n.t,
	state: EphemeralState.t,
	pluginLib: PluginLib,
) =>
	Object.entries(state.tasks).reduce(
		(retval: CLIConfig, pair: [string, InstalledPlugin.t | Task.t]) => {
			const [taskName, implementation] = pair;

			// Composite task...
			if ('task' in implementation) {
				const task: Task.t = implementation;

				// For composite tasks, we do one of two things:
				// 1)   If no --plugin argument was specified, we then add a task
				//      which forces the user to specify the plugin they want to use
				//      to fulfill the task implementation
				// 2)   If a --plugin argument was specified, and its the plugin specified
				//      has an implementation for this task name, then we add the task
				//      as if no other implementation was possible

				// Was a plugin provider specified? (path #2 above)
				if (parsedArgs.plugin && getPluginOption(task)?.choices?.includes(parsedArgs.plugin)) {
					const canonicalTask = getCanonicalTask(parsedArgs.plugin, taskName, state);
					return canonicalTask
						? exposeTask(
							retval,
							config,
							env,
							parsedArgs,
							state,
							i18n,
							canonicalTask,
							pluginLib,
							config.plugins?.find((found: InstalledPlugin.t) => found.name === parsedArgs.plugin),
						)
						: retval;
				}

				// No plugin provider was specified (path #1)
				return exposeTask(retval, config, env, parsedArgs, state, i18n, task, pluginLib);
			}

			// Canonical task...
			const foundTask = getCanonicalTask(implementation.name, taskName, state);
			return foundTask
				? exposeTask(
					retval,
					config,
					env,
					parsedArgs,
					state,
					i18n,
					foundTask,
					pluginLib,
					implementation,
				)
				: retval;
		},
		cliConfig,
	);

const exposeTask = (
	cliConfig: CLIConfig,
	config: LoadedConfig.t,
	_env: EnvVars,
	parsedArgs: SanitizedArgs.t,
	state: EphemeralState.t,
	_i18n: i18n.t,
	task: Task.t,
	pluginLib: PluginLib,
	plugin?: InstalledPlugin.t,
) =>
	pipe(
		cliConfig.command({
			command: task.command,
			aliases: task.aliases,
			hidden: task.hidden,
			description: task.hidden ? null : task.description,
			example: task.example,
			builder: (cliConfig: CLIConfig) => {
				if (task.options) {
					task.options.reduce(
						(cli: CLIConfig, option: Option.t) => {
							const optionSettings: Record<string, unknown> = {
								alias: option.shortFlag ? option.shortFlag : undefined,
								default: option.defaultValue,
								demandOption: option.required,
								describe: option.description,
							};

							if (option.choices && option.choices.length) optionSettings.choices = option.choices;
							if (option.boolean) optionSettings['boolean'] = true;
							return cli.option(option.flag, optionSettings);
						},
						cliConfig,
					);
				}

				if (task.positionals) {
					task.positionals.reduce(
						(cli: CLIConfig, positional: PositionalArg.t) => {
							const positionalSettings = {
								describe: positional.description,
								type: positional.type,
								default: positional.defaultValue,
							};

							return cli.positional(positional.placeholder, positionalSettings);
						},
						cliConfig,
					);
				}
			},
			handler: (inputArgs: Record<string, unknown>) => {
				cliConfig.handled = true;
				if (Array.isArray(task.handler)) {
					log('This is a composite task!');
					return;
				}

				const handler = task.handler === 'proxy' && plugin
					? pipe(
						PluginActionName.make('proxy'),
						chain(action =>
							pluginLib.sendPluginActionRequest(plugin)(action, task.encoding ?? PluginResponseEncoding.create('none'))(
								{
									...inputArgs,
									task: task.task,
								},
							)
						),
						chain(addTask(parsedArgs, config, task.task, plugin.name)),
						map(res => {
							const decoded = res as PluginJsonResponse.t | void;
							if (decoded) return renderPluginJsonRes(decoded, parsedArgs);
						}),
					)
					: pipe(
						exec(
							task.handler,
							{ ...parsedArgs, ...inputArgs },
							['json', 'application/json'].includes(task.encoding ?? 'none'),
						),
						map(([_, output, errOutput]) => {
							if (errOutput.length > 0) console.error(errOutput);
							if (output.length > 0) return renderPluginJsonRes(JSON.parse(output), parsedArgs);
						}),
					);

				forkCatch(displayError(cliConfig))(displayError(cliConfig))(identity)(handler);
			},
		}),
	);

const loadEphemeralState = (
	cliConfig: CLIConfig,
	config: LoadedConfig.t,
	env: EnvVars,
	parsedArgs: SanitizedArgs.t,
	i18n: i18n.t,
	state: EphemeralState.t,
	pluginLib: PluginLib,
): CLIConfig =>
	[exposeTasks, exposeTemplates /* addOperations*/].reduce(
		(cliConfig: CLIConfig, fn) => fn(cliConfig, config, env, parsedArgs, i18n, state, pluginLib),
		cliConfig,
	);

const renderPluginJsonRes = (decoded: PluginJsonResponse.t, parsedArgs: SanitizedArgs.t) => {
	// do not render object/array ASCII table if the request comes from TVsCE
	if (parsedArgs.fromVsCode) {
		if (typeof decoded === 'object') log(JSON.stringify(decoded.data));
		return;
	}

	if (typeof decoded === 'object') {
		switch (decoded.render) {
			case 'table':
				renderTable(decoded.data ? decoded.data as Record<string, string>[] : []);
				break;
			default:
				log(decoded.data as string);
				break;
		}
	}
};

const renderTable = (data: Record<string, string>[]) => {
	const keys: string[] = pipe(
		data.reduce(
			(retval: string[], record) => [...retval, ...Object.keys(record)],
			[],
		),
		uniq,
	);

	const rows = data.reduce(
		(retval: (string[])[], record) => {
			const row = keys.reduce(
				(row: string[], key: string) => {
					const value: string = record[key] ? record[key] : '';
					return [...row, value];
				},
				[],
			);
			return [...retval, row];
		},
		[],
	);

	new Table()
		.header(keys.map(val => titleCase(val)))
		.body(rows)
		.border(true)
		.render();
};

const resolvePluginName = (parsedArgs: SanitizedArgs.t, state: EphemeralState.t) =>
	!parsedArgs.plugin
		? parsedArgs
		: {
			...parsedArgs,
			plugin: state.plugins.reduce(
				(retval, pluginInfo: PluginInfo.t) =>
					pluginInfo.alias.toString() === retval.toString()
						? NonEmptyString.create(pluginInfo.name)
						: retval,
				parsedArgs.plugin!,
			),
		};

const loadPlugins = (
	previousCliConfig: CLIConfig,
	config: LoadedConfig.t,
	env: EnvVars,
	parsedArgs: SanitizedArgs.t,
	i18n: i18n.t,
) => {
	const pluginLib = inject({
		parsedArgs,
		i18n,
		env,
		config,
		stderr: Deno.stderr,
		stdout: Deno.stdout,
	});

	const cliConfig = loadInternalTasks(previousCliConfig, config, env, i18n);

	return pipe(
		pluginLib.getState(),
		map((state: EphemeralState.t) =>
			pipe(
				resolvePluginName(parsedArgs, state),
				(parsedArgs: SanitizedArgs.t) => loadEphemeralState(cliConfig, config, env, parsedArgs, i18n, state, pluginLib),
			)
		),
	);
};

const extendCLI = (env: EnvVars, parsedArgs: SanitizedArgs.t, i18n: i18n.t) =>
	(previousCLIConfig: CLIConfig) =>
		pipe(
			getConfig(parsedArgs.projectDir, i18n, false),
			chain((config: LoadedConfig.t) => loadPlugins(previousCLIConfig, config, env, parsedArgs, i18n)),
			map((cliConfig: CLIConfig) => cliConfig.help()),
			chain(parseArgs),
			chain(inputArgs => SanitizedArgs.of(inputArgs)),
			chain(parsedArgs =>
				internalTasks.isTaskRunning(parsedArgs)
					? internalTasks.handle(parsedArgs)
					: showInvalidTask(previousCLIConfig)(parsedArgs)
			),
		);

const executingBuiltInTask = (inputArgs: SanitizedArgs.t) =>
	[...globalTasks.getTaskNames(), ...internalTasks.getTaskNames()].reduce(
		(retval, builtinTaskName: string) => retval || inputArgs._.includes(builtinTaskName),
		false,
	);

const preprocessArgs = (inputArgs: DenoArgs): DenoArgs => {
	return inputArgs.map(arg => {
		// A hack to get around yargs because it strips leading and trailing double quotes of strings passed by the command
		// Refer to https://github.com/yargs/yargs-parser/issues/201
		const protectedArg = /^"(.|\n)*"$/.test(arg) ? '___' + arg + '___' : arg;
		// This same hack is used to prevent yargs from messing with hex values
		return /^0x[0-9a-fA-F]+$/.test(protectedArg) ? '___' + protectedArg + '___' : protectedArg;
	});
};

export const run = (env: EnvVars, inputArgs: DenoArgs, i18n: i18n.t) => {
	try {
		const processedInputArgs = preprocessArgs(inputArgs);

		// Parse the args required for core built-in tasks
		return pipe(
			initCLI(env, processedInputArgs, i18n),
			(cliConfig: CLIConfig) =>
				pipe(
					cliConfig,
					parseArgs,
					chain(SanitizedArgs.of),
					chain((initArgs: SanitizedArgs.t) => {
						debugger;
						if (initArgs.debug) debugMode(true);
						return globalTasks.isTaskRunning(initArgs)
							? globalTasks.handle(initArgs)
							: postInitCLI(env, processedInputArgs, initArgs, i18n);
					}),
					chain(initArgs =>
						sendEvent(
							initArgs._.join(),
							getVersion(inputArgs),
							false,
						)
					),
					forkCatch(async (error: Error | TaqError.t) => {
						await eager(sendEvent(inputArgs.join(), getVersion(inputArgs), true));
						displayError(cliConfig)(error);
					})(async (error: Error | TaqError.t) => {
						await eager(sendEvent(inputArgs.join(), getVersion(inputArgs), true));
						displayError(cliConfig)(error);
					})(identity),
				),
		);
	} catch (err) {
		// Something went wrong that we didn't handle.
		// TODO: Generate bug report with stack trace
		console.error(err);
	}
};

export const showInvalidTask = (cli: CLIConfig) =>
	(parsedArgs: SanitizedArgs.t) => {
		if (executingBuiltInTask(parsedArgs) || cli.handled) {
			return taqResolve(parsedArgs);
		} else if (parsedArgs._.length == 0) {
			cli.showHelp();
			return taqResolve(parsedArgs);
		}

		const err: TaqError.t = {
			kind: 'E_INVALID_TASK',
			msg: `Taqueria isn't aware of this task. Perhaps you need to install a plugin first?`,
			context: parsedArgs,
		};
		return reject(err);
	};

export const normalizeErr = (err: TaqError.t | TaqError.E_TaqError | Error) => {
	if (err instanceof TaqError.E_TaqError) {
		return TaqError.create({
			...err,
			msg: err.message,
		});
	}
	return err;
};

export const displayError = (cli: CLIConfig) =>
	(err: Error | TaqError.t) => {
		const inputArgs = (cli.parsed as unknown as { argv: Record<string, unknown> }).argv;

		if (!inputArgs.fromVsCode && (isTaqError(err) && err.kind !== 'E_EXEC')) {
			cli.getInternalMethods().getUsageInstance().showHelp(inputArgs.help ? 'log' : 'error');
		}

		if (!inputArgs.help) {
			console.error(''); // empty line
			const res = match(normalizeErr(err))
				.with({ kind: 'E_FORK' }, err => [125, err.msg])
				.with({ kind: 'E_INVALID_CONFIG' }, err => [1, err.msg])
				.with({ kind: 'E_INVALID_JSON' }, err => [12, err])
				.with({ kind: 'E_INVALID_PATH_ALREADY_EXISTS' }, err => [3, `${err.msg}: ${err.context}`])
				.with({ kind: 'E_INVALID_PATH_DOES_NOT_EXIST' }, err => [4, `${err.msg}: ${err.context}`])
				.with({ kind: 'E_INVALID_TASK' }, err => [5, err.msg])
				.with({ kind: 'E_INVALID_PLUGIN_RESPONSE' }, err => [6, err.msg])
				.with({ kind: 'E_MKDIR_FAILED' }, err => [7, `${err.msg}: ${err.context}`])
				.with({ kind: 'E_NPM_INIT' }, err => [8, err.msg])
				.with({ kind: 'E_READFILE' }, err => [9, err.msg])
				.with({ kind: 'E_GIT_CLONE_FAILED' }, err => [10, `${err.msg}: ${err.context}`])
				.with({ kind: 'E_INVALID_ARGS' }, err => [11, err.msg])
				.with({ kind: 'E_PROVISION' }, err => [12, err.msg])
				.with({ kind: 'E_PARSE' }, err => [13, err.msg])
				.with({ kind: 'E_PARSE_UNKNOWN' }, err => [14, err.msg])
				.with({ kind: 'E_INVALID_ARCH' }, err => [15, err.msg])
				.with({ kind: 'E_NO_PROVISIONS' }, err => [16, err.msg])
				.with({ kind: 'E_CONTRACT_REGISTERED' }, err => [21, err.msg])
				.with({ kind: 'E_CONTRACT_NOT_REGISTERED' }, err => [22, err.msg])
				.with({ kind: 'E_INVALID_PATH_EXISTS_AND_NOT_AN_EMPTY_DIR' }, err => [17, `${err.msg}: ${err.context}`])
				.with({ kind: 'E_INTERNAL_LOGICAL_VALIDATION_FAILURE' }, err => [18, `${err.msg}: ${err.context}`])
				.with({ kind: 'E_EXEC' }, err => [19, false])
				.with({ kind: 'E_OPT_IN_WARNING' }, err => [20, err.msg])
				.with({ message: __.string }, err => [128, err.message])
				.exhaustive();

			const [exitCode, msg] = res;
			if (inputArgs.debug) {
				logAllErrors(err);
			} else if (msg) console.error(msg);

			Deno.exit(exitCode as number);
		}
	};

const logAllErrors = (err: Error | TaqError.E_TaqError | TaqError.t | unknown) => {
	console.error(err);
	if (isTaqError(err) && err.previous) logAllErrors(err.previous);
};

export default {
	run,
};
