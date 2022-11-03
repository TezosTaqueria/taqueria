// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PluginSchema, pluginSchemaSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PluginSchema as PluginSchemaStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PluginSchema } from '../../types';
import { pluginSchemaSchema } from '../types-zod';

export type { PluginSchemaStrict as PluginSchema };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginSchema');

export const from = (input: unknown): PluginSchemaStrict => {
	return pluginSchemaSchema.parse(input) as PluginSchemaStrict;
};

export const create = (input: PluginSchema): PluginSchemaStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginSchemaStrict> => {
	try {
		return resolve(pluginSchemaSchema.parse(input) as PluginSchemaStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: PluginSchemaStrict): FutureInstance<TaqError, PluginSchemaStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginSchemaSchema,
	schema: pluginSchemaSchema.transform(val => val as PluginSchemaStrict),
};

export type t = PluginSchemaStrict;
