import { EphemeralState } from '@taqueria/protocol/EphemeralState';
import { i18n } from '@taqueria/protocol/i18n';
import { TaqError } from '@taqueria/protocol/TaqError';
import { readFile } from 'fs/promises';
import { stat } from 'fs/promises';
import { join } from 'path';
import * as api from 'vscode';
import { PluginsDataProvider, PluginTreeItem } from './gui/PluginDataProvider';
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

export class VsCodeHelper {
	private vscode: VSCodeAPI;
	constructor(private deps: InjectedDependencies) {
		this.vscode = deps.vscode;
	}

	exposeInitTask(
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		folders: readonly api.WorkspaceFolder[],
	) {
		this.addCommand(context)(Commands.init, async () => {
			const uri = await this.getFolderForInitOrScaffold('init', context, output, i18n, folders);
			if (uri === undefined) {
				return;
			}
			this.getTaqBinPath(i18n, output)
				.then(pathToTaq =>
					Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), undefined)(`init ${uri.path}`)
						.then(() =>
							Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), uri.path as Util.PathToDir)(``)
								.catch(() => Promise.resolve())
						)
						.then(() => this.updateCommandStates(context, output, i18n, uri.path as Util.PathToDir))
				)
				.then(_ => this.vscode.window.showInformationMessage("Project taq'fied!", uri.path))
				.then(_ => this.vscode.workspace.updateWorkspaceFolders(0, undefined, { uri }))
				.then(console.log)
				.catch(e => this.logAllNestedErrors(e, output));
		});
	}

	async exposeScaffoldTask(
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) {
		const exposeTask = this.exposeTaskAsCommand(context, output, i18n);
		const availableScaffolds: { name: string; url: string }[] = await this.getAvailableScaffolds(context);
		const proxyScaffold = (scaffoldUrl: string, pathToTaq: Util.PathToTaq, i18n: i18n, projectDir: Util.PathToDir) =>
			Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), projectDir)(`scaffold ${scaffoldUrl} ${projectDir}`)
				.then(() =>
					Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), projectDir)(``)
						.catch(() => Promise.resolve())
				).then(() => this.updateCommandStates(context, output, i18n, projectDir))
				.catch(err => this.logAllNestedErrors(err, output));

		return exposeTask(Commands.scaffold, async (pathToTaq: Util.PathToTaq) => {
			const projectUri = await this.getFolderForInitOrScaffold('scaffold', context, output, i18n, folders);
			if (projectUri === undefined) {
				return;
			}
			const scaffold = await this.promptForScaffoldSelection(
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
			this.vscode.window.showInformationMessage('Scaffold completed!', projectUri.path);
		});
	}

	getTaqifiedDirectories(folders: readonly api.WorkspaceFolder[], i18n: i18n) {
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
	}

	async getFolderForInitOrScaffold(
		taskTitle: string,
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		folders: readonly api.WorkspaceFolder[],
	) {
		let uris: api.Uri[] | undefined = folders.map(folder => folder.uri);
		if (uris.length === 0) {
			uris = await this.vscode.window.showOpenDialog({
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
			this.showOutput(output)(
				OutputLevels.warn,
				`Error: running ${taskTitle} with multiple open folders is not yet implemented.`,
			);
			return undefined;
		}
	}

	async getFolderForTasksOnTaqifiedFolders(
		taskTitle: string,
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) {
		const taqifiedDirectories = await this.getTaqifiedDirectories(folders, i18n);

		// The developer has no taqified workspace folders. As such,
		// we cannot proceed
		if (taqifiedDirectories.length === 0) {
			this.showError({
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
		const selectedDir = await this.promptForTaqProject(i18n, taqifiedDirectories);
		if (!selectedDir) {
			return undefined;
		}
		return await Util.makeDir(selectedDir, i18n);
	}

	async promptForPluginInstallation(
		i18n: i18n,
		_debug: api.DebugSession | undefined,
		context: api.ExtensionContext,
		projectDir: Util.PathToDir,
	) {
		const availablePlugins = await this.getAvailablePlugins(context);
		const config = await Util.TaqifiedDir.create(projectDir, i18n);
		const availablePluginsNotInstalled = config.config?.plugins
			? availablePlugins.filter(name => config.config.plugins?.findIndex(p => p.name === name) === -1)
			: availablePlugins;
		const pluginName = this.vscode.window.showQuickPick(availablePluginsNotInstalled, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: 'Plugin name',
			title: 'Select a plugin',
		});
		return pluginName;
	}

	async promptForPluginUninstall(
		i18n: i18n,
		_debug: api.DebugSession | undefined,
		projectDir: Util.PathToDir,
	) {
		const config = await Util.TaqifiedDir.create(projectDir, i18n);
		if (!config.config || !config.config.plugins || !config.config.plugins.length) {
			return undefined;
		}
		const pluginNames = config.config.plugins.map(plugin => plugin.name);
		const selectedPluginName = await this.vscode.window.showQuickPick(pluginNames, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: 'Plugin name',
			title: 'Select a plugin',
		});
		return selectedPluginName;
	}

	promptForScaffoldSelection(_i18n: i18n, _debug: api.DebugSession | undefined, availablePlugins: string[]) {
		return this.vscode.window.showQuickPick(availablePlugins, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: 'Plugin name',
			title: 'Select a plugin',
		});
	}

	promptForTaqProject(_i18n: i18n, availableProjects: readonly string[]) {
		return this.vscode.window.showQuickPick(availableProjects, {
			canPickMany: false,
			ignoreFocusOut: false,
			title: 'Select a project',
			placeHolder: 'Directory',
		});
	}

	getWellKnownPlugins() {
		return [
			'@taqueria/plugin-ligo',
			'@taqueria/plugin-smartpy',
			'@taqueria/plugin-taquito',
			'@taqueria/plugin-flextesa',
			'@taqueria/plugin-archetype',
			'@taqueria/plugin-contract-types',
			'@taqueria/plugin-tezos-client',
			'@taqueria/plugin-jest',
		];
	}

	async getAvailablePlugins(context: api.ExtensionContext) {
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
		return this.getWellKnownPlugins();
	}

	async getAvailableScaffolds(context: api.ExtensionContext) {
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
	}

	async exposeInstallTask(
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) {
		context.subscriptions.push(
			this.vscode.commands.registerCommand(Commands.install, async (pluginInfo?: PluginTreeItem | undefined) => {
				const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install', context, output, folders, i18n);
				if (projectDir === undefined) {
					return;
				}
				let pluginName = pluginInfo?.label;
				if (!pluginName) {
					pluginName = await this.promptForPluginInstallation(
						i18n,
						api.debug.activeDebugSession,
						context,
						projectDir,
					);
				}
				if (!pluginName) {
					return;
				}
				try {
					const pathToTaq = await this.getTaqBinPath(i18n, output);
					const message = await Util.proxyToTaq(
						pathToTaq,
						i18n,
						(level, log) => this.showOutput(output)(level, log),
						projectDir,
					)(`install ${pluginName}`);
					this.notify(message);
				} catch (e: any) {
					this.showError(e);
				}
			}),
		);
	}

	async exposeUninstallTask(
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) {
		context.subscriptions.push(
			this.vscode.commands.registerCommand(Commands.uninstall, async (pluginInfo?: PluginTreeItem | undefined) => {
				const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install', context, output, folders, i18n);
				if (projectDir === undefined) {
					return;
				}
				let pluginName = pluginInfo?.label;
				if (!pluginName) {
					pluginName = await this.promptForPluginUninstall(i18n, api.debug.activeDebugSession, projectDir);
				}
				if (!pluginName) {
					return;
				}
				try {
					const pathToTaq = await this.getTaqBinPath(i18n, output);
					const message = await Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), projectDir)(
						`uninstall ${pluginName}`,
					);
					this.notify(message);
				} catch (e: any) {
					this.showError(e);
				}
			}),
		);
	}

	async exposeOriginateTask(
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) {
		const exposeTask = this.exposeTaskAsCommand(context, output, i18n);
		const proxyOriginate = (
			pathToTaq: Util.PathToTaq,
			i18n: i18n,
			projectDir?: Util.PathToDir,
			environmentName?: string,
		) =>
			Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), projectDir)(`originate -e ${environmentName}`)
				.then(msg => {
					this.showOutput(output)(OutputLevels.output, msg);
					this.notify('Origination Succeeded');
				})
				.catch(err => {
					this.showOutput(output)(OutputLevels.error, '\nError(s) occurred while trying to originate contract(s):');
					this.logAllNestedErrors(err, output);
					this.showError({
						kind: 'E_EXEC',
						msg: 'Origination Failed, see the output window for details.',
					});
				});

		exposeTask(Commands.originate, async (pathToTaq: Util.PathToTaq) => {
			const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install', context, output, folders, i18n);
			if (projectDir === undefined) {
				return;
			}
			const config = await Util.TaqifiedDir.create(projectDir, i18n);
			const environmentNames = [...Object.keys(config.config?.environment ?? {})].filter(x => x !== 'default');
			const environmentName = await this.vscode.window.showQuickPick(environmentNames, {
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
	}

	taskNameToCmdId(taskName: string) {
		return 'taqueria.' + taskName.replace(/\s+/g, '_');
	}

	exposeTasksFromProject(
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) {
		return (projectDir: Util.PathToDir) => {
			this.getTaqBinPath(i18n, output)
				.then(pathToTaq => Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), projectDir)('list-known-tasks'))
				.then(data => Util.decodeJson<EphemeralState>(data))
				.then(state => {
					// const cmdId = taskNameToCmdId(taskName)
					return state;
				});
		};
	}

	exposeTasksFromState(
		context: api.ExtensionContext,
		output: Output,
		folders: readonly api.WorkspaceFolder[],
		i18n: i18n,
	) {
		return this.getTaqifiedDirectories(folders, i18n)
			.then(projectDirs =>
				Promise.all(
					projectDirs.map(
						// TODO: Reconcile the list of tasks that were exposed with the extension manifest file
						// If there are changes to the manifest file, prompt to reload
						this.exposeTasksFromProject(context, output, folders, i18n),
					),
				)
			);
	}

	getTaqBinPath(i18n: i18n, output: Output) {
		const providedPath = this.vscode.workspace.getConfiguration('taqueria').get('path', '');
		return providedPath && (providedPath as string).length > 0
			? Util.makePathToTaq(i18n, this.showOutput(output))(providedPath)
			: Util.findTaqBinary(i18n, this.showOutput(output))
				.then(Util.makePathToTaq(i18n, this.showOutput(output)));
	}

	addCommand(context: api.ExtensionContext) {
		return (cmdId: string, handler: () => Promise<void>) => {
			context.subscriptions.push(
				this.vscode.commands.registerCommand(cmdId, handler),
			);
		};
	}

	showError(err: TaqVsxError) {
		Util.log('Error:')(err);
		return (err.context
			? this.vscode.window.showErrorMessage(err.msg, err.context)
			: this.vscode.window.showErrorMessage(err.msg))
			.then(_ => Promise.resolve()) as Promise<void>;
	}

	notify(msg: string) {
		return this.vscode.window.showInformationMessage(msg)
			.then(_ => Promise.resolve()) as Promise<void>;
	}

	logAllNestedErrors(err: TaqVsxError | TaqError | Error | unknown, output: Output) {
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
	}

	showOutput(output: Output) {
		return (currentOutputLevel: OutputLevels, data: string) => {
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
	}

	getSandboxNames(projectDir: Util.TaqifiedDir) {
		return projectDir.config.sandbox
			? Object.keys(projectDir.config.sandbox)
			: [];
	}

	exposeTaqTaskAsCommand(
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir?: Util.PathToDir,
	) {
		return (cmdId: string, taskWithArgs: string, outputTo: 'output' | 'notify', otherNotification?: string) =>
			this.exposeTaskAsCommand(context, output, i18n, projectDir)(
				cmdId,
				(pathToTaq: Util.PathToTaq) =>
					Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), projectDir)(taskWithArgs)
						.then(stdout =>
							outputTo === 'output'
								? this.showOutput(output)(OutputLevels.output, stdout)
								: this.notify(stdout)
						)
						.then(_ => {
							if (otherNotification) this.notify(otherNotification);
						}),
			);
	}

	exposeTaskAsCommand(
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir?: Util.PathToDir,
	) {
		return (cmdId: string, handler: ((pathToTaq: Util.PathToTaq) => Promise<void>)) =>
			this.addCommand(context)(
				cmdId,
				() =>
					this.getTaqBinPath(i18n, output)
						.then(handler)
						.catch(this.showError),
			);
	}

	exposeSandboxTaskAsCommand(
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir: Util.PathToDir,
	) {
		return (cmdId: string, taskName: string, outputTo: 'output' | 'notify', otherNotification?: string) => {
			const exposeTask = this.exposeTaskAsCommand(context, output, i18n, projectDir);
			return exposeTask(
				cmdId,
				pathToTaq =>
					Util.TaqifiedDir.create(projectDir, i18n)
						.then(this.getSandboxNames)
						.then(items =>
							this.vscode.window.showQuickPick(items, {
								canPickMany: false,
								ignoreFocusOut: false,
								placeHolder: 'Sandbox name',
								title: 'Select a sandbox',
							})
						)
						.then(sandboxName =>
							(sandboxName
								? Util.proxyToTaq(pathToTaq, i18n, this.showOutput(output), projectDir)(`${taskName} ${sandboxName}`)
									.then(stdout =>
										outputTo === 'output'
											? this.showOutput(output)(OutputLevels.output, stdout)
											: this.notify(stdout)
									)
									.then(_ => {
										if (otherNotification) this.notify(otherNotification);
									})
								: Promise.resolve()) as Promise<void>
						)
						.catch(this.showError),
			);
		};
	}

	async updateCommandStates(
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir: Util.PathToDir,
	) {
		this.dataProviders.forEach(dataProvider => dataProvider.refresh());

		this.showOutput(output)(OutputLevels.debug, 'Project config changed, updating command states...');
		let taqFolderFound: boolean;
		try {
			await Util.makeDir(join(projectDir, '.taq'), i18n);
			this.showOutput(output)(OutputLevels.debug, 'Taq folder is found');
			taqFolderFound = true;
		} catch {
			taqFolderFound = false;
			this.showOutput(output)(OutputLevels.debug, 'Taq folder not found');
		}
		let enableAllCommands: boolean;
		let config: Util.TaqifiedDir | null;
		try {
			config = await Util.TaqifiedDir.create(projectDir, i18n);
			enableAllCommands = false;
		} catch (e: unknown) {
			config = null;
			enableAllCommands = taqFolderFound;
			// We don't want to show messages to users when they are working with non-taqified folders (Except when output level is set to info or more verbose)
			if (shouldOutput(OutputLevels.info, output.logLevel) || taqFolderFound) {
				this.vscode.commands.executeCommand('setContext', '@taqueria-state/enable-all-commands', true);
				this.showOutput(output)(OutputLevels.error, 'Error: Could not update command states:');
				this.logAllNestedErrors(e, output);
				if (taqFolderFound) {
					this.showOutput(output)(
						OutputLevels.warn,
						'The Taqueria config for this project could not be loaded. All Taqueria commands will be temporarily enabled.\nPlease check for errors in the .taq/config.json file\n',
					);
				}
			}
		}
		const availablePlugins = await this.getAvailablePlugins(context);
		const availablePluginsNotInstalled = config?.config?.plugins
			? availablePlugins.filter(name => config?.config.plugins?.findIndex(p => p.name === name) === -1)
			: availablePlugins;
		this.showOutput(output)(
			OutputLevels.debug,
			`@taqueria-state/enable-init-scaffold: ${enableAllCommands || !config?.config}`,
		);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/enable-init-scaffold',
			enableAllCommands || !config?.config,
		);

		this.showOutput(output)(
			OutputLevels.debug,
			`@taqueria-state/enable-install-uninstall: ${enableAllCommands || !!config?.config}`,
		);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/enable-install-uninstall',
			enableAllCommands || !!config?.config,
		);

		this.showOutput(output)(OutputLevels.debug, `@taqueria-state/is-taqified: ${!!config?.config}`);
		this.vscode.commands.executeCommand('setContext', '@taqueria-state/is-taqified', !!config?.config);

		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/installed-plugin-count',
			enableAllCommands ? 1 : config?.config?.plugins?.length ?? 0,
		);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/not-installed-plugin-count',
			enableAllCommands ? 1 : availablePluginsNotInstalled.length,
		);
		const plugins = this.getWellKnownPlugins();
		this.showOutput(output)(OutputLevels.debug, `Known plugins: ${JSON.stringify(plugins)}`);
		for (const plugin of plugins) {
			const found = config?.config?.plugins?.find(item => item.name === plugin) !== undefined;
			this.showOutput(output)(OutputLevels.debug, `plugins ${plugin}: ${found}`);
			this.vscode.commands.executeCommand('setContext', plugin, enableAllCommands || found);
		}
	}

	createWatcherIfNotExists(
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
		projectDir: Util.PathToDir,
		addConfigWatcherIfNotExists: (folder: string, factory: () => api.FileSystemWatcher[]) => void,
	) {
		this.showOutput(output)(OutputLevels.debug, `Directory ${projectDir} should be watched.`);
		addConfigWatcherIfNotExists(projectDir, () => {
			this.showOutput(output)(OutputLevels.info, `Adding watcher for directory ${projectDir}.`);
			try {
				this.updateCommandStates(context, output, i18n, projectDir);
			} catch (error: any) {
				this.logAllNestedErrors(error, output);
			}
			try {
				const folderWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq'));
				const configWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/config.json'));
				const stateWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/state.json'));

				// TODO: Is passing these arguments to the callback of a long lived watcher prevent GC? Are these short lived objects?
				folderWatcher.onDidChange((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));
				folderWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));
				folderWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));

				configWatcher.onDidChange((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));
				configWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));
				configWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));

				stateWatcher.onDidChange((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));
				stateWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));
				stateWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates(context, output, i18n, projectDir));
				return [folderWatcher, configWatcher, stateWatcher];
			} catch (error: unknown) {
				throw {
					kind: 'E_UnknownError',
					msg: `Unexpected error occurred while trying to watch ${join(projectDir, '.taq/config.json')}`,
					context: projectDir,
					previous: error,
				} as TaqVsxError;
			}
		});
	}

	private dataProviders: { refresh: () => void }[] = [];

	registerDataProviders(
		workspaceFolder: string,
		context: api.ExtensionContext,
		output: Output,
		i18n: i18n,
	) {
		const pluginsDataProvider = new PluginsDataProvider(workspaceFolder, this, i18n, output, context);
		this.vscode.window.createTreeView('taqueria-plugins', {
			treeDataProvider: pluginsDataProvider,
		});
		this.dataProviders.push(pluginsDataProvider);
	}
}
