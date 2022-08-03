import path from 'path';
import * as vscode from 'vscode';
import { HasRefresh, VsCodeHelper } from '../helpers';

export class TestDataProvider implements vscode.TreeDataProvider<TestTreeItem>, HasRefresh {
	constructor(private helper: VsCodeHelper) {
	}

	getTreeItem(element: TestTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	async getChildren(element?: TestTreeItem | undefined): Promise<TestTreeItem[]> {
		if (element) {
			return [];
		}
		const testConfigFiles = await vscode.workspace.findFiles('**/jest.config.js', '**/node_modules/**');
		const mainFolder = this.helper.getMainWorkspaceFolder();
		if (!mainFolder) {
			return [];
		}
		let mainFolderPath = mainFolder.fsPath;
		if (!mainFolderPath.endsWith('/')) {
			mainFolderPath = mainFolderPath + '/';
		}
		let testFolders = testConfigFiles.map(uri => path.dirname(uri.fsPath).replace(mainFolderPath, ''));
		testFolders = testFolders.filter(x => x !== '.taq');
		testFolders.sort();
		return testFolders.map(folder => new TestTreeItem(folder));
	}

	private _onDidChangeTreeData: vscode.EventEmitter<TestTreeItem | undefined | null | void> = new vscode.EventEmitter<
		TestTreeItem | undefined | null | void
	>();

	readonly onDidChangeTreeData: vscode.Event<TestTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

export class TestTreeItem extends vscode.TreeItem {
	constructor(
		public readonly relativePath: string,
	) {
		super(relativePath, vscode.TreeItemCollapsibleState.None);
		this.iconPath = new vscode.ThemeIcon('beaker');
	}
}
