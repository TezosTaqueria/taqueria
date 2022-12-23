import * as rxjs from 'rxjs';
import * as signalR from '../../../../signalr';
import { VsCodeHelper } from '../../helpers';
import { OutputLevels } from '../../LogHelper';
import { SandboxState } from '../CachedSandboxState';
import { getSandboxAccounts } from '.././helpers/SandboxDataHelpers';
import { TzKTAccountData } from '.././helpers/TzKTFetcher';
import { ObservableConfig } from '.././ObservableConfig';
import { TzKtHead } from '.././SandboxDataModels';

export class CachedTzKTDataProvider {
	private currentTzKtBaseAddress: string | undefined;
	private currentSandboxState: SandboxState;

	readonly headFromTzKt = new rxjs.BehaviorSubject<TzKtHead | undefined>(undefined);
	readonly accountsFromTzKt = new rxjs.BehaviorSubject<TzKTAccountData | undefined>(undefined);
	connection: signalR.HubConnection | undefined;

	constructor(
		private readonly helper: VsCodeHelper,
		private readonly sandboxName: string,
		private readonly observableConfig: ObservableConfig,
		initialSandboxState: SandboxState,
	) {
		this.currentSandboxState = initialSandboxState;
		this.observableConfig.configObservable.subscribe(async _configInfo => await this.updateConfig());
	}

	private onHeadFromTzKt(data: { type: number; data: TzKtHead }): void {
		this.helper.logHelper.showLog(OutputLevels.debug, JSON.stringify(data));
		if (data.type === 1) {
			this.headFromTzKt.next(data.data);
		}
	}

	private onAccountsFromTzKt(data: { type: number; data: TzKTAccountData }): void {
		this.helper.logHelper.showLog(OutputLevels.debug, JSON.stringify(data));
		if (data.type === 1) {
			this.accountsFromTzKt.next(data.data);
		}
	}

	async setSandboxState(newState: SandboxState) {
		if (this.currentSandboxState === newState) {
			return;
		}
		this.currentSandboxState = newState;

		if (newState === 'running') {
			await this.startConnection();
		} else {
			this.connection?.stop();
		}
	}

	getTzKtBaseUrl(sandboxName: string): string | undefined {
		const sandbox = this.observableConfig.currentConfig.config?.config.sandbox?.[sandboxName];
		if (!sandbox || typeof sandbox === 'string') {
			return undefined;
		}
		let port = sandbox.tzkt?.apiPort ?? 5000;
		return `http://127.0.0.1:${port}`;
	}

	async updateConfig(): Promise<void> {
		const tzKtBaseAddress = this.getTzKtBaseUrl(this.sandboxName);
		if (this.currentTzKtBaseAddress === tzKtBaseAddress) {
			return;
		}

		this.helper.logHelper.showLog(
			OutputLevels.debug,
			`TzKt address changed from ${this.currentTzKtBaseAddress} to ${tzKtBaseAddress}`,
		);
		this.currentTzKtBaseAddress = tzKtBaseAddress;

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
		this.connection.on('accounts', payload => this.onAccountsFromTzKt(payload));
	}

	async startConnection() {
		if (!this.connection) {
			return;
		}

		try {
			await this.connection.start();
			await this.connection.invoke('SubscribeToHead');
			// TODO: make sure to reconnect with new accounts if config.json changes
			const sandboxAccounts = getSandboxAccounts(this.observableConfig.currentConfig, this.sandboxName);
			await this.connection.invoke('SubscribeToAccounts', {
				addresses: sandboxAccounts.map(account => account.address),
			});
			this.helper.logHelper.showLog(OutputLevels.debug, 'SignalR Connected');
		} catch (err) {
			this.helper.logHelper.showLog(OutputLevels.debug, 'Error while connecting SignalR');
			this.helper.logAllNestedErrors(err, true);
			setTimeout(() => {
				this.startConnection();
			}, 5000);
		}
	}
}
