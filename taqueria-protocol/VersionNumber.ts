import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z.string({description: "Version Number"})
    .nonempty()
    .regex(/^\d+\.\d+(\.\d+)*$/)


type RawInput = z.infer<typeof rawSchema>

const {schemas:generatedSchemas, factory} = createType<RawInput,RawInput>({
    isStringLike: true,
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is an invalid version number`,
    unknownErrMsg: "Something went wrong trying to parse the version number"
})

export type VersionNumber = z.infer<typeof generatedSchemas.schema>
export type t = VersionNumber
export const {create, of, make} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as VersionNumber)
}