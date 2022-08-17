import { toSHA256 } from '@taqueria/protocol/SHA256';
import { SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import fetch from 'node-fetch';
import * as vscode from 'vscode';
import { HasRefresh, mapAsync, OutputLevels, VsCodeHelper } from '../helpers';
import { getRunningContainerNames } from '../pure';
import { TaqueriaDataProviderBase } from './TaqueriaDataProviderBase';

export class SandboxesDataProvider extends TaqueriaDataProviderBase
	implements vscode.TreeDataProvider<SandboxTreeItemBase>, HasRefresh
{
	constructor(helper: VsCodeHelper) {
		super(helper);
	}

	getTreeItem(element: SandboxTreeItemBase): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: SandboxTreeItemBase): Promise<SandboxTreeItemBase[]> {
		if (element instanceof SandboxTreeItem) {
			return this.getSandboxChildren(element);
		}
		if (element instanceof SandboxSmartContractTreeItem) {
			return this.getSmartContractChildren(element);
		}
		if (element instanceof SandboxChildrenTreeItem) {
			switch (element.kind) {
				case 'Implicit Accounts':
					return await this.getSandboxImplicitAccounts(element);
				case 'Smart Contracts':
					return await this.getSandboxSmartContracts(element);
				default:
					return [];
			}
		}
		if (element instanceof SmartContractChildrenTreeItem) {
			switch (element.kind) {
				case 'Entrypoints':
					return await this.getSmartContractEntrypoints(element);
				case 'Operations':
					return await this.getSmartContractOperations(element);
				default:
					return [];
			}
		}
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
			async (sandboxName: string) => {
				const { isRunning, environmentName, containerName } = await this.getSandboxState(
					sandboxName,
					runningContainers,
					environmentNames,
					pathToDir,
				);
				return new SandboxTreeItem(sandboxName, environmentName, containerName, isRunning);
			},
		);
		return items;
	}

	async getSmartContractEntrypoints(
		element: SmartContractChildrenTreeItem,
	): Promise<SmartContractEntrypointTreeItem[]> {
		const containerName = element.parent.containerName;
		if (!containerName) {
			return [];
		}
		const response = await fetch(`https://api.tzkt.io/v1/contracts/${element.parent.address}/entrypoints`);
		const data = await response.json();
		return (data as any[]).map(item =>
			new SmartContractEntrypointTreeItem(item.name, item.jsonParameters, element.parent)
		);
	}

	getSmartContractOperations(element: SmartContractChildrenTreeItem): Promise<SandboxTreeItemBase[]> {
		throw new Error('Method not implemented.');
	}

	private getSandboxChildren(element: SandboxTreeItem): SandboxChildrenTreeItem[] {
		return [
			new SandboxChildrenTreeItem('Implicit Accounts', element),
			new SandboxChildrenTreeItem('Smart Contracts', element),
			new SandboxChildrenTreeItem('Operations', element),
			new SandboxChildrenTreeItem('Non-Empty Blocks', element),
		];
	}

	private getSmartContractChildren(element: SandboxSmartContractTreeItem): SmartContractChildrenTreeItem[] {
		return [
			new SmartContractChildrenTreeItem('Entrypoints', element),
			new SmartContractChildrenTreeItem('Operations', element),
		];
	}

	private async getSandboxImplicitAccounts(
		_element: SandboxChildrenTreeItem,
	): Promise<SandboxImplicitAccountTreeItem[]> {
		const containerName = _element.parent.containerName;
		if (!containerName) {
			return [];
		}
		const response = await fetch('http://localhost:5000/v1/accounts?type.ne=contract');
		const data = await response.json();
		return (data as any[]).map(item => new SandboxImplicitAccountTreeItem(item.address));
	}

	private async getSandboxSmartContracts(_element: SandboxChildrenTreeItem): Promise<SandboxImplicitAccountTreeItem[]> {
		const containerName = _element.parent.containerName;
		if (!containerName) {
			return [];
		}
		const response = await fetch('http://localhost:5000/v1/contracts');
		const data = await response.json();
		return (data as any[]).map(item => new SandboxSmartContractTreeItem(item.address, containerName));
	}

	private _onDidChangeTreeData: vscode.EventEmitter<SandboxTreeItemBase | undefined | null | void> = new vscode
		.EventEmitter<
		SandboxTreeItem | undefined | null | void
	>();
	readonly onDidChangeTreeData: vscode.Event<SandboxTreeItemBase | undefined | null | void> =
		this._onDidChangeTreeData.event;

	async getSandboxState(
		sandBoxName: string,
		runningContainerNames: string[] | undefined,
		environmentNames: string[],
		pathToDir: string,
	): Promise<
		{ isRunning: boolean | undefined; environmentName: string | undefined; containerName: string | undefined }
	> {
		if (runningContainerNames === undefined) {
			return { isRunning: undefined, environmentName: undefined, containerName: undefined };
		}
		for (const environmentName of environmentNames) {
			const expectedContainerName = await this.getContainerName(sandBoxName, environmentName, pathToDir);
			if (runningContainerNames.findIndex(x => x === expectedContainerName) >= 0) {
				return { isRunning: true, environmentName, containerName: expectedContainerName };
			}
		}
		return { isRunning: false, environmentName: undefined, containerName: undefined };
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

	refreshItem(item: SandboxTreeItemBase): void {
		this._onDidChangeTreeData.fire(item);
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}

export class SandboxTreeItemBase extends vscode.TreeItem {
	constructor(
		label: string,
		kind:
			| 'sandbox'
			| 'sandboxChild'
			| 'implicitAccount'
			| 'smartContract'
			| 'smartContractChild'
			| 'smartContractEntryPoint'
			| 'smartContractOperation',
		collapsibleState: vscode.TreeItemCollapsibleState,
	) {
		super(label, collapsibleState);
	}
}

export class SandboxTreeItem extends SandboxTreeItemBase {
	constructor(
		public readonly sandboxName: string,
		public readonly environmentName: string | undefined,
		public readonly containerName: string | undefined,
		public running: boolean | undefined,
	) {
		super(
			sandboxName,
			'sandbox',
			running ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None,
		);
		if (running === undefined) {
			this.tooltip = sandboxName;
			this.description = undefined;
			this.iconPath = new vscode.ThemeIcon('question');
			this.contextValue = 'sandbox:unknown';
		} else {
			this.tooltip = `${sandboxName}-${running ? 'running' : 'stopped'}`;
			this.description = running ? 'running' : 'stopped';
			this.iconPath = new vscode.ThemeIcon(running ? 'vm-running' : 'vm-outline');
			this.contextValue = running ? 'sandbox:running' : 'sandbox:stopped';
		}
	}
}

export class SandboxChildrenTreeItem extends SandboxTreeItemBase {
	constructor(
		public readonly kind: 'Implicit Accounts' | 'Smart Contracts' | 'Operations' | 'Non-Empty Blocks',
		public readonly parent: SandboxTreeItem,
	) {
		super(kind, 'sandboxChild', vscode.TreeItemCollapsibleState.Collapsed);
	}
}

export class SandboxImplicitAccountTreeItem extends SandboxTreeItemBase {
	constructor(
		public readonly address: string,
	) {
		super(address, 'implicitAccount', vscode.TreeItemCollapsibleState.Collapsed);
	}
}

export class SandboxSmartContractTreeItem extends SandboxTreeItemBase {
	constructor(
		public readonly address: string,
		public readonly containerName: string,
	) {
		super(address, 'smartContract', vscode.TreeItemCollapsibleState.Collapsed);
	}
}

export class SmartContractChildrenTreeItem extends SandboxTreeItemBase {
	constructor(
		public kind: 'Operations' | 'Entrypoints',
		public readonly parent: SandboxSmartContractTreeItem,
	) {
		super(kind, 'smartContractChild', vscode.TreeItemCollapsibleState.Collapsed);
	}
}

export class SmartContractEntrypointTreeItem extends SandboxTreeItemBase {
	constructor(
		name: string,
		public readonly jsonParameters: any | null,
		public readonly parent: SandboxSmartContractTreeItem,
	) {
		super(name, 'smartContractEntryPoint', vscode.TreeItemCollapsibleState.None);
		this.contextValue = 'entrypoint';
	}
}
