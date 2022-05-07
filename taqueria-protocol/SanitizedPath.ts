import {z} from "zod"

export const schema = z
    .string({description: "Sanitized Path"})
    .transform(value => {
        const result = value.match(/^(\.\.|\.\/|\/)/)
        return result ? value : `./${value}`
    })

const sanitizedPathType: unique symbol = Symbol("SanitizedPath")

export type SanitizedPath = z.infer<typeof schema> & {
    readonly [sanitizedPathType]: void
}

export type t = SanitizedPath

export const make = (value: string) => schema.parse(value) as SanitizedPath