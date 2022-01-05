import type {Task, InstalledPlugin} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {EnvKey, EnvVars, DenoArgs, RawInitArgs, SanitizedInitArgs, i18n, Command, CommandArgs} from './taqueria-types.ts'
import type {Arguments} from 'https://deno.land/x/yargs/deno-types.ts'
import yargs from 'https://deno.land/x/yargs/deno.ts'
import {map, coalesce, resolve, reject, fork, debugMode} from 'https://cdn.skypack.dev/fluture';
import {pipe, identity} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {match, __} from 'https://cdn.skypack.dev/ts-pattern'
import {getConfig, loadPlugins, getDefaultMaxConcurrency} from './taqueria-config.ts'
import {isTaqError} from './taqueria-utils/taqueria-utils.ts'
import {SanitizedAbsPath, SanitizedPath, TaqError} from './taqueria-utils/taqueria-utils-types.ts'

export type AddTaskCallback = (task: Task, plugin: InstalledPlugin, handler: (taskArgs: Record<string, unknown>) => Promise<void>) => unknown

type CLIConfig = ReturnType<typeof yargs> & {
    completion: () => CLIConfig
}


/**
 * Parsing arguments is done in two different stages.
 * 
 * In the first stage, we try to determine if the "init" command is being run,
 * which initializes a project. During this phase, plugins aren't available as
 * there's no configuration for them in the taq configuration file
 * 
 * The second phase assumes a configuration file exists, and will try to load it
 * using any args found in phase in the "init phase" above. This configuration file
 * is then used to determine what plugins to load, which will add additional configuration
 * for parsing CLI arguments.
 */

// TODO: Integrate https://deno.land/x/omelette@v0.4.17

const getFromEnv = <T>(key: EnvKey, defaultValue:T, env: EnvVars) => 
    env.get(key) || defaultValue


const commonCLI = (env:EnvVars, args:DenoArgs, i18n: i18n) => 
    yargs(args)
    .scriptName(i18n.__('appName').toLowerCase())
    .option('maxConcurrency', {
        describe: i18n.__('maxConcurrencyDesc'),
        default: getFromEnv('TAQ_MAX_CONCURRENCY', getDefaultMaxConcurrency(), env),
    })
    .hide('maxConcurrency')
    .option('debug', {
        describe: i18n.__('Enable internal debugging'),
        default: false
    })
    .boolean('debug')
    .hide('debug')
    .option('p', {
        alias: 'projectDir',
        default: './',
        describe: i18n.__('initPathDesc')
    })
    .hide('projectDir')
    .option('d', {
        alias: 'configDir',
        default: getFromEnv("TAQ_CONFIG_DIR", "./.taq", env),
        describe: i18n.__('configDirDesc')
    })
    .wrap(null)
    .epilogue(i18n.__('betaWarning'))
    .command(
        'init [projectDir]',
        i18n.__('initDesc'),
        (yargs: Arguments) => {
            yargs.positional('projectDir', {
                describe: i18n.__('initPathDesc'),
                type: 'string',
                default: getFromEnv("TAQ_PROJECT_DIR", ".", env),
            })
        },
        (args: RawInitArgs) => pipe(
            sanitizeArgs(args), 
            ({projectDir, configDir}) => {
                return initProject(projectDir, configDir, i18n)
            },
            fork (console.error) (console.log)
        )
    )
    .help(false)


const initCLI = (env: EnvVars, args: DenoArgs, i18n: i18n) => pipe(
    commonCLI(env, args, i18n).help(false)
)

const postInitCLI = (env: EnvVars, args: DenoArgs, parsedArgs: SanitizedInitArgs, i18n: i18n) => pipe(
    commonCLI(env, args, i18n)
    .demandCommand()
    .completion()
    .help(),
    extendCLI(env, parsedArgs, i18n)
)

const initProject = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, i18n: i18n) => pipe(
    getConfig(projectDir, configDir, i18n, true),
    map (() => i18n.__("bootstrapMsg"))
)

const getTask = (cliConfig: CLIConfig, task: Task) => {
    const instance = 
        cliConfig
            .getInternalMethods()
            .getCommandInstance()

    const handlers = instance.handlers

    const found =
        Object
            .entries(handlers)
            .reduce(
                (retval: unknown, handler: unknown[]) => {
                    if (retval) return retval
                    if (handler[0] === task.task) return handler
                    const commandName = instance.aliasMap[task.task.value]
                    const existingCmd = instance.handlers[instance.aliasMap[task.task.value]]
                    return commandName && existingCmd ? [commandName, existingCmd] : retval
                },
                false
            )

    return found ? resolve(found) : reject({kind: 'E_INVALID_TASK', msg: 'TODO'})
}

