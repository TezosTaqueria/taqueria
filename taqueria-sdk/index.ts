import {Task as aTask, Sandbox as theSandbox, PositionalArg as aPositionalArg, Alias, Option as anOption, Network as aNetwork, UnvalidatedOption as OptionView, Task as TaskLike, EconomicalProtocol as anEconomicalProtocol} from '@taqueria/protocol/taqueria-protocol-types'
import {Config, SchemaView, TaskView, i18n, Args, ParsedArgs, ActionResponse, pluginDefiner, LikeAPromise, Failure, SanitizedArgs, PositionalArgView} from "./types"
import {join, resolve, dirname} from 'path'
import {get} from 'stack-trace'
import generateName from 'project-name-generator'
const yargs = require('yargs') // To use esbuild with yargs, we can't use ESM: https://github.com/yargs/yargs/issues/1929

const parseJSON = (input: string) : Promise<Config> => new Promise((resolve, reject) => {
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

const parseConfig = (config:string|Record<string, unknown>) : Promise<Record<string, unknown>> => typeof config === 'string'
    ? parseJSON(config)
    : Promise.resolve(config)


const sanitizeConfig = (config: Record<string, unknown>) : Promise<Config> =>
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
            artifactsDir: join(projectDir, config.artifactsDir)
        })
    })

const parseArgs = (unparsedArgs: Args): LikeAPromise<ParsedArgs, Failure<undefined>> => {
    if (unparsedArgs && Array.isArray(unparsedArgs) && unparsedArgs.length >= 2) {
        const argv = yargs(unparsedArgs.slice(2)).argv as unknown as ParsedArgs
        if (argv.i18n && argv.taqRun && argv.projectDir && argv.configDir) {
            return Promise.resolve(argv)
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

const viewTask = ({task, command, aliases, description, options, positionals, handler}: aTask|TaskLike): TaskView => ({
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
    handler: handler === "proxy" ? "proxy" : handler
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

const sendResponse = (response: unknown) => console.log(JSON.stringify(response))

const sendError = (err: Failure<unknown>) => {
    console.error(JSON.stringify(err))
}

const getResponse = (definer: pluginDefiner, inferPluginName: () => string) => (sanitzedArgs: SanitizedArgs): LikeAPromise<ActionResponse, Failure<[]>> => {
    const {i18n, taqRun} = sanitzedArgs
    const schema = parseSchema(i18n, definer, inferPluginName)
    switch (taqRun) {
        case "pluginInfo":
            return schema ? Promise.resolve({...schema, status: "success"}) : Promise.reject({err: "E_INVALID_SCHEMA", msg: "The schema of the plugin is invalid."})
        case "proxy":
            return schema && schema.proxy
                    ? schema.proxy(sanitzedArgs)
                    : Promise.resolve({status: "notSupported", stdout: "", stderr: i18n.proxyNotSupported, artifacts: []})
        case "checkRuntimeDependencies":
            return schema && schema.checkRuntimeDependencies
                    ? schema.checkRuntimeDependencies(i18n, sanitzedArgs)
                    : Promise.resolve({status: "notSupported", report: []})
        case "installRuntimeDependencies":
            return schema && schema.installRuntimeDependencies
                    ? schema.installRuntimeDependencies(i18n, sanitzedArgs)
                    : Promise.resolve({status: "notSupported", report: []})
        default:
            return Promise.resolve({status: "notSupported", msg: i18n.actionNotSupported})

    }
}

const getNameFromPluginManifest = (packageJsonAbspath: string): string => {
    try {
        return `${require(packageJsonAbspath).name}`
    }
    catch (_) {
        return generateName().dashed
    }
}

const inferPluginName = (stack: ReturnType<typeof get>): () => string => {
    // The definer function can provide a name for the plugin in its schema, or it
    // can omit it and we infer it from the package.json file.
    // To do so, we need to get the directory for the plugin from the call stack
    const pluginManifest = stack.reduce(
        (retval: null|string, callsite) => {
            const callerFile = callsite.getFileName()
            return retval || (callerFile.includes('taqueria-sdk') || callerFile.includes('taqueria-node-sdk'))
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
        .then(sendResponse)
        .catch(sendError)
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