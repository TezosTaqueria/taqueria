import {z} from 'zod'
import * as SanitizedAbsPath from "@taqueria/protocol/SanitizedAbsPath"
import * as Url from "@taqueria/protocol/Url"

 const initRawSchema =  z.object({
    _: z.array(z.string().nonempty()),
    projectDir: z.string().nonempty().transform(SanitizedAbsPath.make),
    maxConcurrency: z.preprocess(
        val => typeof val === 'string' ? parseInt(val) : Number(val),
        z.number().int().min(1).default(10),
    ),
    debug: z.preprocess(
        val => Boolean(val),
        z.boolean().default(false)
    ),
    disableState: z.preprocess(
        val => Boolean(val),
        z.boolean().default(false)
    ),
    logPluginRequests: z.preprocess(
        val => Boolean(val),
        z.boolean().default(false)
    ),
    fromVsCode: z.preprocess(
        val => Boolean(val),
        z.boolean().default(false)
    ),
    version: z.preprocess(
        val => Boolean(val),
        z.boolean().optional()
    ),
    build: z.preprocess(
        val => Boolean(val),
        z.boolean().optional()
    ),
    help: z.preprocess(
        val => Boolean(val),
        z.boolean().optional()
    ),
    plugin: z.string().nonempty().optional(),
    env: z.union([z.literal('production'), z.literal('testing'), z.literal('development'), z.string().nonempty()]).default("development"),
    quickstart: z.string().nonempty().optional(),
    setBuild: z.string().nonempty(),
    setVersion: z.string().nonempty(),
    template: z.string().nonempty().optional(),
    pluginName: z.string().nonempty().optional()
}).passthrough()

const scaffoldRawSchema = initRawSchema.extend({
    scaffoldProjectDir: z.string().nonempty().transform((val: unknown) => val as SanitizedAbsPath.t),
    scaffoldUrl: z.string().nonempty().url().transform((val: unknown) => val as Url.t),
})

const managePluginRawSchema = initRawSchema.extend({
    pluginName: z.string().nonempty()
})

const versionRawSchema = initRawSchema.extend({
    version: z.boolean().default(true)
})

const sanitizedArgsType: unique symbol = Symbol("SanitizedArgs")

type Input = z.infer<typeof initRawSchema>

export type SanitizedArgs = Input & {
    readonly [sanitizedArgsType]: void
}
export type t = SanitizedArgs
type ScaffoldInput = z.infer<typeof scaffoldRawSchema>
type ManagePluginInput = z.infer<typeof managePluginRawSchema>
type VersionInput = z.infer<typeof versionRawSchema>
export type ScaffoldArgs = ScaffoldInput & {
    readonly [sanitizedArgsType]: void
}
export type ManagePluginArgs = ManagePluginInput & {
    readonly [sanitizedArgsType]: void
}
export type VersionArgs = VersionInput & {
    readonly [sanitizedArgsType]: void
}

const scaffoldSchema = scaffoldRawSchema.transform((val: unknown) => val as ScaffoldArgs)

const managePluginSchema = managePluginRawSchema.transform((val: unknown) => val as ManagePluginArgs)

const versionSchema = versionRawSchema.transform((val: unknown) => val as VersionArgs)

export const rawSchema = initRawSchema

export const schema = initRawSchema.transform((val: unknown) => val as SanitizedArgs)

export const make = (input: Input) => schema.parse(input)

export const create = (input: Record<string, unknown>) => schema.parse(input)

export const initArgs = (inputArgs: Record<string, unknown>) => schema.parse(inputArgs)

export const installArgs = (inputArgs: Record<string, unknown>) => managePluginSchema.parse(inputArgs)

export const uninstallArgs = (inputArgs: Record<string, unknown>) => managePluginSchema.parse(inputArgs)

export const scaffoldArgs = (inputArgs: Record<string, unknown>) => scaffoldSchema.parse(inputArgs)

export const versionArgs = (inputArgs: Record<string, unknown>) => versionSchema.parse(inputArgs)