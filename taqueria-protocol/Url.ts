import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z
    .string({description: "Url"})
    .url()

type RawInput = z.infer<typeof rawSchema>    

export const {schemas: generatedSchemas, factory} = createType<RawInput>({
    rawSchema,
    isStringLike: true,
    parseErrMsg: (value: unknown) => `${value} is an invalid url`,
    unknownErrMsg: "Something went wrong trying to parse the url"
})

export const toComponents = (url: Url) => {
    const parts = new URL(url.toString())
    return parts
}

export type Url = z.infer<typeof generatedSchemas.schema>
export type t = Url
export const {create, of, make} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as Url)
}