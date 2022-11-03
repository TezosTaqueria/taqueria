// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PluginInfo, pluginInfoSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PluginInfo as PluginInfoStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PluginInfo } from '../../types';
import { pluginInfoSchema } from '../types-zod';

export type { PluginInfoStrict as PluginInfo };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginInfo');

export const from = (input: unknown): PluginInfoStrict => {
	return pluginInfoSchema.parse(input) as PluginInfoStrict;
};

export const create = (input: PluginInfo): PluginInfoStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginInfoStrict> => {
	try {
		return resolve(pluginInfoSchema.parse(input) as PluginInfoStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: PluginInfoStrict): FutureInstance<TaqError, PluginInfoStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: pluginInfoSchema,
	schema: pluginInfoSchema.transform(val => val as PluginInfoStrict),
};

export type t = PluginInfoStrict;
