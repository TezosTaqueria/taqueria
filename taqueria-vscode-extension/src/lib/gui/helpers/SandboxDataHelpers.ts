import { SandboxAccountConfig } from '@taqueria/protocol/types';
import { ConfigInfo } from '../ObservableConfig';

export type SandboxContract = {
	alias: string;
	config: {
		address: string;
	};
};

export type SandboxAccount = {
	alias: string;
	address: string;
};

export function getContractsByTaqueriaConfig(currentConfig: ConfigInfo, sandboxName: string): SandboxContract[] {
	const sandboxEnvironment = Object.values(currentConfig.config?.config.environment ?? []).find(
		environment =>
			typeof environment === 'string'
				? false
				: environment.sandboxes.some(envSandbox => envSandbox === sandboxName),
	);
	if (!sandboxEnvironment || typeof sandboxEnvironment === 'string' || !sandboxEnvironment.aliases) {
		return [];
	}

	return Object.entries(sandboxEnvironment.aliases).map(([alias, config]) => ({
		alias,
		config: { address: config.address },
	}));
}

export function getAccountsByTaqueriaConfig(currentConfig: ConfigInfo, sandboxName: string): SandboxAccount[] {
	const sandbox = currentConfig.config?.config.sandbox?.[sandboxName];
	if (!sandbox || !sandbox.accounts) {
		return [];
	}

	return (
		Object.entries(sandbox.accounts)
			.filter(([alias, config]) => typeof config !== 'string') as Array<[string, SandboxAccountConfig]>
	)
		.map(([alias, config]) => ({ alias, address: config.publicKeyHash }));
}
