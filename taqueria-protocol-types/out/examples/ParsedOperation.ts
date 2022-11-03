// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { ParsedOperation, parsedOperationSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { ParsedOperation as ParsedOperationStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { ParsedOperation } from '../../types';
import { parsedOperationSchema } from '../types-zod';

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

export const make = (input: ParsedOperationStrict): FutureInstance<TaqError, ParsedOperationStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: parsedOperationSchema,
	schema: parsedOperationSchema.transform(val => val as ParsedOperationStrict),
};

export type t = ParsedOperationStrict;
