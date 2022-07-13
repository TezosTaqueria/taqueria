import * as Alias from '@taqueria/protocol/Alias';
import createType, { Flatten } from '@taqueria/protocol/Base';
import * as ParsedOperation from '@taqueria/protocol/ParsedOperation';
import * as ParsedTemplate from '@taqueria/protocol/ParsedTemplate';
import * as Task from '@taqueria/protocol/Task';
import * as VersionNumber from '@taqueria/protocol/VersionNumber';
import { z } from 'zod';

export const rawSchema = z.object({
	name: z.string({ description: 'Plugin Name' }).min(1),
	version: VersionNumber.rawSchema.describe('Plugin Version #'),
	schema: VersionNumber.rawSchema.describe('Plugin Schema Version #'),
	alias: Alias.rawSchema.describe('Plugin Alias'),
	tasks: z.preprocess(
		val => val ?? [],
		z.array(
			Task.schemas.schema.describe('Plugin Task'),
			{ description: 'Plugin Tasks' },
		),
	).optional(),
	operations: z.preprocess(
		val => val ?? [],
		z.array(
			ParsedOperation.schemas.schema.describe('Plugin Operation'),
			{ description: 'Plugin Operations' },
		),
	).optional(),
	templates: z.preprocess(
		val => val ?? [],
		z.array(
			ParsedTemplate.schemas.schema.describe('Plugin Template'),
		),
	).optional(),
});

export const internalSchema = rawSchema.extend({
	version: VersionNumber.schemas.schema.describe('Plugin Version #'),
	schema: VersionNumber.schemas.schema.describe('Plugin Schema Version #'),
	alias: Alias.schemas.schema.describe('Plugin Alias'),
	tasks: z.preprocess(
		val => val ?? [],
		z.array(
			Task.schemas.schema.describe('Plugin Task'),
			{ description: 'Plugin Tasks' },
		),
	).optional(),
	operations: z.preprocess(
		val => val ?? [],
		z.array(
			ParsedOperation.schemas.schema.describe('Plugin Operation'),
			{ description: 'Plugin Operations' },
		),
	).optional(),
	templates: z.preprocess(
		val => val ?? [],
		z.array(
			ParsedTemplate.schemas.schema.describe('Plugin Template'),
		),
	).optional(),
}).describe('Plugin Schema');

// export const rawSchema = internalSchema;

type RawInput = z.infer<typeof rawSchema>;
type Input = Flatten<z.infer<typeof internalSchema>>;

export const { schemas, factory } = createType<RawInput, Input>({
	rawSchema,
	internalSchema,
	parseErrMsg: 'The schema returned from the plugin is invalid',
	unknownErrMsg: 'Something went wrong parsing the schema from a plugin',
});

export type PluginInfo = Flatten<z.infer<typeof schemas.schema>>;
export type t = PluginInfo;
export const { create, of, make } = factory;
