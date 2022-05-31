import * as Util from './pure'
import loadI18n, {i18n} from '@taqueria/protocol/i18n'
import {EphemeralState} from '@taqueria/protocol/EphemeralState'
import { stat } from 'fs/promises';
import { join } from 'path';
import { path } from 'rambda';
import * as api from "vscode"
import { TaqVsxError } from './TaqVsxError';

export const COMMAND_PREFIX = 'taqueria.'

export enum Commands {
	init = 'taqueria.init',
	install = 'taqueria.install',
	uninstall = 'taqueria.uninstall'
}

type VSCodeAPI = typeof api

export interface InjectedDependencies {
	vscode: VSCodeAPI
}

export const sanitizeDeps = (deps?: InjectedDependencies) => deps
	? deps
	: {vscode: api}


export const inject = (deps: InjectedDependencies) => {
	const {vscode} = deps

	const exposeInitTask = async (context: api.ExtensionContext, output: api.OutputChannel, i18n: i18n, folders: readonly api.WorkspaceFolder[]) => {
		const exposeTask = exposeTaqTaskAsCommand (context, output, i18n)
	
		// As the developer has no folder open, we must prompt
		// them for a path they would like to taqify
		if (folders.length === 0) {
			addCommand (context) (Commands.init, () => {
				return vscode.window.showOpenDialog({
					canSelectFolders: true,
					canSelectFiles: false,
					openLabel: "Select project folder",
					title: "Select a project folder to taq'ify",
					canSelectMany: false
				})
				.then(uris => uris?.map(
					uri => getTaqBinPath(i18n)
						.then(pathToTaq =>
							Util.proxyToTaq(pathToTaq, i18n, undefined) (`init ${uri.path}`)
						)
						.then(_ => vscode.window.showInformationMessage("Project taq'fied!", uri.path))
						.then(_ => vscode.workspace.updateWorkspaceFolders(0, undefined, {uri}))
				))
				.then(console.log) as Promise<void>
			})
		}
	
		// The developer has one folder open. We can assume that
		// is the folder they wish to taqify
		else if (folders.length === 1) {
			return exposeTask('taqueria.init', `init ${folders[0].uri.path}`, 'notify')
		}
	
		// The developer has multiple folders in the their workspace.
		// As can't really know which one to taqify without prompting them
		else {
			console.log("Coming soon!")
		}
	}

	const getTaqifiedDirectories = (folders: readonly api.WorkspaceFolder[], i18n: i18n) => {
		const processes = folders.map(folder => {
			const taqifiedPath = join(folder.uri.path, '.taq')
			return stat(taqifiedPath)
				.then(_ => Util.makeDir(folder.uri.path, i18n))
				.catch(_ => undefined)
		})
	
		return Promise.all(processes)
			.then(results => results.reduce(
				(paths: Util.PathToDir[], pathToDir) => {
					return pathToDir
						? [...paths, pathToDir]
						: paths
				},
				[]
			))
	}

	const promptForPluginSelection = (_i18n: i18n, availablePlugins: string[]) =>
		vscode.window.showQuickPick(availablePlugins, {
			canPickMany: false,
			ignoreFocusOut: false,
			placeHolder: "Plugin name",
			title: "Select a plugin"
		})

	const promptForTaqProject = (_i18n: i18n, availableProjects: readonly string[]) =>
		vscode.window.showQuickPick(availableProjects, {
			canPickMany: false,
			ignoreFocusOut: false,
			title: "Select a project",
			placeHolder: "Directory"
		})

	
	const exposeInstallTask = async (context: api.ExtensionContext, output: api.OutputChannel, folders: readonly api.WorkspaceFolder[], i18n: i18n) => {
		const exposeTask = exposeTaskAsCommand (context, output, i18n)
		const availablePlugins = [
			"@taqueria/plugin-ligo",
			"@taqueria/plugin-smartpy",
			"@taqueria/plugin-taquito",
			"@taqueria/plugin-flextesa"
		]
		const proxyInstall = (pluginName: string, pathToTaq: Util.PathToTaq, i18n: i18n, projectDir?: Util.PathToDir) =>
			Util.proxyToTaq (pathToTaq, i18n, projectDir) (`install ${pluginName}`)
			.then(notify)
			.catch(showError)
	
		return exposeTask(Commands.install, (pathToTaq: Util.PathToTaq) =>
			getTaqifiedDirectories(folders, i18n)
			.then(results => {
				// The developer has no taqified workspace folders. As such,
				// we cannot install any plugins
				if (results.length === 0) {
					return addCommand (context) (Commands.install, () =>
					showError({kind: 'E_NO_TAQUERIA_PROJECTS', msg: "You don't have any Taqueria projects. You'll need to taq'ify a project using \"Taqueria: Init\" before you can install a plugin."})
					)
				}
				
				// The developer has a single taqified workspace folder, so we know
				// exactly where to install a plugin
				else if (results.length === 1) {
					const projectDir = results[0]
					return promptForPluginSelection(i18n, availablePlugins)
					.then(pluginName => {
						if (pluginName) return proxyInstall(pluginName, pathToTaq, i18n, projectDir)
					})
				}
	
				// The developer has multiple 
				else {
					return promptForTaqProject(i18n, results)
					.then(selectedDir => {
						if (selectedDir) return Util.makeDir(selectedDir, i18n)
							.then(projectDir => 
								promptForPluginSelection(i18n, availablePlugins)
								.then(pluginName => {
									if (pluginName) return proxyInstall(pluginName, pathToTaq, i18n, projectDir)
								})
							)
					})
				}
			})
		)
	}

	const taskNameToCmdId = (taskName: string) => 'taqueria.' + taskName.replace(/\s+/g, '_')


	const exposeTasksFromProject = (context: api.ExtensionContext, output: api.OutputChannel, folders: readonly api.WorkspaceFolder[], i18n: i18n) =>
		(projectDir: Util.PathToDir) => {
			getTaqBinPath(i18n)
			.then(pathToTaq => Util.proxyToTaq(pathToTaq, i18n, projectDir) ('list-known-tasks'))
			.then(data => Util.decodeJson<EphemeralState>(data))
			.then(state => {
				// const cmdId = taskNameToCmdId(taskName)
				return state
			})
		}


	const exposeTasksFromState = (context: api.ExtensionContext, output: api.OutputChannel, folders: readonly api.WorkspaceFolder[], i18n: i18n) =>
		getTaqifiedDirectories(folders, i18n)
		.then(projectDirs => Promise.all(
			projectDirs.map(
				// TODO: Reconcile the list of tasks that were exposed with the extension manifest file
				// If there are changes to the manifest file, prompt to reload
				exposeTasksFromProject (context, output, folders, i18n)
			)
		))

	const getTaqBinPath = (i18n: i18n) => {
		const providedPath = vscode.workspace.getConfiguration('taqueria').get("path", '')
		return providedPath && (providedPath as string).length > 0
			? Util.makePathToTaq (i18n) (providedPath)
			: Util.findTaqBinary (i18n)
				.then(Util.makePathToTaq (i18n))
	}

	const addCommand = (context: api.ExtensionContext) => (cmdId: string, handler: () => Promise<void>) => {
		context.subscriptions.push(
			vscode.commands.registerCommand(cmdId, handler)
		)
	}

	const showError = (err: TaqVsxError) => {
		Util.log ("Error:") (err)
		return (err.context
			? vscode.window.showErrorMessage(err.msg, err.context)
			: vscode.window.showErrorMessage(err.msg))
		.then(_ => Promise.resolve()) as Promise<void>
	}
	
	const notify = (msg: string) => 
		vscode.window.showInformationMessage(msg)
		.then(_ => Promise.resolve()) as Promise<void>


	const showOutput = (output: api.OutputChannel) => (data: string) =>
		Promise.resolve()
		.then(_ => output.clear())
		.then(_ => output.append(data))
		.then(_ => output.show())

	const getSandboxNames = (projectDir: Util.TaqifiedDir) =>
		projectDir.config.sandbox
			? Object.keys(projectDir.config.sandbox)
			: []

	const exposeTaqTaskAsCommand = 
		(context: api.ExtensionContext, output: api.OutputChannel, i18n: i18n, projectDir?: Util.PathToDir) =>
		(cmdId: string, taskWithArgs: string, outputTo: 'output' | 'notify', otherNotification?: string) =>
			exposeTaskAsCommand
				(context, output, i18n, projectDir)
				(cmdId, (pathToTaq: Util.PathToTaq) => 
					Util.proxyToTaq (pathToTaq, i18n, projectDir) (taskWithArgs)
					.then(stdout =>
						outputTo === 'output'
							? showOutput (output) (stdout)
							: notify (stdout)
					)
					.then(_ => {
						if (otherNotification) notify(otherNotification)
					})
				)
	const exposeTaskAsCommand =
		(context: api.ExtensionContext, output: api.OutputChannel, i18n: i18n, projectDir?: Util.PathToDir) =>
		(cmdId: string, handler: ((pathToTaq: Util.PathToTaq) => Promise<void>)) =>
			addCommand (context) (
				cmdId,
					() => 
					getTaqBinPath (i18n)
					.then(handler)
					.catch(showError)
			)

	const exposeSandboxTaskAsCommand =
		(context: api.ExtensionContext, output: api.OutputChannel, i18n: i18n, projectDir: Util.PathToDir) =>
		(cmdId: string, taskName: string, outputTo: 'output' | 'notify', otherNotification?: string) => {
			const exposeTask = exposeTaskAsCommand (context, output, i18n, projectDir)
			return exposeTask(
				cmdId,
				pathToTaq =>
					Util.TaqifiedDir.create(projectDir, i18n)
					.then(getSandboxNames)
					.then(items => vscode.window.showQuickPick(items, {
						canPickMany: false,
						ignoreFocusOut: false,
						placeHolder: 'Sandbox name',
						title: 'Select a sandbox'
					}))
					.then(sandboxName => (sandboxName
						? Util.proxyToTaq(pathToTaq, i18n, projectDir)
							(`${taskName} ${sandboxName}`)
							.then(stdout =>
								outputTo === 'output'
									? showOutput (output) (stdout)
									: notify (stdout)
							)
							.then(_ => {
								if (otherNotification) notify(otherNotification)
							})
						: Promise.resolve()
					) as Promise<void>)
					.catch(showError)
			)
		}

	return {
		exposeInitTask,
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
		exposeSandboxTaskAsCommand
	}
}