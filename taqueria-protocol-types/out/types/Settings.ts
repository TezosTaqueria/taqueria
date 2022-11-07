// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Settings as SettingsStrict } from '@taqueria/protocol-types/out/types-strict';
import { settingsSchema } from '@taqueria/protocol-types/out/types-zod';
import { Settings } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { SettingsStrict as Settings };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Settings');

export const from = (input: unknown): SettingsStrict => {
	return settingsSchema.parse(input) as SettingsStrict;
};

export const create = (input: Settings): SettingsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SettingsStrict> => {
	try {
		return resolve(settingsSchema.parse(input) as SettingsStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<SettingsStrict, '__type'>): FutureInstance<TaqError, SettingsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: settingsSchema,
	schema: settingsSchema.transform(val => val as SettingsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = settingsSchema;

export type t = SettingsStrict;
