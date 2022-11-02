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

// type PluginSchemaStrict = PluginSchema & { __type: 'PluginSchema' };
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
