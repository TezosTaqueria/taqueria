// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { EconomicalPrototypeHash, economicalPrototypeHashSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { EconomicalPrototypeHash as EconomicalPrototypeHashStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { EconomicalPrototypeHash } from '../../types';
import { economicalPrototypeHashSchema } from '../types-zod';

export type { EconomicalPrototypeHashStrict as EconomicalPrototypeHash };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('EconomicalPrototypeHash');

export const from = (input: unknown): EconomicalPrototypeHashStrict => {
	return economicalPrototypeHashSchema.parse(input) as EconomicalPrototypeHashStrict;
};

export const create = (input: EconomicalPrototypeHash): EconomicalPrototypeHashStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, EconomicalPrototypeHashStrict> => {
	try {
		return resolve(economicalPrototypeHashSchema.parse(input) as EconomicalPrototypeHashStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: EconomicalPrototypeHashStrict): FutureInstance<TaqError, EconomicalPrototypeHashStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: economicalPrototypeHashSchema,
	schema: economicalPrototypeHashSchema.transform(val => val as EconomicalPrototypeHashStrict),
};

export type t = EconomicalPrototypeHashStrict;
