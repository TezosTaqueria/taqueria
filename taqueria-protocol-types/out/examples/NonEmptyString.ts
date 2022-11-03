// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { NonEmptyString, nonEmptyStringSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { NonEmptyString as NonEmptyStringStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { NonEmptyString } from '../../types';
import { nonEmptyStringSchema } from '../types-zod';

export type { NonEmptyStringStrict as NonEmptyString };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('NonEmptyString');

export const from = (input: unknown): NonEmptyStringStrict => {
	return nonEmptyStringSchema.parse(input) as NonEmptyStringStrict;
};

export const create = (input: NonEmptyString): NonEmptyStringStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, NonEmptyStringStrict> => {
	try {
		return resolve(nonEmptyStringSchema.parse(input) as NonEmptyStringStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: NonEmptyStringStrict): FutureInstance<TaqError, NonEmptyStringStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: nonEmptyStringSchema,
	schema: nonEmptyStringSchema.transform(val => val as NonEmptyStringStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = NonEmptyStringStrict;
