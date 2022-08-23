import createType from '@taqueria/protocol/Base';
import * as PluginJsonResponse from '@taqueria/protocol/PluginJsonResponse';
import { z } from 'zod';

const internalSchema = z.union([
	PluginJsonResponse.schemas.internalSchema,
	z.void(),
]);

export const rawSchema = internalSchema;

type Input = z.infer<typeof internalSchema>;

export const { schemas, factory } = createType<Input, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: 'The response from the proxy request is invalid',
	unknownErrMsg: 'Something went wrong parsing the proxy response from the plugin',
});

export type PluginProxyResponse = z.infer<typeof schemas.schema>;
export type t = PluginProxyResponse;

export const { of, make, create } = factory;
