// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
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