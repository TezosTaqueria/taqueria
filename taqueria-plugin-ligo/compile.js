const {execCmd, getArch} = require('@taqueria/node-sdk')
const {extname, basename, join} = require('path')
const glob = require('fast-glob')

const getContractArtifactFilename = (opts) => (sourceFile) => {
    const outFile = basename(sourceFile, extname(sourceFile))
    return join(opts.config.artifactsDir, `${outFile}.tz`)
}

const getInputFilename = (opts) => sourceFile => {
    return join(opts.config.contractsDir, sourceFile)
}

const getCompileCommand = (opts, _arch) => (sourceFile) => {
    const {projectDir} = opts
    const inputFile = getInputFilename (opts) (sourceFile)
    const baseCommand = `docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile contract ${inputFile}`
    const entryPoint = opts.e ? `-e ${opts.e}` : ""
    const syntax = opts["-s"] ? `s ${opts['s']} : ""` : ""
    const outFile = `-o ${getContractArtifactFilename(opts)(sourceFile)}`
    const cmd = `${baseCommand} ${entryPoint} ${syntax} ${outFile}`
    return cmd
}

const getLigoCompilationError = (stderr) => {
    const err = stderr.split("\n").slice(1).join("\n")
    return `There was a compilation error.\n\n${err}`
}

const compileContract = (opts) => (sourceFile) =>
    getArch()
    .then(arch => getCompileCommand(opts, arch) (sourceFile))
    .then(execCmd)
    .then(result => result.status === 'success'
        ? ({contract: sourceFile, artifact: getContractArtifactFilename(opts) (sourceFile)})
        : Promise.reject({
            errCode: "E_COMPILE", context: result, errMsg: getLigoCompilationError(result.stderr)}
        )
    )

const compileAll = parsedArgs => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
        {cwd: parsedArgs.contractsDir, absolute: false}
    )
    .then(entries => entries.map(compileContract(parsedArgs)))
    .then(processes => processes.length > 0
        ? processes
        : [{contract: "None found", artifact: "N/A"}]
    )
    .then(promises => Promise.all(promises))
}

const compile = parsedArgs => {
    const p = parsedArgs.sourceFile
        ? compileContract(parsedArgs) (parsedArgs.sourceFile)
            .then(result => [result])
        : compileAll(parsedArgs)
    
    return p
    .then(results => ({
        status: 'success',
        stdout: results,
        stderr: "",
        render: 'table'
    }))
    .catch(err => err.errCode
        ? Promise.resolve({status: 'failed', stdout: '', stderr: err.errMsg, previous: err})
        : Promise.resolve({status: 'failed', stderr: err.getMessage(), stdout: '', previous: err})
    )
}

module.exports = compile