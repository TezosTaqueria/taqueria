import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, HasRefresh, VsCodeHelper } from '../helpers';
import * as Util from '../pure';
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
			return [];
		}
		const { config, mainFolder } = await this.getConfig();
		if (!config || !mainFolder) {
			return [];
		}
		const artifactsFolder = config.config.artifactsDir ?? 'artifacts';
		const artifacts = await vscode.workspace.findFiles(`${artifactsFolder}/**/*.tz`, '**/node_modules/**');
		artifacts.sort();
		const treeItems = artifacts.map(uri =>
			new ArtifactTreeItem(
				uri,
				vscode.TreeItemCollapsibleState.None,
				artifactsFolder,
				mainFolder,
			)
		);
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
		public readonly artifactUri: vscode.Uri,
		readonly collapsibleState: vscode.TreeItemCollapsibleState,
		readonly artifactsFolder: string,
		readonly mainFolder: vscode.Uri,
	) {
		const fileName = path.relative(path.join(mainFolder.path, artifactsFolder), artifactUri.path);
		super(fileName, collapsibleState);
		this.fileName = fileName;
		this.tooltip = `${this.fileName}`;
		this.command = {
			command: 'vscode.open',
			title: 'Open Artifact for Editing',
			arguments: [artifactUri],
			tooltip: 'Open Artifact for Editing',
		};
	}
}
