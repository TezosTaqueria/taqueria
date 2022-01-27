import type {UnvalidatedPluginInfo, InstalledPlugin, Config, ConfigArgs, Action, Alias, Verb, Option, PositionalArg} from './taqueria-protocol/taqueria-protocol-types.ts'
import {Task, PluginInfo} from './taqueria-protocol/taqueria-protocol-types.ts'
import type {EnvKey, EnvVars, DenoArgs, RawInitArgs, SanitizedInitArgs, i18n, CLICommand, CommandArgs, UnvalidatedState} from './taqueria-types.ts'
import {State} from './taqueria-types.ts'
import type {Arguments} from 'https://deno.land/x/yargs/deno-types.ts'
import yargs from 'https://deno.land/x/yargs/deno.ts'
import {map, chain, attemptP, chainRej, resolve, reject, fork, forkCatch, parallel, debugMode} from 'https://cdn.skypack.dev/fluture';
import {pipe, identity} from "https://deno.land/x/fun@v1.0.0/fns.ts"
import {getConfig, getDefaultMaxConcurrency} from './taqueria-config.ts'
import {isTaqError, log, joinPaths, mkdir, readFile, writeTextFile, decodeJson, renderTemplate} from './taqueria-utils/taqueria-utils.ts'
import {SanitizedAbsPath, SanitizedPath, TaqError, Future} from './taqueria-utils/taqueria-utils-types.ts'
import {Table} from 'https://deno.land/x/cliffy@v0.20.1/table/mod.ts'
import { titleCase } from "https://deno.land/x/case/mod.ts";
import {uniq} from 'https://deno.land/x/ramda@v0.27.2/mod.ts'

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
    .scriptName('taq')
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
    .help(false)


const initCLI = (env: EnvVars, args: DenoArgs, i18n: i18n) => pipe(
    commonCLI(env, args, i18n).help(false)
)

