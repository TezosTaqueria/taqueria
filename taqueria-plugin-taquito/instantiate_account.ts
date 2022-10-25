import {
	getCurrentEnvironment,
	getCurrentEnvironmentConfig,
	getNetworkConfig,
	sendAsyncErr,
	sendJsonRes,
	sendWarn,
} from '@taqueria/node-sdk';
import { Environment } from '@taqueria/node-sdk/types';
import { getDeclaredAccounts, InstantiateAccountOpts as Opts, TAQ_ROOT_ACCOUNT } from './common';

const instantiate_account = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const declaredAccount = getDeclaredAccounts(parsedArgs);
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default instantiate_account;
