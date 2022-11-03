// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PluginDependenciesResponse, pluginDependenciesResponseSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PluginDependenciesResponse as PluginDependenciesResponseStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PluginDependenciesResponse } from '../../types';
import { pluginDependenciesResponseSchema } from '../types-zod';

export type { PluginDependenciesResponseStrict as PluginDependenciesResponse };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginDependenciesResponse');

export const from = (input: unknown): PluginDependenciesResponseStrict => {
	return pluginDependenciesResponseSchema.parse(input) as PluginDependenciesResponseStrict;
};

export const create = (input: PluginDependenciesResponse): PluginDependenciesResponseStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginDependenciesResponseStrict> => {
	try {
		return resolve(pluginDependenciesResponseSchema.parse(input) as PluginDependenciesResponseStrict);
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
	input: PluginDependenciesResponseStrict,
): FutureInstance<TaqError, PluginDependenciesResponseStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginDependenciesResponseSchema,
	schema: pluginDependenciesResponseSchema.transform(val => val as PluginDependenciesResponseStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = PluginDependenciesResponseStrict;
