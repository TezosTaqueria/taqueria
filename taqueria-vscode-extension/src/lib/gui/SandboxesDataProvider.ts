import * as vscode from 'vscode';
import { HasRefresh, VsCodeHelper } from '../helpers';
import * as Util from '../pure';
import { getRunningContainerNames } from '../pure';

export class SandboxesDataProvider implements vscode.TreeDataProvider<SandboxTreeItem>, HasRefresh {
	constructor(
		private workspaceRoot: string,
		private helper: VsCodeHelper,
	) {}

	getTreeItem(element: SandboxTreeItem): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: SandboxTreeItem): Promise<SandboxTreeItem[]> {
		if (element) {
			return [];
		}
		const [{ config }, runningContainers] = await Promise.all([this.getConfig(), getRunningContainerNames()]);
		if (!config?.config?.sandbox) {
			return [];
		}
		const environmentNames = this.getEnvironmentNames(config);

		const getState = (sandBoxName: string) => {
			if (runningContainers === undefined) {
				return undefined;
			}
			for (const environmentName of environmentNames) {
				if (runningContainers.findIndex(x => x === `taqueria-${environmentName}-${sandBoxName}`) >= 0) {
					return true;
				}
			}
			return false;
		};
		const sandboxNames = this.getSandboxNames(config);

		return sandboxNames.map(sandboxName =>
			new SandboxTreeItem(sandboxName, getState(sandboxName), vscode.TreeItemCollapsibleState.None)
		);
	}

	private _onDidChangeTreeData: vscode.EventEmitter<SandboxTreeItem | undefined | null | void> = new vscode
		.EventEmitter<
		SandboxTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<SandboxTreeItem | undefined | null | void> =
		this._onDidChangeTreeData.event;

	private async getConfig(): Promise<{ config: Util.TaqifiedDir | null; pathToDir: Util.PathToDir | null }> {
		if (!this.workspaceRoot) {
			return {
				pathToDir: null,
				config: null,
			};
		} else {
			try {
				const pathToDir = await Util.makeDir(this.workspaceRoot, this.helper.i18n);
				const config = await Util.TaqifiedDir.create(pathToDir, this.helper.i18n);
				return {
					config,
					pathToDir,
				};
			} catch (e: any) {
				await this.helper.notifyAndLogError('Error while loading config, sandboxes list will fail to populate', e);
				return {
					pathToDir: null,
					config: null,
				};
			}
		}
	}

	private getEnvironmentNames(config: Util.TaqifiedDir): string[] {
		if (!config?.config?.environment) {
			return [];
		}
		let environments = Object.entries(config.config.environment);
		const defaultEnv = config.config.environment['default'];
		environments = environments.filter(environment => environment[0] !== 'default');
		environments.sort((a, b) => a[0].localeCompare(b[0]));
		return environments.map(e => e[0]);
	}

	private getSandboxNames(config: Util.TaqifiedDir): string[] {
		if (!config?.config?.sandbox) {
			return [];
		}
		const sandboxes = Object.entries(config.config.sandbox);
		sandboxes.sort((a, b) => a[0].localeCompare(b[0]));
		return sandboxes.map(sandbox => sandbox[0]);
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
