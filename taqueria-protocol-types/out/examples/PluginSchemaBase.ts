// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PluginSchemaBase, pluginSchemaBaseSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PluginSchemaBase as PluginSchemaBaseStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PluginSchemaBase } from '../../types';
import { pluginSchemaBaseSchema } from '../types-zod';

// type PluginSchemaBaseStrict = PluginSchemaBase & { __type: 'PluginSchemaBase' };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PluginSchemaBase');

export const from = (input: unknown): PluginSchemaBaseStrict => {
	return pluginSchemaBaseSchema.parse(input) as PluginSchemaBaseStrict;
};

export const create = (input: PluginSchemaBase): PluginSchemaBaseStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PluginSchemaBaseStrict> => {
	try {
		return resolve(pluginSchemaBaseSchema.parse(input) as PluginSchemaBaseStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: PluginSchemaBaseStrict): FutureInstance<TaqError, PluginSchemaBaseStrict> => of(input);
