import { EphemeralState } from '@taqueria/protocol/EphemeralState';
import loadI18n, { i18n } from '@taqueria/protocol/i18n';
import { TaqError } from '@taqueria/protocol/TaqError';
import { readFile } from 'fs/promises';
import { stat } from 'fs/promises';
import { join } from 'path';
import * as api from 'vscode';
import { PluginsDataProvider, PluginTreeItem } from './gui/PluginsDataProvider';
import { SandboxesDataProvider, SandboxTreeItem } from './gui/SandboxesDataProvider';
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

export const showOutput = (output: Output) => {
	return (currentOutputLevel: OutputLevels, data: string) => {
		if (!shouldOutput(currentOutputLevel, output.logLevel)) {
			return;
		}
		output.outputChannel.appendLine(data);
		if (currentOutputLevel === OutputLevels.output) {
			output.outputChannel.show();
		}
	};
};

function mapAsync<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
	return Promise.all(array.map(callbackfn));
}

async function filterAsync<T>(
	array: T[],
	callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
	const filterMap = await mapAsync(array, callbackfn);
	return array.filter((value, index) => filterMap[index]);
}

export class VsCodeHelper {
	private constructor(
		private context: api.ExtensionContext,
		private vscode: VSCodeAPI,
		private outputChannel: api.OutputChannel,
		private output: Output,
		private i18: i18n,
		private folders: readonly api.WorkspaceFolder[],
	) {}

	static async construct(context: api.ExtensionContext, deps: InjectedDependencies) {
		const vscode = deps.vscode;
		const logLevelText = process.env.LogLevel ?? OutputLevels[OutputLevels.warn];
		const logLevel = OutputLevels[logLevelText as keyof typeof OutputLevels] ?? OutputLevels.warn;
		const outputChannel = vscode.window.createOutputChannel('Taqueria');
		const output = {
			outputChannel,
			logLevel,
		};
		showOutput(output)(OutputLevels.info, 'the activate function was called for the Taqueria VsCode Extension.');

		const i18n = await loadI18n();

		const folders = vscode.workspace.workspaceFolders
			? vscode.workspace.workspaceFolders
			: [];

		return new VsCodeHelper(context, vscode, outputChannel, output, i18n, folders);
	}

	get i18n() {
		return this.i18;
	}

	getFolders() {
		return this.folders;
	}

	getOutput() {
		return showOutput(this.output);
	}

	showOutput(currentOutputLevel: OutputLevels, data: string) {
		return showOutput(this.output)(currentOutputLevel, data);
	}

