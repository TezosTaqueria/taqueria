import { SanitizedArgs, PluginResponse, AccountDetails, Failure, LikeAPromise, Config, NetworkConfig, SandboxConfig} from "@taqueria/node-sdk/types";
import glob from 'fast-glob'
import {join} from 'path'
import { TezosToolkit } from '@taquito/taquito';
import {readFile} from 'fs/promises'
import { InMemorySigner, importKey } from '@taquito/signer';
import { sendAsyncJsonRes } from "@taqueria/node-sdk";

type Opts = SanitizedArgs & Record<string, unknown>

interface OriginationResult {
    contract: string
    address: string
    destination: string
}

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) => 
    join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)


const originateContractToSandbox = async (contractFilename: string, parsedArgs: Opts, storage: unknown, sandboxName: string, sandbox: SandboxConfig | undefined): LikeAPromise<OriginationResult, Failure<unknown>> => {
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
                    address: operation.contractAddress as string,
                    destination: sandboxName
                }))
                .catch(previous => Promise.reject({
                    errCode: "E_ORIGINATE",
                    errMsg: `Could not originate ${contractFilename} on the sandbox '${sandboxName}'`,
                    previous
                }))
            }
            else {
                return Promise.reject({
                    errCode: "E_INVALID_SANDBOX_ACCOUNT",
                    errMsg: `Please configure a default account for the ${sandboxName} to be used for origination.`,
                    context: sandbox
                })
            }
        }
        return Promise.reject({
            errCode: "E_INVALID_SANDBOX_URL",
            errMsg: 'The sandbox configuration is invalid and missing the RPC url',
            context: sandbox
        })
    }
    catch (err) {
        return Promise.reject({
            errCode: "E_ORIGINATE",
            errMsg: "An unexpected error occured when trying to originate a contract",
            previous: err
        })
    }
}

const originateContractToNetwork = async (contractFilename: string, parsedArgs: Opts, storage: unknown, networkName: string, network: NetworkConfig|undefined): LikeAPromise<OriginationResult, Failure<unknown>> => {
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
                    address: operation.contractAddress as string,
                    destination: networkName
                }))
                .catch(previous => Promise.reject({
                    errCode: "E_ORIGINATE",
                    errMsg: `Could not originate ${contractFilename} on the network '${networkName}'`,
                    previous
                }))
            }
            else {
                return Promise.reject({
                    errCode: "E_INVALID_NETWORK_FAUCET",
                    errMsg: `Please configure a faucet for the ${network} network to be used for origination.`,
                    context: network
                })
            }
        }
        return Promise.reject({
            errCode: "E_INVALID_NETWORK_URL",
            errMsg: 'The network configuration is invalid and missing the RPC url',
            context: network
        })
    }
    catch (err) {
        return Promise.reject({
            errCode: "E_ORIGINATE",
            errMsg: "An unexpected error occured when trying to originate a contract",
            previous: err
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
    if (sandbox.accounts && sandbox.accounts.default) {
        const accountName = (sandbox.accounts.default as string);
        const accountDetails = sandbox.accounts[accountName] as AccountDetails
        if (accountDetails.keys) return accountDetails.keys.secretKey.replace(/unencrypted:/, '')
    }

    return undefined        
}

const originateContract = (parsedArgs: Opts) => (contractFilename: string) => {
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
            errCode: "E_INVALID_ENV",
            errMsg: `No environment configured in your configuration file called ${parsedArgs.env}`,
            context: parsedArgs.config
        })    
    }

    if (!env.storage || !env.storage[contractFilename]) {
        return Promise.reject({
            errCode: "E_INVALID_STORAGE",
            errMsg: `No storage configured in your configuration file for ${contractFilename}`,
            context: env
        })
    }

    const networkProcesses = !env.networks ? [] : env.networks.reduce(
        (retval: LikeAPromise<OriginationResult, Failure<unknown>>[], network) => 
            getNetworkConfig(network, parsedArgs.config)
                ? [...retval, originateContractToNetwork(contractFilename, parsedArgs, env.storage[contractFilename], network, getNetworkConfig(network, parsedArgs.config))]
                : retval,
        []
    )

    const allProcesses = !env.sandboxes ? [] : env.sandboxes.reduce(
        (retval: LikeAPromise<OriginationResult, Failure<unknown>>[], sandbox) => getSandboxConfig(sandbox, parsedArgs.config)
            ? [...retval, originateContractToSandbox(contractFilename, parsedArgs, env.storage[contractFilename], sandbox, getSandboxConfig(sandbox, parsedArgs.config))]
            : retval            
        ,
        networkProcesses
    )
            
    return Promise.all(allProcesses)
}

const originateAll = (parsedArgs: Opts) =>
    glob("**/*.tz", {cwd: parsedArgs.artifactsDir})
    .then(files => Promise.all(files.map(originateContract(parsedArgs))))
    .then(results => results.flat(1))

export const originate = <T>(parsedArgs: Opts): LikeAPromise<PluginResponse, Failure<T>> => {
    const p = parsedArgs.contract
        ? originateContract(parsedArgs) (parsedArgs.contract as string)
        : originateAll(parsedArgs)

    return p.then(sendAsyncJsonRes)
}

export default originate