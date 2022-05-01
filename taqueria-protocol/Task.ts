// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as Verb from './Verb.ts'
// @ts-ignore see above
import * as Command from './Command.ts'
// @ts-ignore see above
import * as SingleChar from './SingleChar.ts'
// @ts-ignore see above
import * as Option from './Option.ts'
// @ts-ignore see above
import * as PositionalArg from './PositionalArg.ts'

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

const taskHandlerSchema = z.union([z.string(), z.array(z.string()), z.literal('proxy')])

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

export const schema = internalSchema.transform(val => val as t)

const taskType: unique symbol = Symbol("Task")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [taskType]: void
}

export type Task = t

export const make = (data: Input) => schema.parse(data)
export const create = (data: RawInput) => schema.parse(data)