import type {InstalledPlugin, Config, PluginInfo, EnvVars, SanitizedInitArgs, i18n, Task, AddTaskCallback} from './types.ts'
import ConfigDir from './config-dir.ts'
import type {Future, TaqError} from './taqueria-utils/types.ts'
import {readFile, writeTextFile, decodeJson, log, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import type {SanitizedPath} from './taqueria-utils/sanitized-path.ts'
import Path from './taqueria-utils/sanitized-path.ts'
import {match} from 'https://cdn.skypack.dev/ts-pattern'
import {join} from "https://deno.land/std@0.114.0/path/mod.ts";
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {resolve, reject, map, chain, mapRej, chainRej, parallel, attemptP} from 'https://cdn.skypack.dev/fluture'

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
    ConfigDir.make(projectDir, configDir, create),
    map ((configDir:string) => join(configDir, "config.json"))
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
        mapRej ((previous:unknown) => ({kind: "E_INVALID_CONFIG", msg: "TODO, should this use i18n?", previous})),
    ))
)

export const getConfig = (projectDir: SanitizedPath, configDir: SanitizedPath, _i18n: i18n, create=false) : Future<TaqError, Config> => pipe(
        getRawConfig(projectDir, configDir, create),
        chain (decodeJson),
        chain (make)
    )

const loadPlugin = (config:Config, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, addTask: AddTaskCallback) => (plugin: InstalledPlugin) => 
    match(plugin.type)
        .with("npm", () => NPMPlugin.load(config, env, parsedArgs, i18n, plugin, addTask))
        .with("deno", () => DenoPlugin.load(config, env, parsedArgs, i18n, plugin))
        .with("binary", () => BinaryPlugin.load(config, env, parsedArgs, i18n, plugin))
        .exhaustive()

export const loadPlugins = (env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, addTask: (task:Task, provider: string)=> unknown) => pipe(
    getConfig(parsedArgs.projectDir, parsedArgs.configDir, i18n, false),
    chain ((config:Config) => {
        const jobs = config.plugins.map(loadPlugin(config, env, parsedArgs, i18n, addTask))
        const parallelJob = parallel (parsedArgs.maxConcurrency) (jobs)
        return map (() => parsedArgs) (parallelJob)
    }),
)

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
            this.retrievePluginInfo(i18n, plugin, parsedArgs),
            chain ((info: PluginInfo) => pipe(
                info.tasks.map((task: Task) => addTask(task, plugin.name)),
                parallel (parsedArgs.maxConcurrency)
            )),
            mapRej ((previous:unknown) => ({kind: "E_INVALID_NPM_PLUGIN", msg: "TODO, should this use i18n?", previous})),
        )
    },

    // TODO: This should be memoized
    retrievePluginInfo(i18n: i18n, plugin: InstalledPlugin, {projectDir}: SanitizedInitArgs) {
        return attemptP(async () => {
            try {
                const pluginPath = joinPaths(
                    Path.view(projectDir),
                    "node_modules",
                    plugin.name,
                    'index.js'
                )

                const process = Deno.run({
                    cmd: ["node", pluginPath, '--taqRun', 'pluginInfo', '--i18n', JSON.stringify(i18n)],
                    stdout: "piped",
                    stderr: "piped",
                })
        
                const output = await process.output()
        
                const decoder = new TextDecoder()
        
                const raw = decoder.decode(output)

                return JSON.parse(raw) // TODO validate schema
            }
            catch (err) {
                return Promise.reject({kind: 'E_INVALID_JSON', msg: 'TODO i18n message', previous: err})
            }
        })
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