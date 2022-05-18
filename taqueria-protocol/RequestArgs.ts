import {z, ZodError} from 'zod'
import {reject, resolve} from "fluture"
import {toParseErr, toParseUnknownErr} from "@taqueria/protocol/TaqError"
import {rawSchema as sanitizedArgsSchema} from "@taqueria/protocol/SanitizedArgs"
import * as LoadedConfig from "@taqueria/protocol/LoadedConfig"

const requestArgsType: unique symbol = Symbol("RequestArgs")

const internalSchema = sanitizedArgsSchema.extend({
    taqRun: z.union([
        z.literal('pluginInfo'),
        z.literal('proxy'),
        z.literal('checkRuntimeDependencies'),
        z.literal('installRuntimeDependencies'),
    ], {description: "request.taq_run"}),
    config: z.preprocess(
        val => typeof val === 'string' ? JSON.parse(val) : val,
        LoadedConfig.schema
    )
}).describe("RequestArgs").passthrough()

const internalProxySchema = internalSchema.extend({
    task: z.string().nonempty()
}).describe("ProxyRequestArgs").passthrough()

type Input = z.infer<typeof internalSchema>

type ProxyInput = z.infer<typeof internalProxySchema>

export interface RequestArgs extends Input {
    readonly [requestArgsType]: void
}

export type t = RequestArgs

export interface ProxyRequestArgs extends ProxyInput {
    readonly [requestArgsType]: void
}

export const schema = internalSchema.transform((val: unknown) => val as RequestArgs)

export const proxySchema = internalProxySchema.transform((val: unknown) => val as ProxyRequestArgs)

export const make = (data: Input) => {
    try {
        const retval = schema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<RequestArgs>(err, `The provided request is invalid.`, data)
        }
        return toParseUnknownErr<RequestArgs>(err, "There was a problem trying to parse the request arguments", data)
    }
}

export const makeProxyArgs = (data: ProxyInput) => {
    try {
        const retval = proxySchema.parse(data)
        return resolve(retval)
    }
    catch (err) {
        if (err instanceof ZodError) {
            return toParseErr<ProxyRequestArgs>(err, `The provided proxy request is invalid.`, data)
        }
        return toParseUnknownErr<ProxyRequestArgs>(err, "There was a problem trying to parse the request arguments for proxying", data)
    }
}

export const create = (data: Record<string, unknown> | Input | unknown) => schema.parse(data)


export const createProxyArgs = (data: Record<string, unknown> | ProxyInput | unknown) => proxySchema.parse(data)