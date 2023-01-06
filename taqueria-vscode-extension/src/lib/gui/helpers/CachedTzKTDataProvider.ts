import * as rxjs from 'rxjs';
import * as signalR from '../../../../signalr';
import { notNullish } from '../../GeneralHelperFunctions';
import { VsCodeHelper } from '../../helpers';
import { OutputLevels } from '../../LogHelper';
import { SandboxState } from '../CachedSandboxState';
import { getAccountsByTaqueriaConfig, getContractsByTaqueriaConfig } from '.././helpers/SandboxDataHelpers';
import {
	findAccountInTzKT,
	findSmartContractFromTzkt,
	TzKTAccountData,
	TzKTContractData,
} from '.././helpers/TzKTFetcher';
import { ObservableConfig } from '.././ObservableConfig';
import { TzKtHead } from '.././SandboxDataModels';

export type SandboxTzKTAccount = TzKTAccountData & {
	address: NonNullable<TzKTAccountData['address']>;
	alias: NonNullable<TzKTAccountData['alias']>;
};

export type SandboxTzKTContract = TzKTContractData & {
	address: NonNullable<TzKTContractData['address']>;
	alias: NonNullable<TzKTContractData['alias']>;
};

export class CachedTzKTDataProvider {
	private currentTzKtBaseAddress: string | undefined;
	private currentSandboxState: SandboxState;
	private tzktAccountsMap = new Map<string, TzKTAccountData>();
	private tzktContractsMap = new Map<string, TzKTContractData>();

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
		this.observableConfig.configObservable.subscribe(async _configInfo => await this.onConfigUpdate());
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

	private async onConfigUpdate(): Promise<void> {
		const tzKtBaseAddress = this.findTzKtBaseUrl(this.sandboxName);
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

	findTzKtBaseUrl(sandboxName: string): string | undefined {
		const sandbox = this.observableConfig.currentConfig.config?.config.sandbox?.[sandboxName];
		if (!sandbox || typeof sandbox === 'string') {
			return undefined;
		}
		let port = sandbox.tzkt?.apiPort ?? 5000;
		return `http://127.0.0.1:${port}`;
	}

	async startConnection() {
		if (!this.connection) {
			return;
		}

		try {
			await this.connection.start();
			await this.connection.invoke('SubscribeToHead');

			const sandboxAccounts = getAccountsByTaqueriaConfig(this.observableConfig.currentConfig, this.sandboxName);
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

	async getAccounts(): Promise<SandboxTzKTAccount[]> {
		const tzktBaseUrl = this.findTzKtBaseUrl(this.sandboxName);
		if (!tzktBaseUrl) return [];

		const sandboxAccounts = getAccountsByTaqueriaConfig(this.observableConfig.currentConfig, this.sandboxName);
		if (sandboxAccounts.length === 0) return [];

		const tzktAccounts = await Promise.all(
			sandboxAccounts.map(async account => {
				const data = this.tzktAccountsMap.get(account.address) ?? await findAccountInTzKT(tzktBaseUrl, account);
				if (!data) return;

				const tzktAccount: SandboxTzKTAccount = {
					...data,
					address: data.address ?? account.address,
					alias: data.alias ?? account.alias,
				};
				this.tzktAccountsMap.set(account.address, tzktAccount);
				return tzktAccount;
			}),
		);

		return tzktAccounts.filter(notNullish) as SandboxTzKTAccount[];
	}

	async getContracts(): Promise<SandboxTzKTContract[]> {
		const tzktBaseUrl = this.findTzKtBaseUrl(this.sandboxName);
		if (!tzktBaseUrl) return [];

		const sandboxContracts = getContractsByTaqueriaConfig(this.observableConfig.currentConfig, this.sandboxName);
		if (sandboxContracts.length === 0) return [];

		const tzktContracts = await Promise.all(
			sandboxContracts
				.map(async contract => {
					const data = this.tzktContractsMap.get(contract.config.address)
						?? await findSmartContractFromTzkt(tzktBaseUrl, contract);
					if (!data) return;

					const tzktContract: SandboxTzKTContract = {
						...data,
						address: data.address ?? contract.config.address,
						alias: data.alias ?? contract.alias,
					};
					this.tzktAccountsMap.set(contract.config.address, tzktContract);
					return tzktContract;
				}),
		);

		return tzktContracts.filter(notNullish) as SandboxTzKTContract[];
	}
}
