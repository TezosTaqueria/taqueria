// Generated file: Do not edit
// generated from @taqueria-protocol-types

// import { PersistentState, persistentStateSchema, parsingErrorMessages } from '@taqueria-protocol-types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';
import { PersistentState as PersistentStateStrict } from '../../../taqueria-protocol-types/out/types-strict';
import { parsingErrorMessages } from '../../helpers';
import { PersistentState } from '../../types';
import { persistentStateSchema } from '../types-zod';

export type { PersistentStateStrict as PersistentState };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PersistentState');

export const from = (input: unknown): PersistentStateStrict => {
	return persistentStateSchema.parse(input) as PersistentStateStrict;
};

export const create = (input: PersistentState): PersistentStateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PersistentStateStrict> => {
	try {
		return resolve(persistentStateSchema.parse(input) as PersistentStateStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: PersistentStateStrict): FutureInstance<TaqError, PersistentStateStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: persistentStateSchema,
	schema: persistentStateSchema.transform(val => val as PersistentStateStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = schemas.schema;

export type t = PersistentStateStrict;
