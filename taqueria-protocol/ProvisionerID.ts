import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z
	.string()
	.min(1)
	.regex(/^[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+\.[A-Za-z0-9]+[A-Za-z0-9-_]+$/)
	.describe('Provisioner ID');

type RawInput = z.infer<typeof rawSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, RawInput>({
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is not a valid provisioner ID`,
	unknownErrMsg: 'Something went wrong trying to parse the provision ID',
});

export type ProvisionerID = z.infer<typeof generatedSchemas.schema>;
export type t = ProvisionerID;
export const { create, of, make } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as ProvisionerID),
};
