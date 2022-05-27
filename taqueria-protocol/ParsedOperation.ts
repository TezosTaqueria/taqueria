import {z} from "zod"
import * as Operation from "@taqueria/protocol/Operation"
import createType from "@taqueria/protocol/Base"

const internalSchema = Operation
    .internalSchema
    .describe("ParsedOperation")
    .omit({handler: true})

export const rawSchema = Operation
    .rawSchema
    .omit({handler: true})
    .describe("ParsedOperation")

type RawInput = z.infer<typeof rawSchema>
type Input = z.infer<typeof internalSchema>

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: (value: unknown) => `Could not parse the following operation: ${value}`,
    unknownErrMsg: "Something went wrong trying to parse an operation"
})

export type ParsedOperation = z.infer<typeof schemas.schema>
export type t = ParsedOperation

export const {create, make, of} = factory