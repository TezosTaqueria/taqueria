import {z} from 'zod'
import * as Verb from '@taqueria/protocol/Verb'
import * as SingleChar from '@taqueria/protocol/SingleChar'

const internalSchema = z.object({
    shortFlag: SingleChar.schema.optional(),
    flag: Verb.schema,
    description: z.string(),
    defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
    choices: z.array(z.string()),
    required: z.boolean().default(false).optional(),
    boolean: z.boolean().default(false).optional()
})

export const rawSchema = z.object({
    shortFlag: SingleChar.rawSchema.optional(),
    flag: Verb.rawSchema,
    description: z.string().nonempty(),
    defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
    choices: z.array(z.string()),
    required: z.boolean().default(false).optional(),
    boolean: z.boolean().default(false).optional()
})

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