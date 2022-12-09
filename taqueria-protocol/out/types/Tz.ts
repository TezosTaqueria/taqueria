// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Tz } from '@taqueria/protocol/types';
import { Tz as TzStrict } from '@taqueria/protocol/out/types-strict';
import { tzSchema } from '@taqueria/protocol/out/types-zod';

export type { TzStrict as Tz };

export const from = (input: unknown): TzStrict => {
	try {
		return tzSchema.parse(input) as TzStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Tz is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Tz.")
	}
    
};

export const create = (input: Tz): TzStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TzStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<TzStrict, '__type'>): FutureInstance<TaqError, TzStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: tzSchema,
	schema: tzSchema.transform(val => val as TzStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = tzSchema;

export type t = TzStrict;
        