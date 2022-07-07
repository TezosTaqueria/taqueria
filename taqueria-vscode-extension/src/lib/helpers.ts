import { EphemeralState } from '@taqueria/protocol/EphemeralState';
import loadI18n, { i18n } from '@taqueria/protocol/i18n';
import { TaqError } from '@taqueria/protocol/TaqError';
import { readFile } from 'fs/promises';
import { stat } from 'fs/promises';
import { join } from 'path';
import { path } from 'rambda';
import * as api from 'vscode';
import * as Util from './pure';
import { TaqVsxError } from './TaqVsxError';

export const COMMAND_PREFIX = 'taqueria.';

export enum Commands {
	init = 'taqueria.init',
	scaffold = 'taqueria.scaffold',
	install = 'taqueria.install',
	uninstall = 'taqueria.uninstall',
	optIn = 'taqueria.optIn',
	optOut = 'taqueria.optOut',
	originate = 'taqueria.originate',
}

export enum OutputLevels {
	output,
	fatal,
	error,
	warn,
	info,
	debug,
	trace,
}

export type OutputFunction = (currentLogLevel: OutputLevels, log: string) => void;

const outputLevelsOrder = [
	OutputLevels.trace,
	OutputLevels.debug,
	OutputLevels.info,
	OutputLevels.warn,
	OutputLevels.error,
	OutputLevels.fatal,
	OutputLevels.output,
];

const shouldOutput = (currentLogLevel: OutputLevels, configuredLogLevel: OutputLevels) => {
	const currentLogIndex = outputLevelsOrder.indexOf(currentLogLevel);
	const configuredLogIndex = outputLevelsOrder.indexOf(configuredLogLevel);
	return currentLogIndex >= configuredLogIndex;
};

export type Output = {
	outputChannel: api.OutputChannel;
	logLevel: OutputLevels;
};

type VSCodeAPI = typeof api;

export interface InjectedDependencies {
	vscode: VSCodeAPI;
}

export const sanitizeDeps = (deps?: InjectedDependencies) =>
	deps
		? deps
		: { vscode: api };

