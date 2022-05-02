import {z} from 'zod'

import * as Alias from "@taqueria/protocol/Alias"
import * as VersionNumber from "@taqueria/protocol/VersionNumber"
import * as Task from '@taqueria/protocol/Task'
import * as Operation from '@taqueria/protocol/Operation'

const internalSchema = z.object({
    name: z.string().nonempty(),
    schema: VersionNumber.schema,
    version: VersionNumber.schema,
    alias: Alias.schema,
    tasks: z.array(Task.schema).default([]),
    operations: z.array(Operation.schema).default([])
})

export const rawSchema = z.object({
    name: z.string().nonempty(),
    schema: VersionNumber.rawSchema,
    version: VersionNumber.rawSchema,
    alias: Alias.rawSchema,
    tasks: z.array(Task.schema).default([]),
    operations: z.array(Operation.schema).default([])
})

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