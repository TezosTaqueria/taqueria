import {z} from "zod"
import createType from "@taqueria/protocol/Base"

export const rawSchema = z
    .string({description: "Sanitized Path"})
    .transform(value => {
        const result = value.match(/^(\.\.|\.\/|\/)/)
        return result ? value : `./${value}`
    })

type RawInput = z.infer<typeof rawSchema>

const {schemas: generatedSchemas, factory} = createType<RawInput, RawInput>({
    isStringLike: true,
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is an invalid filesystem path`,
    unknownErrMsg: (value: unknown) => `Something went wrong trying to parse the filesystem path, ${value}`
})

export type SanitizedPath = z.infer<typeof generatedSchemas.schema>
export type t = SanitizedPath
export const {create, of, make} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as SanitizedPath)
}