import {Task as aTask, Option as aOption, Binary, SchemaView, TaskView, OptionView, i18n, Args, ParsedArgs, RuntimeDependency, ActionResponse, pluginDefiner, LikeAPromise, Failure, UnvalidatedTask, UnvalidatedOption} from "./types"
import yargs from 'yargs'

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

const viewOption = ({shortFlag, flag, description}: aOption): OptionView => ({
    shortFlag: shortFlag.value,
    flag: flag.value,
    description
})

const viewTask = ({name, command, aliases, description, options, handler}: aTask): TaskView => ({
    name: name.value,
    command: command.value,
    aliases: !aliases ? [] : aliases.reduce(
        (retval: string[], alias) => alias ? [...retval, alias.value] : retval,
        []
    ),
    description,
    options: !options ? [] : options.reduce(
        (retval: OptionView[], option: aOption | undefined) => option ? [...retval, viewOption(option)] : retval,
        []
    ),
    handler
})

const parseSchema = (i18n: i18n, definer: pluginDefiner): SchemaView | undefined => {
    try {
        const {schema, version, tasks, scaffolds, hooks, ...functions} = definer(i18n)

        return {
            schema,
            version,
            tasks: tasks.reduce(
                (retval: TaskView[], task: aTask|undefined) => task ? [...retval, viewTask(task)] : retval,
                []
            ),
            hooks: [],
            scaffolds: [],
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
                    ? schema.proxy(i18n, args as Record<string, unknown>)
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

export const Task = {
    create: (input: UnvalidatedTask) => aTask.create(input)
}

export const Option = {
    create: (input: UnvalidatedOption) => aOption.create(input)
}

export default {
    Plugin,
    Task,
    Option
}