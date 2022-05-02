import {z} from 'zod'

const protocolHashType: unique symbol = Symbol("EconomicalProtocolHash")

export const schema = z
    .string()
    .refine(
        value => (value.length === 51 && value[0] === 'P' && /[A-Za-z0-9]+/.test(value)),
        value => ({message: `${value} is an invalid hash for an economical protocol`})
    )
    .transform(val => val as EconomicalProtocolHash)

export type t = string & {
    readonly [protocolHashType]: void
}

export type EconomicalProtocolHash = t

export const make = (value: string) => schema.parse(value)