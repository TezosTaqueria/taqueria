import {SanitizedAbsPath, SHA256} from '../taqueria-utils/taqueria-utils-types.ts'

/**
 * String-like types
 */

export abstract class StringLike {
    readonly value: string
    protected constructor(value: string){
        this.value = value
    }
    static create (value: string) {
        return this.constructor.call(this, value)
    }
    public toString() {
        return this.value
    }
}

const stringMax30Type: unique symbol = Symbol()
export class StringMax30 extends StringLike {
    [stringMax30Type]: void
    static create(value: string, truncate=false) : StringMax30 | undefined {
        return (value.length <= 30)
            ? new StringMax30(value)
            : (truncate
                ? new StringMax30(value.substr(0, 30))
                : undefined
            )
    }
}

const stringNoSpaces: unique symbol = Symbol()
export class StringNoSpaces extends StringLike {
    [stringNoSpaces]: void
    static create(value: string) : StringNoSpaces {
        return new StringNoSpaces(value.replace(/\s+/g, '_'))
    }
}

const identiferType: unique symbol = Symbol()
export class Identifier extends StringLike {
    [identiferType]: void
    static create(value: string): Identifier | undefined {
        const result = StringNoSpaces.create(value).value.match(/^[A-Za-z0-9]+[A-Za-z0-9-_]*$/)
        return result ? new Identifier(result[0]) : undefined
    }
}

const humanReadableIdentifierType: unique symbol = Symbol()
export class HumanReadableIdentifier extends StringLike {
    [humanReadableIdentifierType]: void
    static create(value: string): HumanReadableIdentifier | undefined {
        const input = StringMax30.create(StringNoSpaces.create(value).value)
        if (input) {
            const result = input.value.match(/^[A-Za-z]+[A-Za-z0-9-_]*$/)
            return result ? new HumanReadableIdentifier(result[0]) : undefined
        }
        return undefined
    }
}

const verbType: unique symbol = Symbol()
export class Verb extends StringLike {
    [verbType]: void
    static create(value: string): Verb | undefined {
        const result = value.match(/^[A-Za-z\-\ ]+/)
        // TODO - should we do more validation whether its a verb?
        return result ? new Verb(result[0]) : undefined
    }
}

const commandType: unique symbol = Symbol()
export class Command extends StringLike {
    [commandType]: void
    static create(value: string) : Command | undefined {
        if (value.match(/^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$/)) {
            return new Command(value)
        }
        return undefined   
    }
}

const singleChar: unique symbol = Symbol()
export class SingleChar extends StringLike {
    [singleChar]: void
    static create(value: string): SingleChar | undefined {
        return value && value.toString().match(/^[A-Za-z]/)
            ? new SingleChar(value[0])
            : undefined
    }
}

const urlType: unique symbol = Symbol()
export class Url {
    [urlType]: void
    readonly url: URL
    private constructor(value: URL) {
        this.url = value
    }
    static create(value: string): Url | undefined {
        try {
            const url = new URL(value)
            return new Url(url)
        }
        catch (_) {
            return undefined
        }
    }
} 

export type Alias = Verb | SingleChar

/**
 * Types used in the Taqueria Config
 */

export interface InstalledPlugin {
    readonly name: string
    readonly type: 'npm' | 'binary' | "deno"
}

export interface Config {
    readonly language?: 'en' | 'fr'
    readonly plugins: InstalledPlugin[]
    readonly contractsDir: string
    readonly testsDir: string
    readonly artifactsDir: string
}

export interface ConfigArgs extends Config {
    projectDir: SanitizedAbsPath,
    configFile: SanitizedAbsPath,
    
    hash: SHA256
}

/**
 * Protocol Models
 */

export interface UnvalidatedOption {
    readonly shortFlag?: string
    readonly flag: string
    readonly description: string
    readonly defaultValue?: unknown
    readonly choices?: string[]
    readonly required?: boolean
    readonly boolean?: boolean
}

export interface UnvalidatedHook {
    // TODO
}

export interface UnvalidatedScaffold {
    // TODO
}

export interface UnvalidatedNetwork {
    readonly name: string
    readonly label: string
    readonly rpcUrl: string
    readonly protocol: string
    readonly attributes?: Attributes
}

export interface UnvalidatedSandbox extends UnvalidatedNetwork {
    readonly kind: string
}

const hookType: unique symbol = Symbol()
export class Hook {
    [hookType] : void
    static create(unvalidatedHook: UnvalidatedHook): Hook | undefined {
        return undefined
    }
}

