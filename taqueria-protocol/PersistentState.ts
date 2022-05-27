import {z} from "zod"
import * as Verb from "@taqueria/protocol/Verb"
import * as SHA256 from "@taqueria/protocol/SHA256"
import * as Timestamp from "@taqueria/protocol/Timestamp"
import createType from "@taqueria/protocol/Base"

const rawOpSchema = z.object({
    hash: SHA256.rawSchema.describe("state.op.hash"),
    time: Timestamp.rawSchema.describe("state.op.time"),
    output: z.unknown().describe("state.op.output")
}).describe("Persistent State Operation")

const rawTaskSchema = z.object({
    time: Timestamp.rawSchema.describe("state.task.time"),
    output: z.unknown().describe('state.task.output')
})

const internalOpSchema = z.object({
    hash: SHA256.schemas.schema.describe("state.op.hash"),
    time: Timestamp.schemas.schema.describe("state.op.time"),
    output: z.unknown().describe("state.op.output")
})

const internalTaskSchema = z.object({
    task: Verb.schemas.schema,
    plugin: z.string().min(1),
    time: Timestamp.schemas.schema.describe("state.task.time"),
    output: z.unknown().describe("state.op.output")
})

export type PersistedTask = z.infer<typeof internalTaskSchema>

export type PersistedOperation = z.infer<typeof internalOpSchema>


export const rawSchema = z.object({
    operations: z.record(rawOpSchema),
    tasks: z.record(rawTaskSchema)
})

export const internalSchema = z.object({
    operations: z.record(internalOpSchema),
    tasks: z.record(internalTaskSchema)
}).transform(val => ({
   operations: val.operations as unknown as Record<string, PersistedOperation>,
   tasks: val.tasks as unknown as Record<string, PersistedTask>
}))

type RawInput = z.infer<typeof rawSchema>

type Input = z.infer<typeof internalSchema>

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    parseErrMsg: `The persistent state is invalid`,
    unknownErrMsg: `Something went wrong trying to parse the persistent state`
})

export type PersistentState = z.infer<typeof schemas.schema>
export type t = PersistentState
export type State = PersistentState

export const {create, of, make} = factory