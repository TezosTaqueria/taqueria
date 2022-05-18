import {z, ZodError} from "zod"
import {resolve, reject} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
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

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<PersistentState>(err, `The persistent state is invalid.`, data)
        }
        return toParseUnknownErr<PersistentState>(err, "There was a problem trying to parse the persistent state", data)
    }
}

export const create = (data: Input | Record<string, unknown> | unknown) => schema.parse(data)
