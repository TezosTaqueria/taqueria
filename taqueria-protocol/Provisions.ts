import {z, ZodError} from "zod"
import {resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as ProvisionerID from "@taqueria/protocol/ProvisionerID"
import * as Provisioner from "@taqueria/protocol/Provisioner"
import {partitionArray, uniq} from "rambda"
import {memoizy} from "memoizy"


const getInvalidIds = memoizy((provisions: Provisioner.t[]) => {
    const ids = provisions.map(p => p.id)
    return provisions.reduce(
        (retval, provision) => {
            const depends_on = provision.depends_on ?? []
            const invalid = partitionArray(
                (id: ProvisionerID.t) => ids.includes(id),
                depends_on
            ).pop() as ProvisionerID.t[]

            return uniq([...retval, ...invalid])
        },
        [] as ProvisionerID.t[]
    )
})

const rawSchema = z
    .array(
        Provisioner.rawSchema
    )
    .refine(
        provisions => getInvalidIds(provisions).length === 0,
        provisions => ({message: `One or more of your provisioners depends on an invalid provisioner. The following provisioner ids were referenced that do not exist: ${getInvalidIds(provisions).join(", ")}`})
    )
    .describe("Provisions")
    
type RawInput = z.infer<typeof rawSchema>

const internalSchema = z
    .array(Provisioner.schema)
    .refine(
        provisions => getInvalidIds(provisions).length === 0,
        provisions => ({message: `One or more of your provisioners depends on an invalid provisioner. The following provisioner ids were referenced that do not exist: ${getInvalidIds(provisions).join(", ")}`})
    )
    .describe("Provisions")


type Input = z.infer<typeof internalSchema>

const schema = internalSchema.transform(val => val as Provisions)

export type Provisions = Input
export type t = Provisions

export const make = (data: Input) => {
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