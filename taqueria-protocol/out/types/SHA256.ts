// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { SHA256 } from '@taqueria/protocol/types';
import { SHA256 as SHA256Strict } from '@taqueria/protocol/out/types-strict';
import { sha256Schema } from '@taqueria/protocol/out/types-zod';

export type { SHA256Strict as SHA256 };

export const from = (input: unknown): SHA256Strict => {
	try {
		return sha256Schema.parse(input) as SHA256Strict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["SHA256 is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a SHA256.")
	}
    
};

export const create = (input: SHA256): SHA256Strict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SHA256Strict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
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
        