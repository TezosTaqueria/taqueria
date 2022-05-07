import {z} from 'zod'
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
        LoadedConfig.schema.describe("request.config")
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

export const make = (data: Input) => schema.parse(data)

export const makeProxyArgs = (data: ProxyInput) => proxySchema.parse(data)

export const createProxyArgs = (data: Record<string, unknown> | ProxyInput | unknown) => proxySchema.parse(data)