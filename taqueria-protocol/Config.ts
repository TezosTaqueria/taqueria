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

const accountsMap = z.record(
    z.union([Tz.rawSchema, z.number()])
)

export const internalSchema = z.object({
    language: z.union([z.literal('en'), z.literal('fr')]).default('en').optional(),
    plugins: z.array(InstalledPlugin.schema).default([]).optional(),
    testsDir: z.string().default('tests').optional(),
    contractsDir: z.string().default('contracts').optional(),
    artifactsDir: z.string().nonempty().default('artifacts').optional(),
    operationsDir: z.string().nonempty().default('operations').optional(),
    network: networkMap,
    sandbox: sandboxMap,
    environment: environmentMap,
    accounts: accountsMap
})

export const rawSchema = z.object({
    language: z.union([z.literal('en'), z.literal('fr')]).default('en').optional(),
    plugins: z.array(InstalledPlugin.schema).default([]).optional(),
    testsDir: z.string().default('tests').optional(),
    contractsDir: z.string().default('contracts').optional(),
    artifactsDir: z.string().nonempty().default('artifacts').optional(),
    operationsDir: z.string().nonempty().default('operations').optional(),
    network: z.record(
        z.union([
            NetworkConfig.rawSchema,
            z.string().nonempty()
        ])
    ).optional(),
    sandbox: z.record(
        z.union([
            SandboxConfig.rawSchema,
            z.string().nonempty()
        ])
    ),
    environment: z.record(
        z.union([
            Environment.rawSchema,
            z.string().nonempty()
        ])
    ).optional(),
    accounts: z.record(
        z.union([Tz.rawSchema, z.number()])
    ).optional()
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

export const create = (data: RawInput) => schema.parse(data)