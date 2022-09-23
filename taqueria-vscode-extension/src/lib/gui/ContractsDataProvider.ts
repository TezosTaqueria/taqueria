import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, HasRefresh, VsCodeHelper } from '../helpers';
import { getLanguageInfoForFileName, SmartContractCompiler } from '../SmartContractLanguageInfo';
import { TaqueriaDataProviderBase } from './TaqueriaDataProviderBase';

export class ContractsDataProvider extends TaqueriaDataProviderBase
	implements vscode.TreeDataProvider<ContractTreeItem>, HasRefresh
{
	constructor(helper: VsCodeHelper) {
		super(helper);
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
				getLanguageInfoForFileName(uri.path)?.compilerName,
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

export class ContractTreeItem extends vscode.TreeItem implements HasFileName {
	constructor(
		public readonly fileName: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		language: SmartContractCompiler | undefined,
		public isInRegistry: boolean,
	) {
		const displayLabel = `${isInRegistry ? '✅' : '❎'} ${fileName}`;
		super(displayLabel, collapsibleState);
		this.tooltip = language ?? '';
		this.iconPath = path.join(__filename, '..', '..', '..', '..', 'images', `${language}.svg`);
		this.contextValue = language;
	}
}
