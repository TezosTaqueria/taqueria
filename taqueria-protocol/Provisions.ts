import {z, ZodError} from "zod"
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
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

export const make = (data: RawInput) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Provisions>(err, `The provided provisions is invalid.`, data)
        }
        return toParseUnknownErr<Provisions>(err, "There was a problem trying to parse the provisions", data)
    }
}

export const of = (data: RawInput | Record<string, unknown> | unknown) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Provisions>(err, `The provided provisions is invalid.`, data)
        }
        return toParseUnknownErr<Provisions>(err, "There was a problem trying to parse the provisions", data)
    }
}

export const create = (input: RawInput | Record<string, unknown> | unknown) =>  schema.parse(input) as Provisions