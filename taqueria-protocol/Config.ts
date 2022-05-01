// TODO - using .ts is necessary for Deno. Explore how to make this
// consumable by Deno or the TypeScript compiler without any warnings
// or errors emited
// @ts-ignore see above
import {z} from 'https://deno.land/x/zod@v3.14.4/mod.ts'
// @ts-ignore see above
import * as InstalledPlugin from './InstalledPlugin.ts'
// @ts-ignore see above
import * as NetworkConfig from './NetworkConfig.ts'
// @ts-ignore see above
import * as SandboxConfig from "./SandboxConfig.ts"
// @ts-ignore see above
import * as Environment from "./Environment.ts"
// @ts-ignore see above
import * as Tz from "./Tz.ts"

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

const accountsMap = z.record(Tz.schema).optional()

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
    accountsMap
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