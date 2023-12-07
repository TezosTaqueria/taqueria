import { toSHA256 } from '@taqueria/protocol/SHA256';
import fetch from 'node-fetch-commonjs';
import * as vscode from 'vscode';
import { HasRefresh, mapAsync, VsCodeHelper } from '../helpers';
import { OutputLevels } from '../LogHelper';
import { getRunningContainerNames } from '../pure';
import * as Util from '../pure';
import { CachedSandboxState, SandboxState } from './CachedSandboxState';
import { CachedTzKTDataProvider } from './helpers/CachedTzKTDataProvider';
import { TzKTAccountData, TzKtHeadData } from './helpers/TzKTFetcher';
import { ObservableConfig } from './ObservableConfig';
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
	private tzktProviders: Record<string, CachedTzKTDataProvider> = {};

	refreshLevelInterval: NodeJS.Timeout | undefined;
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

		await this.createSandboxStates(config, pathToDir, runningContainers);

		if (!pathToDir || !config?.config?.sandbox) {
			return [];
		}

		const sandboxNames = this.getSandboxNames(config);
		const items = await mapAsync(
			sandboxNames,
			async (sandboxName: string) => {
				const { state, containerName } = await this.getSandboxState(
					sandboxName,
					runningContainers,
					pathToDir,
				);

				const cachedState = this.sandboxStates[sandboxName];
				if (cachedState) {
					await cachedState.setState(state);
				}

				const cachedTzkt = this.tzktProviders[sandboxName];
				if (cachedTzkt) {
					await cachedTzkt.setSandboxState(state);
				}

				return new SandboxTreeItem(sandboxName, containerName, state);
			},
		);
		this.sandboxTreeItems = items;
		this.refreshLevelInterval = setInterval(async () => {
			await this.updateSandboxInfo();
		}, 5000);
		return items;
	}

	async createSandboxStates(
		config: Util.TaqifiedDir | undefined,
		projectDir: string | undefined,
		runningContainerNames: string[] | undefined,
	) {
		if (!config?.config?.sandbox || !projectDir) {
			return;
		}
		for (let sandboxName of this.getSandboxNames(config)) {
			if (this.sandboxStates[sandboxName]) {
				continue;
			}
			try {
				const { state, containerName } = await this.getSandboxState(sandboxName, runningContainerNames, projectDir);
				const cachedState = new CachedSandboxState(
					// this.helper,
					sandboxName,
					await this.getContainerName(sandboxName, projectDir),
					this.observableConfig,
					state,
				);
				this.sandboxStates[sandboxName] = cachedState;

				const cachedProvider = new CachedTzKTDataProvider(
					this.helper,
					sandboxName,
					this.observableConfig,
					state,
				);
				if (state === 'running') {
					await cachedProvider.startConnection();
				}
				cachedProvider.headFromTzKt.subscribe(data => this.onHeadFromTzKt(data, sandboxName));
				cachedProvider.accountsFromTzKt.subscribe(data => this.onAccountFromTzKt(data, sandboxName));
				cachedProvider.contractsFromTzKt.subscribe(data => this.onAccountFromTzKt(data, sandboxName));
				this.tzktProviders[sandboxName] = cachedProvider;
			} catch (e: unknown) {
				this.helper.logHelper.showLog(OutputLevels.debug, 'Error in signalR:');
				this.helper.logAllNestedErrors(e);
			}
		}
	}

	onHeadFromTzKt(data: TzKtHeadData | undefined, sandboxName: string): void {
		const treeItem = this.sandboxTreeItems?.find(item => item.sandboxName === sandboxName);
		if (!treeItem) {
			return;
		}
		treeItem.indexerLevel = data?.level;
		this.refreshItem(treeItem);
	}

	onAccountFromTzKt(_data: TzKTAccountData | undefined, sandboxName: string): void {
		// TODO: find a way to refresh only selected account tree item

		const treeItem = this.sandboxTreeItems?.find(item => item.sandboxName === sandboxName);
		if (!treeItem) {
			return;
		}
		this.refreshItem(treeItem);
	}

	private async getAccountOperations(element: SandboxImplicitAccountTreeItem | SmartContractChildrenTreeItem) {
		const isContract = element instanceof SmartContractChildrenTreeItem;
		const address = isContract
			? element.parent.address
			: element.address;
		const sandboxName = element.parent.sandboxName;
		const tzktBaseUrl = await this.getTzKtBaseUrl(sandboxName);
		if (!tzktBaseUrl) {
			return [];
		}
		try {
			const accountOperations = await this.tzktProviders[sandboxName].getAccountOperations(address);
			return accountOperations.map(item =>
				new OperationTreeItem(
					item.type,
					item.hash,
					item,
					isContract ? element.parent : element,
				)
			);
		} catch (e) {
			this.helper.logAllNestedErrors(e, true);
			return [];
		}
	}

	private async getSmartContractEntrypoints(
		element: SmartContractChildrenTreeItem,
	): Promise<SmartContractEntrypointTreeItem[]> {
		const containerName = element.parent.containerName;
		if (!containerName) {
			return [];
		}
		const sandboxName = element.parent.sandboxName;
		const tzktBaseUrl = await this.getTzKtBaseUrl(sandboxName);
		if (!tzktBaseUrl) {
			return [];
		}
		try {
			const sandboxContractEntrypoints = await this.tzktProviders[sandboxName].getContractEntrypoints(
				element.parent.address,
			);
			return sandboxContractEntrypoints.map(item =>
				new SmartContractEntrypointTreeItem(
					item.name,
					item.jsonParameters,
					item.michelineParameters,
					item.michelsonParameters,
					element.parent,
				)
			);
		} catch (e: unknown) {
			this.helper.logAllNestedErrors(e, true);
			return [];
		}
	}

	private async getSandboxChildren(element: SandboxTreeItem): Promise<SandboxChildrenTreeItem[]> {
		const cached = this.sandboxStates[element.sandboxName];
		if (!cached || cached.state !== 'running') {
			return [];
		}
		const [accountsCount, contractsCount] = await Promise.all([
			this.getAccountsCount(element),
			this.getContractsCount(element),
		]);
		return [
			new SandboxChildrenTreeItem('Implicit Accounts', accountsCount, element),
			new SandboxChildrenTreeItem('Smart Contracts', contractsCount, element),
			// new SandboxChildrenTreeItem('Operations', undefined, element),
			// new SandboxChildrenTreeItem('Non-Empty Blocks', undefined, element),
		];
	}

	private async getAccountsCount(element: SandboxTreeItem): Promise<number | undefined> {
		const tzktBaseUrl = await this.getTzKtBaseUrl(element.sandboxName);
		if (!tzktBaseUrl) {
			return undefined;
		}
		try {
			const sandboxAccounts = await this.tzktProviders[element.sandboxName].getAccounts();
			return sandboxAccounts.length;
		} catch (e) {
			this.helper.logAllNestedErrors(e, true);
			return undefined;
		}
	}

	private async getContractsCount(element: SandboxTreeItem): Promise<number | undefined> {
		const tzktBaseUrl = await this.getTzKtBaseUrl(element.sandboxName);
		if (!tzktBaseUrl) {
			return undefined;
		}
		try {
			const sandboxContracts = await this.tzktProviders[element.sandboxName].getContracts();
			return sandboxContracts.length;
		} catch (e) {
			this.helper.logAllNestedErrors(e, true);
			return undefined;
		}
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
		const tzktBaseUrl = await this.getTzKtBaseUrl(element.parent.sandboxName);
		if (!tzktBaseUrl) {
			return [];
		}
		try {
			const sandboxAccounts = await this.tzktProviders[element.parent.sandboxName].getAccounts();
			return sandboxAccounts.map(contract =>
				new SandboxImplicitAccountTreeItem(
					contract.address,
					contract.alias,
					element.parent,
				)
			);
		} catch (e) {
			this.helper.logAllNestedErrors(e, true);
			return [];
		}
	}

	private async getSandboxSmartContracts(element: SandboxChildrenTreeItem): Promise<SandboxSmartContractTreeItem[]> {
		const containerName = element.parent.containerName;
		if (!containerName) {
			return [];
		}
		const sandboxName = element.parent.sandboxName;
		const tzktBaseUrl = await this.getTzKtBaseUrl(sandboxName);
		if (!tzktBaseUrl) {
			return [];
		}
		try {
			const sandboxContracts = await this.tzktProviders[sandboxName].getContracts();
			return sandboxContracts.map(contract =>
				new SandboxSmartContractTreeItem(
					contract.address,
					contract.alias,
					containerName,
					sandboxName,
				)
			);
		} catch (e) {
			this.helper.logAllNestedErrors(e, true);
			return [];
		}
	}

	private _onDidChangeTreeData = new vscode.EventEmitter<SandboxTreeItemBase | undefined | null | void>();
	readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

	async updateSandboxInfo(): Promise<void> {
		if (!this.sandboxTreeItems) {
			return;
		}
		for (const sandbox of this.sandboxTreeItems) {
			const cached = this.sandboxStates[sandbox.sandboxName];
			if (cached.state !== 'running') {
				continue;
			}
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
				this.helper.logHelper.showLog(OutputLevels.warn, `${e}`);
			}
			this.refreshItem(sandbox);
		}
	}

	async getSandboxState(
		sandBoxName: string,
		runningContainerNames: string[] | undefined,
		pathToDir: string,
	): Promise<
		{ state: SandboxState; containerName: string | undefined }
	> {
		if (runningContainerNames === undefined) {
			return { state: 'unknown', containerName: undefined };
		}
		const expectedContainerName = await this.getContainerName(sandBoxName, pathToDir);
		if (runningContainerNames.findIndex(x => x === expectedContainerName) >= 0) {
			return { state: 'running', containerName: expectedContainerName };
		}
		return { state: 'stopped', containerName: undefined };
	}

	// TODO: The functions getUniqueSandboxName and getContainerName are duplicates of similarly named functions in
	// taqueria-plugin-flextesa/proxy.ts. As suggested in https://github.com/pinnacle-labs/taqueria/issues/1030, we need to
	// take care of this tech debt.
	private async getUniqueSandboxName(sandboxName: string, projectDir: string) {
		const hash = await toSHA256(sandboxName + projectDir);
		return `${sandboxName.substring(0, 10)}-${hash.substring(0, 5)}`;
	}

	async getContainerName(sandboxName: string, projectDir: string) {
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

	private async getTzKtBaseUrl(sandboxName: string): Promise<string | undefined> {
		return this.tzktProviders[sandboxName]?.findTzKtBaseUrl(sandboxName);
	}
}
