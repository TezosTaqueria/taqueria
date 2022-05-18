import {z, ZodError} from "zod"
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as Operation from "@taqueria/protocol/Operation"

const parsedOperationType: unique symbol = Symbol()

const internalSchema = Operation
    .internalSchema
    .describe("ParsedOperation")
    .omit({handler: true})

export const rawSchema = Operation
    .rawSchema
    .omit({handler: true})
    .describe("ParsedOperation")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export interface ParsedOperation extends Input {
    readonly [parsedOperationType]: void
}

export type t = ParsedOperation

export const schema = internalSchema.transform((val: unknown) => val as ParsedOperation)

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ParsedOperation>(err, `The provided operation is invalid.`, data)
        }
        return toParseUnknownErr<ParsedOperation>(err, "There was a problem trying to parse the operation", data)
    }
}

export const create = (input: RawInput | Record<string, unknown> | unknown) => schema.parse(input)