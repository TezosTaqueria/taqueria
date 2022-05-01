// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as PublicKeyHash from "./PublicKeyHash.ts"

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