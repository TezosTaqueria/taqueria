import * as vscode from 'vscode';
import { LogHelper } from './LogHelper';

export class WatcherList {
	constructor(private logHelper: LogHelper) {
		this.configWatchers = new Map<string, vscode.FileSystemWatcher[]>();
	}
	private configWatchers: Map<string, vscode.FileSystemWatcher[]>;

	clearConfigWatchers() {
		for (const watcherList of this.configWatchers.values()) {
			for (const watcher of watcherList) {
				watcher.dispose();
			}
		}
		this.configWatchers.clear();
	}

	getConfigWatchers() {
		return this.configWatchers.values();
	}

	addConfigWatcherIfNotExists(folder: string, factory: () => vscode.FileSystemWatcher[]) {
		if (this.configWatchers.has(folder)) {
			return;
		}
		const watcher = factory();
		this.configWatchers.set(folder, watcher);
	}
}
