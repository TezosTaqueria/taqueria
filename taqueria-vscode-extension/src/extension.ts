import * as api from 'vscode';
import { COMMAND_PREFIX, InjectedDependencies, sanitizeDeps, VsCodeHelper } from './lib/helpers';
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
	helper.listenToDockerEvents();

	// Add built-in tasks for Taqueria
	helper.exposeInitTask();
	helper.exposeScaffoldTask();
	await helper.exposeInstallTask();
	await helper.exposeUninstallTask();
	helper.exposeTaqTaskAsCommand(
		COMMAND_PREFIX + 'opt_in',
		'opt-in',
		'output',
		{
			finishedTitle: `opted in to analytics`,
			progressTitle: `opting in to analytics`,
		},
	);
	helper.exposeTaqTaskAsCommand(
		COMMAND_PREFIX + 'opt_out',
		'opt-out',
		'output',
		{
			finishedTitle: `opted out of analytics`,
			progressTitle: `opting out of analytics`,
		},
	);
	// await helper.watchGlobalSettings();

	const folders = helper.getFolders();
	if (folders.length === 1) {
		await makeDir(folders[0].uri.path, helper.i18n)
			.then(projectDir => {
				// Compilation tasks
				helper.exposeTaqTaskAsCommandWithOptionalFileArgument(
					COMMAND_PREFIX + 'compile_smartpy',
					'--plugin smartpy compile',
					'output',
					{
						finishedTitle: `compiled contract(s)`,
						progressTitle: `compiling contract(s)`,
					},
					projectDir,
				);
				helper.exposeTaqTaskAsCommandWithOptionalFileArgument(
					COMMAND_PREFIX + 'compile_ligo',
					'--plugin ligo compile',
					'output',
					{
						finishedTitle: `compiled contract(s)`,
						progressTitle: `compiling contract(s)`,
					},
					projectDir,
				);
				helper.exposeTaqTaskAsCommandWithOptionalFileArgument(
					COMMAND_PREFIX + 'compile_archetype',
					'--plugin archetype compile',
					'output',
					{
						finishedTitle: `compiled contract(s)`,
						progressTitle: `compiling contract(s)`,
					},
					projectDir,
				);
				helper.exposeTaqTaskAsCommandWithFileArgument(
					COMMAND_PREFIX + 'add_contract',
					'add-contract',
					'output',
					{
						finishedTitle: `added contract to registry`,
						progressTitle: `adding contract to registry`,
					},
					projectDir,
				);
				helper.exposeTaqTaskAsCommandWithFileArgument(
					COMMAND_PREFIX + 'rm_contract',
					'rm-contract',
					'output',
					{
						finishedTitle: `removed contract from registry`,
						progressTitle: `removing contract from registry`,
					},
					projectDir,
				);

				helper.exposeTaqTaskAsCommand(
					COMMAND_PREFIX + 'generate_types',
					'generate types',
					'output',
					{
						finishedTitle: `generated types`,
						progressTitle: `generating types`,
					},
					projectDir,
				);
				helper.exposeTypecheckCommand();
				helper.exposeTestSetupCommand(projectDir);
				helper.exposeRunTestCommand(projectDir);

				// Sandbox tasks
				helper.exposeSandboxTaskAsCommand(
					COMMAND_PREFIX + 'start_sandbox',
					'start sandbox',
					{
						finishedTitle: `started sandbox`,
						progressTitle: `starting sandbox`,
					},
					'notify',
					projectDir,
				);
				helper.exposeSandboxTaskAsCommand(
					COMMAND_PREFIX + 'stop_sandbox',
					'stop sandbox',
					{
						finishedTitle: `stopped sandbox`,
						progressTitle: `stopping sandbox`,
					},
					'notify',
					projectDir,
				);
				helper.exposeSandboxTaskAsCommand(
					COMMAND_PREFIX + 'list_accounts',
					'list accounts',
					{
						finishedTitle: `listed sandbox accounts`,
						progressTitle: `listing sandbox accounts`,
					},
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
