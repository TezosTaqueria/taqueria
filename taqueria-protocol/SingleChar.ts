import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z
    .string({description: "Single character"})
    .regex(/^[A-Za-z]$/, "Must be a single character")

type RawInput = z.infer<typeof rawSchema>

export const {factory, schemas: generatedSchemas} = createType<RawInput>({
    isStringLike: true,
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is not a single character`,
    unknownErrMsg: `Something went wrong trying to parse a single character`
})

export type SingleChar = z.infer<typeof generatedSchemas.schema>
export type t = SingleChar
export const {create, of, make} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as SingleChar)
}