import {Sandbox as theSandbox, execCmd, getArch} from '@taqueria/node-sdk'
import type { SanitizedArgs, ProxyAction, Attributes, SandboxConfig, EconomicalProtocol, ActionResponse, Failure, LikeAPromise, Sandbox } from "@taqueria/node-sdk/types"
import retry from 'promise-retry'

type Opts = SanitizedArgs & {sandboxName?: string}

const sleep = (milliseconds: number) => new Promise((resolve, _reject) => {
    setTimeout(resolve, milliseconds)
})

const attributesToParams = (attributes: Attributes): Record<string, string> => ['blockTime'].reduce(
    (retval: Record<string, string>, attributeName: string) => {
        if (attributes[attributeName]) {
            retval[attributeName] = attributes[attributeName].toString()
        }
        return retval
    },
    {}
)

const getDockerImage = () => 'taqueria/flextesa:latest'

const getStartCommand = (sandbox: Sandbox, image: string, config: Opts, arch: string): string => {
    const _envVars = Object.entries(attributesToParams(sandbox.attributes)).reduce(
        (retval, [key, val]) => `${retval} -e ${key} ${val} `,
        ""
    )

    return `docker run --name ${sandbox.name} --rm --detach --platform ${arch} -p ${sandbox.rpcUrl.url.port}:20000 -v ${config.projectDir}:/project -w /app ${image} node startFlextesa.js --sandbox ${sandbox.name}`
}

const getConfigureCommand = (sandbox: Sandbox, image: string, config: Opts, arch: string): string => {
    return `docker exec --platform ${arch} ${sandbox.name} node startFlextesa.js --sandbox ${sandbox.name} --configure`
}

const getImportAccountsCommand = (sandbox: Sandbox, image: string, config: Opts, arch: string): string => {
    return `docker exec --platform ${arch} ${sandbox.name} node startFlextesa.js --sandbox ${sandbox.name} --importAccounts`
}

const doesUseFlextesa = (sandbox: Sandbox) => !sandbox.plugin || sandbox.plugin === 'flextesa'

const doesNotUseFlextesa = (sandbox: Sandbox) => !doesUseFlextesa(sandbox)

const startInstance = (opts: Opts) => (sandbox: Sandbox) : Promise<ProxyAction> => {
    if (doesNotUseFlextesa(sandbox))
        return Promise.resolve({
            status: 'failed',
            stdout: "",
            stderr: `Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`
        })

    return isSandboxRunning(sandbox.name.value)
        .then(
            running => running
                ? Promise.resolve({
                    status: 'success',
                    stdout: "Already running.",
                    stderr: ''
                })
                : getArch()
                    .then(arch => getStartCommand(sandbox, getDockerImage(), opts, arch)) 
                    .then(execCmd)
                .then(() => configureTezosClient(sandbox, opts))
                .then(() => importAccounts(sandbox, opts))
                .then(() => ({
                    status: 'success',
                    stdout: `Started ${sandbox.name.value}.`,
                    stderr: ''
                }))
        )
}

const configureTezosClient = (sandbox: Sandbox, opts: Opts) =>
    retry(
        () => getArch()
                .then(arch => getConfigureCommand(sandbox, getDockerImage(), opts, arch))
                .then(execCmd)
    )


const importAccounts = (sandbox: Sandbox, opts: Opts) =>
    retry(
        () => getArch()
                .then(arch => getImportAccountsCommand(sandbox, getDockerImage(), opts, arch))
                .then(execCmd)
    )

const startAll = (sandboxes: Sandbox[], opts: Opts): Promise<ProxyAction> => {
    if (!sandboxes.length) return Promise.resolve({
        status: 'failed',
        stdout: "",
        stderr: "No sandboxes configured to start"
    })

    const jobs = 
        sandboxes
        .filter(sandbox => doesUseFlextesa(sandbox))
        .map(startInstance(opts))

    const initialResponse: ProxyAction = {
        status: 'success',
        stdout: '',
        stderr: ''
    }

    return Promise.all(jobs)
        .then(results => results.reduce(
            (retval, result: ProxyAction) => ({
                ...retval,
                status: retval.status === 'failed'
                    ? 'failed'
                    : result.status,
                stdout: result.stdout
                    ? retval.stdout + `\n${result.stdout}`
                    : retval.stdout,
                stderr: result.stderr.length
                ? retval.stderr + `\n${result.stderr}`
                : retval.stderr,
            }),
            initialResponse
    ))
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

const startSandboxTask = <T>(parsedArgs: Opts) : LikeAPromise<ActionResponse, Failure<T>> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        return sandbox
            ? startInstance (parsedArgs) (sandbox)
            : Promise.resolve({
                status: "failed",
                stdout: "",
                stderr: `There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`
            })
    }
    return startAll(getSandboxes(parsedArgs), parsedArgs)
}



