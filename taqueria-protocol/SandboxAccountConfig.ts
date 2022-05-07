import {z} from 'zod'
// @ts-ignore using file extension not idiomatic in TS
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

export const schema = internalSchema.transform(val => val as t)

const sandboxAccountType: unique symbol = Symbol("SandboxAccountConfig")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [sandboxAccountType]: void
}

export type SandboxAccountConfig = t

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput) => schema.parse(data)