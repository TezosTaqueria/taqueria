import { RequestArgs } from '@taqueria/protocol-types';
import { PluginDependenciesResponse, PluginProxyResponse } from '@taqueria/protocol-types/types';
import * as Alias from '@taqueria/protocol/Alias';
import createType from '@taqueria/protocol/Base';
import * as Operation from '@taqueria/protocol/Operation';
import * as PluginInfo from '@taqueria/protocol/PluginInfo';
import * as Template from '@taqueria/protocol/Template';
import { z } from 'zod';

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
}).passthrough().describe('ParsedPluginInfo');

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
}).passthrough().describe('ParsedPluginInfo');

type Input = z.infer<typeof internalSchema> & {
	proxy: <T extends RequestArgs.t>(
		args: T,
	) => PluginProxyResponse | Promise<PluginProxyResponse> | Promise<void> | void;
	checkRuntimeDependencies?: <T extends RequestArgs.t>(args: T) => PluginDependenciesResponse;
	installRuntimeDependencies?: <T extends RequestArgs.t>(args: T) => PluginDependenciesResponse;
};

export type RawPluginSchema = z.infer<typeof rawSchema> & {
	proxy: <T extends RequestArgs.t>(
		args: T,
	) => PluginProxyResponse | Promise<PluginProxyResponse> | Promise<void> | void;
	checkRuntimeDependencies?: <T extends RequestArgs.t>(args: T) => PluginDependenciesResponse;
	installRuntimeDependencies?: <T extends RequestArgs.t>(args: T) => PluginDependenciesResponse;
};

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
