import { Config, ConfigFileV2 } from './types';

export const readJsonFileInterceptConfig = (readJsonFile: <T>(filePath: string) => Promise<T>) =>
	<T>(filePath: string): Promise<T> => {
		if (filePath.endsWith(`/.taq/config.json`)) {
			return readConfigFile(readJsonFile)(filePath) as Promise<T>;
		}

		return readJsonFile<T>(filePath);
	};

const readConfigFile = (readJsonFile: <T>(filePath: string) => Promise<T>) =>
	async (configFilePath: string): Promise<Config> => {
		// TODO: read the the new schema files and combine into the ConfigType
		const content = await readJsonFile<Config>(configFilePath);
		return content;
	};

export const writeJsonFileInterceptConfig = (writeJsonFile: <T>(filePath: string) => (data: T) => Promise<string>) =>
	<T>(filePath: string): ((data: T) => Promise<string>) => {
		if (filePath.endsWith(`/.taq/config.json`)) {
			return writeConfigFile(writeJsonFile)(filePath) as (data: T) => Promise<string>;
		}

		return writeJsonFile<T>(filePath);
	};

const writeConfigFile = (writeJsonFile: <T>(filePath: string) => (data: T) => Promise<string>) =>
	(configFilePath: string) =>
		async (config: Config) => {
			// TODO: write the the new schema files and combine into the ConfigType
			return await writeJsonFile<Config>(configFilePath)(config);
		};
