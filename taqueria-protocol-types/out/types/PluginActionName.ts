// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { PluginActionName as PluginActionNameStrict } from '@taqueria/protocol-types/out/types-strict';
import { pluginActionNameSchema } from '@taqueria/protocol-types/out/types-zod';
import { PluginActionName } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { PluginActionNameStrict as PluginActionName };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginActionName');

export const from = (input: unknown): PluginActionNameStrict => {
	return pluginActionNameSchema.parse(input) as PluginActionNameStrict;
};

export const create = (input: PluginActionName): PluginActionNameStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginActionNameStrict> => {
	try {
		return resolve(pluginActionNameSchema.parse(input) as PluginActionNameStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<PluginActionNameStrict, '__type'>): FutureInstance<TaqError, PluginActionNameStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginActionNameSchema,
	schema: pluginActionNameSchema.transform(val => val as PluginActionNameStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginActionNameSchema;

export type t = PluginActionNameStrict;
