import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z
    .string({description: "Protocol hash"})
    .refine(
        value => (value.length === 51 && value[0] === 'P' && /[A-Za-z0-9]+/.test(value)),
        value => ({message: `${value} is an invalid hash for an economical protocol`})
    )

type RawInput = z.infer<typeof rawSchema>    

export const {schemas: generatedSchemas, factory} = createType<RawInput, RawInput>({
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is an invalid economical protocol hash`,
    unknownErrMsg: "Somethign went wrong trying to parse the economical protocol hash"
})

export type EconomicalPrototypeHash = z.infer<typeof generatedSchemas.schema>
export type t = EconomicalPrototypeHash

export const {create, of, make} = factory
export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as EconomicalPrototypeHash)
}