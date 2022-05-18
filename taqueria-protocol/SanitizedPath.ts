import {z, ZodError} from "zod"
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

export const schema = z
    .string({description: "Sanitized Path"})
    .transform(value => {
        const result = value.match(/^(\.\.|\.\/|\/)/)
        return result ? value : `./${value}`
    })

const sanitizedPathType: unique symbol = Symbol("SanitizedPath")

export type SanitizedPath = z.infer<typeof schema> & {
    readonly [sanitizedPathType]: void
}

export type t = SanitizedPath

export const make = (value: string) => {
    try {
        const retval = schema.parse(value) as SanitizedPath
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SanitizedPath>(err, `${value} is not a valid path`, value)
        }
        return toParseUnknownErr<SanitizedPath>(err, "There was a problem trying to parse the path", value)
    }
}