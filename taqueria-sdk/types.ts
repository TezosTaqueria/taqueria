abstract class StringLike {
    readonly value: string
    protected constructor(value: string){
        this.value = value
    }
}

declare const verbType: unique symbol;
export class Verb extends StringLike {
    [verbType]: void
    static create(value: string): Verb | undefined {
        const result = value.match(/^[A-Za-z-]+/)
        // TODO - should we do more validation whether its a verb?
        return result ? new Verb(result[0]) : undefined
    }
}

declare const nounType: unique symbol;
export class Noun extends StringLike {
    [nounType]: void
    static create(value: string): Noun | undefined {
        const result = value.match(/^[A-Za-z-]+/)
        // TODO - should we do more validation whether its a verb?
        return result ? new Noun(result[0]) : undefined
    }
}

declare const nounWithVerbType: unique symbol
export class NounWithOneOrMoreVerbs extends StringLike {
    [nounWithVerbType]: void
    static create(value: string) : NounWithOneOrMoreVerbs | undefined {
        const result = value.match(/^([A-Za-z-]+) (\[[A-Za-z-]+\] ?){1,}/)
        if (result) {
            const noun = Noun.create(result[0])
            if (noun) {
                // TODO need to extract pattern matches for verbs
                return new NounWithOneOrMoreVerbs(noun.value)
            }
        }
        return undefined
    }
}

type Command = Noun | NounWithOneOrMoreVerbs

declare const singleChar: unique symbol
export class SingleChar extends StringLike {
    [singleChar]: void
    static create(value: string): SingleChar | undefined {
        return value && value.toString().match(/^[A-Za-z]/)
            ? new SingleChar(value[0])
            : undefined
    }
}

type Alias = Noun | SingleChar

export const createAlias = (value: string): Alias | undefined => {
    return Noun.create(value) || SingleChar.create(value)
}

export interface UnvalidatedOption {
    readonly shortFlag: string
    readonly flag: string
    readonly description: string
}

declare const optionType: unique symbol
export class Option {
    [optionType]: void
    readonly shortFlag: SingleChar
    readonly flag: Verb
    readonly description: string
    private constructor(shortFlag: SingleChar, flag: Verb, description: string) {
        this.shortFlag = shortFlag
        this.flag = flag
        this.description = description
    }
    static create(option: UnvalidatedOption): Option | undefined {
        const shortFlag = SingleChar.create(option.shortFlag)
        const flag = Verb.create(option.flag)

        if (shortFlag && flag)
            return new Option(shortFlag, flag, option.description)
        
            return undefined
    }
}

declare const binaryType: unique symbol
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

type UnvalidatedTaskOption = Option | undefined

export interface UnvalidatedTask {
    readonly task: string,
    readonly command: string,
    readonly description: string,
    readonly handler: TaskHandler
    readonly aliases?: string[]
    readonly options?: UnvalidatedTaskOption[]
}


declare const taskType: unique symbol
export class Task {
    [taskType]: void
    readonly name: Verb
    readonly command: Command
    readonly aliases?: Alias[]
    readonly description: string
    readonly options?: Option[]
    readonly handler: TaskHandler
    protected constructor(name: Verb, command: Command, description: string, handler: TaskHandler, options: Option[]=[], aliases: Alias[]=[]) {
        this.name = name
        this.command = command
        this.description = description
        this.handler = handler
        this.options = options
        this.aliases = aliases
    }
    static create(task: UnvalidatedTask): Task | undefined {
        const name = Verb.create(task.task)
        const command = Noun.create(task.command) || NounWithOneOrMoreVerbs.create(task.command)
        const aliases = task.aliases ? task.aliases.map(createAlias).filter(alias => alias!= undefined) : []
        const options = !task.options ? [] : task.options.reduce(
            (retval: Option[], option: Option | undefined) => option ? [...retval, option] : retval,
            []
        )
        return name && command && aliases && options
            ? new Task(name, command, task.description, task.handler, options, aliases as Alias[])
            : undefined
    }
}

export interface Scaffold {
}

export interface Hook {

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

export interface RuntimeDependency {
    readonly name: string,
    readonly path: string,
    readonly version: string,
    readonly kind: "required" | "optional"
}

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

export interface ScaffoldView {

}

export interface HookView {

}

export interface OptionView {
    readonly shortFlag: string
    readonly flag: string
    readonly description: string
}

export interface TaskView {
    readonly name: string
    readonly command: string
    readonly aliases: string[]
    readonly description: string
    readonly options?: OptionView[]
    readonly handler: TaskHandler
}

export interface Schema {
    readonly schema: string,
    readonly version: string,
    readonly tasks: [Task|undefined],
    readonly scaffolds?: [Scaffold|undefined],
    readonly hooks?: [Hook|undefined]
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>,
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>,
    proxy?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>,
}

export interface SchemaView {
    readonly schema: string,
    readonly version: string,
    readonly tasks: TaskView[],
    readonly scaffolds: ScaffoldView[],
    readonly hooks: HookView[],
    checkRuntimeDependencies?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>,
    installRuntimeDependencies?: <T>(i18n: i18n, parsedargs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>,
    proxy?: <T>(i18n: i18n, parsedArgs: Record<string, unknown>) => LikeAPromise<ActionResponse, Failure<T>>
}

export type Args = string[]

export type ParsedArgs = {
    i18n: i18n,
    taqRun: Action
}

export type pluginDefiner = (i18n: i18n) => Schema