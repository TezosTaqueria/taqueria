import type {SanitizedPath, SanitizedAbsPath} from './taqueria-utils/taqueria-utils-types.ts'
import {SHA256} from './taqueria-utils/taqueria-utils-types.ts'
import {Option, Config, ConfigArgs, PluginInfo, InstalledPlugin, Verb, UnvalidatedTask, Task, UnvalidatedNetwork, Network, } from './taqueria-protocol/taqueria-protocol-types.ts'
import {mkdir, joinPaths} from './taqueria-utils/taqueria-utils.ts'
import {resolve, map} from 'https://cdn.skypack.dev/fluture';
import {pipe} from "https://deno.land/x/fun@v1.0.0/fns.ts"

export interface CommandArgs extends SanitizedInitArgs {
    plugin: string
}

export type CommandHandler = (parsedArgs: CommandArgs) => unknown

// TODO: There should be an ActionResponse type that we're extending here.
// This probably exists already in the taqueria-sdk and should be moved to the
// taqueria-protocol package so that the type can be shared between the CLI
// and SDK
export type PluginResponseValidator = <T extends {success: boolean, stdout?: string, stderr?: string}>(json: Record<string, unknown>) => T

export interface Builder {
    [key: string]: Record<string, unknown>,
    plugin: {
        choices: string[],
        default: string
    }
}

export interface CLICommand {
    original: string,
    description: string,
    handler: CommandHandler,
    builder: Builder,
    middlewares: CommandHandler[],
    demanded: string[],
    optional: string[]
}

export type DenoArgs = typeof Deno.args


export interface RawInitArgs {
    _: ['init' | 'install' | 'uninstall', 'refresh-teztnets' | string]
    projectDir: string // path to the project
    configDir: string
    maxConcurrency: number
    debug: boolean
    plugin?: string
    env: 'production' | 'development' | 'testing' | string
    quickstart: string
    disableState: boolean
    logPluginCalls: boolean
    setBuild: string
    setVersion: string
    fromVsCode: boolean
    version: boolean
}

export interface InstallPluginArgs extends RawInitArgs {
    pluginName: string
}

export type UninstallPluginArgs = InstallPluginArgs

export interface SanitizedInitArgs {
    _: ['init' | 'install' | 'uninstall', 'refresh-teztnets' | string]
    projectDir: SanitizedAbsPath
    configDir: SanitizedPath,
    maxConcurrency: number,
    debug: boolean,
    plugin?: string
    env: 'production' | 'development' | 'testing' | string
    quickstart: string
    disableState: boolean
    logPluginCalls: boolean
    setBuild: string
    setVersion: string
    fromVsCode: boolean
    version: boolean
    pluginName?: string
}

export interface i18n {
    __(msg: string, ...params: string[]): string
}

export type EnvKey = "TAQ_CONFIG_DIR" | "TAQ_MAX_CONCURRENCY" | "TAQ_PROJECT_DIR" | "TAQ_ENV" | "TAQ_DISABLE_STATE" | "TAQ_VERSION"

export interface EnvVars {
    get: (key: EnvKey) => undefined | string
}

const configDirType: unique symbol = Symbol()
export class ConfigDir {
    [configDirType]: void
    readonly value: string
    private constructor(value: string) {
        this.value = value
    }
    static create(projectDir: SanitizedAbsPath, configDir: SanitizedPath, createDir=false) {
        const path = joinPaths(projectDir.value, configDir.value)
        return createDir
            ? map ((path:string) => new ConfigDir(path)) (mkdir(path))
            : resolve(new ConfigDir(path))

    }
}
const stateType: unique symbol = Symbol()

export interface UnvalidatedState {
    configHash?: string,
    tasks?: UnvalidatedTask[],

    networks?: UnvalidatedNetwork[]
}

export class PluginTaskMap {
    [key: string]: InstalledPlugin | Task

    protected constructor() {

    }

    static create (plugin: InstalledPlugin, tasks: Verb[]) {
        return tasks.reduce(
            (retval: PluginTaskMap, task: Verb) => {
                retval[task.value] = plugin
                return retval
            },
            new PluginTaskMap()
        )
    }

    static empty () {
        return new PluginTaskMap()
    }
}

type TaskCounts = Record<string, string[]>

export class State {
    [stateType]: void
    build: string
    configHash: SHA256
    tasks: PluginTaskMap
    networks: Network[]
    plugins: PluginInfo[]

    protected constructor(build: string, configHash: SHA256, tasks: PluginTaskMap, networks: Network[], plugins: PluginInfo[]) {
        this.configHash = configHash
        this.tasks = tasks
        this.networks = networks
        this.plugins = plugins
        this.build = build
    }

    protected static mapTasksToPlugins = (config: Config, pluginInfo: PluginInfo[], i18n: i18n) => {
        const taskCounts = this.getTaskCounts(pluginInfo)
        const isCompositeTask = (taskName: string) => taskCounts[taskName].length > 1

        return pluginInfo.reduce(
            (retval: PluginTaskMap, pluginInfo: PluginInfo) => pluginInfo.tasks.reduce(
                (retval: PluginTaskMap, task: Task) => {
                    const taskName = task.task.value

                    // If this is a composite task, we'll construct
                    // a task which proxies to a canonical task
                    if (isCompositeTask(taskName)) {
                        if (!retval[taskName]) {
                            const compositeTask = Task.create({
                                task: taskName,
                                command: taskName,
                                description: i18n.__("providedByMany"),
                                hidden: false,
                                options: [
                                    Option.create({
                                        flag: "plugin",
                                        choices: taskCounts[taskName].map((pluginName: string) => pluginName.replace(/taqueria-plugin-/, '')),
                                        description: "Use to specify what plugin you'd like when running this task.",
                                        required: true
                                    })
                                ],
                                handler: taskCounts[taskName]
                            })
                            if (compositeTask) retval[taskName] = compositeTask
                            return retval
                        }
                        return retval
                    }

                    // This task is only provided by a single plugin
                    else {
                        const installedPlugin = config.plugins.find(
                            (plugin: InstalledPlugin) => [`taqueria-plugin-${pluginInfo.name}`, pluginInfo.name].includes(plugin.name)
                        )
                        if (!installedPlugin) return retval // we should log that a problem occured here
                        retval[taskName] = installedPlugin
                        return retval
                    }
                },
                retval
            ),
            PluginTaskMap.empty()
        )
    }

    protected static getTaskCounts (pluginInfo: PluginInfo[]): TaskCounts {
        return pluginInfo.reduce(
            (retval, pluginInfo) => pluginInfo.tasks.reduce(
                (retval: TaskCounts, task: Task) => {
                    const taskName = task.task.value
                    const providers = retval[taskName]
                        ? [...retval[taskName], pluginInfo.name]
                        : [pluginInfo.name]
                    const mapping: TaskCounts = {}
                    mapping[taskName] = providers
                    return {...retval, ...mapping}
                },
                retval
            ),
            ({} as TaskCounts)
        )
    }

    protected static getTasks = (pluginInfo: PluginInfo[]) => pluginInfo.reduce(
        (retval: Task[], pluginInfo) => [...retval, ...pluginInfo.tasks],
        []
    )

    static create(build: string, config: ConfigArgs, pluginInfo: PluginInfo[], i18n: i18n) {
        const taskMap = this.mapTasksToPlugins(config, pluginInfo, i18n)
        return new State(build, config.hash, taskMap, [], pluginInfo)
    }
}