import loadI18n, { i18n } from '@taqueria/protocol/i18n';
import path from 'path';
import * as api from 'vscode';
import { PluginsDataProvider } from './lib/gui/PluginsDataProvider';
import { InjectedDependencies, OutputLevels, sanitizeDeps, VsCodeHelper } from './lib/helpers';
import { COMMAND_PREFIX } from './lib/helpers';
import { makeDir } from './lib/pure';

const { clearConfigWatchers, getConfigWatchers, addConfigWatcherIfNotExists } = (() => {
	const inMemoryState = {
		configWatchers: new Map<string, api.FileSystemWatcher[]>(),
	};

	const clearConfigWatchers = () => {
		for (const watcherList of inMemoryState.configWatchers.values()) {
			for (const watcher of watcherList) {
				watcher.dispose();
			}
		}
		inMemoryState.configWatchers.clear();
	};

	const getConfigWatchers = () => inMemoryState.configWatchers.values();

	const addConfigWatcherIfNotExists = (folder: string, factory: () => api.FileSystemWatcher[]) => {
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
	const helper = await VsCodeHelper.construct(context, deps);

	// Add built-in tasks for Taqueria
	await helper.exposeInitTask();
	await helper.exposeScaffoldTask();
	await helper.exposeInstallTask();
	await helper.exposeUninstallTask();
	helper.exposeTaqTaskAsCommand(
		COMMAND_PREFIX + 'opt_in',
		'opt-in',
		'output',
		'Successfully opted in to analytics.',
	);
	helper.exposeTaqTaskAsCommand(
		COMMAND_PREFIX + 'opt_out',
		'opt-out',
		'output',
		'Successfully opted out from analytics.',
	);
	// await exposeTasksFromState (context, output, folders, i18n)

	// Temporary - hard coded list of tasks we know we need to support
	// Caveats:
	// 1) We're only supporting a project with a single workspace folder open
	// 2) We're displaying all known tasks from our first-party list of plugins.
	// Third-party plugins aren't exposed via the VS Code interface
	const folders = helper.getFolders();
	if (folders.length === 1) {
		await makeDir(folders[0].uri.path, helper.i18n)
			.then(projectDir => {
				// Compilation tasks
				helper.exposeTaqTaskAsCommand(
					COMMAND_PREFIX + 'compile_smartpy',
					'--plugin smartpy compile',
					'output',
					'Compilation successful.',
				);
				helper.exposeTaqTaskAsCommand(
					COMMAND_PREFIX + 'compile_ligo',
					'--plugin ligo compile',
					'output',
					'Compilation successful.',
					projectDir,
				);
				helper.exposeTaqTaskAsCommand(
					COMMAND_PREFIX + 'compile_archetype',
					'--plugin archetype compile',
					'output',
					'Compilation successful.',
					projectDir,
				);
				helper.exposeTaqTaskAsCommand(
					COMMAND_PREFIX + 'generate_types',
					'generate types',
					'output',
					'Type generation successful.',
					projectDir,
				);
				helper.exposeTaqTaskAsCommand(
					COMMAND_PREFIX + 'typecheck',
					'typecheck',
					'output',
					'Type generation successful.',
					projectDir,
				);
				helper.exposeTaqTaskAsCommand(
					COMMAND_PREFIX + 'test',
					'test',
					'output',
					'Test setup successful.',
					projectDir,
				);

				// Sandbox tasks
				helper.exposeSandboxTaskAsCommand(
					COMMAND_PREFIX + 'start_sandbox',
					'start sandbox',
					'Starting Sandbox',
					'notify',
					projectDir,
				);
				helper.exposeSandboxTaskAsCommand(
					COMMAND_PREFIX + 'stop_sandbox',
					'stop sandbox',
					'Stopping Sandbox',
					'notify',
					projectDir,
				);
				helper.exposeSandboxTaskAsCommand(
					COMMAND_PREFIX + 'list_accounts',
					'list accounts',
					'Listing Sandbox Accounts',
					'output',
					projectDir,
				);

				helper.exposeOriginateTask();

				try {
					helper.createWatcherIfNotExists(projectDir, addConfigWatcherIfNotExists);
				} catch (error: unknown) {
					helper.logAllNestedErrors(error);
				}
			});
		helper.registerDataProviders(folders[0].uri.fsPath);
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
