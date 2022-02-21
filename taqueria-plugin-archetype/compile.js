const { execCmd, getArch } = require('@taqueria/node-sdk')
const { extname, basename, join } = require('path')
const glob = require('fast-glob')
const archetype = require('@completium/archetype')
const fs = require('fs')

const getContractArtifactFilename = (opts) => (sourceFile) => {
  const outFile = basename(sourceFile, extname(sourceFile))
  return join(opts.config.artifactsDir, `${outFile}.tz`)
}

const getInputFilename = (opts) => sourceFile => {
  return join(opts.config.contractsDir, sourceFile)
}

const getCompileCommandFromBin = (opts, _arch) => (sourceFile) => {
  const inputFile = getInputFilename(opts)(sourceFile)
  const outputFile = getContractArtifactFilename(opts)(sourceFile)
  return `archetype ${inputFile} -o ${outputFile}`
}

const compileContract = (opts) => (sourceFile) =>
  getArch()
    .then(arch => getCompileCommandFromBin(opts, arch)(sourceFile))
    .then(_ => {
      const settings = {
        target: 'michelson'
      };
      const inputFile = getInputFilename(opts)(sourceFile);
      return archetype.compile(inputFile, settings)
    })
    .then(output => {
      const artifact = getContractArtifactFilename(opts)(sourceFile);
      fs.writeFileSync(artifact, output.toString());
      return ({ contract: sourceFile, artifact: artifact })
    })
    .catch(err => Promise.reject({ errCode: "E_COMPILE", context: err, errMsg: err.message ? err.message : 'There was a compilation error.' }))

const compileAll = parsedArgs => {
  // TODO: Fetch list of files from SDK
  return glob(
    ['**/*.arl'],
    { cwd: parsedArgs.contractsDir, absolute: false }
  )
    .then(entries => entries.map(compileContract(parsedArgs)))
    .then(processes => processes.length > 0
      ? processes
      : [{ contract: "None found", artifact: "N/A" }]
    )
    .then(promises => Promise.all(promises))
}

const compile = parsedArgs => {
  const p = parsedArgs.sourceFile
    ? compileContract(parsedArgs)(parsedArgs.sourceFile)
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
      ? Promise.resolve({ status: 'failed', stdout: '', stderr: err.errMsg, previous: err })
      : Promise.resolve({ status: 'failed', stderr: err.getMessage(), stdout: '', previous: err })
    )
}

module.exports = compile