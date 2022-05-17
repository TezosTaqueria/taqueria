import {Task as aTask, Sandbox as theSandbox, PositionalArg as aPositionalArg, Alias, Option as anOption, Network as aNetwork, UnvalidatedOption as OptionView, Task as TaskLike, EconomicalProtocol as anEconomicalProtocol, PluginResponse} from '@taqueria/protocol/taqueria-protocol-types'
import {Config, SchemaView, TaskView, i18n, Args, ParsedArgs, pluginDefiner, LikeAPromise, Failure, SanitizedArgs, PositionalArgView, StdIO, AccountDetails} from "./types"
import {join, resolve, dirname, parse} from 'path'
import {readFile, writeFile} from 'fs/promises'
import {get} from 'stack-trace'
import {exec, ExecException} from 'child_process'
// @ts-ignore interop issue. Maybe find a different library later
import generateName from 'project-name-generator'
import {omit} from 'rambda'
const yargs = require('yargs') // To use esbuild with yargs, we can't use ESM: https://github.com/yargs/yargs/issues/1929

export const writeJsonFile = <T>(filename: string) => (data: T): Promise<string> =>
    writeFile(filename, JSON.stringify(data, undefined, 4), {encoding: "utf8"})
    .then(_ => filename)

export const readJsonFile = <T>(filename: string): Promise<T> =>
    readFile(filename, {encoding: "utf-8"})
    .then(JSON.parse)
    .then(result => (result as T))

export const execCmd = (cmd:string) : LikeAPromise<StdIO, ExecException> => new Promise((resolve, reject) => {
    exec(`sh -c "${cmd}"`, (err, stdout, stderr) => {
        if (err) reject(err)
        else resolve({
            stdout,
            stderr
        })
    })
})

export const getArch = () : LikeAPromise<string, Failure<string>> => {
    switch(process.arch) {
        case 'arm64':
            return Promise.resolve('linux/arm64/v8')
        case 'x32':
        case 'x64':
            return Promise.resolve('linux/amd64')
        default:
            return Promise.reject({
                errCode: "E_INVALID_ARCH",
                errMsg: `We do not know how to handle the ${process.arch} architecture`,
                context: process.arch
            })
    }
}

export const parseJSON = (input: string) : LikeAPromise<Config, Failure<string>> => new Promise((resolve, reject) => {
    try {
        const json = JSON.parse(input)
        resolve(json)
    }
    catch (err) {
        return reject({
            errCode: "E_INVALID_JSON",
            errMsg: `Invalid JSON: ${input}`,
            previous: err,
            context: input
        })
    }
})

export const sendRes = (msg:string, newline=true) => {
    if (!msg || msg.length === 0) return
    return newline
        ? console.log(msg)
        : process.stdout.write(msg) as unknown as void
}

export const sendAsyncRes = (msg: string, newline=true) : Promise<void> =>
    Promise.resolve(sendRes(msg, newline))


export const sendErr = (msg: string, newline=true) => {
    if (!msg || msg.length === 0) return
    return newline
        ? console.error(msg)
        : process.stderr.write(msg) as unknown as void
}

export const sendAsyncErr = (msg: string, newline=true) =>
    Promise.reject(sendErr(msg, newline)) // should this be Promise.reject?


export const sendJson = (msg:unknown, newline=true) =>
    sendRes(JSON.stringify(msg), newline)

export const sendJsonErr = (msg:unknown, newline=true) =>
    sendErr(JSON.stringify(msg), newline)

export const sendAsyncJson = (msg:unknown, newline=true) =>
    sendAsyncRes(JSON.stringify(msg), newline)

export const sendAsyncJsonErr = (msg:unknown, newline=true) =>
    sendAsyncErr(JSON.stringify(msg), newline)


export const sendJsonRes = <T>(data: T) => typeof data === 'object'
    ? sendJson({
        data,
        render: 'table'
    })
    : sendJson({
        data,
        render: 'string'
    })

