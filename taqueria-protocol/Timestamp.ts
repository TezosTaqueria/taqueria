import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z
    .number({description: "Timestamp"})
    .min(1651846877)

type Input = z.infer<typeof rawSchema>

export const {factory, schemas: generatedSchemas} = createType<Input, Input>({
    isStringLike: true,
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is an invalid timestamp`,
    unknownErrMsg: `Something went wrong trying to parse a timestamp`
})

export type Timestamp = z.infer<typeof generatedSchemas.schema>
export type t = Timestamp
export const {create, make, of} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as Timestamp)
}

export const now = () => Date.now() as Timestamp