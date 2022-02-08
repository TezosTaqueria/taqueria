import type {UnvalidatedPluginInfo, InstalledPlugin, Config, ConfigArgs, Action, Alias, Verb, Option, PositionalArg} from './taqueria-protocol/taqueria-protocol-types.ts'
import {Task, PluginInfo} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {EnvKey, EnvVars, DenoArgs, RawInitArgs, SanitizedInitArgs, i18n, InstallPluginArgs, UninstallPluginArgs} from './taqueria-types.ts'
import {State} from './taqueria-types.ts'
import type {Arguments} from 'https://deno.land/x/yargs/deno-types.ts'
import yargs from 'https://deno.land/x/yargs/deno.ts'
import {map, chain, attemptP, chainRej, resolve, reject, fork, forkCatch, parallel, debugMode} from 'https://cdn.skypack.dev/fluture';
import {pipe, identity} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {getConfig, getDefaultMaxConcurrency} from './taqueria-config.ts'
import {exec, isTaqError, joinPaths, mkdir, readJsonFile, writeTextFile} from './taqueria-utils/taqueria-utils.ts'
import {SanitizedAbsPath, SanitizedPath, TaqError, Future} from './taqueria-utils/taqueria-utils-types.ts'
import {Table} from 'https://deno.land/x/cliffy@v0.20.1/table/mod.ts'
import { titleCase } from "https://deno.land/x/case/mod.ts";
import {uniq} from 'https://deno.land/x/ramda@v0.27.2/mod.ts'
import * as NPM from './npm.ts'

// Debugging tools
import {log, debug} from './taqueria-utils/taqueria-utils.ts'

export type AddTaskCallback = (task: Task, plugin: InstalledPlugin, handler: (taskArgs: Record<string, unknown>) => Promise<void>) => unknown

type CLIConfig = ReturnType<typeof yargs> & {
    handled?: boolean
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


const getVersion = (inputArgs: DenoArgs, i18n: i18n) => {
    const i = inputArgs.findIndex(str => str === '--setVersion')
    return i > -1
        ? inputArgs[i+1]
        : "not-provided"
}
    
const commonCLI = (env:EnvVars, args:DenoArgs, i18n: i18n) =>
    yargs(args)
    .scriptName('taq')
    .option('setVersion', {
        describe: i18n.__('setVersionDesc'),
        demandOption: true,
        requiresArg: true,
        type: "string"
    })
    .hide('setVersion')
    .version(getVersion(args, i18n))
    .option('disableState', {
        describe: i18n.__('disableStateDesc'),
        default: getFromEnv('TAQ_DISABLE_STATE', false, env),
        boolean: true
    })
    .hide('disableState')
    .option('logPluginCalls', {
        describe: i18n.__('logPluginCallsDesc'),
        default: false,
        boolean: true
    })
    .hide('logPluginCalls')
    .option('setBuild', {
        describe: i18n.__('buildDesc'),
        demandOption: true,
        requiresArg: true,
        type: "string"
    })
    .hide('setBuild')
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
    .option('quickstart', {
        default: ''
    })
    .hide('quickstart')
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
    .option('e', {
        alias: 'env',
        describe: i18n.__('envDesc')
    })
    .wrap(75)
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
            ({projectDir, configDir, maxConcurrency, quickstart}: SanitizedInitArgs) => {
                return initProject(projectDir, configDir, i18n, maxConcurrency, quickstart)
            },
            fork (console.error) (console.log)
        )
    )
    .option('fromVsCode', {
        describe: i18n.__('fromVsCodeDesc'),
        default: false,
        boolean: true
    })
    .hide('fromVsCode')
    .command(
        'testFromVsCode',
        false,
        () => {},
        () => console.log("OK")
    )
    .help(false)


const initCLI = (env: EnvVars, args: DenoArgs, i18n: i18n) => pipe(
    commonCLI(env, args, i18n).help(false)
)

