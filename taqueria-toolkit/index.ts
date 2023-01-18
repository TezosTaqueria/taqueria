import * as Config from '@taqueria/protocol/Config';
import * as ConfigEnvironmentFileV2 from '@taqueria/protocol/ConfigEnvironmentFileV2';
import * as ConfigFileV2 from '@taqueria/protocol/ConfigFileV2';
import * as Environment from '@taqueria/protocol/Environment';
import { transformConfigFileV2ToConfig } from '@taqueria/protocol/types-config-files';

// Copied from state package
// const getProjectAbsPath = async (search = './'): Promise<string> => {
// 	const dir = resolve(search);

// 	// If we've reached / or c:\, then give up
// 	if (/^(\/|[A-Z]:\\?)$/.test(dir)) {
// 		throw 'Could not find project directory';
// 	}

// 	const filename = join(dir, '.taq', 'config.json');
// 	try {
// 		const exists = await stat(filename);

// 		// TODO: Will this work on Windows?
// 		// ... I might need to use .taq\config.json
// 		return filename.replace('.taq/config.json', '');
// 	} catch {
// 		// TODO: Will this work on Windows?
// 		// I might need to do ..\
// 		return await getProjectAbsPath(join(dir, '../'));
// 	}
// };

// Copied from state package
// const getConfig = async (projectAbspath: string): Promise<Config.t> => {
// 	try {
// 		const configAbspath = join(projectAbspath, '.taq', 'config.json');
// 		const contents = await readFile(configAbspath, 'utf-8');
// 		const unvalided = JSON.parse(contents);
// 		return Config.create(unvalided);
// 	} catch {
// 		throw 'Could not load .taq/config.json';
// 	}
// };

// const sendErr = (msg: string, newline = true) => {
// 	if (!msg || msg.length === 0) return;
// 	return newline
// 		? console.error(msg)
// 		: process.stderr.write(msg) as unknown as void;
// };

// const getConfigJSON = async (): Promise<Config.t> => {
// 	const projectAbspath = await getProjectAbsPath();
// 	const config = await getConfig(projectAbspath);
// 	return config;
// };

const V1 = () => {
	const getCurrentEnv = (config: Config.t): Environment.t | undefined => {
		const currentEnv = config?.environment?.default ? config.environment.default as string : 'development';
		return config.environment && config.environment[currentEnv]
			? config.environment[currentEnv] as Environment.t | undefined
			: undefined;
	};

	const getAliasAddress = (config: any, alias: string): string => {
		debugger;
		const currentEnv = getCurrentEnv(config);
		if (currentEnv?.aliases?.[alias]?.address) return currentEnv.aliases[alias].address;
		alert(`Address for alias, ${alias}, is missing. Please deploy a contract with such alias`);
		return '';
	};

	return {
		getCurrentEnv,
		getAliasAddress,
	};
};

export class TaqError extends Error {
	public isTaqError = true;
}
export const isTaqError = (err: unknown): err is TaqError =>
	typeof err === 'object' && (err as object).hasOwnProperty('isTaqError');

export const loadFromEnv = (env: Record<string, string | undefined>, prefix = 'REACT_APP_') => {
	debugger;
	const getConfigEnvKey = () => `${prefix}TAQ_CONFIG`;

	const getConfig = () => {
		const key = getConfigEnvKey();
		const data = env[key];
		if (!data) {
			throw new TaqError(
				`Could not load config. Please ensure that the environment variable called ${key} is defined and set to the value of your config.json file using Base64 encoding.`,
			);
		}
		try {
			const decoded = atob(data);
			const rawConfig = JSON.parse(decoded);

			// If version v1, return the config object
			if (!rawConfig.version || rawConfig.version === 'v1') return Config.from(rawConfig);
			// If version v2, return the ConfigFileV2 object
			else if (rawConfig.version === 'v2') {
				const config = ConfigFileV2.from(rawConfig);
				const environments = Object.keys(config.environments ?? {}).reduce(
					(retval, envName) => ({
						...retval,
						[envName]: getEnvironmentConfig(envName),
					}),
					{},
				);
				// const expandedConfig = expandConfigV2(config)
				return transformConfigFileV2ToConfig({
					config,
					environments,
				});
			}

			// Other version handlers go here

			// No other versions we're aware of. Time to throw.
			throw data;
		} catch (err) {
			throw isTaqError(err)
				? err
				: new TaqError(
					`Could not parse config. Please ensure that the environment variable called ${key} is defined and set to the value of your config.json using Base64 encoding`,
				);
		}
	};

	const getEnvironmentConfigKey = (environmentName: string) =>
		`${prefix}TAQ_CONFIG_LOCAL_${environmentName.toUpperCase()}`;

	const getEnvironmentConfig = (environmentName: string) => {
		const key = getEnvironmentConfigKey(environmentName);
		const data = env[key];
		if (!data) {
			throw new TaqError(
				`Could not load environment config for an environment called ${environmentName}. Please ensure that the environment variable called ${key} is defined and set to the value of your config.json file using Base64 encoding.`,
			);
		}
		try {
			const decoded = atob(data);
			const rawConfig = JSON.parse(decoded);
			return ConfigEnvironmentFileV2.from(rawConfig);
		} catch {
			throw new TaqError(
				`Could not parse environment config for an environment called ${environmentName}. Please ensure that the environment variable called ${key} is defined and set to the value of your config.json file using Base64 encoding.`,
			);
		}
	};

	// const expandConfigV2 = (config: ConfigFileV2.t) => {
	// 	return config.environments
	// 		?	Object.entries(config.environments).reduce(
	// 				(retval, [envName, envConfig]) => ({
	// 					...config,
	// 					environments: {
	// 						...config.environments,
	// 						[envName]: {
	// 							...envConfig,
	// 							...getEnvironmentConfig(envName)
	// 						}
	// 					}
	// 				}),
	// 				config
	// 			)
	// 		: config
	// }

	return getConfig();
};

export default loadFromEnv;

const v1 = V1();

export const getAliasAddress = v1.getAliasAddress;

export const getCurrentEnv = v1.getCurrentEnv;
