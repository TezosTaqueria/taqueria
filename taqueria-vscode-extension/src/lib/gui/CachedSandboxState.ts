import * as rpc from '@taquito/rpc';
import { TezosToolkit } from '@taquito/taquito';
import * as rxjs from 'rxjs';
import { ObservableConfig } from './ObservableConfig';
import { SandboxModel } from './SandboxDataModels';

export type SandboxState = 'running' | 'stopped' | 'unknown';

export class CachedSandboxState {
	private _currentSandboxBaseUrl: string | undefined;
	private _state: SandboxState;

	sandBoxModel: SandboxModel;
	sandboxHead = new rxjs.BehaviorSubject<rpc.BlockHeaderResponse | undefined>(undefined);
	taquito: TezosToolkit | undefined;

	async setState(value: SandboxState) {
		if (this._state === value) {
			return;
		}
		this._state = value;
	}

	get state() {
		return this._state;
	}

	constructor(
		private readonly sandboxName: string,
		containerName: string,
		private readonly observableConfig: ObservableConfig,
		state: SandboxState,
	) {
		this.observableConfig.configObservable.subscribe(async _configInfo => await this.updateConfig());
		this.sandBoxModel = {
			sandboxName: sandboxName,
			flextesaContainerName: containerName,
			indexerLevel: undefined,
			sandBoxLevel: undefined,
			implicitAccounts: [],
			sandboxState: undefined,
			smartContracts: [],
		};
		this._state = state;
	}

	private updateSandboxBaseUrl(): void {
		const sandboxBaseUrl = this.getSandboxBaseUrl(this.sandboxName);
		if (sandboxBaseUrl === this._currentSandboxBaseUrl) {
			return;
		}
		this._currentSandboxBaseUrl = sandboxBaseUrl;
		if (!sandboxBaseUrl) {
			this.taquito = undefined;
			return;
		}
		this.taquito = new TezosToolkit(sandboxBaseUrl);
	}

	async updateConfig(): Promise<void> {
		this.updateSandboxBaseUrl();
	}

	getSandboxBaseUrl(sandboxName: string): string | undefined {
		const sandbox = this.observableConfig.currentConfig.config?.config.sandbox?.[sandboxName];
		if (!sandbox || typeof sandbox === 'string') {
			return undefined;
		}
		let port = new URL(sandbox.rpcUrl).port;
		if (!port) {
			port = '80';
		}
		return `http://127.0.0.1:${port}`;
	}
}
