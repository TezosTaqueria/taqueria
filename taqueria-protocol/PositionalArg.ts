import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
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

export const schema = internalSchema.transform(val => val as PositionalArg)

const postionalArgType: unique symbol = Symbol('PositionalArg')

type Input = z.infer<typeof internalSchema>

export type RawInput = z.infer<typeof rawSchema>

export interface PositionalArg extends Input {
    readonly [postionalArgType]: void
}

export type t = PositionalArg

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            const msg = data.placeholder
                ? `${data.placeholder} is not a valid positional argrument.`
                : `The provided positional argrument is invalid.`

            return toParseErr<PositionalArg>(err, msg, data)
        }
        return toParseUnknownErr<PositionalArg>(err, "There was a problem trying to parse the positional argument", data)
    }
}
export const create = (data: RawInput) => schema.parse(data)