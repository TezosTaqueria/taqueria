// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { RequestArgs } from '@taqueria/protocol/types';
import { RequestArgs as RequestArgsStrict } from '@taqueria/protocol/out/types-strict';
import { requestArgsSchema } from '@taqueria/protocol/out/types-zod';

export type { RequestArgsStrict as RequestArgs };

export const from = (input: unknown): RequestArgsStrict => {
	try {
		return requestArgsSchema.parse(input) as RequestArgsStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["RequestArgs is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a RequestArgs.")
	}
    
};

export const create = (input: RequestArgs): RequestArgsStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, RequestArgsStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<RequestArgsStrict, '__type'>): FutureInstance<TaqError, RequestArgsStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: requestArgsSchema,
	schema: requestArgsSchema.transform(val => val as RequestArgsStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = requestArgsSchema;

export type t = RequestArgsStrict;
        