import loadI18n, { i18n } from '@taqueria/protocol/i18n';
import { TaqError } from '@taqueria/protocol/TaqError';
import { Config } from '@taqueria/protocol/taqueria-protocol-types';
import { spawn } from 'child_process';
import Table from 'cli-table3';
import fs from 'fs';
import { readFile } from 'fs/promises';
import { stat } from 'fs/promises';
import os from 'os';
import path, { join } from 'path';
import { uniq } from 'rambda';
import * as semver from 'semver';
import * as api from 'vscode';
import { notNullish } from './GeneralHelperFunctions';
import { ArtifactsDataProvider } from './gui/ArtifactsDataProvider';
import { ContractTreeItem } from './gui/ContractsDataProvider';
import { ContractsDataProvider } from './gui/ContractsDataProvider';
import { EnvironmentTreeItem } from './gui/EnvironmentsDataProvider';
import { EnvironmentsDataProvider } from './gui/EnvironmentsDataProvider';
import { ObservableConfig } from './gui/ObservableConfig';
import { PluginsDataProvider, PluginTreeItem } from './gui/PluginsDataProvider';
import { SandboxesDataProvider } from './gui/SandboxesDataProvider';
import {
	OperationTreeItem,
	SandboxTreeItem,
	SandboxTreeItemBase,
	SmartContractEntrypointTreeItem,
} from './gui/SandboxTreeItemTypes';
import { ScaffoldsDataProvider, ScaffoldTreeItem } from './gui/ScaffoldsDataProvider';
import { SystemCheckDataProvider, SystemCheckTreeItem } from './gui/SystemCheckDataProvider';
import { TestDataProvider, TestTreeItem } from './gui/TestDataProvider';
import { createVscodeWebUiHtml } from './gui/web/WebUI';
import * as Util from './pure';
import { execCmd } from './pure';
import { getLanguageInfoForFileName, getSupportedSmartContractExtensions } from './SmartContractLanguageInfo';
import { TaqVsxError } from './TaqVsxError';

export const COMMAND_PREFIX = 'taqueria.';

const minNodeVersion = '16.13.1';

