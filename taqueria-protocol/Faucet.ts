import {z} from 'zod'
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"
import createType, {Flatten} from "@taqueria/protocol/Base"

export const rawSchema = z.object({
    pkh: z.string({description: "Faucet Public Key Hash"}).min(1),
    mnemonic: z.array(
        z.string({description: "Faucet Mnemonic Word"}).min(1),
        {description: "Faucet Mnemonic"}
    ),
    email: z.string({description: "Faucet E-mail"}).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string({description: "Faucet Password"}).min(1),
    amount: z.string({description: "Faucet Account"}).min(1).regex(/^\d+$/),
    activation_code: z.string({description: "Faucet Activation Code"}).min(1)
}).describe("Faucet")

const internalSchema = z.object({
    pkh: PublicKeyHash.schemas.schema,
    mnemonic: z.array(
        z.string({description: "Faucet Mnemonic Word"}).nonempty().regex(/^[a-z]{2,}$/),
        {description: "Faucet Mnemonic"}
    ),
    email: z.string({description: "Faucet E-mail"}).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string({description: "Faucet Password"}).nonempty(),
    amount: z.string({description: "Faucet Account"}).nonempty().regex(/^\d+$/),
    activation_code: z.string({description: "Faucet Activation Code"}).nonempty()
}).describe("Faucet")

type RawInput = z.infer<typeof rawSchema>
type Input = z.infer<typeof internalSchema>

export const {schemas: generatedSchemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: (value:unknown) => `${value} is not a valid faucet configuration`,
    unknownErrMsg: "Something went wrong trying to parse the faucet"
})

export type Faucet = Flatten<z.infer<typeof generatedSchemas.schema>>
export type t = Faucet
export const {create, of, make} = factory

export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as Faucet)
}