import { sendAsyncErr, sendAsyncRes, sendErr } from '@taqueria/node-sdk';
import { LoadedConfig, RequestArgs, SanitizedAbsPath } from '@taqueria/node-sdk/types';
import { execa } from 'execa';
import { mkdir, stat, writeFile } from 'fs/promises';
import { defaults } from 'jest-config';
import { join } from 'path';

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

const toPartitionCfg = (partitionAbspath: SanitizedAbsPath.t, rootConfigAbsPath: SanitizedAbsPath.t) => `
const parentConfig = require('${rootConfigAbsPath}')

module.exports = {
    ...parentConfig,
    roots: [
        "${partitionAbspath}"
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
							getPartitionAbspath(partitionDir),
							getRootConfigAbspath(projectDir),
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
	// console.log([cmd, ...args].join(' '))

	const child = execa(cmd, args, {
		reject: false,
		buffer: false,
		// encoding: null,
		shell: true,
		stdio: 'inherit',
		env: { FORCE_COLOR: 'true' },
	});

	return child.then(_ => {});
};

export default async (args: RequestArgs.ProxyRequestArgs) => {
	const opts = args as Opts;

	return ensurePartitionExists(opts)
		.then(configAbsPath => {
			if (!opts.init) {
				return opts.testPattern
					? execCmd('npx', ['jest', '-c', configAbsPath, '--testPathPattern', opts.testPattern])
					: execCmd('npx', ['jest', '-c', configAbsPath]);
			}

			return sendAsyncRes('Initialized successfully.');
		});
};
