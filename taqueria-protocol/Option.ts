// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as Verb from './Verb.ts'
// @ts-ignore see above
import * as SingleChar from './SingleChar.ts'

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

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [optionType]: void
}

export type Option = t

export const make = (data: Input) => schema.parse(data)
export const create = (data: RawInput) => schema.parse(data)