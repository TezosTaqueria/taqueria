// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore
import {SanitizedAbsPath, SHA256} from '../taqueria-utils/taqueria-utils-types.ts'
// @ts-ignore
import {urlParse} from './url-parse.ts'

type URL = ReturnType<typeof urlParse>

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
            const url = urlParse(value)
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

    readonly environment: Record<'default'|string, string|EnvironmentConfig>

    readonly sandbox: Record<string, SandboxConfig>

    readonly network: Record<string, NetworkConfig>
}

export interface ConfigArgs extends Config {
    projectDir: SanitizedAbsPath,
    configFile: SanitizedAbsPath,
    
    hash: SHA256
}

/**
 * Protocol Models
 */

export interface UnvalidatedPositionalArg {
    readonly placeholder: string
    readonly type?: OptionType
    readonly defaultValue?: string | number | boolean
    readonly description: string
}


export interface UnvalidatedOption {
    readonly shortFlag?: string
    readonly flag: string
    readonly description: string
    readonly defaultValue?: string | number | boolean
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

// NOTE: This is a workaround as TypeScript doesn't support
// recursive / cyclical types yet. :(
type Accounts_Base = Record<string, AccountDetails>
export type Accounts = Record<string, (keyof Accounts_Base)|AccountDetails>

export interface UnvalidatedSandbox extends UnvalidatedNetwork {
    readonly plugin?: string
    readonly accounts?: Accounts 
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
    readonly positionals?: (UnvalidatedPositionalArg|undefined|PositionalArg)[]
    readonly handler: "proxy" | string | string[]
    readonly hidden?: boolean
    readonly example?: string
    readonly encoding?: string
}

export interface UnvalidatedPluginInfo {
    readonly schema: string
    readonly name: string
    readonly alias?: string
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
    readonly alias?: string
    readonly version: string
    readonly tasks: Task[]
    readonly scaffolds: Scaffold[]
    readonly hooks: Hook[]
    readonly networks: Network[]
    readonly sandboxes: Sandbox[]
    constructor(schema: string, name: string, version: string, tasks: Task[], scaffolds: Scaffold[], hooks: Hook[], networks: Network[], sandboxes: Sandbox[], alias?: string) {
        this.schema = schema
        this.alias = alias
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
                //TODO: Finish doing the above for each factory/constructor

                const temp: Record<string, string> = obj.alias
                    ? {alias: obj.alias}
                    : {}

                const pluginInfo : PluginInfo = {
                    ...temp,
                    name: obj.name,
                    schema: obj.schema,
                    version: obj.version,
                    tasks: this.convert<UnvalidatedTask, Task>(createTask) (obj, "tasks"),
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

export type OptionType = 'string' | 'number' | 'boolean'

const positionalArgType: unique symbol = Symbol()
export class PositionalArg {
    [positionalArgType]: void
    readonly placeholder: HumanReadableIdentifier
    readonly description: string
    readonly defaultValue?: string | number | boolean
    readonly type?: OptionType

    protected constructor(placeholder: HumanReadableIdentifier, description: string, type?: OptionType, defaultValue?: string | number | boolean) {
        this.placeholder = placeholder
        this.defaultValue = defaultValue
        this.description = description
        this.type = type
    }

    static create(arg: UnvalidatedPositionalArg) {
        const placeholder = HumanReadableIdentifier.create(arg.placeholder)
        return placeholder
            ? new PositionalArg(placeholder, arg.description, arg.type, arg.defaultValue)
            : undefined
    }
}

const optionType: unique symbol = Symbol()
export class Option {
    [optionType]: void
    readonly shortFlag?: SingleChar
    readonly flag: Verb
    readonly description: string
    readonly defaultValue?: string | number | boolean
    readonly choices?: string[]
    readonly required?: boolean
    readonly boolean?: boolean
    private constructor(shortFlag: SingleChar | undefined, flag: Verb, description: string, choices: string[], required: boolean, boolean: boolean, defaultValue?: string | number | boolean) {
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
            return new Option(undefined, flag, option.description, option.choices || [], option.required || false, option.boolean ? true : false, option.defaultValue)

        if (option.shortFlag && flag) {
            const shortFlag = SingleChar.create(option.shortFlag)
            return shortFlag
                ? new Option(shortFlag, flag, option.description, option.choices || [], option.required || false, option.boolean ? true : false, option.defaultValue)
                : undefined
        }

        return undefined
    }
}

export type TaskEncoding = "none" | "json" | "application/json"

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
     readonly positionals: PositionalArg[]
     readonly encoding: TaskEncoding
     protected constructor(name: Verb, command: Command, description: string, handler: TaskHandler, options: Option[]=[], positionals: PositionalArg[]=[], aliases: Alias[]=[], hidden=false, encoding="none", example?: string) {
         this.task = name
         this.command = command
         this.description = description
         this.options = options
         this.aliases = aliases
         this.handler = handler
         this.hidden = hidden
         this.example = example
         this.positionals = positionals
         this.encoding = ["none", "json", "application/json"].includes(encoding)
            ? encoding as TaskEncoding
            : "none"
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

        const positionals = !task.positionals ? [] : task.positionals.reduce(
            (retval: PositionalArg[], item) => {
                if (item instanceof PositionalArg) {
                    return [...retval, item]
                }
                else if (item === undefined) {
                    return retval
                }

                const positional = PositionalArg.create(item as UnvalidatedPositionalArg)
                return positional
                    ? [...retval, positional]:
                    retval
            },
            []
        )

        return name && command
            ? new Task(name, command, task.description, task.handler, options, positionals, aliases, task.hidden ? true : false, task.encoding, task.example)
            : undefined
        }
}

export interface AccountKeys {
    alias: string
    encryptedKey: string
    publicKeyHash: string
    secretKey: string
}

export interface AccountDetails {
    readonly initialBalance?: string,
    keys?: AccountKeys
}

export interface SandboxConfig {
    readonly label?: string,
    readonly plugin?: string,
    readonly rpcUrl?: string
    readonly protocol?: string
    readonly attributes?: Attributes
    readonly accounts: Accounts
}

export interface NetworkConfig {
    readonly label?: string,
    readonly rpcUrl?: string 
    readonly protocol?: string
    readonly faucet: {
        readonly pkh: string
        readonly mnemonic: string[]   
        readonly email: string
        readonly password: string
        readonly amount: string
        readonly activation_code: string
    }
}

export interface EnvironmentConfig {
    readonly networks?: string[]
    readonly sandboxes: string[]
    readonly storage: Record<string, unknown>
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
    [economicProtocalType]: void
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
    readonly accounts: Accounts
    [sandboxType]: void
    readonly plugin?: string

    protected constructor(name: HumanReadableIdentifier, label: StringMax30, rpcUrl: Url, protocol: EconomicalProtocol, attributes: Attributes, plugin?: string, accounts?: Accounts) {
        super(name, label, rpcUrl, protocol, attributes)
        this.plugin = plugin
        this.accounts = accounts ? accounts: {}
    }

    static create(sandbox: UnvalidatedSandbox) {
        const network = super.create(sandbox)
        return network
            ? new Sandbox(network.name, network.label, network.rpcUrl, network.protocol, network.attributes, sandbox.plugin, sandbox.accounts)
            : undefined
    }
}

export interface Environment {
    readonly name: string
    readonly networks?: Network[]
    readonly sandboxes?: Sandbox[]
    readonly storage: Record<string, unknown>
}

export type PluginActionName = "checkRuntimeDependencies" | "installRuntimeDependencies" | "proxy" | "pluginInfo" | string

export type PluginProxyAction = Task

export type PluginAction = "checkRuntimeDependencies" | "installRuntimeDependencies" | "pluginInfo" | PluginProxyAction

export interface RuntimeDependencyReport extends RuntimeDependency {
    readonly met: boolean
}

export interface CheckRuntimeDependenciesResponse {
    readonly report: RuntimeDependencyReport[]
}

export interface InstallRuntimeDependenciesResponse {
    readonly report: RuntimeDependencyReport[]
}

export type PluginActionNotSupportedResponse = {
    readonly status: "notSupported",
    readonly msg: string
}

export interface PluginJsonResponse {
    readonly data?: unknown
    readonly render?: 'none' | 'string' | 'table'
}

export type ActionPluginInfo = UnvalidatedPluginInfo

export type PluginResponse = PluginJsonResponse | CheckRuntimeDependenciesResponse | InstallRuntimeDependenciesResponse | ActionPluginInfo | PluginActionNotSupportedResponse | void