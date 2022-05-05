import * as SanitizedArgs from "./SanitizedArgs"
import * as SandboxAccount from "./SandboxAccount"
import * as SandboxConfig from "@taqueria/protocol/SandboxConfig"
import { writeJsonFile, Protocol } from '@taqueria/node-sdk'
import yargs, { parse } from 'yargs'
import {exec} from 'child_process'
import {execa} from 'execa'

// @ts-ignore - partial.lenses doesn't have corresponding @types
import * as L from 'partial.lenses'
import { Config, SandboxAccountConfig} from '@taqueria/protocol/taqueria-protocol-types'

type Args = ReturnType<typeof yargs> & {config: string, configure: boolean, importAccounts: boolean, sandbox: string}

interface Failure {
    kind: 'E_INVALID_CONFIG' | 'E_ACCOUNT_KEY' | 'E_EXEC',
    context: unknown
}

export const configureTezosClient = () => 
    run(`tezos-client --endpoint http://localhost:20000 config update`)


export const configureAccounts = (parsedArgs: SanitizedArgs.t) =>
    Object.entries(parsedArgs.config.accounts).reduce(
        async (lastConfig, [accountName, initialBalance]) => {
            const accountDetails = await addAccount(accountName)
            const config = (await lastConfig as SanitizedArgs.ParsedConfig)
            const updatedConfig = {...config} as SanitizedArgs.ParsedConfig
            const sandboxConfig = (updatedConfig.sandbox[parsedArgs.sandbox] as SandboxConfig.t)
            const accounts = sandboxConfig.accounts ?? {}
            accounts[accountName] = accountDetails;
            (updatedConfig.sandbox[parsedArgs.sandbox] as SandboxConfig.t).accounts = accounts
            return updatedConfig
        },
        Promise.resolve(parsedArgs.config)
    )
    .then(writeConfigFile(parsedArgs.configAbsPath))
    .then(config => ({...parsedArgs, config}) as SanitizedArgs.t)

export const startMininet = (parsedArgs: SanitizedArgs.t) => {
    const cmdArgs = [
        'mini-network',
        '--root /tmp/mini-box',
        '--size 1',
        '--number-of-b 1',
        '--set-history-mode N000:archive',
        '--time-b 5',
        // '--remove-default-bootstrap-accounts',
        ...getNoDaemonFlags(parsedArgs),
        ...getBootstrapFlags(parsedArgs),
        '--until-level 200_000_000',
        // TODO: Find a way of mapping protocol hash to protocol kind
        `--protocol-kind "Alpha"`
    ]

    return execa('flextesa', cmdArgs, {
        buffer: false,
        detached: false,
        shell: true,
        all: true
    }).all.pipe(process.stderr);
    // return run(cmdArgs.join(' '))
}


export const importAccounts = (opts: SanitizedArgs.t) => {
    const sandbox = opts.config.sandbox[opts.sandbox] as SandboxConfig.t
    const processes = Object.entries(sandbox.accounts).reduce(
        (retval, [accountName, accountDetails]) => {
            if (accountName === 'default') return retval
            const account = accountDetails as SandboxAccountConfig.t
            // const protocol = getSandboxProtocol(opts)
            const protocol = "ProtoALphaAL"
            return [
                ...retval,
                run(`tezos-client --protocol ${protocol} import secret key ${accountName} ${account.secretKey} --force | tee /tmp/import-key.log`)
            ]
        },
        []
    )
    return Promise.all(processes) as Promise<string[]>
}
        

const writeConfigFile = (filename: string) => (config: SanitizedArgs.ParsedConfig) =>
    writeJsonFile(filename) (config)
    .then(() => config)
    .catch(err => Promise.reject({kind: 'E_WRITE_CONFIG', context: config, previous: err}))

const run = (cmd: string): Promise<string> => new Promise((resolve, reject) => exec(`flextesa_node_cors_origin='*' ${cmd}`, (err, stdout, stderr) => {
    if (stderr.length) console.error(stderr)
    if (err) reject({kind: 'E_EXEC', context: cmd, previous: err})
    else resolve(stdout)
}))


const addAccount = (accountName: string): Promise<SandboxAccount.t> => 
    run(`flextesa key ${accountName}`)
    .then((result: string) => {
        const [alias, encryptedKey, publicKeyHash, secretKey] = result.trim().split(',')
        return SandboxAccount.make({alias, encryptedKey, publicKeyHash, secretKey})
    })

const getBootstrapFlags = (parsedArgs: SanitizedArgs.t) => {
    const sandboxConfig = (parsedArgs.config.sandbox[parsedArgs.sandbox] as SandboxConfig.t)
    return Object.entries(sandboxConfig.accounts).reduce(
        (retval, [accountName, accountDetails]) => {
            if (typeof accountDetails === 'string') return retval
            const account = accountDetails as SandboxAccountConfig.t
            const initialBalance = parsedArgs.config.accounts[accountName]
            return [...retval, `--add-bootstrap-account="${accountName},${account.encryptedKey},${account.publicKeyHash},${account.secretKey}@${initialBalance}"`]
        },
        []
    )
}

const getNoDaemonFlags = (parsedArgs: SanitizedArgs.t) => {
    const sandboxConfig = parsedArgs.config.sandbox[parsedArgs.sandbox] as SandboxConfig.t
    return Object.entries(sandboxConfig.accounts).reduce(
        (retval, [accountName, _]) => {
            if (accountName === 'default') return retval;
            return [
                ...retval,
                `--no-daemons-for=${accountName}`
            ]
        },
        []
    )
}

const getSandboxProtocol = (parsedArgs: SanitizedArgs.t) => {
    const sandboxConfig = parsedArgs.config.sandbox[parsedArgs.sandbox] as SandboxConfig.t
    return sandboxConfig.protocol
}
  