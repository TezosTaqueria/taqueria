import {z, ZodError} from "zod"
import * as Verb from '@taqueria/protocol/Verb'
import * as SingleChar from '@taqueria/protocol/SingleChar'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

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

export const make = (value: string) => {
    try {
        const alias = schema.parse(value)
        return resolve(alias)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Alias>(err, `${value} is not a valid alias`, value)
        }
        return toParseUnknownErr<Alias>(err, 'Something went wrong trying to parse an alias', value)
    }
}