const postInitCLI = (env: EnvVars, args: DenoArgs, parsedArgs: SanitizedInitArgs, i18n: i18n) => pipe(
    commonCLI(env, args, i18n)
    .command(
        'list networks',
        i18n.__('listNetworks'),
        () => {},
        (yargs: RawInitArgs) => {
            // TODO - completely temporary
            // Networks will be both cached in state, and too...
            // Retrieved lazily in real time from plugins
            new Table()
            .header(["Name", "Label"])
            .body([["ithacanet", "Ithaca Testnet"]])
            .border(true)
            .render()
        }
    )
    .demandCommand()
    .completion()
    .help(),
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
        ? writeTextFile(joinPaths(projectDir.value, "quickstart.md"), quickstart)
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

export const exec = (cmdTemplate: string, inputArgs: Record<string, unknown>) => attemptP(async () => {
    let command = cmdTemplate
    try {
        // NOTE, uses eta templates under the hood. Very performant! https://ghcdn.rawgit.org/eta-dev/eta/master/browser-tests/benchmark.html
        /**
         * Template Variables:
         * - configDir
         * - projectDir
         * - maxConcurrency
         * - plugin
         * - config.language
         * - config.plugins
         * - config.contractsDir
         * - config.artifactsDir
         * - config.testsDir
         * - config.configFile
         * - config.configDir
         * - config.projectDir
         * - env.get()
         * - i18n.__()
         */
        const join = joinPaths
        const cmd = renderTemplate(cmdTemplate, {join, ...inputArgs})
        command = cmd
        const process = Deno.run({cmd: ["sh", "-c", `${cmd}`]})
        const status = await process.status()

        return status.code
    }
    catch (previous) {
        throw {
            kind: "E_FORK",
            msg: `Could not fork ${command}`,
            previous
        }
    }
})


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

            // console.log(cmd.join(' '))

            const altCmd = ['sh', '-c', cmd.join(' ')]
            const process = Deno.run({cmd: altCmd, stdout: "piped", stderr: "piped"})
            const output = await process.output()
            const error = await process.stderrOutput()
            const decoder = new TextDecoder()
            const stdout = decoder.decode(output)
            const stderr = decoder.decode(error)

            if (!stdout && stderr) {
                return Promise.reject({
                    kind: 'E_INVALID_JSON',
                    msg: 'TODO i18n message',
                    context: {
                        stderr,
                        stdout
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

// TODO -the way we're checking for plugins via 'smartpy' or 'taqueria-plugin-smartpy` is ugly
const loadState = (cliConfig: CLIConfig, config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n, state: State): CLIConfig => {
    return Object.entries(state.tasks).reduce(
        (retval: CLIConfig, pair: [string, InstalledPlugin|Task]) => {
            const [taskName, implementation] = pair

            // Composite task...
            if ('task' in implementation) {
                const task: Task = implementation
                // Was a plugin provider specified?
                const installedPlugin = 
                    config.plugins.find((found: InstalledPlugin) => found.name === parsedArgs.plugin)
                    || config.plugins.find((found: InstalledPlugin) => found.name === `taqueria-plugin-${parsedArgs.plugin}`)

                if (parsedArgs.plugin && (task.handler.includes(parsedArgs.plugin) || task.handler.includes(`taqueria-plugin-${parsedArgs.plugin}`)) && installedPlugin) {
                    const canonicalTask = 
                        getCanonicalTask(parsedArgs.plugin, taskName, state)
                        || getCanonicalTask(`taqueria-plugin-${parsedArgs.plugin}`, taskName, state)
                    return canonicalTask
                        ? addTask(retval, config, env, parsedArgs, i18n, canonicalTask, installedPlugin)
                        : retval
                }
                else {
                    // Provide a composite task
                    return addTask(retval, config, env, parsedArgs, i18n, task)
                }
            }

            // Canonical task...
            const foundTask =
                getCanonicalTask(implementation.name, taskName, state)
                || getCanonicalTask(implementation.name.replace(/taqueria-plugin-/, ''), taskName, state)
            return foundTask ? addTask(retval, config, env, parsedArgs, i18n, foundTask, implementation) : retval
        },
        cliConfig
    )
}

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

const extendCLI = (env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => (cliConfig: CLIConfig) => pipe(
    getConfig(parsedArgs.projectDir, parsedArgs.configDir, i18n, false),
    chain ((config: ConfigArgs) => pipe(
        getState(config, env, parsedArgs, i18n),
        map ((state: State) => loadState(cliConfig, config, env, parsedArgs, i18n, state))
    )),
    chain (parseArgs)
)

const getStateAbspath = (parsedArgs: SanitizedInitArgs): SanitizedAbsPath => 
    parsedArgs.projectDir.join(parsedArgs.configDir.value, "state.json")

const getState = (config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => pipe(
    parsedArgs,
    getStateAbspath,
    (stateAbspath: SanitizedAbsPath) => pipe(
        stateAbspath.value,
        readFile,
        chain (decodeJson),
        map ((data: unknown) => (data as State)), // TODO - validate!
        chainRej (() => computeState(stateAbspath, config, env, parsedArgs, i18n)),
        chain ((state: State) => 
            config.hash.value === state.configHash.value
                ? resolve(state)
                : computeState(stateAbspath, config, env, parsedArgs, i18n)
        )
    )
)

const writeState = (stateAbspath: SanitizedAbsPath, state: State): Future<TaqError, State> => pipe(
    state,
    JSON.stringify,
    (data: string) => writeTextFile(stateAbspath.value, `// WARNING: This file is autogenerated and should NOT be modified\n${data}`),
    map (() => state)
)

const getComputedState = (config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => pipe(
    retrieveAllPluginInfo(config, env, i18n, parsedArgs),
    map ((pluginInfo: PluginInfo[]) => State.create(config, pluginInfo, i18n))
)

const computeState = (stateAbspath: SanitizedAbsPath, config: ConfigArgs, env: EnvVars, parsedArgs: SanitizedInitArgs, i18n: i18n) => {
    return pipe(
        getComputedState(config, env, parsedArgs, i18n),
        chain ((state:State) => writeState(stateAbspath, state))
    )
}
            
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
                    return initArgs._.includes('init')
                        ? resolve(initArgs)
                        : postInitCLI(env, inputArgs, initArgs, i18n)
                }),
                forkCatch (displayError(cliConfig)) (displayError(cliConfig)) (identity)
            )
        )
    }
    catch (err) {
        console.error(err)
    }
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
                console.error(Deno.inspect(err, {depth: Number.MAX_SAFE_INTEGER, compact: false, showHidden: true}))
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
    quickstart: parsedArgs.quickstart
})

export default {
    run
}
