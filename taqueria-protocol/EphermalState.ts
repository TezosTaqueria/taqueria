import {z} from 'zod'
import * as InstalledPlugin from "@taqueria/protocol/InstalledPlugin"
import * as Command from "@taqueria/protocol/Command"
import * as Option from '@taqueria/protocol/Option'
import * as Alias from "@taqueria/protocol/Alias"
import * as Verb from "@taqueria/protocol/Verb"
import * as Task from '@taqueria/protocol/Task'
import * as ParsedOperation from '@taqueria/protocol/ParsedOperation'
import * as ParsedPluginInfo from '@taqueria/protocol/ParsedPluginInfo'
import * as Config from "@taqueria/protocol/Config"
import type {i18n} from "@taqueria/protocol/i18n"

const taskToPluginMap = z.record(
    z.union([
        InstalledPlugin.schema,
        Task.schema
    ], {description: "Task/Plugin Mapping"})
)
const operationToPluginMap = z.record(
    z.union([
        InstalledPlugin.schema,
        ParsedOperation.schema
    ], {description: "Operation/Plugin Mapping"})
)

const internalSchema = z.object({
    build: z.string({description: "cache.build"}),
    configHash: z.string({description: "cache.configHash"}),
    tasks: taskToPluginMap,
    operations: operationToPluginMap,
    plugins: z.array(ParsedPluginInfo.schema, {description: "cache.plugins"})
}).describe("Ephermal State")

export const schema = internalSchema.transform(val => val as EphemeralState)

const ephemeralStateType: unique symbol = Symbol("EphemeralState")

export type Input = z.infer<typeof internalSchema>

export type EphemeralState = Input & {
    readonly [ephemeralStateType]: void
}

export type t = EphemeralState

export type TaskToPluginMap = z.infer<typeof taskToPluginMap>

export type OpToPluginMap = z.infer<typeof operationToPluginMap>

export const make = (data: Input) => schema.parse(data)


/**
 * Private functions
 */
type TaskName = Verb.t
type TaskCounts = Record<TaskName, ParsedPluginInfo.t[]>
const getTaskCounts = (pluginInfo: ParsedPluginInfo.t[]): TaskCounts => {
    return pluginInfo.reduce(
        (retval, pluginInfo) => pluginInfo.tasks === undefined
        ? {}
        : pluginInfo.tasks.reduce(
            (retval: TaskCounts, task: Task.t) => {
                const taskName = task.task
                const providers: ParsedPluginInfo.t[] = retval[taskName]
                    ? [...retval[taskName], pluginInfo]
                    : [pluginInfo]
                const mapping: TaskCounts = {}
                mapping[taskName] = providers.filter(provider => provider !== undefined)
                return {...retval, ...mapping}
            },
            retval
        ),
        ({} as TaskCounts)
    )
}

type OperationCounts = Record<string, ParsedPluginInfo.t[]>
const getOperationCounts = (pluginInfo: ParsedPluginInfo.t[]): OperationCounts => {
    return pluginInfo.reduce(
        (retval, pluginInfo) => pluginInfo.operations === undefined
        ? retval
        : pluginInfo.operations.reduce(
            (retval: OperationCounts, operation: ParsedOperation.t) => {
                const operationName = operation.operation
                const providers = retval[operationName]
                    ? [...retval[operationName], pluginInfo]
                    : [pluginInfo]
                const mapping: OperationCounts = {}
                mapping[operationName] = providers.filter(provider => provider !== undefined)
                return {...retval, ...mapping}
            },
            retval
        ),
        {} as OperationCounts
    )
}

const toChoices = (plugins: ParsedPluginInfo.t[]) => plugins.reduce(
    (retval, pluginInfo) => {
        return [...retval, pluginInfo.name as string, pluginInfo.alias as string]
    },
    [] as string[]
)

export const mapTasksToPlugins = (config: Config.t, pluginInfo: ParsedPluginInfo.t[], i18n: i18n) => {
    debugger
    const taskCounts = getTaskCounts(pluginInfo)
    const isCompositeTask = (taskName: Verb.t) => taskCounts[taskName].length > 1

    return pluginInfo.reduce(
        (retval: TaskToPluginMap, pluginInfo: ParsedPluginInfo.t) => pluginInfo.tasks == undefined
            ? retval
            : pluginInfo.tasks.reduce(
            (retval: TaskToPluginMap, task: Task.t) => {
                const taskName = task.task

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
                                    choices: toChoices(taskCounts[taskName]),
                                    description: "Use to specify what plugin you'd like when running this task.",
                                    required: true
                                })
                            ],
                            handler: "proxy"
                        })
                        if (compositeTask) retval[taskName] = compositeTask
                        return retval
                    }
                    return retval
                }

                // This task is only provided by a single plugin
                else {
                    const installedPlugin = config.plugins?.find(
                        (plugin: InstalledPlugin.t) => [`taqueria-plugin-${pluginInfo.name}`, pluginInfo.name].includes(plugin.name)
                    )
                    if (!installedPlugin) return retval // we should log that a problem occured here
                    retval[taskName] = installedPlugin
                    return retval
                }
            },
            retval
        ),
        {} as TaskToPluginMap
    )
}

export const mapOperationsToPlugins = (config: Config.t, pluginInfo: ParsedPluginInfo.t[], i18n: i18n) => {
    const operationCounts = getOperationCounts(pluginInfo)
    const isCompositeOp = (operationName: string) => operationCounts[operationName].length > 1

    return pluginInfo.reduce(
        (retval: OpToPluginMap, pluginInfo: ParsedPluginInfo.t) => pluginInfo.operations === undefined
        ? retval
        : pluginInfo.operations.reduce(
            (retval: OpToPluginMap, op: ParsedOperation.t) => {
                const operationName = op.operation

                // If this is a composite task, we'll construct
                // a task which proxies to a canonical task
                if (isCompositeOp(operationName)) {
                    if (!retval[operationName]) {
                        const compositeOp = ParsedOperation.make({
                            operation: operationName,
                            command: Command.make(operationName),
                            description: i18n.__("providedByMany"),
                            options: [
                                Option.create({
                                    flag: "plugin",
                                    choices: toChoices(operationCounts[operationName]),
                                    description: "Use to specify what plugin you'd like when running this operation.",
                                    required: true
                                })
                            ]
                        })
                        if (compositeOp) retval[operationName] = compositeOp
                        return retval
                    }
                    return retval
                }

                // This operation is only provided by a single plugin
                else {
                    const installedPlugin = config.plugins?.find(
                        (plugin: InstalledPlugin.t) => [`taqueria-plugin-${pluginInfo.name}`, pluginInfo.name].includes(plugin.name)
                    )
                    if (!installedPlugin) return retval // we should log that a problem occured here
                    retval[operationName] = installedPlugin
                    return retval
                }
            },
            retval
        ),
        {} as OpToPluginMap
    )
}

export const getTasks = (pluginInfo: ParsedPluginInfo.t[]) => pluginInfo.reduce(
    (retval: Task.t[], pluginInfo) => [...retval, ...(pluginInfo.tasks ?? [])],
    []
)