import { Protocol } from '@taqueria/node-sdk/types';
import * as rpc from '@taquito/rpc';
import { TezosToolkit } from '@taquito/taquito';
import * as rxjs from 'rxjs';
import * as signalR from '../../signalr';
import { OutputLevels, VsCodeHelper } from '../helpers';
import { ObservableConfig } from './ObservableConfig';
import { SandboxModel, TzKtHead } from './SandboxDataModels';

const { Url } = Protocol;

export type SandboxState = 'running' | 'stopped' | 'unknown';

export class CachedSandboxState {
	connection: signalR.HubConnection | undefined;
	sandboxHead = new rxjs.BehaviorSubject<rpc.BlockHeaderResponse | undefined>(undefined);
	indexerHead = new rxjs.BehaviorSubject<TzKtHead | undefined>(undefined);
	taquito: TezosToolkit | undefined;
	private _currentSandboxBaseUrl: string | undefined;
	private _currentTzKtBaseAddress: string | undefined;
	private _state: SandboxState;

	async setState(value: SandboxState) {
		if (this._state === value) {
			return;
		}
		this._state = value;
		if (value === 'running') {
			await this.startConnection();
		} else {
			this.connection?.stop();
		}
	}

	get state() {
		return this._state;
	}

	public sandBoxModel: SandboxModel;

	constructor(
		private readonly helper: VsCodeHelper,
		private readonly sandboxName: string,
		private readonly containerName: string,
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
	async updateConfig(): Promise<void> {
		this.updateSandboxBaseUrl();
		await this.updateTzKtBaseUrl();
	}
	async updateTzKtBaseUrl() {
		const tzKtBaseAddress = this.getTzKtBaseUrl(this.sandboxName);
		if (this._currentTzKtBaseAddress === tzKtBaseAddress) {
			return;
		}
		this.helper.showLog(
			OutputLevels.debug,
			`TzKt address changed from ${this._currentTzKtBaseAddress} to ${tzKtBaseAddress}`,
		);
		this._currentTzKtBaseAddress = tzKtBaseAddress;
		if (this.connection) {
			await this.connection.stop();
		}
		this.connection = new signalR.HubConnectionBuilder()
			.withUrl(`${tzKtBaseAddress}/v1/events`, {
				skipNegotiation: true,
				transport: signalR.HttpTransportType.WebSockets,
			})
			.configureLogging(signalR.LogLevel.Information)
			.build();

		this.connection.onclose(async () => {
			await this.startConnection();
		});

		this.connection.on('head', data => this.onHeadFromTzKt(data));
	}

	updateSandboxBaseUrl(): void {
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

	private onHeadFromTzKt(data: { type: number; data: TzKtHead }): void {
		this.helper.showLog(OutputLevels.debug, JSON.stringify(data));
		if (data.type === 1) {
			this.headFromTzKt.next(data.data);
		}
	}

	headFromTzKt = new rxjs.BehaviorSubject<TzKtHead | undefined>(undefined);

	async startConnection() {
		if (!this.connection) {
			return;
		}
		try {
			await this.connection.start();
			await this.connection.invoke('SubscribeToHead');
			this.helper.showLog(OutputLevels.debug, 'SignalR Connected');
		} catch (err) {
			this.helper.showLog(OutputLevels.debug, 'Error while connecting SignalR');
			this.helper.logAllNestedErrors(err, true);
			setTimeout(() => {
				this.startConnection();
			}, 5000);
		}
	}

	getSandboxBaseUrl(sandboxName: string): string | undefined {
		const sandbox = this.observableConfig.currentConfig.config?.config.sandbox?.[sandboxName];
		if (!sandbox || typeof sandbox === 'string') {
			return undefined;
		}
		let port = Url.toComponents(sandbox.rpcUrl).port;
		if (!port) {
			port = '80';
		}
		return `http://127.0.0.1:${port}`;
	}

	getTzKtBaseUrl(sandboxName: string): string | undefined {
		const sandbox = this.observableConfig.currentConfig.config?.config.sandbox?.[sandboxName];
		if (!sandbox || typeof sandbox === 'string') {
			return undefined;
		}
		let port = sandbox.tzkt?.apiPort ?? 5000;
		return `http://127.0.0.1:${port}`;
	}
}
