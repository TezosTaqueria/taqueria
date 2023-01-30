import { SandboxAccountConfig } from '@taqueria/protocol/types';
import { ConfigInfo } from '../ObservableConfig';

export type TaqueriaSmartContract = {
	alias: string;
	config: {
		address: string;
	};
};

export type TaqueriaAccount = {
	alias: string;
	address: string;
};

export function getContractsByTaqueriaConfig(currentConfig: ConfigInfo, sandboxName: string): TaqueriaSmartContract[] {
	const sandboxEnvironment = Object.values(currentConfig.config?.config.environment ?? []).find(
		environment =>
			typeof environment === 'string'
				? false
				: environment.sandboxes.some(envSandbox => envSandbox === sandboxName),
	);
	const configContractsMap = sandboxEnvironment && typeof sandboxEnvironment !== 'string'
		? sandboxEnvironment.aliases
		: (currentConfig.config?.config.contracts) as unknown as Record<string, { address: string }> | undefined;
	return Object.entries(configContractsMap ?? {}).map(([alias, contract]) => ({
		alias,
		config: { address: contract.address },
	}));
}

export function getAccountsByTaqueriaConfig(currentConfig: ConfigInfo, sandboxName: string): TaqueriaAccount[] {
	const sandbox = currentConfig.config?.config.sandbox?.[sandboxName];
	const configAccountsMap = sandbox?.accounts
		?? ((currentConfig.config?.config.accounts) as unknown as Record<string, SandboxAccountConfig> | undefined);
	if (!configAccountsMap) {
		return [];
	}

	return (
		Object.entries(configAccountsMap)
			.filter(([alias, config]) => typeof config !== 'string') as Array<[string, SandboxAccountConfig]>
	)
		.map(([alias, account]) => ({ alias, address: account.publicKeyHash }));
}
