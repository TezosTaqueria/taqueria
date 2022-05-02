import {z} from 'zod'
// @ts-ignore using file extension not idiomatic in TS
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"

const internalSchema = z.object({
    encryptedKey: z.string().nonempty(),
    publicKeyHash: PublicKeyHash.schema,
    secretKey: z.string().nonempty()
})

export const rawSchema = z.object({
    encryptedKey: z.string().nonempty(),
    publicKeyHash: z.string().nonempty(),
    secretKey: z.string().nonempty()
})

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