import { SanitizedArgs, PluginResponse, Failure, LikeAPromise} from "@taqueria/node-sdk/types";
import { execCmd, sendAsyncJsonRes, sendErr } from "@taqueria/node-sdk";
import {exec} from 'child_process'
import glob from 'fast-glob'
import {join, basename} from 'path'
import {readFile} from 'fs/promises'

type Opts = SanitizedArgs & Record<string, unknown>

const getArtifacts = (sourceAbspath: string) => {
    return readFile(sourceAbspath, {encoding: "utf-8"})
    .then((source: string) => {
        const pattern = new RegExp(/add_compilation_target\s*\(\s*(['"])([^'"]+)\1/, "mg")
        const results = source.matchAll(pattern)
        return results
            ? Array.from(results).map(match => match[2])
            : ["--"]
    })
}

const getCompileCommand = (opts: Opts) => (sourceAbspath: string) => `~/smartpy-cli/SmartPy.sh compile ${sourceAbspath} ${opts.artifactsDir}`

const compileContract = (opts: Opts) => (sourceFile: string) => {
    const sourceAbspath = join(opts.contractsDir, sourceFile)
    return execCmd(getCompileCommand (opts) (sourceAbspath))
    .then(async ({stderr}) => { // How should we output warnings?
        if (stderr.length > 0) sendErr(`\n${stderr}`)

        return {
            contract: sourceFile,
            artifact: await getArtifacts(sourceAbspath)
        }
    })
    .catch(err => {
        sendErr(" ")
        sendErr(err.message.split("\n").slice(1).join("\n"))
        return Promise.resolve({
            contract: sourceFile,
            artifact: "Not compiled"
        })
    })
    .then(() => getArtifacts(sourceAbspath))
    .then((artifacts: string[]) => ({contract: sourceFile, artifacts}))
}
    
const compileAll = (opts: Opts): Promise<{contract: string, artifacts: string[]}[]> => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.py'],
        {cwd: opts.contractsDir, absolute: false}
    )
    .then(entries => entries.map(compileContract(opts)))
    .then(promises => Promise.all(promises))
}


export const compile = <T>(parsedArgs: Opts): LikeAPromise<PluginResponse, Failure<T>> => {
    const p = parsedArgs.sourceFile
    ? compileContract (parsedArgs) (parsedArgs.sourceFile as string)
        .then(data => [data])
    : compileAll (parsedArgs)
        .then(results => {
            if (results.length === 0) sendErr("No contracts found to compile.")
            return results
        })

    return p.then(sendAsyncJsonRes)
}
    

export default compile