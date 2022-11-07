// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { SHA256 as SHA256Strict } from '@taqueria/protocol-types/out/types-strict';
import { sha256Schema } from '@taqueria/protocol-types/out/types-zod';
import { SHA256 } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { SHA256Strict as SHA256 };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('SHA256');

export const from = (input: unknown): SHA256Strict => {
	return sha256Schema.parse(input) as SHA256Strict;
};

export const create = (input: SHA256): SHA256Strict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SHA256Strict> => {
	try {
		return resolve(sha256Schema.parse(input) as SHA256Strict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<SHA256Strict, '__type'>): FutureInstance<TaqError, SHA256Strict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sha256Schema,
	schema: sha256Schema.transform(val => val as SHA256Strict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sha256Schema;

export type t = SHA256Strict;
