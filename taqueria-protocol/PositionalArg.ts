import {z} from 'zod'
import * as HumanReadableIdentifier from '@taqueria/protocol/HumanReadableIdentifier'

const internalSchema = z.object({
    placeholder: HumanReadableIdentifier.schema.describe("Positional Arg Placeholder"),
    description: z.string({description: "Positional Arg Description"}).nonempty(),
    defaultValue: z.union(
        [z.string(), z.number(), z.boolean()],
        {description: "Positional Arg Default Value"}
    ).optional(),
    type: z.union(
        [z.literal('string'), z.literal('number'), z.literal('boolean')],
        {description: "Positional Arg Datatype"}
    ).optional()
}).describe("Positional Arg")

export const rawSchema = z.object({
    placeholder: HumanReadableIdentifier.rawSchema.describe("Positional Arg Placeholder"),
    description: z.string({description: "Positional Arg Description"}).nonempty(),
    defaultValue: z.union(
        [z.string(), z.number(), z.boolean()],
        {description: "Positional Arg Default Value"}
    ).optional(),
    type: z.union(
        [z.literal('string'), z.literal('number'), z.literal('boolean')],
        {description: "Positional Arg Datatype"}
    ).optional()
}).describe("Positional Arg")

export const schema = internalSchema.transform(val => val as t)

const postionalArgType: unique symbol = Symbol('PositionalArg')

type Input = z.infer<typeof internalSchema>

export type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [postionalArgType]: void
}

export type PositionalArg = t

export const make = (data: Input) => schema.parse(data)
export const create = (data: RawInput) => schema.parse(data)