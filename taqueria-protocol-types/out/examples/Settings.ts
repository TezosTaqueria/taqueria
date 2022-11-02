// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Settings, settingsSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Settings as SettingsStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Settings } from '../../types';
import { settingsSchema } from '../types-zod';

// type SettingsStrict = Settings & { __type: 'Settings' };
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

export const make = (input: SettingsStrict): FutureInstance<TaqError, SettingsStrict> => of(input);
