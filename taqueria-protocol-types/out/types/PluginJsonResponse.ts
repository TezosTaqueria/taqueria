// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { PluginJsonResponse as PluginJsonResponseStrict } from '@taqueria/protocol-types/out/types-strict';
import { pluginJsonResponseSchema } from '@taqueria/protocol-types/out/types-zod';
import { PluginJsonResponse } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { PluginJsonResponseStrict as PluginJsonResponse };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginJsonResponse');

export const from = (input: unknown): PluginJsonResponseStrict => {
	return pluginJsonResponseSchema.parse(input) as PluginJsonResponseStrict;
};

export const create = (input: PluginJsonResponse): PluginJsonResponseStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginJsonResponseStrict> => {
	try {
		return resolve(pluginJsonResponseSchema.parse(input) as PluginJsonResponseStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (
	input: Omit<PluginJsonResponseStrict, '__type'>,
): FutureInstance<TaqError, PluginJsonResponseStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginJsonResponseSchema,
	schema: pluginJsonResponseSchema.transform(val => val as PluginJsonResponseStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginJsonResponseSchema;

export type t = PluginJsonResponseStrict;
