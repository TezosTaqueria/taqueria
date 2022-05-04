import {z} from 'zod'

import * as Alias from "@taqueria/protocol/Alias"
import * as VersionNumber from "@taqueria/protocol/VersionNumber"
import * as Task from '@taqueria/protocol/Task'
import * as Operation from '@taqueria/protocol/Operation'

interface CreateSchemaArgs {
    versionSchema: z.ZodTypeAny, 
    aliasSchema: z.ZodTypeAny,
    taskSchema: z.ZodTypeAny,
    opSchema: z.ZodTypeAny
}
const createSchema = (schemas: CreateSchemaArgs) => z.object({
    name: z.string().nonempty(),
    schema: schemas.versionSchema,
    version: schemas.versionSchema,
    alias: schemas.aliasSchema.optional(),
    tasks: z.preprocess(
        val => val ?? [],
        z.array(schemas.taskSchema).optional()
    ),  
    operations: z.preprocess(
        val => val ?? [],
        z.array(schemas.opSchema).optional()
    )
})

const internalSchema = createSchema({
    versionSchema: VersionNumber.schema,
    aliasSchema: Alias.schema,
    taskSchema: Task.schema,
    opSchema: Operation.schema
})

export const rawSchema = createSchema({
    aliasSchema: Alias.schema,
    taskSchema: Task.schema,
    opSchema: Operation.schema,
    versionSchema: VersionNumber.schema
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