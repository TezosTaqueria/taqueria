// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Timestamp, timestampSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Timestamp as TimestampStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Timestamp } from '../../types';
import { timestampSchema } from '../types-zod';

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

export const make = (input: TimestampStrict): FutureInstance<TaqError, TimestampStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: timestampSchema,
	schema: timestampSchema.transform(val => val as TimestampStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = TimestampStrict;
