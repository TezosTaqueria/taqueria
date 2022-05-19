import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as HumanReadableIdentifier from "@taqueria/protocol/HumanReadableIdentifier"
import * as Url from "@taqueria/protocol/Url"
import * as EconomicalProtocolHash from "@taqueria/protocol/EconomicalProtocolHash"
import * as SandboxAccountConfig from "@taqueria/protocol/SandboxAccountConfig"
import * as Verb from "@taqueria/protocol/Verb"

const accountMapSchema = z.record(
    z.union([
        z.string().nonempty(),
        SandboxAccountConfig.schema
    ])
)

const internalSchema = z.object({
    label: HumanReadableIdentifier.schema.describe("Sandbox Label"),
    rpcUrl: Url.schema.describe("Sandbox RPC Url"),
    protocol: EconomicalProtocolHash.schema.describe("Sandbox Protocol Hash"),
    attributes: z.record(
        z.union([z.string(), z.number(), z.boolean()]),
        {description: "Sandbox Attributes"}
    ).optional(),
    plugin: Verb.schema.describe("Sandbox Plugin").optional(),
    accounts: accountMapSchema.optional()
}, {description: "Sandbox Configuration"})

export const rawSchema = z.object({
    label: z.string({description: "Sandbox Label"}).nonempty(),
    rpcUrl: z.string({description: "Sandbox RPC Url"}).nonempty().url(),
    protocol: z.string({description: "Sandbox Protocol Hash"}).nonempty(),
    attributes: z.record(
        z.union(
            [z.string(), z.number(), z.boolean()],
            {description: "Sandbox Attribute"}
        ),
        {description: "Sandbox Attributes"}
    ).optional(),
    plugin: Verb.rawSchema.describe("Sandbox Plugin").optional(),
    accounts: z.union([
        z.object({default: z.string().nonempty()}),
        z.record(SandboxAccountConfig.rawSchema)
    ], {description: "Sandbox Accounts"}).optional()
})

export const schema = internalSchema.transform(val => val as SandboxConfig)

const sandboxType: unique symbol = Symbol("SandboxConfig")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export interface SandboxConfig extends Input {
    readonly [sandboxType]: void
}

export type t = SandboxConfig

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SandboxConfig>(err, `The provided sandbox configuration is invalid.`, data)
        }
        return toParseUnknownErr<SandboxConfig>(err, "There was a problem trying to parse the sandbox configuration", data)
    }
}

export const create = (data: RawInput) => schema.parse(data)