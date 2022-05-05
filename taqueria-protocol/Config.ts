import {z} from 'zod'
import * as InstalledPlugin from '@taqueria/protocol/InstalledPlugin'
import * as NetworkConfig from '@taqueria/protocol/NetworkConfig'
import * as SandboxConfig from "@taqueria/protocol/SandboxConfig"
import * as Environment from "@taqueria/protocol/Environment"
import * as Tz from "@taqueria/protocol/Tz"

const networkMap = z.record(
    z.union([
        NetworkConfig.schema,
        z.string().nonempty()
    ])
).optional()

const sandboxMap = z.record(
    z.union([
        SandboxConfig.schema,
        z.string().nonempty()
    ])
).optional()

const environmentMap = z.record(
    z.union([
        Environment.schema,
        z.string().nonempty()
    ])
).optional()

const accountsMap = z.preprocess(
    val => val ?? {
        "bob": "5_000_000_000",
        "alice": "5_000_000_000",
        "john": "5_000_000_000",
    },
    z.record(
        z.union([Tz.rawSchema, z.number()])
    )
)

const commonSchema = z.object({
    language: z
        .union([z.literal('en'), z.literal('fr')])
        .optional()
        .transform(val => val ?? 'en'),
    plugins: z
        .array(InstalledPlugin.schema)
        .optional()
        .transform(val => val ?? []),
    testsDir: z
        .string()
        .optional()
        .transform(val => val ?? 'tests'),
    contractsDir: z
        .string()
        .nonempty()
        .optional()
        .transform(val => val ?? 'contracts'),
    artifactsDir: z
        .string()
        .nonempty()
        .optional()
        .transform(val => val ?? 'artifacts'),
    operationsDir: z
        .string()
        .nonempty()
        .optional()
        .transform(val => val ?? 'operations'),        
})

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
                z.string().nonempty()
            ])
        )
        .optional(),
    sandbox: z
        .record(
            z.union([
                SandboxConfig.rawSchema,
                z.string().nonempty()
            ])
        ),
    environment: z
        .record(
            z.union([
                Environment.rawSchema,
                z.string().nonempty()
            ])
        )
        .optional(),
    accounts: z
        .record(
            z.union([Tz.rawSchema, z.number()])
        )
        .optional()
})

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