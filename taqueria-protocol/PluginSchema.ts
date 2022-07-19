import * as Alias from '@taqueria/protocol/Alias';
import createType from '@taqueria/protocol/Base';
import * as Operation from '@taqueria/protocol/Operation';
import * as PluginDependenciesResponse from '@taqueria/protocol/PluginDependenciesResponse';
import * as PluginInfo from '@taqueria/protocol/PluginInfo';
import * as PluginProxyResponse from '@taqueria/protocol/PluginProxyResponse';
import * as RequestArgs from '@taqueria/protocol/RequestArgs';
import * as Template from '@taqueria/protocol/Template';
import { z } from 'zod';

const proxyFnSchema = z
	.function()
	.args(RequestArgs.proxySchemas.schema)
	.returns(z.promise(PluginProxyResponse.schemas.schema));

const runtimeDependenciesFn = z
	.function()
	.args(RequestArgs.schemas.schema)
	.returns(z.promise(PluginDependenciesResponse.schemas.schema));

const internalSchema = PluginInfo.internalSchema.extend({
	operations: z.preprocess(
		val => val ?? [],
		z.array(
			Operation.schemas.schema,
			{ description: 'ParsedOperations' },
		)
			.optional(),
	),
	templates: z.preprocess(
		val => val ?? [],
		z.array(
			Template.schemas.schema,
		).optional(),
	),
	proxy: proxyFnSchema.optional(),
	checkRuntimeDependencies: runtimeDependenciesFn.optional(),
	installRuntimeDependencies: runtimeDependenciesFn.optional(),
}).describe('ParsedPluginInfo');

export const rawSchema = PluginInfo.rawSchema.extend({
	name: Alias.rawSchema.optional(),
	operations: z.preprocess(
		val => val ?? [],
		z.array(
			Operation.rawSchema,
			{ description: 'ParsedOperation' },
		),
	)
		.optional(),
	templates: z.preprocess(
		val => val ?? [],
		z.array(
			Template.schemas.schema,
		).optional(),
	),
	proxy: proxyFnSchema.optional(),
	checkRuntimeDependencies: runtimeDependenciesFn.optional(),
	installRuntimeDependencies: runtimeDependenciesFn.optional(),
}).describe('ParsedPluginInfo');

type Input = z.infer<typeof internalSchema>;

export type RawPluginSchema = z.infer<typeof rawSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawPluginSchema, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) =>
		`The following plugin info gave us trouble when parsing the following plugin information: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the plugin information',
});

export type ParsedPluginInfo = z.infer<typeof generatedSchemas.schema>;
export type t = ParsedPluginInfo;
export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as ParsedPluginInfo),
};
