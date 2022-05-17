import type {InstalledPlugin, ConfigArgs, Alias, Option, PositionalArg, PluginAction, PluginJsonResponse, PluginResponse} from './taqueria-protocol/taqueria-protocol-types.ts'
import {Task, PluginInfo} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {EnvKey, EnvVars, DenoArgs, RawInitArgs, SanitizedInitArgs, i18n, InstallPluginArgs, UninstallPluginArgs, CLIConfig} from './taqueria-types.ts'
import {State} from './taqueria-types.ts'
import type {Arguments} from 'https://deno.land/x/yargs@v17.4.0-deno/deno-types.ts'
import yargs from 'https://deno.land/x/yargs@v17.4.0-deno/deno.ts'
import {map, chain, bichain, attemptP, mapRej, resolve, reject, forkCatch, parallel, debugMode} from 'https://cdn.jsdelivr.net/gh/fluture-js/Fluture@14.0.0/dist/module.js';
import {pipe, identity} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {getConfig, getDefaultMaxConcurrency} from './taqueria-config.ts'
import * as utils from './taqueria-utils/taqueria-utils.ts'
import {SanitizedAbsPath, SanitizedPath, SanitizedUrl, TaqError, Future} from './taqueria-utils/taqueria-utils-types.ts'
import {Table} from 'https://deno.land/x/cliffy@v0.20.1/table/mod.ts'
import { titleCase } from "https://deno.land/x/case@2.1.1/mod.ts";
import {uniq} from 'https://deno.land/x/ramda@v0.27.2/mod.ts'
import * as NPM from './npm.ts'
import inject from './plugins.ts'
import { match, __ } from 'https://esm.sh/ts-pattern@3.3.5';

// Get utils
const {
    execText,
    joinPaths,
    mkdir,
    readJsonFile,
    writeTextFile,
    ensurePathDoesNotExist,
    gitClone,
    rm,
    log,
    logInput,
    // debug
} = utils.inject({
    stdout: Deno.stdout,
    stderr: Deno.stderr
})

// Add alias
const exec = execText

type SendPluginActionRequest = (plugin: InstalledPlugin) => (action: PluginAction) => (requestArgs: Record<string, unknown>) => Future<TaqError, PluginResponse>

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
    .option('logPluginRequests', {
        describe: i18n.__('logPluginCallsDesc'),
        default: false,
        boolean: true
    })
    .hide('logPluginRequests')
    .option('setBuild', {
        describe: i18n.__('buildDesc'),
        demandOption: true,
        requiresArg: true,
        type: "string"
    })
    .hide('setBuild')
    .option('build', {
        describe: i18n.__('buildDesc'),
        type: "boolean"
    })
    .option('maxConcurrency', {
        describe: i18n.__('maxConcurrencyDesc'),
        default: getFromEnv('TAQ_MAX_CONCURRENCY', getDefaultMaxConcurrency(), env),
    })
    .hide('maxConcurrency')
    .option('debug', {
        alias: 'd',
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
    .option('configDir', {
        default: getFromEnv("TAQ_CONFIG_DIR", "./.taq", env),
        describe: i18n.__('configDirDesc')
    })
    .option('e', {
        alias: 'env',
        describe: i18n.__('envDesc')
    })
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
            forkCatch (console.error) (console.error) (console.log)
        )
    )
    .command(
        'scaffold [scaffoldUrl] [scaffoldProjectDir]',
        i18n.__('scaffoldDesc'),
        (yargs: Arguments) => {
            yargs
                .positional('scaffoldUrl', {
                    describe: i18n.__('scaffoldUrlDesc'),
                    type: 'string',
                    default: 'https://github.com/ecadlabs/taqueria-scaffold-quickstart.git'
                })
                .positional('scaffoldProjectDir', {
                    type: 'string',
                    describe: i18n.__('scaffoldProjectDirDesc'),
                    default: './taqueria-quickstart'
                })
        },
        (args: RawInitArgs) => pipe(
            sanitizeArgs(args),
            scaffoldProject(i18n),
            forkCatch (console.error) (console.error) (console.log)
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
        () => log("OK")
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
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (console.log)
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
        (inputArgs: UninstallPluginArgs) => pipe(
            listKnownTasks(cliConfig, parsedArgs) (inputArgs),
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (log)
        )
    )
    .demandCommand(),
    extendCLI(env, parsedArgs, i18n)
)

const parseArgs = (cliConfig: CLIConfig) : Future<TaqError, RawInitArgs> => pipe(
    attemptP<Error, RawInitArgs>(() => cliConfig.parseAsync().then((rawInitArgs: unknown) => rawInitArgs as RawInitArgs)),
    mapRej<Error, TaqError>(previous => ({
        kind: 'E_INVALID_ARGS',
        msg: "Invalid arguments were provided and could not be parsed",
        context: cliConfig,
        previous
    }))
)

