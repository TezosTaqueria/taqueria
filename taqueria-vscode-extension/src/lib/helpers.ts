import * as vscode from 'vscode';
import * as Util from './pure'
import type {I18N} from './pure'

export const getTaqBinPath = (i18n: I18N) => {
	const providedPath = vscode.workspace.getConfiguration('taqueria').get("path", '')
	return providedPath && (providedPath as string).length > 0
		? Util.makePathToTaq (i18n) (providedPath)
		: Util.findTaqBinary (i18n)
			.then(Util.makePathToTaq (i18n))
}

export const addCommand = (context: vscode.ExtensionContext) => (cmdId: string, handler: () => Promise<void>) => {
	context.subscriptions.push(
		vscode.commands.registerCommand(cmdId, handler)
	)
}

const toErrorMessage = (err: Util.TaqErr) => {
	switch (err.code) {
		case 'E_EXEC':
			return `${err.msg} (${err.cmd})`
	}
}

export const showError = (err: Util.TaqErr) => {
	switch (err.code) {
		case 'E_EXEC':
			return vscode.window.showErrorMessage(err.msg, err.cmd)
			.then(_ => Promise.resolve()) as Promise<void>
		case 'E_INVALID_DIR':
			return vscode.window.showErrorMessage(err.msg, err.pathProvided)
			.then(_ => Promise.resolve()) as Promise<void>
		case 'E_INVALID_FILE':
			return vscode.window.showErrorMessage(err.msg, err.pathProvided)
			.then(_ => Promise.resolve()) as Promise<void>
		case 'E_INVALID_JSON':
			return vscode.window.showErrorMessage(err.msg, err.data)
			.then(_ => Promise.resolve()) as Promise<void>
		case 'E_NOT_TAQIFIED':
			return vscode.window.showErrorMessage(err.msg, err.pathProvided)
			.then(_ => Promise.resolve()) as Promise<void>
		case 'E_PROXY':
			return vscode.window.showErrorMessage(err.msg)
			.then(_ => Promise.resolve()) as Promise<void>
		case 'E_STATE_MISSING':
			return vscode.window.showErrorMessage(err.msg, err.taqifiedDir)
			.then(_ => Promise.resolve()) as Promise<void>
		case 'E_TAQ_NOT_FOUND':
			return (err.pathProvided ? vscode.window.showErrorMessage(err.msg, err.pathProvided) : vscode.window.showErrorMessage(err.msg)) 
			.then(_ => Promise.resolve()) as Promise<void>
	}
}
	

export const notify = (msg: string) => 
	vscode.window.showInformationMessage(msg)
	.then(_ => Promise.resolve()) as Promise<void>

export const showOutput = (output: vscode.OutputChannel) => (data: string) =>
	Promise.resolve()
	.then(() => output.append(data))

export const exposeTaskAsCommand = 
	(context: vscode.ExtensionContext, output: vscode.OutputChannel, i18n: I18N, projectDir?: Util.PathToDir) =>
	(cmdId: string, taskWithArgs: string, outputTo: 'output' | 'notify') =>
		addCommand (context) (
			cmdId,
				() => 
				getTaqBinPath (i18n)
				.then(pathToTaq => Util.proxyToTaq (pathToTaq, i18n, projectDir) (taskWithArgs))
				.then(stdout =>
					outputTo === 'output'
						? showOutput (output) (stdout)
						: notify (stdout)
				)
				.catch(showError)
		)