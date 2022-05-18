import {z, ZodError} from 'zod'
import {resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

const installedPluginType: unique symbol = Symbol("InstalledPlugin")

const internalSchema = z.object({
    name: z.string({description: "Plugin Name"}).nonempty(),
    type: z.union(
        [z.literal('npm'), z.literal('binary'), z.literal('deno')],
        {description: "Plugin Type"}
    )
}).describe("InstalledPlugin")

export const schema = internalSchema.transform(val => val as InstalledPlugin)

type Input = z.infer<typeof internalSchema>

export interface InstalledPlugin extends Input {
    readonly [installedPluginType]: void
}

export type t = InstalledPlugin


export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<InstalledPlugin>(err, `The provided plugin is invalid.`, data)
        }
        return toParseUnknownErr<InstalledPlugin>(err, "There was a problem trying to parse an installed plugin", data)
    }
}