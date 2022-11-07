// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { EconomicalProtocolHash as EconomicalProtocolHashStrict } from '@taqueria/protocol-types/out/types-strict';
import { economicalProtocolHashSchema } from '@taqueria/protocol-types/out/types-zod';
import { EconomicalProtocolHash } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { EconomicalProtocolHashStrict as EconomicalProtocolHash };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('EconomicalProtocolHash');

export const from = (input: unknown): EconomicalProtocolHashStrict => {
	return economicalProtocolHashSchema.parse(input) as EconomicalProtocolHashStrict;
};

export const create = (input: EconomicalProtocolHash): EconomicalProtocolHashStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, EconomicalProtocolHashStrict> => {
	try {
		return resolve(economicalProtocolHashSchema.parse(input) as EconomicalProtocolHashStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (
	input: Omit<EconomicalProtocolHashStrict, '__type'>,
): FutureInstance<TaqError, EconomicalProtocolHashStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: economicalProtocolHashSchema,
	schema: economicalProtocolHashSchema.transform(val => val as EconomicalProtocolHashStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = economicalProtocolHashSchema;

export type t = EconomicalProtocolHashStrict;
