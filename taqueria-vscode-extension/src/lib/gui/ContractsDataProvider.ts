import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, HasRefresh, VsCodeHelper } from '../helpers';
import { TaqueriaDataProviderBase } from './TaqueriaDataProviderBase';

export class ContractsDataProvider extends TaqueriaDataProviderBase
	implements vscode.TreeDataProvider<ContractTreeItem>, HasRefresh
{
	constructor(workspaceRoot: string, helper: VsCodeHelper) {
		super(workspaceRoot, helper);
	}

	getTreeItem(element: ContractTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: ContractTreeItem): Promise<ContractTreeItem[]> {
		const contracts = await vscode.workspace.findFiles('contracts/*.*', '**/node_modules/**');
		contracts.sort();
		const config = await this.getConfig();

		const treeItems = contracts.map(uri =>
			new ContractTreeItem(
				path.basename(uri.path),
				vscode.TreeItemCollapsibleState.None,
				extensions[path.extname(uri.path).toLowerCase()],
				config.config?.config?.contracts?.[path.basename(uri.path)] !== undefined,
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
		readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		language: ContractLanguage | undefined,
		public isInRegistry: boolean,
	) {
		super(label, collapsibleState);
		this.tooltip = `${isInRegistry ? 'In Registry' : 'Not In Registry'} (${language ?? ''})`;
		this.iconPath = path.join(__filename, '..', '..', '..', '..', 'images', `${language}.svg`);
		this.contextValue = `lang:${language},inRegistry:${isInRegistry}`;
		this.fileName = label;
	}
}
