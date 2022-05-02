import {z} from 'zod'

const versionType: unique symbol = Symbol("VersionNumber")

export type VersionNumber = string & {
    readonly [versionType]: void
}

export type t = VersionNumber

export const rawSchema = z.string()
    .nonempty()
    .regex(/^\d+\.\d+(\.\d+)*$/)

export const schema = rawSchema.transform((val: unknown) => val as VersionNumber)

export const make = (value: string) => schema.parse(value)

export default {
    rawSchema
}