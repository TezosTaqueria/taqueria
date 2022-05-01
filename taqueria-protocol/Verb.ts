// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

export const rawSchema = z
    .string()
    .regex(/^[A-Za-z\-\ ]+/)

export const schema = rawSchema.transform(val => val as t)    

const verbType: unique symbol = Symbol("Verb")

export type t = string & {
    readonly [verbType]: void
}

export type Verb = t

export const make = (value: string) => schema.parse(value)