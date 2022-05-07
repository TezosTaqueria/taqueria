import {z} from "zod"
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

export const make = (input: Input) => schema.parse(input)

export const create = (input: RawInput | Record<string, unknown> | unknown) => schema.parse(input)