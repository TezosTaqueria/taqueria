import type {Config, Task, InstalledPlugin, Action, ConfigArgs} from './taqueria-protocol/taqueria-protocol-types.ts'
import {Future, TaqError, resolveFuture, rejectFuture} from './taqueria-utils/taqueria-utils-types.ts'
import {ConfigDir, i18n} from './taqueria-types.ts'
import {SanitizedPath, SanitizedAbsPath, SHA256} from './taqueria-utils/taqueria-utils-types.ts'
import {debug, readJsonFile, writeJsonFile, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {map, chain, mapRej, chainRej} from 'https://cdn.skypack.dev/fluture'

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
            protocol: "PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx",
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

export const make = (data: Record<string, unknown>) : Future<TaqError, ConfigArgs> => {
    // TODO: Change decoding/validation library
    const err = undefined
    const validData = {
        ...defaultConfig,
        ...data
    } as ConfigArgs

    // const [err, validData] = validate(data, ConfigDecoder)
    return err === undefined
        ? resolveFuture(validData)
        : rejectFuture({kind: "E_INVALID_CONFIG", msg: "The config.json file does not adhere to the required schema."})
}

export const getConfigPath = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, create=false) : Future<TaqError, string> => pipe(
    ConfigDir.create(projectDir, configDir, create),
    map ((configDir: ConfigDir) => joinPaths(configDir.value, "config.json"))
)

export const getRawConfig = (projectDir: SanitizedAbsPath, configDir: SanitizedPath,  create=false) : Future<TaqError, ConfigArgs> => pipe(
    getConfigPath(projectDir, configDir, create),
    chain ( (configPath : string) => pipe(
        readJsonFile(configPath),
        chainRej ((err:unknown) => {
            if (!create) return resolveFuture(err)
            else {
                return pipe(
                    writeJsonFile(configPath) (defaultConfig),
                    chain ((configPath: string) => readJsonFile<Config>(configPath))
                )
            }
        }),

        chain ((config: Config) => pipe(
            SHA256.futureOf(JSON.stringify(config)),
            map ((hash: string) => ({
                ...config,
                configFile: SanitizedAbsPath.create(configPath),
                configDir,
                projectDir,
                hash
            }))
        )),
        mapRej ((previous:unknown) => ({kind: "E_INVALID_CONFIG", msg: "Your config.json file looks invalid.", previous})),
    ))
)

export const getConfig = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, _i18n: i18n, create=false) : Future<TaqError, ConfigArgs> => pipe(
        getRawConfig(projectDir, configDir, create),
        chain (make)
    )