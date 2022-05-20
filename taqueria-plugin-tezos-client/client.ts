import {execCmd, sendAsyncErr, sendErr, sendJsonRes, sendAsyncJsonRes, getSandboxConfig, getCurrentEnvironmentConfig} from '@taqueria/node-sdk'
import type {RequestArgs, LoadedConfig, SandboxConfig, Environment, LikeAPromise, PluginResponse} from "@taqueria/node-sdk/types"
import type {ExecException} from 'child_process'
import retry from 'async-retry'
import {join} from 'path'
import glob from 'fast-glob'

interface Opts extends RequestArgs.ProxyRequestArgs {
    sandboxName?: string
    sourceFile?: string
    sourceFiles?: string
    storage?: string
    input?: string
    entrypoint?: string
}

const isSandboxRunning = (sandboxName: string, opts: Opts) => {
    const containerName = getContainerName(sandboxName, opts)
    return execCmd(`docker ps --filter name=${containerName} | grep -w ${containerName}`)
    .then(_ => true)
    .catch(_ => false)
}
    

const getDefaultSandboxName = (config: LoadedConfig.t) => {
    const defaultEnv = config.environment?.default as string | undefined
    if (defaultEnv) {
        const env = config.environment || {}
        const envConfig = env[defaultEnv] as Environment.t
        const sandbox = envConfig.sandboxes[0]
        return sandbox
    }
    return undefined
}

const getContainerName = (sandboxName: string, parsedArgs: Opts) => {
    return `taqueria-${parsedArgs.env}-${sandboxName}`
}

const doesUseFlextesa = (sandbox: SandboxConfig.t) => !sandbox.plugin || sandbox.plugin === 'flextesa'

const getInputFilenameFromContractDir = (opts: Opts, sourceFile: string) => join("/project", opts.config.contractsDir, sourceFile)

const getInputFilenameFromArtifactsDir = (opts: Opts, sourceFile: string) => join("/project", opts.config.artifactsDir, sourceFile)

const getCheckFileExistenceCommand = (sandboxName: string, sandbox: SandboxConfig.t, sourcePath: string, opts: Opts) => `docker exec ${getContainerName(sandboxName, opts)} ls ${sourcePath}`

//////////// Typecheck task ////////////

const getTypecheckCommand = (sandboxName: string, sandbox: SandboxConfig.t, sourcePath: string, opts: Opts) => `docker exec ${getContainerName(sandboxName, opts)} tezos-client typecheck script ${sourcePath}`

const typecheckContract = (opts: Opts, sandboxName: string, sandbox: SandboxConfig.t) => async (sourceFile: string) : Promise<{contract: string, result: string}> => {
    let sourcePath: string = getInputFilenameFromArtifactsDir(opts, sourceFile)
    sourcePath = await execCmd(getCheckFileExistenceCommand(sandboxName, sandbox, sourcePath, opts))
                       .then(() => sourcePath)
                       .catch(() => getInputFilenameFromContractDir(opts, sourceFile))

    const typecheckContractHelper = () => {
        return execCmd(getTypecheckCommand(sandboxName, sandbox, sourcePath, opts))
        .then(async ({stderr}) => { // How should we output warnings?
            if (stderr.length > 0) sendErr(`\n${stderr}`)
            return {
                contract: sourceFile,
                result: "Valid"
            }
        })
        .catch(err => {
            sendErr(" ")
            sendErr(err.message.split("\n").slice(1).join("\n"))
            return Promise.resolve({
                contract: sourceFile,
                result: "Invalid"
            })
        })
    }

    return execCmd(getCheckFileExistenceCommand(sandboxName, sandbox, sourcePath, opts))
    .then(typecheckContractHelper)
    .catch(err => {
        sendErr(" ")
        sendErr(sourceFile + ": Does not exist\n")
        return Promise.resolve({
            contract: sourceFile,
            result: "N/A"
        })
    })
}

