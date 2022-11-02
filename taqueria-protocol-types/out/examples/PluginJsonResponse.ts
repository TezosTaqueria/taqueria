// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PluginJsonResponse, pluginJsonResponseSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PluginJsonResponse as PluginJsonResponseStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PluginJsonResponse } from '../../types';
import { pluginJsonResponseSchema } from '../types-zod';

// type PluginJsonResponseStrict = PluginJsonResponse & { __type: 'PluginJsonResponse' };
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

export const make = (input: PluginJsonResponseStrict): FutureInstance<TaqError, PluginJsonResponseStrict> => of(input);
