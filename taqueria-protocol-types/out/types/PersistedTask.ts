// Generated file: Do not edit
// generated from @taqueria-protocol-types

import { parsingErrorMessages } from '@taqueria/protocol-types/helpers';
import { PersistedTask as PersistedTaskStrict } from '@taqueria/protocol-types/out/types-strict';
import { persistedTaskSchema } from '@taqueria/protocol-types/out/types-zod';
import { PersistedTask } from '@taqueria/protocol-types/types';
import { TaqError, toFutureParseErr, toFutureParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve } from 'fluture';
import { ZodError } from 'zod';

export type { PersistedTaskStrict as PersistedTask };
const { parseErrMsg, unknownErrMsg } = parsingErrorMessages('PersistedTask');

export const from = (input: unknown): PersistedTaskStrict => {
	return persistedTaskSchema.parse(input) as PersistedTaskStrict;
};

export const create = (input: PersistedTask): PersistedTaskStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PersistedTaskStrict> => {
	try {
		return resolve(persistedTaskSchema.parse(input) as PersistedTaskStrict);
	} catch (previous) {
		const parseMsg = parseErrMsg(input, previous);

		const unknownMsg = unknownErrMsg(input);

		if (previous instanceof ZodError) {
			return toFutureParseErr(previous, parseMsg, input);
		}
		return toFutureParseUnknownErr(previous, unknownMsg, input);
	}
};

export const make = (input: Omit<PersistedTaskStrict, '__type'>): FutureInstance<TaqError, PersistedTaskStrict> =>
	of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: persistedTaskSchema,
	schema: persistedTaskSchema.transform(val => val as PersistedTaskStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = persistedTaskSchema;

export type t = PersistedTaskStrict;
