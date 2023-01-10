import type {
	Config,
	ConfigEnvironmentFileV2,
	ConfigFileV1,
	ConfigFileV2,
	Environment,
} from '@taqueria/protocol/types';

export type ConfigFileSetV2 = {
	config: ConfigFileV2;
	environments: { [name: string]: ConfigEnvironmentFileV2 };
};

export const readJsonFileInterceptConfig = (readJsonFile: <T>(filePath: string) => Promise<T>) =>
	async <T>(filePath: string): Promise<T> => {
		if (filePath.endsWith(`.taq/config.json`)) {
			return transformConfigFileV2ToConfig(await readConfigFiles(readJsonFile)(filePath)) as unknown as Promise<T>;
		}

		return readJsonFile<T>(filePath);
	};

export const readConfigFiles = (readJsonFile: <T>(filePath: string) => Promise<T>) =>
	async (configFilePath: string): Promise<ConfigFileSetV2> => {
		const configFileObj = await readJsonFile(configFilePath);

		if ((configFileObj as ConfigFileV2).version !== `v2`) {
			// v1 - only file to load
			const configFileSetV2 = transformConfigFileV1ToConfigFileSetV2(configFileObj as ConfigFileV1);
			return configFileSetV2;
		}

		// Load env files
		const configFileV2 = configFileObj as ConfigFileV2;
		const envFiles = await Promise.all(
			Object.keys(configFileV2.environments ?? {}).map(async envName => {
				try {
					return {
						key: envName,
						value: await readJsonFile(
							configFilePath.replace(`config.json`, `config.local.${envName}.json`),
						) as ConfigEnvironmentFileV2,
					};
				} catch {
					// ignore if file could not be read (no env file)
					return {};
				}
			}),
		);

		return {
			config: configFileV2,
			environments: Object.fromEntries(envFiles.filter(x => x.value).map(x => [x.key, x.value])),
		};
	};

export const writeJsonFileInterceptConfig = (writeJsonFile: (filePath: string) => (data: unknown) => Promise<string>) =>
	(filePath: string): ((data: unknown) => Promise<string>) => {
		if (filePath.endsWith(`.taq/config.json`)) {
			return (async (config: Config) => {
				// DEBUG: write original file
				// await writeJsonFile(filePath.replace(`config.json`, `config.original-${Date.now()}.json`))(config);

				return await writeConfigFiles(writeJsonFile)(filePath)(transformConfigToConfigFileV2(config));
			}) as (data: unknown) => Promise<string>;
		}

		return writeJsonFile(filePath);
	};

export const writeConfigFiles = (writeJsonFile: (filePath: string) => (data: unknown) => Promise<string>) =>
	(configFilePath: string) =>
		async (configFileSetV2: ConfigFileSetV2) => {
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
					// Unknown fields
					...((() => {
						const vClone = { ...v } as Partial<typeof v>;
						delete vClone.networks;
						delete vClone.sandboxes;
						return vClone;
					})()),
					// Preserve sandbox or network name
					networkName: v.networks[0],
					sandboxName: v.sandboxes[0],
					// Fields from the first sandbox or network (there should be only 1)
					// These overwrite fields in environment
					...[
						...v.networks.map(k => config.network?.[k]),
						...v.sandboxes.map(k => config.sandbox?.[k]),
					][0] as {},
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
					// Unknown fields
					...((() => {
						const vClone = { ...v } as Partial<typeof v>;
						delete vClone.networks;
						delete vClone.sandboxes;
						return vClone;
					})()),
					// Preserve sandbox or network name
					networkName: v.networks[0],
					sandboxName: v.sandboxes[0],
					// Fields from the first sandbox or network (there should be only 1)
					// These overwrite fields in environment
					...[
						...v.networks.map(k => config.network?.[k]),
						...v.sandboxes.map(k => config.sandbox?.[k]),
					][0] as {},
				}]),
		),
		plugins: config.plugins,
	};

	// extract local only fields to environment specific files
	// This should only include fields that the environment plugin will replace if missing
	// This is providing a default implementation for a few known environments
	const environmentsV2 = {} as ConfigFileSetV2['environments'];

	for (const [envName, eMain] of Object.entries(configFileV2.environments ?? {})) {
		// clone eMain and delete fields from either main config or local env config
		const eLocal = environmentsV2[envName] = { ...eMain };

		for (const k of Object.keys(eMain)) {
			const key = k as keyof typeof eMain;

			if (key === `type`) {
				delete eLocal[key];
				continue;
			}

			// Everything except label and protocol is local for sandbox
			if (eMain.type === 'flextesa') {
				if (
					k === 'label'
					|| k === 'protocol'
				) {
					delete eLocal[key];
					continue;
				}
			}

			// For simple networks, keep the rpcUrl also
			if (eMain.type === 'simple') {
				if (
					k === 'label'
					|| k === 'protocol'
					|| k === 'rpcUrl'
				) {
					delete eLocal[key];
					continue;
				}
			}

			// Remove from main by default
			delete eMain[key];
		}
		continue;
	}

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
				// custom named network or sandbox
				networkName?: string;
				sandboxName?: string;
				// Known network/sandbox fields
				label?: string;
				protocol?: string;
				rpcUrl?: string;
				// Known environment fields
				storage?: unknown;
				aliases?: unknown;
			},
		}));

	const getUnknownFields = (x: typeof environments[number], structure: 'environment' | 'network' | 'sandbox') => {
		if (structure === 'environment') {
			// environment should only have known fields
			return {};
		}

		// Let all the unknown fields be placed in the network or sandbox
		const unknownFields = ((() => {
			const vClone = { ...x.value } as Partial<typeof x.value>;
			// Remove known fields that have a known structure
			delete vClone.type;
			delete vClone.networkName;
			delete vClone.sandboxName;
			delete vClone.label;
			delete vClone.rpcUrl;
			delete vClone.storage;
			delete vClone.aliases;
			return vClone;
		})());

		return unknownFields;
	};

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
				// Network and sandbox
				networks: x.value.type !== `simple` ? [] : [
					// use same name as enviroment by default
					x.value.networkName ?? `${x.key}`,
				],
				sandboxes: x.value.type !== `flextesa` ? [] : [
					// use same name as enviroment by default
					x.value.sandboxName ?? `${x.key}`,
				],
				// Known environment fields
				storage: x.value.storage,
				aliases: x.value.aliases,
				// Unknown fields might need to be in the environment
				...getUnknownFields(x, 'environment'),
			}])),
		},
		network: !simpleEnvironments.length
			? undefined
			: Object.fromEntries(simpleEnvironments.map(x => [x.value.networkName ?? `${x.key}`, {
				label: x.value.label ?? ``,
				rpcUrl: x.value.rpcUrl ?? ``,
				// Unknown fields might need to be in the network or sandbox
				...getUnknownFields(x, 'network') as {},
			}])),
		sandbox: !sandboxEnvironments.length
			? undefined
			: Object.fromEntries(sandboxEnvironments.map(x => [x.value.sandboxName ?? `${x.key}`, {
				label: x.value.label ?? ``,
				rpcUrl: x.value.rpcUrl ?? ``,
				// Unknown fields might need to be in the network or sandbox
				...getUnknownFields(x, 'sandbox') as {},
			}])),
	};

	return removeUndefinedFields(config);
};
