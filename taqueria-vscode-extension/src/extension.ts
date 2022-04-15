import { I18N } from './lib/pure'
import { exposeInitTask, exposeInstallTask, exposeTaqTaskAsCommand, exposeSandboxTaskAsCommand } from './lib/helpers'
import { makeDir } from './lib/pure'
import { COMMAND_PREFIX } from './lib/helpers'
import * as vscode from 'vscode'
import path = require('path')
export async function activate(context: vscode.ExtensionContext) {
    const i18n: I18N = {} // temporary
    const output = vscode.window.createOutputChannel('Taqueria')
    const folders = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders : []

    // Add built-in tasks for Taqueria
    await exposeInitTask(context, output, i18n, folders)
    await exposeInstallTask(context, output, folders, i18n)
    // await exposeTasksFromState (context, output, folders, i18n)

    // Temporary - hard coded list of tasks we know we need to support
    // Caveats:
    // 1) We're only supporting a project with a single workspace folder open
    // 2) We're displaying all known tasks from our first-party list of plugins.
    // Third-party plugins aren't exposed via the VS Code interface
    if (folders.length === 1) {
        await makeDir(folders[0].uri.path, i18n).then((projectDir) => {
            const exposeTaqTask = exposeTaqTaskAsCommand(context, output, i18n, projectDir)
            const exposeSandboxTask = exposeSandboxTaskAsCommand(context, output, i18n, projectDir)

            // Compilation tasks
            exposeTaqTask(
                COMMAND_PREFIX + 'compile_smartpy',
                '--plugin smartpy compile',
                'output',
                'Compilation successful.',
            )
            exposeTaqTask(COMMAND_PREFIX + 'compile_ligo', '--plugin ligo compile', 'output', 'Compilation successful.')

            // Sandbox tasks
            exposeSandboxTask(COMMAND_PREFIX + 'start_sandbox', 'start sandbox', 'notify')
            exposeSandboxTask(COMMAND_PREFIX + 'stop_sandbox', 'stop sandbox', 'notify')
            exposeSandboxTask(COMMAND_PREFIX + 'list_accounts', 'list accounts', 'output')

            // Originate task
            exposeTaqTask(COMMAND_PREFIX + 'deploy', 'deploy', 'output', 'Deployment successful.')
        })
    }

    // If the developer changes their workspace folders,
    // then the list of taqified projects might have changed,
    // and therefore the list of tasks we're aware of might
    // have changed as well. We're best to reload.
    // 	vscode.workspace.onDidChangeWorkspaceFolders(_ => {
    // 		vscode.window.showWarningMessage("As the list of projects has changed, Taqueria will need to reload.")
    // 		.then(_ => vscode.window.showQuickPick(["yes", "no"], {
    // 			canPickMany: false,
    // 			placeHolder: "Reload now?",
    // 			title: "Reload this window?"
    // 		}))
    // 		.then(input => {
    // 			if (input) return vscode.commands.executeCommand("workbench.action.reloadWindow")
    // 		})
    // 	})
}

export function deactivate() {}
