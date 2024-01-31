import * as Config from '@taqueria/protocol/Config';
import type { i18n } from '@taqueria/protocol/i18n';
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as SHA256 from '@taqueria/protocol/SHA256';
import * as TaqError from '@taqueria/protocol/TaqError';
import * as Task from '@taqueria/protocol/Task';
import { attemptP, both, chain, chainRej, FutureInstance as Future, go, map, mapRej, reject, resolve } from 'fluture';
import { pipe } from 'fun';
import {
	dirOf,
	doesPathExist,
	doesPathNotExist,
	eager,
	ensureDirExists,
	joinPaths,
	readJsonFile,
	writeJsonFile,
} from './taqueria-utils/taqueria-utils.ts';

export type AddTaskCallback = (
	task: Task.t,
	plugin: InstalledPlugin.t,
	handler: (taskArgs: Record<string, unknown>) => Promise<number>,
) => unknown;

export const defaultConfig: Config.t = Config.create({
	language: 'en',
	contractsDir: 'contracts',
	artifactsDir: 'artifacts',
	environment: {
		default: 'development',
		development: {
			networks: [],
			sandboxes: ['local'],
		},
		testing: {
			networks: ['ghostnet'],
			sandboxes: [],
		},
		production: {
			networks: ['mainnet'],
			sandboxes: [],
		},
	},
	sandbox: {
		local: {
			label: 'Local Tezos Sandbox',
			rpcUrl: 'http://localhost:20000',
		},
	},
	accounts: {
		bob: '3_000_000_000',
		alice: '3_000_000_000',
		john: '3_000_000_000',
		jane: '3_000_000_000',
		joe: '3_000_000_000',
	},
	network: {
		ghostnet: {
			label: 'ghostnet',
			rpcUrl: 'https://ghostnet.ecadinfra.com',
		},
		mainnet: {
			label: 'mainnet',
			rpcUrl: 'https://mainnet.api.tez.ie',
		},
	},
});

export const getDefaultMaxConcurrency = () => 10;

export const getProjectDir = (projectDir: SanitizedAbsPath.t): Future<TaqError.t, string> => {
	const taqDir = joinPaths(projectDir, '.taq');
	return pipe(
		doesPathExist(taqDir),
		chainRej(previous => {
			if (projectDir === '/') {
				return reject(TaqError.create({
					kind: 'E_TAQ_PROJECT_NOT_FOUND',
					msg: "This doesn't appear to be a taqueria project.",
					context: projectDir,
					previous,
				}));
			}
			return pipe(
				joinPaths(projectDir, '../'),
				SanitizedAbsPath.make,
				chain(getProjectDir),
			);
		}),
	);
};

export const getConfigPath = (projectDir: SanitizedAbsPath.t, create = false) =>
	pipe(
		create ? ensureDirExists(joinPaths(projectDir, '.taq')) : getProjectDir(projectDir),
		map(projectDir => joinPaths(projectDir, 'config.json')),
	);

export const getRawConfig = (projectDir: SanitizedAbsPath.t, create = false) =>
	pipe(
		getConfigPath(projectDir, create),
		chain((configPath: string) =>
			pipe(
				readJsonFile<Config.t>(configPath),
				chainRej(err => {
					if (!create) return reject(err);
					else {
						return pipe(
							writeJsonFile<Config.t>(configPath)(defaultConfig),
							chain((configPath: string) => readJsonFile<Config.t>(configPath)),
						);
					}
				}),
			)
		),
		mapRej<TaqError.t, TaqError.t>(previous =>
			previous.kind === 'E_TAQ_PROJECT_NOT_FOUND'
				? previous
				: ({
					kind: 'E_INVALID_CONFIG',
					msg: 'Your config.json file is invalid',
					previous,
				})
		),
		chain(Config.of),
	);

export const toLoadedConfig = (
	configPath: string,
	config: Config.t,
): Future<TaqError.t, LoadedConfig.t> =>
	pipe(
		attemptP<TaqError.t, SHA256.t>(() => SHA256.toSHA256(JSON.stringify(config))),
		chain(hash =>
			attemptP<TaqError.t, LoadedConfig.t>(async () =>
				await eager(LoadedConfig.of({
					...config,
					configFile: await eager(SanitizedAbsPath.make(configPath)),
					projectDir: await eager(SanitizedAbsPath.make(joinPaths(dirOf(configPath), '../'))),
					hash,
				}))
			)
		),
	);

export const getConfig = (projectDir: SanitizedAbsPath.t, _i18n: i18n, create = false) =>
	pipe(
		getRawConfig(projectDir, create),
		both(getConfigPath(projectDir, create)),
		chain(([configPath, config]) => toLoadedConfig(configPath, config)),
	);
