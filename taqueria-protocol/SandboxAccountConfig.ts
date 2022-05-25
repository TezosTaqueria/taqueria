import {z} from 'zod'
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"
import createType from "@taqueria/protocol/Base"

const internalSchema = z.object({
    encryptedKey: z.string({description: "Sandbox Account Encrypted Key"}).nonempty(),
    publicKeyHash: PublicKeyHash.schemas.schema.describe("Sandbox Account Public Key Hash"),
    secretKey: z.string({description: "Sandbox Account Secret Key"}).nonempty()
}, {description: "Sandbox Account Configuration"})

export const rawSchema = z.object({
    encryptedKey: z.string({description: "Sandbox Account Encrypted Key"}).nonempty(),
    publicKeyHash: z.string({description: "Sandbox Account Public Key Hash"}).nonempty(),
    secretKey: z.string({description: "Sandbox Account Secret Key"}).nonempty()
}, {description: "Sandbox Account Configuration"})

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: "The sandbox account configuration is invalid",
    unknownErrMsg: "Something went wrong trying to parse the sandbox account configuration"
})

export type SandboxAccountConfig = z.infer<typeof schemas.schema>
export type t = SandboxAccountConfig
export const {create, of, make} = factory