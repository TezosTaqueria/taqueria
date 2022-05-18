import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
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

export const schema = internalSchema.transform(val => val as NetworkConfig)

const networkType: unique symbol = Symbol("NetworkConfig")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type NetworkConfig = Input & {
    readonly [networkType]: void
}

export type t = NetworkConfig

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<NetworkConfig>(err, `The provided network configuration is invalid.`, data)
        }
        return toParseUnknownErr<NetworkConfig>(err, "There was a problem trying to parse the network configuration", data)
    }
}

export const create = (data: RawInput) => schema.parse(data)