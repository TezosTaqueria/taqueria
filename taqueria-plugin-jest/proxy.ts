import {join} from "path"
import {stat, mkdir, writeFile} from "fs/promises"
import { RequestArgs, LoadedConfig, SanitizedAbsPath } from "@taqueria/node-sdk/types"
import { writeJsonFile, sendErr, sendAsyncRes } from "@taqueria/node-sdk"
import {execa} from "execa"
import {defaults} from "jest-config"

interface CustomConfig extends LoadedConfig.t {
    readonly jestTestsRootDir?: string
}

interface Opts extends RequestArgs.ProxyRequestArgs {
    readonly config: CustomConfig
    readonly init: boolean
    readonly partition: string
}

const ensureRootConfigExists = (projectDir: SanitizedAbsPath.t) => {
    const jestRootConfig = SanitizedAbsPath.create(join(projectDir, ".taq", "jest.config.js"))
    return stat(jestRootConfig)
        .catch(_ => 
            writeJsonFile (jestRootConfig) (JSON.stringify(defaults))
        )
        .then(_ => jestRootConfig)
}

const getTestsRootDir = (config: CustomConfig) => {
    return config.jestTestsRootDir || "tests"
}

const toPartitionCfg = (rootConfigAbsPath: SanitizedAbsPath.t) =>
`
module.exports = {
    ...require('${rootConfigAbsPath}')
}
`

const getPartitionConfigAbspath = (partitionDir: string) => SanitizedAbsPath.create(join(partitionDir, "jest.config.js"))


const createPartition = async (partitionDir: SanitizedAbsPath.t, projectDir: SanitizedAbsPath.t) => 
    ensureRootConfigExists(projectDir)
    .then(_ => stat(partitionDir))
    .catch(_ => mkdir(partitionDir, {recursive: true}))
    .then(_ => getPartitionConfigAbspath(partitionDir))
    .then(rootCfgAbsPath => 
        stat(rootCfgAbsPath)
        .catch(_ => writeFile (getPartitionConfigAbspath(partitionDir), toPartitionCfg(rootCfgAbsPath)) ) 
    )
    .then(_ => getPartitionConfigAbspath(partitionDir))


const ensurePartitionExists = (args: Opts) => args.partition
    ? createPartition(
        SanitizedAbsPath.create(join(args.projectDir, args.partition)),
        args.projectDir
    )
    : createPartition(
        SanitizedAbsPath.create(
            join( args.projectDir, getTestsRootDir(args.config) )
        ),
        args.projectDir
    )

const execCmd = (cmd: string, args: string[]) => execa(cmd, args, {reject: false})

export default async (args: RequestArgs.ProxyRequestArgs) =>
        ensurePartitionExists(args as Opts)
        .then(configAbsPath => execCmd('npx', ['jest', '-c', configAbsPath, /*"--passWithNoTests"*/]))
        .then(({stdout, stderr}) => {
            if (stderr) sendErr(stderr)
            return sendAsyncRes(stdout)
        })