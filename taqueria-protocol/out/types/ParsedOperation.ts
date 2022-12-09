// Generated file: Do not edit 
// generated from @taqueria-protocol-types
    
import { TaqError, toFutureParseErr, toFutureParseUnknownErr, toParseErr, toParseUnknownErr } from '@taqueria/protocol/TaqError';
import { FutureInstance, resolve, reject } from 'fluture';
import { ZodError } from 'zod';
import { ParsedOperation } from '@taqueria/protocol/types';
import { ParsedOperation as ParsedOperationStrict } from '@taqueria/protocol/out/types-strict';
import { parsedOperationSchema } from '@taqueria/protocol/out/types-zod';

export type { ParsedOperationStrict as ParsedOperation };

export const from = (input: unknown): ParsedOperationStrict => {
	try {
		return parsedOperationSchema.parse(input) as ParsedOperationStrict;
	}
	catch (previous: unknown) {
		if (previous instanceof ZodError) {
			const msgs: string[] = previous.errors.reduce(
				(retval, issue) => {
					const path = issue.path.join(' → ');
					const msg = path + ': ' + issue.message;
					return [...retval, msg];
				},
				["ParsedOperation is invalid:"],
			);
			const validationErr = msgs.join('\n') + '\n';
			throw toParseErr(previous, validationErr);
		}
		throw toParseUnknownErr(previous, "There was a problem trying to parse a ParsedOperation.")
	}
    
};

export const create = (input: ParsedOperation): ParsedOperationStrict => from(input);

export const of = (input: unknown): FutureInstance<TaqError, ParsedOperationStrict> => {
	try {
		return resolve(from(input))
	}
	catch (err){
		return reject(err) as FutureInstance<TaqError, never>
	}
};

export const make = (input: Omit<ParsedOperationStrict, '__type'>): FutureInstance<TaqError, ParsedOperationStrict> => of(input);

// TEMP: for interoperation with old protocol types during transition
export const schemas = {
	rawSchema: parsedOperationSchema,
	schema: parsedOperationSchema.transform(val => val as ParsedOperationStrict),
};
export const rawSchema = schemas.rawSchema;
export const internalSchema = parsedOperationSchema;

export type t = ParsedOperationStrict;
        