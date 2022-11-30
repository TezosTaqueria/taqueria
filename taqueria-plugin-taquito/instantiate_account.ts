import { getCurrentEnvironmentConfig, RequestArgs, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import {
	generateAccountKeys,
	getDeclaredAccounts,
	getEnvTypeAndNodeConfig,
	getNetworkInstantiatedAccounts,
} from './common';

const instantiate_account = async (parsedArgs: RequestArgs.t): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	try {
		const [envType, nodeConfig] = await getEnvTypeAndNodeConfig(parsedArgs, env);
		if (envType !== 'Network') {
			return sendAsyncErr('taq instantiate-account can only be executed in a network environment');
		}

		const declaredAccountAliases = Object.keys(getDeclaredAccounts(parsedArgs));
		const instantiatedAccounts = getNetworkInstantiatedAccounts(nodeConfig);

		let accountsInstantiated = [];
		for (const declaredAccountAlias of declaredAccountAliases) {
			if (!instantiatedAccounts.hasOwnProperty(declaredAccountAlias)) {
				await generateAccountKeys(parsedArgs, nodeConfig, declaredAccountAlias);
				accountsInstantiated.push(declaredAccountAlias);
			} else {
				sendWarn(
					`Note: ${declaredAccountAlias} is already instantiated in the current environment, "${parsedArgs.env}"`,
				);
			}
		}

		if (accountsInstantiated.length !== 0) {
			return sendJsonRes(
				`Accounts instantiated: ${
					accountsInstantiated.join(', ')
				}.\nPlease execute "taq fund" targeting the same environment to fund these accounts`,
			);
		} else {
			return sendJsonRes(
				`No accounts were instantiated because they were all instantiated in the target environment already`,
			);
		}
	} catch (err) {
		await sendAsyncErr('No operations performed');
		if (parsedArgs.debug) await sendAsyncErr(String(err));
	}
};

export default instantiate_account;
