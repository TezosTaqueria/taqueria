// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const path = vscode.workspace.getConfiguration('taqueria').get("path")
	let wf = vscode.workspace.workspaceFolders?.[0].uri.path;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Taqueria extension initiated successfully taqueria.init');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('taqueria.init', async () => {
		const projectPath = await vscode.window.showInputBox({
			title: 'Project path',
			value: wf
		})
		const cp = require('child_process')
		cp.exec(`${path}taqueria init ${projectPath ?? wf}`, (err: any, stdout: Buffer, stderr: Buffer) => {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (err) {
				console.log('error: ' + err);
			}

			if (stderr) {
				vscode.window.showErrorMessage(stderr.toString('utf-8'));
			} else if (stdout) {
				vscode.window.showInformationMessage(stdout.toString('utf-8'));
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
