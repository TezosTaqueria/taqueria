import {z} from 'zod'
export const rawSchema = z
    .string({description: "Single character"})
    .regex(/^[A-Za-z]$/, "Must be a single character")

export const schema = rawSchema.transform(val => val as unknown as t)    

const singleCharType: unique symbol = Symbol("SingleChar")

export type t = string & {
    readonly [singleCharType]: void
}

export type SingleChar = t

export const make = (value: string) => schema.parse(value)