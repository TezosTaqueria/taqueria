import {z, ZodError} from "zod"
import {resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

const idType: unique symbol = Symbol("Provisioner ID")

export const rawSchema = z
    .string()
    .nonempty()
    .regex(/^[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+$/)
    .describe('Provisioner ID')

export type Input = z.infer<typeof rawSchema>

export type ProvisionerID = Input & {
    readonly [idType]: void
}

export type t = ProvisionerID

export const schema = rawSchema.transform((val: string) => val as ProvisionerID)

export const make = (value: Input) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ProvisionerID>(err, `${value} is not a valid provisioner ID`, value)
        }
        return toParseUnknownErr<ProvisionerID>(err, "There was a problem trying to parse the provisioner ID", value)
    }
}