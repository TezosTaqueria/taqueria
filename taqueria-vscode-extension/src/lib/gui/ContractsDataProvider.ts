import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, HasRefresh, VsCodeHelper } from '../helpers';
import * as Util from '../pure';
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
		if (element) {
			return [];
		}
		const { config, mainFolder } = await this.getConfig();
		if (!config || !mainFolder) {
			return [];
		}
		const contractsFolder = config?.config.contractsDir ?? 'contracts';
		const contracts = await vscode.workspace.findFiles(`${contractsFolder}/*.*`, '**/node_modules/**');
		contracts.sort();

		const treeItems = contracts.map(uri =>
			new ContractTreeItem(
				uri,
				vscode.TreeItemCollapsibleState.None,
				getLanguageInfoForFileName(uri.path)?.compilerName,
				contractsFolder,
				mainFolder,
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
	fileName: string;
	constructor(
		public readonly contractUri: vscode.Uri,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		language: SmartContractCompiler | undefined,
		readonly contractsFolder: string,
		readonly mainFolder: vscode.Uri,
	) {
		const fileName = path.relative(path.join(mainFolder.path, contractsFolder), contractUri.path);
		super(fileName, collapsibleState);
		this.fileName = fileName;
		this.tooltip = language ?? '';
		this.iconPath = path.join(__filename, '..', '..', '..', '..', 'images', `${language}.svg`);
		this.contextValue = language;
		this.command = {
			command: 'vscode.open',
			title: 'Open Contract for Editing',
			arguments: [contractUri],
			tooltip: 'Open Contract for Editing',
		};
	}
}
