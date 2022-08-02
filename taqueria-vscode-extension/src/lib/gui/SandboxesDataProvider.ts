import { toSHA256 } from '@taqueria/protocol/SHA256';
import * as vscode from 'vscode';
import { HasRefresh, mapAsync, VsCodeHelper } from '../helpers';
import { getRunningContainerNames } from '../pure';
import { TaqueriaDataProviderBase } from './TaqueriaDataProviderBase';

export class SandboxesDataProvider extends TaqueriaDataProviderBase
	implements vscode.TreeDataProvider<SandboxTreeItem>, HasRefresh
{
	constructor(workspaceRoot: string, helper: VsCodeHelper) {
		super(workspaceRoot, helper);
	}

	getTreeItem(element: SandboxTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: SandboxTreeItem): Promise<SandboxTreeItem[]> {
		if (element) {
			return [];
		}
		const [{ config, pathToDir }, runningContainers] = await Promise.all([
			this.getConfig(),
			getRunningContainerNames(),
		]);
		if (!pathToDir || !config?.config?.sandbox) {
			return [];
		}
		const environmentNames = this.getEnvironmentNames(config);

		const sandboxNames = this.getSandboxNames(config);
		const items = await mapAsync(
			sandboxNames,
			async (sandboxName: string) =>
				new SandboxTreeItem(
					sandboxName,
					await this.getSandboxState(sandboxName, runningContainers, environmentNames, pathToDir),
					vscode.TreeItemCollapsibleState.None,
				),
		);

		return items;
	}

	private _onDidChangeTreeData: vscode.EventEmitter<SandboxTreeItem | undefined | null | void> = new vscode
		.EventEmitter<
		SandboxTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<SandboxTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	async getSandboxState(
		sandBoxName: string,
		runningContainerNames: string[] | undefined,
		environmentNames: string[],
		pathToDir: string,
	) {
		if (runningContainerNames === undefined) {
			return undefined;
		}
		for (const environmentName of environmentNames) {
			const expectedContainerName = await this.getContainerName(sandBoxName, environmentName, pathToDir);
			if (runningContainerNames.findIndex(x => x === expectedContainerName) >= 0) {
				return true;
			}
		}
		return false;
	}

	// TODO: The functions getUniqueSandboxName and getContainerName are duplicates of similarly named functions in
	// taqueria-plugin-flextesa/proxy.ts. As suggested in https://github.com/ecadlabs/taqueria/issues/1030, we need to
	// take care of this tech debt.
	private async getUniqueSandboxName(sandboxName: string, projectDir: string) {
		const hash = await toSHA256(projectDir);
		return `${sandboxName}-${hash}`;
	}

	async getContainerName(sandboxName: string, environmentName: string, projectDir: string) {
		const uniqueSandboxName = await this.getUniqueSandboxName(sandboxName, projectDir);
		return `taqueria-${environmentName}-${uniqueSandboxName}`;
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

export class SandboxTreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		private running: boolean | undefined,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(label, collapsibleState);
		if (running === undefined) {
			this.tooltip = this.label;
			this.description = undefined;
			this.iconPath = new vscode.ThemeIcon('question');
			this.contextValue = 'unknown';
		} else {
			this.tooltip = `${this.label}-${running ? 'running' : 'stopped'}`;
			this.description = running ? 'running' : 'stopped';
			this.iconPath = new vscode.ThemeIcon(running ? 'vm-running' : 'vm-outline');
			this.contextValue = running ? 'running' : 'stopped';
		}
	}
}
