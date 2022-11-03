// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PluginResponseEncoding, pluginResponseEncodingSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PluginResponseEncoding as PluginResponseEncodingStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PluginResponseEncoding } from '../../types';
import { pluginResponseEncodingSchema } from '../types-zod';

export type { PluginResponseEncodingStrict as PluginResponseEncoding };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginResponseEncoding');

export const from = (input: unknown): PluginResponseEncodingStrict => {
	return pluginResponseEncodingSchema.parse(input) as PluginResponseEncodingStrict;
};

export const create = (input: PluginResponseEncoding): PluginResponseEncodingStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginResponseEncodingStrict> => {
	try {
		return resolve(pluginResponseEncodingSchema.parse(input) as PluginResponseEncodingStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: PluginResponseEncodingStrict): FutureInstance<TaqError, PluginResponseEncodingStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginResponseEncodingSchema,
	schema: pluginResponseEncodingSchema.transform(val => val as PluginResponseEncodingStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = PluginResponseEncodingStrict;
