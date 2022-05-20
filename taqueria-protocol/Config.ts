import {z, ZodError} from 'zod'
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin'
import * as NetworkConfig from '@taqueria/protocol/NetworkConfig'
import * as SandboxConfig from "@taqueria/protocol/SandboxConfig"
import * as Environment from "@taqueria/protocol/Environment"
import * as Tz from "@taqueria/protocol/Tz"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import {resolve, reject} from "fluture"

const networkMap = z
    .record(
        z.union([
            NetworkConfig.schema,
            z.string({description: "config.network"})
            .nonempty("Default network must reference the name of an  existing network configuration.")
        ]),
        {description: "Network configurations"}
    )
    .optional()

const sandboxMap = z
    .record(
        z.union([
            SandboxConfig.schema,
            z.string({description: "config.sandbox"})
            .nonempty("Default sandbox must reference the name of an existing sandbox configuration.")
        ]),
        {description: "Sandbox configurations"}
    )
    .optional()

const environmentMap = z
    .record(
        z.union([
            Environment.schema,
            z.string({description: "config.environment"})
            .nonempty("Default environment must reference the name of an existing environment.")
        ]),
        {description: "Environment configurations"}
    )
    .optional()

const accountsMap = z.preprocess(
    (val: unknown) => val ?? {
        "bob": "5_000_000_000",
        "alice": "5_000_000_000",
        "john": "5_000_000_000",
    },
    z.record(
        z.union([Tz.rawSchema, z.number()]),
        {description: "config.accounts"}
    )
)

const commonSchema = z.object({
    language: z
        .union([z.literal('en'), z.literal('fr')], {description: "config.language"})
        .optional()
        .transform((val?: 'en' | 'fr' | string) => val ?? 'en'),
    plugins: z
        .array(InstalledPlugin.schema, {description: "config.plugins"})
        .optional()
        .transform((val: unknown) => val ?? ([] as InstalledPlugin.t[])),
    testsDir: z
        .preprocess(
            (val: unknown) => val ?? "tests",
            z.string({description: "config.testsDir"})
            .nonempty("config.testsDir must have a value")
            .optional()
        ),
    contractsDir: z
        .preprocess(
            (val: unknown) => val ?? "contracts",
            z.string({description: "config.contractsDir"})
            .nonempty("config.contractsDir must have a value")
            .optional()
        ),
    artifactsDir: z
        .preprocess(
            (val: unknown) => val ?? "artifacts",
            z.string({description: "config.artifactsDir"})
            .nonempty("config.artifactsDir must have a value")
            .optional()
        ),
    operationsDir: z
        .preprocess(
            (val: unknown) => val ?? "operations",
            z.string({description: "config.operationsDir"})
            .nonempty("config.operationsDir must have a value")
            .optional()
        )
}).describe("config")

export const internalSchema = commonSchema.extend({
    network: networkMap,
    sandbox: sandboxMap,
    environment: environmentMap,
    accounts: accountsMap
})

export const rawSchema = commonSchema.extend({
    network: z
        .record(
            z.union([
                NetworkConfig.rawSchema,
                z.string({description: "config.network"})
                .nonempty("Default network must reference the name of an  existing network configuration.")
            ])
        )
        .optional(),
    sandbox: z
        .record(
            z.union([
                SandboxConfig.rawSchema,
                z.string({description: "config.sandbox"})
                .nonempty("Default sandbox must reference the name of an existing sandbox configuration.")
            ])
        )
        .optional(),
    environment: z
        .record(
            z.union([
                Environment.rawSchema,
                z.string({description: "config.environment"})
            .nonempty("Default environment must reference the name of an existing environment.")
            ])
        )
        .optional(),
    accounts: z
        .record(
            z.union([Tz.rawSchema, z.number()]),
            {description: "config.accounts"}
        )
        .optional()
}).describe("config")

export const schema = internalSchema.transform((val: unknown) => val as t)

const configType: unique symbol = Symbol("Config")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [configType]: void
    readonly contractsDir: string
    readonly artifactsDir: string
    readonly testsDir: string
    readonly plugins: InstalledPlugin.t[]
}

export type Config = t

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Config>(err, `The provided config is invalid.`, data)
        }
        return toParseUnknownErr<Config>(err, 'There was a problem trying to parse the Taqueria configuration', data)
    }
}

export const of = (data: RawInput | Record<string, unknown>) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<Config>(err, `The provided config is invalid.`, data)
        }
        return toParseUnknownErr<Config>(err, 'There was a problem trying to parse the Taqueria configuration', data)
    }
}

export const create = (data: RawInput | Record<string, unknown>) => schema.parse(data)