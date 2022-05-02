import {z} from 'zod'
export const rawSchema = z
    .string()
    .regex(/^[A-Za-z]+[A-Za-z0-9-_ ]*$/)

export const schema = rawSchema.transform(val => val as t)

const hrType: unique symbol = Symbol("HumanReadableIdentifier")

export type t = string & {
    readonly [hrType]: void
}

export type HumanReadableIdentifier = t

export const make = (value: string) => schema.parse(value)