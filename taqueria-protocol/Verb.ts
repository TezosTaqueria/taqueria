import createType from '@taqueria/protocol/Base';
import { z } from 'zod';

export const rawSchema = z
	.string({ description: 'Verb' })
	.min(1, 'Must be a valid verb')
	.regex(/^[A-Za-z\-\ ]+/, 'Must be a valid verb');

type Input = z.infer<typeof rawSchema>;

export const { factory, schemas: generatedSchemas } = createType<Input, Input>({
	isStringLike: true,
	rawSchema,
	parseErrMsg: (value: unknown) => `${value} is not an invalid verb`,
	unknownErrMsg: `Something went wrong trying to parse a verb`,
});
export type Verb = z.infer<typeof generatedSchemas.schema>;
export type t = Verb;
export const { create, make, of } = factory;
export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as Verb),
};