const scaffoldType: unique symbol = Symbol()
export class Scaffold {
    [scaffoldType] : void
    static create(unvalidatedScaffold: UnvalidatedScaffold): Scaffold | undefined {
        return undefined
    }
}

export type TaskHandler = "proxy" | string | string[]


export interface UnvalidatedTask {
    readonly task: string
    readonly command: string
    readonly description: string
    readonly aliases?: string[]
    readonly options?: (UnvalidatedOption|Option|undefined)[],
    readonly handler: "proxy" | string | string[]
    readonly hidden?: boolean
    readonly example?: string
}

export interface UnvalidatedPluginInfo {
    readonly schema: string
    readonly name: string
    readonly version: string
    readonly tasks?: (UnvalidatedTask|undefined)[]
    readonly scaffolds?: (UnvalidatedScaffold|undefined)[]
    readonly hooks?: (UnvalidatedHook|undefined)[]
    readonly networks?: (UnvalidatedNetwork|undefined)[]
    readonly sandboxes?: (UnvalidatedSandbox|undefined)[]
}

export class PluginInfo {
    readonly schema: string
    readonly name: string
    readonly version: string
    readonly tasks: Task[]
    readonly scaffolds: Scaffold[]
    readonly hooks: Hook[]
    readonly networks: Network[]
    readonly sandboxes: Sandbox[]
    constructor(schema: string, name: string, version: string, tasks: Task[], scaffolds: Scaffold[], hooks: Hook[], networks: Network[], sandboxes: Sandbox[]) {
        this.schema = schema
        this.name = name
        this.version = version
        this.tasks = tasks
        this.scaffolds = scaffolds
        this.hooks = hooks
        this.networks = networks
        this.sandboxes = sandboxes
    }

    static convert<A, B>(factory: (item: A) => B|undefined) {
        return (obj: UnvalidatedPluginInfo, prop: keyof UnvalidatedPluginInfo) : B[] => obj[prop] ? (obj[prop] as (A|undefined)[]).reduce(
            (retval: B[], unvalidatedItem: A|undefined) => {
                if (unvalidatedItem) {
                    try {
                        const item = factory(unvalidatedItem)
                        return item ? [...retval, item]: retval
                    }
                    catch (_) {
                        return retval
                    }
                }
                return retval
            },
            []
        ) : []
    }

    static create(obj: UnvalidatedPluginInfo) : PluginInfo | undefined {
        if (obj.version && obj.schema) {
            try {
                const createTask = Task.create.bind(Task)
                const createScaffold = Scaffold.create.bind(Scaffold)
                //TODO: Finish doing the above for each factory/constructor

                const pluginInfo : PluginInfo = {
                    name: obj.name,
                    schema: obj.schema,
                    version: obj.version,
                    tasks: this.convert(createTask) (obj, "tasks"),
                    hooks: this.convert(Hook.create) (obj, "hooks"),
                    scaffolds: this.convert(Scaffold.create) (obj, "scaffolds"),
                    networks: this.convert(Network.create) (obj, "networks"),
                    sandboxes: this.convert(Sandbox.create) (obj, "sandboxes")
                }
                return pluginInfo
            }
            catch (_) {
                return undefined
            }
        }
        return undefined
    }
}

