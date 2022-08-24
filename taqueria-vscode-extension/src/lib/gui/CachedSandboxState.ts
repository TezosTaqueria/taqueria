import * as signalR from '@microsoft/signalr';
import * as rpc from '@taquito/rpc';
import { TezosToolkit } from '@taquito/taquito';
import * as rxjs from 'rxjs';
import { OutputLevels, VsCodeHelper } from '../helpers';
import { TzKtHead } from './SandboxModels';

export class CachedSandboxState {
	connection: signalR.HubConnection;
	sandboxHead = new rxjs.BehaviorSubject<rpc.BlockHeaderResponse | undefined>(undefined);
	indexerHead = new rxjs.BehaviorSubject<TzKtHead | undefined>(undefined);
	taquito = new TezosToolkit(this.sandboxBaseAddress);

	constructor(
		private readonly helper: VsCodeHelper,
		private readonly sandboxName: string,
		private readonly containerName: string,
	) {
		this.connection = new signalR.HubConnectionBuilder()
			.withUrl(`${this.tzKtBaseAddress}/v1/events`)
			.configureLogging(signalR.LogLevel.Information)
			.build();

		this.connection.onclose(async () => {
			await this.startConnection();
		});

		this.connection.on('head', data => this.onHeadFromTzKt(data));
	}

	private onHeadFromTzKt(data: TzKtHead): void {
		this.helper.showLog(OutputLevels.debug, JSON.stringify(data));
		this.headFromTzKt.next(data);
	}

	headFromTzKt = new rxjs.BehaviorSubject<TzKtHead | undefined>(undefined);

	get tzKtBaseAddress() {
		return `http://localhost:5000`;
	}

	get sandboxBaseAddress() {
		return `http://127.0.0.1:20000`;
	}

	async startConnection() {
		try {
			await this.connection.start();
			await this.connection.invoke('SubscribeToHead');
			console.log('SignalR Connected.');
		} catch (err) {
			console.log(err);
			setTimeout(() => {
				this.startConnection();
			}, 5000);
		}
	}
}
