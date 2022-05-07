import {z} from "zod"
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

export const make = (input: Input) => schema.parse(input)

export const create = (input: RawInput | Record<string, unknown> | unknown) => schema.parse(input)