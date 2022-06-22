import loadI18n, { i18n } from '@taqueria/protocol/i18n';
import path from 'path';
import * as api from 'vscode';
import { inject, InjectedDependencies, sanitizeDeps } from './lib/helpers';
import { COMMAND_PREFIX } from './lib/helpers';
import { makeDir } from './lib/pure';

const { clearConfigWatchers, getConfigWatchers, addConfigWatcherIfNotExists } = (() => {
	const inMemoryState = {
		configWatchers: new Map<string, api.FileSystemWatcher>(),
	};

	const clearConfigWatchers = () => {
		for (const watcher of inMemoryState.configWatchers.values()) {
			watcher.dispose();
		}
		inMemoryState.configWatchers.clear();
	};

	const getConfigWatchers = () => inMemoryState.configWatchers.values();

	const addConfigWatcherIfNotExists = (folder: string, factory: () => api.FileSystemWatcher) => {
		if (inMemoryState.configWatchers.has(folder)) {
			return;
		}
		const watcher = factory();
		inMemoryState.configWatchers.set(folder, watcher);
	};

	return {
		clearConfigWatchers,
		getConfigWatchers,
		addConfigWatcherIfNotExists,
	};
})();

export async function activate(context: api.ExtensionContext, input?: InjectedDependencies) {
	const deps = sanitizeDeps(input);
	const { vscode } = deps;
	const {
		exposeInitTask,
		exposeInstallTask,
		exposeTaqTaskAsCommand,
		exposeSandboxTaskAsCommand,
		createWatcherIfNotExists,
	} = inject(deps);

	const i18n: i18n = await loadI18n();
	const output = vscode.window.createOutputChannel('Taqueria');
	const folders = vscode.workspace.workspaceFolders
		? vscode.workspace.workspaceFolders
		: [];

	// Add built-in tasks for Taqueria
	await exposeInitTask(context, output, i18n, folders);
	await exposeInstallTask(context, output, folders, i18n);
	// await exposeTasksFromState (context, output, folders, i18n)

	// Temporary - hard coded list of tasks we know we need to support
	// Caveats:
	// 1) We're only supporting a project with a single workspace folder open
	// 2) We're displaying all known tasks from our first-party list of plugins.
	// Third-party plugins aren't exposed via the VS Code interface
	if (folders.length === 1) {
		await makeDir(folders[0].uri.path, i18n)
			.then(projectDir => {
				const exposeTaqTask = exposeTaqTaskAsCommand(context, output, i18n, projectDir);
				const exposeSandboxTask = exposeSandboxTaskAsCommand(context, output, i18n, projectDir);

				// Compilation tasks
				exposeTaqTask(
					COMMAND_PREFIX + 'compile_smartpy',
					'--plugin smartpy compile',
					'output',
					'Compilation successful.',
				);
				exposeTaqTask(COMMAND_PREFIX + 'compile_ligo', '--plugin ligo compile', 'output', 'Compilation successful.');

				// Sandbox tasks
				exposeSandboxTask(COMMAND_PREFIX + 'start_sandbox', 'start sandbox', 'notify');
				exposeSandboxTask(COMMAND_PREFIX + 'stop_sandbox', 'stop sandbox', 'notify');
				exposeSandboxTask(COMMAND_PREFIX + 'list_accounts', 'list accounts', 'output');

				// Originate task
				exposeTaqTask(COMMAND_PREFIX + 'deploy', 'deploy', 'output', 'Deployment successful.');

				createWatcherIfNotExists(context, output, i18n, projectDir, addConfigWatcherIfNotExists);
			});
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

export function deactivate() {
	clearConfigWatchers();
}
