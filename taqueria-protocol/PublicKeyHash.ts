// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

export const schema = z
    .string()
    .nonempty()
    .refine(
        val => val.startsWith("tk1"),
        val => ({message: `${val} is not a valid public key hash`}) 
    )
    .transform(val => val as t)

const pkhType: unique symbol = Symbol("PublicKeyHash")

export type t = string & {
    readonly [pkhType]: void
}

export type PublicKeyHash = t

export const make = (value: string) => schema.parse(value)