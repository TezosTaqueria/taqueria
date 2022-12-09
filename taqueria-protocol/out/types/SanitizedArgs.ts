// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { SanitizedArgs } from '@taqueria/protocol/types';
import { SanitizedArgs as SanitizedArgsStrict } from '@taqueria/protocol/out/types-strict';
import { sanitizedArgsSchema } from '@taqueria/protocol/out/types-zod';

export type { SanitizedArgsStrict as SanitizedArgs };

export const from = (input: unknown): SanitizedArgsStrict => {
	try {
		return sanitizedArgsSchema.parse(input) as SanitizedArgsStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["SanitizedArgs is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a SanitizedArgs.")
	}
    
};

export const create = (input: SanitizedArgs): SanitizedArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedArgsStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<SanitizedArgsStrict, '__type'>): FutureInstance<TaqError, SanitizedArgsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sanitizedArgsSchema,
	schema: sanitizedArgsSchema.transform(val => val as SanitizedArgsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sanitizedArgsSchema;

export type t = SanitizedArgsStrict;
        