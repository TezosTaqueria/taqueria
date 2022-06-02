import { LoadedConfig, RequestArgs, SanitizedAbsPath } from '@taqueria/node-sdk/types';
import { join } from 'path';

export interface CustomConfig extends LoadedConfig.t {
	readonly jestTestsRootDir?: string;
}

export const getTestsRootDir = (config: CustomConfig) => {
	return config.jestTestsRootDir || 'tests';
};

export const getTestsRootAbspath = (projectDir: SanitizedAbsPath.t, config: CustomConfig) =>
	SanitizedAbsPath.create(
		join(projectDir, getTestsRootDir(config)),
	);
