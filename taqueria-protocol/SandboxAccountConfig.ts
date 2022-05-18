import {z, ZodError} from 'zod'
import {reject,resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"

const internalSchema = z.object({
    encryptedKey: z.string({description: "Sandbox Account Encrypted Key"}).nonempty(),
    publicKeyHash: PublicKeyHash.schema.describe("Sandbox Account Public Key Hash"),
    secretKey: z.string({description: "Sandbox Account Secret Key"}).nonempty()
}, {description: "Sandbox Account Configuration"})

export const rawSchema = z.object({
    encryptedKey: z.string({description: "Sandbox Account Encrypted Key"}).nonempty(),
    publicKeyHash: z.string({description: "Sandbox Account Public Key Hash"}).nonempty(),
    secretKey: z.string({description: "Sandbox Account Secret Key"}).nonempty()
}, {description: "Sandbox Account Configuration"})

export const schema = internalSchema.transform(val => val as SandboxAccountConfig)

const sandboxAccountType: unique symbol = Symbol("SandboxAccountConfig")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export interface SandboxAccountConfig extends Input {
    readonly [sandboxAccountType]: void
}

export type t = SandboxAccountConfig

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SandboxAccountConfig>(err, `The provided sandbox account configuration is invalid.`, data)
        }
        return toParseUnknownErr<SandboxAccountConfig>(err, "There was a problem trying to parse the sandbox account configuration", data)
    }
}

export const create = (data: RawInput) => schema.parse(data)