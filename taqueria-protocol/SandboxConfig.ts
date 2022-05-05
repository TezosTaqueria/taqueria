import {z} from 'zod'
import * as HumanReadableIdentifier from "@taqueria/protocol/HumanReadableIdentifier"
import * as Url from "@taqueria/protocol/Url"
import * as EconomicalProtocolHash from "@taqueria/protocol/EconomicalProtocolHash"
import * as SandboxAccountConfig from "@taqueria/protocol/SandboxAccountConfig"
import * as Verb from "@taqueria/protocol/Verb"

const accountMapSchema = z.union([
    z.object({default: z.string().nonempty()}),
    z.record(SandboxAccountConfig.schema)
])

const internalSchema = z.object({
    label: HumanReadableIdentifier.schema,
    rpcUrl: Url.schema,
    protocol: EconomicalProtocolHash.schema,
    attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    plugin: Verb.schema.optional(),
    accounts: accountMapSchema.optional()
})

export const rawSchema = z.object({
    label: z.string().nonempty(),
    rpcUrl: z.string().nonempty().url(),
    protocol: z.string().nonempty(),
    attributes: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
    plugin: Verb.rawSchema.optional(),
    accounts: z.union([
        z.object({default: z.string().nonempty()}),
        z.record(SandboxAccountConfig.rawSchema)
    ]).optional()
})

export const schema = internalSchema.transform(val => val as t)

const sandboxType: unique symbol = Symbol("SandboxConfig")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [sandboxType]: void
}

export type SandboxConfig = t

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput) => schema.parse(data)