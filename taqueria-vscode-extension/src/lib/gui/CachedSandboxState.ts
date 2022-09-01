import { Protocol } from '@taqueria/node-sdk/types';
import * as rpc from '@taquito/rpc';
import { TezosToolkit } from '@taquito/taquito';
import * as rxjs from 'rxjs';
import * as signalR from '../../signalr';
import { OutputLevels, VsCodeHelper } from '../helpers';
import { ObservableConfig } from './ObservableConfig';
import { TzKtHead } from './SandboxModels';

const { Url } = Protocol;

export class CachedSandboxState {
	connection: signalR.HubConnection | undefined;
	sandboxHead = new rxjs.BehaviorSubject<rpc.BlockHeaderResponse | undefined>(undefined);
	indexerHead = new rxjs.BehaviorSubject<TzKtHead | undefined>(undefined);
	taquito: TezosToolkit | undefined;
	private _currentSandboxBaseUrl: string | undefined;
	private _currentTzKtBaseAddress: string | undefined;

	constructor(
		private readonly helper: VsCodeHelper,
		private readonly sandboxName: string,
		private readonly containerName: string,
		private readonly observableConfig: ObservableConfig,
	) {
		this.observableConfig.configObservable.subscribe(_configInfo => this.updateConfig());
	}
	updateConfig(): void {
		this.updateSandboxBaseUrl();
		this.updateTzKtBaseUrl();
	}
	updateTzKtBaseUrl() {
		const tzKtBaseAddress = this.getTzKtBaseUrl(this.sandboxName);
		if (this._currentTzKtBaseAddress === tzKtBaseAddress) {
			return;
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
