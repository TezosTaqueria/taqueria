import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

export const rawSchema = z.string({description: "Tz"}).nonempty().regex(/^\d([\d_]+\d)?$/)

export const schema = rawSchema.transform(val => val as Tz)

const tzType: unique symbol = Symbol("Tz")

type Input = z.infer<typeof rawSchema>

export type Tz = Input & {
    readonly [tzType]: void
}
export type t = Tz

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Tz>(err, `${value} is not a valid Tz amount`, value)
        }
        return toParseUnknownErr<Tz>(err, "There was a problem trying to parse the Tz amount", value)
    }
}