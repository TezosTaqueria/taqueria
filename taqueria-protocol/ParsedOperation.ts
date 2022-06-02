import createType from '@taqueria/protocol/Base';
import * as Operation from '@taqueria/protocol/Operation';
import { z } from 'zod';

const internalSchema = Operation
	.internalSchema
	.describe('ParsedOperation')
	.omit({ handler: true });

export const rawSchema = Operation
	.rawSchema
	.omit({ handler: true })
	.describe('ParsedOperation');

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `Could not parse the following operation: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse an operation',
});

export type ParsedOperation = z.infer<typeof generatedSchemas.schema>;
export type t = ParsedOperation;

export const { create, make, of } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as ParsedOperation),
};
