import {Sandbox as theSandbox, execCmd, getArch, sendAsyncErr, sendErr, sendAsyncRes, sendJsonRes} from '@taqueria/node-sdk'
import type { SanitizedArgs, Attributes, SandboxConfig, Failure, LikeAPromise, Sandbox, AccountDetails, StdIO } from "@taqueria/node-sdk/types"
import type {ExecException} from 'child_process'
import retry from 'async-retry'

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
    
const getSandbox = ({sandboxName, config}: Opts ) => {
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

export const proxy = <T>(parsedArgs: Opts) : LikeAPromise<void, Failure<T>> => {
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