const postInitCLI = (cliConfig: CLIConfig, env: EnvVars, args: DenoArgs, parsedArgs: SanitizedInitArgs, i18n: i18n) => pipe(
    commonCLI(env, args, i18n)
    .command(
        'install <pluginName>',
        i18n.__('installDesc'),
        (yargs: Arguments) => {
            yargs.positional('pluginName', {
                describe: i18n.__('pluginNameDesc'),
                type: 'string',
                required: true
            })
        },
        // TODO: This function assumes that there is only one type of plugin available to install,
        // a plugin distributed and installable via NPM. This should support other means of distribution
        (inputArgs: InstallPluginArgs) => pipe(
            NPM.installPlugin(parsedArgs.configDir, parsedArgs.projectDir, i18n, inputArgs.pluginName),
            fork (displayError(cliConfig)) (console.log)
        )
    )
    .alias('i', 'install')
    .command(
        'uninstall <pluginName>',
        i18n.__('uninstallDesc'),
        (yargs: Arguments) => {
            yargs.positional('pluginName', {
                describe: i18n.__('pluginNameDesc'),
                type: 'string',
                required: true
            })
        },
        (inputArgs: UninstallPluginArgs) => pipe(
            NPM.uninstallPlugin(parsedArgs.configDir, parsedArgs.projectDir, i18n, inputArgs.pluginName),
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (console.log)
        )
    )
    .alias('u', 'uninstall')
    .command(
        'list-known-tasks',
        false, // hide
        () => {},
        (inputArgs: RawInitArgs) => pipe(
            parsedArgs.projectDir.join('.taq', 'state.json').value,
            readJsonFile,
            map ((state: State) => Object.entries(state.tasks).reduce(
                (retval: Record<string, string[] | null>, [taskName, implementation]) => {
                    if ('task' in implementation) {
                        const task = implementation as Task
                        const plugins = 
                            task.options
                                ? task.options.reduce(
                                    (retval: string[], option) => 
                                        option.choices
                                            ? [...retval, ...option.choices]
                                            : retval,
                                    []
                                )
                                : []
                        const obj: Record<string, string[]> = {}
                        obj[taskName] = plugins
                        return {...retval, ...obj}
                    }
                    else {
                        const obj: Record<string, null> = {}
                        obj[taskName] = null
                        return {...retval, ...obj}
                    }
                },
                {}
            )),
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (console.log)
        )
    )
    .demandCommand(),
    extendCLI(env, parsedArgs, i18n)
)

const parseArgs = (cliConfig: CLIConfig) => attemptP(() => cliConfig.parseAsync())

const initProject = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, i18n: i18n, maxConcurrency: number, quickstart: string) => pipe(
    getConfig(projectDir, configDir, i18n, true),
    chain (({artifactsDir, contractsDir, testsDir, projectDir}: ConfigArgs) => {
        const
            artifactsAbspath = joinPaths(projectDir.value, artifactsDir),
            contractsAbspath = joinPaths(projectDir.value, contractsDir),
            testsAbspath = joinPaths(projectDir.value, testsDir)
        
        return parallel (maxConcurrency) ([mkdir(artifactsAbspath), mkdir(contractsAbspath), mkdir(testsAbspath)])        
    }),
    chain ((results: string[]) => quickstart.length > 0
        ? writeTextFile (joinPaths(projectDir.value, "quickstart.md")) (quickstart)
        : resolve (results)
    ),
    map (() => i18n.__("bootstrapMsg"))
)

const getPluginExe = (parsedArgs: SanitizedInitArgs, plugin: InstalledPlugin) => {
    switch(plugin.type) {
        case 'npm':
            const pluginPath = joinPaths(
                parsedArgs.projectDir.value,
                "node_modules",
                plugin.name,
                'index.js'
            )
            return ['node', pluginPath]
        default:
            return ['echo']
    }
}

const retrievePluginInfo = (config: ConfigArgs, env: EnvVars, i18n: i18n, plugin: InstalledPlugin, parsedArgs: SanitizedInitArgs) => pipe(
    sendPluginQuery("pluginInfo", {}, config, env, i18n, plugin, parsedArgs),
    // map (PluginInfo.create) - I hate this about JS
    map ((unvalidatedData: UnvalidatedPluginInfo) => PluginInfo.create(unvalidatedData))
)
    

const retrieveAllPluginInfo = (config: ConfigArgs, env: EnvVars, i18n: i18n, parsedArgs: SanitizedInitArgs) => pipe(
    config.plugins.map((plugin: InstalledPlugin) => retrievePluginInfo(config, env, i18n, plugin, parsedArgs)),
    parallel (parsedArgs.maxConcurrency)
)

