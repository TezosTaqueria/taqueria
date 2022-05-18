import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
export const rawSchema = z
    .string({description: "Single character"})
    .regex(/^[A-Za-z]$/, "Must be a single character")

export const schema = rawSchema.transform(val => val as unknown as SingleChar)    

const singleCharType: unique symbol = Symbol("SingleChar")

export type SingleChar = string & {
    readonly [singleCharType]: void
}

export type  t = SingleChar

export const make = (value: string) => {
    try {
        const retval = schema.parse(value) as SingleChar
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SingleChar>(err, `${value} is not a valid character`, value)
        }
        return toParseUnknownErr<SingleChar>(err, "There was a problem trying to parse the character", value)
    }
}