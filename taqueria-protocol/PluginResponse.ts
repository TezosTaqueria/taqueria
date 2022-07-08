import createType from '@taqueria/protocol/Base';
import * as ParsedPluginInfo from '@taqueria/protocol/ParsedPluginInfo';
import * as PluginInfo from '@taqueria/protocol/PluginInfo';
import * as PluginJsonResponse from '@taqueria/protocol/PluginJsonResponse';
import { z } from 'zod';

const rawRuntimeDependency = z.object({
	name: z.string(),
	path: z.string(),
	version: z.string(),
	kind: z.union([z.literal('required'), z.literal('optional')]),
});

type RawRuntimeDependencyInput = z.infer<typeof rawRuntimeDependency>;

export const runtimeDependency = createType<RawRuntimeDependencyInput, RawRuntimeDependencyInput>({
	rawSchema: rawRuntimeDependency,
	internalSchema: rawRuntimeDependency,
	parseErrMsg: (value: unknown) => `The following runtime dependency is invalid: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the template',
});

export type RuntimeDependency = z.infer<typeof runtimeDependency.schemas.schema>;

const pluginActionNameSchema = z.union([
	z.literal('checkRuntimeDependencies'),
	z.literal('installRuntimeDependencies'),
	z.literal('proxy'),
	z.literal('proxyTemplate'),
	z.literal('pluginInfo'),
]);

export type PluginActionName = z.infer<typeof pluginActionNameSchema>;

const runtimeDependencyReport = rawRuntimeDependency.extend({ met: z.boolean() });

export type RuntimeDependencyReport = z.infer<typeof runtimeDependencyReport>;

const checkRuntimeDependenciesResponseSchema = z.object({
	report: z.array(runtimeDependencyReport),
});

export type CheckRuntimeDependenciesResponse = z.infer<typeof checkRuntimeDependenciesResponseSchema>;

export type InstallRuntimeDependenciesResponse = z.infer<typeof checkRuntimeDependenciesResponseSchema>;

const pluginActionNotSupportedSchema = z.object({
	status: z.literal('notSupported'),
	msg: z.string(),
});

export type PluginActionNotSupportedResponse = z.infer<typeof pluginActionNotSupportedSchema>;

export const schema = z.union([
	PluginJsonResponse.schemas.schema,
	checkRuntimeDependenciesResponseSchema,
	PluginInfo.schemas.schema,
	ParsedPluginInfo.schemas.schema,
	pluginActionNotSupportedSchema,
	z.void(),
]);

export type PluginResponse = z.infer<typeof schema>;

export type t = PluginResponse;
