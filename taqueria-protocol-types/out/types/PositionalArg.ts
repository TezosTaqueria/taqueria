// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { PositionalArg as PositionalArgStrict } from '@taqueria/protocol-types/out/types-strict';
import { positionalArgSchema } from '@taqueria/protocol-types/out/types-zod';
import { PositionalArg } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { PositionalArgStrict as PositionalArg };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PositionalArg');

export const from = (input: unknown): PositionalArgStrict => {
	return positionalArgSchema.parse(input) as PositionalArgStrict;
};

export const create = (input: PositionalArg): PositionalArgStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PositionalArgStrict> => {
	try {
		return resolve(positionalArgSchema.parse(input) as PositionalArgStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<PositionalArgStrict, '__type'>): FutureInstance<TaqError, PositionalArgStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: positionalArgSchema,
	schema: positionalArgSchema.transform(val => val as PositionalArgStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = positionalArgSchema;

export type t = PositionalArgStrict;
