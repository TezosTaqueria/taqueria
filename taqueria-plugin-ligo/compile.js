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

const getCompileCommand = (opts, arch) => (sourceFile) => {
    const {projectDir} = opts
    const inputFile = getInputFilename (opts) (sourceFile)
    const baseCommand = `docker run --platform ${arch} --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile contract ${inputFile}`
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
    .then(() => ({contract: sourceFile, artifact: getContractArtifactFilename(opts) (sourceFile)}))

const compileAll = parsedArgs => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
        {cwd: parsedArgs.contractsDir, absolute: false}
    )
    .then(entries => entries.map(compileContract(parsedArgs)))
    .then(promises => Promise.all(promises))
}

const compile = parsedArgs => {
    const p = parsedArgs.sourceFile
        ? compileContract(parsedArgs) (parsedArgs.sourceFile)
        : compileAll(parsedArgs)
    
    return p.then(results => ({
        status: 'success',
        stdout: results,
        stderr: "",
        render: 'table'
    }))
}

module.exports = compile