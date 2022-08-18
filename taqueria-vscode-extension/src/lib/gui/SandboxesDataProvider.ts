import { toSHA256 } from '@taqueria/protocol/SHA256';
import { SpawnSyncOptionsWithBufferEncoding } from 'child_process';
import { randomInt } from 'crypto';
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

	refreshLevelInterval: NodeJS.Timer | undefined;
	private sandboxTreeItems: SandboxTreeItem[] | undefined;

	getTreeItem(element: SandboxTreeItemBase): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: SandboxTreeItemBase): Promise<SandboxTreeItemBase[]> {
		if (element instanceof SandboxTreeItem) {
			return await this.getSandboxChildren(element);
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
		return this.getSandboxItems();
	}

	private async getSandboxItems() {
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
		this.sandboxTreeItems = items;
		this.refreshLevelInterval = setInterval(async () => {
			await this.updateSandboxInfo();
		}, 1000);
		return items;
	}

	async updateSandboxInfo(): Promise<void> {
		if (!this.sandboxTreeItems) {
			return;
		}
		for (const sandbox of this.sandboxTreeItems) {
			try {
				const sandBoxHeadResponse = await fetch(`http://127.0.0.1:20000/chains/main/blocks/head`);
				const sandboxHead = await sandBoxHeadResponse.json();
				sandbox.sandboxLevel = (sandboxHead as any).header.level;
			} catch (e: unknown) {
				this.helper.showLog(OutputLevels.warn, `${e}`);
			}

			try {
				const tzKtHeadResponse = await fetch(`http://localhost:5000/v1/head`);
				const tzKtHead = await tzKtHeadResponse.json();
				sandbox.indexerLevel = (tzKtHead as any).level;
			} catch (e: unknown) {
				this.helper.showLog(OutputLevels.warn, `${e}`);
			}
			this.refreshItem(sandbox);
		}
	}

	async getSmartContractEntrypoints(
		element: SmartContractChildrenTreeItem,
	): Promise<SmartContractEntrypointTreeItem[]> {
		const containerName = element.parent.containerName;
		if (!containerName) {
			return [];
		}
		const response = await fetch(`http://localhost:5000/v1/contracts/${element.parent.address}/entrypoints`);
		const data = await response.json();
		return (data as any[]).map(item =>
			new SmartContractEntrypointTreeItem(item.name, item.jsonParameters, element.parent)
		);
	}

	getSmartContractOperations(element: SmartContractChildrenTreeItem): Promise<SandboxTreeItemBase[]> {
		throw new Error('Method not implemented.');
	}

	private async getSandboxChildren(element: SandboxTreeItem): Promise<SandboxChildrenTreeItem[]> {
		const containerName = element.containerName;
		const [accountCount, contractCount] = containerName
			? await Promise.all([this.getAccountCount(containerName), this.getContractCount(containerName)])
			: [undefined, undefined];
		return [
			new SandboxChildrenTreeItem('Implicit Accounts', accountCount, element),
			new SandboxChildrenTreeItem('Smart Contracts', contractCount, element),
			new SandboxChildrenTreeItem('Operations', undefined, element),
			new SandboxChildrenTreeItem('Non-Empty Blocks', undefined, element),
		];
	}

	private async getAccountCount(containerName: string): Promise<number> {
		const response = await fetch('http://localhost:5000/v1/accounts/count?type.ne=contract');
		const data = await response.json();
		return data as number;
	}

	private async getContractCount(containerName: string): Promise<number> {
		const response = await fetch('http://localhost:5000/v1/contracts/count');
		const data = await response.json();
		return data as number;
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
		const response = await fetch(`http://localhost:5000/v1/contracts?limit=1000&rnd=${randomInt(1000000000)}`);
		const data = await response.json();

		return (data as any[]).map(item => new SandboxSmartContractTreeItem(item.address, item.type, containerName));
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
		if (this.refreshLevelInterval) {
			clearInterval(this.refreshLevelInterval);
		}
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
	private _sandboxLevel: number | undefined;
	private _indexerLevel: number | undefined;
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

	set sandboxLevel(value: number | undefined) {
		this._sandboxLevel = value;
		this.setDescription();
	}

	get sandboxLevel(): number | undefined {
		return this._sandboxLevel;
	}

	set indexerLevel(value: number | undefined) {
		this._indexerLevel = value;
		this.setDescription();
	}

	get indexerLevel(): number | undefined {
		return this._indexerLevel;
	}

	setDescription() {
		this.description = this.running === undefined
			? ''
			: `${this.running ? 'running' : 'stopped'} ${this._sandboxLevel ?? ''} ${
				this._indexerLevel ? 'Indexer: ' + this._indexerLevel : ''
			}`;
	}
}

export class SandboxChildrenTreeItem extends SandboxTreeItemBase {
	constructor(
		public readonly kind: 'Implicit Accounts' | 'Smart Contracts' | 'Operations' | 'Non-Empty Blocks',
		description: string | number | undefined,
		public readonly parent: SandboxTreeItem,
	) {
		super(kind, 'sandboxChild', vscode.TreeItemCollapsibleState.Collapsed);
		this.description = `${description ?? ''}`;
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
		public type: string,
		public readonly containerName: string,
	) {
		super(type, 'smartContract', vscode.TreeItemCollapsibleState.Collapsed);
		this.description = address;
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
