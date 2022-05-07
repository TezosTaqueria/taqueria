import {z} from "zod"
import * as Verb from '@taqueria/protocol/Verb'
import * as SingleChar from '@taqueria/protocol/SingleChar'

export const internalSchema = z
    .union([Verb.schema, SingleChar.schema], {description: "Alias"})

export const rawSchema = z
    .union([Verb.rawSchema, SingleChar.rawSchema], {description: "Alias"})

const aliasType: unique symbol = Symbol("Alias")

export type Alias = string & {
    readonly [aliasType]: void
}

export type t = Alias    
    
export const schema = internalSchema.transform((val: unknown) => val as Alias)

export const make = (value: string) => schema.parse(value)