const typecheckMultiple = (opts: Opts, sandboxName: string, sandbox: SandboxConfig.t) => (sourceFiles: string[]) : Promise<{contract: string, result: string}[]> => {
    return Promise.all(sourceFiles.map(typecheckContract(opts, sandboxName, sandbox)))
}

const typecheckAll = (opts: Opts, sandboxName: string, sandbox: SandboxConfig.t): Promise<{contract: string, result: string}[]> => {
    // TODO: Fetch list of files from SDK
    return glob(['**/*.tz'], {cwd: opts.config.artifactsDir, absolute: false})
    .then(entriesFromArtifactsDir =>
        glob(['**/*.tz'], {cwd: opts.config.contractsDir, absolute: false})
        .then(entriesFromContractsDir =>
            [...new Set([...entriesFromArtifactsDir, ...entriesFromContractsDir])].map(typecheckContract(opts, sandboxName, sandbox))
        )
    )
    .then(promises => Promise.all(promises))
}

const typecheck = <T>(parsedArgs: Opts, sandboxName: string, sandbox: SandboxConfig.t): Promise<PluginResponse> => {
    const sourceFiles = (parsedArgs.sourceFiles as string).split(',')
    let p;
    if (parsedArgs.sourceFiles) {
        if (sourceFiles.length == 1)
            p = typecheckContract (parsedArgs, sandboxName, sandbox) (parsedArgs.sourceFiles as string).then(data => [data])
        else
            p = typecheckMultiple (parsedArgs, sandboxName, sandbox) (sourceFiles)
    } else {
        p = typecheckAll (parsedArgs, sandboxName, sandbox)
            .then(results => {
                if (results.length === 0) sendErr("No contracts found to compile.")
                return results
            })
    }
    return p.then(sendAsyncJsonRes)
}

const typecheckTask = async <T>(parsedArgs: Opts) : Promise<void> => {
    const sandboxName = parsedArgs.sandboxName ?? getDefaultSandboxName(parsedArgs.config)
    if (sandboxName) {
        const sandbox = getSandboxConfig(parsedArgs) (sandboxName)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(sandboxName, parsedArgs)
                ? typecheck(parsedArgs, sandboxName, sandbox).then(sendJsonRes)
                : sendAsyncErr(`The ${sandboxName} sandbox is not running.`)
            }
            return sendAsyncErr(`Cannot start ${sandboxName} as its configured to use the ${sandbox.plugin} plugin.`)
        }
        return sendAsyncErr(`There is no sandbox configuration with the name ${sandboxName}.`)
    }
    else return sendAsyncErr("No sandbox specified or found in your .taq/config.json file")
}

//////////// Simulate task ////////////

const getStorageFromConfig = (opts: Opts, sourceFile: string) => {
    const envConfig = getCurrentEnvironmentConfig(opts)
    if (envConfig && envConfig.storage) {
        return envConfig.storage[sourceFile]
    }
    return undefined
}

