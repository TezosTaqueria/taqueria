import { sendAsyncErr } from '@taqueria/node-sdk';
import { LoadedConfig, RequestArgs, SanitizedAbsPath } from '@taqueria/node-sdk/types';
import { mkdir, stat, writeFile } from 'fs/promises';
import { defaults } from 'jest-config';
import { join } from 'path';

interface Opts extends RequestArgs.t {
	partition?: string;
}

type DefaultConfig = typeof defaults;

export interface CustomConfig extends LoadedConfig.t {
	readonly jestTestsRootDir?: string;
}

export const getTestsRootAbspath = (projectDir: SanitizedAbsPath.t, config: CustomConfig) =>
	SanitizedAbsPath.create(
		join(projectDir, getTestsRootDir(config)),
	);

export const getDefaultConfig = (defaultConfig: DefaultConfig) => `
module.exports = ${JSON.stringify(defaults, null, 4)}
`;

export const ensureRootConfigExists = (projectDir: SanitizedAbsPath.t) => {
	const jestRootConfig = getRootConfigAbspath(projectDir);
	return stat(jestRootConfig)
		.catch(_ => writeFile(jestRootConfig, getDefaultConfig(defaults)))
		.then(_ => jestRootConfig);
};

export const getRootConfigAbspath = (projectDir: SanitizedAbsPath.t) =>
	SanitizedAbsPath.create(
		join(projectDir, '.taq', 'jest.config.js'),
	);

export const getTestsRootDir = (config: CustomConfig) => {
	return config.jestTestsRootDir || 'tests';
};

const toPartitionCfg = (partitionAbspath: SanitizedAbsPath.t, rootConfigAbsPath: SanitizedAbsPath.t) => `
const parentConfig = require('${rootConfigAbsPath}')

module.exports = {
	...parentConfig,
	roots: [
		"${partitionAbspath}"
	]
}
`;

export const getPartitionAbspath = (partitionDir: string) => SanitizedAbsPath.create(partitionDir);

export const getPartitionConfigAbspath = (partitionDir: string) =>
	SanitizedAbsPath.create(join(partitionDir, 'jest.config.js'));

const createPartition = async (partitionDir: SanitizedAbsPath.t, projectDir: SanitizedAbsPath.t) =>
	ensureRootConfigExists(projectDir)
		.then(_ => stat(partitionDir))
		.then(stats =>
			stats.isFile()
				? sendAsyncErr(`${partitionDir} is an invalid partition directory`)
				: stats
		)
		.catch(_ => mkdir(partitionDir, { recursive: true }))
		.then(_ => getPartitionConfigAbspath(partitionDir))
		.then(partitionCfgAbsPath =>
			stat(partitionCfgAbsPath)
				.catch(_ =>
					writeFile(
						partitionCfgAbsPath,
						toPartitionCfg(
							getPartitionAbspath(partitionDir),
							getRootConfigAbspath(projectDir),
						),
					)
				)
		)
		.then(_ => getPartitionConfigAbspath(partitionDir));

export const ensurePartitionExists = (args: Opts) =>
	args.partition
		? createPartition(
			SanitizedAbsPath.create(join(args.projectDir, args.partition)),
			args.projectDir,
		)
		: createPartition(
			SanitizedAbsPath.create(
				join(args.projectDir, getTestsRootDir(args.config)),
			),
			args.projectDir,
		);
