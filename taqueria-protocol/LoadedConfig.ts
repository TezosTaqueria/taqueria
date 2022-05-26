import {z} from 'zod'
import * as Config from '@taqueria/protocol/Config'
import * as SanitizedAbsPath from '@taqueria/protocol/SanitizedAbsPath'
import * as SHA256 from '@taqueria/protocol/SHA256'
import createType, {Flatten} from "@taqueria/protocol/Base"

export const rawSchema = Config.rawSchema.extend({
    projectDir: SanitizedAbsPath.rawSchema.describe("loadedConfig.projectDir"),
    configFile: SanitizedAbsPath.rawSchema.describe("loadedConfig.configFile"),
    hash: SHA256.rawSchema.describe("loadedConfig.hash")
}).describe("LoadedConfig")

export const internalSchema = Config.internalSchema.extend({
    projectDir: SanitizedAbsPath.schemas.schema.describe("loadedConfig.projectDir"),
    configFile: SanitizedAbsPath.schemas.schema.describe("loadedConfig.configFile"),
    hash: SHA256.schemas.schema.describe("loadedConfig.hash")
}).describe("LoadedConfig")

type RawInput = z.infer<typeof rawSchema>
type Input = Flatten<z.infer<typeof internalSchema>>

export const {schemas: generatedSchemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: (value: unknown) => `The following configuration is invalid: ${value}`,
    unknownErrMsg: "Something went wrong trying to parse the configuration to load"
})

export type LoadedConfig = z.infer<typeof generatedSchemas.schema>
export type t = LoadedConfig
export const {create, of, make} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as LoadedConfig)
}

export const toConfig = (config: LoadedConfig) => Config.make(config)