import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, HasRefresh, VsCodeHelper } from '../helpers';
import { GrouppedFileItem } from './helpers/GrouppedFileItem';
import { TaqueriaDataProviderBase } from './TaqueriaDataProviderBase';

export class ArtifactsDataProvider extends TaqueriaDataProviderBase
	implements vscode.TreeDataProvider<ArtifactTreeItem>, HasRefresh
{
	constructor(helper: VsCodeHelper) {
		super(helper);
	}

	getTreeItem(element: ArtifactTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: ArtifactTreeItem): Promise<ArtifactTreeItem[]> {
		if (element) {
			return element.children.map(file => new ArtifactTreeItem(file, file.children));
		}
		const { config, mainFolder } = await this.getConfig();
		if (!config || !mainFolder) {
			return [];
		}
		const artifactsFolder = config.config.artifactsDir ?? 'artifacts';
		const artifacts = await vscode.workspace.findFiles(`${artifactsFolder}/**/*.tz`, '**/node_modules/**');
		const rootFiles = GrouppedFileItem.groupAndSortFiles(
			path.join(mainFolder.path, artifactsFolder),
			artifacts,
			'artifact',
		);

		const treeItems = rootFiles.map(file => new ArtifactTreeItem(file, file.children));
		return treeItems;
	}

	private _onDidChangeTreeData: vscode.EventEmitter<ArtifactTreeItem | undefined | null | void> = new vscode
		.EventEmitter<
		ArtifactTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<ArtifactTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

export class ArtifactTreeItem extends vscode.TreeItem implements HasFileName {
	fileName: string;
	constructor(
		public readonly artifact: GrouppedFileItem,
		public readonly children: GrouppedFileItem[],
	) {
		const fileName = artifact.relativePath;
		super(fileName, children.length ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None);
		this.fileName = fileName;
		this.tooltip = `${this.fileName}`;
		this.command = {
			command: 'vscode.open',
			title: 'Open Artifact for Editing',
			arguments: [artifact.uri],
			tooltip: 'Open Artifact for Editing',
		};
	}
}
