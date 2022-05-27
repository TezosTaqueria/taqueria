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

export const {schemas, factory} = createType<RawInput, Input>({
    rawSchema,
    internalSchema,
    parseErrMsg: "The request is invalid",
    unknownErrMsg: "Something went wrong trying to parse the request"
})

export type RequestArgs = z.infer<typeof schemas.schema>
export type t = RequestArgs

const rawProxySchema = rawSchema.extend({
    task: z.string().nonempty()
}).describe("ProxyRequestArgs").passthrough()

const internalProxySchema = internalSchema.extend({
    task: z.string().nonempty()
}).describe("ProxyRequestArgs").passthrough()

type RawProxyInput = z.infer<typeof rawProxySchema>
type ProxyInput = z.infer<typeof internalProxySchema>

const proxy = createType<RawProxyInput, ProxyInput>({
    rawSchema: rawProxySchema,
    internalSchema: internalProxySchema,
    parseErrMsg: "The request is invalid",
    unknownErrMsg: "Something went wrong trying to parse the request"  
})

export const proxySchemas = proxy.schemas
export const proxyFactory = proxy.factory

export type ProxyRequestArgs = z.infer<typeof proxySchemas.schema>

export const createProxyRequestArgs = proxyFactory.create
export const makeProxyRequestArgs = proxyFactory.make
export const ofProxyRequestArgs = proxyFactory.of
export const {create, of, make} = factory