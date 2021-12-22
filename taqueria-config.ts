import type {Config, PluginInfo, Task, InstalledPlugin, Action} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {Future, TaqError} from './taqueria-utils/taqueria-utils-types.ts'
import {EnvVars, ConfigDir, SanitizedInitArgs, i18n} from './taqueria-types.ts'
import {SanitizedPath} from './taqueria-utils/taqueria-utils-types.ts'
import {readFile, writeTextFile, decodeJson, log, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import {match} from 'https://cdn.skypack.dev/ts-pattern'
import {join} from "https://deno.land/std@0.114.0/path/mod.ts";
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {resolve, reject, map, chain, mapRej, chainRej, parallel, attemptP, promise} from 'https://cdn.skypack.dev/fluture'

export type AddTaskCallback = (task: Task, plugin: InstalledPlugin, handler: (taskArgs: Record<string, unknown>) => Promise<number>) => unknown

const defaultConfig : Config = {
    language: 'en',
    plugins: [],
    contractsDir: "contracts",
    testsDir: "tests"
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
    const validData = data
    // const [err, validData] = validate(data, ConfigDecoder)
    return err === undefined
        ? resolve(validData)
        : reject({kind: "E_INVALID_CONFIG", msg: "TODO, should this use i18n?"})
}

export const getConfigPath = (projectDir: SanitizedPath, configDir: SanitizedPath, create=false) : Future<TaqError, string> => pipe(
    ConfigDir.create(projectDir, configDir, create),
    map ((configDir: ConfigDir) => join(configDir.value, "config.json"))
)

export const getRawConfig = (projectDir: SanitizedPath, configDir: SanitizedPath,  create=false) : Future<TaqError, object> => pipe(
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
        map ((config: Config) => ({...config, configFile: path, configDir, projectDir})),
        mapRej ((previous:unknown) => ({kind: "E_INVALID_CONFIG", msg: "TODO, should this use i18n?", previous})),
    ))
)

export const getConfig = (projectDir: SanitizedPath, configDir: SanitizedPath, _i18n: i18n, create=false) : Future<TaqError, Config> => pipe(
        getRawConfig(projectDir, configDir, create),
        chain (make)
    )

const loadPlugin = (config:Config, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, addTask: AddTaskCallback) => (plugin: InstalledPlugin) => 
    match(plugin.type)
        .with("npm", () => NPMPlugin.load(config, env, parsedArgs, i18n, plugin, addTask))
        .with("deno", () => DenoPlugin.load(config, env, parsedArgs, i18n, plugin))
        .with("binary", () => BinaryPlugin.load(config, env, parsedArgs, i18n, plugin))
        .exhaustive()

export const loadPlugins = (env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, addTask: AddTaskCallback) => pipe(
    getConfig(parsedArgs.projectDir, parsedArgs.configDir, i18n, false),
    chain ((config:Config) => {
        const jobs = config.plugins.map(loadPlugin(config, env, parsedArgs, i18n, addTask))
        const parallelJob = parallel (parsedArgs.maxConcurrency) (jobs)
        return map (() => parsedArgs) (parallelJob)
    }),
)

export const exec = (cmd: string, inputArgs: Record<string, unknown>) => attemptP(async () => {
    try {
        const command = Object.entries(inputArgs).reduce(
            (retval, [key, val]) => retval.replace(`%${key}%`, val as string),
            cmd
        )

        const process = Deno.run({cmd: ["sh", "-c", command]})
        const status = await process.status()
        return status.code
    }
    catch (previous) {
        throw {
            kind: "E_FORK",
            msg: `Could not fork ${cmd}`,
            previous
        }
    }
})

// export const installPlugin = (env: EnvVars, parsedArgs: Args, i18n: i18n) => pipe(
//     getConfig(env, parsedArgs, i18n),
//     chain ((config:Config) => 
//         config.plugins.filter((plugin:InstalledPlugin) => plugin.name == parsedArgs.plugin)
//             ? reject({kind: "E_ALREADY_INSTALLED", msg: "TODO, should this use i18n?"})
//             : (
//                 match(parsedArgs.kind)
//                     .with('npm', () => NPMPlugin.install(config, parsedArgs, parsedArgs.plugin))
//                     .with('binary', () => BinaryPlugin.install(config, parsedArgs, parsedArgs.plugin))
//                     .with('deno', () => DenoPlugin.install(config, parsedArgs, i18n, parsedArgs.plugin))
//                     .exhaustive()
//             )
//     ),
// )

const NPMPlugin = {
    install(_config: Config, env: EnvVars, parsedArgs: SanitizedInitArgs, _plugin: InstalledPlugin) {

    },

    load(config: Config, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, plugin: InstalledPlugin, addTask: AddTaskCallback) {
        return pipe(
            this.retrievePluginInfo(config, env, i18n, plugin, parsedArgs),
            chain ((info: PluginInfo) => pipe(
                info.tasks.map((task: Task) => {
                    return addTask(task, plugin, async (taskArgs: Record<string, unknown>) => {
                        let statusCode = 0
                        try {
                            const f = task.handler === "proxy"
                                ? this.request("proxy", {taskName: task.task}, config, env, i18n, plugin, parsedArgs)
                                : exec(task.handler.value, taskArgs)
                        
                            statusCode = await promise (f)
                        }
                        catch (err) {
                            return -1
                        }
                        return statusCode
                    })
                }),
                parallel (parsedArgs.maxConcurrency)
            )),
            mapRej ((previous:unknown) => ({kind: "E_INVALID_NPM_PLUGIN", msg: "TODO, should this use i18n?", previous})),
        )
    },

    request(action: Action, requestArgs: Record<string, unknown>, config: Config, env: EnvVars, i18n: i18n, plugin: InstalledPlugin, {projectDir}: SanitizedInitArgs) {
        return attemptP(async () => {
            try {
                const pluginPath = joinPaths(
                    projectDir.value,
                    "node_modules",
                    plugin.name,
                    'index.js'
                )

                const formattedArgs = Object.entries(requestArgs).reduce(
                    (retval: string[], [key, val]) => [...retval, '--'+key, (val as string)],
                    []
                )

                const process = Deno.run({
                    cmd: [
                        "node", pluginPath,
                        '--taqRun', action,
                        '--i18n', JSON.stringify(i18n),
                        '--config', JSON.stringify(config),
                        '--env', JSON.stringify(env),
                        ...formattedArgs,
                    ],
                    stdout: "piped",
                    stderr: "piped",
                })
        
                const output = await process.output()
                const decoder = new TextDecoder()
                const raw = decoder.decode(output)
                const decoded = JSON.parse(raw) // TODO validate schema
                return decoded
            }
            catch (err) {
                return Promise.reject({kind: 'E_INVALID_JSON', msg: 'TODO i18n message', previous: err})
            }
        })
    },

    // TODO: This should be memoized
    retrievePluginInfo(config: Config, env: EnvVars, i18n: i18n, plugin: InstalledPlugin, parsedArgs: SanitizedInitArgs) {
        return this.request("pluginInfo", {}, config, env, i18n, plugin, parsedArgs)
    }
}

export const DenoPlugin = {
    install(_config: Config, env: EnvVars, parsedArgs: SanitizedInitArgs, _plugin: InstalledPlugin) {

    },

    load(config: Config, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, plugin: InstalledPlugin) {
        return resolve(parsedArgs)
    }
}

const BinaryPlugin = {
    install(_config: Config, env: EnvVars, parsedArgs: SanitizedInitArgs, _plugin: InstalledPlugin) {

    },

    load(config: Config, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, plugin: InstalledPlugin) {
        return resolve(parsedArgs)
    }
}