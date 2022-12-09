// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { PersistedTask } from '@taqueria/protocol/types';
import { PersistedTask as PersistedTaskStrict } from '@taqueria/protocol/out/types-strict';
import { persistedTaskSchema } from '@taqueria/protocol/out/types-zod';

export type { PersistedTaskStrict as PersistedTask };

export const from = (input: unknown): PersistedTaskStrict => {
	try {
		return persistedTaskSchema.parse(input) as PersistedTaskStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["PersistedTask is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a PersistedTask.")
	}
    
};

export const create = (input: PersistedTask): PersistedTaskStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, PersistedTaskStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<PersistedTaskStrict, '__type'>): FutureInstance<TaqError, PersistedTaskStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: persistedTaskSchema,
	schema: persistedTaskSchema.transform(val => val as PersistedTaskStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = persistedTaskSchema;

export type t = PersistedTaskStrict;
        