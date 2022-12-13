import type {
	Config,
	ConfigEnvironmentFileV2,
	ConfigFileV1,
	ConfigFileV2,
	Environment,
} from '@taqueria/protocol/types';

type ConfigFileSetV2 = {
	config: ConfigFileV2;
	environments: { [name: string]: ConfigEnvironmentFileV2 };
};

export const readJsonFileInterceptConfig = (readJsonFile: <T>(filePath: string) => Promise<T>) =>
	<T>(filePath: string): Promise<T> => {
		if (filePath.endsWith(`.taq/config.json`)) {
			return readConfigFile(readJsonFile)(filePath) as unknown as Promise<T>;
		}

		return readJsonFile<T>(filePath);
	};

const readConfigFile = (readJsonFile: <T>(filePath: string) => Promise<T>) =>
	async (configFilePath: string): Promise<Config> => {
		// TODO: read the the new schema files and combine into the ConfigType
		const configFileObj = await readJsonFile(configFilePath);

		if ((configFileObj as ConfigFileV2).version !== `v2`) {
			// v1 - only file to load
			const configFileSetV2 = transformConfigFileV1ToConfigFileSetV2(configFileObj as ConfigFileV1);
			return transformConfigFileV2ToConfig(configFileSetV2);
		}

		// Load env files
		const configFileV2 = configFileObj as ConfigFileV2;
		const envFiles = await Promise.all(
			Object.keys(configFileV2.environments ?? {}).map(async envName => {
				return {
					key: envName,
					value: readJsonFile(
						configFilePath.replace(`config.json`, `config.local.${envName}.json`),
					) as ConfigEnvironmentFileV2,
				};
			}),
		);

		return transformConfigFileV2ToConfig({
			config: configFileV2,
			environments: Object.fromEntries(envFiles.map(x => [x.key, x.value])),
		});
	};

export const writeJsonFileInterceptConfig = (writeJsonFile: (filePath: string) => (data: unknown) => Promise<string>) =>
	(filePath: string): ((data: unknown) => Promise<string>) => {
		if (filePath.endsWith(`.taq/config.json`)) {
			return writeConfigFile(writeJsonFile)(filePath) as unknown as (data: unknown) => Promise<string>;
		}

		return writeJsonFile(filePath);
	};

const writeConfigFile = (writeJsonFile: (filePath: string) => (data: unknown) => Promise<string>) =>
	(configFilePath: string) =>
		async (config: Config) => {
			const configFileSetV2 = transformConfigToConfigFileV2(config);
			const configFileResult = await writeJsonFile(configFilePath)(configFileSetV2.config);

			// write the env files
			await Promise.all(
				Object.entries(configFileSetV2.environments).map(async ([envName, value]) => {
					await writeJsonFile(configFilePath.replace(`config.json`, `config.local.${envName}.json`))(value);
				}),
			);

			return configFileResult;
		};

const removeUndefinedFields = <T>(x: T): T => {
	return JSON.parse(JSON.stringify(x)) as T;
};

/** Migrate FileV1 to FileV2
 *
 * NOTE: Although this is nearly identical to transformConfigToConfigFileV2
 * This function should be sealed while the transformConfigToConfigFileV2
 * will change interatively to become move like V2
 */
const transformConfigFileV1ToConfigFileSetV2 = (configFileV1: ConfigFileV1): ConfigFileSetV2 => {
	const config = configFileV1;
	const configFileV2: ConfigFileV2 = {
		version: `v2`,
		language: config.language,
		metadata: config.metadata,
		artifactsDir: config.artifactsDir,
		contractsDir: config.contractsDir,
		accounts: !config.accounts
			? undefined
			: Object.fromEntries(
				Object.entries(config.accounts)
					.map(([k, v]) => [k, { balance: { amount: v, units: `mutez` } }]),
			),
		contracts: config.contracts,
		environmentDefault: config.environment?.default as string,
		environments: Object.fromEntries(
			Object.entries(config.environment ?? {})
				.filter(([k, v]) => k !== `default`)
				.map(([k, v]) => [k, v] as [string, Environment])
				.map(([k, v]) => [k, {
					// Known fields
					type: v.sandboxes.length ? `flextesa` : `simple`,
					// Fields from the first sandbox or network (there should be only 1)
					...[
						...v.sandboxes.map(k => config.sandbox?.[k]),
						...v.networks.map(k => config.network?.[k]),
					][0] as {},
					// Unknown fields
					...((() => {
						const vClone = { ...v } as Partial<typeof v>;
						delete vClone.networks;
						delete vClone.sandboxes;
						return vClone;
					})()),
				}]),
		),
		plugins: config.plugins,
	};

	// It is fine to leave everything in the main config V2 file since it will be parsed either way
	const environmentsV2 = {};
	return removeUndefinedFields({ config: configFileV2, environments: environmentsV2 });
};

