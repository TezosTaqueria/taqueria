import { execCmd, getCurrentEnvironmentConfig, sendAsyncErr, sendJsonRes } from '@taqueria/node-sdk';
import { RequestArgs } from '@taqueria/node-sdk/types';

const ECAD_FLEXTESA_IMAGE = 'ghcr.io/ecadlabs/taqueria-flextesa';
const FLEXTESA_IMAGE = 'oxheadalpha/flextesa';
const LIGO_IMAGE = 'ligolang/ligo';
const ARCHETYPE_IMAGE = 'completium/archetype';
const ECAD_TZKT_IMAGE = 'alirezahaghshenas/tzkt';

const getDockerImageIdsCmd = (): string => {
	const images = [ECAD_FLEXTESA_IMAGE, FLEXTESA_IMAGE, LIGO_IMAGE, ARCHETYPE_IMAGE, ECAD_TZKT_IMAGE];
	const imageFilters = images.reduce((acc, image) => `${acc} --filter "reference=${image}"`, '');
	const cmd = `docker images --quiet ${imageFilters} | uniq`;
	return cmd;
};

const removeStates = () =>
	execCmd('rm .taq/*state*.json')
		.catch(() => {}); // just ignore and resolve it

const removeImages = () =>
	execCmd(getDockerImageIdsCmd())
		.then(results => {
			const images = results.stdout.replace(/\s/g, ' ');
			if (images) return execCmd(`docker rmi --force ${images}`);
		})
		.catch(() =>
			Promise.reject(
				new Error(
					'Unable to clean all docker images properly. Maybe you need to delete all Taqueria-related containers first',
				),
			)
		);

const clean = (parsedArgs: RequestArgs.ProxyRequestArgs): Promise<void> => {
	const env = getCurrentEnvironmentConfig(parsedArgs);
	if (!env) return sendAsyncErr(`There is no environment called ${parsedArgs.env} in your config.json`);
	return Promise.resolve()
		.then(removeStates)
		.then(removeImages)
		.then(() => sendJsonRes('All Taqueria-related states and docker images cleaned 🧽'))
		.catch(err => sendAsyncErr(`Error occurred during cleaning: ${err.message}`));
};

export default clean;
