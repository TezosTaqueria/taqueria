import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

export const rawSchema = z
    .string({description: "Verb"})
    .nonempty("Must be a valid verb")
    .regex(/^[A-Za-z\-\ ]+/, "Must be a valid verb")

export const schema = rawSchema.transform(val => val as Verb)    

const verbType: unique symbol = Symbol("Verb")

export type Verb = string & {
    readonly [verbType]: void
}

export type t = Verb

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Verb>(err, `${value} is not a valid verb`, value)
        }
        return toParseUnknownErr<Verb>(err, "There was a problem trying to parse a verb", value)
    }
}