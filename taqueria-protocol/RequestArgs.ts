import createType from '@taqueria/protocol/Base';
import * as LoadedConfig from '@taqueria/protocol/LoadedConfig';
import { rawSchema as sanitizedArgsSchema } from '@taqueria/protocol/SanitizedArgs';
import { z } from 'zod';

const taqRunSchema = z.union([
	z.literal('pluginInfo'),
	z.literal('proxy'),
	z.literal('checkRuntimeDependencies'),
	z.literal('installRuntimeDependencies'),
	z.literal('proxyTemplate'),
]);

const rawSchema = sanitizedArgsSchema.extend({
	taqRun: taqRunSchema,
	config: z.preprocess(
		val => typeof val === 'string' ? JSON.parse(val) : val,
		LoadedConfig.rawSchema,
	),
}).describe('RequestArgs').passthrough();

const internalSchema = sanitizedArgsSchema.extend({
	taqRun: taqRunSchema,
	config: z.preprocess(
		val => typeof val === 'string' ? JSON.parse(val) : val,
		LoadedConfig.schemas.schema,
	),
}).describe('RequestArgs').passthrough();

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: 'The request is invalid',
	unknownErrMsg: 'Something went wrong trying to parse the request',
});

export type RequestArgs = z.infer<typeof generatedSchemas.schema>;
export type t = RequestArgs;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as RequestArgs),
};

const rawProxyTaskSchema = rawSchema.extend({
	task: z.string().min(1),
}).describe('ProxyRequestArgs').passthrough();

const internalProxyTaskSchema = internalSchema.extend({
	task: z.string().min(1),
}).describe('ProxyRequestArgs').passthrough();

const rawProxyTemplateSchema = rawSchema.extend({
	template: z.string().min(1),
});

const internalProxyTemplateSchema = rawSchema.extend({
	template: z.string().min(1),
});

type RawProxyInput = z.infer<typeof rawProxyTaskSchema>;
type ProxyInput = z.infer<typeof internalProxyTaskSchema>;
type RawProxyTemplateInput = z.infer<typeof rawProxyTemplateSchema>;
type ProxyTemplateInput = z.infer<typeof internalProxyTemplateSchema>;

export const proxy = createType<RawProxyInput, ProxyInput>({
	rawSchema: rawProxyTaskSchema,
	internalSchema: internalProxyTaskSchema,
	parseErrMsg: 'The request is invalid',
	unknownErrMsg: 'Something went wrong trying to parse the request',
});

export const proxyTemplate = createType<RawProxyTemplateInput, ProxyTemplateInput>({
	rawSchema: rawProxyTemplateSchema,
	internalSchema: internalProxyTemplateSchema,
	parseErrMsg: 'The request is invalid',
	unknownErrMsg: 'Something went wrong trying to parse the request',
});

export const proxySchemas = proxy.schemas;
export const proxyFactory = proxy.factory;

export type ProxyRequestArgs = z.infer<typeof proxySchemas.schema>;
export type ProxyTemplateRequestArgs = z.infer<typeof proxyTemplate.schemas.schema>;

export const createProxyRequestArgs = proxyFactory.from;
export const makeProxyRequestArgs = proxyFactory.make;
export const ofProxyRequestArgs = proxyFactory.of;

export const createProxyTemplateRequestArgs = proxyTemplate.factory.from;
export const makeProxyTemplateRequestArgs = proxyTemplate.factory.make;
export const ofProxyTemplateRequestArgs = proxyTemplate.factory.of;

export const { create, make, of, from } = factory;
