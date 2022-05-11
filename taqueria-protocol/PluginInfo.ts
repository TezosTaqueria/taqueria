import {z} from 'zod'

import * as Alias from "@taqueria/protocol/Alias"
import * as VersionNumber from "@taqueria/protocol/VersionNumber"
import * as Task from '@taqueria/protocol/Task'
import * as Operation from '@taqueria/protocol/Operation'

export const internalSchema = z.object({
    name: z.string({description: "Plugin Name"}).nonempty(),
    version: VersionNumber.schema.describe("Plugin Version #"),
    schema: VersionNumber.schema.describe("Plugin Schema Version #"),
    alias: Alias.schema.describe("Plugin Alias"),
    tasks: z.preprocess(
        val => val ?? [],
        z.array(
            Task.schema.describe("Plugin Task"),
            {description: "Plugin Tasks"}
        ).optional()
    ),
    operations: z.preprocess(
        val => val ?? [],
        z.array(
            Operation.schema.describe("Plugin Operation"),
            {description: "Plugin Operations"}
        ).optional()
    )
}).describe("Plugin Schema")

export const rawSchema = z.object({
    name: z.string({description: "Plugin Name"}).nonempty(),
    version: VersionNumber.rawSchema.describe("Plugin Version #"),
    schema: VersionNumber.rawSchema.describe("Plugin Schema Version #"),
    alias: Alias.rawSchema.describe("Plugin Alias"),
    tasks: z.preprocess(
        val => val ?? [],
        z.array(
            Task.rawSchema.describe("Plugin Task"),
            {description: "Plugin Tasks"}
        ).optional()
    ),
    operations: z.preprocess(
        val => val ?? [],
        z.array(
            Operation.rawSchema.describe("Plugin Operation"),
            {description: "Plugin Operations"}
        ).optional()
    )
    
}).describe("Plugin Schema")

const pluginInfoType: unique symbol = Symbol("PluginInfo")

type Input = z.infer<typeof internalSchema>

export type RawInput = z.infer<typeof rawSchema>

export type PluginInfo = Input & {
    readonly [pluginInfoType]: void
    readonly tasks: Task.t[]
    readonly operations: Operation.t[]
}

export type t = PluginInfo

export const schema = internalSchema.transform((val: unknown) => val as PluginInfo)

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput|unknown) => schema.parse(data)