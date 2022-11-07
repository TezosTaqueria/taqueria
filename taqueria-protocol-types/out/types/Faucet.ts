// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { Faucet as FaucetStrict } from '@taqueria/protocol-types/out/types-strict';
import { faucetSchema } from '@taqueria/protocol-types/out/types-zod';
import { Faucet } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { FaucetStrict as Faucet };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('Faucet');

export const from = (input: unknown): FaucetStrict => {
	return faucetSchema.parse(input) as FaucetStrict;
};

export const create = (input: Faucet): FaucetStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, FaucetStrict> => {
	try {
		return resolve(faucetSchema.parse(input) as FaucetStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<FaucetStrict, '__type'>): FutureInstance<TaqError, FaucetStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: faucetSchema,
	schema: faucetSchema.transform(val => val as FaucetStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = faucetSchema;

export type t = FaucetStrict;