export enum Commands {
	init = 'init',
	scaffold = 'scaffold',
	install = 'install',
	uninstall = 'uninstall',
	optIn = 'optIn',
	optOut = 'optOut',
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

interface HasToString {
	toString(): string;
}

function instanceOfHasToString(object: any): object is HasToString {
	return notNullish(object) && 'toString' in object;
}

export type OutputFunction = (currentLogLevel: OutputLevels, log: string) => void;

enum AnalyticsOptionState {
	fileNotExists,
	fileIsUnreadable,
	fileIsCorrupt,
	optionNotExists,
	optionSetToInvalidValue,
	optedIn,
	optedOut,
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
	logChannel: api.OutputChannel;
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
	return (data: string) => {
		output.outputChannel.appendLine(data);
		output.outputChannel.show();
	};
};

export const showLog = (output: Output) => {
	return (currentOutputLevel: OutputLevels, data: string) => {
		if (!shouldOutput(currentOutputLevel, output.logLevel)) {
			return;
		}
		output.logChannel.appendLine(data);
	};
};

export interface HasFileName {
	fileName: string;
}

function instanceOfHasFileName(object: any): object is HasFileName {
	return notNullish(object) && 'fileName' in object;
}

export interface HasRefresh {
	refresh(): void;
}

function instanceOfHasRefresh(object: any): object is HasRefresh {
	return notNullish(object) && 'refresh' in object;
}

export function mapAsync<T, U>(
	array: T[],
	callbackfn: (value: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
	return Promise.all(array.map(callbackfn));
}

export async function filterAsync<T>(
	array: T[],
	callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
	const filterMap = await mapAsync(array, callbackfn);
	return array.filter((value, index) => filterMap[index]);
}

export type TaskTitles = {
	progressTitle: string;
	finishedTitle: string;
};

export class VsCodeHelper {
	private constructor(
		private context: api.ExtensionContext,
		private vscode: VSCodeAPI,
		private output: Output,
		private i18: i18n,
	) {}

	static async construct(context: api.ExtensionContext, deps: InjectedDependencies) {
		const vscode = deps.vscode;
		const logLevelText = process.env.LogLevel ?? OutputLevels[OutputLevels.warn];
		const logLevel = OutputLevels[logLevelText as keyof typeof OutputLevels] ?? OutputLevels.warn;
		const outputChannel = vscode.window.createOutputChannel('Taqueria');
		const logChannel = vscode.window.createOutputChannel('Taqueria Logs');
		const output = {
			outputChannel,
			logChannel,
			logLevel,
		};
		showLog(output)(OutputLevels.info, 'the activate function was called for the Taqueria VsCode Extension.');

		const i18n = await loadI18n();

		return new VsCodeHelper(context, vscode, output, i18n);
	}

	get i18n() {
		return this.i18;
	}

	getFolders() {
		const workspaceFolders = this.vscode.workspace.workspaceFolders;
		if (!workspaceFolders) {
			return [];
		}
		return workspaceFolders.map(x => x.uri);
	}

	getOutput() {
		return showOutput(this.output);
	}

	getLog() {
		return showLog(this.output);
	}

	showOutput(data: string) {
		return showOutput(this.output)(data);
	}

	showLog(currentOutputLevel: OutputLevels, data: string) {
		return showLog(this.output)(currentOutputLevel, data);
	}

	exposeInitTask() {
		this.registerCommand(Commands.init, async () => {
			const uri = await this.getFolderForInitOrScaffold('init');
			if (uri === undefined) {
				return;
			}
			await this.proxyToTaqAndShowOutput(
				`init ${uri.path}`,
				{
					finishedTitle: `Taqified folder ${uri.fsPath}`,
					progressTitle: `Taqifying folder ${uri.fsPath}`,
				},
				uri.path as Util.PathToDir,
				false,
			);
			try {
				await this.proxyToTaq(``, uri.path as Util.PathToDir);
			} catch {
				// Ignored
			}
			await this.updateCommandStates();
			if (!this.getMainWorkspaceFolder()) {
				await this.vscode.commands.executeCommand('vscode.openFolder', uri, false);
			}
		});
	}

	exposeScaffoldTask() {
		this.registerCommand(Commands.scaffold, async (scaffold?: ScaffoldTreeItem | undefined) => {
			let scaffoldUrl = scaffold?.url;
			if (!scaffoldUrl) {
				const availableScaffolds: { name: string; url: string }[] = await this.getAvailableScaffolds();
				const scaffoldName = await this.promptForScaffoldSelection(
					this.i18,
					api.debug.activeDebugSession,
					availableScaffolds.map(template => template.name),
				);
				if (scaffold === null) {
					return;
				}
				scaffoldUrl = availableScaffolds.find(template => template.name === scaffoldName)?.url;
				if (scaffoldUrl === undefined) {
					return;
				}
			}
			const projectUri = await this.getFolderForInitOrScaffold('scaffold');
			if (projectUri === undefined) {
				return;
			}
			const projectDir = await Util.makeDir(projectUri.path, this.i18);
			await this.proxyToTaqAndShowOutput(
				`scaffold ${scaffoldUrl} ${projectDir}`,
				{
					finishedTitle: `scaffolded ${scaffoldUrl}`,
					progressTitle: `scaffolding ${scaffoldUrl}`,
				},
				projectDir,
				false,
			);
			await this.proxyToTaq(``, projectDir);
			await this.updateCommandStates();
			if (!this.getMainWorkspaceFolder()) {
				await this.vscode.commands.executeCommand('vscode.openFolder', projectUri, false);
			}
		});
	}

	getMainWorkspaceFolder(): api.Uri | undefined {
		const workspaceFolder = this.vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			return undefined;
		}
		return workspaceFolder.uri;
	}

	exposeRefreshCommand() {
		this.registerCommand('refresh_command_states', async () => {
			await this.updateCommandStates();
		});
	}

	exposeInstallTaqCliCommand() {
		this.registerCommand('install_taq_cli', async () => {
			await this.vscode.window.withProgress({
				location: this.vscode.ProgressLocation.Notification,
				cancellable: false,
				title: `Installing Taq CLI...`,
			}, async progress => {
				progress.report({ increment: 0 });
				try {
					const hasInstalled = await this.downloadAndInstallTaqCLI();
					if (hasInstalled) {
						this.vscode.window.showInformationMessage(`Successfully installed Taq CLI.`);
					} else {
						this.vscode.window.showWarningMessage(
							`Some issues occurred while installing Taq CLI. Please check the Taqueria Log window for diagnostics information.`,
						);
					}
				} catch (e: unknown) {
					this.vscode.window.showErrorMessage(
						`Error while installing Taq CLI. Please check the Taqueria Log window for diagnostics information.`,
					);
					this.logAllNestedErrors(e);
				} finally {
					progress.report({ increment: 100 });
				}
			});
		});
	}

	tryFormattingAsTable(json: string): string {
		let data: unknown = undefined;
		try {
			data = JSON.parse(json);
		} catch {
			return json;
		}
		return this.formatObjectOrArrayAsTable(data);
	}

	private formatObjectOrArrayAsTable(data: unknown) {
		const array: Record<string, any>[] = Array.isArray(data)
			? data as Record<string, any>[]
			: [data as Record<string, any>];
		const keys = uniq(array.reduce((retval: string[], record) => [...retval, ...Object.keys(record)], []));

		const rows = array.reduce(
			(retval: (string[])[], record) => {
				const row = keys.reduce(
					(row: string[], key: string) => {
						let value = record[key] ? record[key] : '';
						if (Array.isArray(value)) {
							value = value.join('\n');
						}
						return [...row, value];
					},
					[],
				);
				return [...retval, row];
			},
			[],
		);

		const table = new Table({ head: keys });
		table.push(...rows);
		return table.toString();
	}

	async getTaqifiedDirectories() {
		const taqified = await filterAsync([...this.getFolders()], async folder => {
			try {
				const taqifiedPath = join(folder.path, '.taq');
				await stat(taqifiedPath);
				return true;
			} catch (e: unknown) {
				return false;
			}
		});

		return await mapAsync(taqified, folder => Util.makeDir(folder.path, this.i18));
	}

	async getFolderForInitOrScaffold(
		taskTitle: string,
	) {
		let uris: api.Uri[] | undefined = this.getFolders();
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
			this.vscode.window.showWarningMessage(
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

	async getPathForPluginSource(pluginName: string) {
		if (pluginName && process.env.InstallDevPlugins === 'true') {
			const pathToTaq = await this.getTaqBinPath();
			const taqFolder = path.dirname(pathToTaq);
			const pluginFolder = pluginName.replace('@', '').replace('/', '-');
			const pluginPath = path.join(taqFolder, pluginFolder);
			return pluginPath;
		}
		return pluginName;
	}

	async promptForPluginInstallation(
		projectDir: Util.PathToDir,
	) {
		const availablePlugins = await this.getAvailablePlugins();
		const config = await Util.TaqifiedDir.create(projectDir, this.i18);
		const availablePluginsNotInstalled = config.config?.plugins
			? availablePlugins.filter(name => config.config.plugins?.findIndex(p => p.name === name) === -1)
			: availablePlugins;
		const pluginName = await this.vscode.window.showQuickPick(availablePluginsNotInstalled, {
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
			placeHolder: 'Scaffold name',
			title: 'Select a scaffold',
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
			'@taqueria/plugin-archetype',
			'@taqueria/plugin-contract-types',
			'@taqueria/plugin-flextesa',
			'@taqueria/plugin-ipfs-pinata',
			'@taqueria/plugin-jest',
			'@taqueria/plugin-ligo',
			'@taqueria/plugin-metadata',
			'@taqueria/plugin-smartpy',
			'@taqueria/plugin-taquito',
			'@taqueria/plugin-tezos-client',
		];
	}

	private getCompilerPlugins() {
		return [
			'@taqueria/plugin-archetype',
			'@taqueria/plugin-ligo',
			'@taqueria/plugin-smartpy',
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
				name: 'NFT',
				url: 'https://github.com/ecadlabs/taqueria-scaffold-nft',
			},
			{
				name: 'Taco Shop',
				url: 'https://github.com/ecadlabs/taqueria-scaffold-taco-shop',
			},
		];
	}

	async exposeInstallTask() {
		this.registerCommand(Commands.install, async (pluginInfo?: PluginTreeItem | undefined) => {
			const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install');
			if (projectDir === undefined) {
				return;
			}
			let pluginName = pluginInfo?.pluginName;
			if (!pluginName) {
				pluginName = await this.promptForPluginInstallation(projectDir);
				if (!pluginName) {
					return;
				}
			}
			pluginName = await this.getPathForPluginSource(pluginName);
			await this.proxyToTaqAndShowOutput(
				`install ${pluginName}`,
				{
					finishedTitle: `installed ${pluginName}`,
					progressTitle: `installing ${pluginName}`,
				},
				projectDir,
				false,
			);
		});
	}

	async exposeUninstallTask() {
		this.registerCommand(Commands.uninstall, async (pluginInfo?: PluginTreeItem | undefined) => {
			const projectDir = await this.getFolderForTasksOnTaqifiedFolders('install');
			if (projectDir === undefined) {
				return;
			}
			let pluginName = pluginInfo?.pluginName;
			if (!pluginName) {
				pluginName = await this.promptForPluginUninstall(projectDir);
			}
			if (!pluginName) {
				return;
			}
			await this.proxyToTaqAndShowOutput(
				`uninstall ${pluginName}`,
				{
					finishedTitle: `uninstalled ${pluginName}`,
					progressTitle: `uninstalling ${pluginName}`,
				},
				projectDir,
				false,
			);
		});
	}

	getArtifactFileNameFromContract(fileName: string) {
		return fileName.replace(/\.[^/.]+$/, '') + '.tz';
	}

	async exposeOriginateTask(cmdId: string, fileSelectionBehavior: 'getFromCommand' | 'currentFile' | 'openDialog') {
		this.registerCommand(
			cmdId,
			async (arg?: HasFileName | EnvironmentTreeItem | api.Uri | undefined) => {
				const { config, pathToDir } = this.observableConfig.currentConfig;
				if (!config || !pathToDir) {
					return;
				}
				let environmentName: string | undefined = undefined;
				if (arg && arg instanceof EnvironmentTreeItem) {
					environmentName = arg.environmentName;
				}
				if (!environmentName) {
					environmentName = await this.getEnvironment(config);
					if (!environmentName) {
						return;
					}
				}
				const fileName = await this.getFileNameForOperationsOnContracts(
					cmdId,
					fileSelectionBehavior,
					config,
					'originate',
					'artifacts',
					arg instanceof EnvironmentTreeItem ? undefined : arg,
				);
				if (!fileName) {
					return;
				}
				await this.proxyToTaqAndShowOutput(
					`originate -e ${environmentName} ${fileName ?? ''}`,
					{
						finishedTitle: 'originated contracts',
						progressTitle: 'originating contracts',
					},
					pathToDir,
					true,
				);
			},
		);
	}

	async getEnvironment(config: Util.TaqifiedDir) {
		const environmentNames = [
			...Object.keys(config.config?.environment ?? {}),
		].filter(x => x !== 'default');
		if (environmentNames.length === 1) {
			return environmentNames[0];
		}
		const environmentName = await this.vscode.window.showQuickPick(
			environmentNames,
			{
				canPickMany: false,
				ignoreFocusOut: false,
				placeHolder: 'Environment Name',
				title: 'Select an environment',
			},
		);
		return environmentName;
	}

	async getTaqBinPath() {
		let providedPath = this.vscode.workspace.getConfiguration('taqueria').get('path', '');
		if (!providedPath || (providedPath as string).length === 0) {
			providedPath = await Util.findTaqBinary(this.i18, this.getLog());
		}
		return providedPath as Util.PathToTaq;
	}

	registerCommand(cmdId: string, callback: (...args: any[]) => any) {
		this.context.subscriptions.push(
			this.vscode.commands.registerCommand(COMMAND_PREFIX + cmdId, async (...args: any[]) => {
				try {
					const result = callback(...args);
					if (result.then) {
						await result;
					}
				} catch (e: any) {
					this.notifyAndLogError(`Error while running ${cmdId}`, e);
				}
			}),
		);
	}

	showError(err: TaqVsxError) {
		Util.log('Error:')(err);
		return (err.context
			? this.vscode.window.showErrorMessage(err.msg, err.context)
			: this.vscode.window.showErrorMessage(err.msg))
			.then(_ => Promise.resolve()) as Promise<void>;
	}

	async workspaceHasTaqFolder() {
		const folders = this.getFolders();
		if (folders.length === 0) {
			return false;
		}
		const folder = folders[0];
		try {
			await Util.makeDir(path.join(folder.path, '.taq'), this.i18);
			return true;
		} catch (_: unknown) {
			return false;
		}
	}

	async notifyAndLogError(message: string, err: TaqVsxError | TaqError | Error | unknown) {
		const hasTaqFolder = await this.workspaceHasTaqFolder();
		if (hasTaqFolder) {
			this.vscode.window.showErrorMessage(`${message}\nPlease check out the output window for diagnostics information`);
		}
		this.logAllNestedErrors(err, !hasTaqFolder);
	}

	logAllNestedErrors(err: TaqVsxError | TaqError | Error | unknown, suppressWindow?: boolean | undefined) {
		const outputLevel = suppressWindow ? OutputLevels.debug : OutputLevels.error;
		if (!err) {
			return;
		}
		try {
			if (!shouldOutput(outputLevel, this.output.logLevel)) {
				return;
			}
			let text: string;
			if (instanceOfHasToString(err)) {
				text = err.toString();
			} else {
				text = JSON.stringify(err, undefined, 4);
			}
			this.output.logChannel.appendLine(text);
			if (!suppressWindow) {
				this.output.logChannel.show();
			}
		} catch {
			try {
				this.output.logChannel.appendLine(`unknown error occurred while trying to log an error.`);
				this.output.logChannel.appendLine(`error object: ${err}`);
			} catch {
				// at this point, we cannot do anything
			}
		}
	}

	exposeTypecheckCommand() {
		this.registerCommand('typecheck', async (arg: SandboxTreeItem | ContractTreeItem | undefined) => {
			const { config, pathToDir } = this.observableConfig.currentConfig;
			if (!config || !pathToDir) {
				return;
			}
			let sandboxName: string | undefined = undefined;
			if (arg) {
				if (arg instanceof SandboxTreeItem) {
					sandboxName = arg.sandboxName;
				}
			}
			if (!sandboxName) {
				const config = await Util.TaqifiedDir.create(pathToDir, this.i18);
				const sandboxNames = [...Object.keys(config?.config?.sandbox ?? {})];
				if (sandboxNames.length === 1) {
					sandboxName = sandboxNames[0];
				} else {
					sandboxName = await this.vscode.window.showQuickPick(sandboxNames, {
						canPickMany: false,
						ignoreFocusOut: false,
						placeHolder: 'Sandbox Name',
						title: 'Select a sandbox',
					});
					if (!sandboxName) {
						return;
					}
				}
			}
			const fileName = await this.getFileNameForOperationsOnContracts(
				'typecheck',
				'getFromCommandOrOpenDialog',
				config,
				'Typecheck',
				'artifacts',
				instanceOfHasFileName(arg) ? arg : undefined,
			);
			if (!fileName) {
				return;
			}
			await this.proxyToTaqAndShowOutput(
				`typecheck -s ${sandboxName} ${fileName ?? ''}`,
				{
					finishedTitle: 'checked contract types',
					progressTitle: 'checking types',
				},
				pathToDir,
				true,
			);
		});
	}

	getSandboxNames(projectDir: Util.TaqifiedDir) {
		return projectDir.config.sandbox
			? Object.keys(projectDir.config.sandbox)
			: [];
	}

	private _currentlyRunningTask: string | undefined;

	async proxyToTaqAndShowOutput(
		taskWithArgs: string,
		taskTitles: TaskTitles,
		projectDir: string | undefined,
		logStandardErrorToOutput: boolean | undefined,
	) {
		if (!projectDir) {
			const mainFolder = this.getMainWorkspaceFolder();
			projectDir = mainFolder?.fsPath;
		}
		if (this._currentlyRunningTask !== undefined) {
			this.vscode.window.showErrorMessage(
				`Taqueria is currently busy ${this._currentlyRunningTask}. Please wait for it to finish before running another command.`,
			);
			return;
		}
		await this.vscode.window.withProgress({
			location: this.vscode.ProgressLocation.Notification,
			cancellable: false,
			title: `Taqueria is ${taskTitles.progressTitle}`,
		}, async progress => {
			this._currentlyRunningTask = taskTitles.progressTitle;
			progress.report({ increment: 0 });
			try {
				const result = await this.proxyToTaq(taskWithArgs, projectDir);
				if (result.executionError) {
					this.logAllNestedErrors(result.executionError);
				}
				if (result.standardError) {
					const fixedError = this.fixOutput(result.standardError, true);
					if (logStandardErrorToOutput) {
						this.showOutput(fixedError);
					} else {
						this.showLog(OutputLevels.warn, fixedError);
					}
				}
				if (result.standardOutput) {
					const fixedOutput = this.fixOutput(result.standardOutput, true);
					this.showOutput(fixedOutput);
				}
				if (result.executionError || result.standardError) {
					this.vscode.window.showWarningMessage(
						`Warnings while ${taskTitles.progressTitle}. Please check the Taqueria Log window for diagnostics information.`,
					);
				} else {
					this.vscode.window.showInformationMessage(`Successfully ${taskTitles.finishedTitle}.`);
				}
			} catch (e: unknown) {
				this.vscode.window.showErrorMessage(
					`Error while ${taskTitles.progressTitle}. Please check the Taqueria Log window for diagnostics information.`,
				);
				this.logAllNestedErrors(e);
			}
			progress.report({ increment: 100 });
			this._currentlyRunningTask = undefined;
		});
	}

	private fixOutput(output: string, formatAsTable: boolean): string {
		if (formatAsTable) {
			output = this.tryFormattingAsTable(output);
		}
		output = output.replaceAll('', '');
		output = output.replaceAll(/\[\d+m/g, '');
		output = output.replaceAll('●', '');
		return output;
	}

	async proxyToTaq(taskWithArgs: string, projectDir?: string | undefined) {
		const pathToTaq = await this.getTaqBinPath();
		const pathToDir = projectDir ? await Util.makeDir(projectDir, this.i18) : undefined;
		if (projectDir) {
			return await Util.execCmd(
				`${pathToTaq} -p ${projectDir} --fromVsCode ${taskWithArgs}`,
				this.getLog(),
				{ projectDir: pathToDir },
			);
		} else {
			return await Util.execCmd(`${pathToTaq} --fromVsCode ${taskWithArgs}`, this.getLog());
		}
	}

	exposeTaqTaskAsCommandWithFileArgument(
		cmdId: string,
		taskWithArgs: string,
		outputTo: 'output' | 'notify',
		taskTitles: TaskTitles,
	) {
		this.registerCommand(
			cmdId,
			async (item: HasFileName) => {
				await this.proxyToTaqAndShowOutput(
					`${taskWithArgs} ${item.fileName}`,
					taskTitles,
					undefined,
					outputTo === 'output',
				);
			},
		);
	}

	exposeCompileCommand(
		cmdId: string,
		fileSelectionBehavior: 'getFromCommand' | 'currentFile' | 'openDialog',
		compilerPlugin?: string,
	) {
		this.registerCommand(
			cmdId,
			async (item?: HasFileName | api.Uri | undefined) => {
				const { config, pathToDir } = this.observableConfig.currentConfig;
				if (!config || !pathToDir) {
					this.showLog(
						OutputLevels.warn,
						`Could not determine current project folder: ${JSON.stringify({ config, pathToDir }, null, 2)}`,
					);
					return;
				}
				const fileName = await this.getFileNameForOperationsOnContracts(
					cmdId,
					fileSelectionBehavior,
					config,
					'compile',
					'contracts',
					item,
				);
				if (!fileName) {
					return;
				}
				this.showLog(OutputLevels.debug, `Running command ${cmdId} for ${fileName}`);
				const taskWithArgs = `--plugin ${compilerPlugin ?? getLanguageInfoForFileName(fileName)?.compilerName} compile`;
				await this.proxyToTaqAndShowOutput(
					`${taskWithArgs} ${fileName}`,
					{
						finishedTitle: `compiled contract ${fileName}`,
						progressTitle: `compiling contract ${fileName}`,
					},
					undefined,
					true,
				);
			},
		);
	}

	async getFileNameForOperationsOnContracts(
		cmdId: string,
		fileSelectionBehavior: 'getFromCommand' | 'currentFile' | 'openDialog' | 'getFromCommandOrOpenDialog',
		config: Util.TaqifiedDir,
		commandTitle: string,
		fileTypes: 'contracts' | 'artifacts',
		item?: HasFileName | api.Uri | undefined,
	): Promise<string | undefined> {
		const folderRelativePath = fileTypes === 'contracts'
			? (config.config.contractsDir ?? 'contracts')
			: (config.config.artifactsDir ?? 'artifacts');
		const expectedContractsOrArtifactsFolder = path.join(config.dir, folderRelativePath);

		if (fileSelectionBehavior === 'getFromCommand' || fileSelectionBehavior === 'getFromCommandOrOpenDialog') {
			if (instanceOfHasFileName(item)) {
				return item.fileName;
			} else if (item instanceof api.Uri) {
				const fileName = path.relative(expectedContractsOrArtifactsFolder, item.path);
				if (!fileName) {
					this.showLog(
						OutputLevels.warn,
						`Could not determine relative filename for ${item.path}, canceling ${cmdId} command.`,
					);
				}
				return fileName;
			} else if (fileSelectionBehavior === 'getFromCommand') {
				this.showLog(
					OutputLevels.warn,
					`File to be ${commandTitle}d was not passed to command or could not determine relative filename for ${
						JSON.stringify(item, null, 2)
					}, canceling ${cmdId} command.`,
				);
				return;
			}
		}
		if (fileSelectionBehavior === 'currentFile') {
			let absoluteFilePath = this.vscode.window.activeTextEditor?.document.uri.path;
			if (!absoluteFilePath) {
				this.showLog(
					OutputLevels.warn,
					`No file is open in the text editor.`,
				);
				return;
			}
			return path.relative(expectedContractsOrArtifactsFolder, absoluteFilePath);
		}
		if (fileSelectionBehavior === 'openDialog' || fileSelectionBehavior === 'getFromCommandOrOpenDialog') {
			const fileNames = await this.vscode.window.showOpenDialog({
				canSelectFiles: true,
				canSelectFolders: false,
				canSelectMany: false,
				defaultUri: api.Uri.file(expectedContractsOrArtifactsFolder),
				filters: {
					'All Supported Contracts': fileTypes === 'artifacts'
						? ['tz']
						: getSupportedSmartContractExtensions(config).map(extension => extension.replace('.', '')),
					'All Files': ['*'],
				},
				openLabel: commandTitle,
				title: `Select a smart contract file to ${commandTitle}`,
			});
			if (!fileNames) {
				this.showLog(
					OutputLevels.debug,
					`The user canceled out of ${commandTitle} process.`,
				);
				return;
			}
			return path.relative(expectedContractsOrArtifactsFolder, fileNames[0].path);
		}
		this.showLog(
			OutputLevels.warn,
			`Unknown file mode for ${commandTitle} command.`,
		);
		return;
	}

	private async getRelativeFilePath(uri: api.Uri, folder: 'contracts' | 'artifacts') {
		let fileName = uri.path;
		const mainFolder = this.getMainWorkspaceFolder();
		if (!mainFolder) {
			this.showLog(OutputLevels.warn, `No workspace is open, canceling command.`);
			return undefined;
		}
		const config = await Util.TaqifiedDir.create(mainFolder.fsPath as Util.PathToDir, this.i18);
		const dir = folder === 'contracts' ? config.config.contractsDir : config.config.artifactsDir ?? folder;
		fileName = path.relative(path.join(mainFolder.path, dir), fileName);
		return fileName;
	}

	exposeTaqTaskAsCommand(
		cmdId: string,
		taskWithArgs: string,
		outputTo: 'output' | 'notify',
		taskTitles: TaskTitles,
	) {
		this.registerCommand(
			cmdId,
			async () => {
				await this.proxyToTaqAndShowOutput(taskWithArgs, taskTitles, undefined, outputTo === 'output');
			},
		);
	}

	exposeTestSetupCommand() {
		this.registerCommand(
			COMMAND_PREFIX + 'create_test_folder',
			async () => {
				const mainFolder = this.getMainWorkspaceFolder();
				if (!mainFolder) {
					return;
				}
				const folders = await this.vscode.window.showOpenDialog({
					canSelectFiles: false,
					canSelectFolders: true,
					canSelectMany: false,
					openLabel: 'Select',
					title: 'Select a Folder to setup as test',
				});
				if (!folders || folders.length !== 1) {
					return;
				}
				const folder = folders[0].path.replace(mainFolder.fsPath + '/', '');
				await this.proxyToTaqAndShowOutput(
					`test --init ${folder}`,
					{
						finishedTitle: `Setup folder ${folder} as test`,
						progressTitle: `Setting up folder ${folder} as test`,
					},
					undefined,
					false,
				);
			},
		);
	}

	exposeRunTestCommand() {
		this.registerCommand(
			'run_tests',
			async (item: TestTreeItem) => {
				const folder = item.relativePath;
				await this.proxyToTaqAndShowOutput(
					`test ${folder}`,
					{
						finishedTitle: `Run tests from ${folder}`,
						progressTitle: `Running tests from ${folder}`,
					},
					undefined,
					false,
				);
			},
		);
	}

	async exposeSandboxTaskAsCommand(
		cmdId: string,
		taskName: string,
		taskTitles: TaskTitles,
	) {
		this.registerCommand(cmdId, async (sandbox?: SandboxTreeItem | undefined) => {
			let sandboxName = sandbox?.sandboxName;
			if (!sandboxName) {
				const mainFolder = await this.getMainWorkspaceFolder();
				if (!mainFolder) {
					return;
				}
				const taqifiedDir = await Util.TaqifiedDir.create(mainFolder.fsPath as Util.PathToDir, this.i18);
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
			await this.proxyToTaqAndShowOutput(`${taskName} ${sandboxName}`, taskTitles, undefined, false);
			this.sandboxesDataProvider?.refresh();
		});
	}

	async updateCommandStates() {
		await this.observableConfig.loadConfig();
		const [isTaqReachable, nodeVersion] = await Promise.all([
			this.isTaqCliReachable(),
			Util.getNodeVersion(this.getLog()),
		]);

		let nodeFound, isNodeVersionValid, nodeMeetsVersionRequirement: boolean;
		if (!nodeVersion) {
			nodeFound = false;
			isNodeVersionValid = false;
			nodeMeetsVersionRequirement = false;
		} else {
			nodeFound = true;
			isNodeVersionValid = !!semver.valid(nodeVersion);
			nodeMeetsVersionRequirement = semver.gt(nodeVersion, minNodeVersion);
		}
		const systemCheckPassed = isTaqReachable && nodeFound && isNodeVersionValid && nodeMeetsVersionRequirement;

		this.vscode.commands.executeCommand('setContext', '@taqueria-state/is-taq-cli-reachable', isTaqReachable);
		this.vscode.commands.executeCommand('setContext', '@taqueria-state/is-node-installed', nodeFound);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/node-version-meets-requirements',
			isNodeVersionValid && nodeMeetsVersionRequirement,
		);
		this.vscode.commands.executeCommand('setContext', '@taqueria-state/system-check-passed', systemCheckPassed);

		if (systemCheckPassed) {
			try {
				await this.vscode.commands.executeCommand('workbench.actions.treeView.taqueria-system-check.collapseAll');
			} catch {
				// ignored;
			}
		}

		if (this.systemCheckTreeView) {
			this.systemCheckTreeView.title = `${systemCheckPassed ? '✅' : '❌'} System Check`;
			let message = '';
			if (isTaqReachable) {
				message += `✅ Taq CLI: Installed \n`;
			} else {
				message += `❌ Taq CLI: Installed (or not in PATH) \n`;
			}
			if (!nodeFound) {
				message += `❌ NodeJs: Not Found \n`;
			} else if (!isNodeVersionValid) {
				message += `❌ NodeJs: Invalid version ${nodeVersion} \n`;
			} else if (!nodeMeetsVersionRequirement) {
				message +=
					`❌ NodeJs: Does not meet min version requirement: found: ${nodeVersion}, expected: ${minNodeVersion} \n`;
			} else {
				message += `✅ Taq CLI: Node ${nodeVersion} found \n`;
			}
			// this.systemCheckTreeView.message = message;
		}

		const mainFolder = this.getMainWorkspaceFolder();
		if (mainFolder === undefined) {
			this.showLog(OutputLevels.trace, 'No folder is open, enabling init and scaffold');
			this.vscode.commands.executeCommand(
				'setContext',
				'@taqueria-state/enable-init-scaffold',
				true,
			);
			return;
		}
		this.refreshDataProviders.forEach(dataProvider => dataProvider.refresh());

		this.showLog(OutputLevels.trace, 'Project config changed, updating command states...');
		let taqFolderFound: boolean;
		try {
			await Util.makeDir(join(mainFolder.path, '.taq'), this.i18);
			this.showLog(OutputLevels.trace, 'Taq folder is found');
			taqFolderFound = true;
		} catch {
			taqFolderFound = false;
			this.showLog(OutputLevels.trace, 'Taq folder not found');
		}
		let enableAllCommands: boolean;
		let config: Util.TaqifiedDir | null;
		try {
			config = await Util.TaqifiedDir.create(mainFolder.fsPath as Util.PathToDir, this.i18);
			enableAllCommands = false;
		} catch (e: unknown) {
			config = null;
			enableAllCommands = taqFolderFound;
			// We don't want to show messages to users when they are working with non-taqified folders (Except when output level is set to info or more verbose)
			if (shouldOutput(OutputLevels.info, this.output.logLevel) || taqFolderFound) {
				this.vscode.commands.executeCommand('setContext', '@taqueria-state/enable-all-commands', true);
				this.showLog(OutputLevels.error, 'Error: Could not update command states:');
				this.logAllNestedErrors(e);
				if (taqFolderFound) {
					this.showLog(
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
		this.showLog(
			OutputLevels.trace,
			`@taqueria-state/enable-init-scaffold: ${enableAllCommands || !config?.config}`,
		);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/enable-init-scaffold',
			enableAllCommands || !config?.config,
		);

		this.showLog(
			OutputLevels.trace,
			`@taqueria-state/enable-install-uninstall: ${enableAllCommands || !!config?.config}`,
		);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria-state/enable-install-uninstall',
			enableAllCommands || !!config?.config,
		);

		this.showLog(OutputLevels.trace, `@taqueria-state/is-taqified: ${!!config?.config}`);
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
		this.showLog(OutputLevels.trace, `Known plugins: ${JSON.stringify(plugins)}`);
		for (const plugin of plugins) {
			const found = config?.config?.plugins?.find(item => item.name === plugin) !== undefined;
			this.showLog(OutputLevels.trace, `plugins ${plugin}: ${found}`);
			this.vscode.commands.executeCommand('setContext', plugin, enableAllCommands || found);
		}
		const installedCompilers = this.getCompilerPlugins().filter(compiler =>
			config?.config?.plugins?.find(plugin => plugin.name === compiler) !== undefined
		)
			.map(pluginName => pluginName.replace('@taqueria/plugin-', ''));
		this.vscode.commands.executeCommand('setContext', '@taqueria/plugin-any-compiler', installedCompilers.length !== 0);
		const supportedFileExtensions = getSupportedSmartContractExtensions(config);
		this.vscode.commands.executeCommand(
			'setContext',
			'@taqueria/supported-smart-contract-extensions',
			supportedFileExtensions,
		);
		this.showLog(OutputLevels.debug, `Supported extensions: ${JSON.stringify(supportedFileExtensions)}`);
	}

	public static isPluginInstalled(config: Util.TaqifiedDir | null | undefined, pluginName: string) {
		return (config?.config?.plugins?.findIndex(p => p.name === pluginName) ?? -1) !== -1;
	}

	private _taqFolderWatcher: api.FileSystemWatcher | undefined;
	private _configWatcher: api.FileSystemWatcher | undefined;
	private _stateWatcher: api.FileSystemWatcher | undefined;

	get taqFolderWatcher() {
		return this._taqFolderWatcher;
	}

	get configWatcher() {
		return this._configWatcher;
	}

	get stateWatcher() {
		return this._stateWatcher;
	}

	createWatcherIfNotExists(
		projectDir: string,
		addConfigWatcherIfNotExists: (folder: string, factory: () => api.FileSystemWatcher[]) => void,
	) {
		this.showLog(OutputLevels.debug, `Directory ${projectDir} should be watched.`);
		addConfigWatcherIfNotExists(projectDir, () => {
			this.showLog(OutputLevels.info, `Adding watchers for directory ${projectDir}.`);
			try {
				const taqFolderWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq'));
				this._taqFolderWatcher = taqFolderWatcher;
				const configWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/config.json'));
				this._configWatcher = configWatcher;
				const stateWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '.taq/state.json'));
				this._stateWatcher = stateWatcher;

				const contractsFolderWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, 'contracts'));
				const contractsWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, 'contracts/*'));
				const testsWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, '**/jest.config.js'));

				const artifactsFolderWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, 'artifacts'));
				const artifactsWatcher = this.vscode.workspace.createFileSystemWatcher(join(projectDir, 'artifacts/**/*.tz'));

