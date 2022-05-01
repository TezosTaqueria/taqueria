import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
import {Config} from './taqueria-protocol/taqueria-protocol-types.ts'
import {SanitizedAbsPath, SHA256} from './taqueria-utils/taqueria-utils-types.ts'

export const rawSchema = Config.internalSchema.extend({
    projectDir: SanitizedAbsPath.rawSchema,
    configFile: SanitizedAbsPath.rawSchema,
    hash: SHA256.schema
})

const internalSchema = Config.internalSchema.extend({
    projectDir: SanitizedAbsPath.schema,
    configFile: SanitizedAbsPath.schema,
    hash: SHA256.schema
})

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