import {z} from 'zod'
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"
import createType from "@taqueria/protocol/Base"

const internalSchema = z.object({
    encryptedKey: z.string({description: "Sandbox Account Encrypted Key"}).min(1),
    publicKeyHash: PublicKeyHash.schemas.schema.describe("Sandbox Account Public Key Hash"),
    secretKey: z.string({description: "Sandbox Account Secret Key"}).min(1)
}, {description: "Sandbox Account Configuration"})

export const rawSchema = z.object({
    encryptedKey: z.string({description: "Sandbox Account Encrypted Key"}).min(1),
    publicKeyHash: z.string({description: "Sandbox Account Public Key Hash"}).min(1),
    secretKey: z.string({description: "Sandbox Account Secret Key"}).min(1)
}, {description: "Sandbox Account Configuration"})

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export const {schemas: generatedSchemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: "The sandbox account configuration is invalid",
    unknownErrMsg: "Something went wrong trying to parse the sandbox account configuration"
})

export type SandboxAccountConfig = z.infer<typeof generatedSchemas.schema>
export type t = SandboxAccountConfig
export const {create, of, make} = factory

export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as SandboxAccountConfig)
}