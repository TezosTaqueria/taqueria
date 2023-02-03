import * as Config from '@taqueria/protocol/Config';
import * as ConfigEnvironmentFileV2 from '@taqueria/protocol/ConfigEnvironmentFileV2';
import * as ConfigFileV2 from '@taqueria/protocol/ConfigFileV2';
import { isTaqError, TaqError } from './TaqError';
export { isTaqError, TaqError } from './TaqError';
import * as V1 from './v1';
export * as V2 from './v2';
import * as transform from '@taqueria/protocol/types-config-files';

const DEFAULT_ENV_VAR_PREFIX = '';

function withEnv(env: Record<string, string | undefined>, prefix = DEFAULT_ENV_VAR_PREFIX) {
	const getConfigEnvKey = () => `${prefix}TAQ_CONFIG`;

	const decode = (value: string) => {
		const buffer = Buffer.from(value, 'base64');
		return buffer.toString('utf8');
	};

	const getRawConfig = () => {
		const key = getConfigEnvKey();
		const data = env[key];
		if (!data) {
			throw new TaqError(
				`Could not find config. Please ensure that the environment variable called ${key} is defined and set to the value of your config.json file using Base64 encoding.`,
			);
		}
		try {
			const decoded = decode(data);
			const rawConfig = JSON.parse(decoded);
			return rawConfig;
		} catch {
			throw new TaqError(
				`Could not parse the config. Please ensure that the environment variable called ${key} is defined and set to the value of your config.json file using Base64 encoding.`,
			);
		}
	};

	const getEnvironmentConfigKey = (environmentName: string) =>
		`${prefix}TAQ_CONFIG_LOCAL_${environmentName.toUpperCase()}`;

	const getEnvironmentConfig = (environmentName: string) => {
		const key = getEnvironmentConfigKey(environmentName);
		const data = env[key];
		if (!data) {
			return ConfigEnvironmentFileV2.from({});
		}
		try {
			const decoded = decode(data);
			const rawConfig = JSON.parse(decoded);
			return ConfigEnvironmentFileV2.from(rawConfig);
		} catch {
			throw new TaqError(
				`Could not parse environment config for an environment called ${environmentName}. Please ensure that the environment variable called ${key} is defined and set to the value of your config.json file using Base64 encoding.`,
			);
		}
	};

	return {
		getConfigEnvKey,
		getRawConfig,
		getEnvironmentConfigKey,
		getEnvironmentConfig,
	};
}

export const getConfigAsV1 = (env: Record<string, string | undefined>, prefix = DEFAULT_ENV_VAR_PREFIX): Config.t => {
	const { getRawConfig, getEnvironmentConfig } = withEnv(env, prefix);

	const rawConfig = getRawConfig();

	try {
		// If version v1, return the config object
		if (!rawConfig.version || rawConfig.version.toLowerCase() === 'v1') return Config.from(rawConfig);
		// If version v2, transform to V1 and return that
		else if (rawConfig.version.toLowerCase() === 'v2') {
			const config = ConfigFileV2.from(rawConfig);
			const environments = Object.keys(config.environments ?? {}).reduce(
				(retval, envName) => ({
					...retval,
					[envName]: getEnvironmentConfig(envName),
				}),
				{},
			);

			return Config.create(transform.transformConfigFileV2ToConfig({
				config,
				environments,
			}));
		}

		// Other version handlers go here
		throw new TaqError(`The version of your configuration is not yet supported.`);
	} catch (err) {
		throw isTaqError(err)
			? err
			: new TaqError(
				`Something went wrong trying to parse your configuration. Please report this to the Taqueria Developers: ${err}`,
			);
	}
};

export function getConfigV2(
	env: Record<string, string | undefined>,
	prefix = DEFAULT_ENV_VAR_PREFIX,
): transform.ConfigFileSetV2 {
	const { getRawConfig, getEnvironmentConfig } = withEnv(env, prefix);

	const rawConfig = getRawConfig();

	try {
		// If version v1, return the config object
		if (!rawConfig.version || rawConfig.version.toLowerCase() === 'v1') {
			const configV1 = Config.from(rawConfig);
			return transform.transformConfigToConfigFileV2(configV1);
		} else if (rawConfig.version.toLowerCase() === 'v2') {
			const configV2 = ConfigFileV2.from(rawConfig);
			const environments = Object.keys(configV2.environments ?? {}).reduce(
				(retval, envName) => ({ ...retval, [envName]: getEnvironmentConfig(envName) }),
				{},
			);
			const retval: transform.ConfigFileSetV2 = {
				config: configV2,
				environments,
			};

			return retval;
		}
		// Other version handlers go here
		// No other versions we're aware of.
		throw new TaqError(`The version of your configuration is not yet supported.`);
	} catch (err) {
		throw isTaqError(err)
			? err
			: new TaqError(
				`Something went wrong trying to parse your configuration. Please report this to the Taqueria Developers: ${err}`,
			);
	}
}

// Backwards compatibility
// Before introducing V1, the toolkit just exported these two functions
const getAliasAddress = V1.getAliasAddress;
const getCurrentEnv = V1.getCurrentEnv;
export { Config, getAliasAddress, getCurrentEnv };

// New exports as of V2
export type ConfigFileSetV2 = transform.ConfigFileSetV2;
