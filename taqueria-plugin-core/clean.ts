import { execCmd, getCurrentEnvironmentConfig, sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';

const clean = async (parsedArgs: RequestArgs.ProxyRequestArgs): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	try {
		const ecadFlextesaImage = 'ghcr.io/ecadlabs/taqueria-flextesa';
		const ligoImage = 'ligolang/ligo';
		const results = (await execCmd(
			`docker rmi --force $(docker images --quiet --filter "reference=${ecadFlextesaImage}" --filter "reference=${ligoImage}")`,
		));
		console.error('JCC out:', results.stdout);
		console.error('JCC err:', results.stderr);
	} catch {
		return sendAsyncErr('No operations performed');
	}
};

export default clean;
