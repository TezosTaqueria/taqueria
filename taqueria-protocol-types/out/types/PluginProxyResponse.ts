// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { PluginProxyResponse as PluginProxyResponseStrict } from '@taqueria/protocol-types/out/types-strict';
import { pluginProxyResponseSchema } from '@taqueria/protocol-types/out/types-zod';
import { PluginProxyResponse } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { PluginProxyResponseStrict as PluginProxyResponse };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginProxyResponse');

export const from = (input: unknown): PluginProxyResponseStrict => {
	return pluginProxyResponseSchema.parse(input) as PluginProxyResponseStrict;
};

export const create = (input: PluginProxyResponse): PluginProxyResponseStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginProxyResponseStrict> => {
	try {
		return resolve(pluginProxyResponseSchema.parse(input) as PluginProxyResponseStrict);
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
	input: Omit<PluginProxyResponseStrict, '__type'>,
): FutureInstance<TaqError, PluginProxyResponseStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginProxyResponseSchema,
	schema: pluginProxyResponseSchema.transform(val => val as PluginProxyResponseStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = pluginProxyResponseSchema;

export type t = PluginProxyResponseStrict;
