import {z} from 'zod'
import createType, {Flatten} from "@taqueria/protocol/Base"

export const rawSchema = z.object({
    networks: z.array(
        z.string({description: "Environment network"})
        .min(1, "Must reference the name of an existing network configuration")
    ),
    sandboxes: z.array(
        z.string({description: "Environment sandbox"})
        .min(1, "Must reference the name of an existing sandbox configuration")
    ),
    storage: z.record(
        z.any({description: "Environment storage value"}),
        {description: "Environment storage"}
    )
    .optional()
}).describe("Environment Config")

type RawInput = z.infer<typeof rawSchema>

export const {schemas, factory} = createType<RawInput, RawInput>({
    rawSchema,
    parseErrMsg: (value: unknown) => `${value} is not an valid environment configuration`,
    unknownErrMsg: "Something went wrong trying to parse the environment configuration"
})

export type Environment = Flatten<z.infer<typeof schemas.schema>>
export type t = Environment

export const {create, make, of, from} = factory

export const {internalSchema} = schemas