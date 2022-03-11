const {execCmd, getArch, sendAsyncErr, sendJsonRes, sendErr} = require('@taqueria/node-sdk')
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
    const baseCommand = `DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile contract ${inputFile}`
    const entryPoint = opts.e ? `-e ${opts.e}` : ""
    const syntax = opts["-s"] ? `s ${opts['s']} : ""` : ""
    const outFile = `-o ${getContractArtifactFilename(opts)(sourceFile)}`
    const cmd = `${baseCommand} ${entryPoint} ${syntax} ${outFile}`
    return cmd
}

const compileContract = (opts) => (sourceFile) =>
    getArch()
    .then(arch => getCompileCommand(opts, arch) (sourceFile))
    .then(execCmd)
    .then(({stderr}) => { // How should we output warnings?
        if (stderr.length > 0) sendErr(stderr)
        return {
            contract: sourceFile,
            artifact: getContractArtifactFilename(opts) (sourceFile)
        }
    })
    .catch(err => Promise.resolve({
        contract: sourceFile,
        artifact: err.message
    }))

const compileAll = parsedArgs => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
        {cwd: parsedArgs.contractsDir, absolute: false}
    )
    .then(entries => entries.map(sourceFile => compileContract(parsedArgs) (sourceFile)))
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
    .then(sendJsonRes)
    .catch(err => sendAsyncErr(err, false))
}

module.exports = compile