import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, HasRefresh, VsCodeHelper } from '../helpers';
import { getLanguageInfoForFileName, SmartContractCompiler } from '../SmartContractLanguageInfo';
import { GrouppedFileItem } from './helpers/GrouppedFileItem';
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
		const imagesFolder = await this.helper.getImagesPath();
		if (element) {
			return element.children.map(file =>
				new ContractTreeItem(
					file,
					getLanguageInfoForFileName(file.uri.path)?.compilerName,
					file.children,
					imagesFolder,
				)
			);
		}
		const { config, mainFolder } = await this.getConfig();
		if (!config || !mainFolder) {
			return [];
		}
		const contractsFolder = config?.config.contractsDir ?? 'contracts';
		const contracts = await vscode.workspace.findFiles(`${contractsFolder}/*.*`, '**/node_modules/**');
		const rootFiles = GrouppedFileItem.groupAndSortFiles(
			path.join(mainFolder.path, contractsFolder),
			contracts,
			'contract',
		);

		const treeItems = rootFiles.map(file =>
			new ContractTreeItem(
				file,
				getLanguageInfoForFileName(file.uri.path)?.compilerName,
				file.children,
				imagesFolder,
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
		public readonly contract: GrouppedFileItem,
		language: SmartContractCompiler | undefined,
		public readonly children: GrouppedFileItem[],
		imagesFolder: string,
	) {
		const fileName = contract.relativePath;
		super(fileName, children.length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
		this.fileName = fileName;
		this.tooltip = language ?? '';
		this.iconPath = path.join(imagesFolder, `${language}.svg`);
		this.tooltip = this.iconPath;
		this.contextValue = language;
		this.command = {
			command: 'vscode.open',
			title: 'Open Contract for Editing',
			arguments: [contract.uri],
			tooltip: 'Open Contract for Editing',
		};
	}
}
