import {Sandbox as theSandbox, execCmd, getArch, sendAsyncErr, sendErr, sendRes, sendAsyncRes, sendJsonRes, sendAsyncJsonRes} from '@taqueria/node-sdk'
import type {SanitizedArgs, Attributes, SandboxConfig, Failure, LikeAPromise, Sandbox, AccountDetails, StdIO, PluginResponse} from "@taqueria/node-sdk/types"
import type {ExecException} from 'child_process'
import retry from 'async-retry'
import {join} from 'path'
import glob from 'fast-glob'

type Opts = SanitizedArgs & {sandboxName?: string}

const isSandboxRunning = (sandboxName: string) =>
    execCmd(`docker ps --filter name=${sandboxName} | grep -w ${sandboxName}`)
    .then(_ => true)
    .catch(_ => false)

const getSandbox = ({sandboxName, config}: Opts) => {
    if (sandboxName && config.sandbox[sandboxName]) {
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

const getInputFilename = (opts: Opts, sourceFile: string) => join("/project", opts.config.contractsDir, sourceFile)

const getCheckFileExistenceCommand = (sandbox: Sandbox, sourcePath: string) => `docker exec ${sandbox.name} ls ${sourcePath}`

//////////// Typecheck task ////////////

const getTypecheckCommand = (sandbox: Sandbox, sourcePath: string) => `docker exec ${sandbox.name} tezos-client typecheck script ${sourcePath}`

const typecheckContract = (opts: Opts, sandbox: Sandbox) => (sourceFile: string) : Promise<{contract: string, result: string}> => {
    const sourcePath = getInputFilename(opts, sourceFile)

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
    return glob(
        ['**/*.tz'],
        {cwd: opts.contractsDir, absolute: false}
    )
    .then(entries => entries.map(typecheckContract(opts, sandbox)))
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
    if (parsedArgs.sandboxName) {
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
    return sendAsyncErr(`Please specify a sandbox. E.g. taq typecheck local`)
}

//////////// Simulate task ////////////

const getSimulateCommand = (opts: Opts, sandbox: Sandbox, sourcePath: string) => {
    let storage: string = opts.storage && typeof opts.storage === 'string' ? opts.storage as string : `${opts.storage}`
    let input: string = opts.input && typeof opts.input === 'string' ? opts.input as string : `${opts.input}`

    // If the string contains escaped double quotes, escape them further
    storage = storage.replace(/\\"/g, '\\\\\\"')
    input = input.replace(/\\"/g, '\\\\\\"')

    // If the string contains leading and trailing double quotes, escape them, otherwise docker exec will complain
    storage = storage.match(/^".*"$/) ? "\\" + storage.slice(0, -1) + "\\\"" : storage
    input = input.match(/^".*"$/) ? "\\" + input.slice(0, -1) + "\\\"" : input

    const cmd = `docker exec ${sandbox.name} tezos-client run script ${sourcePath} on storage \'${storage}\' and input \'${input}\'`
    // console.error("============")
    // console.error(storage)
    // console.error(input)
    // console.error(cmd)
    // console.error("============")
    return cmd
}

const simulateContract = (opts: Opts, sandbox: Sandbox) => (sourceFile: string) : Promise<{contract: string, result: string}> => {
    const sourcePath = getInputFilename(opts, sourceFile)

    const simulateContractHelper = () => {
        return execCmd(getSimulateCommand(opts, sandbox, sourcePath))
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
    if (parsedArgs.sandboxName) {
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
    return sendAsyncErr(`Please specify a sandbox. E.g. taq typecheck local ...`)
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