// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Url } from '@taqueria/protocol/types';
import { Url as UrlStrict } from '@taqueria/protocol/out/types-strict';
import { urlSchema } from '@taqueria/protocol/out/types-zod';

export type { UrlStrict as Url };

export const from = (input: unknown): UrlStrict => {
	try {
		return urlSchema.parse(input) as UrlStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Url is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Url.")
	}
    
};

export const create = (input: Url): UrlStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, UrlStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<UrlStrict, '__type'>): FutureInstance<TaqError, UrlStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: urlSchema,
	schema: urlSchema.transform(val => val as UrlStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = urlSchema;

export type t = UrlStrict;
        