				// TODO: Is passing these arguments to the callback of a long lived watcher prevent GC? Are these short lived objects?
				taqFolderWatcher.onDidChange((e: api.Uri) => this.updateCommandStates());
				taqFolderWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates());
				taqFolderWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates());

				configWatcher.onDidChange((e: api.Uri) => this.updateCommandStates());
				configWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates());
				configWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates());

				stateWatcher.onDidChange((e: api.Uri) => this.updateCommandStates());
				stateWatcher.onDidCreate((e: api.Uri) => this.updateCommandStates());
				stateWatcher.onDidDelete((e: api.Uri) => this.updateCommandStates());

				contractsFolderWatcher.onDidChange(_ => this.contractsDataProvider?.refresh());
				contractsFolderWatcher.onDidCreate(_ => this.contractsDataProvider?.refresh());
				contractsFolderWatcher.onDidDelete(_ => this.contractsDataProvider?.refresh());
				contractsWatcher.onDidChange(_ => this.contractsDataProvider?.refresh());
				contractsWatcher.onDidCreate(_ => this.contractsDataProvider?.refresh());
				contractsWatcher.onDidDelete(_ => this.contractsDataProvider?.refresh());

				artifactsFolderWatcher.onDidChange(_ => this.artifactsDataProvider?.refresh());
				artifactsFolderWatcher.onDidCreate(_ => this.artifactsDataProvider?.refresh());
				artifactsFolderWatcher.onDidDelete(_ => this.artifactsDataProvider?.refresh());
				artifactsWatcher.onDidChange(_ => this.artifactsDataProvider?.refresh());
				artifactsWatcher.onDidCreate(_ => this.artifactsDataProvider?.refresh());
				artifactsWatcher.onDidDelete(_ => this.artifactsDataProvider?.refresh());

				testsWatcher.onDidChange(_ => this.testDataProvider?.refresh());
				testsWatcher.onDidCreate(_ => this.testDataProvider?.refresh());
				testsWatcher.onDidDelete(_ => this.testDataProvider?.refresh());

				try {
					this.updateCommandStates();
				} catch (error: any) {
					this.logAllNestedErrors(error);
				}

				return [
					taqFolderWatcher,
					configWatcher,
					stateWatcher,
					contractsFolderWatcher,
					contractsWatcher,
					artifactsFolderWatcher,
					artifactsWatcher,
					testsWatcher,
				];
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

	private refreshDataProviders: { refresh: () => void }[] = [];
	private contractsDataProvider?: ContractsDataProvider;
	private artifactsDataProvider?: ArtifactsDataProvider;
	private sandboxesDataProvider?: SandboxesDataProvider;
	private testDataProvider?: TestDataProvider;
	private systemCheckDataProvider?: SystemCheckDataProvider;
	private systemCheckTreeView?: api.TreeView<SystemCheckTreeItem>;
	private observableConfig!: ObservableConfig;

	async registerDataProviders() {
		this.observableConfig = await ObservableConfig.create(this);
		this.registerDataProvider('taqueria-plugins', new PluginsDataProvider(this));
		this.sandboxesDataProvider = this.registerDataProvider(
			'taqueria-sandboxes',
			new SandboxesDataProvider(this, this.observableConfig),
		);
		this.registerDataProvider('taqueria-environments', new EnvironmentsDataProvider(this));
		this.testDataProvider = this.registerDataProvider('taqueria-tests', new TestDataProvider(this));
		this.contractsDataProvider = this.registerDataProvider(
			'taqueria-contracts',
			new ContractsDataProvider(this),
		);
		this.artifactsDataProvider = this.registerDataProvider(
			'taqueria-artifacts',
			new ArtifactsDataProvider(this),
		);
		this.registerDataProvider('taqueria-scaffold', new ScaffoldsDataProvider(this));
		this.systemCheckDataProvider = this.registerDataProvider(
			'taqueria-system-check',
			new SystemCheckDataProvider(this),
		);
	}

	private registerDataProvider<T extends api.TreeDataProvider<unknown>>(
		treeViewName: string,
		dataProvider: T,
	) {
		this.vscode.window.createTreeView(treeViewName, {
			treeDataProvider: dataProvider,
		});
		if (instanceOfHasRefresh(dataProvider)) {
			this.refreshDataProviders.push(dataProvider);
		}
		return dataProvider;
	}

	listenToDockerEvents() {
		const child = spawn(`docker`, [
			`events`,
			`--filter 'type=container'`,
			`--filter 'event=stop'`,
			`--filter 'event=start'`,
			`--filter 'event=destroy'`,
		], {
			shell: true,
		});
		child.stdout.on('data', _data => {
			this.sandboxesDataProvider?.refresh();
		});
	}

	async watchGlobalSettings() {
		const settingsFilePath = this.getSettingsFilePath();
		const folderWatcher = this.vscode.workspace.createFileSystemWatcher(settingsFilePath);
		folderWatcher.onDidChange(async () => await this.handleAnalyticsOption());
		folderWatcher.onDidCreate(async () => await this.handleAnalyticsOption());
		folderWatcher.onDidDelete(async () => await this.handleAnalyticsOption());
		await this.handleAnalyticsOption();
	}

	private getSettingsFilePath() {
		const homeDir = os.homedir();
		const settingsFilePath = path.join(homeDir, '.taq-settings', 'taq-settings.json');
		return settingsFilePath;
	}

	private isHandlingAnalyticsConsent = false;

	async handleAnalyticsOption(): Promise<true> {
		if (this.isHandlingAnalyticsConsent) {
			return true;
		}
		this.isHandlingAnalyticsConsent = true;
		try {
			const analyticsOptionState = await this.getAnalyticsOptionState();
			switch (analyticsOptionState) {
				case AnalyticsOptionState.fileIsCorrupt:
				case AnalyticsOptionState.fileIsUnreadable:
				case AnalyticsOptionState.optedIn:
				case AnalyticsOptionState.optedOut:
				case AnalyticsOptionState.optionSetToInvalidValue:
					this.isHandlingAnalyticsConsent = false;
					return true;
				case AnalyticsOptionState.optionNotExists:
				case AnalyticsOptionState.fileNotExists: {
					const optIn = { title: `Yes, I'm in`, isCloseAffordance: false };
					const optOut = { title: `No, I'm not interested`, isCloseAffordance: true };
					const chosenOption = await this.vscode.window.showInformationMessage<api.MessageItem>(
						'Do you want to help improve Taqueria by sharing anonymous usage statistics in accordance with the privacy policy?',
						{
							detail:
								`The information will only include anonymous statistics of Taqueria's features, not personally identifiable information is sent to Taqueria team`,
							modal: true,
						},
						optIn,
						optOut,
					);
					if (chosenOption === optIn) {
						await this.proxyToTaqAndShowOutput(
							'opt-in',
							{
								finishedTitle: `opted in to analytics`,
								progressTitle: `opting in to analytics`,
							},
							undefined,
							true,
						);
					} else {
						await this.proxyToTaqAndShowOutput(
							'opt-out',
							{
								finishedTitle: `opted out from analytics`,
								progressTitle: `opting out from analytics`,
							},
							undefined,
							true,
						);
					}
					this.isHandlingAnalyticsConsent = false;
					return true;
				}
			}
		} catch (e: unknown) {
			this.logAllNestedErrors(e, true);
			this.isHandlingAnalyticsConsent = false;
			return true;
		}
	}

	async getAnalyticsOptionState() {
		const settingsFilePath = this.getSettingsFilePath();
		try {
			await stat(settingsFilePath);
		} catch {
			return AnalyticsOptionState.fileNotExists;
		}
		let text: string;
		try {
			text = await readFile(settingsFilePath, 'utf-8');
		} catch {
			return AnalyticsOptionState.fileIsUnreadable;
		}
		try {
			const settings = JSON.parse(text);
			if (!Object.hasOwn(settings, 'consent')) {
				return AnalyticsOptionState.optionNotExists;
			}
			const value = settings['consent'];
			if (value === 'opt_in') {
				return AnalyticsOptionState.optedIn;
			}
			if (value === 'opt_out') {
				return AnalyticsOptionState.optedOut;
			}
			return AnalyticsOptionState.optionSetToInvalidValue;
		} catch {
			return AnalyticsOptionState.fileIsCorrupt;
		}
	}

	async isTaqCliReachable() {
		try {
			const pathToTaq = await this.getTaqBinPath();
			const checkResult = await Util.checkTaqBinary(pathToTaq, this.i18, this.getLog());
			return checkResult.indexOf('OK') !== -1;
		} catch {
			return false;
		}
	}

	async createTreeViews() {
		this.systemCheckTreeView = this.vscode.window.createTreeView<SystemCheckTreeItem>('taqueria-system-check', {
			treeDataProvider: this.systemCheckDataProvider!,
		});
	}

	exposeRefreshSandBoxDataCommand() {
		this.registerCommand('refresh_sandbox_data', async (item: SandboxTreeItemBase) => {
			this.sandboxesDataProvider?.refreshItem(item);
		});
	}

	exposeShowEntrypointParametersCommand() {
		this.registerCommand('show_entrypoint_parameters', async (item: SmartContractEntrypointTreeItem) => {
			// this.showOutput(JSON.stringify(item.jsonParameters, null, 2));
			this.showOutput(JSON.stringify(item.michelineParameters, null, 2));
			// this.showOutput(JSON.stringify(item.michelsonParameters, null, 2));
		});
	}

	exposeShowOperationDetailsCommand() {
		this.registerCommand('show_operation_details', async (item: OperationTreeItem) => {
			const jsonParameters = item.operation;
			this.showOutput(JSON.stringify(jsonParameters, null, 2));
		});
	}

	exposeInvokeEntrypointCommand() {
		this.registerCommand(
			'invoke_entrypoint',
			async (item: SmartContractEntrypointTreeItem) => {
				const michelineParameters = item.michelineParameters;
				const panel = this.vscode.window.createWebviewPanel(
					'entrypointParameter',
					`Editing ${item.name} parameters`,
					this.vscode.ViewColumn.One,
					{
						enableScripts: true,
					},
				);
				const result = createVscodeWebUiHtml({
					webview: panel.webview,
					subscriptions: this.context.subscriptions,
					interop: {
						view: 'MichelineEditor',
						input: {
							dataType: michelineParameters,
							actionTitle: 'Invoke Entrypoint',
						},
						onMessage: async x => {
							if (x.kind === 'action') {
								const fileName = 'invoke_temp_file.tz';
								fs.writeFileSync(
									path.join(
										this.observableConfig.currentConfig.pathToDir!,
										`artifacts/${fileName}`,
									),
									x.micheline || '',
								);
								const config = this.observableConfig.currentConfig.config;
								if (!config) {
									this.showLog(
										OutputLevels.error,
										'Unexpected: Current config is empty',
									);
									return;
								}
								const environmentName = await this.getEnvironment(config);
								await this.proxyToTaqAndShowOutput(
									`call ${
										item.parent.alias ?? item.parent.address
									} --entrypoint ${item.name} --param ${fileName} --env ${environmentName}`,
									{
										finishedTitle: `invoked entrypoint ${item.name}`,
										progressTitle: `invoking entrypoint ${item.name}`,
									},
									this.observableConfig.currentConfig.pathToDir,
									false,
								);
							}
						},
					},
				});
				panel.webview.html = result.html;
			},
		);
	}

	/**
	 * @returns true if installed successfully, false is not installed
	 */
	async downloadAndInstallTaqCLI(): Promise<boolean> {
		// 1. Detect platform
		switch (process.platform) {
			case 'linux':
				return this.performDownloadingAndInstallTaqCLI('https://taqueria.io/get/linux/taq');
			case 'darwin':
				return this.performDownloadingAndInstallTaqCLI('https://taqueria.io/get/macos/taq');
			default:
				this.showLog(OutputLevels.warn, `Taqueria CLI is not supported on ${process.platform}`);
				return false;
		}
	}

	private async performDownloadingAndInstallTaqCLI(taqDownloadUrl: string): Promise<boolean> {
		// 2. Download binary
		const { executionError: curlError } = await execCmd(
			`curl -s ${taqDownloadUrl} -o /tmp/taq -L`,
			this.getLog(),
		);
		this.showLog(OutputLevels.debug, `Downloading Taqueria CLI...`);
		if (curlError) {
			this.showLog(OutputLevels.error, `Failed to download Taqueria CLI: ${curlError}`);
			return false;
		}
		this.showLog(OutputLevels.info, `Taqueria CLI downloaded successfully`);

		// 3. Make Taqueria CLI executable
		const { executionError: chmodError } = await execCmd(`chmod +x /tmp/taq`, this.getLog());
		if (chmodError) {
			this.showLog(OutputLevels.error, `Failed to make Taqueria CLI executable: ${chmodError}`);
			return false;
		}
		this.showLog(OutputLevels.info, `Taqueria CLI made executable successfully`);

		// 4. Ask for sudo password
		const sudoPassword = await this.vscode.window.showInputBox({
			password: true,
			title: 'Enter your sudo password',
			prompt: 'Sudo password is required in order to install Taq CLI',
		});
		if (!sudoPassword) {
			this.showLog(
				OutputLevels.error,
				`Sudo password is required in order to move Taq CLI binary to /usr/local/bin directory`,
			);
			return false;
		}

		// 5. Move to usr bin
		const { executionError: moveError } = await execCmd(
			`mv /tmp/taq /usr/local/bin`,
			this.getLog(),
			{ sudoPassword },
		);
		if (moveError) {
			this.showLog(OutputLevels.error, `Failed to move Taqueria CLI to /usr/local/bin: ${moveError}`);
			return false;
		}
		this.showLog(OutputLevels.info, `Taqueria CLI moved to /usr/local/bin successfully`);

		// 6. Check if taq is reachable
		const { executionError: checkError } = await execCmd(`taq --version`, this.getLog());
		if (checkError) {
			this.showLog(OutputLevels.error, `Failed to check Taqueria CLI: ${checkError}`);
			return false;
		}
		this.showLog(OutputLevels.info, `Taqueria CLI installed successfully`);

		// 7. Refresh side panel UI
		await this.updateCommandStates();
		return true;
	}
}
