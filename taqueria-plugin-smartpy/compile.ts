import { SanitizedArgs, ActionResponse, Failure, LikeAPromise, ProxyAction } from "taqueria-sdk/types";
import {exec} from 'child_process'
import glob from 'fast-glob'
import {join, basename} from 'path'
import {readFile} from 'fs/promises'

type Opts = SanitizedArgs & Record<string, unknown>

// TODO: Move to SDK
const execCmd = (cmd:string): Promise<ProxyAction> => new Promise((resolve, reject) => {
    exec(`sh -c "${cmd}"`, (err, stdout, stderr) => {
        if (err) reject({
            status: 'failed',
            stdout: stdout,
            stderr: err.message
        })
        else if (stderr) reject({
            status: 'failed',
            stdout,
            stderr
        })
        else resolve({
            status: 'success',
            stdout,
            stderr
        })
    })
})

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


export const compile = <T>(parsedArgs: Opts): LikeAPromise<ActionResponse, Failure<T>> => {
    const p = parsedArgs.sourceFile
    ? compileContract (parsedArgs) (parsedArgs.sourceFile as string)
    : compileAll (parsedArgs)

    return p.then(results => ({
        status: 'success',
        stdout: results,
        stderr: "",
        render: 'table'
    }))
}
    

export default compile