const listKnownTasks = (cliConfig: CLIConfig, parsedArgs: SanitizedInitArgs) => (_inputArgs: RawInitArgs) => pipe(
    parsedArgs.projectDir.join(parsedArgs.configDir.value, 'state.json').value,
    stateAbsPath => readJsonFile<State>(stateAbsPath), // TypeScript won't allow pointfree here
    map (state => Object.entries(state.tasks).reduce(
        (retval, [taskName, implementation]) => {
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
    map (JSON.stringify)
)

const initProject = (projectDir: SanitizedAbsPath, configDir: SanitizedPath, i18n: i18n, maxConcurrency: number, quickstart: string) => pipe(
    getConfig(projectDir, configDir, i18n, true),
    chain (({artifactsDir, contractsDir, testsDir, projectDir}: ConfigArgs) => {
        const
            artifactsAbspath = joinPaths(projectDir.value, artifactsDir),
            contractsAbspath = joinPaths(projectDir.value, contractsDir),
            testsAbspath = joinPaths(projectDir.value, testsDir)
        
        return parallel (maxConcurrency) ([mkdir(artifactsAbspath), mkdir(contractsAbspath), mkdir(testsAbspath)])        
    }),
    chain (_ => quickstart.length > 0
        ? writeTextFile (joinPaths(projectDir.value, "quickstart.md")) (quickstart)
        : resolve(projectDir.value)
    ),
    map (_ => i18n.__("bootstrapMsg"))
)

const scaffoldProject = (i18n: i18n) => ({scaffoldUrl, scaffoldProjectDir}: SanitizedInitArgs) => pipe(
    // TODO: i18n of messages
    // Clone git into destination folder (Initial version assumes git is installed)
    log(`scaffolding\n into: ${scaffoldProjectDir.value}\n from: ${scaffoldUrl}`),
    _ => ensurePathDoesNotExist(scaffoldProjectDir.value),
    chain(gitClone(scaffoldUrl)),
    // TODO: Run initialization script
    // Run init found in .taq/scaffold.json
    // log(`initializing...`),
    // Load .taq/scaffold.json (if it exists)
    // Run init command
    map(_ => log(`Cleanup...`)),
    chain(_ => rm(scaffoldProjectDir.join(`.taq/scaffold.json`))),
    bichain<TaqError,TaqError,SanitizedAbsPath>
        (err => err.kind === 'E_INVALID_PATH_DOES_NOT_EXIST' ? resolve(scaffoldProjectDir) : reject(err))
        (resolve),
    chain(_ => rm(scaffoldProjectDir.join(`.git`))),
    chain(_ => rm(scaffoldProjectDir.join(`.gitignore`))),
    bichain<TaqError,TaqError,SanitizedAbsPath>
        (err => err.kind === 'E_INVALID_PATH_DOES_NOT_EXIST' ? resolve(scaffoldProjectDir) : reject(err))
        (resolve),
    chain(_ => exec("npm install", {}, false, scaffoldProjectDir)),
    map(_ => i18n.__("scaffoldDoneMsg"))
)

const getCanonicalTask = (pluginName: string, taskName: string, state: State) => state.plugins.reduce(
    (retval: Task|undefined, pluginInfo: PluginInfo) => 
        pluginInfo.name === pluginName
            ? pluginInfo.tasks.find((task: Task) => task.task.value === taskName)
            : retval
    ,
    undefined
)

const loadState = (cliConfig: CLIConfig, config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, state: State, sendPluginActionRequest: SendPluginActionRequest): CLIConfig =>
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
                            sendPluginActionRequest,
                            config.plugins.find((found: InstalledPlugin) => found.name === parsedArgs.plugin)
                        )
                        : retval
                }

                // No plugin provider was specified (path #1)
                return addTask(retval, config, env, parsedArgs, i18n, task, sendPluginActionRequest)
            }

            // Canonical task...
            const foundTask = getCanonicalTask(implementation.name, taskName, state)
            return foundTask ? addTask(retval, config, env, parsedArgs, i18n, foundTask, sendPluginActionRequest, implementation) : retval
        },
        cliConfig
    )

const addTask = (cliConfig: CLIConfig, config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, task: Task, sendPluginActionRequest: SendPluginActionRequest, plugin?: InstalledPlugin) => pipe(
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
                log("This is a composite task!")
                return;
            }
            
            const handler = task.handler === 'proxy' && plugin
                ? pipe(
                    sendPluginActionRequest (plugin) (task) ({...inputArgs, task: task.task.value}),
                    map (res => {
                        const decoded = res as PluginJsonResponse | void
                        if (decoded) return renderPluginJsonRes(decoded)
                    })
                )
                : pipe(
                    exec(task.handler, {...parsedArgs, ...inputArgs}, ['json', 'application/json'].includes(task.encoding)),
                    map((res: string|number) => {
                        if (typeof(res) === 'string') {
                            return renderPluginJsonRes(JSON.parse(res))
                        }
                    })
                )

            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (identity) (handler)
        }
    })
)

