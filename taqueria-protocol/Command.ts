// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

export const rawSchema = z
    .string()
    .regex(/^([A-Za-z-_ ]+ ?)((\[.+\] ?)|(\<.+\>) ?)*$/)

export const schema = rawSchema.transform(val => val as t)

const commandType: unique symbol = Symbol("Command")

export type t = string & {
    readonly [commandType]: void
}

export type Command = t

export const make = (value: string) => schema.parse(value)
