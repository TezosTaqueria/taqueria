import {execCmd, getArch, sendAsyncErr, sendJsonRes, sendErr} from '@taqueria/node-sdk'
import {SanitizedArgs, PluginResponse, Failure, LikeAPromise} from "@taqueria/node-sdk/types";
import {extname, basename, join} from 'path'
import glob = require('fast-glob')

type Opts = SanitizedArgs & Record<string, unknown>

const getContractArtifactFilename = (opts: Opts) => (sourceFile: string) => {
    const outFile = basename(sourceFile, extname(sourceFile))
    return join(opts.config.artifactsDir, `${outFile}.tz`)
}

const getInputFilename = (opts: Opts) => (sourceFile: string) => {
    return join(opts.config.contractsDir, sourceFile)
}

const getCompileCommand = (opts: Opts) => (sourceFile: string) => {
    const projectDir = process.env.PROJECT_DIR ??  opts.projectDir

    if (!projectDir) throw `No project directory provided`
    
    const inputFile = getInputFilename (opts) (sourceFile)
    const baseCommand = `DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:0.41.0 compile contract ${inputFile}`
    const entryPoint = opts.e ? `-e ${opts.e}` : ""
    const syntax = opts["-s"] ? `s ${opts['s']} : ""` : ""
    const outFile = `-o ${getContractArtifactFilename(opts)(sourceFile)}`
    const cmd = `${baseCommand} ${entryPoint} ${syntax} ${outFile}`
    return cmd
}

const compileContract = (opts: Opts) => (sourceFile: string): Promise<{contract: string, artifact: string}> =>
    getArch()
    .then(() => getCompileCommand (opts) (sourceFile))
    .then(execCmd)
    .then(({stderr}) => { // How should we output warnings?
        if (stderr.length > 0) sendErr(stderr)
        return {
            contract: sourceFile,
            artifact: getContractArtifactFilename (opts) (sourceFile)
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

const compileAll = (parsedArgs: Opts): Promise<{contract: string, artifact: string}[]> => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
        {cwd: parsedArgs.contractsDir, absolute: false}
    )
    .then(entries => entries.map(compileContract (parsedArgs)))
    .then(processes => processes.length > 0
        ? processes
        : [{contract: "None found", artifact: "N/A"}]
    )
    .then(promises => Promise.all(promises))
}

export const compile = <T>(parsedArgs: Opts): LikeAPromise<PluginResponse, Failure<T>> => {
    const p = parsedArgs.sourceFile
        ? compileContract (parsedArgs) (parsedArgs.sourceFile as string)
            .then(result => [result])
        : compileAll(parsedArgs)
            .then(results => {
                if (results.length === 0) sendErr("No contracts found to compile.")
                return results
            })
    
    return p
    .then(sendJsonRes)
    .catch(err => sendAsyncErr(err, false))
}

export default compile