export const sendAsyncJsonRes = <T>(data: T) => Promise.resolve(sendJsonRes(data))

export const noop = () => {}

const parseConfig = (config:string|Record<string, unknown>) : Promise<Record<string, unknown>> => typeof config === 'string'
    ? parseJSON(config)
    : Promise.resolve(config)


const sanitizeConfig = (config: Record<string, unknown>) : LikeAPromise<Config, Failure<Record<string, unknown>>> =>
    typeof config.contractsDir === 'string' && typeof config.testsDir === 'string'
        ? Promise.resolve(config as Config)
        : Promise.reject({
            errCode: "E_INVALID_ARGS",
            errMsg: `Invalid config: ${JSON.stringify(config)}`,
            context: config
        })

const sanitizeArgs = (parsedArgs: ParsedArgs) : Promise<SanitizedArgs> =>
    parseConfig(parsedArgs.config)
    .then(sanitizeConfig)
    .then(config => {
        const projectDir = resolve(parsedArgs.projectDir)
        return ({
            ...parsedArgs,
            projectDir,
            config,
            contractsDir: join(projectDir, config.contractsDir),
            testsDir: join(projectDir, config.testsDir),
            artifactsDir: join(projectDir, config.artifactsDir),
            build: '',
            setBuild: parsedArgs.setBuild ?? '',
            version: '',
            setVersion: parsedArgs.setVersion ?? '',
            maxConcurrency: parsedArgs.maxConcurrency ?? 10,
            debug: parsedArgs.debug ?? false,
            task: parsedArgs.task ? parsedArgs.task.trim() : ''
        })
    })

const parseArgs = (unparsedArgs: Args): LikeAPromise<ParsedArgs, Failure<undefined>> => {
    if (unparsedArgs && Array.isArray(unparsedArgs) && unparsedArgs.length >= 2) {

        // A hack to protect all hex from being messed by yargs
        unparsedArgs = unparsedArgs.map(arg => /^0x[0-9a-fA-F]+$/.test(arg) ? "___" + arg + "___" : arg)

        const argv = yargs(unparsedArgs.slice(2)).argv as unknown as ParsedArgs

        // Unprotect all hex now that yargs is done doing its thing
        const processedArgv = Object.entries(argv).map(([key, val]) =>
            [key,
             typeof val === 'string' && /^___0x[0-9a-fA-F]+___$/.test(val)
             ? val.slice(3, -3)
             : val
            ]
        )

        const groupedArgv = processedArgv.reduce((acc, arg) => {
            const key = arg[0]
            const val = arg[1]
            return {...acc, [key]: val}
        }, {}) as unknown as ParsedArgs

        if (groupedArgv.i18n && groupedArgv.taqRun && groupedArgv.projectDir && groupedArgv.configDir) {
            return Promise.resolve(groupedArgv)
        }
    }
    return Promise.reject({
        errCode: "E_INVALID_ARGS",
        errMsg: "Invalid usage. If you were testing your plugin, did you remember to specify --taqRun?",
        context: undefined
    })
}

const viewOption = ({shortFlag, flag, description, boolean, choices, defaultValue, required}: anOption): OptionView => ({
    shortFlag: shortFlag ? shortFlag.value : undefined,
    flag: flag.value,
    description,
    boolean: boolean,
    choices: choices,
    defaultValue: defaultValue,
    required: required
})

const viewPositionalArg = ({placeholder, description, type, defaultValue}: aPositionalArg) : PositionalArgView => ({
    placeholder: placeholder.value,
    description,
    type,
    defaultValue
})

