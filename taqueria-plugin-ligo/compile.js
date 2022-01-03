const {exec} = require('child_process')
const {extname, basename, join} = require('path')
const glob = require('fast-glob')

const getContractArtifactFilename = (opts) => (sourceFile) => {
    const outFile = basename(sourceFile, extname(sourceFile))
    const outAbspath = join(opts.artifactsDir, outFile)
    return `${outAbspath}.tz`
}

const getCompileCommand = (opts) => (sourceFile) => {
    const {projectDir} = opts
    const baseCommand = `docker run --rm -v \"${projectDir}\":\"${projectDir}\" -w \"/contracts\" ligolang/ligo:next compile contract ${sourceFile}`
    const entryPoint = opts.e ? `-e ${opts.e}` : ""
    const syntax = opts["-s"] ? `s ${opts['s']} : ""` : ""
    const outFile = `-o ${getContractArtifactFilename(opts)(sourceFile)}`
    const cmd = `${baseCommand} ${entryPoint} ${syntax} ${outFile}`
    return cmd
}

const compileContract = (opts) => (sourceFile) => {
    const cmd = getCompileCommand (opts) (sourceFile)
    return new Promise((resolve, _) => {
        exec(cmd, (err, stdout, stderr) => {
            if (err) resolve({
                success: false,
                stdout: "",
                stderr: err
            })
            else if (stderr) resolve({
                success: false,
                stdout,
                stderr
            })
            else resolve({
                success: true,
                stdout,
                stderr
            })
        })
    })
}

const compileAll = parsedArgs => {
    // TODO: Fetch list of files from SDK
    return glob(
        ['**/*.ligo', '**/*.religo', '**/*.mligo', '**/*.jsligo'],
        {cwd: parsedArgs.contractsDir, absolute: true}
    )
    .then(entries => entries.map(compileContract(parsedArgs)))
    .then(promises => Promise.all(promises))
}

const compile = parsedArgs => {
    return parsedArgs.sourceFile
        ? compileContract(parsedArgs) (parsedArgs.sourceFiles)
        : compileAll(parsedArgs)
}

module.exports = compile