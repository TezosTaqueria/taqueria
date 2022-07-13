import * as vscode from 'vscode';
import { OutputLevels, VsCodeHelper } from '../helpers';
import * as Util from '../pure';

export class PluginsDataProvider implements vscode.TreeDataProvider<PluginTreeItem> {
	constructor(
		private workspaceRoot: string,
		private helper: VsCodeHelper,
	) {}

	getTreeItem(element: PluginTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: PluginTreeItem): Promise<PluginTreeItem[]> {
		let pathToDir: Util.PathToDir | null;
		let config: Util.TaqifiedDir | null;
		if (!this.workspaceRoot) {
			pathToDir = null;
			config = null;
		} else {
			try {
				pathToDir = await Util.makeDir(this.workspaceRoot, this.helper.i18n);
				config = await Util.TaqifiedDir.create(pathToDir, this.helper.i18n);
			} catch (e: any) {
				config = null;
				this.helper.showOutput(
					OutputLevels.error,
					'\nError(s) occurred while trying to originate contract(s):',
				);
				this.helper.logAllNestedErrors(e);
			}
		}

		if (element) {
			return [];
		}
		const installedPlugins = config?.config?.plugins?.map(plugin => plugin.name) ?? [];
		const availablePlugins = await this.helper.getAvailablePlugins();
		const allPlugins = [...new Set(installedPlugins.concat(availablePlugins))];
		allPlugins.sort();
		return allPlugins.map(
			name =>
				new PluginTreeItem(
					name,
					installedPlugins.indexOf(name) >= 0,
					vscode.TreeItemCollapsibleState.None,
					undefined,
				),
		);
	}

	private _onDidChangeTreeData: vscode.EventEmitter<PluginTreeItem | undefined | null | void> = new vscode.EventEmitter<
		PluginTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<PluginTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}
export class PluginTreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		private installed: boolean,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		private version: string | undefined,
	) {
		super(label, collapsibleState);
		this.tooltip = version === undefined ? `${this.label}` : `${this.label}-${this.version}`;
		this.description = this.version;
		this.iconPath = new vscode.ThemeIcon(installed ? 'check' : 'cloud-download');
		this.contextValue = installed ? 'installed' : 'notInstalled';
	}
}
