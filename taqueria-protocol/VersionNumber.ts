import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z.string({ description: 'Version Number' })
	.min(1)
	.regex(/^\d+\.\d+(\.\d+)*$/);

type RawInput = z.infer<typeof rawSchema>;

const { schemas: generatedSchemas, factory } = createType<RawInput, RawInput>({
	isStringLike: true,
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is an invalid version number`,
	unknownErrMsg: 'Something went wrong trying to parse the version number',
});

export const internalSchema = generatedSchemas.schema;

export type VersionNumber = z.infer<typeof internalSchema>;
export type t = VersionNumber;
export const { create, of, make } = factory;
export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as VersionNumber),
};
