import {execCmd, getArch, sendAsyncErr, sendErr, sendAsyncRes, sendJsonRes, sendRes} from '@taqueria/node-sdk'
import {LikeAPromise, StdIO, Protocol, RequestArgs, SandboxConfig, SandboxAccountConfig} from "@taqueria/node-sdk/types"
import type {ExecException} from 'child_process'
import retry from 'async-retry'
import { SanitizedArgs, TaqError } from '@taqueria/protocol/taqueria-protocol-types'

const {Url} = Protocol

interface Opts extends RequestArgs.ProxyRequestArgs {
    sandboxName?: string
}

const getDockerImage = (opts: Opts) => `ghcr.io/ecadlabs/taqueria-flextesa:${opts.setVersion}-${opts.setBuild}`

const getContainerName = (sandboxName: string, parsedArgs: Opts) => {
    return `taqueria-${parsedArgs.env}-${sandboxName}`
}

const getStartCommand = async (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts) => {
    const port = Url.toComponents(sandbox.rpcUrl).port
    const containerName = getContainerName(sandboxName, opts)
    const arch = await getArch()
    const image = getDockerImage(opts)

    const ports = opts.debug
        ? `-p ${port}:20000 -p 19229:9229`
        : `-p ${port}:20000`

    return `docker run --name ${containerName} --rm --detach --platform ${arch} ${ports} -v ${opts.config.projectDir}:/project -w /app ${image} node index.js --sandbox ${sandboxName}`
}

const getConfigureCommand = (sandboxName: string, opts: Opts): string => {
    const containerName = getContainerName(sandboxName, opts)
    return `docker exec ${containerName} node index.js --sandbox ${sandboxName} --configure`
}

const getImportAccountsCommand = (sandboxName: string, opts: Opts): string => {
    const containerName = getContainerName(sandboxName, opts)
    return `docker exec ${containerName} node index.js --sandbox ${sandboxName} --importAccounts`
}

const doesUseFlextesa = (sandbox: SandboxConfig.t) => !sandbox.plugin || sandbox.plugin === 'flextesa'

const doesNotUseFlextesa = (sandbox: SandboxConfig.t) => !doesUseFlextesa(sandbox)

