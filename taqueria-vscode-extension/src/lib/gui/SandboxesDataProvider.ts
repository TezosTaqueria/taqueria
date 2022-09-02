import { toSHA256 } from '@taqueria/protocol/SHA256';
import fetch from 'node-fetch';
import * as vscode from 'vscode';
import { HasRefresh, mapAsync, OutputLevels, VsCodeHelper } from '../helpers';
import { getRunningContainerNames } from '../pure';
import * as Util from '../pure';
import { CachedSandboxState } from './CachedSandboxState';
import { ObservableConfig } from './ObservableConfig';
import { TzKtHead } from './SandboxDataModels';
import {
	OperationTreeItem,
	SandboxChildrenTreeItem,
	SandboxImplicitAccountTreeItem,
	SandboxSmartContractTreeItem,
	SandboxTreeItem,
	SandboxTreeItemBase,
	SmartContractChildrenTreeItem,
	SmartContractEntrypointTreeItem,
} from './SandboxTreeItemTypes';
import { TaqueriaDataProviderBase } from './TaqueriaDataProviderBase';

export class SandboxesDataProvider extends TaqueriaDataProviderBase
	implements vscode.TreeDataProvider<SandboxTreeItemBase>, HasRefresh
{
	constructor(
		helper: VsCodeHelper,
		private readonly observableConfig: ObservableConfig,
	) {
		super(helper);
	}

	private sandboxStates: Record<string, CachedSandboxState> = {};

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
					return await this.getAccountOperations(element);
				default:
					return [];
			}
		}
		if (element instanceof SandboxImplicitAccountTreeItem) {
			return await this.getAccountOperations(element);
		}
		if (element) {
			return [];
		}
		return this.getSandboxItems();
	}

	private async getSandboxItems() {
		const runningContainers = await getRunningContainerNames();
		const { config, pathToDir } = this.observableConfig.currentConfig;

		await this.createSandboxStates(config, pathToDir);

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
		}, 5000);
		return items;
	}

	async createSandboxStates(config: Util.TaqifiedDir | undefined, projectDir: string | undefined) {
		if (!config?.config?.sandbox || !projectDir) {
			return;
		}
		for (let name of this.getSandboxNames(config)) {
			if (this.sandboxStates[name]) {
				continue;
			}
			const environmentName = this.getEnvironmentNames(config)[0];
			try {
				const cached = new CachedSandboxState(
					this.helper,
					name,
					await this.getContainerName(name, environmentName, projectDir),
					this.observableConfig,
				);
				await cached.startConnection();
				cached.headFromTzKt.subscribe(data => this.onHeadFromTzKt(data, name));
				this.sandboxStates[name] = cached;
			} catch (e: unknown) {
				this.helper.showLog(OutputLevels.debug, 'Error in signalR:');
				this.helper.logAllNestedErrors(e);
			}
		}
	}
	onHeadFromTzKt(data: TzKtHead | undefined, sandboxName: string): void {
		const treeItem = this.sandboxTreeItems?.find(item => item.sandboxName === sandboxName);
		if (!treeItem) {
			return;
		}
		treeItem.indexerLevel = data?.level;
		this.refreshItem(treeItem);
	}

	private async getAccountOperations(accountItem: SandboxImplicitAccountTreeItem | SmartContractChildrenTreeItem) {
		const containerName = accountItem.parent.containerName;
		const address = accountItem instanceof SandboxImplicitAccountTreeItem
			? accountItem.address
			: accountItem.parent.address;
		const tzktBaseUrl = this.sandboxStates[accountItem.parent.sandboxName]?.getTzKtBaseUrl(
			accountItem.parent.sandboxName,
		);
		if (!tzktBaseUrl) {
			return [];
		}
		const response = await fetch(`${tzktBaseUrl}/v1/accounts/${address}/operations`);
		const data = await response.json();
		return (data as any[]).map(item =>
			new OperationTreeItem(
				item.type,
				item.hash,
				item,
				accountItem instanceof SandboxImplicitAccountTreeItem ? accountItem : accountItem.parent,
			)
		);
	}

	async updateSandboxInfo(): Promise<void> {
		if (!this.sandboxTreeItems) {
			return;
		}
		for (const sandbox of this.sandboxTreeItems) {
			try {
				const sandboxBaseUrl = this.sandboxStates[sandbox.sandboxName]?.getSandboxBaseUrl(sandbox.sandboxName);
				if (!sandboxBaseUrl) {
					sandbox.sandboxLevel = undefined;
					continue;
				}
				const sandBoxHeadResponse = await fetch(`${sandboxBaseUrl}/chains/main/blocks/head`);
				const sandboxHead = await sandBoxHeadResponse.json();
				sandbox.sandboxLevel = (sandboxHead as any).header.level;
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
		const tzktBaseUrl = this.sandboxStates[element.parent.sandboxName]?.getTzKtBaseUrl(element.parent.sandboxName);
		if (!tzktBaseUrl) {
			return [];
		}
		const response = await fetch(`${tzktBaseUrl}/v1/contracts/${element.parent.address}/entrypoints`);
		const data = await response.json();
		return (data as any[]).map(item =>
			new SmartContractEntrypointTreeItem(item.name, item.jsonParameters, element.parent)
		);
	}

	private async getSandboxChildren(element: SandboxTreeItem): Promise<SandboxChildrenTreeItem[]> {
		const [accountCount, contractCount] = await Promise.all([
			this.getAccountCount(element),
			this.getContractCount(element),
		]);
		return [
			new SandboxChildrenTreeItem('Implicit Accounts', accountCount, element),
			new SandboxChildrenTreeItem('Smart Contracts', contractCount, element),
			// new SandboxChildrenTreeItem('Operations', undefined, element),
			// new SandboxChildrenTreeItem('Non-Empty Blocks', undefined, element),
		];
	}

	private async getAccountCount(element: SandboxTreeItem): Promise<number | undefined> {
		const tzktBaseUrl = this.sandboxStates[element.sandboxName]?.getTzKtBaseUrl(element.sandboxName);
		if (!tzktBaseUrl) {
			return undefined;
		}
		const response = await fetch(`${tzktBaseUrl}/v1/accounts/count?type.ne=contract`);
		const data = await response.json();
		return data as number;
	}

	private async getContractCount(element: SandboxTreeItem): Promise<number | undefined> {
		const tzktBaseUrl = this.sandboxStates[element.sandboxName]?.getTzKtBaseUrl(element.sandboxName);
		if (!tzktBaseUrl) {
			return undefined;
		}
		const response = await fetch(`${tzktBaseUrl}/v1/contracts/count`);
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
		element: SandboxChildrenTreeItem,
	): Promise<SandboxImplicitAccountTreeItem[]> {
		const tzktBaseUrl = this.sandboxStates[element.parent.sandboxName]?.getTzKtBaseUrl(element.parent.sandboxName);
		if (!tzktBaseUrl) {
			return [];
		}
		const response = await fetch(`${tzktBaseUrl}/v1/accounts?type.ne=contract`);
		tzktBaseUrl;
		const data = await response.json();
		return (data as any[]).map(item => new SandboxImplicitAccountTreeItem(item.address, element.parent));
	}

	private async getSandboxSmartContracts(element: SandboxChildrenTreeItem): Promise<SandboxSmartContractTreeItem[]> {
		const containerName = element.parent.containerName;
		if (!containerName) {
			return [];
		}
		const tzktBaseUrl = this.sandboxStates[element.parent.sandboxName]?.getTzKtBaseUrl(element.parent.sandboxName);
		if (!tzktBaseUrl) {
			return [];
		}
		const response = await fetch(`${tzktBaseUrl}/v1/contracts?limit=1000`);
		const data = await response.json();

		return (data as any[]).map(item =>
			new SandboxSmartContractTreeItem(item.address, item.type, containerName, element.parent.sandboxName)
		);
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
		return `${sandboxName.substring(0, 10)}-${hash.substring(0, 5)}`;
	}

	async getContainerName(sandboxName: string, environmentName: string, projectDir: string) {
		const uniqueSandboxName = await this.getUniqueSandboxName(sandboxName, projectDir);
		return `taq-flextesa-${uniqueSandboxName}`;
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
