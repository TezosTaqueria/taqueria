import {z} from 'zod'
import * as PublicKeyHash from "@taqueria/protocol/PublicKeyHash"
import createType, {Flatten} from "@taqueria/protocol/Base"

export const rawSchema = z.object({
    pkh: z.string({description: "Faucet Public Key Hash"}).nonempty(),
    mnemonic: z.array(
        z.string({description: "Faucet Mnemonic Word"}).nonempty(),
        {description: "Faucet Mnemonic"}
    ),
    email: z.string({description: "Faucet E-mail"}).regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    password: z.string({description: "Faucet Password"}).nonempty(),
    amount: z.string({description: "Faucet Account"}).nonempty().regex(/^\d+$/),
    activation_code: z.string({description: "Faucet Activation Code"}).nonempty()
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

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: (value:unknown) => `${value} is not a valid faucet configuration`,
    unknownErrMsg: "Something went wrong trying to parse the faucet"
})

export type Faucet = Flatten<z.infer<typeof schemas.schema>>
export type t = Faucet
export const {create, of, make} = factory