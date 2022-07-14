import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

const rawSchema = z.union([
	z.literal('checkRuntimeDependencies'),
	z.literal('installRuntimeDependencies'),
	z.literal('proxy'),
	z.literal('proxyTemplate'),
	z.literal('pluginInfo'),
]);

const internalSchema = rawSchema;

export type PluginActionName = z.infer<typeof rawSchema>;
export type t = PluginActionName;

const pluginActionNotSupportedSchema = z.object({
	status: z.literal('notSupported'),
	msg: z.string(),
});

export type PluginActionNotSupportedResponse = z.infer<typeof pluginActionNotSupportedSchema>;

export const schemas = {
	schema: internalSchema,
	internalSchema,
	rawSchema,
};
