// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
export const rawSchema = z
    .string()
    .regex(/^[A-Za-z]$/)

export const schema = rawSchema.transform(val => val as unknown as t)    

const singleCharType: unique symbol = Symbol("SingleChar")

export type t = string & {
    readonly [singleCharType]: void
}

export type SingleChar = t

export const make = (value: string) => schema.parse(value)