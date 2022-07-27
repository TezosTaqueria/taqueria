import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z
	.string({ description: 'Human Readable Identifier' })
	.regex(/^[A-Za-z]+[A-Za-z0-9-_ ]*$/, 'Must be a valid human-readable identifier');

type RawInput = z.infer<typeof rawSchema>;

const { schemas: generatedSchemas, factory } = createType<RawInput, RawInput>({
	isStringLike: true,
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is not a valid human-readable identifier`,
	unknownErrMsg: 'Something went wrong trying to parse the human readable identifier',
});

export const internalSchema = generatedSchemas.schema;

export type HumanReadableIdentifier = z.infer<typeof internalSchema>;
export type t = HumanReadableIdentifier;
export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as HumanReadableIdentifier),
};
