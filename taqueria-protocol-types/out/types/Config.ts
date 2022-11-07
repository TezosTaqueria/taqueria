// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Config as ConfigStrict } from '@taqueria/protocol-types/out/types-strict';
import { configSchema } from '@taqueria/protocol-types/out/types-zod';
import { Config } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ConfigStrict as Config };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Config');

export const from = (input: unknown): ConfigStrict => {
	return configSchema.parse(input) as ConfigStrict;
};

export const create = (input: Config): ConfigStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ConfigStrict> => {
	try {
		return resolve(configSchema.parse(input) as ConfigStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<ConfigStrict, '__type'>): FutureInstance<TaqError, ConfigStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: configSchema,
	schema: configSchema.transform(val => val as ConfigStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = configSchema;

export type t = ConfigStrict;
