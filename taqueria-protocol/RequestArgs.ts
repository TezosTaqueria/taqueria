import {z} from 'zod'
import {rawSchema as sanitizedArgsSchema} from "@taqueria/protocol/SanitizedArgs"
import * as LoadedConfig from "@taqueria/protocol/LoadedConfig"
import createType from "@taqueria/protocol/Base"

const rawSchema = sanitizedArgsSchema.extend({
    taqRun: z.union([
        z.literal('pluginInfo'),
        z.literal('proxy'),
        z.literal('checkRuntimeDependencies'),
        z.literal('installRuntimeDependencies'),
    ], {description: "request.taq_run"}),
    config: z.preprocess(
        val => typeof val === 'string' ? JSON.parse(val) : val,
        LoadedConfig.rawSchema
    )
}).describe("RequestArgs").passthrough()

const internalSchema = sanitizedArgsSchema.extend({
    taqRun: z.union([
        z.literal('pluginInfo'),
        z.literal('proxy'),
        z.literal('checkRuntimeDependencies'),
        z.literal('installRuntimeDependencies'),
    ], {description: "request.taq_run"}),
    config: z.preprocess(
        val => typeof val === 'string' ? JSON.parse(val) : val,
        LoadedConfig.schemas.schema
    )
}).describe("RequestArgs").passthrough()

type RawInput = z.infer<typeof rawSchema>
type Input = z.infer<typeof internalSchema>

export const {schemas: generatedSchemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: "The request is invalid",
    unknownErrMsg: "Something went wrong trying to parse the request"
})

export type RequestArgs = z.infer<typeof generatedSchemas.schema>
export type t = RequestArgs

export const schemas = {
    ...generatedSchemas,
    schema: generatedSchemas.schema.transform(val => val as RequestArgs)
}

const rawProxySchema = rawSchema.extend({
    task: z.string().min(1)
}).describe("ProxyRequestArgs").passthrough()

const internalProxySchema = internalSchema.extend({
    task: z.string().min(1)
}).describe("ProxyRequestArgs").passthrough()

type RawProxyInput = z.infer<typeof rawProxySchema>
type ProxyInput = z.infer<typeof internalProxySchema>

export const proxy = createType<RawProxyInput, ProxyInput>({
    rawSchema: rawProxySchema,
    internalSchema: internalProxySchema,
    parseErrMsg: "The request is invalid",
    unknownErrMsg: "Something went wrong trying to parse the request"  
})

export const proxySchemas = proxy.schemas
export const proxyFactory = proxy.factory

export type ProxyRequestArgs = z.infer<typeof proxySchemas.schema>

export const createProxyRequestArgs = proxyFactory.from
export const makeProxyRequestArgs = proxyFactory.make
export const ofProxyRequestArgs = proxyFactory.of
export const {create, make, of, from} = factory