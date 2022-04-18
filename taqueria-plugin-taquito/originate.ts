import { SanitizedArgs, PluginResponse, AccountDetails, Failure, LikeAPromise, Config, NetworkConfig, SandboxConfig, EnvironmentConfig} from "@taqueria/node-sdk/types";
import glob from 'fast-glob'
import {join} from 'path'
import { TezosToolkit, OriginateParams, WalletOperationBatch } from '@taquito/taquito';
import {readFile} from 'fs/promises'
import { InMemorySigner, importKey } from '@taquito/signer';
import { sendAsyncJsonRes, getCurrentEnvironmentConfig, getNetworkConfig, getSandboxAccountConfig, getInitialStorage, sendErr, getSandboxConfig, getDefaultAccount } from "@taqueria/node-sdk";
import { BatchWalletOperation } from "@taquito/taquito/dist/types/wallet/batch-operation";

type Opts = SanitizedArgs & Record<string, unknown>

interface OriginationResult {
    contract: string
    address: string
    destination: string
}

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) => 
    join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)

const addOrigination = (parsedArgs: Opts, batch: Promise<WalletOperationBatch>) => async (contractFilename: string) => {
    const contractAbspath = getContractAbspath(contractFilename, parsedArgs)
    const contractData = await readFile(contractAbspath, "utf-8")

    const initialStorage = getInitialStorage(parsedArgs) (contractFilename)
    if (initialStorage) {
        return (await batch).withOrigination({
            code: contractData,
            storage: initialStorage,
            
        })
    }

    sendErr(`No initial storage value found for ${contractFilename}`)
    return await batch
}

const originateToNetworks = (parsedArgs: Opts, currentEnv: EnvironmentConfig) =>
    currentEnv.networks
        ? currentEnv.networks.reduce(
            (retval, networkName) => {
                debugger
                const network = getNetworkConfig (parsedArgs) (networkName)
                if (network.rpcUrl) {
                    if (network.faucet) {
                        const result = (async () => {
                            const tezos = new TezosToolkit(network.rpcUrl as string)
                            await importKey(tezos, network.faucet.email, network.faucet.password, network.faucet.mnemonic.join(' '), network.faucet.activation_code)
    
                            const contracts = parsedArgs.contract
                                ? [parsedArgs.contract as string]
                                : (await glob("**/*.tz", {cwd: parsedArgs.artifactsDir})) as string[]
    
                            const batch = await contracts.reduce(
                                (batch, contractFilename) => addOrigination(parsedArgs, batch) (contractFilename),
                                Promise.resolve(tezos.wallet.batch())
                            )
                            
                            try {
                                const op = await batch.send()
                                const confirmed = await op.confirmation()
                                return op
                            }
                            catch (err) {
                                return undefined
                            }
                        })()

                        return [...retval, result]
                    }
                    else sendErr(`Network ${networkName} requires a valid faucet`)
                }
                else sendErr(`Network "${networkName} is missing an RPC url"`)
                return retval
            },
            [] as  Promise<BatchWalletOperation|undefined>[]
        )
        : []

const originateToSandboxes = (parsedArgs: Opts, currentEnv: EnvironmentConfig) =>
    currentEnv.sandboxes
        ? currentEnv.sandboxes.reduce(
            (retval, sandboxName) => {
                debugger
                const sandbox = getSandboxConfig (parsedArgs) (sandboxName)
                if (sandbox.rpcUrl) {
                    const secretKey = getDefaultAccount(parsedArgs) (sandboxName) ?.keys?.secretKey
                    if (secretKey) {
                        const result = (async () => {
                            const tezos = new TezosToolkit(sandbox.rpcUrl as string)
                            tezos.setProvider({
                                signer: new InMemorySigner(secretKey.replace(/^unencrypted:/, '')),
                            });
    
                            const contracts = parsedArgs.contract
                                ? [parsedArgs.contract as string]
                                : (await glob("**/*.tz", {cwd: parsedArgs.artifactsDir})) as string[]
    
                            const batch = await contracts.reduce(
                                (batch, contractFilename) => addOrigination(parsedArgs, batch) (contractFilename),
                                Promise.resolve(tezos.wallet.batch())
                            )
                            try {
                                const op = await batch.send()
                                debugger
                                const confirmed = await op.confirmation()
                                return op
                            }
                            catch (err) {
                                return undefined
                            }
                        })()
                        
                        return [...retval, result]
                    }
                    else sendErr(`Sandbox ${sandboxName}'s default account is missing keys`)
                }
                else sendErr(`Sandbox "${sandboxName} is missing an RPC url"`)

                return retval
            },
            [] as Promise<BatchWalletOperation|undefined>[]
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

    return Promise.all(jobs).then(console.log)
}

export default originate