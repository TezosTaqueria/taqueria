import {Sandbox as theSandbox, execCmd, getArch, sendAsyncErr, sendErr, sendRes, sendAsyncRes, sendJsonRes, sendAsyncJsonRes} from '@taqueria/node-sdk'
import type {SanitizedArgs, Attributes, SandboxConfig, Failure, LikeAPromise, Sandbox, AccountDetails, StdIO, PluginResponse} from "@taqueria/node-sdk/types"
import type {ExecException} from 'child_process'
import retry from 'async-retry'
import {join} from 'path'
import glob from 'fast-glob'

type Opts = SanitizedArgs & {sandboxName?: string}

const attributesToParams = (attributes: Attributes): Record<string, string> => ['blockTime'].reduce(
    (retval: Record<string, string>, attributeName: string) => {
        if (attributes[attributeName]) {
            retval[attributeName] = attributes[attributeName].toString()
        }
        return retval
    },
    {}
)

const getDockerImage = (opts: Opts) => `ghcr.io/ecadlabs/taqueria-flextesa:${opts.setVersion}-${opts.setBuild}`

const getStartCommand = (sandbox: Sandbox, image: string, config: Opts, arch: string, debug:boolean): string => {
    const _envVars = Object.entries(attributesToParams(sandbox.attributes)).reduce(
        (retval, [key, val]) => `${retval} -e ${key} ${val} `,
        ""
    )

    const ports = debug
        ? `-p ${sandbox.rpcUrl.url.port}:20000 -p 19229:9229`
        : `-p ${sandbox.rpcUrl.url.port}:20000`

    return `docker run --name ${sandbox.name} --rm --detach --platform ${arch} ${ports} -v ${config.projectDir}:/project -w /app ${image} node index.js --sandbox ${sandbox.name}`
}

const getConfigureCommand = (sandbox: Sandbox, image: string, config: Opts, arch: string): string => {
    return `docker exec ${sandbox.name} node index.js --sandbox ${sandbox.name} --configure`
}

const getImportAccountsCommand = (sandbox: Sandbox, image: string, config: Opts, arch: string): string => {
    return `docker exec ${sandbox.name} node index.js --sandbox ${sandbox.name} --importAccounts`
}

const doesUseFlextesa = (sandbox: Sandbox) => !sandbox.plugin || sandbox.plugin === 'flextesa'

const doesNotUseFlextesa = (sandbox: Sandbox) => !doesUseFlextesa(sandbox)

