import {z} from "zod"
import * as ParsedOperation from "@taqueria/protocol/ParsedOperation"
import * as PluginInfo from "@taqueria/protocol/PluginInfo"
import createType from "@taqueria/protocol/Base"

const internalSchema = PluginInfo.internalSchema.extend({
    operations: z.preprocess(
        val => val ?? [],
        z.array(
            ParsedOperation.schemas.schema,
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

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: (value: unknown) => `The following plugin info gave us trouble when parsing the following plugin information: ${value}`,
    unknownErrMsg: "Something went wrong trying to parse the plugin information"
})

export type ParsedPluginInfo = z.infer<typeof schemas.schema>
export type t = ParsedPluginInfo
export const {create, of, make} = factory