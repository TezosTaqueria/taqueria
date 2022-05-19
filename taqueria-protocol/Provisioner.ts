import {z, ZodError} from "zod"
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as ProvisionerID from "@taqueria/protocol/ProvisionerID"
import * as PersistentState from "@taqueria/protocol/PersistentState"

const provisionerType: unique symbol = Symbol("Provisioner")

export const rawSchema = z.object(
    {
        id: ProvisionerID.rawSchema,
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
        label: z
            .string()
            .describe("Provisioner Label")
            .optional(),
        depends_on: z.
            array(
                ProvisionerID.rawSchema
            )
            .optional()
    },
    {
        description: "Provisioner"
    }
)
.passthrough()

export const internalSchema = rawSchema.extend({
    id: ProvisionerID.schema,
    depends_on: z.array(ProvisionerID.schema).optional()
})

export type RawInput = z.infer<typeof rawSchema>

export type Input = z.infer<typeof internalSchema>

export interface Provisioner extends Input {
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