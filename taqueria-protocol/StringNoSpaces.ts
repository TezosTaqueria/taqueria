// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

const schema = z
    .string()
    .transform(val => val.replace(/\s+/g, '_'))
    .transform(val => val as t)

const stringNoSpacesType: unique symbol = Symbol("StringNoSpaces")
export type t = string & { 
    readonly [stringNoSpacesType]: void
}

export type StringNoSpaces = t

export const make = (value: string) => schema.parse(value)