const startInstance = (opts: Opts) => (sandbox: Sandbox) : Promise<void> => {
    debugger
    if (doesNotUseFlextesa(sandbox))
        return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`)

    return isSandboxRunning(sandbox.name.value)
        .then(
            running => running
                ? sendAsyncRes("Already running.")
                : getArch()
                    .then(arch => getStartCommand(sandbox, getDockerImage(opts), opts, arch, opts.debug)) 
                    .then(execCmd)
                    .then(({stderr}) => {
                        if (opts.debug && stderr) sendErr(stderr)
                        return configureTezosClient(sandbox, opts)
                    })
                    .then(({stderr}) => {
                        if (opts.debug && stderr) sendErr(stderr)
                        return importAccounts(sandbox, opts)
                    })
                    .then(({stderr}) => {
                        if (opts.debug && stderr) sendErr(stderr)
                        sendAsyncRes(`Started ${sandbox.name.value}.`)
                    })
        )
}

const configureTezosClient = (sandbox: Sandbox, opts: Opts) : LikeAPromise<StdIO, Failure<StdIO>> =>
    retry(
        () => getArch()
                .then(arch => getConfigureCommand(sandbox, getDockerImage(opts), opts, arch))
                .then(execCmd)
                .catch(previous => 
                    Promise.reject({
                        errCode: 'E_CONFIGURE_SANDBOX',
                        errorMsg: "Could not configure sandbox",
                        context: sandbox,
                        previous
                    })
                )
                .then(({stderr, stdout}) => {
                    return stderr.length > 0
                        ? Promise.reject({
                            errCode: 'E_CONFIGURE_SANDBOX',
                            errorMsg: "Could not configure sandbox",
                            context: {stderr, stdout}
                        }) 
                        : Promise.resolve({stderr, stdout})
                })
    )


const importAccounts = (sandbox: Sandbox, opts: Opts): LikeAPromise<StdIO, Failure<StdIO>> =>
    retry(
        () => getArch()
                .then(arch => getImportAccountsCommand(sandbox, getDockerImage(opts), opts, arch))
                .then(execCmd)
                .catch(previous =>
                    Promise.reject({
                        errCode: 'E_IMPORT_ACCOUNTs',
                        errorMsg: "Could not import test accounts into sandbox",
                        context: sandbox,
                        previous
                    })
                )
                .then(({stderr, stdout}) => {
                    return stderr.length > 0
                        ? Promise.reject({
                            errCode: 'E_IMPORT_ACCOUNTs',
                            errorMsg: "Could not import test accounts into sandbox",
                            context: {stderr, stdout}
                        }) 
                        : Promise.resolve({stderr, stdout})
                })
    )

const startAll = (sandboxes: Sandbox[], opts: Opts): Promise<void> => {
    if (!sandboxes.length) return sendAsyncErr("No sandboxes configured to start")

    const jobs = 
        sandboxes
        .filter(sandbox => doesUseFlextesa(sandbox))
        .map(startInstance(opts))

    return Promise.all(jobs).then(_ => sendAsyncRes("Done."))
}

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

const getSandboxes = (parsedArgs: Opts): Sandbox[] =>
    Object.keys(parsedArgs.config.sandbox)
        .reduce(
            (retval: Sandbox[], sandboxName) => {
                const sandbox = getSandbox({...parsedArgs, sandboxName})
                return sandbox
                    ? [...retval, sandbox]
                    : retval
            },
            []
        )

const startSandboxTask = <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        return sandbox
            ? startInstance (parsedArgs) (sandbox)
            : sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)
    }
    return startAll(getSandboxes(parsedArgs), parsedArgs)
}



const isSandboxRunning = (sandboxName: string) =>
    execCmd(`docker ps --filter name=${sandboxName} | grep -w ${sandboxName}`)
    .then(_ => true)
    .catch(_ => false)


type AccountBalance = {account: string, balance: string, address: string|undefined}
const getAccountBalances =(sandbox: Sandbox): Promise<AccountBalance[]> => {
    const processes = Object.entries(sandbox.accounts).reduce(
        (retval: Promise<AccountBalance>[], [accountName, accountDetails] : [string, string | AccountDetails]) => {
            if (accountName === 'default') return retval

            const getBalanceProcess =
                getArch()
                .then(_ => `docker exec ${sandbox.name} tezos-client get balance for ${accountName.trim()}`)
                .then(execCmd)
                .then(({stdout, stderr}) => {
                    if (stderr.length > 0) sendErr(stderr)
                    return {
                        account: accountName, 
                        balance: stdout.trim(),
                        address: (accountDetails as AccountDetails).keys?.publicKeyHash
                    }
                })
                .catch((err: ExecException) => {
                    sendErr(err.message)
                    return {
                        account: accountName,
                        balance: "Error",
                        address: (accountDetails as AccountDetails).keys?.publicKeyHash
                    }
                })
            return [...retval, getBalanceProcess]
        },
        []
    )

    return Promise.all(processes)
}    


const listAccountsTask = async <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(sandbox.name.value)
                ? getAccountBalances(sandbox)
                    .then(sendJsonRes)
                : sendAsyncErr(`The ${sandbox.name} sandbox is not running.`)
            }
            return sendAsyncErr(
                `Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`
            )
        }
        return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)

    }
    return sendAsyncErr(`Please specify a sandbox. E.g. taq list accounts local`)
}

const stopSandboxTask = async <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(sandbox.name.value)
                ? execCmd(`docker kill ${sandbox.name}`)
                    .then(_ => sendAsyncRes(`Stopped ${sandbox.name.value}.`))
                : sendAsyncRes(`The ${sandbox.name} sandbox was not running.`)
            }
            return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`)
        }
        return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)

    }
    return sendAsyncErr(`No sandbox specified`)
}

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
            result: "Does not exist"
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
    // TODO: handle non-integers
    const storage = opts.storage
    const input = opts.input
    const cmd = `docker exec ${sandbox.name} tezos-client run script ${sourcePath} on storage ${storage} and input ${input}`
    return cmd
}

const simulateContract = (opts: Opts, sandbox: Sandbox) => (sourceFile: string) : Promise<{contract: string, result: string}> => {
    const sourcePath = getInputFilename(opts, sourceFile)

    const simulateContractHelper = () => {
        return execCmd(getSimulateCommand(opts, sandbox, sourcePath))
        .then(async ({stdout, stderr}) => { // How should we output warnings?
            // if (stdout.length > 0) sendErr(`\n${stdout}`) // TODO: sendRes doesn't work because calling console.log will somehow hide the table
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
    .then(simulateContractHelper)
    .catch(err => {
        sendErr(" ")
        sendErr(sourceFile + ": Does not exist\n")
        return Promise.resolve({
            contract: sourceFile,
            result: "Does not exist"
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

export const proxy = <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
    switch (parsedArgs.task) {
        case 'list accounts':
            return listAccountsTask(parsedArgs)
        case 'start sandbox':
            return startSandboxTask(parsedArgs)
        case 'stop sandbox':
            return stopSandboxTask(parsedArgs)
        case 'typecheck':
            return typecheckTask(parsedArgs)
        case 'simulate':
            return simulateTask(parsedArgs)
        default:
            return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Flextesa plugin`,)
    }
}

export default proxy