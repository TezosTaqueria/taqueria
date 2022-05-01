// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as Alias from "./Alias.ts"
// @ts-ignore see above
import * as VersionNumber from './VersionNumber.ts'
// @ts-ignore see above
import * as Task from './Task.ts'
// @ts-ignore see above
import * as Operation from './Operation.ts'

const internalSchema = z.object({
    name: z.string(),
    schema: VersionNumber.schema,
    version: VersionNumber.schema,
    alias: Alias.schema,
    tasks: z.array(Task.schema).default([]),
    operations: z.array(Operation.schema).default([])
})

export const schema = internalSchema.transform(val => val as t)

const pluginInfoType: unique symbol = Symbol("PluginInfo")

type Input = z.infer<typeof internalSchema>

export type t = Input & {
    readonly [pluginInfoType]: void
    readonly tasks: Task.t[]
    readonly operations: Operation.t[]
}

export type PluginInfo = t

export const make = (data: Input) => schema.parse(data)

export const from = (data: unknown) => schema.parse(data)