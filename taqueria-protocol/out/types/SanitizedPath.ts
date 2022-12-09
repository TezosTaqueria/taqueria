// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { SanitizedPath } from '@taqueria/protocol/types';
import { SanitizedPath as SanitizedPathStrict } from '@taqueria/protocol/out/types-strict';
import { sanitizedPathSchema } from '@taqueria/protocol/out/types-zod';

export type { SanitizedPathStrict as SanitizedPath };

export const from = (input: unknown): SanitizedPathStrict => {
	try {
		return sanitizedPathSchema.parse(input) as SanitizedPathStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["SanitizedPath is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a SanitizedPath.")
	}
    
};

export const create = (input: SanitizedPath): SanitizedPathStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedPathStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<SanitizedPathStrict, '__type'>): FutureInstance<TaqError, SanitizedPathStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sanitizedPathSchema,
	schema: sanitizedPathSchema.transform(val => val as SanitizedPathStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sanitizedPathSchema;

export type t = SanitizedPathStrict;
        