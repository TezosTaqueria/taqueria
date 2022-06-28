import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z
	.string({ description: 'Public Key Hash' })
	.min(1) // TODO: what's the actual minimum length here?
	.refine(
		val => val.startsWith('tz1'),
		val => ({ message: `${val} is not a valid public key hash` }),
	);

type RawInput = z.infer<typeof rawSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, RawInput>({
	isStringLike: true,
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is an invalid public key hash`,
	unknownErrMsg: 'Something went wrong parsing the public key hash',
});

export type PublicKeyHash = z.infer<typeof generatedSchemas.schema>;
export type t = PublicKeyHash;
export type PKH = PublicKeyHash;
export const { create, of, make } = factory;
export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as PublicKeyHash),
};
