import {join} from "path"
import {stat, mkdir, writeFile} from "fs/promises"
import { RequestArgs, LoadedConfig, SanitizedAbsPath } from "@taqueria/node-sdk/types"
import { sendErr, sendAsyncRes, sendAsyncErr } from "@taqueria/node-sdk"
import {execa} from "execa"
import {defaults} from "jest-config"

type DefaultConfig = typeof defaults

interface CustomConfig extends LoadedConfig.t {
    readonly jestTestsRootDir?: string
}

interface Opts extends RequestArgs.ProxyRequestArgs {
    readonly config: CustomConfig
    readonly init: boolean
    readonly partition: string
    readonly testPattern: string
}

const getDefaultConfig = (defaultConfig: DefaultConfig) => `
module.exports = ${JSON.stringify(defaults, null, 4)}
`


const ensureRootConfigExists = (projectDir: SanitizedAbsPath.t) => {
    const jestRootConfig = getRootConfigAbspath(projectDir)
    return stat(jestRootConfig)
        .catch(_ => writeFile( jestRootConfig, getDefaultConfig(defaults) ))
        .then(_ => jestRootConfig)
}

const getRootConfigAbspath = (projectDir: SanitizedAbsPath.t) => SanitizedAbsPath.create(
    join(projectDir, ".taq", "jest.config.js")
)


const getTestsRootDir = (config: CustomConfig) => {
    return config.jestTestsRootDir || "tests"
}

const toPartitionCfg = (partitionAbspath: SanitizedAbsPath.t, rootConfigAbsPath: SanitizedAbsPath.t) =>
`
const parentConfig = require('${rootConfigAbsPath}')

module.exports = {
    ...parentConfig,
    roots: [
        ...parentConfig.roots,
        "${partitionAbspath}"
    ]
}
`

const getPartitionAbspath = (partitionDir: string) => SanitizedAbsPath.create(partitionDir)

const getPartitionConfigAbspath = (partitionDir: string) => SanitizedAbsPath.create(join(partitionDir, "jest.config.js"))


const createPartition = async (partitionDir: SanitizedAbsPath.t, projectDir: SanitizedAbsPath.t) => 
    ensureRootConfigExists(projectDir)
    .then(_ => stat(partitionDir))
    .then(stats => stats.isFile()
        ? sendAsyncErr(`${partitionDir} is an invalid partition directory`)
        : stats
    )
    .catch(_ => mkdir(partitionDir, {recursive: true}))
    .then(_ => getPartitionConfigAbspath(partitionDir))
    .then(partitionCfgAbsPath => 
        stat(partitionCfgAbsPath)
        .catch(_ => writeFile(
            partitionCfgAbsPath,
            toPartitionCfg(
                getPartitionAbspath(partitionDir),
                getRootConfigAbspath(projectDir)
            )
        )) 
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

const execCmd = (cmd: string, args: string[]) => {
    return execa(cmd, args, {reject: false})
}

export default async (args: RequestArgs.ProxyRequestArgs) => {
    const opts = args as Opts


    return ensurePartitionExists(opts)
        .then(configAbsPath => opts.testPattern
            ? execCmd('npx', ['jest', '-c', configAbsPath, '-t', opts.testPattern])
            : execCmd('npx', ['jest', '-c', configAbsPath])
        )
        .then(({stdout, stderr}) => {
            if (stderr) sendErr(stderr)
            return sendAsyncRes(stdout)
        })
}
        