// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

const versionType: unique symbol = Symbol("VersionNumber")

export const schema = z.string()
    .regex(/^\d+\.\d+\d+$/)
    .transform(val => val as t)

export type t = string & {
    readonly [versionType]: void
}

export type VersionNumber = t

export const make = (value: string) => schema.parse(value)