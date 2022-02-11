import { writeJsonFile, readJsonFile } from '@taqueria/node-sdk'
import yargs from 'yargs'
import {exec} from 'child_process'
import retry from 'promise-retry'

// @ts-ignore - partial.lenses doesn't have corresponding @types
import * as L from 'partial.lenses'

type Args = ReturnType<typeof yargs> & {config: string, configure: boolean, importAccounts: boolean, sandbox: string}

interface Failure {
    kind: 'E_INVALID_CONFIG' | 'E_ACCOUNT_KEY' | 'E_EXEC',
    context: unknown
}

interface AccountKeys {
    alias: string
    encryptedKey: string
    publicKey: string
    secretKey: string
}

interface AccountDetailsInput {
    readonly initialBalance?: string,
    keys?: AccountKeys
}

interface AccountDetails {
    readonly initialBalance: string,
}

interface AccountDetailsWithKey extends AccountDetails{
    readonly keys: AccountKeys
}

type Accounts  = Record<string, AccountDetails>

type AccountsInput = Record<string, AccountDetailsInput|string>

interface SandboxSettingsInput {
    readonly label?: string
    readonly rpcUrl?: string
    readonly protocol?: string
    readonly accounts?: AccountsInput
}

interface SandboxSettings {
    label: string
    readonly rpcUrl: string
    readonly protocol: string
    readonly accounts: Accounts 
}

type Sandboxes = Record<string, SandboxSettings>

type SandboxesInput = Record<string, SandboxSettingsInput>

interface Config {
    readonly sandbox: Sandboxes
}

interface ConfigInput {
    readonly sandbox?: SandboxesInput
}

const writeConfigFile = (filename: string) => (config: Config) =>
    writeJsonFile(filename) (config)
    .then(() => config)
    .catch(err => Promise.reject({kind: 'E_WRITE_CONFIG', context: config, previous: err}))

const run = (cmd: string): Promise<string> => new Promise((resolve, reject) => exec(`flextesa_node_cors_origin='*' ${cmd}`, (err, stdout, stderr) => {
    if (err) reject({kind: 'E_EXEC', context: cmd, previous: err})
    else if (stderr.length) reject({kind: 'E_EXEC', context: {cmd, stderr}})
    else resolve(stdout)
}))

const parseConfig = (input: ConfigInput) => {
    const parseAccountDetails = (input: AccountDetailsInput): AccountDetails | null => {
        if (typeof input.initialBalance === 'string' && /^(\d+_?\d+)+/.test(input.initialBalance)) {
            return {
                initialBalance: input.initialBalance
            }
        }
        return null
    }


    const parseAccounts = (input: AccountsInput): Accounts | null => Object.entries(input).reduce(
        (retval, [accountName, accountDetailsInput]) => {
            if (typeof(accountDetailsInput) !== 'string') {
                const temp: Record<string, (null|AccountDetails)> = {}
                temp[accountName] = parseAccountDetails(accountDetailsInput)
                return temp[accountName]
                    ? {...retval, ...temp}
                    : retval
            }
            else {
                return {...retval, default: accountDetailsInput}
            }
        },
        {}
    )


    const parseUrl = (input:string) => {
        try {
            new URL(input)
            return input
        }
        catch (_) {
            return false
        }
    }


    const parseString = (input:string) => typeof input === 'string' && input.length >= 1

    const parseSandboxSettings = (input: SandboxSettingsInput) : SandboxSettings | null  => {
        if (input.label && parseString(input.label) && input.protocol && parseString(input.protocol)) {
            if (input.rpcUrl && parseUrl(input.rpcUrl) && input.accounts) {
                const accounts = parseAccounts(input.accounts)
                return accounts
                    ? {accounts, label: input.label, protocol: input.protocol, rpcUrl: input.rpcUrl}
                    : null
            }
        }
        return null
    }   


    const parseSandboxes = (input: SandboxesInput): Sandboxes | undefined => Object.entries(input).reduce(
        (retval: Sandboxes | undefined, input: [string, SandboxSettingsInput]) => {
            const [sandboxName, settingsInput] = (input as [string, SandboxSettingsInput])
            if (sandboxName !== 'default') {
                const temp: Record<string, (null|SandboxSettings)> = {}
                temp[sandboxName] = parseSandboxSettings(settingsInput)
                return temp[sandboxName] !== undefined
                    ? {...retval, ...temp} as Sandboxes
                    : retval
            }
        },
        {} as Sandboxes
    )


    if (input.sandbox) {
        const sandboxes = parseSandboxes(input.sandbox)
        if (sandboxes) return Promise.resolve({...input, sandbox: sandboxes})
            
    }
    return Promise.reject({kind: 'E_INVALID_CONFIG', context: input})
}


const getAccountKeys = (accountName: string): Promise<AccountKeys> => 
    run(`flextesa key ${accountName}`)
    .then((result: string) => {
        const [alias, encryptedKey, publicKey, secretKey] = result.trim().split(',')
        return {alias, encryptedKey, publicKey, secretKey}
    })

