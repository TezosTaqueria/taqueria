// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as HumanReadableIdentifier from './HumanReadableIdentifier.ts'

const internalSchema = z.object({
    placeholder: HumanReadableIdentifier.schema,
    description: z.string().nonempty(),
    defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
    type: z.union([z.literal('string'), z.literal('number'), z.literal('boolean')]).optional()
})

export const rawSchema = z.object({
    placeholder: HumanReadableIdentifier.rawSchema,
    description: z.string().nonempty(),
    defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
    type: z.union([z.literal('string'), z.literal('number'), z.literal('boolean')]).optional()
})

export const schema = internalSchema.transform(val => val as t)

const postionalArgType: unique symbol = Symbol('PositionalArg')

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [postionalArgType]: void
}

export type PositionalArg = t

export const make = (data: Input) => schema.parse(data)
export const create = (data: RawInput) => schema.parse(data)