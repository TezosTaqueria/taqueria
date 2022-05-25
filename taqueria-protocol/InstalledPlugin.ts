import {z} from 'zod'
import createType from "@taqueria/protocol/Base"

export const rawSchema = z.object({
    name: z.string({description: "Plugin Name"}).nonempty(),
    type: z.union(
        [z.literal('npm'), z.literal('binary'), z.literal('deno')],
        {description: "Plugin Type"}
    )
}).describe("InstalledPlugin")

type RawInput = z.infer<typeof rawSchema>

export const {schemas, factory} = createType<RawInput>({
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is not a valid installed plugin`,
    unknownErrMsg: "Something went wrong when parsing the installed plugin"
})

export type InstalledPlugin = z.infer<typeof schemas.schema>
export type t = InstalledPlugin

export const {create, of, make} = factory