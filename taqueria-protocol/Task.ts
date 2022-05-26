import {z} from 'zod'
import * as Verb from "@taqueria/protocol/Verb"
import * as Alias from "@taqueria/protocol/Alias"
import * as Command from '@taqueria/protocol/Command'
import * as Option from '@taqueria/protocol/Option'
import * as PositionalArg from '@taqueria/protocol/PositionalArg'
import createType, {Flatten} from "@taqueria/protocol/Base"

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

export const rawSchema = z.object({
    task: Verb.rawSchema.describe("Task Name"),
    command: Command.rawSchema.describe("Task Command"),
    aliases: z.array(Alias.rawSchema).default([]).describe("Task Aliases").optional(),
    description: z.string({description: "Task Description"}).min(3),
    example: z.string({description: "Task Example"}).optional(),
    hidden: z.boolean({description: "Task Is Hidden"}).default(false).optional(),
    encoding: taskEncodingSchema.describe("Task Encoding"),
    handler:  taskHandlerSchema.describe("Task Handler"),
    options: z.array(Option.rawSchema).default([]).describe("Task Options").optional(),
    positionals: z.array(PositionalArg.rawSchema).default([]).describe("Task Positional Args").optional()
}).describe("Task")

const internalSchema = z.object({
    task: Verb.schemas.schema.describe("Task Name"),
    command: Command.schemas.schema.describe("Task Command"),
    aliases: z.array(Alias.rawSchema).default([]).describe("Task Aliases").optional(),
    description: z.string({description: "Task Description"}).min(3),
    example: z.string({description: "Task Example"}).optional(),
    hidden: z.boolean({description: "Task Is Hidden"}).default(false).optional(),
    encoding: taskEncodingSchema.describe("Task Encoding"),
    handler: taskHandlerSchema.describe("Task Handler"),
    options: z.preprocess(
        val => val ?? [],
        z.array(Option.schemas.schema).describe("Task Options").optional(),
    ),
    positionals: z.array(PositionalArg.schemas.schema).default([]).describe("Task Positional Args").optional()
}).describe("Task")

type RawInput = z.infer<typeof rawSchema>
type Input = z.infer<typeof internalSchema>

export const {schemas: generatedSchemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: (value: unknown) => `The following task is invalid: ${value}`,
    unknownErrMsg: "Something went wrong trying to parse the task"
})

export type Task = z.infer<typeof generatedSchemas.schema>
export type t = Task
export const {create, make, of} = factory
export const schemas = {
    ...generatedSchemas,
    // schema: generatedSchemas.schema.transform(val => val as unknown as Task)
}