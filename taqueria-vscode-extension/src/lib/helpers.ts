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

	const exposeInitTask = async (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		folders: readonly api.WorkspaceFolder[],
	) => {
		addCommand(context)(Commands.init, async () => {
			const uri = await getFolderForScaffolding(context, output, i18n, folders);
			if (uri === undefined) {
				return;
			}
			getTaqBinPath(i18n)
				.then(pathToTaq => Util.proxyToTaq(pathToTaq, i18n, undefined)(`init ${uri.path}`))
				.then(_ => vscode.window.showInformationMessage("Project taq'fied!", uri.path))
				.then(_ => vscode.workspace.updateWorkspaceFolders(0, undefined, { uri }))
				.then(console.log);
		});
	};

	const exposeScaffoldTask = async (
		context: api.ExtensionContext,
		output: api.OutputChannel,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) => {
		const exposeTask = exposeTaskAsCommand(context, output, i18n);
		const availableScaffolds: { name: string; url: string }[] = await getAvailableScaffolds(context);
		const proxyScaffold = (scaffoldUrl: string, pathToTaq: Util.PathToTaq, i18n: i18n, projectDir?: Util.PathToDir) =>
			Util.proxyToTaq(pathToTaq, i18n, projectDir)(`scaffold ${scaffoldUrl}`)
				.then(notify)
				.catch(err => logAllNestedErrors(err, output));

		return exposeTask(Commands.scaffold, async (pathToTaq: Util.PathToTaq) => {
			const projectUri = await getFolderForScaffolding(context, output, i18n, folders);
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
			return proxyScaffold(scaffoldUrl, pathToTaq, i18n, projectUri.path as Util.PathToDir);
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

	const getFolderForScaffolding = async (
		context: api.ExtensionContext,
		output: api.OutputChannel,
		i18n: i18n,
		folders: readonly api.WorkspaceFolder[],
	) => {
		let uris: api.Uri[] | undefined = folders.map(folder => folder.uri);
		if (uris.length === 0) {
			uris = await vscode.window.showOpenDialog({
				canSelectFolders: true,
				canSelectFiles: false,
				openLabel: 'Select project folder',
				title: 'Select a project folder to scaffold into',
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
			console.log('Coming soon!');
			return undefined;
		}
	};

	const promptForPluginSelection = (_i18n: i18n, _debug: api.DebugSession | undefined, availablePlugins: string[]) =>
		vscode.window.showQuickPick(availablePlugins, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: 'Plugin name',
			title: 'Select a plugin',
		});

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
		const availablePlugins = await getAvailablePlugins(context);
		const proxyInstall = (pluginName: string, pathToTaq: Util.PathToTaq, i18n: i18n, projectDir?: Util.PathToDir) =>
			Util.proxyToTaq(pathToTaq, i18n, projectDir)(`install ${pluginName}`)
				.then(notify)
				.catch(showError);

		return exposeTask(Commands.install, (pathToTaq: Util.PathToTaq) =>
			getTaqifiedDirectories(folders, i18n)
				.then(results => {
					// The developer has no taqified workspace folders. As such,
					// we cannot install any plugins
					if (results.length === 0) {
						return addCommand(context)(Commands.install, () =>
							showError({
								kind: 'E_NO_TAQUERIA_PROJECTS',
								msg:
									"You don't have any Taqueria projects. You'll need to taq'ify a project using \"Taqueria: Init\" before you can install a plugin.",
							}));
					} // The developer has a single taqified workspace folder, so we know
					// exactly where to install a plugin
					else if (results.length === 1) {
						const projectDir = results[0];
						return promptForPluginSelection(i18n, api.debug.activeDebugSession, availablePlugins)
							.then(pluginName => {
								if (pluginName) {
									return proxyInstall(pluginName, pathToTaq, i18n, projectDir);
								}
							});
					} // The developer has multiple
					else {
						return promptForTaqProject(i18n, results)
							.then(selectedDir => {
								if (selectedDir) {
									return Util.makeDir(selectedDir, i18n)
										.then(projectDir =>
											promptForPluginSelection(i18n, api.debug.activeDebugSession, availablePlugins)
												.then(pluginName => {
													if (pluginName) return proxyInstall(pluginName, pathToTaq, i18n, projectDir);
												})
										);
								}
							});
					}
				}));
	};

	const taskNameToCmdId = (taskName: string) => 'taqueria.' + taskName.replace(/\s+/g, '_');

	const exposeTasksFromProject = (
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) =>
		(projectDir: Util.PathToDir) => {
			getTaqBinPath(i18n)
				.then(pathToTaq => Util.proxyToTaq(pathToTaq, i18n, projectDir)('list-known-tasks'))
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

	const getTaqBinPath = (i18n: i18n) => {
		const providedPath = vscode.workspace.getConfiguration('taqueria').get('path', '');
		return providedPath && (providedPath as string).length > 0
			? Util.makePathToTaq(i18n)(providedPath)
			: Util.findTaqBinary(i18n)
				.then(Util.makePathToTaq(i18n));
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

	const logAllNestedErrors = (err: TaqVsxError | TaqError | Error | any, output: api.OutputChannel) => {
		if (!err) {
			return;
		}
		const message = getErrorMessage(err);
		output.appendLine(message);
		if ('previous' in err) {
			logAllNestedErrors(err.previous, output);
		}
		if ('cause' in err) {
			logAllNestedErrors(err.cause, output);
		}
	};

	const getErrorMessage = (err: any) => {
		let text = '';
		if ('kind' in err) {
			text += err.kind + ': ';
		}
		if ('msg' in err) {
			text += err.msg;
		}
		if ('message' in err) {
			text += err.message;
		}
		return text;
	};

	const notify = (msg: string) =>
		vscode.window.showInformationMessage(msg)
			.then(_ => Promise.resolve()) as Promise<void>;

	const showOutput = (output: Output, currentOutputLevel: OutputLevels) =>
		(data: string) => {
			if (!shouldOutput(currentOutputLevel, output.logLevel)) {
				return;
			}
			Promise.resolve()
				// TODO: We might need to separate the output pane from logs pane.
				// For now, this is just a quick update to improve debugging
				// .then(_ => output.clear())
				.then(_ => output.outputChannel.appendLine(data))
				.then(_ => output.outputChannel.show());
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
					Util.proxyToTaq(pathToTaq, i18n, projectDir)(taskWithArgs)
						.then(stdout =>
							outputTo === 'output'
								? showOutput(output, OutputLevels.output)(stdout)
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
					getTaqBinPath(i18n)
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
								? Util.proxyToTaq(pathToTaq, i18n, projectDir)(`${taskName} ${sandboxName}`)
									.then(stdout =>
										outputTo === 'output'
											? showOutput(output, OutputLevels.output)(stdout)
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
		try {
			const config = await Util.TaqifiedDir.create(projectDir, i18n);
			vscode.commands.executeCommand('setContext', '@taqueria-state/is-taqified', !!config.config);
			const plugins = getWellKnownPlugins();
			for (const plugin of plugins) {
				const found = config.config.plugins?.find(item => item.name === plugin) !== undefined;
				vscode.commands.executeCommand('setContext', plugin, found);
			}
		} catch (e: any) {
			// After logging PR is merged, log this error
		}
	};

	const createWatcherIfNotExists = (
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir: Util.PathToDir,
		addConfigWatcherIfNotExists: (folder: string, factory: () => api.FileSystemWatcher) => void,
	) => {
		addConfigWatcherIfNotExists(projectDir, () => {
			const watcher = vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/config.json'));
			// TODO: We should detect the event that VsCode's current Folder is changed and the watcher should be disposed

			updateCommandStates(context, output, i18n, projectDir);

			// TODO: Is passing these arguments to the callback of a long lived watcher prevent GC? Are these short lived objects?
			watcher.onDidChange((e: api.Uri) => updateCommandStates(context, output, i18n, projectDir));
			watcher.onDidCreate((e: api.Uri) => updateCommandStates(context, output, i18n, projectDir));
			watcher.onDidDelete((e: api.Uri) => updateCommandStates(context, output, i18n, projectDir));
			return watcher;
		});
	};

	return {
		exposeInitTask,
		exposeScaffoldTask,
		getTaqifiedDirectories,
		promptForPluginSelection,
		promptForTaqProject,
		exposeInstallTask,
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
	};
};
