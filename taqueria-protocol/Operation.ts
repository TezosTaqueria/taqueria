import {z} from 'zod'
import * as Verb from '@taqueria/protocol/Verb'
import * as Command from '@taqueria/protocol/Command'
import * as Option from '@taqueria/protocol/Option'
import * as RequestArgs from "@taqueria/protocol/RequestArgs"
import * as PersistentState from "@taqueria/protocol/PersistentState"

type Handler = (state: PersistentState.t) => <T extends RequestArgs.t>(opts: T) => unknown

export const internalSchema = z.object({
    operation: Verb.schema.describe("Operation Name"),
    command: Command.schema.describe("Operation Command"),
    description: z.string({description: "Optionation Description"}).optional(),
    options: z.preprocess(
        (val: unknown) => val ?? [] as Option.t[],
        z.array(Option.schema.describe("Operation Option"), {description: "Operation Options"}).optional()
    ),
    handler: z.function()
        .args(PersistentState.rawSchema)
        .returns(
            z.function()
            .args(RequestArgs.schema)
        )
        .describe("Operation Handler")
        .transform((val: unknown) => val as Handler)
        
}).describe("Operation")

export const rawSchema = z.object({
    operation: Verb.rawSchema.describe("Operation Name"),
    command: Command.rawSchema.describe("Operation Command"),
    description: z.string({description: "Operation Description"}).optional(),
    options: z.preprocess(
        (val: unknown) => val ?? [],
        z.array(
            Option.rawSchema.describe("Operation Option"),
            {description: "Operation Options"}
        ).optional()
    ),
    handler: z.function()
        .args(PersistentState.rawSchema)
        .returns(
            z.function()
            .args(RequestArgs.schema)
        )
        .describe("Operation Handler")
        .transform((val: unknown) => val as Handler)
}).describe("Operation")

export const schema = internalSchema.transform(val => val as Operation)

const operationType: unique symbol = Symbol("Operation")

type Input = z.infer<typeof internalSchema>

export type RawInput = Input

export type Operation = Input & {
    readonly [operationType]: void
}

export type t = Operation

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput | unknown | Record<string, unknown>) => schema.parse(data)