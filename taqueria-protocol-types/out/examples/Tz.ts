// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { Tz, tzSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { Tz as TzStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { Tz } from '../../types';
import { tzSchema } from '../types-zod';

export type { TzStrict as Tz };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Tz');

export const from = (input: unknown): TzStrict => {
	return tzSchema.parse(input) as TzStrict;
};

export const create = (input: Tz): TzStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TzStrict> => {
	try {
		return resolve(tzSchema.parse(input) as TzStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: TzStrict): FutureInstance<TaqError, TzStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: tzSchema,
	schema: tzSchema.transform(val => val as TzStrict),
};

export type t = TzStrict;