const optionType: unique symbol = Symbol()
export class Option {
    [optionType]: void
    readonly shortFlag?: SingleChar
    readonly flag: Verb
    readonly description: string
    readonly defaultValue?: unknown
    readonly choices?: string[]
    readonly required?: boolean
    readonly boolean?: boolean
    private constructor(shortFlag: SingleChar | undefined, flag: Verb, description: string, defaultValue: unknown, choices: string[], required: boolean, boolean: boolean) {
        this.shortFlag = shortFlag
        this.flag = flag
        this.description = description
        this.defaultValue = defaultValue
        this.required = required
        this.choices = choices
        this.boolean = boolean
    }
    static create(option: UnvalidatedOption): Option | undefined {
        const flag = Verb.create(option.flag)

        if (!option.shortFlag && flag)
            return new Option(undefined, flag, option.description, option.defaultValue, option.choices || [], option.required || false, option.boolean || false)

        if (option.shortFlag && flag) {
            const shortFlag = SingleChar.create(option.shortFlag)
            return shortFlag
                ? new Option(shortFlag, flag, option.description, option.defaultValue, option.choices || [], option.required || false, option.boolean || false)
                : undefined
        }

        return undefined
    }
}

 const taskType: unique symbol = Symbol()
 export class Task {
     [taskType]: void
     readonly task: Verb
     readonly command: Command
     readonly aliases: Alias[]
     readonly description: string
     readonly example?: string
     readonly options?: Option[]
     readonly handler: TaskHandler
     readonly hidden: boolean
     protected constructor(name: Verb, command: Command, description: string, handler: TaskHandler, options: Option[]=[], aliases: Alias[]=[], hidden=false, example?: string) {
         this.task = name
         this.command = command
         this.description = description
         this.options = options
         this.aliases = aliases
         this.handler = handler
         this.hidden = hidden
         this.example = example
     }
     static createAlias(value: string): Alias | undefined {
        return Verb.create(value) || SingleChar.create(value)
    }

     static create (task: UnvalidatedTask): Task | undefined {
        const name = Verb.create(task.task)
        const command = Command.create(task.command)
        const aliases = task.aliases
            ? task.aliases.reduce(
                (retval: Alias[], unvalidatedAlias) => {
                    const alias  = this.createAlias(unvalidatedAlias)
                    return alias ? [...retval, alias] : retval
                },
                []
            )
            : []

        const options = !task.options ? [] : task.options.reduce(
            (retval: Option[], option) => {
                if (option instanceof Option) {
                    return [...retval, option]
                }
                else if (option === undefined) {
                    return retval
                }
                else {
                    const validOption = Option.create(option as UnvalidatedOption)
                    return validOption ? [...retval, validOption] : retval
                }
            },
            []
        )

        return name && command
            ? new Task(name, command, task.description, task.handler, options, aliases, task.hidden ? true : false, task.example)
            : undefined
        }
}

export interface RuntimeDependency {
    readonly name: string,
    readonly path: string,
    readonly version: string,
    readonly kind: "required" | "optional"
}

export interface Attributes {
    [key: string]: string|number|boolean
}

const economicalPrototypeHashType: unique symbol = Symbol()
export class EconomicalProtocolHash extends StringLike {
    [economicalPrototypeHashType]: void
    static create(value: string): EconomicalProtocolHash | undefined {
        return value.length === 51 && value[0] === 'P' && /[A-Za-z0-9]+/.test(value)
            ? new EconomicalProtocolHash(value)
            : undefined
    }
}

const economicProtocalType: unique symbol = Symbol()
export class EconomicalProtocol {
    readonly hash: EconomicalProtocolHash
    readonly label: HumanReadableIdentifier | undefined
    constructor(hash: EconomicalProtocolHash, label: (HumanReadableIdentifier|undefined)=undefined) {
        this.hash = hash
        this.label = label
    }
    static create(hash: string, label: (string|undefined)=undefined) {
        const validHash = EconomicalProtocolHash.create(hash)
        const validLabel = label ? HumanReadableIdentifier.create(label) : undefined
        return validHash
            ? new EconomicalProtocol(validHash, validLabel)
            : undefined
    }
}

const networkType: unique symbol = Symbol()
export class Network {
    [networkType]: void
    readonly name: HumanReadableIdentifier
    readonly label: StringMax30
    readonly rpcUrl: Url
    readonly protocol: EconomicalProtocol
    readonly attributes: Attributes
    public constructor (name: HumanReadableIdentifier, label: StringMax30, rpcUrl: Url, protocol: EconomicalProtocol, attributes: Attributes) {
        this.name = name
        this.label = label
        this.rpcUrl = rpcUrl
        this.protocol = protocol
        this.attributes = attributes
    }

    static create(network : UnvalidatedNetwork) {
        const validName = HumanReadableIdentifier.create(network.name)
        const validLabel = StringMax30.create(network.label)
        const validUrl = Url.create(network.rpcUrl)
        const validProto = EconomicalProtocol.create(network.protocol)

        return validName && validLabel && validUrl && validProto
            ? new Network(validName, validLabel, validUrl, validProto, network.attributes ? network.attributes : {})
            : undefined
    }
}

const sandboxType: unique symbol = Symbol()
export class Sandbox extends Network {
    [sandboxType]: void
    static create(sandbox: UnvalidatedSandbox) {
        const network = super.create(sandbox)
        return network
            ? new Sandbox(network.name, network.label, network.rpcUrl, network.protocol, network.attributes)
            : undefined
    }
}

export interface Environment {
    readonly name: string
    readonly use: Sandbox | Network
}

export type Action = "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxy" | "pluginInfo" | string