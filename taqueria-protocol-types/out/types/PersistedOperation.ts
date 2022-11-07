// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { PersistedOperation as PersistedOperationStrict } from '@taqueria/protocol-types/out/types-strict';
import { persistedOperationSchema } from '@taqueria/protocol-types/out/types-zod';
import { PersistedOperation } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { PersistedOperationStrict as PersistedOperation };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PersistedOperation');

export const from = (input: unknown): PersistedOperationStrict => {
	return persistedOperationSchema.parse(input) as PersistedOperationStrict;
};

export const create = (input: PersistedOperation): PersistedOperationStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PersistedOperationStrict> => {
	try {
		return resolve(persistedOperationSchema.parse(input) as PersistedOperationStrict);
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
	input: Omit<PersistedOperationStrict, '__type'>,
): FutureInstance<TaqError, PersistedOperationStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: persistedOperationSchema,
	schema: persistedOperationSchema.transform(val => val as PersistedOperationStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = persistedOperationSchema;

export type t = PersistedOperationStrict;
