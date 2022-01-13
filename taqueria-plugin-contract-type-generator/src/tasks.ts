import { SanitizedArgs, ActionResponse, Failure, LikeAPromise, ProxyAction } from "taqueria-sdk/types";
import glob from 'fast-glob'
import {join} from 'path'
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner, importKey } from '@taquito/signer';
import {readFile} from 'fs/promises'

type Opts = SanitizedArgs & Record<string, unknown>

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) => 
    join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)


const generateContractTypes = (parsedArgs: Opts) => async (contractFilename: string) : Promise<string> => {
    const contractAbspath = getContractAbspath(contractFilename, parsedArgs)

    // TODO: Generate contract michelson
    // TODO: Generate types from michelson
    
    throw new Error('Not Implemented');

    // // TODO: Should getting the default environment be provided by the SDK or the framework?
    // const currentEnv = parsedArgs.env
    //     ? (parsedArgs.env as string)
    //     : (
    //         parsedArgs.config.environment
    //             ? parsedArgs.config.environment.default
    //             : 'development'
    //     )
    // const env = parsedArgs.config.environment && parsedArgs.config.environment[currentEnv]
    //         ? parsedArgs.config.environment[currentEnv]
    //         : undefined
            
    // // Has storage been provided for this contract?
    // if (env && env.storage) {
    //     try {
    //         const tezos = new TezosToolkit(env.rpcUrl)
    //         const contractData = await readFile(contractAbspath, "utf-8")

    //         // TODO: Generate contract michelson
    //         // TODO: Generate types from michelson

    //         throw new Error('Not Implemented');
    //         // await importKey(tezos, env.faucet.email, env.faucet.password, env.faucet.mnemonic.join(' '), env.faucet.activation_code)
    //         // return tezos.contract.originate({
    //         //     code: contractData,
    //         //     storage: env.storage[contractFilename]
    //         // })
    //         // .then(operation => `${contractFilename}: ${operation.contractAddress}`)
    //     }
    //     catch (err) {
    //         return Promise.reject({
    //             status: 'failed',
    //             stdout: "",
    //             stderr: err
    //         })
    //     }
    // }

    // return Promise.reject({
    //     status: 'failed',
    //     stderr: `No storage configured in your configuration file for ${contractFilename}`,
    //     stdout: ""
    // })
}

const generateContractTypesAll = (parsedArgs: Opts) : Promise<string[]> =>
    glob("**/*.tz", {cwd: parsedArgs.artifactsDir})
    .then(files => Promise.all(files.map(generateContractTypes(parsedArgs))))

export const generateTypes = <T>(parsedArgs: Opts): LikeAPromise<ActionResponse, Failure<T>> => {
    const p = parsedArgs.contract
        ? generateContractTypes(parsedArgs) (parsedArgs.contract as string)
        : generateContractTypesAll(parsedArgs)

    return p.then(data => ({
        status: 'success',
        stdout: Array.isArray(data) ? data.join("\n") : data,
        stderr: ""
    }))
}

export const tasks = {
    generateTypes,
} 