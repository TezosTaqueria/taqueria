import {z, ZodError} from 'zod'
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as Verb from "@taqueria/protocol/Verb"
import * as Alias from "@taqueria/protocol/Alias"
import * as Command from '@taqueria/protocol/Command'
import * as Option from '@taqueria/protocol/Option'
import * as PositionalArg from '@taqueria/protocol/PositionalArg'

const taskEncodingSchema = z.preprocess(
    (val: unknown) => val ?? 'none',
    z.union([
        z.literal('json'),
        z.literal('application/json'),
        z.literal('none')
    ])
    .default('none')
    .describe("Task Encoding")
    .optional()
)

const taskHandlerSchema = z.union([z.literal('proxy'), z.string()])

const internalSchema = z.object({
    task: Verb.schema.describe("Task Name"),
    command: Command.schema.describe("Task Command"),
    aliases: z.array(Alias.rawSchema).default([]).describe("Task Aliases").optional(),
    description: z.string({description: "Task Description"}).nonempty(),
    example: z.string({description: "Task Example"}).optional(),
    hidden: z.boolean({description: "Task Is Hidden"}).default(false).optional(),
    encoding: taskEncodingSchema.describe("Task Encoding"),
    handler: taskHandlerSchema.describe("Task Handler"),
    options: z.array(Option.schema).default([]).describe("Task Options").optional(),
    positionals: z.array(PositionalArg.schema).default([]).describe("Task Positional Args").optional()
}).describe("Task")

export const rawSchema = z.object({
    task: Verb.rawSchema.describe("Task Name"),
    command: Command.rawSchema.describe("Task Command"),
    aliases: z.array(Alias.rawSchema).default([]).describe("Task Aliases").optional(),
    description: z.string({description: "Task Description"}).nonempty(),
    example: z.string({description: "Task Example"}).optional(),
    hidden: z.boolean({description: "Task Is Hidden"}).default(false).optional(),
    encoding: taskEncodingSchema.describe("Task Encoding"),
    handler:  taskHandlerSchema.describe("Task Handler"),
    options: z.array(Option.rawSchema).default([]).describe("Task Options").optional(),
    positionals: z.array(PositionalArg.rawSchema).default([]).describe("Task Positional Args").optional()
}).describe("Task")

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

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Task>(err, `The provided task is invalid.`, data)
        }
        return toParseUnknownErr<Task>(err, "There was a problem trying to parse the task", data)
    }
}
export const create = (data: RawInput) => schema.parse(data)