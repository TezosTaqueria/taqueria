import { i18n } from '@taqueria/protocol/i18n';
import * as vscode from 'vscode';
import { Output, OutputLevels, VsCodeHelper } from '../helpers';
import * as Util from '../pure';

export class PluginsDataProvider implements vscode.TreeDataProvider<PluginInfo> {
	constructor(
		private workspaceRoot: string,
		private helper: VsCodeHelper,
		private i18n: i18n,
		private output: Output,
		private context: vscode.ExtensionContext,
	) {}

	getTreeItem(element: PluginInfo): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: PluginInfo): Promise<PluginInfo[]> {
		let pathToDir: Util.PathToDir | null;
		let config: Util.TaqifiedDir | null;
		if (!this.workspaceRoot) {
			pathToDir = null;
			config = null;
		} else {
			try {
				pathToDir = await Util.makeDir(this.workspaceRoot, this.i18n);
				config = await Util.TaqifiedDir.create(pathToDir, this.i18n);
			} catch (e: any) {
				config = null;
				this.helper.showOutput(this.output)(
					OutputLevels.error,
					'\nError(s) occurred while trying to originate contract(s):',
				);
				this.helper.logAllNestedErrors(e, this.output);
			}
		}

		if (element) {
			return [];
		}
		const installedPlugins = config?.config?.plugins?.map(plugin => plugin.name) ?? [];
		const availablePlugins = await this.helper.getAvailablePlugins(
			this.context,
		);
		const allPlugins = [...new Set(installedPlugins.concat(availablePlugins))];
		return allPlugins.map(
			name =>
				new PluginInfo(
					name,
					installedPlugins.indexOf(name) >= 0,
					vscode.TreeItemCollapsibleState.None,
					undefined,
				),
		);
	}

	private _onDidChangeTreeData: vscode.EventEmitter<PluginInfo | undefined | null | void> = new vscode.EventEmitter<
		PluginInfo | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<PluginInfo | undefined | null | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

class PluginInfo extends vscode.TreeItem {
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
	}
}
