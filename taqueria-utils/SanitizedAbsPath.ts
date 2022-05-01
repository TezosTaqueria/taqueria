import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
import {resolve as resolvePath, join} from 'https://deno.land/std@0.120.0/path/mod.ts'

const sanitizedAbsPath: unique symbol = Symbol()

export const rawSchema = z.string().nonempty()

export const schema = rawSchema
    .transform(resolvePath)
    .transform(val => val as SanitizedAbsPath)

type Input = z.infer<typeof rawSchema>

export type SanitizedAbsPath = Input & {
    readonly [sanitizedAbsPath]: void
}

export type t = SanitizedAbsPath

export const make = (value: string) => schema.parse(value)