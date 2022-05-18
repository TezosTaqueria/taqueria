import {z, ZodError} from 'zod'
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
export const schema = z
    .string({description: "Public Key Hash"})
    .nonempty()
    .refine(
        val => val.startsWith("tz1"),
        val => ({message: `${val} is not a valid public key hash`}) 
    )
    .transform(val => val as PublicKeyHash)

const pkhType: unique symbol = Symbol("PublicKeyHash")

export type PublicKeyHash = string & {
    readonly [pkhType]: void
}

export type t = PublicKeyHash

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<PublicKeyHash>(err, `${value} is not a valid public key hash`, value)
        }
        return toParseUnknownErr<PublicKeyHash>(err, "There was a problem trying to parse the public key hash", value)
    }
}