const sendPluginQuery = (action: Action, requestArgs: Record<string, unknown>, config: Config, env: EnvVars, i18n: i18n, plugin: InstalledPlugin, parsedArgs: SanitizedInitArgs) =>
    attemptP(async () => {
        try {
            // For each argument passed in via the CLI, send it as an argument to the
            // plugin call as well. Plugins can use this information for additional context
            // about invocation
            const formattedArgs = Object.entries({...parsedArgs, ...requestArgs}).reduce(
                (retval: string[], [key, val]) => {
                    // Some parameters we don't need to send, so we omit those
                    if (['$0', 'quickstart'].includes(key) || key.indexOf('-') >= 0 || val === undefined)
                        return retval
                    // Others need renamed
                    else if (key === '_')
                        return [...retval, '--command', String(val)]
                    // String types need their values
                    else if (val instanceof SanitizedAbsPath) 
                        return [...retval, '--'+key, `'${val.value}'`]
                    // Everything else is good
                    else
                        return [...retval, '--'+key, `'${val}'`]
                },
                []
            )

            const cmd = [
                ...getPluginExe(parsedArgs, plugin),
                '--taqRun', action,
                '--i18n', "'" + JSON.stringify(i18n) + "'",
                '--config', "'"+ JSON.stringify(config) + "'",
                '--envVars', "'" + JSON.stringify(env) + "'",
                ...formattedArgs,
            ]

            if (parsedArgs.logPluginCalls) {
                console.log(`*** START Call to ${plugin.name} ***`)
                const [exe, ...cmdArgs] = cmd
                const lastLine = cmdArgs.pop()
                console.log(`${exe} \\`)
                cmdArgs.map(line => console.log(`${line} \\`))
                console.log(lastLine)
                console.log(`*** END of call to ${plugin.name} ***`)
            }

            const altCmd = ['sh', '-c', cmd.join(' ')]
            const process = Deno.run({cmd: altCmd, stdout: "piped", stderr: "piped"})
            const output = await process.output()
            const error = await process.stderrOutput()
            const decoder = new TextDecoder()
            const stdout = decoder.decode(output)
            const stderr = decoder.decode(error)

            if (!stdout && stderr) {
                return Promise.reject({
                    kind: 'E_INVALID_PLUGIN_RESPONSE',
                    msg: `The ${plugin.name} plugin experienced an error when executing the ${action}.`,
                    context: {
                        stderr,
                        stdout,
                        parsedArgs,
                        requestArgs
                    }
                })
            }

            const decoded = JSON.parse(stdout)

            return decoded
        }
        catch (err) {
            console.log(err)
            return Promise.reject({kind: 'E_INVALID_JSON', msg: 'TODO i18n message', previous: err})
        }
    })


const getCanonicalTask = (pluginName: string, taskName: string, state: State) => state.plugins.reduce(
    (retval: Task|undefined, pluginInfo: PluginInfo) => 
        pluginInfo.name === pluginName
            ? pluginInfo.tasks.find((task: Task) => task.task.value === taskName)
            : retval
    ,
    undefined
)

const loadState = (cliConfig: CLIConfig, config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, state: State): CLIConfig =>
    Object.entries(state.tasks).reduce(
        (retval: CLIConfig, pair: [string, InstalledPlugin|Task]) => {
            const [taskName, implementation] = pair

            // Composite task...
            if ('task' in implementation) {
                const task: Task = implementation

                // For composite tasks, we do one of two things:
                // 1)   If no --plugin argument was specified, we then add a task
                //      which forces the user to specify the plugin they want to use
                //      to fulfill the task implementation
                // 2)   If a --plugin argument was specified, and its the plugin specified
                //      has an implementation for this task name, then we add the task
                //      as if no other implementation was possible

                // Was a plugin provider specified? (path #2 above)
                if (parsedArgs.plugin && task.handler.includes(parsedArgs.plugin)) {
                    const canonicalTask = getCanonicalTask(parsedArgs.plugin, taskName, state)
                    return canonicalTask
                        ? addTask(
                            retval,
                            config,
                            env,
                            parsedArgs,
                            i18n,
                            canonicalTask,
                            config.plugins.find((found: InstalledPlugin) => found.name === parsedArgs.plugin)
                        )
                        : retval
                }

                // No plugin provider was specified (path #1)
                return addTask(retval, config, env, parsedArgs, i18n, task)
            }

            // Canonical task...
            const foundTask = getCanonicalTask(implementation.name, taskName, state)
            return foundTask ? addTask(retval, config, env, parsedArgs, i18n, foundTask, implementation) : retval
        },
        cliConfig
    )

