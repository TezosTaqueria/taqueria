import { SanitizedArgs, ActionResponse, Failure, LikeAPromise, ProxyAction } from "taqueria-sdk/types";
import {exec} from 'child_process'
import glob from 'fast-glob'
import {join} from 'path'

type Opts = SanitizedArgs & Record<string, unknown>

const execCmd = (cmd:string): Promise<ProxyAction> => new Promise((resolve, _) => {
    exec(`sh -c "${cmd}"`, (err, stdout, stderr) => {
        if (err) resolve({
            status: 'failed',
            stdout: stdout,
            stderr: err.message
        })
        else if (stderr) resolve({
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

const getCompileCommand = (opts: Opts) => (sourceFile: string) => `~/smartpy-cli/SmartPy.sh compile ${join(opts.contractsDir, sourceFile)} ${opts.artifactsDir}`

const compileContract = (opts: Opts) => (sourceFile: string) =>
    execCmd(getCompileCommand (opts) (sourceFile))

const compileAll = (opts: Opts) => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.py'],
        {cwd: opts.contractsDir, absolute: false}
    )
    .then(entries => entries.map(compileContract(opts)))
    .then(promises => Promise.all(promises))
    .then(results => {
        const response : ProxyAction = ({
            status: 'success',
            stdout: results ? "Done.\n" : "No SmartPy contracts found.\n",
            stderr: ""
        })
        return response
    })
}


export const compile = <T>(parsedArgs: Opts): LikeAPromise<ActionResponse, Failure<T>> =>
    parsedArgs.sourceFile
        ? compileContract (parsedArgs) (parsedArgs.sourceFile as string)
        : compileAll (parsedArgs)

export default compile