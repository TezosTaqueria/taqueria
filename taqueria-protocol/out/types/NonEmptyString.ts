// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { NonEmptyString } from '@taqueria/protocol/types';
import { NonEmptyString as NonEmptyStringStrict } from '@taqueria/protocol/out/types-strict';
import { nonEmptyStringSchema } from '@taqueria/protocol/out/types-zod';

export type { NonEmptyStringStrict as NonEmptyString };

export const from = (input: unknown): NonEmptyStringStrict => {
	try {
		return nonEmptyStringSchema.parse(input) as NonEmptyStringStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["NonEmptyString is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a NonEmptyString.")
	}
    
};

export const create = (input: NonEmptyString): NonEmptyStringStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, NonEmptyStringStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<NonEmptyStringStrict, '__type'>): FutureInstance<TaqError, NonEmptyStringStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: nonEmptyStringSchema,
	schema: nonEmptyStringSchema.transform(val => val as NonEmptyStringStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = nonEmptyStringSchema;

export type t = NonEmptyStringStrict;
        