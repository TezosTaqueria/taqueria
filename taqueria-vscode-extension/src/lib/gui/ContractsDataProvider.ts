import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, VsCodeHelper } from '../helpers';

export class ContractsDataProvider implements vscode.TreeDataProvider<ContractTreeItem> {
	constructor(
		private workspaceRoot: string,
		private helper: VsCodeHelper,
	) {}

	getTreeItem(element: ContractTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: ContractTreeItem): Promise<ContractTreeItem[]> {
		const contracts = await vscode.workspace.findFiles('contracts/*.*', '**/node_modules/**');

		const treeItems = contracts.map(uri =>
			new ContractTreeItem(
				path.basename(uri.path),
				vscode.TreeItemCollapsibleState.None,
				extensions[path.extname(uri.path).toLowerCase()],
			)
		);
		return treeItems;
	}

	private _onDidChangeTreeData: vscode.EventEmitter<ContractTreeItem | undefined | null | void> = new vscode
		.EventEmitter<
		ContractTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<ContractTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

export enum ContractLanguage {
	Ligo = 'ligo',
	Smartpy = 'smartpy',
	Archetype = 'archetype',
}

export const extensions: Record<string, ContractLanguage> = {
	'.mligo': ContractLanguage.Ligo,
	'.ligo': ContractLanguage.Ligo,
	'.religo': ContractLanguage.Ligo,
	'.jsligo': ContractLanguage.Ligo,

	'.py': ContractLanguage.Smartpy,
	'.ts': ContractLanguage.Smartpy,

	'.arl': ContractLanguage.Archetype,
};

export class ContractTreeItem extends vscode.TreeItem implements HasFileName {
	fileName: string;

	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		language: ContractLanguage | undefined,
	) {
		super(label, collapsibleState);
		this.tooltip = language ? `${label} (${language})` : `${label}`;
		this.iconPath = path.join(__filename, '..', '..', '..', '..', 'images', `${language}.svg`);
		this.contextValue = language;
		this.fileName = label;
	}
}
