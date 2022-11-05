import { execCmd, getCurrentEnvironmentConfig, sendAsyncErr, sendJsonRes, sendWarn } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';

const ECAD_FLEXTESA_IMAGE = 'ghcr.io/ecadlabs/taqueria-flextesa';
const LIGO_IMAGE = 'ligolang/ligo';

const getDockerDeleteCmd = (): string => {
	const images = [ECAD_FLEXTESA_IMAGE, LIGO_IMAGE];
	const imageFilters = images.reduce((acc, image) => `${acc} --filter "reference=${image}"`, '');
	const cmd = `docker rmi --force $(docker images --quiet ${imageFilters} | uniq)`;
	console.error('JCC:', cmd);
	return cmd;
};

const clean = (parsedArgs: RequestArgs.ProxyRequestArgs): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	return Promise.resolve()
		.then(_ =>
			execCmd('rm .taq/*state*.json')
				.catch(_ => Promise.reject(new Error('No state files exist in the .taq/ folder')))
		)
		.then(_ =>
			execCmd(getDockerDeleteCmd())
				.catch(_ =>
					Promise.reject(
						new Error(
							'Unable to clean all docker images properly. Maybe you need to delete all Taqueria-related containers first',
						),
					)
				)
		)
		.then(_ => sendJsonRes('Taqueria-related states and docker images cleaned 🧽'))
		.catch(err => sendAsyncErr(`Error occurred during cleaning: ${err.message}`));
};

export default clean;
