import {z} from 'zod'
import * as HumanReadableIdentifier from "@taqueria/protocol/HumanReadableIdentifier"
import * as Url from "@taqueria/protocol/Url"
import * as EconomicalProtocolHash from "@taqueria/protocol/EconomicalProtocolHash"
import * as Faucet from "@taqueria/protocol/Faucet"

const internalSchema = z.object({
    label: HumanReadableIdentifier.schema.describe("Network Label"),
    rpcUrl: Url.schema.describe("Network RPC Url"),
    protocol: EconomicalProtocolHash.schema.describe("Network Protocol Hash"),
    faucet: Faucet.schema.describe("Network Faucet")
}).describe("Network Config")

export const rawSchema = z.object({
    label: z.string({description: "Network Label"}).nonempty(),
    rpcUrl: z.string({description: "Network RPC Url"}).nonempty().url(),
    protocol: z.string({description: "Network Protocol Hash"}).nonempty(),
    facuet: Faucet.rawSchema.describe("Network Faucet")
}).describe("Network Config")

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