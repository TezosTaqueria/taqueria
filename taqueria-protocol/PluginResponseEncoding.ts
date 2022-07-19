import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z.preprocess(
	(val: unknown) => val ?? 'none',
	z.union([
		z.literal('json'),
		z.literal('application/json'),
		z.literal('none'),
	])
		.default('none')
		.optional(),
);

type RawInput = z.infer<typeof rawSchema>;

export const { schemas, factory } = createType<RawInput, RawInput>({
	rawSchema,
	internalSchema: rawSchema,
	parseErrMsg: (value: unknown) => `The following encoding is invalid: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the encoding',
});

export type PluginResponseEncoding = z.infer<typeof schemas.schema>;
export type t = PluginResponseEncoding;

export const { create, of, make } = factory;
