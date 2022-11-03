// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { PublicKeyHash as PublicKeyHashStrict } from '@taqueria/protocol-types/out/types-strict';
import { publicKeyHashSchema } from '@taqueria/protocol-types/out/types-zod';
import { PublicKeyHash } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { PublicKeyHashStrict as PublicKeyHash };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PublicKeyHash');

export const from = (input: unknown): PublicKeyHashStrict => {
	return publicKeyHashSchema.parse(input) as PublicKeyHashStrict;
};

export const create = (input: PublicKeyHash): PublicKeyHashStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PublicKeyHashStrict> => {
	try {
		return resolve(publicKeyHashSchema.parse(input) as PublicKeyHashStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: PublicKeyHashStrict): FutureInstance<TaqError, PublicKeyHashStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: publicKeyHashSchema,
	schema: publicKeyHashSchema.transform(val => val as PublicKeyHashStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = PublicKeyHashStrict;