	exposeInitTask() {
		this.registerCommand(Commands.init, async () => {
			try {
				const uri = await this.getFolderForInitOrScaffold('init');
				if (uri === undefined) {
					return;
				}
				const pathToTaq = await this.getTaqBinPath();
				const result = await Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), undefined)(`init ${uri.path}`);
				this.showOutput(OutputLevels.info, result);
				try {
					await Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), uri.path as Util.PathToDir)(``);
				} catch {
					// Ignored
				}
				await this.updateCommandStates(uri.path as Util.PathToDir);
				this.vscode.window.showInformationMessage("Project taq'fied!", uri.path);
				this.vscode.workspace.updateWorkspaceFolders(0, undefined, { uri });
			} catch (e: unknown) {
				this.notifyAndLogError('Error while trying to Taq`ify the folder.', e);
			}
		});
	}

	async exposeScaffoldTask() {
		this.registerCommand(Commands.scaffold, async () => {
			const availableScaffolds: { name: string; url: string }[] = await this.getAvailableScaffolds();
			const projectUri = await this.getFolderForInitOrScaffold('scaffold');
			if (projectUri === undefined) {
				return;
			}
			const scaffold = await this.promptForScaffoldSelection(
				this.i18,
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
			const pathToTaq = await this.getTaqBinPath();
			const projectDir = await Util.makeDir(projectUri.path, this.i18);
			try {
				await Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), projectDir)(
					`scaffold ${scaffoldUrl} ${projectDir}`,
				);
				await Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), projectDir)(``);
				await this.updateCommandStates(projectDir);
				this.vscode.window.showInformationMessage('Scaffold completed!', projectUri.path);
			} catch (e: unknown) {
				this.notifyAndLogError('Error while scaffolding.', e);
			}
		});
	}

	async getTaqifiedDirectories() {
		const taqified = await filterAsync([...this.folders], async folder => {
			try {
				const taqifiedPath = join(folder.uri.path, '.taq');
				await stat(taqifiedPath);
				return true;
			} catch (e: unknown) {
				return false;
			}
		});

		return await mapAsync(taqified, folder => Util.makeDir(folder.uri.path, this.i18));
	}

	async getFolderForInitOrScaffold(
		taskTitle: string,
	) {
		let uris: api.Uri[] | undefined = this.folders.map(folder => folder.uri);
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
			this.showOutput(
				OutputLevels.warn,
				`Error: running ${taskTitle} with multiple open folders is not yet implemented.`,
			);
			return undefined;
		}
	}

	async getFolderForTasksOnTaqifiedFolders(taskTitle: string) {
		const taqifiedDirectories = await this.getTaqifiedDirectories();

		if (taqifiedDirectories.length === 0) {
			// The developer has no taqified workspace folders. As such,
			// we cannot proceed
			this.showError({
				kind: 'E_NO_TAQUERIA_PROJECTS',
				msg:
					`You don't have any Taqueria projects. You'll need to taq'ify a project using \"Taqueria: Init\" and open the folder in VsCode before you can ${taskTitle}.`,
			});
			return undefined;
		}

		if (taqifiedDirectories.length === 1) {
			// The developer has a single taqified workspace folder, so we know
			// exactly where to install a plugin
			return taqifiedDirectories[0];
		}

		// The developer has multiple taqified folders
		const selectedDir = await this.promptForTaqProject(taqifiedDirectories);
		if (!selectedDir) {
			return undefined;
		}
		return await Util.makeDir(selectedDir, this.i18);
	}

	async promptForPluginInstallation(
		projectDir: Util.PathToDir,
	) {
		const availablePlugins = await this.getAvailablePlugins();
		const config = await Util.TaqifiedDir.create(projectDir, this.i18);
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
		projectDir: Util.PathToDir,
	) {
		const config = await Util.TaqifiedDir.create(projectDir, this.i18);
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

	promptForTaqProject(availableProjects: readonly string[]) {
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

	async getAvailablePlugins() {
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

	async getAvailableScaffolds() {
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

	async exposeInstallTask() {
		this.registerCommand(Commands.install, async (pluginInfo?: PluginTreeItem | undefined) => {
			const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install');
			if (projectDir === undefined) {
				return;
			}
			let pluginName = pluginInfo?.label;
			if (!pluginName) {
				pluginName = await this.promptForPluginInstallation(projectDir);
			}
			if (!pluginName) {
				return;
			}
			try {
				const pathToTaq = await this.getTaqBinPath();
				const message = await Util.proxyToTaq(
					pathToTaq,
					this.i18,
					(level, log) => this.showOutput(level, log),
					projectDir,
				)(`install ${pluginName}`);
				this.notify(message);
			} catch (e: unknown) {
				this.notifyAndLogError('Error while trying to install plugin.', e);
			}
		});
	}

	async exposeUninstallTask() {
		this.registerCommand(Commands.uninstall, async (pluginInfo?: PluginTreeItem | undefined) => {
			const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install');
			if (projectDir === undefined) {
				return;
			}
			let pluginName = pluginInfo?.label;
			if (!pluginName) {
				pluginName = await this.promptForPluginUninstall(projectDir);
			}
			if (!pluginName) {
				return;
			}
			try {
				const pathToTaq = await this.getTaqBinPath();
				const message = await Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), projectDir)(
					`uninstall ${pluginName}`,
				);
				this.notify(message);
			} catch (e: unknown) {
				this.notifyAndLogError('Error while trying to uninstall plugin', e);
			}
		});
	}

	async exposeOriginateTask() {
		this.exposeTaskAsCommand(Commands.originate, async (pathToTaq: Util.PathToTaq) => {
			const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install');
			if (projectDir === undefined) {
				return;
			}
			const config = await Util.TaqifiedDir.create(projectDir, this.i18);
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
			try {
				const message = await Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), projectDir)(
					`originate -e ${environmentName}`,
				);
				this.showOutput(OutputLevels.output, message);
				this.notify('Origination Succeeded');
			} catch (e: unknown) {
				this.notifyAndLogError('Error occurred while trying to originate:', e);
			}
		});
	}

	taskNameToCmdId(taskName: string) {
		return 'taqueria.' + taskName.replace(/\s+/g, '_');
	}

	async getTaqBinPath() {
		let providedPath = this.vscode.workspace.getConfiguration('taqueria').get('path', '');
		if (!providedPath || (providedPath as string).length === 0) {
			providedPath = await Util.findTaqBinary(this.i18, this.getOutput());
		}
		return Util.makePathToTaq(this.i18, this.getOutput())(providedPath);
	}

	async showProgressAndProxyToTaq(progressTitle: string, projectDir: Util.PathToDir, command: string) {
		const pathToTaq = await this.getTaqBinPath();
		return this.vscode.window.withProgress({
			location: this.vscode.ProgressLocation.Window,
			cancellable: false,
			title: progressTitle,
		}, async progress => {
			progress.report({ increment: 0 });
			const result = Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), projectDir)(command);
			progress.report({ increment: 100 });
			return result;
		});
	}

	registerCommand(cmdId: string, callback: (...args: any[]) => any) {
		this.context.subscriptions.push(
			this.vscode.commands.registerCommand(cmdId, callback),
		);
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

	notifyAndLogError(message: string, err: TaqVsxError | TaqError | Error | unknown) {
		this.vscode.window.showErrorMessage(`${message}\nPlease check out the output window for diagnostics information`);
		this.logAllNestedErrors(err);
	}

	logAllNestedErrors(err: TaqVsxError | TaqError | Error | unknown) {
		try {
			if (!err) {
				return;
			}
			if (!shouldOutput(OutputLevels.error, this.output.logLevel)) {
				return;
			}
			this.output.outputChannel.appendLine(JSON.stringify(err, undefined, 4));
			this.output.outputChannel.show();
		} catch {
			try {
				this.output.outputChannel.appendLine(`unknown error occurred while trying to log an error.`);
			} catch {
				// at this point, we cannot do anything
			}
		}
	}

	getSandboxNames(projectDir: Util.TaqifiedDir) {
		return projectDir.config.sandbox
			? Object.keys(projectDir.config.sandbox)
			: [];
	}

	exposeTaqTaskAsCommand(
		cmdId: string,
		taskWithArgs: string,
		outputTo: 'output' | 'notify',
		otherNotification?: string,
		projectDir?: Util.PathToDir,
	) {
		this.exposeTaskAsCommand(
			cmdId,
			(pathToTaq: Util.PathToTaq) =>
				Util.proxyToTaq(pathToTaq, this.i18, this.getOutput(), projectDir)(taskWithArgs)
					.then(stdout =>
						outputTo === 'output'
							? this.showOutput(OutputLevels.output, stdout)
							: this.notify(stdout)
					)
					.then(_ => {
						if (otherNotification) this.notify(otherNotification);
					}),
		);
	}

	exposeTaskAsCommand(cmdId: string, handler: ((pathToTaq: Util.PathToTaq) => Promise<void>)) {
		this.registerCommand(
			cmdId,
			async () => {
				try {
					const pathToTaq = await this.getTaqBinPath();
					await handler(pathToTaq);
				} catch (e: unknown) {
					this.logAllNestedErrors(e);
				}
			},
		);
	}

	async exposeSandboxTaskAsCommand(
		cmdId: string,
		taskName: string,
		progressTitle: string,
		outputTo: 'output' | 'notify',
		projectDir: Util.PathToDir,
		otherNotification?: string,
	) {
		this.registerCommand(cmdId, async (sandbox?: SandboxTreeItem | undefined) => {
			try {
				let sandboxName = sandbox?.label;
				if (!sandboxName) {
					const taqifiedDir = await Util.TaqifiedDir.create(projectDir, this.i18);
					const sandboxes = this.getSandboxNames(taqifiedDir);
					sandboxName = await this.vscode.window.showQuickPick(sandboxes, {
						canPickMany: false,
						ignoreFocusOut: false,
						placeHolder: 'Sandbox name',
						title: 'Select a sandbox',
					});
				}
				if (!sandboxName) {
					return;
				}
				const result = await this.showProgressAndProxyToTaq(progressTitle, projectDir, `${taskName} ${sandboxName}`);
				if (outputTo === 'output') {
					this.showOutput(OutputLevels.output, result);
				} else {
					this.notify(result);
				}
				if (otherNotification) {
					this.notify(otherNotification);
				}
			} catch (e: unknown) {
				this.notifyAndLogError(`Error while running ${taskName}.`, e);
			}
		});
	}

	async updateCommandStates(
		projectDir: Util.PathToDir,
	) {
		this.dataProviders.forEach(dataProvider => dataProvider.refresh());

		this.showOutput(OutputLevels.debug, 'Project config changed, updating command states...');
		let taqFolderFound: boolean;
		try {
			await Util.makeDir(join(projectDir, '.taq'), this.i18);
			this.showOutput(OutputLevels.debug, 'Taq folder is found');
			taqFolderFound = true;
		} catch {
			taqFolderFound = false;
			this.showOutput(OutputLevels.debug, 'Taq folder not found');
		}
		let enableAllCommands: boolean;
		let config: Util.TaqifiedDir | null;
		try {
			config = await Util.TaqifiedDir.create(projectDir, this.i18);
			enableAllCommands = false;
		} catch (e: unknown) {
			config = null;
			enableAllCommands = taqFolderFound;
			// We don't want to show messages to users when they are working with non-taqified folders (Except when output level is set to info or more verbose)
			if (shouldOutput(OutputLevels.info, this.output.logLevel) || taqFolderFound) {
				this.vscode.commands.executeCommand('setContext', '@taqueria-state/enable-all-commands', true);
				this.showOutput(OutputLevels.error, 'Error: Could not update command states:');
				this.logAllNestedErrors(e);
				if (taqFolderFound) {
					this.showOutput(
						OutputLevels.warn,
						'The Taqueria config for this project could not be loaded. All Taqueria commands will be temporarily enabled.\nPlease check for errors in the .taq/config.json file\n',
					);
				}
			}
		}
		const availablePlugins = await this.getAvailablePlugins();
		const availablePluginsNotInstalled = config?.config?.plugins
			? availablePlugins.filter(name => config?.config.plugins?.findIndex(p => p.name === name) === -1)
			: availablePlugins;
		this.showOutput(
			OutputLevels.debug,
			`@taqueria-state/enable-init-scaffold: ${enableAllCommands || !config?.config}`,
		);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/enable-init-scaffold',
			enableAllCommands || !config?.config,
		);

		this.showOutput(
			OutputLevels.debug,
			`@taqueria-state/enable-install-uninstall: ${enableAllCommands || !!config?.config}`,
		);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/enable-install-uninstall',
			enableAllCommands || !!config?.config,
		);

		this.showOutput(OutputLevels.debug, `@taqueria-state/is-taqified: ${!!config?.config}`);
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
		this.showOutput(OutputLevels.debug, `Known plugins: ${JSON.stringify(plugins)}`);
		for (const plugin of plugins) {
			const found = config?.config?.plugins?.find(item => item.name === plugin) !== undefined;
			this.showOutput(OutputLevels.debug, `plugins ${plugin}: ${found}`);
			this.vscode.commands.executeCommand('setContext', plugin, enableAllCommands || found);
		}
	}

	createWatcherIfNotExists(
		projectDir: Util.PathToDir,
		addConfigWatcherIfNotExists: (folder: string, factory: () => api.FileSystemWatcher[]) => void,
	) {
		this.showOutput(OutputLevels.debug, `Directory ${projectDir} should be watched.`);
		addConfigWatcherIfNotExists(projectDir, () => {
			this.showOutput(OutputLevels.info, `Adding watcher for directory ${projectDir}.`);
			try {
				this.updateCommandStates(projectDir);
			} catch (error: any) {
				this.logAllNestedErrors(error);
			}
			try {
				const folderWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq'));
				const configWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/config.json'));
				const stateWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/state.json'));

				// TODO: Is passing these arguments to the callback of a long lived watcher prevent GC? Are these short lived objects?
				folderWatcher.onDidChange((e: api.Uri) => this.updateCommandStates(projectDir));
				folderWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates(projectDir));
				folderWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates(projectDir));

				configWatcher.onDidChange((e: api.Uri) => this.updateCommandStates(projectDir));
				configWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates(projectDir));
				configWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates(projectDir));

				stateWatcher.onDidChange((e: api.Uri) => this.updateCommandStates(projectDir));
				stateWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates(projectDir));
				stateWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates(projectDir));
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

	registerDataProviders(workspaceFolder: string) {
		const pluginsDataProvider = new PluginsDataProvider(workspaceFolder, this);
		this.vscode.window.createTreeView('taqueria-plugins', {
			treeDataProvider: pluginsDataProvider,
		});
		this.dataProviders.push(pluginsDataProvider);

		const sandboxesDataProvider = new SandboxesDataProvider(workspaceFolder, this);
		this.vscode.window.createTreeView('taqueria-sandboxes', {
			treeDataProvider: sandboxesDataProvider,
		});
		this.dataProviders.push(sandboxesDataProvider);
	}
}
