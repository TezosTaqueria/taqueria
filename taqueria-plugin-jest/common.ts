import { noop, sendAsyncErr, sendAsyncRes } from '@taqueria/node-sdk';
import { LoadedConfig, RequestArgs, SanitizedAbsPath, SanitizedPath } from '@taqueria/node-sdk/types';
import { mkdir, stat, writeFile } from 'fs/promises';
import { defaults } from 'jest-config';
import { join, relative } from 'path';

export type DefaultConfig = typeof defaults;

export interface CustomConfig extends LoadedConfig.t {
	readonly jestTestsRootDir?: string;
}

export interface CustomRequestArgs extends RequestArgs.t {
	config: CustomConfig;
	partition?: string;
}

export const toRequestArgs = (args: RequestArgs.t) => (args as CustomRequestArgs);

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

export const toPartitionCfg = (partitionRelpath: SanitizedPath.t, rootConfigRelPath: SanitizedPath.t) => `
const parentConfig = require('${rootConfigRelPath}')

module.exports = {
    ...parentConfig,
    roots: [
        "${partitionRelpath}"
    ]
}
`;

export const getPartitionAbspath = (partitionDir: string) => SanitizedAbsPath.create(partitionDir);

export const getPartitionConfigAbspath = (partitionDir: string) =>
	SanitizedAbsPath.create(join(partitionDir, 'jest.config.js'));

export const createPartition = async (partitionDir: SanitizedAbsPath.t, projectDir: SanitizedAbsPath.t) =>
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
							SanitizedPath.create(relative(partitionDir, partitionDir)),
							SanitizedPath.create(relative(partitionDir, getRootConfigAbspath(projectDir))),
						),
					)
				)
		)
		.then(_ => getPartitionConfigAbspath(partitionDir));

export const ensurePartitionExists = (args: CustomRequestArgs) =>
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
