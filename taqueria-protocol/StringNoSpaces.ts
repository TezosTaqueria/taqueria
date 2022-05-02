import {z} from 'zod'

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
