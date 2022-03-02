import { Failure, LikeAPromise, ProxyAction, PluginResponse, SanitizedArgs } from "@taqueria/node-sdk/types";
import { exec } from 'child_process'
import glob from 'fast-glob'
import { extname, join, basename } from 'path'
import { readFile } from 'fs/promises'

type Opts = SanitizedArgs & Record<string, unknown>

// TODO: Move to SDK
const execCmd = (cmd: string): Promise<ProxyAction> => new Promise((resolve, reject) => {
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

const getInputFilename = (opts: Opts) => (sourceFile: string) => {
  const inputFile = basename(sourceFile, extname(sourceFile))
  return join(opts.config.contractsDir, `${inputFile}.arl`)
}

const getContractArtifactFilename = (opts: Opts) => (sourceFile: string) => {
  const outFile = basename(sourceFile, extname(sourceFile))
  return join(opts.config.artifactsDir, `${outFile}.tz`)
}

const getCompileCommand = (opts: Opts) => (sourceFile: string) => {
  const { projectDir } = opts
  const inputFile = getInputFilename(opts)(sourceFile)
  const baseCommand = `DOCKER_DEFAULT_PLATFORM=linux/amd64 docker run --rm -v \"${projectDir}\":/project -w /project completium/archetype:1.2.12 ${inputFile}`
  const outFile = `-o ${getContractArtifactFilename(opts)(sourceFile)}`
  const cmd = `${baseCommand} ${outFile}`
  return cmd
}

const compileContract = (opts: Opts) => (sourceFile: string) => {
  // const sourceAbspath = join(opts.contractsDir, sourceFile)
  return execCmd(getCompileCommand(opts)(sourceFile))
    .then(() => getContractArtifactFilename(opts)(sourceFile))
    .then((artifact: string) => ({ contract: sourceFile, artifacts: [artifact] }))
}

const compileAll = (opts: Opts): Promise<{ contract: string, artifacts: string[] }[]> => {
  // TODO: Fetch list of files from SDK
  return glob(
    ['**/*.arl'],
    { cwd: opts.contractsDir, absolute: false }
  )
    .then(entries => entries.map(compileContract(opts)))
    .then(promises => Promise.all(promises))
}


export const compile = <T>(parsedArgs: Opts): LikeAPromise<PluginResponse, Failure<T>> => {
  const p = parsedArgs.sourceFile
    ? compileContract(parsedArgs)(parsedArgs.sourceFile as string)
    : compileAll(parsedArgs)

  return p.then(results => ({
    status: 'success',
    stdout: results,
    stderr: "",
    render: 'table'
  }))
}

export default compile