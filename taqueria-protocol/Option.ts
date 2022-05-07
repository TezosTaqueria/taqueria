import {z} from 'zod'
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

export const schema = internalSchema.transform(val => val as t)

const optionType: unique symbol = Symbol("Option")

type Input = z.infer<typeof internalSchema>

export type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [optionType]: void
}

export type Option = t

export const make = (data: Input) => schema.parse(data)
export const create = (data: RawInput) => schema.parse(data)