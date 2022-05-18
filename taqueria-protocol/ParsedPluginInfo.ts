import {z, ZodError} from "zod"
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as ParsedOperation from "@taqueria/protocol/ParsedOperation"
import * as PluginInfo from "@taqueria/protocol/PluginInfo"

const parsedPluginInfo: unique symbol = Symbol("ParsedPluginInfo")

const internalSchema = PluginInfo.internalSchema.extend({
    operations: z.preprocess(
        val => val ?? [],
        z.array(
            ParsedOperation.schema,
            {description: "ParsedOperations"}
        )
        .optional()
    )
}).describe("ParsedPluginInfo")

export const rawSchema = PluginInfo.internalSchema.extend({
    operations: z.preprocess(
        val => val ?? [],
        z.array(
            ParsedOperation.rawSchema,
            {description: "ParsedOperation"}
        )
    )
    .optional()
}).describe("ParsedPluginInfo")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export interface ParsedPluginInfo extends Input {
    readonly [parsedPluginInfo]: void
}

export type t = ParsedPluginInfo

export const schema = internalSchema.transform((val: unknown) => val as ParsedPluginInfo)

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ParsedPluginInfo>(err, `The provided plugin information is invalid.`, data)
        }
        return toParseUnknownErr<ParsedPluginInfo>(err, "There was a problem trying to parse the plugin information", data)
    }
}

export const create = (input: RawInput | Record<string, unknown> | unknown) => schema.parse(input)