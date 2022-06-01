import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z.string({description: "Tz"}).min(1).regex(/^\d([\d_]+\d)?$/)

type RawInput = z.infer<typeof rawSchema>

export const {schemas: generatedSchemas, factory} = createType<RawInput, RawInput>({
    isStringLike: true,
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is an invalid Tz amount`,
    unknownErrMsg: "Something went wrong when parsing the Tz amount"
})

export type Tz = z.infer<typeof generatedSchemas.schema>

export const {create, of, make} = factory

export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as Tz)
}