export const inject = (deps: InjectedDependencies) => {
	const { vscode } = deps;

	const exposeInitTask = (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		folders: readonly api.WorkspaceFolder[],
	) => {
		addCommand(context)(Commands.init, async () => {
			const uri = await getFolderForInitOrScaffold('init', context, output, i18n, folders);
			if (uri === undefined) {
				return;
			}
			getTaqBinPath(i18n, output)
				.then(pathToTaq =>
					Util.proxyToTaq(pathToTaq, i18n, showOutput(output), undefined)(`init ${uri.path}`)
						.then(() =>
							Util.proxyToTaq(pathToTaq, i18n, showOutput(output), uri.path as Util.PathToDir)(``)
								.catch(() => Promise.resolve())
						)
						.then(() => updateCommandStates(context, output, i18n, uri.path as Util.PathToDir))
				)
				.then(_ => vscode.window.showInformationMessage("Project taq'fied!", uri.path))
				.then(_ => vscode.workspace.updateWorkspaceFolders(0, undefined, { uri }))
				.then(console.log)
				.catch(e => logAllNestedErrors(e, output));
		});
	};

	const exposeScaffoldTask = async (
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) => {
		const exposeTask = exposeTaskAsCommand(context, output, i18n);
		const availableScaffolds: { name: string; url: string }[] = await getAvailableScaffolds(context);
		const proxyScaffold = (scaffoldUrl: string, pathToTaq: Util.PathToTaq, i18n: i18n, projectDir: Util.PathToDir) =>
			Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)(`scaffold ${scaffoldUrl} ${projectDir}`)
				.then(() =>
					Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)(``)
						.catch(() => Promise.resolve())
				).then(() => updateCommandStates(context, output, i18n, projectDir))
				.catch(err => logAllNestedErrors(err, output));

		return exposeTask(Commands.scaffold, async (pathToTaq: Util.PathToTaq) => {
			const projectUri = await getFolderForInitOrScaffold('scaffold', context, output, i18n, folders);
			if (projectUri === undefined) {
				return;
			}
			const scaffold = await promptForScaffoldSelection(
				i18n,
				api.debug.activeDebugSession,
				availableScaffolds.map(template => template.name),
			);
			if (scaffold === null) {
				return;
			}
			const scaffoldUrl = availableScaffolds.find(template => template.name === scaffold)?.url;
			if (scaffoldUrl === undefined) {
				return;
			}
			await proxyScaffold(scaffoldUrl, pathToTaq, i18n, projectUri.path as Util.PathToDir);
			vscode.window.showInformationMessage('Scaffold completed!', projectUri.path);
		});
	};

	const getTaqifiedDirectories = (folders: readonly api.WorkspaceFolder[], i18n: i18n) => {
		const processes = folders.map(folder => {
			const taqifiedPath = join(folder.uri.path, '.taq');
			return stat(taqifiedPath)
				.then(_ => Util.makeDir(folder.uri.path, i18n))
				.catch(_ => undefined);
		});

		return Promise.all(processes)
			.then(results =>
				results.reduce(
					(paths: Util.PathToDir[], pathToDir) => {
						return pathToDir
							? [...paths, pathToDir]
							: paths;
					},
					[],
				)
			);
	};

	const getFolderForInitOrScaffold = async (
		taskTitle: string,
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		folders: readonly api.WorkspaceFolder[],
	) => {
		let uris: api.Uri[] | undefined = folders.map(folder => folder.uri);
		if (uris.length === 0) {
			uris = await vscode.window.showOpenDialog({
				canSelectFolders: true,
				canSelectFiles: false,
				openLabel: 'Select project folder',
				title: `Select a project folder to ${taskTitle} into`,
				canSelectMany: false,
			});
			if (uris === undefined) {
				return undefined;
			}
		}

		if (uris.length === 0) {
			return undefined;
		}
		if (uris.length === 1) {
			return uris[0];
		} else {
			showOutput(output)(
				OutputLevels.warn,
				`Error: running ${taskTitle} with multiple open folders is not yet implemented.`,
			);
			return undefined;
		}
	};

	const getFolderForTasksOnTaqifiedFolders = async (
		taskTitle: string,
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) => {
		const taqifiedDirectories = await getTaqifiedDirectories(folders, i18n);

		// The developer has no taqified workspace folders. As such,
		// we cannot proceed
		if (taqifiedDirectories.length === 0) {
			showError({
				kind: 'E_NO_TAQUERIA_PROJECTS',
				msg:
					`You don't have any Taqueria projects. You'll need to taq'ify a project using \"Taqueria: Init\" and open the folder in VsCode before you can ${taskTitle}.`,
			});
			return undefined;
		}

		// The developer has a single taqified workspace folder, so we know
		// exactly where to install a plugin
		if (taqifiedDirectories.length === 1) {
			return taqifiedDirectories[0];
		}

		// The developer has multiple taqified folders
		const selectedDir = await promptForTaqProject(i18n, taqifiedDirectories);
		if (!selectedDir) {
			return undefined;
		}
		return await Util.makeDir(selectedDir, i18n);
	};

	const promptForPluginInstallation = async (
		i18n: i18n,
		_debug: api.DebugSession | undefined,
		context: api.ExtensionContext,
		projectDir: Util.PathToDir,
	) => {
		const availablePlugins = await getAvailablePlugins(context);
		const config = await Util.TaqifiedDir.create(projectDir, i18n);
		const availablePluginsNotInstalled = config.config?.plugins
			? availablePlugins.filter(name => config.config.plugins?.findIndex(p => p.name === name) === -1)
			: availablePlugins;
		const pluginName = vscode.window.showQuickPick(availablePluginsNotInstalled, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: 'Plugin name',
			title: 'Select a plugin',
		});
		return pluginName;
	};

	const promptForPluginUninstall = async (
		i18n: i18n,
		_debug: api.DebugSession | undefined,
		projectDir: Util.PathToDir,
	) => {
		const config = await Util.TaqifiedDir.create(projectDir, i18n);
		if (!config.config || !config.config.plugins || !config.config.plugins.length) {
			return undefined;
		}
		const pluginNames = config.config.plugins.map(plugin => plugin.name);
		const selectedPluginName = await vscode.window.showQuickPick(pluginNames, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: 'Plugin name',
			title: 'Select a plugin',
		});
		return selectedPluginName;
	};

	const promptForScaffoldSelection = (_i18n: i18n, _debug: api.DebugSession | undefined, availablePlugins: string[]) =>
		vscode.window.showQuickPick(availablePlugins, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: 'Plugin name',
			title: 'Select a plugin',
		});

	const promptForTaqProject = (_i18n: i18n, availableProjects: readonly string[]) =>
		vscode.window.showQuickPick(availableProjects, {
			canPickMany: false,
			ignoreFocusOut: false,
			title: 'Select a project',
			placeHolder: 'Directory',
		});

	const getWellKnownPlugins = () => [
		'@taqueria/plugin-ligo',
		'@taqueria/plugin-smartpy',
		'@taqueria/plugin-taquito',
		'@taqueria/plugin-flextesa',
		'@taqueria/plugin-archetype',
		'@taqueria/plugin-contract-types',
		'@taqueria/plugin-tezos-client',
		'@taqueria/plugin-jest',
	];

	const getAvailablePlugins = async (context: api.ExtensionContext) => {
		try {
			const HOME_DIR = process.env.HOME;
			if (HOME_DIR) {
				const availablePluginsFile = join(HOME_DIR, 'taqueria-plugins.json');
				const contents = await readFile(availablePluginsFile, { encoding: 'utf-8' });
				const decoded = JSON.parse(contents);
				return decoded as string[];
			}
		} catch {
			// Ignore
		}
		return getWellKnownPlugins();
	};

	const getAvailableScaffolds = async (context: api.ExtensionContext) => {
		return [
			{
				name: 'Quick Start',
				url: 'https://github.com/ecadlabs/taqueria-scaffold-quickstart',
			},
			{
				name: 'Demo',
				url: 'https://github.com/ecadlabs/taqueria-scaffold-demo',
			},
			{
				name: 'Taco Shop',
				url: 'https://github.com/ecadlabs/taqueria-scaffold-taco-shop',
			},
			{
				name: 'Hello Tacos Tutorial',
				url: 'https://github.com/ecadlabs/taqueria-scaffold-hello-tacos-tutorial',
			},
		];
	};

	const exposeInstallTask = async (
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) => {
		const exposeTask = exposeTaskAsCommand(context, output, i18n);
		const proxyInstall = (pluginName: string, pathToTaq: Util.PathToTaq, i18n: i18n, projectDir?: Util.PathToDir) =>
			Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)(`install ${pluginName}`)
				.then(notify)
				.catch(showError);

		await exposeTask(Commands.install, async (pathToTaq: Util.PathToTaq) => {
			const projectDir = await getFolderForTasksOnTaqifiedFolders('install', context, output, folders, i18n);
			if (projectDir === undefined) {
				return;
			}
			const pluginName = await promptForPluginInstallation(i18n, api.debug.activeDebugSession, context, projectDir);
			if (!pluginName) {
				return;
			}
			await proxyInstall(pluginName, pathToTaq, i18n, projectDir);
		});
	};

	const exposeUninstallTask = async (
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) => {
		const exposeTask = exposeTaskAsCommand(context, output, i18n);
		const proxyUninstall = (pluginName: string, pathToTaq: Util.PathToTaq, i18n: i18n, projectDir?: Util.PathToDir) =>
			Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)(`uninstall ${pluginName}`)
				.then(notify)
				.catch(showError);

		exposeTask(Commands.uninstall, async (pathToTaq: Util.PathToTaq) => {
			const projectDir = await getFolderForTasksOnTaqifiedFolders('install', context, output, folders, i18n);
			if (projectDir === undefined) {
				return;
			}
			const pluginName = await promptForPluginUninstall(i18n, api.debug.activeDebugSession, projectDir);
			if (!pluginName) {
				return;
			}
			await proxyUninstall(pluginName, pathToTaq, i18n, projectDir);
		});
	};

	const exposeOriginateTask = async (
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) => {
		const exposeTask = exposeTaskAsCommand(context, output, i18n);
		const proxyOriginate = (
			pathToTaq: Util.PathToTaq,
			i18n: i18n,
			projectDir?: Util.PathToDir,
			environmentName?: string,
		) =>
			Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)(`originate -e ${environmentName}`)
				.then(msg => {
					showOutput(output)(OutputLevels.output, msg);
					notify('Origination Succeeded');
				})
				.catch(err => {
					showOutput(output)(OutputLevels.error, '\nError(s) occurred while trying to originate contract(s):');
					logAllNestedErrors(err, output);
					showError({
						kind: 'E_EXEC',
						msg: 'Origination Failed, see the output window for details.',
					});
				});

		exposeTask(Commands.originate, async (pathToTaq: Util.PathToTaq) => {
			const projectDir = await getFolderForTasksOnTaqifiedFolders('install', context, output, folders, i18n);
			if (projectDir === undefined) {
				return;
			}
			const config = await Util.TaqifiedDir.create(projectDir, i18n);
			const environmentNames = [...Object.keys(config.config?.environment ?? {})].filter(x => x !== 'default');
			const environmentName = await vscode.window.showQuickPick(environmentNames, {
				canPickMany: false,
				ignoreFocusOut: false,
				placeHolder: 'Environment Name',
				title: 'Select an environment',
			});
			if (!environmentName) {
				return;
			}
			await proxyOriginate(pathToTaq, i18n, projectDir, environmentName);
		});
	};

	const taskNameToCmdId = (taskName: string) => 'taqueria.' + taskName.replace(/\s+/g, '_');

	const exposeTasksFromProject = (
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) =>
		(projectDir: Util.PathToDir) => {
			getTaqBinPath(i18n, output)
				.then(pathToTaq => Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)('list-known-tasks'))
				.then(data => Util.decodeJson<EphemeralState>(data))
				.then(state => {
					// const cmdId = taskNameToCmdId(taskName)
					return state;
				});
		};

	const exposeTasksFromState = (
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) =>
		getTaqifiedDirectories(folders, i18n)
			.then(projectDirs =>
				Promise.all(
					projectDirs.map(
						// TODO: Reconcile the list of tasks that were exposed with the extension manifest file
						// If there are changes to the manifest file, prompt to reload
						exposeTasksFromProject(context, output, folders, i18n),
					),
				)
			);

	const getTaqBinPath = (i18n: i18n, output: Output) => {
		const providedPath = vscode.workspace.getConfiguration('taqueria').get('path', '');
		return providedPath && (providedPath as string).length > 0
			? Util.makePathToTaq(i18n, showOutput(output))(providedPath)
			: Util.findTaqBinary(i18n, showOutput(output))
				.then(Util.makePathToTaq(i18n, showOutput(output)));
	};

	const addCommand = (context: api.ExtensionContext) =>
		(cmdId: string, handler: () => Promise<void>) => {
			context.subscriptions.push(
				vscode.commands.registerCommand(cmdId, handler),
			);
		};

	const showError = (err: TaqVsxError) => {
		Util.log('Error:')(err);
		return (err.context
			? vscode.window.showErrorMessage(err.msg, err.context)
			: vscode.window.showErrorMessage(err.msg))
			.then(_ => Promise.resolve()) as Promise<void>;
	};

	const notify = (msg: string) =>
		vscode.window.showInformationMessage(msg)
			.then(_ => Promise.resolve()) as Promise<void>;

	const logAllNestedErrors = (err: TaqVsxError | TaqError | Error | unknown, output: Output) => {
		try {
			if (!err) {
				return;
			}
			if (!shouldOutput(OutputLevels.error, output.logLevel)) {
				return;
			}
			output.outputChannel.appendLine(JSON.stringify(err, undefined, 4));
			output.outputChannel.show();
		} catch {
			try {
				output.outputChannel.appendLine(`unknown error occurred while trying to log an error.`);
			} catch {
				// at this point, we cannot do anything
			}
		}
	};

	const showOutput = (output: Output) =>
		(currentOutputLevel: OutputLevels, data: string) => {
			if (!shouldOutput(currentOutputLevel, output.logLevel)) {
				return;
			}
			// TODO: We might need to separate the output pane from logs pane.
			// For now, this is just a quick update to improve debugging
			// .then(_ => output.clear())
			output.outputChannel.appendLine(data);
			if (currentOutputLevel === OutputLevels.output) {
				output.outputChannel.show();
			}
		};

	const getSandboxNames = (projectDir: Util.TaqifiedDir) =>
		projectDir.config.sandbox
			? Object.keys(projectDir.config.sandbox)
			: [];

	const exposeTaqTaskAsCommand = (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir?: Util.PathToDir,
	) =>
		(cmdId: string, taskWithArgs: string, outputTo: 'output' | 'notify', otherNotification?: string) =>
			exposeTaskAsCommand(context, output, i18n, projectDir)(
				cmdId,
				(pathToTaq: Util.PathToTaq) =>
					Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)(taskWithArgs)
						.then(stdout =>
							outputTo === 'output'
								? showOutput(output)(OutputLevels.output, stdout)
								: notify(stdout)
						)
						.then(_ => {
							if (otherNotification) notify(otherNotification);
						}),
			);

	const exposeTaskAsCommand = (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir?: Util.PathToDir,
	) =>
		(cmdId: string, handler: ((pathToTaq: Util.PathToTaq) => Promise<void>)) =>
			addCommand(context)(
				cmdId,
				() =>
					getTaqBinPath(i18n, output)
						.then(handler)
						.catch(showError),
			);

	const exposeSandboxTaskAsCommand = (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir: Util.PathToDir,
	) =>
		(cmdId: string, taskName: string, outputTo: 'output' | 'notify', otherNotification?: string) => {
			const exposeTask = exposeTaskAsCommand(context, output, i18n, projectDir);
			return exposeTask(
				cmdId,
				pathToTaq =>
					Util.TaqifiedDir.create(projectDir, i18n)
						.then(getSandboxNames)
						.then(items =>
							vscode.window.showQuickPick(items, {
								canPickMany: false,
								ignoreFocusOut: false,
								placeHolder: 'Sandbox name',
								title: 'Select a sandbox',
							})
						)
						.then(sandboxName =>
							(sandboxName
								? Util.proxyToTaq(pathToTaq, i18n, showOutput(output), projectDir)(`${taskName} ${sandboxName}`)
									.then(stdout =>
										outputTo === 'output'
											? showOutput(output)(OutputLevels.output, stdout)
											: notify(stdout)
									)
									.then(_ => {
										if (otherNotification) notify(otherNotification);
									})
								: Promise.resolve()) as Promise<void>
						)
						.catch(showError),
			);
		};

	const updateCommandStates = async (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir: Util.PathToDir,
	) => {
		showOutput(output)(OutputLevels.debug, 'Project config changed, updating command states...');
		let taqFolderFound: boolean;
		try {
			Util.makeDir(join(projectDir, '.taq'), i18n);
			showOutput(output)(OutputLevels.debug, 'Taq folder is found');
			taqFolderFound = true;
		} catch {
			showOutput(output)(OutputLevels.debug, 'Taq folder not found');
			taqFolderFound = false;
		}
		let enableAllCommands: boolean;
		let config: Util.TaqifiedDir | null;
		try {
			config = await Util.TaqifiedDir.create(projectDir, i18n);
			enableAllCommands = false;
		} catch (e: any) {
			config = null;
			enableAllCommands = true;
			// We don't want to show messages to users when they are working with non-taqified folders (Except when output level is set to info or more verbose)
			if (shouldOutput(OutputLevels.info, output.logLevel) || taqFolderFound) {
				vscode.commands.executeCommand('setContext', '@taqueria-state/enable-all-commands', true);
				showOutput(output)(OutputLevels.error, 'Error: Could not update command states, enabling all commands:');
				logAllNestedErrors(e, output);
			}
		}
		const availablePlugins = await getAvailablePlugins(context);
		const availablePluginsNotInstalled = config?.config?.plugins
			? availablePlugins.filter(name => config?.config.plugins?.findIndex(p => p.name === name) === -1)
			: availablePlugins;
		showOutput(output)(OutputLevels.debug, `@taqueria-state/is-taqified: ${!!config?.config}`);
		vscode.commands.executeCommand('setContext', '@taqueria-state/is-taqified', enableAllCommands || !!config?.config);
		vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/installed-plugin-count',
			enableAllCommands ? 1 : config?.config?.plugins?.length ?? 0,
		);
		vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/not-installed-plugin-count',
			enableAllCommands ? 1 : availablePluginsNotInstalled.length,
		);
		const plugins = getWellKnownPlugins();
		showOutput(output)(OutputLevels.debug, `Known plugins: ${JSON.stringify(plugins)}`);
		for (const plugin of plugins) {
			const found = config?.config?.plugins?.find(item => item.name === plugin) !== undefined;
			showOutput(output)(OutputLevels.debug, `plugins ${plugin}: ${found}`);
			vscode.commands.executeCommand('setContext', plugin, enableAllCommands || found);
		}
	};

	const createWatcherIfNotExists = (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir: Util.PathToDir,
		addConfigWatcherIfNotExists: (folder: string, factory: () => api.FileSystemWatcher) => void,
	) => {
		showOutput(output)(OutputLevels.debug, `Directory ${projectDir} should be watched.`);
		addConfigWatcherIfNotExists(projectDir, () => {
			showOutput(output)(OutputLevels.info, `Adding watcher for directory ${projectDir}.`);
			try {
				updateCommandStates(context, output, i18n, projectDir);
			} catch (error: any) {
				logAllNestedErrors(error, output);
			}
			try {
				// TODO: this does not trigger when .taq	folder is deleted.
				const watcher = vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/config.json'));
				// TODO: We should detect the event that VsCode's current Folder is changed and the watcher should be disposed

				// TODO: Is passing these arguments to the callback of a long lived watcher prevent GC? Are these short lived objects?
				watcher.onDidChange((e: api.Uri) => updateCommandStates(context, output, i18n, projectDir));
				watcher.onDidCreate((e: api.Uri) => updateCommandStates(context, output, i18n, projectDir));
				watcher.onDidDelete((e: api.Uri) => updateCommandStates(context, output, i18n, projectDir));
				return watcher;
			} catch (error: unknown) {
				throw {
					kind: 'E_UnknownError',
					msg: `Unexpected error occurred while trying to watch ${join(projectDir, '.taq/config.json')}`,
					context: projectDir,
					previous: error,
				} as TaqVsxError;
			}
		});
	};

	return {
		exposeInitTask,
		exposeScaffoldTask,
		getTaqifiedDirectories,
		promptForPluginInstallation,
		promptForTaqProject,
		exposeInstallTask,
		exposeUninstallTask,
		exposeOriginateTask,
		taskNameToCmdId,
		exposeTasksFromProject,
		exposeTasksFromState,
		getTaqBinPath,
		addCommand,
		showError,
		notify,
		showOutput,
		getSandboxNames,
		exposeTaqTaskAsCommand,
		exposeTaskAsCommand,
		exposeSandboxTaskAsCommand,
		updateCommandStates,
		createWatcherIfNotExists,
		logAllNestedErrors,
	};
};
