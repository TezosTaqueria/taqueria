import {Sandbox as theSandbox, execCmd, getArch, sendAsyncErr, sendErr, sendRes, sendAsyncRes, sendJsonRes, sendAsyncJsonRes} from '@taqueria/node-sdk'
import type {SanitizedArgs, Config, Attributes, SandboxConfig, Failure, LikeAPromise, Sandbox, AccountDetails, StdIO, PluginResponse} from "@taqueria/node-sdk/types"
import type {ExecException} from 'child_process'
import retry from 'async-retry'
import {join} from 'path'
import glob from 'fast-glob'

type Opts = SanitizedArgs & {sandboxName?: string}

const isSandboxRunning = (sandboxName: string) =>
    execCmd(`docker ps --filter name=${sandboxName} | grep -w ${sandboxName}`)
    .then(_ => true)
    .catch(_ => false)

const getDefaultSandboxName = (config: Config) : string => {
    const defaultEnv = config.environment.default
    const sandbox = config.environment[defaultEnv].sandboxes[0]
    return sandbox
}

const getSandbox = ({sandboxName, config}: Opts) => {
    if (!sandboxName) sandboxName = getDefaultSandboxName(config)
    if (config.sandbox[sandboxName]) {
        const sandboxConfig : SandboxConfig = config.sandbox[sandboxName]

        // This should probably go into the SDK or protocol
        if (sandboxName && sandboxConfig.label && sandboxConfig.protocol && sandboxConfig.rpcUrl) {
            const {label, protocol, rpcUrl, plugin, accounts} = sandboxConfig
            const unvalidated = {
                name: sandboxName,
                label,
                protocol,
                rpcUrl,
                plugin,
                accounts
            }
            return theSandbox.create(unvalidated)
        }
    }
    // TODO: Should we throw instead?
    return undefined
}

const doesUseFlextesa = (sandbox: Sandbox) => !sandbox.plugin || sandbox.plugin === 'flextesa'

const getInputFilenameFromContractDir = (opts: Opts, sourceFile: string) => join("/project", opts.config.contractsDir, sourceFile)

const getInputFilenameFromArtifactsDir = (opts: Opts, sourceFile: string) => join("/project", opts.config.artifactsDir, sourceFile)

const getCheckFileExistenceCommand = (sandbox: Sandbox, sourcePath: string) => `docker exec ${sandbox.name} ls ${sourcePath}`

//////////// Typecheck task ////////////

const getTypecheckCommand = (sandbox: Sandbox, sourcePath: string) => `docker exec ${sandbox.name} tezos-client typecheck script ${sourcePath}`

