import {z, ZodError} from 'zod'
import {resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import * as SanitizedAbsPath from "@taqueria/protocol/SanitizedAbsPath"
import * as Url from "@taqueria/protocol/Url"

 const initRawSchema =  z.object({
    _: z.array(z.string().nonempty()),
    projectDir: SanitizedAbsPath.schema,
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
}, {description: "Sanitizied Args"}).passthrough()

const scaffoldRawSchema = initRawSchema.extend({
    scaffoldProjectDir: z.string().nonempty().transform((val: unknown) => val as SanitizedAbsPath.t),
    scaffoldUrl: z.string().nonempty().url().transform((val: unknown) => val as Url.t),
})

const provisionRawSchema = initRawSchema
    .extend({
        operation: z
            .string()
            .nonempty()
            .describe("Operation name"),
        name: z
            .string()
            .nonempty()
            .regex(/^[a-z0-9]+[a-z0-9-_]$/, "Provisioner name must consist of one or more letters/numbers and may not start with an underscore or dash.")
            .describe("Provisioner name")
            .optional()
    })
    .passthrough()

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
type ProvisionInput = z.infer<typeof provisionRawSchema>

export type ScaffoldArgs = ScaffoldInput & {
    readonly [sanitizedArgsType]: void
}
export type ManagePluginArgs = ManagePluginInput & {
    readonly [sanitizedArgsType]: void
}
export type VersionArgs = VersionInput & {
    readonly [sanitizedArgsType]: void
}
export interface ProvisionArgs extends ProvisionInput {
    readonly [sanitizedArgsType]: void
}

const scaffoldSchema = scaffoldRawSchema.transform((val: unknown) => val as ScaffoldArgs)

const managePluginSchema = managePluginRawSchema.transform((val: unknown) => val as ManagePluginArgs)

const versionSchema = versionRawSchema.transform((val: unknown) => val as VersionArgs)

const provisionSchema = provisionRawSchema.transform((val: unknown) => val as ProvisionArgs)

export const rawSchema = initRawSchema

export const schema = initRawSchema.transform((val: unknown) => val as SanitizedArgs)

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SanitizedArgs>(err, `The provided arguments are invalid.`, data)
        }
        return toParseUnknownErr<SanitizedArgs>(err, "There was a problem trying to parse the arguments for this command", data)
    }
}

export const makeInitArgs = make

export const makeInstallArgs = (data: Input) => {
    try {
        const retval = managePluginSchema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ManagePluginArgs>(err, `The provided arguments to install a plugin are invalid.`, data)
        }
        return toParseUnknownErr<ManagePluginArgs>(err, "There was a problem trying to parse the arguments for the install task", data)
    }
}

export const makeUninstallArgs = (data: Input) => {
    try {
        const retval = managePluginSchema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ManagePluginArgs>(err, `The provided arguments to uninstall a plugin are invalid.`, data)
        }
        return toParseUnknownErr<ManagePluginArgs>(err, "There was a problem trying to parse the arguments for the uninstall task", data)
    }
}

export const makeScaffoldArgs = (data: Input) => {
    try {
        const retval = scaffoldSchema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ScaffoldArgs>(err, `The provided arguments to scaffold a project are invalid.`, data)
        }
        return toParseUnknownErr<ScaffoldArgs>(err, "There was a problem trying to parse the arguments for the scaffold task", data)
    }
}

export const makeVersionArgs = (data: Input) => {
    try {
        const retval = versionSchema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<VersionArgs>(err, `The provided arguments are invalid.`, data)
        }
        return toParseUnknownErr<VersionArgs>(err, "There was a problem trying to parse the arguments for the version command", data)
    }
}

export const makeProvisionArgs = (data: Input) => {
    try {
        const retval = provisionSchema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ProvisionArgs>(err, `The provided arguments to provision an operation are invalid.`, data)
        }
        return toParseUnknownErr<ProvisionArgs>(err, "There was a problem trying to parse the arguments for the provision task", data)
    }
}

export const of = (data: Record<string, unknown>) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<SanitizedArgs>(err, `The provided arguments are invalid.`, data)
        }
        return toParseUnknownErr<SanitizedArgs>(err, "There was a problem trying to parse the arguments for this command", data)
    }
}


export const create = (input: Record<string, unknown>) => schema.parse(input)