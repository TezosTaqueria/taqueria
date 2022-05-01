// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'

const internalSchema = z.object({
    name: z.string().nonempty(),
    type: z.union([z.literal('npm'), z.literal('binary'), z.literal('deno')])
})

export const schema = internalSchema.transform(val => val as t)

export type InstalledPlugin = z.infer<typeof internalSchema>

export type t = InstalledPlugin

export const make = (name: string, type: string) => {
    const data = {name, type}
    return schema.parse(data)
}