import type {Config, Task, InstalledPlugin, ConfigArgs} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {Future, TaqError} from './taqueria-utils/taqueria-utils-types.ts'
import {ConfigDir, i18n} from './taqueria-types.ts'
import {SanitizedPath, SanitizedAbsPath, SHA256} from './taqueria-utils/taqueria-utils-types.ts'
import {debug, readJsonFile, writeJsonFile, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {resolve, reject, map, chain, mapRej, chainRej, both} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'

export type AddTaskCallback = (task: Task, plugin: InstalledPlugin, handler: (taskArgs: Record<string, unknown>) => Promise<number>) => unknown

export const defaultConfig : Config = {
    language: 'en',
    plugins: [],
    contractsDir: "contracts",
    testsDir: "tests",
    artifactsDir: "artifacts",
    environment: {
        default: "development",
        development: {
            networks: [],
            sandboxes: ["local"],
            storage: {
           }
        }
    },
    sandbox: {
        local: {
            accounts: {
                default: "bob",
                bob: {
                    initialBalance: "3000000000"
                },
                alice: {
                    initialBalance: "2000000000"
                },
                john: {
                    initialBalance: "4000000000"
                },
                jane: {
                    initialBalance: "5000000000"
                },
                joe: {
                    initialBalance: "1000000000"
                }
            },
            label: "Local Tezos Sandbox",
            protocol: "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A",
            rpcUrl: "http://localhost:20000"
        }
    },
    network: {
        
    }
    // defaultTasks: {
    //     compile: {
    //         plugin: "taqueria-plugin-ligo",
    //         options: {
    //             "-s": "jsligo",
    //             "-o": "%contractsDir%/%filename%.tz"
    //         }
    //     }
    // }
}

export const getDefaultMaxConcurrency = () => 10

export const getConfigPath = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, create=false) : Future<TaqError, string> => pipe(
    ConfigDir.create(projectDir, configDir, create),
    map ((configDir: ConfigDir) => joinPaths(configDir.value, "config.json"))
)

export const getRawConfig = (projectDir: SanitizedAbsPath, configDir: SanitizedPath,  create=false) => pipe(
    getConfigPath(projectDir, configDir, create),
    chain ((configPath : string) => pipe(
        readJsonFile(configPath),
        chainRej (err => {
            if (!create) return reject(err)
            else {
                return pipe(
                    writeJsonFile<Config>(configPath) (defaultConfig),
                    chain((configPath: string) => readJsonFile<Config>(configPath))
                )
            }
        })
    )),
    mapRej<TaqError, TaqError>(previous => ({kind: "E_INVALID_CONFIG", msg: "Your config.json file is invalid", previous})),
    
    // TODO: Config should be a discrete type that we parse (like SanitizedAbsPath)
    // This will ensure that the config is actually valid
    //
    // E.g.:
    // map (Config.create)
    //
    // See: https://github.com/ecadlabs/taqueria/issues/642
    map(val => val as Config)
)


export const toConfigArgs = (configPath: string, configDir: SanitizedPath, projectDir: SanitizedAbsPath, config: Config): Future<TaqError, ConfigArgs> => pipe(
    SHA256.futureOf(JSON.stringify(config)),
    map(hash => ({
        ...config,
        configFile: SanitizedAbsPath.create(configPath),
        configDir,
        projectDir,
        hash
    }) as ConfigArgs)
)

export const getConfig = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, _i18n: i18n, create=false) => pipe(
        getRawConfig(projectDir, configDir, create),
        both (getConfigPath(projectDir, configDir, create)),
        chain (([configPath, config]) => toConfigArgs(configPath, configDir, projectDir, config)),
    )