// TODO: Write a comprehensive API for V2
import * as ConfigEnvironmentFileV2 from '@taqueria/protocol/ConfigEnvironmentFileV2';
import * as Config from '@taqueria/protocol/ConfigFileV2';
import { ConfigFileSetV2 } from '@taqueria/protocol/types-config-files';
import { isTaqError, TaqError } from './TaqError';

type ExpandedEnv = Record<string, unknown> & ConfigEnvironmentFileV2.t & { __type: 'expandedEnv' };
export function getEnv(envName: string, settings: ConfigFileSetV2): ExpandedEnv {
	const mainEnv = settings.config.environments?.[envName];
	if (mainEnv) {
		return {
			...mainEnv,
			...settings.environments[envName],
		} as ExpandedEnv;
	}
	throw new TaqError(`There is no environment configured called ${envName}`);
}

export const getCurrentEnv = (settings: ConfigFileSetV2) => {
	if (settings.config.environmentDefault) {
		return getEnv(settings.config.environmentDefault, settings);
	}
	throw new TaqError(
		`No default environment has been configured. Please set the "environmentDefault" property in your .taq/config.json.`,
	);
};

export function getContractAddress(contractName: string, env: ExpandedEnv) {
	return env.contracts?.[contractName]?.address;
}
