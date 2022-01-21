import { SanitizedArgs, ActionResponse, Failure, LikeAPromise, Config, NetworkConfig, SandboxConfig, ProxyAction} from "taqueria-sdk/types";
import glob from 'fast-glob'
import {join} from 'path'
import { TezosToolkit } from '@taquito/taquito';
import {readFile} from 'fs/promises'
import { InMemorySigner, importKey } from '@taquito/signer';

type Opts = SanitizedArgs & Record<string, unknown>

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) => 
    join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)


const originateContractToSandbox = async (contractFilename: string, parsedArgs: Opts, storage: unknown, sandboxName: string, sandbox: SandboxConfig | undefined) => {
    try {
        if (sandbox && sandbox.rpcUrl) {
            const contractAbspath = getContractAbspath(contractFilename, parsedArgs)
            const tezos = new TezosToolkit(sandbox.rpcUrl)
            const secretKey = getAccountSecretKey(sandbox)
            if (secretKey) {
                tezos.setProvider({
                    signer: new InMemorySigner(secretKey),
                });

                const contractData = await readFile(contractAbspath, "utf-8")
                return tezos.contract.originate({
                    code: contractData,
                    storage: storage
                })
                .then(operation => ({
                    contract: contractFilename,
                    address: operation.contractAddress,
                    destination: sandboxName
                }))
            }
            else {
                return Promise.reject({
                    status: 'failed',
                    stdout: '',
                    stderr: `Please configure a default account for the ${sandboxName} to be used for origination.`
                })
            }
        }
        return Promise.reject({
            status: 'failed',
            stderr: 'The sandbox configuration is invalid and missing the RPC url',
            stdout: ''
        })
    }
    catch (err) {
        return Promise.reject({
            status: 'failed',
            stdout: "",
            stderr: err
        })
    }
}

const originateContractToNetwork = async (contractFilename: string, parsedArgs: Opts, storage: unknown, networkName: string, network: NetworkConfig|undefined) => {
    try {
        if (network && network.rpcUrl) {
            const contractAbspath = getContractAbspath(contractFilename, parsedArgs)
            const tezos = new TezosToolkit(network.rpcUrl)
            if (network.faucet) {
                await importKey(tezos, network.faucet.email, network.faucet.password, network.faucet.mnemonic.join(' '), network.faucet.activation_code)

                const contractData = await readFile(contractAbspath, "utf-8")
                return tezos.contract.originate({
                    code: contractData,
                    storage: storage
                })
                .then(operation => ({
                    contract: contractFilename,
                    address: operation.contractAddress,
                    destination: networkName
                }))
            }
            else {
                return Promise.reject({
                    status: 'failed',
                    stdout: '',
                    stderr: `Please configure a faucet for the ${network} network to be used for origination.`
                })
            }
        }
        return Promise.reject({
            status: 'failed',
            stderr: 'The network configuration is invalid and missing the RPC url',
            stdout: ''
        })
    }
    catch (err) {
        return Promise.reject({
            status: 'failed',
            stdout: "",
            stderr: err
        })
    }
}

const getNetworkConfig = (networkName: string, config: Config) => {
    return !config.network[networkName]
        ? undefined
        : config.network[networkName]
}

const getSandboxConfig = (sandboxName: string, config: Config) => {
    return !config.sandbox[sandboxName]
    ? undefined
    : config.sandbox[sandboxName]
}

const getAccountSecretKey = (sandbox: SandboxConfig) => {
    return sandbox.accounts && 
        sandbox.accounts.default &&
        sandbox.accounts[sandbox.accounts.default] &&
        sandbox.accounts[sandbox.accounts.default].keys &&
        sandbox.accounts[sandbox.accounts.default].keys?.secretKey.replace(/unencrypted:/, '')
        
}

const originateContract = (parsedArgs: Opts) => (contractFilename: string) : Promise<unknown[]> => {
    // TODO: Should getting the default environment be provided by the SDK or the framework?
    const currentEnv = parsedArgs.env
        ? (parsedArgs.env as string)
        : (
            parsedArgs.config.environment
                ? parsedArgs.config.environment.default
                : 'development'
        )
    const env = parsedArgs.config.environment && parsedArgs.config.environment[currentEnv]
            ? parsedArgs.config.environment[currentEnv]
            : undefined

    if (!env) {
        return Promise.reject({
            status: 'failed',
            stderr: `No environment configured in your configuration file called ${parsedArgs.env}`,
            stdout: ""
        })    
    }

    if (!env.storage || !env.storage[contractFilename]) {
        return Promise.reject({
            status: 'failed',
            stderr: `No storage configured in your configuration file for ${contractFilename}`,
            stdout: ""
        })
    }

    const networkProcesses = !env.networks ? [] : env.networks.reduce(
        (retval: Promise<unknown>[], network) => 
            getNetworkConfig(network, parsedArgs.config)
                ? [...retval, originateContractToNetwork(contractFilename, parsedArgs, env.storage[contractFilename], network, getNetworkConfig(network, parsedArgs.config))]
                : retval,
        []
    )

    const allProcesses = !env.sandboxes ? [] : env.sandboxes.reduce(
        (retval: Promise<unknown>[], sandbox) => getSandboxConfig(sandbox, parsedArgs.config)
            ? [...retval, originateContractToSandbox(contractFilename, parsedArgs, env.storage[contractFilename], sandbox, getSandboxConfig(sandbox, parsedArgs.config))]
            : retval            
        ,
        networkProcesses
    )
            
    return Promise.all(allProcesses)
}

const originateAll = (parsedArgs: Opts) : Promise<unknown[]> =>
    glob("**/*.tz", {cwd: parsedArgs.artifactsDir})
    .then(files => Promise.all(files.map(originateContract(parsedArgs))))
    .then(results => results.flat(1))

export const originate = <T>(parsedArgs: Opts): LikeAPromise<ActionResponse, Failure<T>> => {
    const p = parsedArgs.contract
        ? originateContract(parsedArgs) (parsedArgs.contract as string)
        : originateAll(parsedArgs)

    return p.then(data => ({
        status: 'success',
        stdout: data,
        stderr: "",
        render: 'table'
    }))
}

export default originate