import {z} from "zod"
import * as PersistentState from "@taqueria/protocol/PersistentState"

const provisionerType: unique symbol = Symbol("Provisioner")

const handlerReturnSchema = z.union([
    z.record(z.unknown()),
    z.string(),
    z.number(),
    z.boolean(),
    z.date()
])

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
        handler: z
            .function()
            .args(
                PersistentState.schema.describe("state"),
                z.function().describe("fn").returns(handlerReturnSchema).optional()
            )
            .returns(handlerReturnSchema)
            .describe("Provisioner Handler")
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

export const rawSchema = internalSchema.omit({handler: true})

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

export const make = (data: RawInput) => schema.parse(data)

export const create = (data: RawInput) => schema.parse(data)