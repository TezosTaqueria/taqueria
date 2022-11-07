// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Timestamp as TimestampStrict } from '@taqueria/protocol-types/out/types-strict';
import { timestampSchema } from '@taqueria/protocol-types/out/types-zod';
import { Timestamp } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { TimestampStrict as Timestamp };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Timestamp');

export const from = (input: unknown): TimestampStrict => {
	return timestampSchema.parse(input) as TimestampStrict;
};

export const create = (input: Timestamp): TimestampStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TimestampStrict> => {
	try {
		return resolve(timestampSchema.parse(input) as TimestampStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<TimestampStrict, '__type'>): FutureInstance<TaqError, TimestampStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: timestampSchema,
	schema: timestampSchema.transform(val => val as TimestampStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = timestampSchema;

export type t = TimestampStrict;
