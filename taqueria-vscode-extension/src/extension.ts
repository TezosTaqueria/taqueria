import type { I18N } from './lib/pure'
import { exposeTaskAsCommand, addCommand } from './lib/helpers'
import * as vscode from 'vscode'

enum Commands {
	init = 'taqueria.init'
}


const exposeInitTask = (context: vscode.ExtensionContext, output: vscode.OutputChannel, i18n: I18N, folders: readonly vscode.WorkspaceFolder[]) => {
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
			.then(console.log) as Promise<void>
		})
	}

	// The developer has one folder open. We can assume that
	// is the folder they wish to taqify
	else if (folders.length === 1) {
		const exposeTask = exposeTaskAsCommand (context, output, i18n)
		return exposeTask('taqueria.init', `init ${folders[0].uri.path}`, 'notify')
	}

	// The developer has multiple folders in the their workspace.
	// As can't really know which one to taqify without prompting them
	else {
		console.log("Coming soon!")
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const i18n: I18N = {} // temporary
	const output = vscode.window.createOutputChannel("Taqueria")
	const exposeTask = exposeTaskAsCommand (context, output, i18n)
	const folders = vscode.workspace.workspaceFolders
		? vscode.workspace.workspaceFolders
		: []


	// Add built-in tasks for Taqueria
	return exposeInitTask (context, output, i18n, folders)
}

// this method is called when your extension is deactivated
export function deactivate() { }
