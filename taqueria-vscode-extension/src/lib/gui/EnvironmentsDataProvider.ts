import * as vscode from 'vscode';
import { OutputLevels, VsCodeHelper } from '../helpers';
import * as Util from '../pure';

export class EnvironmentsDataProvider implements vscode.TreeDataProvider<EnvironmentTreeItem> {
	constructor(
		private workspaceRoot: string,
		private helper: VsCodeHelper,
	) {}

	getTreeItem(element: EnvironmentTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: EnvironmentTreeItem): Promise<EnvironmentTreeItem[]> {
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
				this.helper.notifyAndLogError('Error while loading config, environments list will fail to populate', e);
			}
		}

		if (element) {
			return [];
		}
		if (!config?.config?.environment) {
			return [];
		}
		let environments = Object.entries(config.config.environment);
		const defaultEnv = config.config.environment['default'];
		environments = environments.filter(environment => environment[0] !== 'default');
		environments.sort((a, b) => a[0].localeCompare(b[0]));
		return environments.map(environment =>
			new EnvironmentTreeItem(environment[0], vscode.TreeItemCollapsibleState.None, environment[0] === defaultEnv)
		);
	}

	private _onDidChangeTreeData: vscode.EventEmitter<EnvironmentTreeItem | undefined | null | void> = new vscode
		.EventEmitter<
		EnvironmentTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<EnvironmentTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}
export class EnvironmentTreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		isDefault: boolean,
	) {
		super(label, collapsibleState);
		this.tooltip = isDefault ? `${this.label} (default)` : `${this.label}`;
		this.iconPath = new vscode.ThemeIcon(isDefault ? 'pass-filled' : 'server-environment');
		this.contextValue = isDefault ? 'default' : 'non-default';
	}
}
