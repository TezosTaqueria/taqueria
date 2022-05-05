import {z} from 'zod'
export const schema = z
    .string()
    .nonempty()
    .refine(
        val => val.startsWith("tz1"),
        val => ({message: `${val} is not a valid public key hash`}) 
    )
    .transform(val => val as t)

const pkhType: unique symbol = Symbol("PublicKeyHash")

export type t = string & {
    readonly [pkhType]: void
}

export type PublicKeyHash = t

export const make = (value: string) => schema.parse(value)