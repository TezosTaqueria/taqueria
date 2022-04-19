import { SanitizedArgs, PluginResponse, AccountDetails, Failure, LikeAPromise, Config, NetworkConfig, SandboxConfig, EnvironmentConfig} from "@taqueria/node-sdk/types";
import glob from 'fast-glob'
import {join} from 'path'
import { TezosToolkit, OriginateParams, WalletOperationBatch } from '@taquito/taquito';
import {readFile} from 'fs/promises'
import { InMemorySigner, importKey } from '@taquito/signer';
import { sendAsyncJsonRes, getCurrentEnvironmentConfig, getNetworkConfig, getSandboxAccountConfig, getInitialStorage, sendErr, getSandboxConfig, getDefaultAccount, sendJsonRes } from "@taqueria/node-sdk";
import { BatchWalletOperation } from "@taquito/taquito/dist/types/wallet/batch-operation";
import { OperationContentsAndResultOrigination } from "@taquito/rpc";

type Opts = SanitizedArgs & Record<string, unknown>

interface ContractStorageMapping {
    filename: string,
    storage?: unknown
}

interface OriginationResult {
    contract: string
    address: string
    destination: string
}

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) => 
    join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)

const addOrigination = (parsedArgs: Opts, batch: Promise<WalletOperationBatch>) => async (mapping: ContractStorageMapping) => {
    const contractAbspath = getContractAbspath(mapping.filename, parsedArgs)
    const contractData = await readFile(contractAbspath, "utf-8")
    return (await batch).withOrigination({
        code: contractData,
        storage: mapping.storage,
        
    })
}

const getValidContracts = async (parsedArgs: Opts) => {
    const contracts = parsedArgs.contract
        ? [parsedArgs.contract as string]
        : (await glob("**/*.tz", {cwd: parsedArgs.artifactsDir})) as string[]
    
    return contracts.reduce(
        (retval, filename) => {
            const storage = getInitialStorage(parsedArgs) (filename)
            if (!storage) sendErr(`No initial storage provided for ${filename}`)
            return [...retval, {filename, storage}]
        },
        [] as ContractStorageMapping[]
    )    
}

const mapOpToContract = async (contracts: ContractStorageMapping[], op: BatchWalletOperation, destination: string) => {
    debugger
    const results = await op.operationResults()

    return contracts.reduce(
        (retval, contract) => {

            // If initial storage was provided for the contract
            // then we submitted an operation to originate that contract
            if (contract.storage) {
                const result = results.pop() as OperationContentsAndResultOrigination
                const address = result && result.metadata.operation_result.originated_contracts
                    ? result.metadata.operation_result.originated_contracts.join(',')
                    : 'Error'

                return [
                    ...retval, {
                        contract: contract.filename,
                        address,
                        destination
                    }
                ]
            }

            return [
                ...retval, {
                    contract: contract.filename,
                    address: "Error",
                    destination
                }
            ]
        },
        [] as OriginationResult[]
    )
}


const createBatch = async (parsedArgs: Opts, tezos: TezosToolkit, destination: string) => {
    const contracts = await getValidContracts (parsedArgs)                                
    
    const batch = await contracts.reduce(
        (batch, contractMapping) => 
            contractMapping.storage
                ? addOrigination(parsedArgs, batch) (contractMapping)
                : batch,
        Promise.resolve(tezos.wallet.batch())
    )
    
    try {
        debugger
        const op = await batch.send()
        const confirmed = await op.confirmation()
        return await mapOpToContract(contracts, op, destination)
    }
    catch (err) {
        return undefined
    }
}

const originateToNetworks = (parsedArgs: Opts, currentEnv: EnvironmentConfig) =>
    currentEnv.networks
        ? currentEnv.networks.reduce(
            (retval, networkName) => {
                const network = getNetworkConfig (parsedArgs) (networkName)
                if (network.rpcUrl) {
                    if (network.faucet) {
                        const result = (async () => {
                            const tezos = new TezosToolkit(network.rpcUrl as string)
                            await importKey(tezos, network.faucet.email, network.faucet.password, network.faucet.mnemonic.join(' '), network.faucet.activation_code)
                            return await createBatch(parsedArgs, tezos, networkName)
                        })()

                        return [...retval, result]
                    }
                    else sendErr(`Network ${networkName} requires a valid faucet`)
                }
                else sendErr(`Network "${networkName} is missing an RPC url"`)
                return retval
            },
            [] as  Promise<OriginationResult[]|undefined>[]
        )
        : []

const originateToSandboxes = (parsedArgs: Opts, currentEnv: EnvironmentConfig) =>
    currentEnv.sandboxes
        ? currentEnv.sandboxes.reduce(
            (retval, sandboxName) => {
                const sandbox = getSandboxConfig (parsedArgs) (sandboxName)
                if (sandbox.rpcUrl) {
                    const secretKey = getDefaultAccount(parsedArgs) (sandboxName) ?.keys?.secretKey
                    if (secretKey) {
                        const result = (async () => {
                            const tezos = new TezosToolkit(sandbox.rpcUrl as string)
                            tezos.setProvider({
                                signer: new InMemorySigner(secretKey.replace(/^unencrypted:/, '')),
                            });
                            return await createBatch(parsedArgs, tezos, sandboxName)
                        })()
                        
                        return [...retval, result]
                    }
                    else sendErr(`Sandbox ${sandboxName}'s default account is missing keys`)
                }
                else sendErr(`Sandbox "${sandboxName} is missing an RPC url"`)

                return retval
            },
            [] as Promise<OriginationResult[]|undefined>[]
        )
        : []
    
    

export const originate = <T>(parsedArgs: Opts): LikeAPromise<PluginResponse, Failure<T>> => {
    const env = getCurrentEnvironmentConfig(parsedArgs)

    if (!env) {
        return Promise.reject({
            errCode: "E_INVALID_ENV",
            errMsg: `No environment configured in your configuration file called ${parsedArgs.env}`,
            context: parsedArgs.config
        })    
    }

    const jobs = [
        ...originateToNetworks(parsedArgs, env),
        ...originateToSandboxes(parsedArgs, env)
    ]

    return Promise.all(jobs)
        .then(jobs => jobs.reduce(
            (retval, originations) => {
                return originations
                    ? [...retval as OriginationResult[], ...originations]
                    : retval
            },
            []
        ))
        .then(results => results && results.length > 0 ? sendJsonRes(results): sendErr(`No contract found`))
}

export default originate