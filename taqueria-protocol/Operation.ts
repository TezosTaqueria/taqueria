import createType, { Flatten } from '@taqueria/protocol/Base';
import * as Command from '@taqueria/protocol/Command';
import * as Option from '@taqueria/protocol/Option';
import * as PersistentState from '@taqueria/protocol/PersistentState';
import * as PositionalArg from '@taqueria/protocol/PositionalArg';
import * as RequestArgs from '@taqueria/protocol/RequestArgs';
import * as Verb from '@taqueria/protocol/Verb';
import { z } from 'zod';

type Handler = (state: PersistentState.t) => <T extends RequestArgs.t>(opts: T) => unknown;

export const rawSchema = z.object({
	operation: Verb.rawSchema.describe('Operation Name'),
	command: Command.rawSchema.describe('Operation Command'),
	description: z.string({ description: 'Operation Description' }).optional(),
	positionals: z.preprocess(
		(val: unknown) => val || [],
		z.array(PositionalArg.rawSchema).describe('Operation Positional Args').optional(),
	),
	options: z.preprocess(
		(val: unknown) => val ?? [],
		z.array(
			Option.rawSchema.describe('Operation Option'),
			{ description: 'Operation Options' },
		).optional(),
	),
	handler: z.function()
		.args(PersistentState.rawSchema)
		.returns(
			z.function()
				.args(RequestArgs.schemas.internalSchema),
		)
		.describe('Operation Handler')
		.transform((val: unknown) => val as Handler),
}).describe('Operation');

export const internalSchema = z.object({
	operation: Verb.schemas.schema.describe('Operation Name'),
	command: Command.schemas.schema.describe('Operation Command'),
	description: z.string({ description: 'Optionation Description' }).optional(),
	positionals: z.preprocess(
		(val: unknown) => val || [],
		z.array(PositionalArg.schemas.schema).describe('Operation Positional Args').optional(),
	),
	options: z.preprocess(
		(val: unknown) => val ?? [] as Option.t[],
		z.array(Option.schemas.schema.describe('Operation Option'), { description: 'Operation Options' }).optional(),
	),
	handler: z.function()
		.args(PersistentState.rawSchema)
		.returns(
			z.function()
				.args(RequestArgs.schemas.schema),
		)
		.describe('Operation Handler')
		.transform((val: unknown) => val as Handler),
}).describe('Operation');

type Input = Flatten<z.infer<typeof internalSchema>>;
type RawInput = z.infer<typeof rawSchema>;

export const { schemas: generatedSchemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: (value: unknown) => `The following operation is invalid: ${value}`,
	unknownErrMsg: 'Something went wrong trying to parse the operation',
});

export type Operation = Flatten<z.infer<typeof generatedSchemas.schema>>;
export type t = Operation;
export const { make, of, create } = factory;

export const schemas = {
	...generatedSchemas,
	schema: generatedSchemas.schema.transform(val => val as Operation),
};