// Object to FileV2
const transformConfigToConfigFileV2 = (config: Config): ConfigFileSetV2 => {
	const configFileV2: ConfigFileV2 = {
		version: `v2`,
		language: config.language,
		metadata: config.metadata,
		artifactsDir: config.artifactsDir,
		contractsDir: config.contractsDir,
		accounts: !config.accounts
			? undefined
			: Object.fromEntries(
				Object.entries(config.accounts)
					.map(([k, v]) => [k, { balance: { amount: v, units: `mutez` } }]),
			),
		contracts: config.contracts,
		environmentDefault: config.environment.default as string,
		environments: Object.fromEntries(
			Object.entries(config.environment)
				.filter(([k, v]) => k !== `default`)
				.map(([k, v]) => [k, v] as [string, Environment])
				.map(([k, v]) => [k, {
					// Known fields
					type: v.sandboxes.length ? `flextesa` : `simple`,
					// Fields from the first sandbox or network (there should be only 1)
					...[
						...v.sandboxes.map(k => config.sandbox?.[k]),
						...v.networks.map(k => config.network?.[k]),
					][0] as {},
					// Unknown fields
					...((() => {
						const vClone = { ...v } as Partial<typeof v>;
						delete vClone.networks;
						delete vClone.sandboxes;
						return vClone;
					})()),
				}]),
		),
		plugins: config.plugins,
	};

	// extract local only fields to environment specific files
	// This should only include fields that the environment plugin will replace if missing
	const environmentsV2 = {};

	return removeUndefinedFields({ config: configFileV2, environments: environmentsV2 });
};

// FileV2 to Object
const transformConfigFileV2ToConfig = (configFileSetV2: ConfigFileSetV2): Config => {
	const {
		config: configFileV2,
		environments: environmentFilesV2,
	} = configFileSetV2;

	const environments = Object.entries(configFileV2.environments ?? {})
		.map(([k, v]) => ({
			key: k,
			value: {
				...v,
				// merge in the fields from the envFile
				...environmentFilesV2[k] ?? {},
			} as typeof v & {
				label?: string;
				rpcUrl?: string;
				protocol?: string;
			},
		}));

	const simpleEnvironments = environments.filter(x => x.value.type === `simple`);
	const sandboxEnvironments = environments.filter(x => x.value.type === `flextesa`);

	const config: Config = {
		// Common fields
		...((() => {
			const vClone = { ...configFileV2 } as Partial<typeof configFileV2>;
			delete vClone.version;
			delete vClone.environmentDefault;
			delete vClone.environments;
			return vClone;
		})()),
		// Transformed fields
		accounts: !configFileV2.accounts
			? undefined
			: Object.fromEntries(
				Object.entries(configFileV2.accounts)
					.map(([k, v]) => [k, `${v.balance.amount}`]),
			),
		environment: {
			default: configFileV2.environmentDefault ?? environments[0]?.key,
			...Object.fromEntries(environments.map(x => [x.key, {
				// Unknown fields
				...((() => {
					const vClone = { ...x.value } as Partial<typeof x.value>;
					delete vClone.type;
					delete vClone.label;
					delete vClone.protocol;
					delete vClone.rpcUrl;
					return vClone;
				})()),
				// Known fields
				networks: x.value.type !== `simple` ? [] : [
					`${x.key}-network`,
				],
				sandboxes: x.value.type !== `flextesa` ? [] : [
					`${x.key}-sandbox`,
				],
			}])),
		},
		network: Object.fromEntries(simpleEnvironments.map(x => [`${x.key}-network`, {
			label: x.value.label ?? ``,
			rpcUrl: x.value.rpcUrl ?? ``,
			protocol: x.value.protocol ?? ``,
		}])),
		sandbox: Object.fromEntries(sandboxEnvironments.map(x => [`${x.key}-sandbox`, {
			label: x.value.label ?? ``,
			rpcUrl: x.value.rpcUrl ?? ``,
			protocol: x.value.protocol ?? ``,
		}])),
	};

	return removeUndefinedFields(config);
};
