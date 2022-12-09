// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PersistentState } from '@taqueria/protocol/types';
import { PersistentState as PersistentStateStrict } from '@taqueria/protocol/out/types-strict';
import { persistentStateSchema } from '@taqueria/protocol/out/types-zod';

export type { PersistentStateStrict as PersistentState };

export const from = (input: unknown): PersistentStateStrict => {
	try {
		return persistentStateSchema.parse(input) as PersistentStateStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PersistentState is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PersistentState.")
	}
    
};

export const create = (input: PersistentState): PersistentStateStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PersistentStateStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PersistentStateStrict, '__type'>): FutureInstance<TaqError, PersistentStateStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: persistentStateSchema,
	schema: persistentStateSchema.transform(val => val as PersistentStateStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = persistentStateSchema;

export type t = PersistentStateStrict;
        