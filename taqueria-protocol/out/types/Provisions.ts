// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Provisions } from '@taqueria/protocol/types';
import { Provisions as ProvisionsStrict } from '@taqueria/protocol/out/types-strict';
import { provisionsSchema } from '@taqueria/protocol/out/types-zod';

export type { ProvisionsStrict as Provisions };

export const from = (input: unknown): ProvisionsStrict => {
	try {
		return provisionsSchema.parse(input) as ProvisionsStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Provisions is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Provisions.")
	}
    
};

export const create = (input: Provisions): ProvisionsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ProvisionsStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ProvisionsStrict, '__type'>): FutureInstance<TaqError, ProvisionsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: provisionsSchema,
	schema: provisionsSchema.transform(val => val as ProvisionsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = provisionsSchema;

export type t = ProvisionsStrict;
        