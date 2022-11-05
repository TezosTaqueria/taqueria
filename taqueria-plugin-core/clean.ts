import { execCmd, getCurrentEnvironmentConfig, sendAsyncErr } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';

const ECAD_FLEXTESA_IMAGE = 'ghcr.io/ecadlabs/taqueria-flextesa';
const LIGO_IMAGE = 'ligolang/ligo';

const clean = async (parsedArgs: RequestArgs.ProxyRequestArgs): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	try {
		await execCmd(
			`docker rmi --force $(docker images --quiet --filter "reference=${ECAD_FLEXTESA_IMAGE}" --filter "reference=${LIGO_IMAGE}" | uniq)`,
		);
	} catch {
		return sendAsyncErr('No operations performed');
	}
};

export default clean;
