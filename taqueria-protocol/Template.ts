import createType, { Flatten } from '@taqueria/protocol/Base';

import * as Command from '@taqueria/protocol/Command';
import * as Option from '@taqueria/protocol/Option';
import * as PositionalArg from '@taqueria/protocol/PositionalArg';
import * as RequestArgs from '@taqueria/protocol/RequestArgs';
import * as Verb from '@taqueria/protocol/Verb';
import { z } from 'zod';

type Handler = <T extends RequestArgs.t>(opts: T) => unknown;

export const rawSchema = z.object({
	template: Verb.rawSchema.describe('Template Name'),
	command: Command.rawSchema.describe('Template Command'),
	description: z.string({ description: 'Template Description' }).optional(),
	positionals: z.preprocess(
		val => val || [],
		z.array(PositionalArg.rawSchema).describe('Template Positional Args').optional(),
	),
	options: z.preprocess(
		(val: unknown) => val ?? [],
		z.array(
			Option.rawSchema.describe('Template Option'),
			{ description: 'Template Options' },
		).optional(),
	),
	handler: z.function()
		.args(RequestArgs.schemas.schema)
		.returns(z.unknown())
		.describe('Template Handler')
		.transform((val: unknown) => val as Handler),
}).describe('Template');

export const internalSchema = rawSchema.extend({
	template: Verb.schemas.schema.describe('Template Name'),
	command: Command.schemas.schema.describe('Template Command'),
	positionals: z.preprocess(
		(val: unknown) => val || [],
		z.array(PositionalArg.schemas.schema).describe('Template Positional Args').optional(),
	),
	options: z.preprocess(
		(val: unknown) => val ?? [],
		z.array(
			Option.schemas.schema.describe('Template Option'),
			{ description: 'Template Options' },
		).optional(),
	),
});

type Input = Flatten<z.infer<typeof internalSchema>>;
type RawInput = z.infer<typeof rawSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `The following template is invalid: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the template',
});

export type Template = Flatten<z.infer<typeof generatedSchemas.schema>>;
export type t = Template;
export const { make, of, create } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as Template),
};
