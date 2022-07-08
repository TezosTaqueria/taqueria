import createType from '@taqueria/protocol/Base';
import * as Command from '@taqueria/protocol/Command';
import * as Option from '@taqueria/protocol/Option';
import * as PluginJsonResponse from '@taqueria/protocol/PluginJsonResponse';
import * as PluginResponseEncoding from '@taqueria/protocol/PluginResponseEncoding';
import * as PositionalArg from '@taqueria/protocol/PositionalArg';
import * as RequestArgs from '@taqueria/protocol/RequestArgs';
import * as Verb from '@taqueria/protocol/Verb';
import { z } from 'zod';

const handlerSchema = z.union([
	z.string().min(1),
	z.function().args(RequestArgs.schemas.schema).returns(z.union([
		z.void(),
		PluginJsonResponse.schemas.schema,
	])),
]);

export const rawSchema = z.object({
	template: Verb.rawSchema,
	command: Command.rawSchema,
	description: z.string().min(4),
	hidden: z.preprocess(
		val => val ?? false,
		z.boolean(),
	).optional(),
	options: z.preprocess(
		val => val ?? [],
		z.array(Option.rawSchema),
	).optional(),
	positionals: z.preprocess(
		val => val ?? [],
		z.array(PositionalArg.rawSchema),
	).optional(),
	handler: handlerSchema.describe('Template Handler'),
	encoding: PluginResponseEncoding.schemas.schema.optional(),
});

export const internalSchema = rawSchema.extend({
	template: Verb.schemas.schema,
	command: Command.schemas.schema,
	options: z.preprocess(
		val => val ?? [],
		z.array(Option.schemas.schema),
	).optional(),
	positionals: z.preprocess(
		val => val ?? [],
		z.array(PositionalArg.schemas.schema),
	).optional(),
});

type RawInput = z.infer<typeof rawSchema>;
type Input = z.infer<typeof internalSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `The following template is invalid: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the template',
});

export type Template = z.infer<typeof generatedSchemas.schema>;
export type t = Template;
export const { create, make, of } = factory;
export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as unknown as Template),
};
