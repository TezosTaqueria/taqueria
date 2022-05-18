import {z, ZodError} from 'zod'
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"
import {resolve, reject} from 'fluture'
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

const internalSchema = z.object({
    pkh: PublicKeyHash.schema,
    mnemonic: z.array(
        z.string({description: "Faucet Mnemonic Word"}).nonempty().regex(/^[a-z]{2,}$/),
        {description: "Faucet Mnemonic"}
    ),
    email: z.string({description: "Faucet E-mail"}).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string({description: "Faucet Password"}).nonempty(),
    account: z.string({description: "Faucet Account"}).nonempty(),
    activation_code: z.string({description: "Faucet Activation Code"}).nonempty()
}).describe("Faucet")

export const rawSchema = z.object({
    pkh: z.string({description: "Faucet Public Key Hash"}).nonempty(),
    mnemonic: z.array(
        z.string({description: "Faucet Mnemonic Word"}).nonempty(),
        {description: "Faucet Mnemonic"}
    ),
    email: z.string({description: "Faucet E-mail"}).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string({description: "Faucet Password"}).nonempty(),
    account: z.string({description: "Faucet Account"}).nonempty(),
    activation_code: z.string({description: "Faucet Activation Code"}).nonempty()
}).describe("Faucet")

export const schema = internalSchema.transform(val => val as Faucet)

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

const faucetType: unique symbol = Symbol("Faucet")

export type Faucet = Input & {
    readonly [faucetType]: void
}

export type t = Faucet

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Faucet>(err, `The provided faucet is invalid.`, data)
        }
        return toParseUnknownErr<Faucet>(err, "There was a problem trying to parse the faucet configuration", data)
    }
}

export const create = (data: RawInput) => schema.parse(data)