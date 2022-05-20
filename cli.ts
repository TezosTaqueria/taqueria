import type {InstalledPlugin, Option, PositionalArg, PluginAction, PluginJsonResponse, PluginResponse} from './taqueria-protocol/taqueria-protocol-types.ts'
import {i18n, SanitizedArgs, SanitizedAbsPath, EphemeralState, Task, ParsedPluginInfo} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {EnvKey, EnvVars, DenoArgs, CLIConfig} from './taqueria-types.ts'
import {LoadedConfig} from './taqueria-types.ts'
import type {Arguments} from 'https://deno.land/x/yargs@v17.4.0-deno/deno-types.ts'
import yargs from 'https://deno.land/x/yargs@v17.4.0-deno/deno.ts'
import {FutureInstance as Future, map, chain, bichain, attemptP, mapRej, resolve, reject, forkCatch, parallel, debugMode} from 'fluture';
import {pipe, identity} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {getConfig, getDefaultMaxConcurrency} from './taqueria-config.ts'
import * as utils from './taqueria-utils/taqueria-utils.ts'
import * as TaqError from "@taqueria/protocol/TaqError"
import {Table} from 'https://deno.land/x/cliffy@v0.20.1/table/mod.ts'
import { titleCase } from "https://deno.land/x/case@2.1.1/mod.ts";
import {uniq} from 'https://deno.land/x/ramda@v0.27.2/mod.ts'
import * as NPM from './npm.ts'
import inject from './plugins.ts'
import { match, __ } from 'https://esm.sh/ts-pattern@3.3.5';
import {addNewProvision, loadProvisions, plan, apply} from "./provisions.ts"

// Get utils
const {
    execText,
    joinPaths,
    mkdir,
    readJsonFile,
    writeTextFile,
    doesPathNotExist,
    gitClone,
    rm,
    log,
    eager,
    isTaqError
    // logInput,
    // debug
} = utils.inject({
    stdout: Deno.stdout,
    stderr: Deno.stderr
})

// Add alias
const exec = execText

type SendPluginActionRequest = (plugin: InstalledPlugin.t) => (action: PluginAction) => (requestArgs: Record<string, unknown>) => Future<TaqError.t, PluginResponse>

type PluginLib = ReturnType<typeof inject>

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


const getVersion = (inputArgs: DenoArgs, _i18n: i18n.t) => {
    const i = inputArgs.findIndex((str: string)=> str === '--setVersion')
    return i > -1
        ? inputArgs[i+1]
        : "not-provided"
}
    
