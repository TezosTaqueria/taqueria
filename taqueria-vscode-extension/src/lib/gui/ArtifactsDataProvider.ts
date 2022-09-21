import * as path from 'path';
import * as vscode from 'vscode';
import { HasFileName, HasRefresh, OutputLevels, VsCodeHelper } from '../helpers';
import { TaqifiedDir } from '../pure';
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
		const mainFolder = this.helper.getMainWorkspaceFolder();
		if (!mainFolder) {
			return [];
		}
		const config = await Util.TaqifiedDir.create(mainFolder.path as Util.PathToDir, this.helper.i18n);
		const artifactsFolder = config.config.artifactsDir ?? 'artifacts';
		const artifacts = await vscode.workspace.findFiles(`${artifactsFolder}/**/*.tz`, '**/node_modules/**');
		const treeItems = artifacts.map(uri =>
			new ArtifactTreeItem(
				mainFolder ? path.relative(path.join(mainFolder.path, artifactsFolder), uri.path) : path.basename(uri.path),
				vscode.TreeItemCollapsibleState.None,
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
	constructor(
		public readonly fileName: string,
		readonly collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(fileName, collapsibleState);
		this.tooltip = `${fileName}`;
	}
}
