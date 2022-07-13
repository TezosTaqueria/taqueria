import * as Config from '@taqueria/protocol/Config';
import type { i18n } from '@taqueria/protocol/i18n';
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath';
import * as SHA256 from '@taqueria/protocol/SHA256';
import * as TaqError from '@taqueria/protocol/TaqError';
import * as Task from '@taqueria/protocol/Task';
import { attemptP, both, chain, chainRej, FutureInstance as Future, map, mapRej, reject, resolve } from 'fluture';
import { pipe } from 'https://deno.land/x/fun@v1.0.0/fns.ts';
import { eager, ensureDirExists, joinPaths, readJsonFile, writeJsonFile } from './taqueria-utils/taqueria-utils.ts';
// comment
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
			storage: {},
		},
	},
	sandbox: {
		local: {
			label: 'Local Tezos Sandbox',
			protocol: 'Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A',
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
	network: {},
	// defaultTasks: {
	//     compile: {
	//         plugin: "taqueria-plugin-ligo",
	//         options: {
	//             "-s": "jsligo",
	//             "-o": "%contractsDir%/%filename%.tz"
	//         }
	//     }
	// }
});

export const getDefaultMaxConcurrency = () => 10;

export const getConfigPath = (projectDir: SanitizedAbsPath.t, create = false): Future<TaqError.t, string> =>
	pipe(
		joinPaths(projectDir, '.taq'),
		abspath => create ? ensureDirExists(abspath) : resolve(abspath),
		map((abspath: string) => joinPaths(abspath, 'config.json')),
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
		mapRej<TaqError.t, TaqError.t>(previous => ({
			kind: 'E_INVALID_CONFIG',
			msg: 'Your config.json file is invalid',
			previous,
		})),
		chain(Config.of),
	);

export const toLoadedConfig = (
	configPath: string,
	projectDir: SanitizedAbsPath.t,
	config: Config.t,
): Future<TaqError.t, LoadedConfig.t> =>
	pipe(
		attemptP<TaqError.t, SHA256.t>(() => SHA256.toSHA256(JSON.stringify(config))),
		chain(hash =>
			attemptP<TaqError.t, LoadedConfig.t>(async () =>
				await eager(LoadedConfig.of({
					...config,
					configFile: await eager(SanitizedAbsPath.make(configPath)),
					projectDir,
					hash,
				}))
			)
		),
	);

export const getConfig = (projectDir: SanitizedAbsPath.t, _i18n: i18n, create = false) =>
	pipe(
		getRawConfig(projectDir, create),
		both(getConfigPath(projectDir, create)),
		chain(([configPath, config]) => toLoadedConfig(configPath, projectDir, config)),
	);