// This is needed mostly due to the fact that execCmd() wraps the command in double quotes
const preprocessString = (value: string) : string => {
    // 1. if the string contains escaped double quotes, escape them further
    value = value.replace(/\\"/g, '\\\\\\"')

    // 2. if the string contains unescaped double quotes, escape them
    value = value.replace(/(?<!\\)"/g, '\\"')

    return value
}

const getSimulateCommand = (opts: Opts, sandboxName: string, sandbox: SandboxConfig.t, sourceFile: string, sourcePath: string) => {

    const containerName = getContainerName(sandboxName, opts)
    const rawStorage = opts.storage ?? getStorageFromConfig(opts, sourceFile)
    if (rawStorage === undefined) throw new Error('Error: Please specify a non-empty storage value in the CLI or in the config file.')
    
    const storage = typeof rawStorage === 'string' ? rawStorage : `${rawStorage}`
    const input = opts.input && typeof opts.input === 'string' ? opts.input : `${opts.input}`

    const processedStorage = preprocessString(storage)
    const processedInput = preprocessString(input)

    const entrypoint = opts.entrypoint ? `--entrypoint ${opts.entrypoint}` : ''

    const cmd = `docker exec ${containerName} tezos-client run script ${sourcePath} on storage \'${processedStorage}\' and input \'${processedInput}\' ${entrypoint}`
    return cmd
}

const trimTezosClientMenuIfPresent = (msg: string) : string => {
    return msg.replace(/Usage:(.|\n)+/, '')
}

const simulateContract = (opts: Opts, sandboxName: string, sandbox: SandboxConfig.t) => async (sourceFile: string) : Promise<{contract: string, result: string}> => {
    let sourcePath: string = getInputFilenameFromArtifactsDir(opts, sourceFile)
    sourcePath = await execCmd(getCheckFileExistenceCommand(sandboxName, sandbox, sourcePath, opts))
                       .then(() => sourcePath)
                       .catch(() => getInputFilenameFromContractDir(opts, sourceFile))

    const simulateContractHelper = () => {
        try {
            const cmd = getSimulateCommand(opts, sandboxName, sandbox, sourceFile, sourcePath)
            return execCmd(cmd)
            .then(async ({stdout, stderr}) => { // How should we output warnings?
                if (stderr.length > 0) sendErr(`\n${stderr}`)
                return {
                    contract: sourceFile,
                    result: stdout
                }
            })
            .catch(err => {
                const msg: string = trimTezosClientMenuIfPresent(err.message)
                sendErr(msg.split("\n").slice(1).join("\n"))
                return Promise.resolve({
                    contract: sourceFile,
                    result: "Invalid"
                })
            })
        } catch (err) {
            sendErr(" ")
            sendErr((err as Error).message)
            return Promise.resolve({
                contract: sourceFile,
                result: "Bad input or storage value"
            })
        }
    }

    return execCmd(getCheckFileExistenceCommand(sandboxName, sandbox, sourcePath, opts))
    .then(simulateContractHelper)
    .catch(err => {
        sendErr(" ")
        sendErr(sourceFile + ": Does not exist\n")
        return Promise.resolve({
            contract: sourceFile,
            result: "N/A"
        })
    })
}

const simulate = <T>(parsedArgs: Opts, sandboxName: string, sandbox: SandboxConfig.t): Promise<PluginResponse> => {
    if (parsedArgs.sourceFile) {
        return simulateContract (parsedArgs, sandboxName, sandbox) (parsedArgs.sourceFile as string)
               .then(data => [data])
               .then(sendAsyncJsonRes)
    }
    return sendAsyncErr(`Please specify a contract. E.g. taq simulate local <contractName> ...`)
}

const simulateTask = async <T>(parsedArgs: Opts) : Promise<void> => {
    const sandboxName = parsedArgs.sandboxName ?? getDefaultSandboxName(parsedArgs.config)
    if (sandboxName) {
        const sandbox = getSandboxConfig(parsedArgs) (sandboxName)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(sandboxName, parsedArgs)
                ? simulate(parsedArgs, sandboxName, sandbox).then(sendJsonRes)
                : sendAsyncErr(`The ${sandboxName} sandbox is not running.`)
            }
            return sendAsyncErr(`Cannot start ${sandboxName} as its configured to use the ${sandbox.plugin} plugin.`)
        }
        return sendAsyncErr(`There is no sandbox configuration with the name ${sandboxName}.`)
    }
    else return sendAsyncErr("No sandbox specified or found in your .taq/config.json file")
}

export const client = <T>(parsedArgs: Opts) : Promise<void> => {
    switch (parsedArgs.task) {
        case 'typecheck':
            return typecheckTask(parsedArgs)
        case 'simulate':
            return simulateTask(parsedArgs)
        default:
            return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Tezos-client plugin`,)
    }
}

export default client