const renderPluginJsonRes = (decoded: PluginJsonResponse) => {
    switch (decoded.render) {
        case "table":
            renderTable((decoded.data ? decoded.data as Record<string, string>[] : []))
            break
        case "string":
            log(decoded.data as string)
            break
    }
}
 
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
        chain ((config: ConfigArgs) => {
            const pluginLib = inject({
                parsedArgs,
                i18n,
                env,
                config,
                stderr: Deno.stderr,
                stdout: Deno.stdout
            })

            return pipe(
                pluginLib.getState(),
                map ((state: State) => pipe(
                    resolvePluginName(parsedArgs, state),
                    (parsedArgs: SanitizedInitArgs) => loadState(cliConfig, config, env, parsedArgs, i18n, state, pluginLib.sendPluginActionRequest)
                ))
            )
        }),
        map ((cliConfig: CLIConfig) => 
            cliConfig.help()
        ),
        chain (parseArgs),
        map (showInvalidTask(cliConfig))
)

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
        inputArgs = inputArgs.map(arg => {
            // A hack to get around yargs because it strips leading and trailing double quotes of strings passed by the command
            // Refer to https://github.com/yargs/yargs-parser/issues/201
            const protectedArg = /^"(.|\n)*"$/.test(arg) ? "___" + arg + "___" : arg
            // This same hack is used to prevent yargs from messing with hex values
            return /^0x[0-9a-fA-F]+$/.test(protectedArg) ? "___" + protectedArg + "___" : protectedArg
        })

        // Parse the args required for core built-in tasks
        return pipe(
            initCLI(env, inputArgs, i18n),
            (cliConfig: CLIConfig) => pipe(
                cliConfig,
                parseArgs,
                map (sanitizeArgs),
                chain (initArgs => {
                    if (initArgs.debug) debugMode(true)

                    if (initArgs.version) {
                        log(initArgs.setVersion)
                        return resolve(initArgs)
                    }
                    else if (initArgs.build) {
                        log(initArgs.setBuild)
                        return resolve(initArgs)
                    }
                    return initArgs._.includes('init') || 
                        initArgs._.includes('testFromVsCode') ||
                        initArgs._.includes('scaffold') // ||
                        // initArgs._.includes('install') ||
                        // initArgs._.includes('uninstall')
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

export const showInvalidTask = (cli: CLIConfig) => (parsedArgs: SanitizedInitArgs|RawInitArgs) => {
    if (executingBuiltInTask(parsedArgs) || cli.handled) {
        return parsedArgs
    }
    const err: TaqError = {kind: 'E_INVALID_TASK', msg: `Taqueria isn't aware of this task. Perhaps you need to install a plugin first?`, context: parsedArgs}
    return displayError (cli) (err)
}

export const displayError = (cli:CLIConfig) => (err: Error|TaqError) => {
    const inputArgs = (cli.parsed as unknown as {argv: RawInitArgs}).argv
    
    if (!inputArgs.fromVsCode) {
        cli.getInternalMethods().getUsageInstance().showHelp(inputArgs.help ? "log" : "error")
    }

    if (!inputArgs.help) {
        console.error("") // empty line
        const res = match(err)
            .with({kind: 'E_FORK'}, err                         => [125, err.msg])
            .with({kind: 'E_INVALID_CONFIG'}, err               => [1, err.msg])
            .with({kind: 'E_INVALID_JSON'}, err                 => [12, err])
            .with({kind: 'E_INVALID_PATH_ALREADY_EXISTS'}, err  => [3, `${err.msg}: ${err.context}`])
            .with({kind: 'E_INVALID_PATH_DOES_NOT_EXIST'}, err  => [4, `${err.msg}: ${err.context}`])
            .with({kind: 'E_INVALID_TASK'}, err                 => [5, err.msg])
            .with({kind: 'E_INVALID_PLUGIN_RESPONSE'}, err      => [6, err.msg])
            .with({kind: 'E_MKDIR_FAILED'}, err                 => [7, `${err.msg}: ${err.context}`])
            .with({kind: 'E_NPM_INIT'}, err                     => [8, err.msg])
            .with({kind: 'E_READFILE'}, err                     => [9, err.msg])
            .with({kind: 'GIT_CLONE_FAILED'},err            => [10, `${err.msg}: ${err.context}`])
            .with({kind: 'E_INVALID_ARGS'}, err                 => [11, err.msg])
            .with({message: __.string}, err                     => [128, err.message])
            .exhaustive()
        
        const [exitCode, msg] = res
        console.error(inputArgs.debug ? err : msg)
        Deno.exit(exitCode as number)
    }
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
    logPluginRequests: parsedArgs.logPluginRequests,
    fromVsCode: parsedArgs.fromVsCode,
    setBuild: parsedArgs.setBuild,
    setVersion: parsedArgs.setVersion,
    version: parsedArgs.version ?? false ,
    build: parsedArgs.build ?? false,
    scaffoldUrl: SanitizedUrl.create(parsedArgs.scaffoldUrl ? parsedArgs.scaffoldUrl : ''),
    scaffoldProjectDir: SanitizedAbsPath.create(parsedArgs.scaffoldProjectDir ? parsedArgs.scaffoldProjectDir : ''),
    help: parsedArgs.help ?? false
})

export default {
    run
}