import {PluginInfo, Scaffold, Hook, Sandbox, Network, Verb, Command, Option, Alias, RuntimeDependency, UnvalidatedTask as anUnvalidatedTask, Task as aTask, UnvalidatedSandbox, UnvalidatedHook, UnvalidatedPluginInfo, UnvalidatedOption, UnvalidatedScaffold, UnvalidatedNetwork} from 'taqueria-protocol/taqueria-protocol-types'

const binaryType: unique symbol = Symbol()
export class Binary {
    [binaryType]: void
    readonly value: string
    private constructor(path: string) {
        this.value = path
    }
    static create(path: string): Binary {
        return new Binary(path)
    }
}

export type TaskHandler = "proxy" | Binary

export interface UnvalidatedTask extends anUnvalidatedTask {
    handler: TaskHandler
}

const taskType: unique symbol = Symbol()
export class Task extends aTask{
    [taskType]: void
    readonly handler: TaskHandler
    protected constructor(name: Verb, command: Command, description: string, handler: TaskHandler, options: Option[]=[], aliases: Alias[]=[]) {
        super(name, command, description, options, aliases)
        this.handler = handler
    }

    static create(task: UnvalidatedTask): Task | undefined {
        const name = Verb.create(task.task)
        const command = Command.create(task.command)
        const aliases = task.aliases ? task.aliases.map(this.createAlias).filter(alias => alias!= undefined) : []
        const options = !task.options ? [] : task.options.reduce(
            (retval: Option[], option: Option | undefined) => option ? [...retval, option] : retval,
            []
        )
        return name && command && aliases && options
            ? new Task(name, command, task.description, task.handler, options, aliases as Alias[])
            : undefined
    }
}

export interface TaskView {
    readonly task: string
    readonly command: string
    readonly description: string
    readonly aliases: string[]
    readonly options: UnvalidatedOption[]
}

export interface Failure<Params> {
    readonly errorCode: string,
    readonly errorMsg: string,
    readonly context: Params
}

export type LikeAPromise<Success, Failure> = Promise<Success>

export type PositiveInt = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export type i18nMessage = string | {message: string, numOfArguments: PositiveInt}

export interface i18n {
    [key: string]: i18nMessage,
    readonly actionNotSupported: string,
    readonly proxyNotSupported: string
}

export type Action = "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxy" | "pluginInfo"

export interface RuntimeDependencyReport extends RuntimeDependency {
    readonly met: boolean
}

export interface CheckRuntimeDependenciesAction {
    readonly status: ActionResponseCode,
    readonly report: RuntimeDependencyReport[]
}

export interface InstallRuntimeDependenciesAction {
    readonly status: ActionResponseCode,
    readonly report: RuntimeDependencyReport[]
}

export type ActionResponseCode = "success" | "failed" | "notSupported"

export type ActionNotSupported = {
    readonly status: "notSupported",
    readonly msg: string
}

export interface ProxyAction {
    readonly status: ActionResponseCode,
    readonly stdout: string,
    readonly stderr: string,
    readonly artifacts: string[]
}

export interface ActionPluginInfo extends SchemaView {
    readonly status: ActionResponseCode,
}

export type ActionResponse = ProxyAction | CheckRuntimeDependenciesAction | InstallRuntimeDependenciesAction | ActionPluginInfo | ActionNotSupported

export interface Schema {
    // This should match the PluginInfo, but tasks, scaffolds, hooks, networks, and sandboxes are optional
    readonly schema: string
    readonly version: string
    readonly tasks?: (Task | undefined)[]
    readonly scaffolds?: (Scaffold | undefined)[]
    readonly hooks?: (Hook | undefined)[]
    readonly networks?: (Network | undefined)[]
    readonly sandboxes?: (Sandbox | undefined)[]
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>
    proxy?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>
}

export interface SchemaView {
    readonly schema: string
    readonly version: string
    readonly tasks: TaskView[]
    readonly scaffolds: UnvalidatedScaffold[]
    readonly hooks: UnvalidatedHook[]
    readonly networks: UnvalidatedNetwork[]
    readonly sandboxes: UnvalidatedSandbox[],
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>
    proxy?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>
}

export type Args = string[]

export type ParsedArgs = {
    i18n: i18n,
    taqRun: Action
}

export type pluginDefiner = (i18n: i18n) => Schema