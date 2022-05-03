import {z} from "zod"
import {resolve} from 'path'

const sanitizedAbsPath: unique symbol = Symbol()
export const rawSchema = z.string().nonempty()

export const schema = rawSchema
    .transform((val: string) => {
        return resolve(val) as SanitizedAbsPath
    })

type Input = z.infer<typeof rawSchema>

export type SanitizedAbsPath = Input & {
    readonly [sanitizedAbsPath]: void
}

export type t = SanitizedAbsPath

export const make = (value: string) => schema.parse(value)