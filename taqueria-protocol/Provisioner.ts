import {z} from "zod"
import * as ProvisionerID from "@taqueria/protocol/ProvisionerID"
import createType from "@taqueria/protocol/Base"

export const rawSchema = z.object(
    {
        id: ProvisionerID.rawSchema,
        plugin: z
            .string()
            .min(1)
            .describe("Provisioner Plugin")
            .optional(),
        operation: z
            .union([
                z.string().min(1),
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
    id: ProvisionerID.schemas.schema,
    depends_on: z.array(ProvisionerID.schemas.schema).optional()
})

type RawInput = z.infer<typeof rawSchema>
type Input = z.infer<typeof internalSchema>

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: "There was a problem trying to parse the provisioner",
    unknownErrMsg: "Something went wrong trying to parse the provisioner"
})

export type Provisioner = z.infer<typeof schemas.schema>
export type t = Provisioner
export const {create, of, make} = factory