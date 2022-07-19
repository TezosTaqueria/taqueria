import { noop, sendAsyncErr, sendAsyncRes } from '@taqueria/node-sdk';
import { LoadedConfig, RequestArgs, SanitizedAbsPath, SanitizedPath } from '@taqueria/node-sdk/types';
import { execa } from 'execa';
import { mkdir, stat, writeFile } from 'fs/promises';
import { defaults } from 'jest-config';
import { join, relative } from 'path';

type DefaultConfig = typeof defaults;

interface CustomConfig extends LoadedConfig.t {
	readonly jestTestsRootDir?: string;
}

interface Opts extends RequestArgs.ProxyRequestArgs {
	readonly config: CustomConfig;
	readonly init: boolean;
	readonly partition: string;
	readonly testPattern: string;
}

const getDefaultConfig = (defaultConfig: DefaultConfig) => `
module.exports = ${JSON.stringify(defaults, null, 4)}
`;

const ensureRootConfigExists = (projectDir: SanitizedAbsPath.t) => {
	const jestRootConfig = getRootConfigAbspath(projectDir);
	return stat(jestRootConfig)
		.catch(_ => writeFile(jestRootConfig, getDefaultConfig(defaults)))
		.then(_ => jestRootConfig);
};

const getRootConfigAbspath = (projectDir: SanitizedAbsPath.t) =>
	SanitizedAbsPath.create(
		join(projectDir, '.taq', 'jest.config.js'),
	);

const getTestsRootDir = (config: CustomConfig) => {
	return config.jestTestsRootDir || 'tests';
};

const toPartitionCfg = (partitionRelpath: SanitizedPath.t, rootConfigRelPath: SanitizedPath.t) => `
const parentConfig = require('${rootConfigRelPath}')

module.exports = {
    ...parentConfig,
    roots: [
        "${partitionRelpath}"
    ]
}
`;

const getPartitionAbspath = (partitionDir: string) => SanitizedAbsPath.create(partitionDir);

const getPartitionConfigAbspath = (partitionDir: string) =>
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
							SanitizedPath.create(relative(partitionDir, partitionDir)),
							SanitizedPath.create(relative(partitionDir, getRootConfigAbspath(projectDir))),
						),
					)
				)
		)
		.then(_ => getPartitionConfigAbspath(partitionDir));

const ensurePartitionExists = (args: Opts) =>
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

const execCmd = (cmd: string, args: string[]) => {
	const child = execa(cmd, args, {
		shell: true,
		reject: false,
		env: { FORCE_COLOR: 'true' },
	});

	child.stdout?.pipe(process.stdout);
	child.stderr?.pipe(process.stderr);

	return child;
};

export default async (args: RequestArgs.ProxyRequestArgs) => {
	const opts = args as Opts;

	return ensurePartitionExists(opts)
		.then(configAbsPath => {
			if (!opts.init) {
				const retval = opts.testPattern
					? execCmd('npx', ['jest', '-c', configAbsPath, '--testPathPattern', opts.testPattern])
					: execCmd('npx', ['jest', '-c', configAbsPath]);
				return retval.then(child => {
					if (child.exitCode === 0) return;
					else process.exit(child.exitCode);
				});
			}

			return sendAsyncRes('Initialized successfully.');
		});
};
