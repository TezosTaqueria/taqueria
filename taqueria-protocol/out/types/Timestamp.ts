// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { Timestamp } from '@taqueria/protocol/types';
import { Timestamp as TimestampStrict } from '@taqueria/protocol/out/types-strict';
import { timestampSchema } from '@taqueria/protocol/out/types-zod';

export type { TimestampStrict as Timestamp };

export const from = (input: unknown): TimestampStrict => {
	try {
		return timestampSchema.parse(input) as TimestampStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["Timestamp is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a Timestamp.")
	}
    
};

export const create = (input: Timestamp): TimestampStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, TimestampStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<TimestampStrict, '__type'>): FutureInstance<TaqError, TimestampStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: timestampSchema,
	schema: timestampSchema.transform(val => val as TimestampStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = timestampSchema;

export type t = TimestampStrict;
        