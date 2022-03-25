import { SanitizedArgs, PluginResponse, Failure, LikeAPromise } from "@taqueria/node-sdk/types";
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
}

const generateContractTypesAll = async (parsedArgs: Opts & PluginOpts) : Promise<string[]> => {
    const files = await glob("**/*.tz", {cwd: parsedArgs.artifactsDir});
    return await Promise.all(files.map(generateContractTypes(parsedArgs)));
}

export const generateTypes = <T>(parsedArgs: Opts): LikeAPromise<PluginResponse, Failure<T>> => {
    parsedArgs.typescriptDir = parsedArgs.typescriptDir || 'types';

    console.log('generateTypes', { 
        typescriptDir: parsedArgs.typescriptDir
    });

    const argsTyped = parsedArgs as Opts & PluginOpts;

    const p = argsTyped.contract
        ? generateContractTypes(argsTyped) (argsTyped.contract as string)
        : generateContractTypesAll(argsTyped)

    return p.then(data => {
        console.log(
            (Array.isArray(data))
            ? data.join("\n")
            : data
        )
    })
}

export const tasks = {
    generateTypes,
} 