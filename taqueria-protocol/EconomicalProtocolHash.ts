import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

const protocolHashType: unique symbol = Symbol("EconomicalProtocolHash")

export const schema = z
    .string({description: "Protocol hash"})
    .refine(
        value => (value.length === 51 && value[0] === 'P' && /[A-Za-z0-9]+/.test(value)),
        value => ({message: `${value} is an invalid hash for an economical protocol`})
    )
    .transform(val => val as EconomicalProtocolHash)

export type EconomicalProtocolHash = string & {
    readonly [protocolHashType]: void
}

export type t = EconomicalProtocolHash

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<EconomicalProtocolHash>(err, `${value} is not a valid economical protocol hash`, value)
        }
        return toParseUnknownErr<EconomicalProtocolHash>(err, "There was a problem trying to parse the economical protocol", value)
    }
}