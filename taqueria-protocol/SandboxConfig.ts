// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as HumanReadableIdentifier from "./HumanReadableIdentifier.ts"
// @ts-ignore see above
import * as Url from "../taqueria-utils/Url.ts"
// @ts-ignore see above
import * as EconomicalProtocolHash from "./EconomicalProtocolHash.ts"
// @ts-ignore see above
import * as SandboxAccountConfig from "./SandboxAccountConfig.ts"

const accountMapSchema = z.union([
    z.object({default: z.string().nonempty()}),
    z.map(z.string().nonempty(), SandboxAccountConfig.schema)
])

const internalSchema = z.object({
    label: HumanReadableIdentifier.schema,
    rpcUrl: Url.schema,
    protocol: EconomicalProtocolHash.schema,
    attributes: z.map(z.string().nonempty(), z.union([z.string(), z.number(), z.boolean()])).optional(),
    accounts: accountMapSchema.optional()
})

export const rawSchema = z.object({
    label: z.string().nonempty(),
    rpcUrl: z.string().nonempty().url(),
    protocol: z.string().nonempty(),
    attributes: z.map(z.string().nonempty(), z.union([z.string(), z.number(), z.boolean()])).optional(),
    accounts: z.union([
        z.object({default: z.string().nonempty()}),
        z.map(z.string().nonempty(), SandboxAccountConfig.rawSchema)
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