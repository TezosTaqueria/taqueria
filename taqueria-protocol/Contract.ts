import createType, { Flatten } from '@taqueria/protocol/Base';
import * as SHA256 from '@taqueria/protocol/SHA256';
import { z } from 'zod';

export const rawSchema = z.object({
	sourceFile: z.string().min(1),
	hash: SHA256.rawSchema,
	// TODO: Should plugin also be provided here?
});

export const internalSchema = z.object({
	sourceFile: z.string().min(1),
	hash: SHA256.schemas.schema,
});

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `${value} is not a valid contract`,
	unknownErrMsg: 'Something went wrong trying to parse a contract',
});

export type Contract = z.infer<typeof internalSchema>;

export type t = Contract;

export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as Contract),
};
