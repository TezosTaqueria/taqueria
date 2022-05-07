import {z} from 'zod'
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin'
import * as NetworkConfig from '@taqueria/protocol/NetworkConfig'
import * as SandboxConfig from "@taqueria/protocol/SandboxConfig"
import * as Environment from "@taqueria/protocol/Environment"
import * as Tz from "@taqueria/protocol/Tz"

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
    val => val ?? {
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
        .transform(val => val ?? 'en'),
    plugins: z
        .array(InstalledPlugin.schema, {description: "config.plugins"})
        .optional()
        .transform(val => val ?? []),
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
        ),
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

export const schema = internalSchema.transform(val => val as t)

const configType: unique symbol = Symbol("Config")

type Input = z.infer<typeof internalSchema>

type RawInput = z.infer<typeof rawSchema>

export type t = Input & {
    readonly [configType]: void
}

export type Config = t

export const make = (data: Input) => schema.parse(data)

export const create = (data: RawInput | Record<string, unknown>) => schema.parse(data)