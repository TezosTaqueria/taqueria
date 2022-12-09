import type {
	Config,
	ConfigEnvironmentFileV2,
	ConfigFileV1,
	ConfigFileV2,
	Environment,
} from '@taqueria/protocol/types';

type ConfigFileSetV2 = {
	config: ConfigFileV2;
	environments: ConfigEnvironmentFileV2;
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
		let configFileObj = await readJsonFile(configFilePath);

		if ((configFileObj as ConfigFileV2).version !== `v2`) {
			configFileObj = transformConfigFileV1ToConfigFileV2(configFileObj as ConfigFileV1);
		}

		return transformConfigFileV2ToConfig(configFileObj as ConfigFileV2);
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
			// TODO: write the the new schema files and combine into the ConfigType
			const configFileV2 = transformConfigToConfigFileV2(config);
			return await writeJsonFile(configFilePath)(configFileV2);
		};

// Migrate FileV1 to FileV2
const transformConfigFileV1ToConfigFileV2 = (configFileV1: ConfigFileV1): ConfigFileV2 => {
	const configFileV2: ConfigFileV2 = {
		...configFileV1,
		version: `v2`,
		accounts: !configFileV1.accounts
			? undefined
			: Object.fromEntries(
				Object.entries(configFileV1.accounts)
					.map(([k, v]) => [k, { balance: { amount: v, units: `mutez` } }]),
			),
	};

	return configFileV2;
};

// Object to FileV2
const transformConfigToConfigFileV2 = (config: Config): ConfigFileV2 => {
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

	return configFileV2;
};

// FileV2 to Object
const transformConfigFileV2ToConfig = (configFileV2: ConfigFileV2): Config => {
	const environments = Object.entries(configFileV2.environments ?? {})
		.map(([k, v]) => ({
			key: k,
			value: v as typeof v & {
				label?: string;
				rpcUrl?: string;
				protocol?: string;
			},
		}));

	const simpleEnvironments = environments.filter(x => x.value.type === `simple`);
	const sandboxEnvironments = environments.filter(x => x.value.type === `flextesa`);

	const config: Config = {
		...configFileV2,
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
		network: Object.fromEntries(simpleEnvironments.map(x => [x.key, {
			label: `${x.key}-network`,
			rpcUrl: x.value.rpcUrl ?? ``,
			protocol: x.value.protocol ?? ``,
		}])),
		sandbox: Object.fromEntries(sandboxEnvironments.map(x => [x.key, {
			label: `${x.key}-sandbox`,
			rpcUrl: x.value.rpcUrl ?? ``,
			protocol: x.value.protocol ?? ``,
		}])),
	};
	return config;
};
