import { SanitizedArgs, ActionResponse, Failure, LikeAPromise, ProxyAction } from "taqueria-sdk/types";
import glob from 'fast-glob'
import { join } from 'path'
import { generateContractTypesProcessContractFiles } from "./src/cli-process";

type PluginOpts = {
    // TODO: Document these
    typescriptDir: string,
    typeAliasMode?: 'local' | 'file' | 'library' | 'simple',
};
type Opts = SanitizedArgs & Record<string, unknown>;

const getContractAbspath = (contractFilename: string, parsedArgs: Opts) => 
    join(parsedArgs.artifactsDir, /\.tz$/.test(contractFilename) ? contractFilename : `${contractFilename}.tz`)


const generateContractTypes = (parsedArgs: Opts & PluginOpts) => async (contractFilename: string) : Promise<string> => {
    const contractAbspath = getContractAbspath(contractFilename, parsedArgs);
    await generateContractTypesProcessContractFiles({
        inputTzContractDirectory: parsedArgs.artifactsDir,
        inputFiles: [contractAbspath],
        outputTypescriptDirectory: parsedArgs.typescriptDir,
        format: 'tz',
        typeAliasMode: parsedArgs.typeAliasMode ?? 'file',
    });

    return `${contractFilename}: Types generated`;

    // TODO: Generate contract michelson
    // TODO: Generate types from michelson
    
    // throw new Error('Not Implemented');

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

const generateContractTypesAll = (parsedArgs: Opts & PluginOpts) : Promise<string[]> =>
    glob("**/*.tz", {cwd: parsedArgs.artifactsDir})
    .then(files => Promise.all(files.map(generateContractTypes(parsedArgs))))

export const generateTypes = <T>(parsedArgs: Opts): LikeAPromise<ActionResponse, Failure<T>> => {
    if(!parsedArgs.typescriptDir){
        return Promise.reject({
            status: 'failed',
            stderr: `No typescriptDir configured`,
            stdout: ""
        });
    }

    // WORKAROUND: Redirect console.log
    const strOutLog = [] as string[];
    const consoleLogOrig = console.log;
    console.log = (message:string, data?:unknown) => {
        strOutLog.push(`${message}${data?`\n${JSON.stringify(data,null,2)}`:''}`);
    }
    console.log('generateTypes', { 
        typescriptDir: parsedArgs.typescriptDir
    });

    // console.log = consoleLogOrig;
    // return Promise.resolve({
    //     status: 'success',
    //     stdout: `${strOutLog.join('\n')}`,
    //     stderr: ""
    // });

    const argsTyped = parsedArgs as Opts & PluginOpts;

    const p = argsTyped.contract
        ? generateContractTypes(argsTyped) (argsTyped.contract as string)
        : generateContractTypesAll(argsTyped)

    return p.then(data => {
        console.log = consoleLogOrig;
        return ({
            status: 'success',
            stdout: `${strOutLog.join('\n')}${Array.isArray(data) ? data.join("\n") : data}`,
            stderr: ""
        });
    })
}

export const tasks = {
    generateTypes,
} 