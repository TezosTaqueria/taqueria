import * as Config from '@taqueria/protocol/Config';
import * as Environment from '@taqueria/protocol/Environment';

export const getCurrentEnv = (config: Config.t): Environment.t | undefined => {
	const currentEnv = config?.environment?.default ? config.environment.default as string : 'development';
	return config.environment && config.environment[currentEnv]
		? config.environment[currentEnv] as Environment.t | undefined
		: undefined;
};

export const getAliasAddress = (config: any, alias: string): string => {
	const currentEnv = getCurrentEnv(config);
	if (currentEnv?.aliases?.[alias]?.address) return currentEnv.aliases[alias].address;
	alert(`Address for alias, ${alias}, is missing. Please deploy a contract with such alias`);
	return '';
};
