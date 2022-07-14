import * as api from 'vscode';
import { InjectedDependencies, sanitizeDeps, VsCodeHelper } from './lib/helpers';
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

	const folders = helper.getFolders();
	if (folders.length === 1) {
		await makeDir(folders[0].uri.path, helper.i18n)
			.then(projectDir => {
				// Compilation tasks
				helper.exposeTaqTaskAsCommandWithOptionalFileArgument(
					COMMAND_PREFIX + 'compile_smartpy',
					'--plugin smartpy compile',
					'output',
					'Compilation successful.',
					projectDir,
				);
				helper.exposeTaqTaskAsCommandWithOptionalFileArgument(
					COMMAND_PREFIX + 'compile_ligo',
					'--plugin ligo compile',
					'output',
					'Compilation successful.',
					projectDir,
				);
				helper.exposeTaqTaskAsCommandWithOptionalFileArgument(
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
				helper.exposeTypecheckCommand();
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
	} else if (folders.length === 0) {
		helper.updateCommandStates();
	}
}

export function deactivate() {
	clearConfigWatchers();
}
