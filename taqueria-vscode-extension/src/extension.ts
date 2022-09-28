import * as api from 'vscode';
import { InjectedDependencies, sanitizeDeps, VsCodeHelper } from './lib/helpers';

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
	helper.listenToDockerEvents();

	// Add built-in tasks for Taqueria
	helper.exposeInitTask();
	helper.exposeScaffoldTask();
	await helper.exposeInstallTask();
	await helper.exposeUninstallTask();
	helper.exposeTaqTaskAsCommand(
		'opt_in',
		'opt-in',
		'output',
		{
			finishedTitle: `opted in to analytics`,
			progressTitle: `opting in to analytics`,
		},
	);
	helper.exposeTaqTaskAsCommand(
		'opt_out',
		'opt-out',
		'output',
		{
			finishedTitle: `opted out of analytics`,
			progressTitle: `opting out of analytics`,
		},
	);
	helper.exposeRefreshCommand();
	// await helper.watchGlobalSettings();

	helper.exposeCompileCommand('compile_smartpy', 'getFromCommand', 'smartpy');
	helper.exposeCompileCommand('compile_ligo', 'getFromCommand', 'ligo');
	helper.exposeCompileCommand('compile_archetype', 'getFromCommand', 'archetype');
	helper.exposeCompileCommand('compile_pick_file', 'openDialog', undefined);
	helper.exposeCompileCommand('compile_current_file', 'currentFile', undefined);
	helper.exposeTaqTaskAsCommandWithFileArgument(
		'add_contract',
		'add-contract',
		'output',
		{
			finishedTitle: `added contract to registry`,
			progressTitle: `adding contract to registry`,
		},
	);
	helper.exposeTaqTaskAsCommandWithFileArgument(
		'rm_contract',
		'rm-contract',
		'output',
		{
			finishedTitle: `removed contract from registry`,
			progressTitle: `removing contract from registry`,
		},
	);

	helper.exposeTaqTaskAsCommand(
		'generate_types',
		'generate types',
		'output',
		{
			finishedTitle: `generated types`,
			progressTitle: `generating types`,
		},
	);
	helper.exposeTypecheckCommand();
	helper.exposeTestSetupCommand();
	helper.exposeRunTestCommand();

	// Sandbox tasks
	helper.exposeSandboxTaskAsCommand(
		'start_sandbox',
		'start sandbox',
		{
			finishedTitle: `started sandbox`,
			progressTitle: `starting sandbox`,
		},
	);
	helper.exposeSandboxTaskAsCommand(
		'stop_sandbox',
		'stop sandbox',
		{
			finishedTitle: `stopped sandbox`,
			progressTitle: `stopping sandbox`,
		},
	);
	helper.exposeSandboxTaskAsCommand(
		'list_accounts',
		'list accounts',
		{
			finishedTitle: `listed sandbox accounts`,
			progressTitle: `listing sandbox accounts`,
		},
	);

	helper.exposeOriginateTask('originate', 'getFromCommand');
	helper.exposeOriginateTask('originate_current_file', 'currentFile');
	helper.exposeOriginateTask('originate_pick_file', 'openDialog');
	helper.exposeRefreshSandBoxDataCommand();
	helper.exposeShowEntrypointParametersCommand();
	helper.exposeShowOperationDetailsCommand();

	deps.vscode.workspace.onDidChangeWorkspaceFolders(e => {
		e.added.forEach(folder => {
			try {
				helper.createWatcherIfNotExists(folder.uri.fsPath, addConfigWatcherIfNotExists);
			} catch (error: unknown) {
				helper.logAllNestedErrors(error);
			}
		});
	});

	deps.vscode.workspace.workspaceFolders?.forEach(folder => {
		try {
			helper.createWatcherIfNotExists(folder.uri.fsPath, addConfigWatcherIfNotExists);
		} catch (error: unknown) {
			helper.logAllNestedErrors(error);
		}
	});
	await helper.registerDataProviders();
	helper.createTreeViews();
	helper.updateCommandStates();
}

export function deactivate() {
	clearConfigWatchers();
}