const isSandboxRunning = (sandboxName: string) =>
    execCmd(`docker ps --filter name=${sandboxName} | grep -w ${sandboxName}`)
    .then(res => res.status !== 'failed')


const getAccountBalances =(sandbox: Sandbox): Promise<ProxyAction> => {
    const processes = Object.entries(sandbox.accounts).reduce(
        (retval: Promise<unknown>[], [accountName, _accountDetails]) => {
            if (accountName === 'default') return retval

            const getBalanceProcess =
                getArch()
                .then(arch => `docker exec --platform ${arch} ${sandbox.name} tezos-client get balance for ${accountName.trim()}`)
                .then(execCmd)
                .then(result => result.status === 'success'
                    ? ({account: accountName, balance: result.stdout})
                    : Promise.reject({code: 'E_BALANCE', context: [accountName, result]})
                )
            return [...retval, getBalanceProcess]
        },
        []
    )

    return Promise.all(processes)
    .then(balances => ({
        status: 'success',
        stdout: balances,
        stderr: '',
        render: 'table'
    }))
}    


const listAccountsTask = async <T>(parsedArgs: Opts) : LikeAPromise<ActionResponse, Failure<T>> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(sandbox.name.value)
                ? getAccountBalances(sandbox)
                : Promise.resolve({
                    status: 'failed',
                    stderr: `The ${sandbox.name} sandbox is not running.`,
                    stdout: ''
                })
            }
            return Promise.resolve({
                status: 'failed',
                stdout: '',
                stderr: `Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`
            })
        }
        return Promise.resolve({
            status: 'failed',
            stdout: '',
            stderr: `There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`
        })

    }
    return Promise.resolve({
        status: "failed",
        stdout: "",
        stderr: `No sandbox specified`
    })
}

const stopSandboxTask = async <T>(parsedArgs: Opts) : LikeAPromise<ActionResponse, Failure<T>> => {
    if (parsedArgs.sandboxName) {
        const sandbox = getSandbox(parsedArgs)
        if (sandbox) {
            if (doesUseFlextesa(sandbox)) {
                return await isSandboxRunning(sandbox.name.value)
                ? execCmd(`docker kill ${sandbox.name}`)
                .then(result => ({...result, stdout: `Stopped ${sandbox.name.value}.`}))
                //   .then(() => execCmd(`docker rm ${sandbox.name}`))
                : Promise.resolve({
                    status: 'success',
                    stdout: `The ${sandbox.name} sandbox was not running.`,
                    stderr: ''
                })
            }
            return Promise.resolve({
                status: 'failed',
                stdout: '',
                stderr: `Cannot start ${sandbox.label} as its configured to use the ${sandbox.plugin} plugin.`
            })
        }
        return Promise.resolve({
            status: 'failed',
            stdout: '',
            stderr: `There is no sandbox configuration with the name ${parsedArgs.sandboxName}.`
        })

    }
    return Promise.resolve({
        status: "failed",
        stdout: "",
        stderr: `No sandbox specified`
    })
}

export const proxy = <T>(parsedArgs: Opts) : LikeAPromise<ActionResponse, Failure<T>> => {
    switch (parsedArgs.task) {
        case 'list accounts':
            return listAccountsTask(parsedArgs)
        case 'start sandbox':
            return startSandboxTask(parsedArgs)
        case 'stop sandbox':
            return stopSandboxTask(parsedArgs)
        default:
            return Promise.reject({
                errorCode: 'E_INVALID_TASK',
                errorMsg: `${parsedArgs.task} is not an understand task by the SmartPy plugin`,
                context: parsedArgs
            })
    }
}

export default proxy