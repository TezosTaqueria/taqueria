import {z, ZodError} from "zod"
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as PersistentState from "@taqueria/protocol/PersistentState"

const provisionerType: unique symbol = Symbol("Provisioner")

const internalSchema = z.object(
    {
        id: z
            .string()
            .nonempty()
            .regex(/^[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+$/)
            .describe('Provisioner ID'),
        plugin: z
            .string()
            .nonempty()
            .describe("Provisioner Plugin")
            .optional(),
        operation: z
            .union([
                z.string().nonempty(),
                z.literal('custom')
            ])
            .describe("Provisioner Operation"),
        command: z
            .string()
            .describe("Provisioner Custom Command")
            .optional(),
        depends_on: z.
            array(
                z.string()
            )
            .optional()
    },
    {
        description: "Provisioner"
    }
)
.passthrough()

export const rawSchema = internalSchema

export interface RawInput extends z.infer<typeof rawSchema> {
    handler?: Handler
}

type OperationCallback = (...args: unknown[]) => unknown
type Handler = (state: PersistentState.t, op: OperationCallback) => unknown

export interface Provisioner extends RawInput {
    readonly [provisionerType]: void
    toString: () => string
    
}
export type t = Provisioner

export const schema = internalSchema.transform((val: unknown) => val as Provisioner)

export const make = (data: RawInput) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Provisioner>(err, `The provided provisioner is invalid.`, data)
        }
        return toParseUnknownErr<Provisioner>(err, "There was a problem trying to parse the provisioner", data)
    }
}

export const create = (data: RawInput) => schema.parse(data)