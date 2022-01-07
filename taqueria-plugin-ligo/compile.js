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

const execCmd = cmd => new Promise((resolve, _) => {
    exec(cmd, (err, stdout, stderr) => {
        if (err) resolve({
            status: 'failed',
            stdout: "",
            stderr: err
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

const compileContract = (opts) => (sourceFile) =>
    execCmd(getCompileCommand(opts) (sourceFile))

const compileAll = parsedArgs => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
        {cwd: parsedArgs.contractsDir, absolute: false}
    )
    .then(entries => entries.map(compileContract(parsedArgs)))
    .then(promises => Promise.all(promises))
    .then(results => ({
        status: 'success',
        stdout: results ? "Done.\n" : "No LIGO contracts found.\n",
        stderr: ""
    }))
}

const compile = parsedArgs => {
    return parsedArgs.sourceFile
        ? compileContract(parsedArgs) (parsedArgs.sourceFile)
        : compileAll(parsedArgs)
}

module.exports = compile