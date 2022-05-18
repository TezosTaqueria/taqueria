import {z, ZodError} from 'zod'
import {reject, resolve} from 'fluture'
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as Verb from '@taqueria/protocol/Verb'
import * as SingleChar from '@taqueria/protocol/SingleChar'

const internalSchema = z.object({
    shortFlag: SingleChar.schema.describe("Option Short Flag").optional(),
    flag: Verb.schema.describe("Option Long Flag"),
    description: z.string({description: "Option Description"}).nonempty(),
    defaultValue: z.union(
        [z.string(), z.number(), z.boolean()],
        {description: "Option Default Value"}
    ).optional(),
    choices: z.array(
        z.string({description: "Option Choice"}),
        {description: "Option Choices"}
    ).optional(),
    required: z.boolean({description: "Option Is Required"}).default(false).optional(),
    boolean: z.boolean({description: "Option Is Boolean"}).default(false).optional()
}).describe("Option")

export const rawSchema = z.object({
    shortFlag: SingleChar.rawSchema.describe("Option Short Flag").optional(),
    flag: Verb.rawSchema.describe("Option Long Flag"),
    description: z.string({description: "Option Description"}).nonempty(),
    defaultValue: z.union(
        [z.string(), z.number(), z.boolean()],
        {description: "Option Default Value"}
    ).optional(),
    choices: z.array(
        z.string({description: "Option Choice"}),
        {description: "Option Choices"}
    ).optional(),
    required: z.boolean({description: "Option Is Required"}).default(false).optional(),
    boolean: z.boolean({description: "Option Is Boolean"}).default(false).optional()
}).describe("Option")

export const schema = internalSchema.transform(val => val as Option)

const optionType: unique symbol = Symbol("Option")

type Input = z.infer<typeof internalSchema>

export type RawInput = z.infer<typeof rawSchema>

export interface Option extends Input {
    readonly [optionType]: void
}

export type t = Option

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Option>(err, `The provided option is invalid.`, data)
        }
        return toParseUnknownErr<Option>(err, "There was a problem trying to parse the option", data)
    }
}
export const create = (data: RawInput) => schema.parse(data)