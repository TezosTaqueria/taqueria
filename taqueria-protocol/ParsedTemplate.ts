import createType from '@taqueria/protocol/Base';
import * as PluginResponseEncoding from '@taqueria/protocol/PluginResponseEncoding';
import * as Template from '@taqueria/protocol/Template';
import { z } from 'zod';

const internalSchema = Template
	.internalSchema
	.extend({
		handler: z.string(),
		encoding: PluginResponseEncoding.schemas.schema,
	})
	.describe('ParsedTemplate');

export const rawSchema = Template
	.rawSchema
	.extend({
		handler: z.string(),
		encoding: PluginResponseEncoding.schemas.schema,
	})
	.describe('ParsedTemplate');

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `Could not parse the following template: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse an template',
});

export type ParsedTemplate = z.infer<typeof generatedSchemas.schema>;
export type t = ParsedTemplate;

export const { create, make, of } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as ParsedTemplate),
};
