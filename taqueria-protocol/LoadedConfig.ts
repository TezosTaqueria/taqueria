import {z} from 'zod'
import * as Config from '@taqueria/protocol/Config'
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath'
import * as SHA256 from '@taqueria/protocol/SHA256'

export const rawSchema = Config.internalSchema.extend({
    projectDir: SanitizedAbsPath.rawSchema.describe("loadedConfig.projectDir"),
    configFile: SanitizedAbsPath.rawSchema.describe("loadedConfig.configFile"),
    hash: SHA256.schema.describe("loadedConfig.hash")
}).describe("LoadedConfig")

const internalSchema = Config.internalSchema.extend({
    projectDir: SanitizedAbsPath.schema.describe("loadedConfig.projectDir"),
    configFile: SanitizedAbsPath.schema.describe("loadedConfig.configFile"),
    hash: SHA256.schema.describe("loadedConfig.hash")
}).describe("LoadedConfig")

export const schema = internalSchema.transform(val => val as LoadedConfig)

const loadedConfigType: unique symbol = Symbol("LoadedConfig")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type LoadedConfig = Input & {
    readonly [loadedConfigType]: void
}

export type t = LoadedConfig

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput) => schema.parse(data)

export const toConfig = (loadedConfig: LoadedConfig) => Config.make(loadedConfig)