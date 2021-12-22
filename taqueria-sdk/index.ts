import {Task as aTask, Binary, Alias, Option as anOption, Network as aNetwork, UnvalidatedOption as OptionView, Task as TaskLike} from 'taqueria-protocol/taqueria-protocol-types'
import {SchemaView, TaskView, i18n, Args, ParsedArgs, ActionResponse, pluginDefiner, LikeAPromise, Failure} from "./types"
const yargs = require('yargs') // To use esbuild with yargs, we can't use ESM: https://github.com/yargs/yargs/issues/1929

const parseArgs = (unparsedArgs: Args): LikeAPromise<ParsedArgs, Failure<undefined>> => {
    if (unparsedArgs && Array.isArray(unparsedArgs) && unparsedArgs.length >= 2) {
        const argv = yargs(unparsedArgs.slice(2)).argv as unknown as ParsedArgs
        if (argv.i18n && argv.taqRun) {
            return Promise.resolve(argv)
        }
    }
    return Promise.reject({
        errCode: "E_NO_ARGS",
        errMsg: "Invalid usage. If you were testing your plugin, did you remember to specify --taqRun?",
        context: undefined
    })
}

const viewOption = ({shortFlag, flag, description}: anOption): OptionView => ({
    shortFlag: shortFlag.value,
    flag: flag.value,
    description
})

const viewTask = ({task, command, aliases, description, options, handler}: aTask|TaskLike): TaskView => ({
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
    handler: handler === "proxy" ? "proxy" : handler.value
})



const parseSchema = (i18n: i18n, definer: pluginDefiner): SchemaView | undefined => {
    try {
        const {schema, version, tasks, scaffolds, hooks, networks, sandboxes, ...functions} = definer(i18n)

        return {
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

const sendError = (err: Failure<unknown>) => console.error(JSON.stringify(err))

const getResponse = (definer: pluginDefiner) => (parsedArgs: ParsedArgs): LikeAPromise<ActionResponse, Failure<[]>> => {
    const {i18n, taqRun, ...args} = parsedArgs
    const schema = parseSchema(i18n, definer)
    switch (taqRun) {
        case "pluginInfo":
            return schema ? Promise.resolve({...schema, status: "success"}) : Promise.reject({err: "E_INVALID_SCHEMA", msg: "The schema of the plugin is invalid."})
        case "proxy":
            return schema && schema.proxy
                    ? schema.proxy(args as Record<string, unknown>)
                    : Promise.resolve({status: "notSupported", stdout: "", stderr: i18n.proxyNotSupported, artifacts: []})
        case "checkRuntimeDependencies":
            return schema && schema.checkRuntimeDependencies
                    ? schema.checkRuntimeDependencies(i18n, args as Record<string, unknown>)
                    : Promise.resolve({status: "notSupported", report: []})
        case "installRuntimeDependencies":
            return schema && schema.installRuntimeDependencies
                    ? schema.installRuntimeDependencies(i18n, args  as Record<string, unknown>)
                    : Promise.resolve({status: "notSupported", report: []})
        default:
            return Promise.resolve({status: "notSupported", msg: i18n.actionNotSupported})

    }
}

export const binary = Binary.create

export const Plugin = {
    create: (definer: pluginDefiner, unparsedArgs: Args) =>
        parseArgs(unparsedArgs)
        .then(getResponse(definer))
        .then(sendResponse)
        .catch(sendError)
}

export const Task = aTask
export const Option = anOption
export const Network = aNetwork
export default {
    Plugin,
    Task,
    Option
}