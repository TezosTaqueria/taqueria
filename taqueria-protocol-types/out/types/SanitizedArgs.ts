// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { SanitizedArgs as SanitizedArgsStrict } from '@taqueria/protocol-types/out/types-strict';
import { sanitizedArgsSchema } from '@taqueria/protocol-types/out/types-zod';
import { SanitizedArgs } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { SanitizedArgsStrict as SanitizedArgs };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SanitizedArgs');

export const from = (input: unknown): SanitizedArgsStrict => {
	return sanitizedArgsSchema.parse(input) as SanitizedArgsStrict;
};

export const create = (input: SanitizedArgs): SanitizedArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedArgsStrict> => {
	try {
		return resolve(sanitizedArgsSchema.parse(input) as SanitizedArgsStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<SanitizedArgsStrict, '__type'>): FutureInstance<TaqError, SanitizedArgsStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sanitizedArgsSchema,
	schema: sanitizedArgsSchema.transform(val => val as SanitizedArgsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sanitizedArgsSchema;

export type t = SanitizedArgsStrict;
