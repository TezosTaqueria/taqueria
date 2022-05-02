import {z} from 'zod'
import * as Verb from "@taqueria/protocol/Verb"
import * as InstalledPlugin from "@taqueria/protocol/InstalledPlugin"
import * as Command from "@taqueria/protocol/Command"
import * as Option from '@taqueria/protocol/Option'
import * as Task from '@taqueria/protocol/Task'
import * as Operation from '@taqueria/protocol/Operation'
import * as PluginInfo from '@taqueria/protocol/PluginInfo'
import * as Config from "@taqueria/protocol/Config"
import type {i18n} from "@taqueria/protocol/i18n"

const taskToPluginMap = z.map(
    Verb.schema,
    z.union([
        InstalledPlugin.schema,
        Task.schema
    ])
)
const operationToPluginMap = z.map(
    Verb.schema,
    z.union([
        InstalledPlugin.schema,
        Operation.schema
    ])
)

const internalSchema = z.object({
    build: z.string(),
    configHash: z.string(),
    tasks: taskToPluginMap,
    operations: operationToPluginMap,
    plugins: z.array(PluginInfo.schema)
})

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
type TaskCounts = Record<string, string[]>
const getTaskCounts = (pluginInfo: PluginInfo.t[]): TaskCounts => {
    return pluginInfo.reduce(
        (retval, pluginInfo) => pluginInfo.tasks.reduce(
            (retval: TaskCounts, task: Task.t) => {
                const taskName = task.task
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

type OperationCounts = Record<string, string[]>
const getOperationCounts = (pluginInfo: PluginInfo.t[]): OperationCounts => pluginInfo.reduce(
    (retval, pluginInfo) => pluginInfo.operations.reduce(
        (retval: OperationCounts, operation: Operation.t) => {
            const operationName = operation.operation
            const providers = retval[operationName]
                ? [...retval[operationName], pluginInfo.name]
                : [pluginInfo.name]
            const mapping: OperationCounts = {}
            mapping[operationName] = providers
            return {...retval, ...mapping}
        },
        retval
    ),
    {} as OperationCounts
)

export const mapTasksToPlugins = (config: Config.t, pluginInfo: PluginInfo.t[], i18n: i18n) => {
    const taskCounts = getTaskCounts(pluginInfo)
    const isCompositeTask = (taskName: string) => taskCounts[taskName].length > 1

    return pluginInfo.reduce(
        (retval: TaskToPluginMap, pluginInfo: PluginInfo.t) => pluginInfo.tasks.reduce(
            (retval: TaskToPluginMap, task: Task.t) => {
                const taskName = task.task

                // If this is a composite task, we'll construct
                // a task which proxies to a canonical task
                if (isCompositeTask(taskName)) {
                    retval.has(taskName)
                    if (!retval.has(taskName)) {
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
                            handler: "proxy"
                        })
                        if (compositeTask) retval.set(taskName, compositeTask)
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
                    retval.set(taskName, installedPlugin)
                    return retval
                }
            },
            retval
        ),
        {} as TaskToPluginMap
    )
}

export const mapOperationsToPlugins = (config: Config.t, pluginInfo: PluginInfo.t[], i18n: i18n) => {
    const operationCounts = getOperationCounts(pluginInfo)
    const isCompositeOp = (operationName: string) => operationCounts[operationName].length > 1

    return pluginInfo.reduce(
        (retval: OpToPluginMap, pluginInfo: PluginInfo.t) => pluginInfo.operations.reduce(
            (retval: OpToPluginMap, op: Operation.t) => {
                const operationName = op.operation

                // If this is a composite task, we'll construct
                // a task which proxies to a canonical task
                if (isCompositeOp(operationName)) {
                    retval.has(operationName)
                    if (!retval.has(operationName)) {
                        const compositeOp = Operation.make({
                            operation: operationName,
                            command: Command.make(operationName),
                            description: i18n.__("providedByMany"),
                            options: [
                                Option.create({
                                    flag: "plugin",
                                    choices: operationCounts[operationName].map((pluginName: string) => pluginName.replace(/taqueria-plugin-/, '')),
                                    description: "Use to specify what plugin you'd like when running this operation.",
                                    required: true
                                })
                            ],
                            handler: () => ""
                        })
                        if (compositeOp) retval.set(operationName, compositeOp)
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
                    retval.set(operationName, installedPlugin)
                    return retval
                }
            },
            retval
        ),
        {} as OpToPluginMap
    )
}

export const getTasks = (pluginInfo: PluginInfo.t[]) => pluginInfo.reduce(
    (retval: Task.t[], pluginInfo) => [...retval, ...pluginInfo.tasks],
    []
)