// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { SanitizedAbsPath } from '@taqueria/protocol/types';
import { SanitizedAbsPath as SanitizedAbsPathStrict } from '@taqueria/protocol/out/types-strict';
import { sanitizedAbsPathSchema } from '@taqueria/protocol/out/types-zod';

export type { SanitizedAbsPathStrict as SanitizedAbsPath };

export const from = (input: unknown): SanitizedAbsPathStrict => {
	try {
		return sanitizedAbsPathSchema.parse(input) as SanitizedAbsPathStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["SanitizedAbsPath is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a SanitizedAbsPath.")
	}
    
};

export const create = (input: SanitizedAbsPath): SanitizedAbsPathStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, SanitizedAbsPathStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<SanitizedAbsPathStrict, '__type'>): FutureInstance<TaqError, SanitizedAbsPathStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: sanitizedAbsPathSchema,
	schema: sanitizedAbsPathSchema.transform(val => val as SanitizedAbsPathStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = sanitizedAbsPathSchema;

export type t = SanitizedAbsPathStrict;
        