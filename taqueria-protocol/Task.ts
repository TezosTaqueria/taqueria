import {z} from 'zod'
import * as Verb from '@taqueria/protocol/Verb'
import * as Command from '@taqueria/protocol/Command'
import * as SingleChar from '@taqueria/protocol/SingleChar'
import * as Option from '@taqueria/protocol/Option'
import * as PositionalArg from '@taqueria/protocol/PositionalArg'

const taskAliasSchema = z
    .union([Verb.schema, SingleChar.schema])
    .transform(val => val as unknown as (Verb.t | SingleChar.t))

const taskEncodingSchema = z
    .union([
        z.literal('json'),
        z.literal('application/json'),
        z.literal('none')
    ])
    .default('none')
    .optional()

const taskHandlerSchema = z.union([z.literal('proxy'), z.string()])

const internalSchema = z.object({
    task: Verb.schema,
    command: Command.schema,
    aliases: z.array(taskAliasSchema).default([]).optional(),
    description: z.string().nonempty(),
    example: z.string().optional(),
    hidden: z.boolean().default(false).optional(),
    encoding: taskEncodingSchema,
    handler: taskHandlerSchema,
    options: z.array(Option.schema).default([]).optional(),
    positionals: z.array(PositionalArg.schema).default([]).optional()
})

export const rawSchema = z.object({
    task: Verb.rawSchema,
    command: Command.rawSchema,
    aliases: z.array(z.union([Verb.schema, SingleChar.schema])).default([]).optional(),
    description: z.string().nonempty(),
    example: z.string().optional(),
    hidden: z.boolean().default(false).optional(),
    encoding: taskEncodingSchema,
    handler:  taskHandlerSchema,
    options: z.array(Option.rawSchema).default([]).optional(),
    positionals: z.array(PositionalArg.rawSchema).default([]).optional()
})

export const schema = internalSchema.transform(val => val as Task)

const taskType: unique symbol = Symbol("Task")

interface Input extends z.infer<typeof internalSchema> {
    handler: "proxy" | string
}

interface RawInput extends z.infer<typeof rawSchema> {
    handler: "proxy" | string
}

export type Task = Input & {
    readonly [taskType]: void
}

export type t = Task

export const make = (data: Input) => schema.parse(data)
export const create = (data: RawInput) => schema.parse(data)