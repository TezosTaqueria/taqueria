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
import * as Faucet from "./Faucet.ts"

const internalSchema = z.object({
    label: HumanReadableIdentifier.schema,
    rpcUrl: Url.schema,
    protocol: EconomicalProtocolHash.schema,
    faucet: Faucet.schema
})

export const rawSchema = z.object({
    label: z.string().nonempty(),
    rpcUrl: z.string().nonempty().url(),
    protocol: z.string().nonempty(),
    facuet: Faucet.rawSchema
})

export const schema = internalSchema.transform(val => val as t)

const networkType: unique symbol = Symbol("NetworkConfig")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [networkType]: void
}

export type NetworkConfig = t

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput) => schema.parse(data)