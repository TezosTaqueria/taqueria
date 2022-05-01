// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as PublicKeyHash from "./PublicKeyHash.ts"

const internalSchema = z.object({
    pkh: PublicKeyHash.schema,
    mnemonic: z.array(
        z.string().nonempty().regex(/^[a-z]{2,}$/)
    ),
    email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string().nonempty(),
    account: z.string().nonempty(),
    activation_Code: z.string().nonempty()
})

export const rawSchema = z.object({
    pkh: z.string().nonempty(),
    mnemonic: z.array(z.string().nonempty()),
    email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string().nonempty(),
    account: z.string().nonempty(),
    activation_Code: z.string().nonempty()
})

export const schema = internalSchema.transform(val => val as t)

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

const faucetType: unique symbol = Symbol("Faucet")

export type t = Input & {
    readonly [faucetType]: void
}

export type Faucet = t

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput) => schema.parse(data)