const addTask = (cliConfig: CLIConfig, config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, task: Task, plugin?: InstalledPlugin) => pipe(
    cliConfig.command({
        command: task.command.value,
        aliases: task.aliases.map((alias: Alias) => alias.value),
        description: task.description,
        example: task.example,
        builder: (cliConfig: CLIConfig) => {
            if (task.options) task.options.reduce(
                (cli: CLIConfig, option: Option) => {
                    const optionSettings: Record<string, unknown> = {
                        alias: option.shortFlag ? option.shortFlag.value : undefined,
                        default: option.defaultValue,
                        demandOption: option.required,
                        describe: option.description
                    }

                    if (option.choices && option.choices.length) optionSettings.choices = option.choices
                    if (option.boolean) optionSettings['boolean'] = true
                    return cli.option(option.flag.value, optionSettings)
                },
                cliConfig
            )

            if (task.positionals) task.positionals.reduce(
                (cli: CLIConfig, positional: PositionalArg) => {
                    const positionalSettings = {
                        describe: positional.description,
                        type: positional.type,
                        default: positional.defaultValue,
                    }

                    return cli.positional(positional.placeholder.value, positionalSettings)
                },
                cliConfig
            )
        },
        handler: (inputArgs: Record<string, unknown>) => {
            cliConfig.handled = true
            if (Array.isArray(task.handler)) {
                console.log("This is a composite task!")
                return;
            }

            const args = {
                ...inputArgs,
                ...parsedArgs
            }
            
            const handler = task.handler === 'proxy' && plugin
                ? pipe(
                    sendPluginQuery(
                        "proxy",
                        {task: task.task.value},
                        config,
                        env,
                        i18n,
                        plugin,
                        args
                    ),
                    map ((decoded: {status: 'failed'|'success', stderr: string, stdout: unknown, render?: string}) => {
                        if (decoded.render == 'table') {
                            renderTable(decoded.stdout as Record<string, string>[])
                        }
                        else if (decoded.render !== 'none') {
                            console.log(decoded.status === 'success' ? decoded.stdout: decoded.stderr)
                        }
                    })
                )
                : exec(task.handler, args)

            fork (displayError(cliConfig)) (identity) (handler)
        }
    })
)

const renderTable = (data: Record<string, string>[]) => {
    const keys: string[] = pipe(
        data.reduce(
            (retval: string[], record) =>[...retval, ...Object.keys(record)],
            []
        ),
        uniq
    )

    const rows = data.reduce(
        (retval: (string[])[], record) => {
            const row = keys.reduce(
                (row: string[], key: string) => {
                    const value: string = record[key] ? record[key] : ''
                    return [...row, value]
                },
                []
            )
            return [...retval, row]
        },
        []
    )

    new Table()
        .header(keys.map(val => titleCase(val)))
        .body(rows)
        .border(true)
        .render()
}

const resolvePluginName = (parsedArgs: SanitizedInitArgs, state: State) =>
    !parsedArgs.plugin
        ? parsedArgs
        : {
            ...parsedArgs,
            plugin: state.plugins.reduce(
                (retval, pluginInfo: PluginInfo) =>
                    pluginInfo.alias === retval
                        ? pluginInfo.name
                        : retval,
                parsedArgs.plugin
            )
        }

