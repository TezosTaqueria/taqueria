import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z.string({description: "Tz"}).nonempty().regex(/^\d([\d_]+\d)?$/)

type RawInput = z.infer<typeof rawSchema>

export const {schemas, factory} = createType<RawInput>({
    isStringLike: true,
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is an invalid Tz amount`,
    unknownErrMsg: "Something went wrong when parsing the Tz amount"
})

export type Tz = z.infer<typeof schemas.schema>

export const {create, of, make} = factory