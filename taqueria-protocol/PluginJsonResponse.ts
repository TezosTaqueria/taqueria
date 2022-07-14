import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z.object({
	data: z.unknown().optional(),
	render: z.union([
		z.literal('none'),
		z.literal('table'),
		z.literal('string'),
	]).optional(),
});

type RawPluginJsonResponseInput = z.infer<typeof rawSchema>;

export const pluginJsonResponse = createType<RawPluginJsonResponseInput, RawPluginJsonResponseInput>({
	rawSchema: rawSchema,
	internalSchema: rawSchema,
	parseErrMsg: (value: unknown) => `The following JSON response is invalid: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the template',
});

export type PluginJsonResponse = z.infer<typeof pluginJsonResponse.schemas.schema>;

export type t = PluginJsonResponse;

export const { schemas, factory } = pluginJsonResponse;