const extendCLI = (env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => (cliConfig: CLIConfig) => pipe(
    loadPlugins(env, parsedArgs, i18n, addTask(cliConfig, i18n)),
    map(() => pipe(
        cliConfig.parse(),
        sanitizeArgs
    ))
)

const addTask = (cliConfig: CLIConfig, i18n: i18n) => (task: Task, plugin: InstalledPlugin, handler: (taskArgs: Record<string, unknown>) => Promise<number>) =>
    coalesce 
        (()                                             => createTask(cliConfig, i18n, task, plugin, handler))
        (([commandName, existing] : [string, Command])  => updateTask(cliConfig, i18n, task, plugin, commandName, existing))
        (getTask(cliConfig, task))

// TODO: Split this function into smaller parts        
const updateTask = (cliConfig: CLIConfig, i18n: i18n, task:Task, plugin: InstalledPlugin, commandName: string, existing: Command) => {
    const existingHandler = existing.handler

    existing.handler = (args: CommandArgs) => {
        if (args.plugin === plugin.name) {
            return console.log(`Handler for ${plugin.name}`)
        }
        return existingHandler(args)
    }

    existing.description = "Need to show better documentation when a task is provided by more than one plugin."

    existing.builder.plugin.choices.push(plugin.name)

    // Update usage information
    const instance = cliConfig.getInternalMethods().getCommandInstance()
    const commands = instance.usage.getCommands().map((commandArr: [string, string, boolean, string[], boolean]) => {
        if (commandArr[0] == commandName) {
            commandArr[1] = i18n.__("Provided by more than one plugin. To learn more try: taqueria compile --help")
            commandArr[3] = task.aliases.reduce(
                (retval, alias) => {
                    if (!retval.includes(alias.value)) {
                        retval.push(alias.value)
                        return retval
                    }
                    return retval
                },
                commandArr[3]
            )
        }
        return commandArr
    })
    instance.usage.getCommands = () => commands
    instance.aliasMap = task.aliases.reduce(
        (retval, alias) => {
            retval[alias.value] = commandName
            return retval
        },
        instance.aliasMap
    )

    return cliConfig
}

const createTask = (cliConfig: CLIConfig, i18n: i18n, task:Task, plugin: InstalledPlugin, handler: (taskArgs: Record<string, unknown>) => Promise<number>) => resolve(
    cliConfig
        .command({
            command: task.command,
            aliases: task.aliases,
            description: task.description,
            builder: {
                plugin: {
                    description: i18n.__('pluginDesc'),
                    default: plugin.name,
                    choices: [plugin.name]
                }
            },
            handler: (yargs: Record<string, unknown>) => {
                handler(yargs)
            }
        })
)

// const runTask = (cliConfig: CLIConfig, parsedArgs: Record<string, unknown>)

            
export const run = (env: EnvVars, inputArgs: DenoArgs, i18n: i18n) => {
    // Parse the args required for core built-in tasks
    const cli = initCLI(env, inputArgs, i18n)
    const initArgs = pipe(
        cli.parse(),
        sanitizeArgs
    )

    // Add internal debugging
    if (initArgs.debug) debugMode(true)

    // No need to load plugins when initializing a project
    if (initArgs._.includes('init')) return;

    // Create the CLI extended with plugins and the help option enabled
    fork (displayError(cli)) (identity) (postInitCLI(env, inputArgs, initArgs, i18n))
}

export const displayError = (cli:CLIConfig) => (err: Error|TaqError) => {
    cli.getInternalMethods().getCommandInstance().usage.showHelp()
    console.error("") // empty line
    if (isTaqError(err)) {
        switch (err.kind) {
            case 'E_INVALID_CONFIG':
                console.error(err.msg)
                break;
            default:
                console.error(err)
        }
    }
    else console.error(err)
}

const sanitizeArgs = (parsedArgs: RawInitArgs) : SanitizedInitArgs => ({
    _: parsedArgs._,
    configDir: SanitizedPath.create(parsedArgs.configDir),
    projectDir: SanitizedAbsPath.create(parsedArgs.projectDir),
    maxConcurrency: parsedArgs.maxConcurrency <= 0 ? getDefaultMaxConcurrency() : parsedArgs.maxConcurrency,
    debug: parsedArgs.debug,
})

export default {
    run
}