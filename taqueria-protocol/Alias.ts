import {z} from "zod"
import * as Verb from '@taqueria/protocol/Verb'
import * as SingleChar from '@taqueria/protocol/SingleChar'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z
    .union([
        Verb.rawSchema,
        SingleChar.rawSchema], 
        {description: "Alias"}
    )

export const internalSchema = z
    .union([
        Verb.schemas.schema,
        SingleChar.schemas.schema],
        {description: "Alias"}
    )

type RawInput = z.infer<typeof rawSchema>
type Input = z.infer<typeof internalSchema>    

const {schemas: generatedSchemas, factory} = createType<RawInput, Input>({
    isStringLike: true,
    rawSchema,
    internalSchema,
    parseErrMsg: (value: unknown) => `${value} is not a valid alias`,
    unknownErrMsg: 'Something went wrong trying to parse an alias'
})

export type Alias = z.infer<typeof generatedSchemas.schema>

export type t = Alias

export const {create, of, make} = factory

export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as Alias)
}