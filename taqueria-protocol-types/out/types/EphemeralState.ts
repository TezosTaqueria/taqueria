// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { EphemeralState as EphemeralStateStrict } from '@taqueria/protocol-types/out/types-strict';
import { ephemeralStateSchema } from '@taqueria/protocol-types/out/types-zod';
import { EphemeralState } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { EphemeralStateStrict as EphemeralState };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('EphemeralState');

export const from = (input: unknown): EphemeralStateStrict => {
	return ephemeralStateSchema.parse(input) as EphemeralStateStrict;
};

export const create = (input: EphemeralState): EphemeralStateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, EphemeralStateStrict> => {
	try {
		return resolve(ephemeralStateSchema.parse(input) as EphemeralStateStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<EphemeralStateStrict, '__type'>): FutureInstance<TaqError, EphemeralStateStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: ephemeralStateSchema,
	schema: ephemeralStateSchema.transform(val => val as EphemeralStateStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = ephemeralStateSchema;

export type t = EphemeralStateStrict;
