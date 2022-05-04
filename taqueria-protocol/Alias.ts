import {z} from 'zod'
import * as Verb from '@taqueria/protocol/Verb'
import * as SingleChar from '@taqueria/protocol/SingleChar'

export const internalSchema = z
    .union([Verb.schema, SingleChar.schema])

export const rawSchema = z
    .union([Verb.rawSchema, SingleChar.rawSchema])

const aliasType: unique symbol = Symbol("Alias")

export type Alias = string & {
    readonly [aliasType]: void
}

export type t = Alias    
    
export const schema = internalSchema.transform(val => val as unknown as Alias)

export const make = (value: string) => schema.parse(value)
