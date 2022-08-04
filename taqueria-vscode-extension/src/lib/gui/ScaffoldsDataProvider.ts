import * as vscode from 'vscode';
import { VsCodeHelper } from '../helpers';

export class ScaffoldsDataProvider implements vscode.TreeDataProvider<ScaffoldTreeItem> {
	constructor(
		private helper: VsCodeHelper,
	) {}

	getTreeItem(element: ScaffoldTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: ScaffoldTreeItem): Promise<ScaffoldTreeItem[]> {
		if (element) {
			return [];
		}
		let availableScaffolds = await this.helper.getAvailableScaffolds();
		return availableScaffolds.map(scaffold => new ScaffoldTreeItem(scaffold.name, scaffold.url));
	}
}

export class ScaffoldTreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly url: string,
	) {
		super(label, vscode.TreeItemCollapsibleState.None);
		this.tooltip = url;
		this.iconPath = new vscode.ThemeIcon('cloud-download');
	}
}
