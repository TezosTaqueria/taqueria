import {z} from "zod"
import * as path from 'path'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z.string({description: "SanitizedAbsPath"}).nonempty()

type RawInput = z.infer<typeof rawSchema>

export const {schemas: generatedSchemas, factory} = createType<RawInput>({
    isStringLike: true,
    rawSchema,
    transformer: (value: unknown) => path.resolve(value as string) as unknown,
    parseErrMsg: (value: unknown) => `${value} is an invalid absolute path`,
    unknownErrMsg: (value: unknown) => `Something went wrong trying to parse the absolute path, ${value}`
})

export type SanitizedAbsPath = z.infer<typeof generatedSchemas.schema>
export type t = SanitizedAbsPath
export const {create, make, of} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as SanitizedAbsPath)
}