import {z} from "zod"
import * as ProvisionerID from "@taqueria/protocol/ProvisionerID"
import * as Provisioner from "@taqueria/protocol/Provisioner"
import {partitionArray, uniq} from "rambda"
import {memoizy} from "memoizy"
import createType, {Flatten} from "@taqueria/protocol/Base"

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
    .array(Provisioner.schemas.schema)
    .refine(
        provisions => getInvalidIds(provisions).length === 0,
        provisions => ({message: `One or more of your provisioners depends on an invalid provisioner. The following provisioner ids were referenced that do not exist: ${getInvalidIds(provisions).join(", ")}`})
    )
    .describe("Provisions")


type Input = z.infer<typeof internalSchema>

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: (value: unknown) => `The following provision is invalid: ${value}`,
    unknownErrMsg: "Something went wrong parsing the list of provisioners"
})

export type Provisions = Flatten<z.infer<typeof schemas.schema>>
export type t = Provisions
export const {create, of, make} = factory