const commonCLI = (env:EnvVars, args:DenoArgs, i18n: i18n.t) =>
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
    .option('quickstart')
    .hide('quickstart')
    .option('p', {
        alias: 'projectDir',
        default: './',
        describe: i18n.__('initPathDesc')
    })
    .hide('projectDir')
    .option('environment', {
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
        (args: Record<string, unknown>) => pipe(
            SanitizedArgs.of(args), 
            chain(({projectDir, maxConcurrency, quickstart}: SanitizedArgs.t) => {
                return initProject(projectDir, quickstart, maxConcurrency, i18n)
            }),
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


const initCLI = (env: EnvVars, args: DenoArgs, i18n: i18n.t) => {
    const cliConfig = commonCLI(env, args, i18n).help(false)
    return cliConfig
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
            (args: Record<string, unknown>) => pipe(
                SanitizedArgs.of(args),
                chain(SanitizedArgs.makeScaffoldArgs),
                chain(scaffoldProject(i18n)),
                forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (console.log)
            )
        )
}

const postInitCLI = (cliConfig: CLIConfig, env: EnvVars, args: DenoArgs, parsedArgs: SanitizedArgs.t, i18n: i18n.t) => pipe(
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
        (inputArgs: Record<string, unknown>) => pipe(
            SanitizedArgs.of(inputArgs),
            chain(SanitizedArgs.makeInstallArgs),
            chain(args => NPM.installPlugin(parsedArgs.projectDir, i18n, args.pluginName)),
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (console.log),
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
        (inputArgs: Record<string, unknown>) => pipe(
            SanitizedArgs.of(inputArgs),
            chain(SanitizedArgs.makeUninstallArgs),
            chain(inputArgs => NPM.uninstallPlugin(parsedArgs.projectDir, i18n, inputArgs.pluginName)),
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (console.log)
        )
    )
    .alias('u', 'uninstall')
    .command(
        'list-known-tasks',
        false, // hide
        () => {},
        (inputArgs: Record<string, unknown>) => pipe(
            SanitizedArgs.create(inputArgs),
            listKnownTasks,
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (log)
        )
    )
    .option('y', {
        describe: i18n.__('yesOptionDesc'),
        alias: 'yes',
        default: false,
        boolean: true
    })
    .demandCommand(),
    extendCLI(env, parsedArgs, i18n)
)

const parseArgs = (cliConfig: CLIConfig) : Future<TaqError.t, Record<string, unknown>> => pipe(
    attemptP<Error, Record<string, unknown>>(() => cliConfig.parseAsync()),
    mapRej<Error, TaqError.t>(previous => ({
        kind: 'E_INVALID_ARGS',
        msg: "Invalid arguments were provided and could not be parsed",
        context: cliConfig,
        previous
    }))
)

const listKnownTasks = (parsedArgs: SanitizedArgs.t) => pipe(
    joinPaths(parsedArgs.projectDir, 'state.json'),
    stateAbsPath => readJsonFile<EphemeralState.t>(stateAbsPath), // TypeScript won't allow pointfree here
    map (state => Object.entries(state.tasks).reduce(
        (retval, [taskName, implementation]) => {
            if ('task' in implementation) {
                const task = implementation as Task.t
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

const mkInitialDirectories = (projectDir: SanitizedAbsPath.t, maxConcurrency: number, i18n: i18n.t) => pipe(
    getConfig(projectDir, i18n, true),
    chain (({artifactsDir, contractsDir, testsDir, projectDir, operationsDir}: LoadedConfig.t) => {
        const jobs = [operationsDir, artifactsDir, contractsDir, testsDir].reduce(
            (retval, abspath) => abspath ? [...retval, mkdir(joinPaths(projectDir, abspath))] : retval,
            [] as Future<TaqError.TaqError, string>[]
        )
        return parallel (maxConcurrency) (jobs)
    })
)

const initProject = (projectDir: SanitizedAbsPath.t, quickstart: string|undefined, maxConcurrency: number, i18n: i18n.t) => pipe(
    mkInitialDirectories(projectDir, maxConcurrency, i18n),
    chain (_ => quickstart && quickstart.length > 0
        ? writeTextFile (joinPaths(projectDir, "quickstart.md")) (quickstart)
        : resolve(projectDir)
    ),
    map (_ => i18n.__("bootstrapMsg"))
)

const scaffoldProject = (i18n: i18n.t) => ({scaffoldUrl, scaffoldProjectDir, maxConcurrency}: SanitizedArgs.ScaffoldArgs) => attemptP<TaqError.t, string>(async () => {
    const abspath = await eager (SanitizedAbsPath.make(scaffoldProjectDir))
    const destDir = await eager (doesPathNotExist(abspath))
    
    log(`scaffolding\n into: ${destDir}\n from: ${scaffoldUrl}`)    
    await eager (gitClone (scaffoldUrl) (destDir))

    // TODO: Remove after 620-operations is merged in both the
    // taqueria repo as well as the taqueria-scaffold-quickstart repo
    //
    // See issue: https://github.com/ecadlabs/taqueria/issues/736
    await eager (exec("git checkout 620-operations", {}, true, destDir))

    log("Cleanup...")
    const scaffoldConfig = await eager (SanitizedAbsPath.make(`${destDir}/.taq/scaffold.json`))
    const gitDir = await eager (SanitizedAbsPath.make(`${destDir}/.git`))
    // const _gitIgnore = await eager (SanitizedAbsPath.make(`${destDir}/.gitignore`))
    // await eager (rm(gitIgnore))
    
    // Remove the scaffold.json file, if not exists
    // If it doesn't exist, don't throw...
    try {
        await eager (rm(scaffoldConfig))
    }
    catch (err) {
        if (!isTaqError(err) || err.kind !== "E_INVALID_PATH_DOES_NOT_EXIST") {
            throw err
        }
    }
    
    await eager (rm(gitDir))

    log("Installing plugins...")
    await eager (exec("npm install", {}, false, destDir))

    return i18n.__("scaffoldDoneMsg")
})

const getCanonicalTask = (pluginName: string, taskName: string, state: EphemeralState.t) => state.plugins.reduce(
    (retval: Task.t|undefined, pluginInfo: ParsedPluginInfo.t) => 
        pluginInfo.name === pluginName || pluginInfo.alias === pluginName
            ? pluginInfo.tasks?.find((task: Task.t) => task.task === taskName)
            : retval
    ,
    undefined
)

const addOperations = (cliConfig: CLIConfig, config: LoadedConfig.t, _env: EnvVars, _parsedArgs: SanitizedArgs.t, _i18n: i18n.t, state: EphemeralState.t, _pluginLib: PluginLib) => 
    cliConfig.command(
        'provision <operation> [..operation args]',
        'Provision an operation to populate project state',
        (yargs: CLIConfig) => {
            yargs.positional('operation', {
                describe: 'The name of the operation to provision', 
                required: true,
                type: 'string',
                choices: Object.keys(state.operations)
            })
            yargs.option("name", {
                describe: "Unique name of the provisioner",
                type: 'string'
            })
        },
        (argv: Arguments) => pipe(
            SanitizedArgs.of(argv),
            chain(SanitizedArgs.makeProvisionArgs),
            chain(inputArgs => addNewProvision(inputArgs, config, state)),
            map(() => "Added provision to .taq/provisions.json"),
            forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (log)
        )
    )
    // .command(
    //     'plan',
    //     'Display the execution plan for applying all provisioned operations',
    //     () => {},
    //     (argv: Arguments) => pipe(
    //         SanitizedArgs.of(argv),
    //         map (inputArgs => joinPaths(inputArgs.projectDir, ".taq", "provisions.json")),
    //         chain (SanitizedAbsPath.make),
    //         chain (loadProvisions),
    //         map (plan),
    //         forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (log)
    //     )
    // )
    // .command(
    //     'apply',
    //     'Applies the pending list of provisioned operations for the project',
    //     () => {},
    //     (argv: Arguments) => pipe(
    //         SanitizedArgs.of(argv),
    //         map (inputArgs => joinPaths(inputArgs.projectDir, ".taq", "provisions.json")),
    //         chain (SanitizedAbsPath.make),
    //         chain (sanitizedArgs => pipe(
    //             sanitizedArgs,
    //             chain (loadProvisions),
    //             chain (apply(sanitizedArgs)),
    //         )),
    //         forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (log)   
    //     )
    // )

const addTemplates = (cliConfig: CLIConfig, _config: LoadedConfig.t, _env: EnvVars, _parsedArgs: SanitizedArgs.t, _i18n: i18n.t, _state: EphemeralState.t, _pluginLib: PluginLib) => 
    cliConfig.command(
        'create <template>',
        'Create an entity from a pre-existing template',
        () => {
            console.log("Configuring create template!")
        },
        () => {
            console.log("Create template!")
            Deno.exit(10)
        }
    )
    .alias('create-tmpl', 'create')
    .alias('create-template', 'create')    
    

const getPluginOption = (task: Task.t) => {
    return task.options?.find(option => option.flag === 'plugin')
}


const addTasks = (cliConfig: CLIConfig, config: LoadedConfig.t, env: EnvVars, parsedArgs: SanitizedArgs.t, i18n: i18n.t, state: EphemeralState.t, pluginLib: PluginLib) => 
    Object.entries(state.tasks).reduce(
        (retval: CLIConfig, pair: [string, InstalledPlugin.t|Task.t]) => {
            const [taskName, implementation] = pair

            // Composite task...
            if ('task' in implementation) {
                const task: Task.t = implementation

                // For composite tasks, we do one of two things:
                // 1)   If no --plugin argument was specified, we then add a task
                //      which forces the user to specify the plugin they want to use
                //      to fulfill the task implementation
                // 2)   If a --plugin argument was specified, and its the plugin specified
                //      has an implementation for this task name, then we add the task
                //      as if no other implementation was possible

                // Was a plugin provider specified? (path #2 above)
                if (parsedArgs.plugin && getPluginOption(task)?.choices?.includes(parsedArgs.plugin)) {
                    const canonicalTask = getCanonicalTask(parsedArgs.plugin, taskName, state)
                    return canonicalTask
                        ? addTask(
                            retval,
                            config,
                            env,
                            parsedArgs,
                            i18n,
                            canonicalTask,
                            pluginLib.sendPluginActionRequest,
                            config.plugins?.find((found: InstalledPlugin.t) => found.name === parsedArgs.plugin)
                        )
                        : retval
                }

                // No plugin provider was specified (path #1)
                return addTask(retval, config, env, parsedArgs, i18n, task, pluginLib.sendPluginActionRequest)
            }

            // Canonical task...
            const foundTask = getCanonicalTask(implementation.name, taskName, state)
            return foundTask ? addTask(retval, config, env, parsedArgs, i18n, foundTask, pluginLib.sendPluginActionRequest, implementation) : retval
        },
        cliConfig
    )

const addTask = (cliConfig: CLIConfig, _config: LoadedConfig.t, _env: EnvVars, parsedArgs: SanitizedArgs.t, _i18n: i18n.t, task: Task.t, sendPluginActionRequest: SendPluginActionRequest, plugin?: InstalledPlugin.t) => pipe(
    cliConfig.command({
        command: task.command,
        aliases: task.aliases,
        description: task.description,
        example: task.example,
        builder: (cliConfig: CLIConfig) => {
            if (task.options) task.options.reduce(
                (cli: CLIConfig, option: Option.t) => {
                    const optionSettings: Record<string, unknown> = {
                        alias: option.shortFlag ? option.shortFlag : undefined,
                        default: option.defaultValue,
                        demandOption: option.required,
                        describe: option.description
                    }

                    if (option.choices && option.choices.length) optionSettings.choices = option.choices
                    if (option.boolean) optionSettings['boolean'] = true
                    return cli.option(option.flag, optionSettings)
                },
                cliConfig
            )

            if (task.positionals) task.positionals.reduce(
                (cli: CLIConfig, positional: PositionalArg.t) => {
                    const positionalSettings = {
                        describe: positional.description,
                        type: positional.type,
                        default: positional.defaultValue,
                    }

                    return cli.positional(positional.placeholder, positionalSettings)
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
                    sendPluginActionRequest (plugin) (task) ({...inputArgs, task: task.task}),
                    map (res => {
                        const decoded = res as PluginJsonResponse | void
                        if (decoded) return renderPluginJsonRes(decoded)
                    })
                )
                : pipe(
                    exec(task.handler, {...parsedArgs, ...inputArgs}, ['json', 'application/json'].includes(task.encoding ?? 'none')),
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

const loadState = (cliConfig: CLIConfig, config: LoadedConfig.t, env: EnvVars, parsedArgs: SanitizedArgs.t, i18n: i18n.t, state: EphemeralState.t, pluginLib: PluginLib): CLIConfig =>
[addTasks, addOperations, addTemplates].reduce(
    (cliConfig: CLIConfig, fn) => fn(cliConfig, config, env, parsedArgs, i18n, state, pluginLib),
    cliConfig
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

const resolvePluginName = (parsedArgs: SanitizedArgs.t, state: EphemeralState.t) =>
    !parsedArgs.plugin
        ? parsedArgs
        : {
            ...parsedArgs,
            plugin: state.plugins.reduce(
                (retval, pluginInfo: ParsedPluginInfo.t) =>
                    pluginInfo.alias === retval
                        ? pluginInfo.name
                        : retval,
                parsedArgs.plugin
            )
        }

        

const extendCLI = (env: EnvVars, parsedArgs: SanitizedArgs.t, i18n: i18n.t) => (cliConfig: CLIConfig) => pipe(
        getConfig(parsedArgs.projectDir, i18n, false),
        chain ((config: LoadedConfig.t) => {
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
                map ((state: EphemeralState.t) => pipe(
                    resolvePluginName(parsedArgs, state),
                    (parsedArgs: SanitizedArgs.t) => loadState(cliConfig, config, env, parsedArgs, i18n, state, pluginLib)
                ))
            )
        }),
        map ((cliConfig: CLIConfig) => 
            cliConfig.help()
        ),
        chain (parseArgs),
        map (inputArgs => SanitizedArgs.create(inputArgs)),
        map (showInvalidTask(cliConfig))
)

const executingBuiltInTask = (inputArgs: SanitizedArgs.t) =>
    [
        'init',
        'install',
        'uninstall',
        'testFromVsCode',
        'list-known-tasks',
        'listKnownTasks',
        'provision',
        'plan'

    ].reduce(
        (retval, builtinTaskName: string) => retval || inputArgs._.includes(builtinTaskName),
        false
    )
            


const preprocessArgs = (inputArgs: DenoArgs) : DenoArgs => {
    return inputArgs.map(arg => {
        // A hack to get around yargs because it strips leading and trailing double quotes of strings passed by the command
        // Refer to https://github.com/yargs/yargs-parser/issues/201
        const protectedArg = /^"(.|\n)*"$/.test(arg) ? "___" + arg + "___" : arg
        // This same hack is used to prevent yargs from messing with hex values
        return /^0x[0-9a-fA-F]+$/.test(protectedArg) ? "___" + protectedArg + "___" : protectedArg
    })
}

export const run = (env: EnvVars, inputArgs: DenoArgs, i18n: i18n.t) => {
    try {
        const processedInputArgs = preprocessArgs(inputArgs)

        // Parse the args required for core built-in tasks
        return pipe(
            initCLI(env, processedInputArgs, i18n),
            (cliConfig: CLIConfig) => pipe(
                cliConfig,
                parseArgs,
                chain(SanitizedArgs.of),
                chain (initArgs => {
                    if (initArgs.debug) debugMode(true)

                    if (initArgs.version) {
                        log(initArgs.setVersion)
                        return resolve(initArgs) as Future<TaqError.t, SanitizedArgs.t>
                    }
                    else if (initArgs.build) {
                        log(initArgs.setBuild)
                        return resolve(initArgs) as Future<TaqError.t, SanitizedArgs.t>
                    }
                    return initArgs._.includes('init') || 
                        initArgs._.includes('testFromVsCode') ||
                        initArgs._.includes('scaffold')
                        ? resolve(initArgs) as Future<TaqError.t, SanitizedArgs.t>
                        : postInitCLI(cliConfig, env, processedInputArgs, initArgs, i18n)
                }),
                forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (identity)
            )
        )
    }
    catch (err) {
        console.error(err)
    }
}

export const showInvalidTask = (cli: CLIConfig) => (parsedArgs: SanitizedArgs.t) => {
    if (executingBuiltInTask(parsedArgs) || cli.handled) {
        return parsedArgs
    }
    const err: TaqError.t = {kind: 'E_INVALID_TASK', msg: `Taqueria isn't aware of this task. Perhaps you need to install a plugin first?`, context: parsedArgs}
    return displayError (cli) (err)
}

export const normalizeErr = (err: TaqError.t | TaqError.E_TaqError | Error) => {
    if (err instanceof TaqError.E_TaqError) {
        return TaqError.create({
            ...err,
            msg: err.message
        })       
    }
    return err
}

export const displayError = (cli:CLIConfig) => (err: Error|TaqError.t) => {
    const inputArgs = (cli.parsed as unknown as {argv: Record<string, unknown>}).argv
    
    if (!inputArgs.fromVsCode) {
        cli.getInternalMethods().getUsageInstance().showHelp(inputArgs.help ? "log" : "error")
    }

    if (!inputArgs.help) {
        console.error("") // empty line
        const res = match(normalizeErr(err))
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
            .with({kind: 'E_GIT_CLONE_FAILED'},err              => [10, `${err.msg}: ${err.context}`])
            .with({kind: 'E_INVALID_ARGS'}, err                 => [11, err.msg])
            .with({kind: 'E_PROVISION'}, err                    => [12, err.msg])
            .with({kind: 'E_PARSE'}, err                        => [13, err.msg])
            .with({kind: 'E_PARSE_UNKNOWN'}, err                => [14, err.msg])
            .with({kind: 'E_INVALID_ARCH'}, err                 => [15, err.msg])
            .with({kind: 'E_NO_PROVISIONS'}, err                => [16, err.msg])
            .with({message: __.string}, err                     => [128, err.message])
            .exhaustive()
        
        const [exitCode, msg] = res
        if (inputArgs.debug) {
            logAllErrors(err)
        }
        else console.error(msg)
        Deno.exit(exitCode as number)
    }
}

const logAllErrors = (err: Error | TaqError.E_TaqError | TaqError.t | unknown) => {
    console.error(err)
    if (isTaqError(err) && err.previous) logAllErrors(err.previous)
}

export default {
    run
}