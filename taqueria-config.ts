import type {Config, Task, InstalledPlugin, Action, ConfigArgs} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {Future, TaqError} from './taqueria-utils/taqueria-utils-types.ts'
import {ConfigDir, i18n} from './taqueria-types.ts'
import {SanitizedPath, SanitizedAbsPath, SHA256} from './taqueria-utils/taqueria-utils-types.ts'
import {readFile, writeTextFile, decodeJson, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {resolve, reject, map, chain, mapRej, chainRej} from 'https://cdn.skypack.dev/fluture'

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
            }
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

export const make = (data: object) : Future<TaqError, Config> => {
    // TODO: Change decoding/validation library
    const err = undefined
    const validData = {
        ...defaultConfig,
        ...data
    }
    // const [err, validData] = validate(data, ConfigDecoder)
    return err === undefined
        ? resolve(validData)
        : reject({kind: "E_INVALID_CONFIG", msg: "TODO, should this use i18n?"})
}

export const getConfigPath = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, create=false) : Future<TaqError, string> => pipe(
    ConfigDir.create(projectDir, configDir, create),
    map ((configDir: ConfigDir) => joinPaths(configDir.value, "config.json"))
)

export const getRawConfig = (projectDir: SanitizedAbsPath, configDir: SanitizedPath,  create=false) : Future<TaqError, ConfigArgs> => pipe(
    getConfigPath(projectDir, configDir, create),
    chain ( (path:string) => pipe(
        readFile(path),
        chainRej ((err:unknown) => {
            if (!create) return reject(err)
            else {
                const data = JSON.stringify(defaultConfig)
                return pipe(
                    writeTextFile(path, JSON.stringify(defaultConfig)),
                    chain (readFile),
                    map (() => data)
                )
            }
        }),
        chain (decodeJson),

        chain ((config: Config) => pipe(
            SHA256.futureOf(JSON.stringify(config)),
            map ((hash: string) => ({
                ...config,
                configFile: path,
                configDir, projectDir,
                hash
            }))
        )),
        mapRej ((previous:unknown) => ({kind: "E_INVALID_CONFIG", msg: "TODO, should this use i18n?", previous})),
    ))
)

export const getConfig = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, _i18n: i18n, create=false) : Future<TaqError, ConfigArgs> => pipe(
        getRawConfig(projectDir, configDir, create),
        chain (make)
    )