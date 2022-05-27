import {z} from "zod"
import * as SHA256 from "@taqueria/protocol/SHA256"
import createType from "@taqueria/protocol/Base"

const rawOpSchema = z.object({
    hash: SHA256.rawSchema.describe("state.op.hash"),
    time: z.number().min(1651846877).describe("state.op.time"),
    output: z.unknown().describe("state.op.output")
}).describe("Persistent State Operation") 

const internalOpSchema = z.object({
    hash: SHA256.schemas.schema.describe("state.op.hash"),
    time: z.number().min(1651846877).describe("state.op.time"),
    output: z.unknown().describe("state.op.output")
})

export const rawSchema = z.record(rawOpSchema)

export const internalSchema = z.record(internalOpSchema)

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