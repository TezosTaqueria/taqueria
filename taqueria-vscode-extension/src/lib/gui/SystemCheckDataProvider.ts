import * as vscode from 'vscode';
import { HasRefresh, VsCodeHelper } from '../helpers';

export class SystemCheckDataProvider implements vscode.TreeDataProvider<SystemCheckTreeItem>, HasRefresh {
	constructor(private helper: VsCodeHelper) {
	}

	getTreeItem(element: SystemCheckTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	async getChildren(element?: SystemCheckTreeItem | undefined): Promise<SystemCheckTreeItem[]> {
		return [];
	}

	private _onDidChangeTreeData: vscode.EventEmitter<SystemCheckTreeItem | undefined | null | void> = new vscode
		.EventEmitter<
		SystemCheckTreeItem | undefined | null | void
	>();

	readonly onDidChangeTreeData: vscode.Event<SystemCheckTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

export class SystemCheckTreeItem extends vscode.TreeItem {
	constructor() {
		super('', vscode.TreeItemCollapsibleState.None);
	}
}
