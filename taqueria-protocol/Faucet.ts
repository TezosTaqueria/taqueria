import {z} from 'zod'
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"

const internalSchema = z.object({
    pkh: PublicKeyHash.schema,
    mnemonic: z.array(
        z.string().nonempty().regex(/^[a-z]{2,}$/)
    ),
    email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string().nonempty(),
    account: z.string().nonempty(),
    activation_code: z.string().nonempty()
})

export const rawSchema = z.object({
    pkh: z.string().nonempty(),
    mnemonic: z.array(z.string().nonempty()),
    email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string().nonempty(),
    account: z.string().nonempty(),
    activation_code: z.string().nonempty()
})

export const schema = internalSchema.transform(val => val as Faucet)

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

const faucetType: unique symbol = Symbol("Faucet")

export type Faucet = Input & {
    readonly [faucetType]: void
}

export type t = Faucet

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput) => schema.parse(data)