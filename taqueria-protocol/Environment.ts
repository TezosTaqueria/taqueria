import {z, ZodError} from 'zod'
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"

export const rawSchema = z.object({
    networks: z.array(
        z.string({description: "Environment network"})
        .nonempty("Must reference the name of an existing network configuration")
    ),
    sandboxes: z.array(
        z.string({description: "Environment sandbox"})
        .nonempty("Must reference the name of an existing sandbox configuration")
    ),
    storage: z.record(
        z.any({description: "Environment storage value"}),
        {description: "Environment storage"}
    )
    .optional()
}).describe("Environment Config")

export const schema = rawSchema.transform(val => val as Environment)

const envType: unique symbol = Symbol("Environment")

type Input = z.infer<typeof rawSchema>

export type Environment = Input & {
    readonly [envType]: void
}

export type t = Environment

export const make = (value: Input) => {
    try {
        const retval = schema.parse(value)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Environment>(err, `The provided environment is invalid`, value)
        }
        return toParseUnknownErr<Environment>(err, "There was a problem trying to parse the environment configuration", value)
    }
}