import { getCurrentEnvironmentConfig, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import {
	generateAccountKeys,
	getDeclaredAccounts,
	getNetworkInstantiatedAccounts,
	getNetworkWithChecks,
	InstantiateAccountOpts as Opts,
} from './common';

const instantiate_account = async (parsedArgs: Opts): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json.`);
	try {
		const networkConfig = await getNetworkWithChecks(parsedArgs, env);
		const declaredAccountAliases = Object.keys(getDeclaredAccounts(parsedArgs));
		const instantiatedAccounts = getNetworkInstantiatedAccounts(networkConfig);
		let accountsInstantiated = [];
		for (const declaredAccountAlias of declaredAccountAliases) {
			if (!instantiatedAccounts.hasOwnProperty(declaredAccountAlias)) {
				await generateAccountKeys(parsedArgs, networkConfig, declaredAccountAlias);
				accountsInstantiated.push(declaredAccountAlias);
			} else {
				sendWarn(
					`Note: ${declaredAccountAlias} is already instantiated in the current environment, "${parsedArgs.env}".`,
				);
			}
		}
		if (accountsInstantiated.length !== 0) {
			return sendJsonRes(
				`Accounts instantiated: ${
					accountsInstantiated.join(', ')
				}.\nPlease execute "taq fund" targeting the same environment to fund these accounts.`,
			);
		} else {
			return sendJsonRes(`No accounts were instantiated.`);
		}
	} catch {
		return sendAsyncErr('No operations performed.');
	}
};

export default instantiate_account;
