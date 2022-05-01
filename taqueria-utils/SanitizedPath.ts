// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

export const schema = z.string().transform(value => {
    const result = value.match(/^(\.\.|\.\/|\/)/)
    return result ? value : `./${value}`
})

const sanitizedPathType: unique symbol = Symbol("SanitizedPath")

export type SanitizedPath = z.infer<typeof schema> & {
    readonly [sanitizedPathType]: void
}

export type t = SanitizedPath

export const make = (value: string) => schema.parse(value) as SanitizedPath