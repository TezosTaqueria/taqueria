// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as Verb from './Verb.ts'
// @ts-ignore see above
import * as Command from './Command.ts'
// @ts-ignore see above
import * as Option from './Option.ts'

type Handler = <T extends Record<string, unknown>>(parsedArgs: T) => string

const parsedArgs = z.map(z.string(), z.unknown())

const internalSchema = z.object({
    operation: Verb.schema,
    command: Command.schema,
    description: z.string().optional(),
    options: z.array(Option.schema).default([]),
    handler: z.function()
        .args(parsedArgs)
        .returns(z.string())
        .transform(fn => fn as Handler)
})

export const schema = internalSchema.transform(val => val as Operation)

const operationType: unique symbol = Symbol("Operation")

type Input = z.infer<typeof internalSchema>

export type Operation = Input & {
    readonly [operationType]: void
}

export type t = Operation

export const make = (data: Input) => schema.parse(data)