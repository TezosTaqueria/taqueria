import {z} from "zod"
import * as Provisioner from "@taqueria/protocol/Provisioner"

const getAllProvisionerIds = (input: Provisioner.RawInput[]) => input.reduce(
    (retval, provisioner) => ([...retval, provisioner.id]),
    [] as string[]
)

const rawSchema = z
    .array(
        Provisioner.rawSchema
    )
    .describe("Provisions")

const noop = (_input: unknown) => {}    

type RawInput = z.infer<typeof rawSchema>
export type Provisions = RawInput
export type t = Provisions

export const schema = z
    .array(Provisioner.schema)
    .refine((val: Provisioner.RawInput[]) =>
        val.reduce(
            (retval, provisioner) => {
                if (provisioner.depends_on) {
                    const ids = getAllProvisionerIds(val)
                    provisioner.depends_on.reduce(
                        (retval, dep) => !retval && ids.includes(dep),
                        retval
                    )
                }
                return true
            },
            true as boolean
        ),
        "The depends_on property of a provision must refer to another provision"
    )
    .transform(val => val as Provisions)

export const create = (input: RawInput | Record<string, unknown> | unknown) =>  schema.parse(input) as Provisions