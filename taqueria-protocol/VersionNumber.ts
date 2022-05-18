import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

const versionType: unique symbol = Symbol("VersionNumber")

export type VersionNumber = string & {
    readonly [versionType]: void
}

export type t = VersionNumber

export const rawSchema = z.string({description: "Version Number"})
    .nonempty()
    .regex(/^\d+\.\d+(\.\d+)*$/)

export const schema = rawSchema.transform((val: unknown) => val as VersionNumber)

export const make = (value: string) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<VersionNumber>(err, `${value} is not a valid version number`, value)
        }
        return toParseUnknownErr<VersionNumber>(err, "There was a problem trying to parse the version number", value)
    }
}

export default {
    rawSchema
}