const startInstance = (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts) : Promise<void> => {
    if (doesNotUseFlextesa(sandbox))
        return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`)

    return isSandboxRunning(sandboxName)
        .then(
            running => running
                ? sendAsyncRes("Already running.")
                : getStartCommand(sandboxName, sandbox, opts)
                    .then(cmd => {
                        console.log("Booting sandbox...")
                        return execCmd(cmd)
                    })
                    .then(() => {
                        console.log("Configuring sandbox...")
                        return configureTezosClient(sandboxName, opts)
                    })
                    .then(({stderr}) => {
                        if (stderr.length) sendErr(stderr)
                        console.log("Adding accounts...")
                        return importAccounts(sandboxName, opts)
                    })
                    .then(({stderr}) => {
                        if (stderr.length) sendErr(stderr)
                        sendAsyncRes(`Started ${sandboxName}.`)
                    })
        )
}

const configureTezosClient = (sandboxName: string, opts: Opts) : Promise<StdIO> =>
    retry(
        () => Promise.resolve(getConfigureCommand(sandboxName, opts))
                .then(execCmd)
                .then(({stderr, stdout}) => {
                    if (stderr.length) return Promise.reject(stderr)
                    return ({stderr, stdout})
                })
    )


const importAccounts = (sandboxName: string, opts: Opts): Promise<StdIO> =>
    retry(
        () => Promise.resolve(getImportAccountsCommand(sandboxName, opts))
                .then(execCmd)
                .then(({stderr, stdout}) => {
                    if (stderr.length) {
                        return Promise.reject(stderr)
                    }
                    return ({stderr, stdout})
                })
                .catch(stderr => {
                    return Promise.reject(`There was a problem trying to import accounts into tezos-client for the sandbox: ${stderr}`)
                }),
    )

const startAll = (opts: Opts): Promise<void> => {
    if (opts.config.sandbox === undefined) return sendAsyncErr("No sandboxes configured to start")
    
    const processes = Object.entries(opts.config.sandbox).reduce(
        (retval, [sandboxName, sandboxDetails]) => {
            if (sandboxName === 'default') return retval
            return [...retval, startInstance(sandboxName, sandboxDetails as SandboxConfig.t, opts)]
        },
        [] as Promise<void>[]
    )

    return Promise.all(processes).then(_ => sendAsyncRes("Done."))
}

const getSandbox = ({sandboxName, config}: Opts) => {
    if (sandboxName && config.sandbox && config.sandbox[sandboxName]) {
        const sandboxConfig = config.sandbox![sandboxName] as SandboxConfig.t
        return sandboxConfig
    }
    return undefined
}

const startSandboxTask = (parsedArgs: Opts) : LikeAPromise<void, TaqError.t> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        return sandbox
            ? startInstance (parsedArgs.sandboxName, sandbox, parsedArgs)
            : sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)
    }
    return startAll(parsedArgs)
}

const isSandboxRunning = (sandboxName: string) =>
    execCmd(`docker ps --filter name=${sandboxName} | grep -w ${sandboxName}`)
    .then(_ => true)
    .catch(_ => false)


type AccountBalance = {account: string, balance: string, address: string|undefined}
const getAccountBalances = (sandboxName: string, sandbox: SandboxConfig.t, opts: Opts): Promise<AccountBalance[]> => {
    const processes = Object.entries(sandbox.accounts ?? {}).reduce(
        (retval: Promise<AccountBalance>[], [accountName, accountDetails]) => {
            if (accountName === 'default') return retval

            const getBalanceProcess =
                getArch()
                .then(_ => `docker exec ${getContainerName(sandboxName, opts)} tezos-client get balance for ${accountName.trim()}`)
                .then(execCmd)
                .then(({stdout, stderr}) => {
                    if (stderr.length > 0) sendErr(stderr)
                    return {
                        account: accountName, 
                        balance: stdout.trim(),
                        address: (accountDetails as SandboxAccountConfig.t).publicKeyHash
                    }
                })
                .catch((err: ExecException) => {
                    sendErr(err.message)
                    return {
                        account: accountName,
                        balance: "Error",
                        address: (accountDetails as SandboxAccountConfig.t).publicKeyHash
                    }
                })
            return [...retval, getBalanceProcess]
        },
        []
    )

    return Promise.all(processes)
}    


const listAccountsTask = async <T>(parsedArgs: Opts) : Promise<void> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(parsedArgs.sandboxName)
                ? getAccountBalances(parsedArgs.sandboxName, sandbox, parsedArgs)
                    .then(sendJsonRes)
                : sendAsyncErr(`The ${parsedArgs.sandboxName} sandbox is not running.`)
            }
            return sendAsyncErr(
                `Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`
            )
        }
        return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)

    }
    return sendAsyncErr(`Please specify a sandbox. E.g. taq list accounts local`)
}

const stopSandboxTask = async (parsedArgs: Opts) : Promise<void> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(parsedArgs.sandboxName)
                ? execCmd(`docker kill ${getContainerName(parsedArgs.sandboxName, parsedArgs)}`)
                    .then(_ => sendAsyncRes(`Stopped ${parsedArgs.sandboxName}.`))
                : sendAsyncRes(`The ${parsedArgs.sandboxName} sandbox was not running.`)
            }
            return sendAsyncErr(`Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`)
        }
        return sendAsyncErr(`There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`)

    }
    return sendAsyncErr(`No sandbox specified`)
}

export const proxy = <T>(parsedArgs: Opts) : LikeAPromise<void, TaqError.t> => {
    switch (parsedArgs.task) {
        case 'list accounts':
            return listAccountsTask(parsedArgs)
        case 'start sandbox':
            return startSandboxTask(parsedArgs)
        case 'stop sandbox':
            return stopSandboxTask(parsedArgs)
        default:
            return sendAsyncErr(`${parsedArgs.task} is not an understood task by the Flextesa plugin`,)
    }
}

export default proxy