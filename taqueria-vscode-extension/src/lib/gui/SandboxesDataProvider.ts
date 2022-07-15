import * as vscode from 'vscode';
import { HasRefresh, VsCodeHelper } from '../helpers';
import * as Util from '../pure';

export class SandboxesDataProvider implements vscode.TreeDataProvider<SandboxTreeItem>, HasRefresh {
	constructor(
		private workspaceRoot: string,
		private helper: VsCodeHelper,
	) {}

	getTreeItem(element: SandboxTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: SandboxTreeItem): Promise<SandboxTreeItem[]> {
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
				await this.helper.notifyAndLogError('Error while loading config, sandboxes list will fail to populate', e);
			}
		}

		if (element) {
			return [];
		}
		if (!config?.config?.sandbox) {
			return [];
		}
		const sandboxes = Object.entries(config.config.sandbox);
		sandboxes.sort((a, b) => a[0].localeCompare(b[0]));
		return sandboxes.map(sandbox => new SandboxTreeItem(sandbox[0], undefined, vscode.TreeItemCollapsibleState.None));
	}

	private _onDidChangeTreeData: vscode.EventEmitter<SandboxTreeItem | undefined | null | void> = new vscode
		.EventEmitter<
		SandboxTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<SandboxTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}
export class SandboxTreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		private running: boolean | undefined,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(label, collapsibleState);
		if (running === undefined) {
			this.tooltip = this.label;
			this.description = undefined;
			this.iconPath = new vscode.ThemeIcon('question');
			this.contextValue = 'unknown';
		} else {
			this.tooltip = `${this.label}-${running ? 'running' : 'stopped'}`;
			this.description = running ? 'running' : 'stopped';
			this.iconPath = new vscode.ThemeIcon(running ? 'vm-running' : 'vm-outline');
			this.contextValue = running ? 'running' : 'stopped';
		}
	}
}
