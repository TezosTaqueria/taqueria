import {z} from 'zod'
import * as Verb from '@taqueria/protocol/Verb'
import * as Command from '@taqueria/protocol/Command'
import * as Option from '@taqueria/protocol/Option'

type Handler = <T extends Record<string, unknown>>(parsedArgs: T) => string

const parsedArgs = z.record(z.unknown())

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

export type RawInput = Input

export type Operation = Input & {
    readonly [operationType]: void
}

export type t = Operation

export const make = (data: Input) => schema.parse(data)