import {z, ZodError} from "zod"
import * as path from 'path'
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

const sanitizedAbsPath: unique symbol = Symbol()
export const rawSchema = z.string({description: "SanitizedAbsPath"}).nonempty()

export const schema = rawSchema
    .transform((val: string) => {
        return path.resolve(val) as SanitizedAbsPath
    })

type Input = z.infer<typeof rawSchema>

export type SanitizedAbsPath = Input & {
    readonly [sanitizedAbsPath]: void
}

export type t = SanitizedAbsPath

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SanitizedAbsPath>(err, `${value} is not a valid absolute path`, value)
        }
        return toParseUnknownErr<SanitizedAbsPath>(err, "There was a problem trying to parse the absolute path", value)
    }
}