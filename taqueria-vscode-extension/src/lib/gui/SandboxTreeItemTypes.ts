import * as vscode from 'vscode';
import { SandboxState } from './CachedSandboxState';

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
			| 'operation',
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
		public readonly containerName: string | undefined,
		public state: SandboxState,
	) {
		super(
			sandboxName,
			'sandbox',
			state ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None,
		);
		if (state === 'unknown') {
			this.tooltip = sandboxName;
			this.description = undefined;
			this.iconPath = new vscode.ThemeIcon('question');
			this.contextValue = 'sandbox:unknown';
		} else {
			this.tooltip = `${sandboxName}-${state}`;
			this.description = state;
			this.iconPath = new vscode.ThemeIcon(state === 'running' ? 'vm-running' : 'vm-outline');
			this.contextValue = state === 'running' ? 'sandbox:running' : 'sandbox:stopped';
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
		this.description = this.state === undefined
			? ''
			: `${this.state ? 'running' : 'stopped'} ${this._sandboxLevel ?? ''} ${
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
		public readonly alias: string | undefined,
		public readonly parent: SandboxTreeItem,
	) {
		super(alias ?? '', 'implicitAccount', vscode.TreeItemCollapsibleState.Collapsed);
		this.description = address;
	}
}

export class SandboxSmartContractTreeItem extends SandboxTreeItemBase {
	constructor(
		public readonly address: string,
		public readonly alias: string | undefined,
		public type: string,
		public readonly containerName: string,
		public readonly sandboxName: string,
	) {
		super(`${alias ? alias + ':' : ''}${type}`, 'smartContract', vscode.TreeItemCollapsibleState.Collapsed);
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

export class OperationTreeItem extends SandboxTreeItemBase {
	constructor(
		public readonly type: string,
		public readonly hash: string,
		public readonly operation: Object,
		public readonly parent: SandboxSmartContractTreeItem | SandboxImplicitAccountTreeItem,
	) {
		super(type, 'operation', vscode.TreeItemCollapsibleState.None);
		this.description = hash;
		this.contextValue = 'operation';
	}
}