const viewTask = ({task, command, aliases, description, options, positionals, handler, encoding}: aTask|TaskLike): TaskView => ({
    task: task.value,
    command: command.value,
    aliases: !aliases ? [] : aliases.reduce(
        (retval: string[], alias: Alias|undefined) => alias ? [...retval, alias.value] : retval,
        []
    ),
    description,
    options: !options ? [] : options.reduce(
        (retval: OptionView[], option: anOption | undefined) => option ? [...retval, viewOption(option)] : retval,
        []
    ),
    positionals: !positionals ? [] : positionals.reduce(
        (retval: PositionalArgView[], arg: aPositionalArg | undefined) => arg ? [...retval, viewPositionalArg(arg)] : retval,
        []
    ),
    handler: handler === "proxy" ? "proxy" : handler,
    encoding
})   

const parseSchema = (i18n: i18n, definer: pluginDefiner, inferPluginName: () => string): SchemaView | undefined => {
    try {
        const {name, alias, schema, version, tasks, scaffolds, hooks, networks, sandboxes, ...functions} = definer(i18n)

        return {
            name: name ? name : inferPluginName(),
            alias,
            schema,
            version,
            tasks: tasks
                ? tasks.reduce(
                    (retval: TaskView[], task) => task ? [...retval, viewTask(task)] : retval,
                    []
                )
                : [],
            hooks: [],
            scaffolds: [],
            networks: [],
            sandboxes: [],
            ...functions
        }
    }
    catch (_) {
        return undefined
    }
}

const getResponse = (definer: pluginDefiner, inferPluginName: () => string) => (sanitzedArgs: SanitizedArgs): LikeAPromise<PluginResponse, Failure<[]>> => {
    const {i18n, taqRun} = sanitzedArgs
    const schema = parseSchema(i18n, definer, inferPluginName)
    if (schema) {
        try {
            switch (taqRun) {
                case "pluginInfo":
                    const output = {
                        ...schema,
                        proxy: schema.proxy ? true: false,
                        checkRuntimeDependencies: schema.checkRuntimeDependencies ? true: false,
                        installRuntimeDependencies: schema.installRuntimeDependencies ? true : false
                    }
                    return sendAsyncJson(output);
                case "proxy":
                    if (schema.proxy) {
                        const retval = schema.proxy(sanitzedArgs)
                        if (retval) return retval
                        return Promise.reject({
                            errCode: "E_PROXY",
                            message: "The plugin's proxy method must return a promise.",
                            context: retval
                        })
                    }
                    return Promise.reject({
                        errCode: 'E_NOT_SUPPORTED',
                        message: i18n.proxyNotSupported,
                        context: sanitizeArgs
                    })
                case "checkRuntimeDependencies":
                    return sendAsyncJson(
                        schema.checkRuntimeDependencies
                            ? schema.checkRuntimeDependencies(i18n, sanitzedArgs)
                            : Promise.resolve({report: []})
                    )
                case "installRuntimeDependencies":
                    return sendAsyncJson(
                        schema.installRuntimeDependencies
                            ? schema.installRuntimeDependencies(i18n, sanitzedArgs)
                            : Promise.resolve({report: []})
                    )
                default:
                    return Promise.reject({
                        errCode: 'E_NOT_SUPPORTED',
                        message: i18n.actionNotSupported,
                        context: sanitizeArgs
                    })
            }
        }
        catch (previous) {
            return Promise.reject({
                errCode: "E_UNEXPECTED",
                message: "The plugin encountered a fatal error",
                previous
            })
        }
    }
    return Promise.reject({
        errCode: 'E_INVALID_SCHEMA',
        message: i18n.invalidSchema
    })
}

const getNameFromPluginManifest = (packageJsonAbspath: string): string => {
    try {
        return `${require(packageJsonAbspath).name}`
    }
    catch (_) {
        return generateName().dashed
    }
}

/**
 * Gets the name of the current environment
 **/
export const getCurrentEnvironment = (parsedArgs: SanitizedArgs) => {
    return parsedArgs.env
        ? (parsedArgs.env as string)
        : (
            parsedArgs.config.environment
                ? parsedArgs.config.environment.default
                : 'development'
        )
}

