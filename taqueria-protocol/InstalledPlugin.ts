import {z} from 'zod'

const internalSchema = z.object({
    name: z.string({description: "Plugin Name"}).nonempty(),
    type: z.union(
        [z.literal('npm'), z.literal('binary'), z.literal('deno')],
        {description: "Plugin Type"}
    )
}).describe("InstalledPlugin")

export const schema = internalSchema.transform(val => val as t)

export type InstalledPlugin = z.infer<typeof internalSchema>

export type t = InstalledPlugin

export const make = (name: string, type: string) => {
    const data = {name, type}
    return schema.parse(data)
}