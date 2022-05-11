import {z} from "zod"
import * as SHA256 from "@taqueria/protocol/SHA256"

const internalOp = z.object({
    hash: SHA256.rawSchema.describe("state.op.hash"),
    time: z.number().min(1651846877).describe("state.op.time"),
    output: z.unknown().describe("state.op.output")
}).describe("Persistent State")

export const rawSchema = z.record(internalOp)

export const stateType: unique symbol = Symbol("PersistentState")

type Input = z.infer<typeof rawSchema>

export interface PersistentState extends Input {
    readonly [stateType]: void
}

export type t = PersistentState

export type State = PersistentState

export const schema = rawSchema.transform((val: unknown) => val as PersistentState)

export const make = (data: Input) => schema.parse(data)

export const create = (data: Input | Record<string, unknown> | unknown) => schema.parse(data)
