import {Config, Task, InstalledPlugin} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {Future, TaqError} from './taqueria-utils/taqueria-utils-types.ts'
import * as LoadedConfig from "./LoadedConfig.ts"
import {i18n} from './taqueria-types.ts'
import {SanitizedAbsPath, SHA256} from './taqueria-utils/taqueria-utils-types.ts'
import {readJsonFile, writeJsonFile, joinPaths, ensureDirExists} from './taqueria-utils/taqueria-utils.ts'
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {resolve, reject, map, chain, mapRej, chainRej, both} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js'

export type AddTaskCallback = (task: Task.t, plugin: InstalledPlugin.t, handler: (taskArgs: Record<string, unknown>) => Promise<number>) => unknown

export const defaultConfig : Config.t = Config.create({
    language: 'en',
    contractsDir: "contracts",
    testsDir: "tests",
    artifactsDir: "artifacts",
    environment: {
        default: "development",
        development: {
            networks: [],
            sandboxes: ["local"]
        }
    },
    sandbox: {
        local: {
            label: "Local Tezos Sandbox",
            protocol: "PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx",
            rpcUrl: "http://localhost:20000"
        }
    },
    accounts: {
        bob: "3_000_000_000",
        alice:  "3_000_000_000",
        john: "3_000_000_000",
        jane: "3_000_000_000",
        joe: "3_000_000_000"
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
})

export const getDefaultMaxConcurrency = () => 10

export const getConfigPath = (projectDir: SanitizedAbsPath.t, create=false) : Future.t<TaqError.t, string> => pipe(
    joinPaths(projectDir, '.taq'),
    abspath => create ? ensureDirExists(abspath): resolve(abspath),
    map (abspath => joinPaths(abspath, 'config.json'))
)

export const getRawConfig = (projectDir: SanitizedAbsPath.t, create=false) => pipe(
    getConfigPath(projectDir, create),
    chain ((configPath : string) => pipe(
        readJsonFile(configPath),
        chainRej (err => {
            if (!create) return reject(err)
            else {
                return pipe(
                    writeJsonFile<Config.t>(configPath) (defaultConfig),
                    chain((configPath: string) => readJsonFile<Config.t>(configPath))
                )
            }
        })
    )),
    mapRej<TaqError.t, TaqError.t>(previous => ({kind: "E_INVALID_CONFIG", msg: "Your config.json file is invalid", previous})),
    map(val => val as Config.t)
)


export const toLoadedConfig = (configPath: string, projectDir: SanitizedAbsPath.t, config: Config.t): Future.t<TaqError.t, LoadedConfig.t> => pipe(
    SHA256.futureOf(JSON.stringify(config)),
    map(hash => LoadedConfig.make({
        ...config,
        configFile: SanitizedAbsPath.make(configPath),
        projectDir,
        hash
    }))
)

export const getConfig = (projectDir: SanitizedAbsPath.t, _i18n: i18n, create=false) => pipe(
        getRawConfig(projectDir, create),
        both (getConfigPath(projectDir, create)),
        chain (([configPath, config]) => toLoadedConfig(configPath, projectDir, config)),
    )