/**
 * Gets the configuration for the current environment, if one is configured
 */
export const getCurrentEnvironmentConfig = (parsedArgs: SanitizedArgs) => {
    const currentEnv = getCurrentEnvironment(parsedArgs)

    return parsedArgs.config.environment && parsedArgs.config.environment[currentEnv]
        ? parsedArgs.config.environment[currentEnv]
        : undefined
}

/**
 * Gets the configuration for the named network
 */
export const getNetworkConfig = (parsedArgs: SanitizedArgs) => (networkName: string) =>
    parsedArgs.config.network[networkName] ?? undefined


/**
 * Gets the configuration for the named sandbox
 */
export const getSandboxConfig = (parsedArgs: SanitizedArgs) => (sandboxName: string) =>
    parsedArgs.config.sandbox[sandboxName] ?? undefined


/**
 * Gets the name of accounts for the given sandbox
 */
export const getSandboxAccountNames = (parsedArgs:SanitizedArgs) => (sandboxName: string) => {
    const sandbox = getSandboxConfig(parsedArgs) (sandboxName)

    return sandbox
        ? Object.keys(sandbox.accounts).filter(accountName => accountName !== 'default')
        : []
}

/**
 * Gets the account config for the named account of the given sandbox
 */
export const getSandboxAccountConfig = (parsedArgs:SanitizedArgs) => (sandboxName: string) => (accountName: string) => {
    const sandbox = getSandboxConfig (parsedArgs) (sandboxName)
    
    return sandbox
        ? sandbox.accounts[accountName]
        : undefined
}

/**
 * Gets the initial storage for the contract
 */
export const getInitialStorage = (parsedArgs: SanitizedArgs) => (contractFilename : string) => {
    const env = getCurrentEnvironmentConfig(parsedArgs)
    
    return env
        ? env.storage && env.storage[contractFilename]
        : undefined
}

/**
 * Gets the default account associated with a sandbox
 */
export const getDefaultAccount = (parsedArgs: SanitizedArgs) => (sandboxName: string) => {
    const defaultAccount = getSandboxConfig(parsedArgs) (sandboxName).accounts["default"] as string
    if (defaultAccount) {
        const details = getSandboxAccountConfig(parsedArgs) (sandboxName) (defaultAccount)
        if (details) {
            return details as AccountDetails
        }
    }
    return undefined
}
    
const inferPluginName = (stack: ReturnType<typeof get>): () => string => {
    // The definer function can provide a name for the plugin in its schema, or it
    // can omit it and we infer it from the package.json file.
    // To do so, we need to get the directory for the plugin from the call stack
    const pluginManifest = stack.reduce(
        (retval: null|string, callsite) => {
            const callerFile = callsite.getFileName()
            return retval || (
                callerFile.includes('taqueria-sdk') || 
                callerFile.includes('taqueria-node-sdk') ||
                callerFile.includes('@taqueria/node-sdk')
            )
                ? retval
                : join(dirname(callerFile), 'package.json')
        },
        null
    )

    return () =>
        !pluginManifest
            ? generateName().dashed
            : getNameFromPluginManifest(pluginManifest)
}

export const Plugin = {
    create: (definer: pluginDefiner, unparsedArgs: Args) => {
        const stack = get()
        return parseArgs(unparsedArgs)
        .then(sanitizeArgs)
        .then(getResponse(definer, inferPluginName(stack)))
        .catch((err: unknown) => {
            if (err) console.error(err)
            process.exit(1)
        })
    }
}

export const Task = aTask
export const Option = anOption
export const Network = aNetwork
export const Sandbox = theSandbox
export const EconomicalProtocol = anEconomicalProtocol
export const PositionalArg = aPositionalArg
export default {
    Plugin,
    Task,
    Option,
    Sandbox,
    EconomicalProtocol,
    PositionalArg,
}