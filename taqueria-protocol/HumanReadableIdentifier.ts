import {z, ZodError} from 'zod'
import {resolve, reject} from 'fluture'
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

export const rawSchema = z
    .string({description: "Human Readable Identifier"})
    .regex(/^[A-Za-z]+[A-Za-z0-9-_ ]*$/, "Must be a valid human-readable identifier")

export const schema = rawSchema.transform(val => val as t)

const hrType: unique symbol = Symbol("HumanReadableIdentifier")

export type t = string & {
    readonly [hrType]: void
}

export type HumanReadableIdentifier = t

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<HumanReadableIdentifier>(err, `${value} is not a valid identifier`, value)
        }
        return toParseUnknownErr<HumanReadableIdentifier>(err, "There was a problem trying to parse the identifier", value)
    }
}