const addAccountKeys = async ([accountName, accountDetails]: [string, AccountDetails]) => {
    return [
        accountName,
        accountName === 'default'
            ? accountDetails
            : {...accountDetails, keys: await getAccountKeys(accountName)}
    ]
}

const getBootstrapFlags = (sandboxName: string, config:Config) => {
    const lens = L.compose(
        'sandbox',
        sandboxName,
        'accounts',
        L.values,
    )

    return L.collect(lens, config)
        .reduce(
            (retval: string[], accountDetails: AccountDetailsWithKey | string) => {
                if (typeof accountDetails === 'string') {
                    return retval
                }
                const {keys, initialBalance} = accountDetails
                return [
                    ...retval,
                    `--add-bootstrap-account="${keys.alias},${keys.encryptedKey},${keys.publicKey},${keys.secretKey}@${initialBalance}"`
                ]
            },
            []
        )
        .join(' ')
}

const getNoDaemonFlags = (sandboxName: string, config:Config) => {
    const lens = L.compose(
        'sandbox',
        sandboxName,
        'accounts',
        L.keys
    )

    return L.collect(lens, config)
        .map((alias:string) => `--no-daemons-for=${alias}`)
        .join(' ')
}

const getSandboxProtocol = (sandboxName: string, config: Config) => {
    const lens = L.compose(
        'sandbox',
        sandboxName,
        'protocol'
    )
    
    // TODO - This shouldn't be here.
    // A plugin should provide a list of protocols to Taqueria, and
    // Taqueria should make that list known to any plugins that require
    // the list.
    switch (L.get(lens, config)) {
        case 'PsiThaCaT47Zboaw71QWScM8sXeMM7bbQFncK9FLqYc6EKdpjVP':
            return 'Ithaca'
        case 'PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx':
            return 'Hangzhou'
        case 'PtGRANADsDU8R9daYKAgWnQYAJ64omN1o3KMGVCykShA97vQbvV':
            return 'Granada'
        default:
            return 'Alpha'
    }
}

const runMininet = (sandboxName: string) => (config: Config) => {
    const cmdArgs = [
        'flextesa',
        'mini-network',
        '--root /tmp/mini-box',
        '--size 1',
        '--number-of-b 1',
        '--set-history-mode N000:archive',
        '--time-b 5',
        '--balance-of-bootstrap-accounts tez:100_000_000',
        getNoDaemonFlags(sandboxName, config),
        getBootstrapFlags(sandboxName, config),
        // '--until-level 200_000_000',
        `--protocol-kind "${getSandboxProtocol(sandboxName, config)}"`
    ]
    return run(cmdArgs.join(' '))
}


const configureTezosClient = (config: Config) => 
    run(`tezos-client --endpoint http://localhost:20000 config update`)
    .then(() => config)

const importAccounts = (sandboxName: string, config: Config) => {
    const accountLens = L.compose(
        'sandbox',
        sandboxName,
        'accounts',
        L.values,
        'keys'
    )

    const processes = L.collect(accountLens, config)
    .reduce(
        (retval: Promise<string>[], keys: AccountKeys) => 
            [
                ...retval,
                retry(() =>
                    isAccountImported(keys.alias)
                    .then(hasAccount => hasAccount
                        ? Promise.resolve('success')
                        : run(`tezos-client --protocol ${config.sandbox[sandboxName].protocol} import secret key ${keys.alias} ${keys.secretKey} --force | tee /tmp/import-key.log`)
                    )
                )
            ],
        []
    )

    return Promise.all(processes)
    .then(() => config)
}


const isAccountImported = (accountName: string) =>
    run(`tezos-client list known accounts`)
    .then(output => output.indexOf(accountName) >= 0)
    .catch(() => false)
    

/**** Program Execution Starts Here */
// @ts-ignore
const inputArgs: Args = (yargs(process.argv) as unknown as Args)
.option('config', {
    default: "/project/.taq/config.json"
})
.option('sandbox', {
    default: ''
})
.option('configure', {
    default: false,
    boolean: true
})
.option('importAccounts', {
    default: false,
    boolean: true
})
.parse()

if (!inputArgs.sandbox.length) {
    console.log({kind: 'E_INVALID_USAGE', context: inputArgs})
    process.exit(-1)
}

readJsonFile<ConfigInput>(inputArgs.config)
.then(parseConfig)
.then((config: Config) => {
    const lens = L.compose(
        'sandbox',
        inputArgs.sandbox,
        'accounts',
        L.entries
    )

    return L.modifyAsync(lens, addAccountKeys, config)
})
.then(writeConfigFile(inputArgs.config))
.then(config => { 
    if (inputArgs.configure)
        return configureTezosClient(config)
    else if (inputArgs.importAccounts)
        return importAccounts(inputArgs.sandbox, config)
    else
        return runMininet(inputArgs.sandbox) (config).then(() => config)
})
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
    process.exit(-1)
})