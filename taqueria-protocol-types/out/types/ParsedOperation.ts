// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { ParsedOperation as ParsedOperationStrict } from '@taqueria/protocol-types/out/types-strict';
import { parsedOperationSchema } from '@taqueria/protocol-types/out/types-zod';
import { ParsedOperation } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { ParsedOperationStrict as ParsedOperation };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('ParsedOperation');

export const from = (input: unknown): ParsedOperationStrict => {
	return parsedOperationSchema.parse(input) as ParsedOperationStrict;
};

export const create = (input: ParsedOperation): ParsedOperationStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ParsedOperationStrict> => {
	try {
		return resolve(parsedOperationSchema.parse(input) as ParsedOperationStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<ParsedOperationStrict, '__type'>): FutureInstance<TaqError, ParsedOperationStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: parsedOperationSchema,
	schema: parsedOperationSchema.transform(val => val as ParsedOperationStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = parsedOperationSchema;

export type t = ParsedOperationStrict;