const extendCLI = (env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => (cliConfig: CLIConfig) => pipe(
    getConfig(parsedArgs.projectDir, parsedArgs.configDir, i18n, false),
    chain ((config: ConfigArgs) => pipe(
        getState(config, env, parsedArgs, i18n),
        map ((state: State) => pipe(
            resolvePluginName(parsedArgs, state),
            (parsedArgs: SanitizedInitArgs) => loadState(cliConfig, config, env, parsedArgs, i18n, state)
        ))
    )),
    map ((cliConfig: CLIConfig) => 
        cliConfig.help()
    ),
    chain (parseArgs),
    map (showInvalidTask(cliConfig))
)

const getStateAbspath = (parsedArgs: SanitizedInitArgs): SanitizedAbsPath => 
    parsedArgs.projectDir.join(parsedArgs.configDir.value, "state.json")

const getState = (config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => pipe(
    parsedArgs,
    getStateAbspath,
    (stateAbspath: SanitizedAbsPath) => pipe(
        !parsedArgs.disableState
            ? resolve(stateAbspath.value)
            : reject("State disabled!"),
        chain (readJsonFile),
        chain ((data: {build: string}) =>
            typeof(data) === 'object' && typeof(data.build) === 'string' && data.build === parsedArgs.setBuild
                ? resolve(data as State)
                : reject("state.json was generated with a different build of taqueria")
        ),
        chainRej (() => computeState(stateAbspath, config, env, parsedArgs, i18n)),
        chain ((state: State) => 
            config.hash.value === state.configHash.value
                ? resolve(state)
                : computeState(stateAbspath, config, env, parsedArgs, i18n)
        )
    )
)

const writeState = (stateAbspath: SanitizedAbsPath, state: State): Future<TaqError, State> => pipe(
    JSON.stringify(state, undefined, 4),
    (data: string) => `// WARNING: This file is autogenerated and should NOT be modified\n${data}`,
    writeTextFile(stateAbspath.value),
    map (() => state)
)

const getComputedState = (config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => pipe(
    retrieveAllPluginInfo(config, env, i18n, parsedArgs),
    map ((pluginInfo: PluginInfo[]) => State.create(parsedArgs.setBuild, config, pluginInfo, i18n))
)

const computeState = (stateAbspath: SanitizedAbsPath, config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => {
    return pipe(
        getComputedState(config, env, parsedArgs, i18n),
        chain ((state:State) => writeState(stateAbspath, state))
    )
}

const executingBuiltInTask = (inputArgs: SanitizedInitArgs | RawInitArgs) =>
    [
        'init',
        'install',
        'uninstall',
        'testFromVsCode',
        'list-known-tasks',
        'listKnownTasks',

    ].reduce(
        (retval, builtinTaskName: string) => retval || inputArgs._.includes(builtinTaskName),
        false
    )
            
export const run = (env: EnvVars, inputArgs: DenoArgs, i18n: i18n) => {
    try {
        // Parse the args required for core built-in tasks
        return pipe(
            initCLI(env, inputArgs, i18n),
            (cliConfig: CLIConfig) => pipe(
                cliConfig,
                parseArgs,
                map (sanitizeArgs),
                chain ((initArgs: SanitizedInitArgs) => {
                    if (initArgs.debug) debugMode(true)
                    if (initArgs.version) {
                        console.log(initArgs.setVersion)
                        return Promise.resolve(initArgs)
                    }
                    return initArgs._.includes('init') || initArgs._.includes('testFromVsCode')
                        ? resolve(initArgs)
                        : postInitCLI(cliConfig, env, inputArgs, initArgs, i18n)
                }),
                forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (identity)
            )
        )
    }
    catch (err) {
        console.error(err)
    }
}

export const showInvalidTask = (cli: CLIConfig) => (parsedArgs: SanitizedInitArgs) => {
    if (executingBuiltInTask(parsedArgs) || cli.handled) {
        return parsedArgs
    }
    const err: TaqError = {kind: 'E_INVALID_TASK', msg: `Taqueria isn't aware of this task. Perhaps you need to install a plugin first?`, context: parsedArgs}
    return displayError (cli) (err)
}

export const displayError = (cli:CLIConfig) => (err: Error|TaqError) => {
    const inputArgs = (cli.parsed as unknown as {argv: RawInitArgs}).argv
    
    if (!inputArgs.fromVsCode) {
        cli.getInternalMethods().getCommandInstance().usage.showHelp()
        console.error("") // empty line
    }

    if (isTaqError(err)) {
        switch (err.kind) {
            case 'E_INVALID_CONFIG':
                console.error(err.msg)
                break;
            default: {
                const encoder = new TextEncoder()
                const json = inputArgs.fromVsCode
                    ? JSON.stringify(err, undefined, 0)
                    : JSON.stringify(err, undefined, 4)
                const output = encoder.encode(json)
                Deno.stderr.writeSync(output)
            }
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
    plugin: parsedArgs.plugin,
    env: parsedArgs.env,
    quickstart: parsedArgs.quickstart,
    disableState: parsedArgs.disableState,
    logPluginCalls: parsedArgs.logPluginCalls,
    fromVsCode: parsedArgs.fromVsCode,
    setBuild: parsedArgs.setBuild,
    setVersion: parsedArgs.setVersion,
    version: parsedArgs.version
})

export default {
    run
}

export const __TEST__ = {
    sanitizeArgs,
    computeState
}