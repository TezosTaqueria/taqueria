// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PersistedOperation } from '@taqueria/protocol/types';
import { PersistedOperation as PersistedOperationStrict } from '@taqueria/protocol/out/types-strict';
import { persistedOperationSchema } from '@taqueria/protocol/out/types-zod';

export type { PersistedOperationStrict as PersistedOperation };

export const from = (input: unknown): PersistedOperationStrict => {
	try {
		return persistedOperationSchema.parse(input) as PersistedOperationStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PersistedOperation is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PersistedOperation.")
	}
    
};

export const create = (input: PersistedOperation): PersistedOperationStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PersistedOperationStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PersistedOperationStrict, '__type'>): FutureInstance<TaqError, PersistedOperationStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: persistedOperationSchema,
	schema: persistedOperationSchema.transform(val => val as PersistedOperationStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = persistedOperationSchema;

export type t = PersistedOperationStrict;
        