const typecheckContract = (opts: Opts, sandbox: Sandbox) => async (sourceFile: string) : Promise<{contract: string, result: string}> => {
    let sourcePath: string = getInputFilenameFromArtifactsDir(opts, sourceFile)
    sourcePath = await execCmd(getCheckFileExistenceCommand(sandbox, sourcePath))
                       .then(() => sourcePath)
                       .catch(() => getInputFilenameFromContractDir(opts, sourceFile))

    const typecheckContractHelper = () => {
        return execCmd(getTypecheckCommand(sandbox, sourcePath))
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

    return execCmd(getCheckFileExistenceCommand(sandbox, sourcePath))
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

const typecheckMultiple = (opts: Opts, sandbox: Sandbox) => (sourceFiles: string[]) : Promise<{contract: string, result: string}[]> => {
    return Promise.all(sourceFiles.map(typecheckContract(opts, sandbox)))
}

const typecheckAll = (opts: Opts, sandbox: Sandbox): Promise<{contract: string, result: string}[]> => {
    // TODO: Fetch list of files from SDK
    return glob(['**/*.tz'], {cwd: opts.artifactsDir, absolute: false})
    .then(entriesFromArtifactsDir =>
        glob(['**/*.tz'], {cwd: opts.contractsDir, absolute: false})
        .then(entriesFromContractsDir =>
            [...new Set([...entriesFromArtifactsDir, ...entriesFromContractsDir])].map(typecheckContract(opts, sandbox))
        )
    )
    .then(promises => Promise.all(promises))
}

const typecheck = <T>(parsedArgs: Opts, sandbox: Sandbox): LikeAPromise<PluginResponse, Failure<T>> => {
    const sourceFiles = (parsedArgs.sourceFiles as string).split(',')
    let p;
    if (parsedArgs.sourceFiles) {
        if (sourceFiles.length == 1)
            p = typecheckContract (parsedArgs, sandbox) (parsedArgs.sourceFiles as string).then(data => [data])
        else
            p = typecheckMultiple (parsedArgs, sandbox) (sourceFiles)
    } else {
        p = typecheckAll (parsedArgs, sandbox)
            .then(results => {
                if (results.length === 0) sendErr("No contracts found to compile.")
                return results
            })
    }
    return p.then(sendAsyncJsonRes)
}

const typecheckTask = async <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
    const sandbox = getSandbox(parsedArgs)
    if (sandbox) {
        if (doesUseFlextesa(sandbox)) {
            return await isSandboxRunning(sandbox.name.value)
            ? typecheck(parsedArgs, sandbox).then(sendJsonRes)
            : sendAsyncErr(`The ${sandbox.name} sandbox is not running.`)
        }
        return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`)
    }
    return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)
}

//////////// Simulate task ////////////

const getStorageFromConfig = (opts: Opts, sourceFile: string) => {
    const config = opts.config
    const defaultEnv = config.environment.default
    const storages = config.environment[defaultEnv].storage
    const storageValue = storages[sourceFile]
    return storageValue
}

// This is needed mostly due to the fact that execCmd() wraps the command in double quotes
const preprocessString = (value: string): string => {
    // 1. if the string contains escaped double quotes, escape them further
    value = value.replace(/\\"/g, '\\\\\\"')

    // 2. if the string contains unescaped double quotes, escape them
    value = value.replace(/(?<!\\)"/g, '\\"')

    return value
}

const getSimulateCommand = (opts: Opts, sandbox: Sandbox, sourceFile: string, sourcePath: string) => {
    let storage
    if (opts.storage) {
        storage = opts.storage
    } else {
        storage = getStorageFromConfig(opts, sourceFile)
        if (!storage) throw new Error('Error: Please specify a non-empty storage value in the CLI or in the config file.')
    }
    storage = typeof storage === 'string' ? storage : `${storage}`
    let input = opts.input && typeof opts.input === 'string' ? opts.input : `${opts.input}`

    storage = preprocessString(storage)
    input = preprocessString(input)

    // TODO: maybe validate storage and input value before passing it to tezos-client to prevent tezos-client menu being displayed? Alternatively, just perform trimming.

    const cmd = `docker exec ${sandbox.name} tezos-client run script ${sourcePath} on storage \'${storage}\' and input \'${input}\'`
    return cmd
}

const simulateContract = (opts: Opts, sandbox: Sandbox) => async (sourceFile: string) : Promise<{contract: string, result: string}> => {
    let sourcePath: string = getInputFilenameFromArtifactsDir(opts, sourceFile)
    sourcePath = await execCmd(getCheckFileExistenceCommand(sandbox, sourcePath))
                       .then(() => sourcePath)
                       .catch(() => getInputFilenameFromContractDir(opts, sourceFile))

    const simulateContractHelper = () => {
        try {
            const cmd = getSimulateCommand(opts, sandbox, sourceFile, sourcePath)
            return execCmd(cmd)
            .then(async ({stdout, stderr}) => { // How should we output warnings?
                if (stderr.length > 0) sendErr(`\n${stderr}`)
                return {
                    contract: sourceFile,
                    result: stdout
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
        } catch (err) {
            sendErr(" ")
            sendErr((err as Error).message)
            return Promise.resolve({
                contract: sourceFile,
                result: "Bad input or storage value"
            })
        }
    }

    return execCmd(getCheckFileExistenceCommand(sandbox, sourcePath))
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

const simulate = <T>(parsedArgs: Opts, sandbox: Sandbox): LikeAPromise<PluginResponse, Failure<T>> => {
    if (parsedArgs.sourceFile) {
        return simulateContract (parsedArgs, sandbox) (parsedArgs.sourceFile as string)
               .then(data => [data])
               .then(sendAsyncJsonRes)
    }
    return sendAsyncErr(`Please specify a contract. E.g. taq simulate local <contractName> ...`)
}

const simulateTask = async <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
    const sandbox = getSandbox(parsedArgs)
    if (sandbox) {
        if (doesUseFlextesa(sandbox)) {
            return await isSandboxRunning(sandbox.name.value)
            ? simulate(parsedArgs, sandbox).then(sendJsonRes)
            : sendAsyncErr(`The ${sandbox.name} sandbox is not running.`)
        }
        return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`)
    }
    return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)
}

export const client = <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
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