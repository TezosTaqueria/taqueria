// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as Verb from './Verb.ts'
// @ts-ignore see above
import * as SingleChar from './SingleChar.ts'

export const schema = z
    .union([Verb.schema, SingleChar.schema])
    .transform(val => val as unknown as Alias)

const aliasType: unique symbol = Symbol("Alias")

export type Alias = string & {
    readonly [aliasType]: void
}

export type t = Alias

export const make = (value: string) => schema.parse(value)
