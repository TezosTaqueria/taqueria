const {exec} = require('child_process')
const {extname, basename, join} = require('path')
const glob = require('fast-glob')

const getContractArtifactFilename = (opts) => (sourceFile) => {
    const outFile = basename(sourceFile, extname(sourceFile))
    return join(opts.config.artifactsDir, `${outFile}.tz`)
}

const getInputFilename = (opts) => sourceFile => {
    return join(opts.config.contractsDir, sourceFile)
}

const getCompileCommand = (opts) => (sourceFile) => {
    const {projectDir} = opts
    const inputFile = getInputFilename (opts) (sourceFile)
    const baseCommand = `docker run --rm -v \"${projectDir}\":/project -w /project ligolang/ligo:next compile contract ${inputFile}`
    const entryPoint = opts.e ? `-e ${opts.e}` : ""
    const syntax = opts["-s"] ? `s ${opts['s']} : ""` : ""
    const outFile = `-o ${getContractArtifactFilename(opts)(sourceFile)}`
    const cmd = `${baseCommand} ${entryPoint} ${syntax} ${outFile}`
    return cmd
}

const execCmd = cmd => new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
        if (err) reject({
            status: 'failed',
            stdout: "",
            stderr: err
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

const compileContract = (opts) => (sourceFile) =>
    execCmd(getCompileCommand(opts) (sourceFile))
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